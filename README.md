# Voss Chalet – nettside

Nettside for utleiehytta i Tråstølen på Voss: beskrivelse, husregler, husmanual og tips til området.
Siden er ren HTML/CSS/JavaScript uten byggesteg — ingen npm, ingen rammeverk. Den kan legges rett på
GitHub Pages, Netlify, eller hvilken som helst webhotell-mappe.

## Innhold

| Fil | Hva det er |
| --- | --- |
| `index.html` | **Landingsside (norsk)** – åpen for alle og den eneste siden søkemotorer skal finne. **Genereres** — rediger ikke direkte |
| `en.html` | Samme landingsside på engelsk. Genereres |
| `tools/bygg-landingsside.js` | Bygger `index.html`, `en.html`, `sitemap.xml`, `robots.txt` og `404.html` fra `content.js` |
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
| `admin/passord.html` | Verktøy for å bytte passord (ikke lenket fra siden) |

## Viktig: landingssidene bygges

`index.html` og `en.html` skrives ut av et skript. Endrer du dem for hånd, blir endringen
borte neste gang skriptet kjører. Endre teksten i `content.js`, og kjør:

```bash
node tools/bygg-landingsside.js
```

Det oppdaterer begge landingssidene, `sitemap.xml`, `robots.txt` og `404.html`.

Grunnen er søkemotorene: resten av nettstedet bygges av JavaScript i nettleseren, og da ser
Google nesten ingen tekst. Landingssiden skrives derfor ut som ferdig HTML — 6 300 tegn
lesbar tekst mot 286 før. Teksten hentes fra `content.js`, så det finnes fortsatt bare én kilde.

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

**Eget domene (f.eks. vosschalet.no):** legg en fil `CNAME` i roten med domenet som eneste
innhold, og pek domenets DNS mot GitHub Pages. Alternativt kan mappa slippes rett inn i Netlify.

## Synlighet i søk

Landingssidene er laget for å kunne rangere:

* Ekte HTML-tekst (ikke bare JavaScript), egen tittel og beskrivelse per språk
* `canonical` og `hreflang` mellom norsk og engelsk, så Google vet at det er samme side
* Strukturerte data (`VacationRental`) med adresse, fasiliteter, inn-/utsjekk og vurdering
* Open Graph og Twitter-kort, så lenken ser riktig ut når den deles
* `sitemap.xml` med kun de to landingssidene
* Alt-tekst på alle bilder

Gjestesidene er merket `noindex` og ligger ikke i sitemap. De er **bevisst ikke** sperret i
`robots.txt`: en sperre ville hindret Google i å hente siden, og da ville den aldri lest
`noindex`-merket — adressen kunne blitt liggende i søkeresultatet uten innhold.

**Eget domene:** adressen `marius-mo.github.io/vosschalet/` rangerer svakere enn et eget
domene. Får dere `vosschalet.no`, endre `meta.siteUrl` i `content.js`, kjør
`node tools/bygg-landingsside.js`, legg en `CNAME`-fil i roten og pek DNS mot GitHub Pages.

**Meld siden inn:** legg den til i [Google Search Console](https://search.google.com/search-console)
og send inn `sitemap.xml`. Uten det kan det ta lang tid før siden dukker opp.
