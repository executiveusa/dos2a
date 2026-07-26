"""Split an image into overlapping quadrants for tiled upscaling."""
from PIL import Image
from pathlib import Path

src = Path("ops/pptx-media/fullsize/image40.png")
out = Path("assets/hero/tiles")
out.mkdir(parents=True, exist_ok=True)

img = Image.open(src).convert("RGB")
w, h = img.size
ov = 48  # overlap to hide seams
hw, hh = w // 2, h // 2
quads = {
    "tl": (0, 0, hw + ov, hh + ov),
    "tr": (hw - ov, 0, w, hh + ov),
    "bl": (0, hh - ov, hw + ov, h),
    "br": (hw - ov, hh - ov, w, h),
}
for name, box in quads.items():
    img.crop(box).save(out / f"image40-{name}.png")
    print(name, box, (box[2]-box[0], box[3]-box[1]))
print("source", w, h)
