"""Build the responsive hero srcset from the 2x-upscaled image40 master.

Outputs WebP + JPEG at 1280/1920/2508 widths, plus a tiny LQIP placeholder.
"""
from PIL import Image, ImageFilter
from pathlib import Path

master_path = Path("assets/hero/image40-2x-fast.png")
out = Path("assets/hero")

img = Image.open(master_path).convert("RGB")
# Gentle denoise + micro-contrast for projection-photo polish
img = img.filter(ImageFilter.GaussianBlur(radius=0.4))
w, h = img.size
print("master", w, h)

WIDTHS = [1280, 1920, w]  # never upscale beyond master
results = []
for tw in WIDTHS:
    th = round(h * tw / w)
    resized = img if tw == w else img.resize((tw, th), Image.LANCZOS)
    for fmt, params in (("webp", {"quality": 80, "method": 6}), ("jpg", {"quality": 82, "progressive": True, "optimize": True})):
        p = out / f"dosa-hero-loreal-{tw}w.{fmt}"
        resized.save(p, **params)
        results.append((p.name, tw, th, p.stat().st_size // 1024))

# LQIP: 24px-wide blurred placeholder for instant paint
lqip = img.resize((24, round(h * 24 / w)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(2))
lqip.save(out / "dosa-hero-lqip.jpg", quality=40)
results.append(("dosa-hero-lqip.jpg", 24, lqip.size[1], (out / "dosa-hero-lqip.jpg").stat().st_size // 1024))

for name, tw, th, kb in results:
    print(f"{name:34s} {tw}x{th:<5} {kb} KB")
