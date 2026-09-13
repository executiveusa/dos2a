"""Extract slide text and media inventory from DOSA audio.pptx."""
import os
import re
import zipfile
import xml.etree.ElementTree as ET

WS = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
PPTX = os.path.join(WS, "DOSA audio.pptx")

if not os.path.exists(PPTX):
    print(f"NOT FOUND: {PPTX}")
    for f in os.listdir(WS):
        if f.lower().endswith((".pptx", ".ppt")):
            print("candidate:", f)
    raise SystemExit(1)

z = zipfile.ZipFile(PPTX)
slides = sorted(
    [n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)],
    key=lambda n: int(re.search(r"\d+", n.split("/")[-1]).group()),
)
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}t"
for s in slides:
    root = ET.fromstring(z.read(s))
    texts = [t.text for t in root.iter(A) if t.text and t.text.strip()]
    print(f"\n=== {os.path.basename(s)} ===")
    print(" | ".join(texts) if texts else "(no text)")

media = [n for n in z.namelist() if n.startswith("ppt/media/")]
print(f"\n\n=== MEDIA ({len(media)} files) ===")
for m in sorted(media):
    print(f"{m}  {z.getinfo(m).file_size} bytes")
