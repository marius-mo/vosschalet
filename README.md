# Voss Chalet – nettside

Nettside for utleiehytta i Tråstølen på Voss: beskrivelse, husregler, husmanual og tips til området.
Siden er ren HTML/CSS/JavaScript uten byggesteg — ingen npm, ingen rammeverk. Den kan legges rett på
GitHub Pages, Netlify, eller hvilken som helst webhotell-mappe.

## Innhold

| Fil | Hva det er |
| --- | --- |
| `index.html` | **Landingsside** – åpen for alle. Bilde, kort presentasjon, «Book på Airbnb» og passordfelt |
| `hytta.html` | Hyttesiden: hero, om hytta, høydepunkter, soverom, fasiliteter, galleri, anmeldelser, beliggenhet, vertskap |
| `husmanual.html` | Husmanual med wifi, viktige numre og trekkspill-seksjoner (ankomst, jacuzzi, badstue, peis …) |
| `husregler.html` | Husregler |
| `omradet.html` | Guide til Voss og omegn |
| `assets/js/content.js` | **All tekst på siden.** Det er her du redigerer. |
| `assets/js/app.js` | Bygger sidene ut fra `content.js`. Trenger normalt ingen endringer. |
| `assets/css/styles.css` | Design, farger og mørkt tema |
| `assets/img/` | Bilder |
| `assets/video/` | Videoer til husmanualen |
| `assets/filer/` | Kart og PDF-er gjestene kan laste ned |
| `tools/lag-wifi-qr.py` | Lager QR-koden gjestene skanner for å koble seg på wifi |
| `tools/lag-video-qr.py` | Lager QR-kodene til videoene, som brukes i den trykte guiden |
| `tools/lag-utskriftsguide.js` | Bygger den trykte husmanualen som HTML |
| `tools/lag-trykkbilder.py` | Skalerer ned bildene som skal i PDF-en |
| `tools/lag-pdf.js` | Gjør utskriftsguiden om til ferdige PDF-er |
| `admin/passord.html` | Verktøy for å bytte passord (ikke lenket fra siden) |
| `googlee34a42972e0cb2e8.html` | Google Search Console sin eierskapsfil. **Må ikke slettes eller endres** — da mister dere verifiseringen |
| `.nojekyll` | Tom fil som sier til GitHub Pages at filene skal serveres som de er. **Ikke slett den** — uten den kjøres siden gjennom Jekyll, og det steget har feilet og stoppet publiseringen |

## Slik endrer du tekst

All tekst ligger i `assets/js/content.js`. Filen er kommentert på norsk. Det finnes to språkblokker:

* `no:` – norsk
* `en:` – engelsk

Endrer du noe i den ene, husk å endre tilsvarende i den andre.

Nøkkelinfo som gjelder begge språk (adresse, innsjekkstider, wifi, Airbnb-lenke, nødnumre,
kart) ligger øverst i `meta:`.

## Wifi-QR

Husmanualen viser en QR-kode gjestene kan skanne for å koble telefonen på wifi automatisk.
Koden er generert fra verdiene i `content.js`. **Endrer dere wifi-navn eller passord, må QR-en
lages på nytt:**

```bash
pip install qrcode pillow opencv-python-headless
python3 tools/lag-wifi-qr.py
```

Skriptet leser `content.js`, skriver `assets/img/wifi-qr.svg`, og kontrollerer til slutt at
koden faktisk lar seg skanne. (Send meg beskjed hvis du heller vil at jeg gjør det.)

Knappen «Koble til wifi» over QR-koden kopierer passordet til utklippstavla. En nettside kan
ikke koble telefonen til et nettverk på egen hånd — den funksjonen finnes ikke i nettleseren —
så QR-koden er den eneste helautomatiske veien.

## Husmanual på papir

`assets/filer/husmanual-voss-chalet.pdf` (norsk) og `house-manual-voss-chalet.pdf` (engelsk)
er ment å skrives ut og ligge fysisk på hytta. De inneholder det samme som husmanualen,
husreglene og områdeguiden på nett, med én forskjell: **der nettsiden har video, står det en
QR-kode.** Gjesten skanner koden med telefonkameraet og ser filmen. Wifi-koden ligger der
også, sammen med en kode til områdesiden (der hvert sted har kartlenke) og en til nettsiden.

Gjestene kan også laste ned PDF-en selv, fra knappen nederst i husmanualen på nett.

### Slik lager du dem på nytt

Kjøres etter at du har endret tekst i `content.js`, eller lagt til nye videoer:

```bash
python3 tools/lag-video-qr.py        # QR-koder til videoene (bare ved nye videoer)
python3 tools/lag-trykkbilder.py     # nedskalerte bilder til trykk
python3 -m http.server 8899 &        # bildene hentes herfra mens PDF-en lages
PRINT_IMG=".trykk/" node tools/lag-utskriftsguide.js
node tools/lag-pdf.js                # krever Playwright
rm -rf .trykk
```

PDF-en er satt opp slik at en seksjon som ikke får plass nederst på en side, flyttes hel til
neste. Det gir noen luftige sider, men ingen punkter som blir delt midt i. Bildene beholder
sitt eget størrelsesforhold og beskjæres ikke.

Skal en video ha QR-kode i papirguiden, legg den inn i `KODER` i `tools/lag-video-qr.py`
(en full `https://…`-adresse brukes som den er, ellers legges stien til nettadressen), kjør
skriptet, og før den samme videoen inn i `QR`-tabellen øverst i `tools/lag-utskriftsguide.js`.

Uten `PRINT_IMG` blir PDF-en rundt 14 MB i stedet for 1,5 — bildene legges da inn i full
oppløsning, som er bortkastet når de vises små på papiret.

## Nedlastinger og kartlenker

Nederst på områdesiden ligger kart og guider til nedlasting, satt opp under `downloads` i
`content.js`. Legg filen i `assets/filer/`, og et forhåndsvisningsbilde i `assets/img/`.

Hvert sted i områdeguiden kan ha:

* `map: "Voss Resort, Voss"` – lager en Google Maps-lenke av søketeksten
* `url: "https://vossresort.no"` – lenke til stedets egen nettside
* `img:` eller `video:` – bilde, eller en YouTube-/Vimeo-lenke som spilles av i kortet

## Passord

Landingssiden (`index.html`) er åpen for alle. Hytteside, husmanual, husregler og områdeguide
krever passord. Passordet ligger **ikke** i klartekst i koden — bare et sha256-avtrykk.

**Passordet er `modernchalet`.**

Slik bytter du:

1. Åpne `admin/passord.html` i nettleseren (f.eks. `https://…/admin/passord.html`)
2. Skriv inn det nye passordet
3. Kopier linjen du får, og lim den inn i `content.js` der det står `hash:` under `access`
4. Send det nye passordet til gjestene i Airbnb-meldingen

Gjesten forblir innlogget i nettleseren sin til hen trykker «Logg ut» nederst på siden,
eller til passordet byttes.

### Hva passordet faktisk beskytter

Dette holder sidene unna søkemotorer og tilfeldige besøkende, men det er **ikke ekte
sikkerhet**: hele siden ligger som filer på GitHub Pages, og den som kan lese kildekoden
kan også lese innholdet i husmanualen. Derfor:

* **Ikke legg dørkoden i husmanualen.** Den bør sendes i Airbnb-meldingen, slik teksten
  legger opp til i dag.
* Wifi-passord og lignende er greit — der er risikoen at noen må stå i innkjørselen for
  å ha nytte av det.
* Skal noe være virkelig hemmelig, trengs ekte innlogging med en server bak. Si fra hvis
  det blir aktuelt.

## Slik legger du inn bilder

1. Last ned bildene fra Airbnb-annonsen (eller bruk originalene).
2. Legg dem i `assets/img/`. Anbefalt: ca. 1600 px bredde, `.jpg` eller `.webp`, under 400 kB per bilde.
3. Skriv filnavnet i `content.js`:
   * Toppbildet på landingssiden: `media.landing`
   * Toppbildet på hyttesiden: `media.hero`
   * Galleriet: listen `media.gallery`
   * Bilder i husmanualen: `media.manual` (se under)

Bilder som ikke finnes ennå vises som en pen plassholder — siden ser aldri ødelagt ut mens du jobber.

## Bilder og video i husmanualen

Bilder og video i husmanualen ligger samlet under `media.manual` i `content.js`, gruppert
per seksjon:

```js
manual: {
  ankomst: [
    { src: "assets/video/ankomst-kjorevei.mp4", capNo: "Veien opp til hytta", capEn: "The drive up" },
    { src: "assets/img/manual-kodelas.jpg",     capNo: "Kodelåsen",           capEn: "The keypad lock" }
  ]
}
```

Nøkkelen (`ankomst`, `jacuzzi`, `badstue`, `peis`, `kjokken`, `lading`, `soppel`) må stemme
med `id` på seksjonen lenger nede i filen. Rekkefølgen i listen er rekkefølgen på siden.

* **Egen film:** legg fila i `assets/video/` og skriv `"assets/video/peis.mp4"`.
* **YouTube/Vimeo:** lim inn vanlig lenke, f.eks. `"https://youtu.be/xxxxxxxx"` — den bygges automatisk om til en innebygd spiller.

Videoene som ligger inne nå er komprimert til 1–6 MB hver. Legger du inn nye filer rett fra
telefonen (ofte 20–25 MB), bør de komprimeres først — ellers blir siden treg på mobilnett.

## Kart

Åpne Google Maps, søk opp hytta, trykk **Del → Bygg inn kart**, kopier adressen som står i
`src="..."`, og lim den inn i `meta.mapEmbed` i `content.js`. Står feltet tomt, vises en
plassholder i stedet, og knappen «Åpne i Google Maps» bruker `meta.mapLink`.

## Språk

Siden husker språkvalget i nettleseren, og velger norsk automatisk for norske nettlesere.
Du kan lenke direkte til et språk med `?lang=en` eller `?lang=no`, f.eks.
`https://…/husmanual.html?lang=en` — praktisk i meldinger til utenlandske gjester.

## Mørkt tema

Følger systeminnstillingen automatisk, og kan overstyres med knappen i toppen.

## Utskrift og QR-kode

Husmanualen har en «Skriv ut»-knapp med eget utskriftsoppsett (meny, bunntekst og bilder
fjernes). Fint å henge opp i hytta sammen med en QR-kode som peker til `husmanual.html`.

## Publisering

**GitHub Pages:** legg filene i roten av et repo, gå til Settings → Pages, velg `main` og `/ (root)`.
Siden blir liggende på `https://BRUKERNAVN.github.io/REPONAVN/`.

Husk `.nojekyll` i roten (se tabellen over). Endrer du noe i `assets/`, bump `?v=`-tallet
bakerst på js- og css-lenkene i alle html-filene, ellers kan gjestene bli sittende med den
gamle versjonen i inntil ti minutter.

**Eget domene (f.eks. vosschalet.no):** legg en fil `CNAME` i roten med domenet som eneste
innhold, og pek domenets DNS mot GitHub Pages. Alternativt kan mappa slippes rett inn i Netlify.

## Merk

Innholdet bygges av JavaScript i nettleseren. Det gjør at all tekst kan bo i én fil på to språk,
men det betyr også at søkemotorer ser mindre av teksten enn på en tradisjonell statisk side.
For en side som først og fremst deles som lenke til gjester er det en grei avveining — skal siden
rangeres i Google på egen hånd, bør forsideteksten legges direkte i `index.html` i tillegg.
