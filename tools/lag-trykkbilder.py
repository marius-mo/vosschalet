#!/usr/bin/env python3
"""
Lager nedskalerte kopier av bildene som brukes i den trykte husmanualen.

    python3 tools/lag-trykkbilder.py

Bildene vises små på papiret, så full oppløsning er bortkastet — det
gjør bare PDF-en tung. Kopiene legges i .trykk/ og slettes trygt etterpå.
"""
import json, re, shutil, subprocess, sys
from pathlib import Path
from PIL import Image

ROT = Path(__file__).resolve().parent.parent
UT = ROT / ".trykk"
MAKS = 900  # piksler bredde – rikelig for 55 mm på papir

data = subprocess.run(
    ["node", "-e", "global.window={};require('./assets/js/content.js');"
     "console.log(JSON.stringify(window.SITE.media.manual))"],
    cwd=ROT, capture_output=True, text=True, check=True).stdout
manual = json.loads(data)

if UT.exists():
    shutil.rmtree(UT)
UT.mkdir()

talt = spart = 0
for seksjon in manual.values():
    for m in seksjon:
        sti = m["src"]
        if not sti.startswith("assets/img/") or "/qr/" in sti:
            continue
        kilde = ROT / sti
        if not kilde.exists():
            print("mangler:", sti); continue
        mål = UT / kilde.name
        if mål.exists():
            continue
        im = Image.open(kilde).convert("RGB")
        if im.width > MAKS:
            im = im.resize((MAKS, round(im.height * MAKS / im.width)), Image.LANCZOS)
        im.save(mål, "JPEG", quality=78, optimize=True, progressive=True)
        talt += 1
        spart += kilde.stat().st_size - mål.stat().st_size

print(f"{talt} bilder skalert ned til {UT.name}/ — sparte {spart/1048576:.1f} MB")
