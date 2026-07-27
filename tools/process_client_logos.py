"""Process client logos for the dos A client wall.

Unmultiplies white backgrounds to transparency, trims padding,
normalizes optical size, exports PNG + WebP at 2x display size,
and renders a dark-background contact sheet for visual QA.
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-inbox" / "client-logos"
OUT = ROOT / "frontend" / "public" / "brand" / "clients"
OUT.mkdir(parents=True, exist_ok=True)

# slug -> (source filename, target height px, max width px)
SPECS = {
    "coca-cola": ("coca-cola.png", 96, 420),
    "exxonmobil": ("exxon mobile.png", 96, 420),
    "jpmorgan": ("jp morgan.png", 96, 420),
    "loreal": ("l real.png", 96, 420),
    "chevron": ("chevron.jpg", 132, 300),
    "veci": ("viajes-el-corte-ingles-mexico-logo-png_seeklogo-233512.png", 148, 340),
}


def unmultiply_white(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            wa = 255 - min(r, g, b)          # distance from white
            wa = int(max(0, min(255, (wa - 14) * 1.6)))
            px[x, y] = (r, g, b, min(a, wa))
    return img


def trim(img: Image.Image, thresh: int = 8, pad_ratio: float = 0.06) -> Image.Image:
    alpha = img.getchannel("A").point(lambda v: 255 if v > thresh else 0)
    bbox = alpha.getbbox()
    if not bbox:
        return img
    img = img.crop(bbox)
    pad = int(max(img.size) * pad_ratio)
    canvas = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
    canvas.paste(img, (pad, pad))
    return canvas


def fit(img: Image.Image, target_h: int, max_w: int) -> Image.Image:
    scale = target_h / img.height
    if img.width * scale > max_w:
        scale = max_w / img.width
    size = (round(img.width * scale), round(img.height * scale))
    return img.resize(size, Image.LANCZOS)


results = {}
for slug, (name, th, mw) in SPECS.items():
    img = unmultiply_white(Image.open(SRC / name))
    img = trim(img)
    img = fit(img, th, mw)
    img.save(OUT / f"{slug}.png", optimize=True)
    img.save(OUT / f"{slug}.webp", quality=90, method=6)
    results[slug] = img.size
    print(slug, img.size)

# --- contact sheet: paper chips on near-black, like the live wall ---
INK = (16, 16, 18, 255)
PAPER = (245, 243, 238, 255)
chip_h, gap, margin = 110, 28, 40
imgs = [(s, Image.open(OUT / f"{s}.png")) for s in SPECS]
chips = []
for slug, im in imgs:
    scale = min(64 / im.height, 0.62 * 320 / im.width, 1.0)
    im2 = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
    cw = im2.width + 56
    chip = Image.new("RGBA", (cw, chip_h), (0, 0, 0, 0))
    d = ImageDraw.Draw(chip)
    d.rounded_rectangle([0, 0, cw - 1, chip_h - 1], radius=14, fill=PAPER)
    chip.paste(im2, ((cw - im2.width) // 2, (chip_h - im2.height) // 2), im2)
    chips.append(chip)
W = sum(c.width for c in chips) + gap * (len(chips) - 1) + margin * 2
sheet = Image.new("RGBA", (W, chip_h + margin * 2), INK)
x = margin
for c in chips:
    sheet.paste(c, (x, margin), c)
    x += c.width + gap
sheet.save(OUT / "_contact-sheet.png")
print("sheet", sheet.size)
