"""Vectorize the dos A logo JPEG into clean, smoothed SVG files.

Outputs (into assets/brand/):
  dos-a-logo.svg           full lockup (wordmark + tagline), single path
  dos-a-mark.svg           wordmark only (no tagline), single path
  dos-a-logo-animated.svg  layered: <g id="dos">, <g id="a-cable">, <g id="tagline">
                           one <path> per glyph/shape for staggered animation
  dos-a-logo-trace-preview.png   verification render (trace vs original)
  dos-a-logo-parts-preview.png   verification render of the layer split
"""
import os
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

ROOT = os.path.dirname(os.path.abspath(__file__))
WS = os.path.abspath(os.path.join(ROOT, "..", ".."))
SRC = os.path.join(WS, "assets", "brand", "dos-a-logo-original.jpeg")
OUT = os.path.join(WS, "assets", "brand")

RDP_EPS = 1.2
MIN_AREA = 40.0
BLUR = 1.0
THRESH = 140.0

# ---------------- marching squares ----------------
# case bits: TL=1, TR=2, BR=4, BL=8 ; midpoints in doubled int coords
MID = {"T": (1, 0), "R": (2, 1), "B": (1, 2), "L": (0, 1)}
SEG = {
    1: [("T", "L")], 2: [("T", "R")], 3: [("L", "R")], 4: [("B", "R")],
    5: [("T", "L"), ("B", "R")], 6: [("T", "B")], 7: [("L", "B")],
    8: [("L", "B")], 9: [("T", "B")], 10: [("T", "R"), ("L", "B")],
    11: [("R", "B")], 12: [("L", "R")], 13: [("T", "R")], 14: [("T", "L")],
}

def trace_loops(ink):
    H, W = ink.shape
    p = np.pad(ink.astype(np.uint8), 1)
    adj = {}  # point -> set of neighbor points
    for i in range(H + 1):
        for j in range(W + 1):
            case = (p[i, j] * 1) + (p[i, j + 1] * 2) + (p[i + 1, j + 1] * 4) + (p[i + 1, j] * 8)
            if case == 0 or case == 15:
                continue
            for a, b in SEG[case]:
                pa = (2 * j + MID[a][0], 2 * i + MID[a][1])
                pb = (2 * j + MID[b][0], 2 * i + MID[b][1])
                adj.setdefault(pa, set()).add(pb)
                adj.setdefault(pb, set()).add(pa)
    loops = []
    while adj:
        start = next(iter(adj))
        loop = [start]
        prev, cur = None, start
        while True:
            nbrs = adj[cur]
            nxt = None
            for n in nbrs:
                if n != prev:
                    nxt = n
                    break
            if nxt is None:
                break
            adj[cur].discard(nxt)
            adj[nxt].discard(cur)
            if not adj[cur]:
                del adj[cur]
            if nxt == start:
                if nxt in adj and not adj[nxt]:
                    del adj[nxt]
                break
            loop.append(nxt)
            prev, cur = cur, nxt
        pts = [(x / 2.0 - 1.0, y / 2.0 - 1.0) for x, y in loop]
        if len(pts) >= 3:
            loops.append(pts)
    return loops

# ---------------- geometry helpers ----------------
def area(pts):
    s = 0.0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        s += x1 * y2 - x2 * y1
    return s / 2.0

def centroid(pts):
    n = len(pts)
    return (sum(p[0] for p in pts) / n, sum(p[1] for p in pts) / n)

def point_in_poly(pt, poly):
    x, y = pt
    inside = False
    n = len(poly)
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi):
            inside = not inside
        j = i
    return inside

def rdp_open(pts, eps):
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i0, i1 = stack.pop()
        ax, ay = pts[i0]
        bx, by = pts[i1]
        dx, dy = bx - ax, by - ay
        denom = (dx * dx + dy * dy) ** 0.5 or 1e-12
        dmax, imax = -1.0, -1
        for k in range(i0 + 1, i1):
            px, py = pts[k]
            d = abs((px - ax) * dy - (py - ay) * dx) / denom
            if d > dmax:
                dmax, imax = d, k
        if dmax > eps:
            keep[imax] = True
            stack.append((i0, imax))
            stack.append((imax, i1))
    return [p for p, k in zip(pts, keep) if k]

def rdp_closed(pts, eps):
    n = len(pts)
    if n < 4:
        return pts
    cx, cy = centroid(pts)
    a = max(range(n), key=lambda i: (pts[i][0] - cx) ** 2 + (pts[i][1] - cy) ** 2)
    rot = pts[a:] + pts[:a]
    b = max(range(n), key=lambda i: (rot[i][0] - rot[0][0]) ** 2 + (rot[i][1] - rot[0][1]) ** 2)
    half1 = rdp_open(rot[: b + 1], eps)
    half2 = rdp_open(rot[b:] + [rot[0]], eps)
    return half1[:-1] + half2[:-1]

# ---------------- svg path building ----------------
def fmt(v):
    s = f"{v:.1f}".rstrip("0").rstrip(".")
    return s if s not in ("-0", "") else "0"

def smooth_d(pts):
    n = len(pts)
    if n < 4:
        d = [f"M {fmt(pts[0][0])} {fmt(pts[0][1])}"]
        for p in pts[1:]:
            d.append(f"L {fmt(p[0])} {fmt(p[1])}")
        d.append("Z")
        return " ".join(d)
    d = [f"M {fmt(pts[0][0])} {fmt(pts[0][1])}"]
    for i in range(n):
        p0 = pts[(i - 1) % n]
        p1 = pts[i]
        p2 = pts[(i + 1) % n]
        p3 = pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6.0, p1[1] + (p2[1] - p0[1]) / 6.0)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6.0, p2[1] - (p3[1] - p1[1]) / 6.0)
        d.append(f"C {fmt(c1[0])} {fmt(c1[1])} {fmt(c2[0])} {fmt(c2[1])} {fmt(p2[0])} {fmt(p2[1])}")
    d.append("Z")
    return " ".join(d)

def build_shapes(loops):
    """Group loops into shapes: outer contour + its holes."""
    loops = [l for l in loops if abs(area(l)) >= MIN_AREA]
    simple = [rdp_closed(l, RDP_EPS) for l in loops]
    simple = [s for s in simple if len(s) >= 3]
    n = len(simple)
    depth = [0] * n
    parent = [-1] * n
    for i in range(n):
        c = centroid(simple[i])
        containers = [j for j in range(n) if j != i and abs(area(simple[j])) > abs(area(simple[i])) and point_in_poly(c, simple[j])]
        depth[i] = len(containers)
        if containers:
            parent[i] = min(containers, key=lambda j: abs(area(simple[j])))
    shapes = []
    for i in range(n):
        if depth[i] % 2 == 0:  # solid outer
            holes = [simple[j] for j in range(n) if parent[j] == i and depth[j] % 2 == 1]
            shapes.append({"outer": simple[i], "holes": holes})
    return shapes

def shape_d(shape):
    parts = [smooth_d(shape["outer"])]
    for h in shape["holes"]:
        parts.append(smooth_d(h))
    return " ".join(parts)

def shape_centroid(shape):
    return centroid(shape["outer"])

# ---------------- main ----------------
def main():
    img = Image.open(SRC).convert("L")
    W, H = img.size
    img = img.filter(ImageFilter.GaussianBlur(BLUR))
    g = np.asarray(img, dtype=np.float32)
    ink = g < THRESH

    loops = trace_loops(ink)
    shapes = build_shapes(loops)
    print(f"loops={len(loops)} shapes={len(shapes)} size={W}x{H}")

    # tagline detection: largest zero-ink row band in bottom 25%
    row_counts = ink.sum(axis=1)
    tagline_top = int(H * 0.87)
    best_len, best_start = 0, None
    run_start = None
    for y in range(int(H * 0.72), int(H * 0.95)):
        if row_counts[y] == 0:
            if run_start is None:
                run_start = y
            if y - run_start > best_len:
                best_len, best_start = y - run_start, run_start
        else:
            run_start = None
    if best_start is not None and best_len >= 8:
        tagline_top = best_start + best_len // 2
    print(f"tagline_top={tagline_top}")

    def shape_max_y(s):
        return max(p[1] for p in s["outer"])

    body_shapes = [s for s in shapes if shape_centroid(s)[1] < tagline_top]
    tag_shapes = [s for s in shapes if shape_centroid(s)[1] >= tagline_top]

    header = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" '
              'fill="currentColor" fill-rule="evenodd" role="img" '
              'aria-label="dos A — audio · iluminación · video">') % (W, H)

    def write_svg(path, groups):
        with open(path, "w", encoding="utf-8") as f:
            f.write(header + "\n")
            for gid, shape_list in groups:
                if gid:
                    f.write(f'  <g id="{gid}">\n')
                for s in shape_list:
                    d = shape_d(s)
                    if gid:
                        f.write(f'    <path class="glyph" d="{d}"/>\n')
                    else:
                        f.write(f'  <path d="{d}"/>\n')
                if gid:
                    f.write("  </g>\n")
            f.write("</svg>\n")
        print(f"wrote {path} ({os.path.getsize(path)} bytes)")

    write_svg(os.path.join(OUT, "dos-a-logo.svg"), [(None, body_shapes + tag_shapes)])
    write_svg(os.path.join(OUT, "dos-a-mark.svg"), [(None, body_shapes)])

    # layered split for animation
    dos, acable, tag = [], [], []
    for s in body_shapes:
        cx, cy = shape_centroid(s)
        if cx < W * 0.55 and cy < H * 0.62 and abs(area(s["outer"])) < 60000:
            dos.append(s)
        else:
            acable.append(s)
    tag = tag_shapes
    write_svg(os.path.join(OUT, "dos-a-logo-animated.svg"),
              [("dos", dos), ("a-cable", acable), ("tagline", tag)])
    print(f"layers: dos={len(dos)} a-cable={len(acable)} tagline={len(tag)}")

    # ---- verification renders ----
    def render(shapes_list, path, colors=None):
        canvas = Image.new("RGB", (W, H), (245, 245, 245))
        dr = ImageDraw.Draw(canvas)
        for idx, s in enumerate(shapes_list):
            col = colors[idx % len(colors)] if colors else (0, 0, 0)
            dr.polygon(s["outer"], fill=col)
            for h in s["holes"]:
                dr.polygon(h, fill=(245, 245, 245))
        canvas.save(path)

    render(shapes, os.path.join(OUT, "dos-a-logo-trace-preview.png"))
    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    for s in shapes:
        md.polygon(s["outer"], fill=255)
        for h in s["holes"]:
            md.polygon(h, fill=0)
    m = np.asarray(mask) > 0
    inter = (m & ink).sum()
    union = (m | ink).sum()
    print(f"IoU(trace vs source ink) = {inter / union:.4f}")

    colored = []
    cmap = {"dos": (20, 20, 20), "a-cable": (200, 30, 30), "tagline": (30, 90, 200)}
    for group, shapes_list in (("dos", dos), ("a-cable", acable), ("tagline", tag)):
        colored.extend(shapes_list)
    cols = []
    for group, shapes_list in (("dos", dos), ("a-cable", acable), ("tagline", tag)):
        cols.extend([cmap[group]] * len(shapes_list))
    render(colored, os.path.join(OUT, "dos-a-logo-parts-preview.png"), colors=cols)
    print("previews written")

if __name__ == "__main__":
    main()
