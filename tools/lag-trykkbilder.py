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
MAKS = 900  # piksler bredde, rikelig for 55 mm på papir
MAKS_FORSIDE = 1500  # forsidebildet dekker halve arket og trenger mer

data = subprocess.run(
    ["node", "-e", "global.window={};require('./assets/js/content.js');"
     "console.log(JSON.stringify({m:window.SITE.media.manual,"
     "f:window.SITE.media.landing}))"],
    cwd=ROT, capture_output=True, text=True, check=True).stdout
alt = json.loads(data)
manual, forside = alt["m"], alt["f"]

if UT.exists():
    shutil.rmtree(UT)
UT.mkdir()

def skaler(sti, maks, kvalitet=78):
    """Skriver en nedskalert jpeg til .trykk/ og sier hvor mye det sparte."""
    if not sti.startswith("assets/img/") or "/qr/" in sti:
        return 0, 0
    kilde = ROT / sti
    if not kilde.exists():
        print("mangler:", sti)
        return 0, 0
    mål = UT / kilde.name
    if mål.exists():
        return 0, 0
    im = Image.open(kilde).convert("RGB")
    if im.width > maks:
        im = im.resize((maks, round(im.height * maks / im.width)), Image.LANCZOS)
    im.save(mål, "JPEG", quality=kvalitet, optimize=True, progressive=True)
    return 1, kilde.stat().st_size - mål.stat().st_size


talt = spart = 0
# Forsidebildet først, så det får sin egen oppløsning før noe annet
# rekker å legge en liten kopi på samme filnavn
n, s = skaler(forside, MAKS_FORSIDE, 82)
talt += n
spart += s

for seksjon in manual.values():
    for m in seksjon:
        n, s = skaler(m["src"], MAKS)
        talt += n
        spart += s

print(f"{talt} bilder skalert ned til {UT.name}/ — sparte {spart/1048576:.1f} MB")
