#!/usr/bin/env python3
"""
Lager QR-kodene som står i den trykte husmanualen.

Hver kode peker til en videofil på nettsiden, slik at gjesten kan skanne
koden i papirguiden og se filmen på telefonen.

    python3 tools/lag-video-qr.py

Skriver SVG-filer til assets/img/qr/ og kontrollerer til slutt at hver
kode faktisk lar seg skanne.

Krever: pip install qrcode pillow opencv-python-headless
"""

import sys
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
UT = ROT / "assets/img/qr"

# Adressen nettsiden ligger på. Bytter dere domene, endre denne linjen
# og kjør skriptet på nytt.
BASE = "https://marius-mo.github.io/vosschalet/"

# Filnavn på QR-koden  ->  hva den peker til
KODER = {
    "video-ankomst-kjorevei": "assets/video/ankomst-kjorevei.mp4",
    "video-jacuzzi": "assets/video/jacuzzi.mp4",
    "video-badstue": "assets/video/badstue.mp4",
    "video-kjokken-kokende-vann": "assets/video/kjokken-kokende-vann.mp4",
    "nettsiden": "",
}


def main():
    import qrcode
    import qrcode.image.svg

    UT.mkdir(parents=True, exist_ok=True)
    try:
        import cv2
        leser = cv2.QRCodeDetector()
    except ImportError:
        leser = None
        print("Merk: opencv ikke installert, hopper over kontrollen")

    feil = 0
    for navn, sti in KODER.items():
        adresse = BASE + sti
        qr = qrcode.QRCode(
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=2,
        )
        qr.add_data(adresse)
        qr.make(fit=True)
        qr.make_image(image_factory=qrcode.image.svg.SvgPathImage).save(str(UT / f"{navn}.svg"))

        if leser:
            png = UT / f".{navn}-kontroll.png"
            qr.make_image(fill_color="black", back_color="white").save(str(png))
            lest, *_ = leser.detectAndDecode(cv2.imread(str(png)))
            png.unlink(missing_ok=True)
            merke = "✓" if lest == adresse else "✗ SKANNING FEILET"
            if lest != adresse:
                feil += 1
        else:
            merke = ""
        print(f"{navn:32s} {merke}  →  {adresse}")

    if feil:
        sys.exit(f"{feil} kode(r) lot seg ikke lese")
    print(f"\n{len(KODER)} koder skrevet til {UT.relative_to(ROT)}")


if __name__ == "__main__":
    main()
