#!/usr/bin/env python3
"""
Legger forsiden foran husmanualen.

    python3 tools/slaa-sammen.py forside.pdf innhold.pdf ferdig.pdf

Kalles automatisk av tools/lag-pdf.js, så den trenger du normalt ikke
kjøre selv. Grunnen til at forsiden lages for seg, er at den skal gå
helt ut i arkkanten og ikke ha bunntekst og sidetall. Det lar seg ikke
gjøre i samme utskrift som resten.

Krever: pip install PyMuPDF
"""

import sys
from pathlib import Path

import pymupdf


def main(forside, innhold, ferdig):
    ut = pymupdf.open()
    for fil in (forside, innhold):
        if not Path(fil).exists():
            sys.exit(f"finner ikke {fil}")
        with pymupdf.open(fil) as d:
            ut.insert_pdf(d)
    Path(ferdig).parent.mkdir(parents=True, exist_ok=True)
    ut.save(ferdig, garbage=3, deflate=True)
    print(f"{ferdig}  {ut.page_count} sider")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__.strip())
    main(*sys.argv[1:])
