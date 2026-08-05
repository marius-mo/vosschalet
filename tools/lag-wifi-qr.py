#!/usr/bin/env python3
"""
Lager QR-koden gjestene skanner for å koble seg på wifi.

Kjøres på nytt hvis wifi-navn eller passord endres:

    python3 tools/lag-wifi-qr.py

Skriptet leser verdiene rett fra assets/js/content.js, skriver
assets/img/wifi-qr.svg, og kontrollerer til slutt at koden faktisk
lar seg skanne.

Krever: pip install qrcode pillow opencv-python-headless
"""

import re
import subprocess
import sys
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent
CONTENT = ROT / "assets/js/content.js"
UT = ROT / "assets/img/wifi-qr.svg"


def les_wifi():
    tekst = CONTENT.read_text(encoding="utf-8")
    m = re.search(r'wifi:\s*\{\s*ssid:\s*"([^"]*)"\s*,\s*password:\s*"([^"]*)"', tekst)
    if not m:
        sys.exit("Fant ikke wifi-linjen i content.js")
    return m.group(1), m.group(2)


def rom(verdi):
    """Tegn som har spesiell betydning i WIFI-strengen må escapes."""
    for tegn in ["\\", ";", ",", ":", '"']:
        verdi = verdi.replace(tegn, "\\" + tegn)
    return verdi


def main():
    ssid, passord = les_wifi()
    nyttelast = f"WIFI:T:WPA;S:{rom(ssid)};P:{rom(passord)};;"
    print(f"Nettverk: {ssid}")

    import qrcode
    import qrcode.image.svg

    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(nyttelast)
    qr.make(fit=True)

    bilde = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    bilde.save(str(UT))
    print(f"Skrev {UT.relative_to(ROT)}")

    # Kontroll: rasteriser og skann koden som en telefon ville gjort
    png = ROT / "assets/img/.wifi-qr-kontroll.png"
    qr.make_image(fill_color="black", back_color="white").save(str(png))
    try:
        import cv2

        funnet, *_ = cv2.QRCodeDetector().detectAndDecode(cv2.imread(str(png)))
        if funnet == nyttelast:
            print("Kontroll: koden lar seg skanne, og innholdet stemmer ✓")
        else:
            sys.exit(f"Kontroll feilet. Skannet: {funnet!r}")
    except ImportError:
        print("Hopper over kontroll (opencv ikke installert)")
    finally:
        png.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
