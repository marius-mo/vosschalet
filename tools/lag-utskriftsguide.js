/* =====================================================================
   Bygger den trykte husmanualen — den som skal ligge fysisk på hytta.

       node tools/lag-utskriftsguide.js

   Skriver en utskriftsvennlig HTML-fil per språk til /tmp, som deretter
   gjøres om til PDF (se tools/lag-pdf.js).

   Innholdet er det samme som på nettsiden, hentet fra content.js, med
   én forskjell: der nettsiden har video, står det en QR-kode i papiret.
   Gjesten skanner koden med telefonkameraet og ser filmen.
   ===================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");

const ROT = path.join(__dirname, "..");
global.window = {};
require(path.join(ROT, "assets/js/content.js"));
const S = global.window.SITE;

// Bildene hentes fra den lokale tjeneren mens PDF-en lages
const BASE = process.env.PRINT_BASE || "http://localhost:8899/";

// Bildene i papirguiden vises små. Peker denne til en mappe med
// nedskalerte kopier, blir PDF-en langt lettere å sende og skrive ut.
// Lages av tools/lag-trykkbilder.py.
const BILDEMAPPE = process.env.PRINT_IMG || "";
const bilde = (sti) =>
  BILDEMAPPE && sti.startsWith("assets/img/") && !sti.includes("/qr/")
    ? BILDEMAPPE + sti.slice("assets/img/".length)
    : sti;

// Videofil -> QR-kode og bildetekst
const QR = {
  "assets/video/ankomst-kjorevei.mp4": "assets/img/qr/video-ankomst-kjorevei.svg",
  "assets/video/jacuzzi.mp4": "assets/img/qr/video-jacuzzi.svg",
  "assets/video/badstue.mp4": "assets/img/qr/video-badstue.svg",
  "assets/video/kjokken-kokende-vann.mp4": "assets/img/qr/video-kjokken-kokende-vann.svg",
};

// Setninger som bare gir mening på skjerm, lukes bort fra papirversjonen
const papir = (t) => String(t || "")
  .replace(/\s*Klikk på et punkt for å åpne det\.\s*/g, " ")
  .replace(/\s*Click a section to open it\.\s*/g, " ")
  .replace(/,\s*se (videoen|bildet) under\.?/gi, ".")
  .replace(/,\s*see the (video|photo) below\.?/gi, ".")
  .replace(/Videoen under viser hvordan dere skrur den på\./g, "Skann QR-koden under, så ser dere hvordan den skrus på.")
  .replace(/The video below shows how to switch it on\./g, "Scan the QR code below to see how to switch it on.")
  .replace(/\s{2,}/g, " ").trim();

const esc = (t) =>
  String(t == null ? "" : t)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const T_ = {
  no: {
    manualTittel: "Husmanual",
    reglerTittel: "Husregler",
    skann: "Skann for å se filmen",
    bilder: "Bilder",
    nettside: "Hele guiden på nett",
    nettsideTekst: "Skann for å åpne nettsiden med bilder, video og tips til området. Passordet står i meldingen dere fikk på Airbnb.",
    tips: "Tips",
  },
  en: {
    manualTittel: "House manual",
    reglerTittel: "House rules",
    skann: "Scan to watch the video",
    bilder: "Photos",
    nettside: "The full guide online",
    nettsideTekst: "Scan to open the website with photos, video and local tips. The password is in the message we sent you on Airbnb.",
    tips: "Tip",
  },
};

/* --- delene ---------------------------------------------------------- */

function toppen(T, L) {
  const m = S.meta;
  const numre = m.emergency.map((e) => {
    const navn = (L === "no" ? e.no : e.en) || e.label;
    const verdi = (L === "no" ? e.valueNo : e.valueEn) || e.value;
    return `<tr><th>${esc(navn)}</th><td>${esc(verdi)}</td></tr>`;
  }).join("");

  return `
  <header class="forside">
    <p class="merke">${esc(m.siteName)} · ${esc(m.address)}</p>
    <h1>${esc(T_[L].manualTittel)}</h1>
    <p class="ingress">${esc(papir(T.manual.intro))}</p>
  </header>

  <section class="bokser">
    <div class="boks">
      <h2>${esc(T.manual.wifiTitle)}</h2>
      <table class="fakta">
        <tr><th>${esc(T.manual.wifiNetwork)}</th><td class="kode">${esc(m.wifi.ssid)}</td></tr>
        <tr><th>${esc(T.manual.wifiPassword)}</th><td class="kode">${esc(m.wifi.password)}</td></tr>
      </table>
      <div class="qr liten">
        <img src="${esc(m.wifi.qr)}" alt="">
        <p>${esc(T.manual.wifiQrHelp)}</p>
      </div>
    </div>

    <div class="boks">
      <h2>${esc(T.manual.checkInLabel)} / ${esc(T.manual.checkOutLabel)}</h2>
      <table class="fakta">
        <tr><th>${esc(T.manual.checkInLabel)}</th><td class="kode">${esc(m.checkIn)}</td></tr>
        <tr><th>${esc(T.manual.checkOutLabel)}</th><td class="kode">${esc(m.checkOut)}</td></tr>
      </table>
      <h2 style="margin-top:14px">${esc(T.manual.emergencyTitle)}</h2>
      <table class="fakta">${numre}</table>
    </div>
  </section>`;
}

function seksjon(s, T, L, nr) {
  const media = (S.media.manual && S.media.manual[s.id]) || [];
  const videoer = media.filter((m) => QR[m.src]);
  const bilder = media.filter((m) => !/\.(mp4|mov|m4v|webm)$/i.test(m.src)).slice(0, 3);

  const qrBlokk = videoer.map((v) => `
      <div class="qr">
        <img src="${esc(QR[v.src])}" alt="">
        <p><strong>${esc(T_[L].skann)}</strong><br>${esc(L === "no" ? v.capNo : v.capEn)}</p>
      </div>`).join("");

  const bildeBlokk = bilder.length ? `
      <div class="bilder">${bilder.map((b) => `
        <figure>
          <img src="${esc(bilde(b.src))}" alt="">
          <figcaption>${esc(L === "no" ? b.capNo : b.capEn)}</figcaption>
        </figure>`).join("")}
      </div>` : "";

  return `
  <section class="del">
    <h2><span class="nr">${nr}</span>${esc(s.title)}</h2>
    ${(s.paragraphs || []).map((p) => `<p>${esc(papir(p))}</p>`).join("")}
    ${(s.steps && s.steps.length) ? `<ol>${s.steps.map((x) => `<li>${esc(papir(x))}</li>`).join("")}</ol>` : ""}
    ${s.tip ? `<p class="tips"><strong>${esc(T_[L].tips)}:</strong> ${esc(papir(s.tip))}</p>` : ""}
    ${qrBlokk}
    ${bildeBlokk}
  </section>`;
}

function husregler(T, L) {
  return `
  <section class="del sideskift">
    <h2>${esc(T_[L].reglerTittel)}</h2>
    <p>${esc(T.rules.intro)}</p>
    <dl class="regler">${T.rules.items.map((r) => `
      <dt>${esc(r.title)}</dt><dd>${esc(r.text)}</dd>`).join("")}
    </dl>
    <h3>${esc(T.rules.moreTitle)}</h3>
    <ul>${T.rules.more.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    <p class="tips"><strong>${esc(T.rules.contactTitle)}</strong> ${esc(T.rules.contactText)}</p>
  </section>

  <section class="del nettside">
    <div class="qr stor">
      <img src="assets/img/qr/nettsiden.svg" alt="">
    </div>
    <div>
      <h2>${esc(T_[L].nettside)}</h2>
      <p>${esc(T_[L].nettsideTekst)}</p>
      <p class="adresse">marius-mo.github.io/vosschalet</p>
    </div>
  </section>`;
}

/* --- stilark til papir ----------------------------------------------- */

const CSS = `
  @page { size: A4; margin: 16mm 15mm 18mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0; color: #1b1a17; background: #fff;
    font: 10.5pt/1.5 -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  h1, h2, h3 { font-family: "Iowan Old Style", Palatino, Georgia, serif; margin: 0 0 .4em; }
  h1 { font-size: 30pt; line-height: 1.1; }
  h2 { font-size: 14pt; }
  h3 { font-size: 11.5pt; margin-top: 1.2em; }
  p { margin: 0 0 .7em; }

  .forside { border-bottom: 2px solid #2f5d50; padding-bottom: 10mm; margin-bottom: 8mm; }
  .merke {
    font-size: 8pt; font-weight: 700; letter-spacing: .16em;
    text-transform: uppercase; color: #2f5d50; margin-bottom: .8em;
  }
  .ingress { font-size: 11pt; color: #4a463f; max-width: 60em; }

  .bokser { display: flex; gap: 6mm; margin-bottom: 9mm; }
  .boks {
    flex: 1; border: 1px solid #d8d0c4; border-radius: 3mm;
    padding: 5mm 6mm; background: #faf7f2;
  }
  .boks h2 { font-family: inherit; font-size: 8pt; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase; color: #7a736a; margin-bottom: .6em; }
  table.fakta { width: 100%; border-collapse: collapse; }
  table.fakta th {
    text-align: left; font-weight: 400; color: #4a463f;
    padding: 1.6mm 0; border-bottom: 1px solid #e8e1d6; vertical-align: top;
  }
  table.fakta td {
    text-align: right; font-weight: 700; padding: 1.6mm 0;
    border-bottom: 1px solid #e8e1d6; white-space: nowrap;
  }
  table.fakta tr:last-child th, table.fakta tr:last-child td { border-bottom: 0; }
  .kode { font-variant-numeric: tabular-nums; letter-spacing: .02em; }

  /* En seksjon som ikke får plass nederst på siden, flyttes hel til neste */
  .del { margin-bottom: 7mm; break-inside: avoid; }
  .del h2 { break-after: avoid; }
  .del h2 { display: flex; align-items: baseline; gap: 3mm; margin-bottom: .5em; }
  .nr {
    display: inline-grid; place-items: center; flex: none;
    width: 7mm; height: 7mm; border-radius: 50%;
    background: #2f5d50; color: #fff;
    font-family: -apple-system, sans-serif; font-size: 9pt; font-weight: 700;
  }
  ol, ul { margin: 0 0 .7em; padding-left: 5.5mm; }
  li { margin-bottom: .3em; }
  .tips {
    background: #f8ece3; border-left: 1mm solid #c0703f;
    padding: 3mm 4mm; margin: 0 0 .7em; border-radius: 0 2mm 2mm 0;
  }

  .qr {
    display: flex; gap: 4mm; align-items: center;
    border: 1px solid #d8d0c4; border-radius: 2mm;
    padding: 3mm 4mm; margin: 0 0 3mm; break-inside: avoid;
  }
  .qr img { width: 26mm; height: 26mm; flex: none; }
  .qr p { margin: 0; font-size: 9.5pt; color: #4a463f; }
  .qr.liten img { width: 22mm; height: 22mm; }
  .qr.stor img { width: 40mm; height: 40mm; }

  /* Bildene beholder sitt eget størrelsesforhold, ingenting beskjæres */
  .bilder { display: flex; gap: 3mm; margin-top: 2mm; align-items: flex-start; break-inside: avoid; }
  .bilder figure { flex: 1 1 0; min-width: 0; margin: 0; }
  .bilder img {
    display: block; width: auto; height: auto;
    max-width: 100%; max-height: 62mm;
    border-radius: 2mm; border: 1px solid #e8e1d6;
  }
  .bilder figcaption { font-size: 8pt; color: #7a736a; margin-top: 1mm; line-height: 1.35; }

  .sideskift { break-before: page; }
  dl.regler { margin: 0 0 .7em; }
  dl.regler dt { font-weight: 700; margin-top: .6em; }
  dl.regler dd { margin: 0; color: #4a463f; }

  .nettside {
    display: flex; gap: 6mm; align-items: center;
    border-top: 2px solid #2f5d50; padding-top: 6mm; margin-top: 8mm;
  }
  .adresse { font-weight: 700; color: #2f5d50; margin: 0; }
`;

/* --- sett sammen ------------------------------------------------------ */

function side(L) {
  const T = S[L];
  const deler = T.manual.sections.map((s, i) => seksjon(s, T, L, i + 1)).join("");
  return `<!DOCTYPE html>
<html lang="${L === "no" ? "no" : "en"}">
<head>
<meta charset="utf-8">
<base href="${BASE}">
<title>${esc(S.meta.siteName)} – ${esc(T_[L].manualTittel)}</title>
<style>${CSS}</style>
</head>
<body>
${toppen(T, L)}
${deler}
${husregler(T, L)}
</body>
</html>
`;
}

["no", "en"].forEach((L) => {
  const ut = `/tmp/utskrift-${L}.html`;
  fs.writeFileSync(ut, side(L), "utf8");
  console.log(`${ut}  (${S[L].manual.sections.length} seksjoner, ${S[L].rules.items.length} husregler)`);
});
