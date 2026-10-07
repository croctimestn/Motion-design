"""Fabrique la version 9:16 (videos/growlot-3d-9x16) à partir de ce projet 16:9.
Les scènes lisent window.FMT ("h" ou "v") et choisissent leur mise en page avec Kit.P(h, v) :
il suffit donc de recopier le projet et de basculer le format et les dimensions."""
import pathlib, re, shutil

src = pathlib.Path(__file__).resolve().parent
dst = src.parent / "growlot-3d-9x16"
if dst.exists():
    shutil.rmtree(dst)
shutil.copytree(src, dst, ignore=shutil.ignore_patterns("renders", "snapshots", "make-9x16.py", "BRIEF.md", "*.mp4"))

idx = dst / "index.html"
s = idx.read_text()
s = s.replace('window.FMT = "h"', 'window.FMT = "v"')
s = s.replace('data-resolution="landscape"', 'data-resolution="portrait"')
s = s.replace('content="width=1920, height=1080"', 'content="width=1080, height=1920"')
s = s.replace("width: 1920px; height: 1080px;", "width: 1080px; height: 1920px;")
s = s.replace('data-width="1920" data-height="1080"', 'data-width="1080" data-height="1920"')
s = s.replace("Grow Lot – Il reviendra peut-être (3D)", "Grow Lot – Il reviendra peut-être (3D, 9:16)")
idx.write_text(s)
for f in (dst / "compositions").glob("*.html"):
    t = f.read_text().replace('data-width="1920" data-height="1080"', 'data-width="1080" data-height="1920"')
    f.write_text(t)
(dst / "meta.json").write_text('{\n  "id": "growlot-3d-9x16",\n  "name": "growlot-3d-9x16",\n  "createdAt": "2026-10-07T09:00:00.000Z"\n}\n')
pk = dst / "package.json"
pk.write_text(pk.read_text().replace('"growlot-3d"', '"growlot-3d-9x16"'))
print("9:16 prêt :", dst)
