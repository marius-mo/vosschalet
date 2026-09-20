/* =====================================================================
   Gjør utskriftsguiden om til ferdige PDF-er.

       node tools/lag-utskriftsguide.js     # lager HTML-en
       node tools/lag-pdf.js                # lager PDF-ene

   Krever at nettsiden kjører lokalt (python3 -m http.server 8899 i
   prosjektmappen), slik at bilder og QR-koder blir med, og at
   Playwright er tilgjengelig.

   Det lages tre filer per språk:

     forside-husmanual.pdf   ett ark, helt uten marger og sidetall
     husmanual-…-uten-forside er aldri lagret, den bor bare i /tmp
     husmanual-voss-chalet.pdf   forsiden og innholdet slått sammen

   Forsiden må kjøres for seg fordi den skal gå helt ut i kanten og
   ikke ha bunntekst. Sammenslåingen gjøres av tools/slaa-sammen.py.

   Resultatet legges i assets/filer/ og kan skrives ut og legges på hytta.
   ===================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");

const ROT = path.join(__dirname, "..");
const NETTLESER = process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const SIDER = [
  {
    lang: "no",
    inn: "/tmp/utskrift-no.html",
    forside: "/tmp/forside-no.html",
    utForside: "assets/filer/forside-husmanual.pdf",
    ut: "assets/filer/husmanual-voss-chalet.pdf",
    bunn: "Voss Chalet · Tråstølsvegen 10, Voss",
  },
  {
    lang: "en",
    inn: "/tmp/utskrift-en.html",
    forside: "/tmp/forside-en.html",
    utForside: "assets/filer/house-manual-cover.pdf",
    ut: "assets/filer/house-manual-voss-chalet.pdf",
    bunn: "Voss Chalet · Tråstølsvegen 10, Voss, Norway",
  },
];

const kB = (f) => Math.round(fs.statSync(f).size / 1024);

// Nettleseren mellomlagrer file://-adresser og kan ellers vise en gammel
// utgave av filen, så hver kjøring får sin egen filbane
async function apne(b, html) {
  const p = await b.newPage();
  const fersk = `/tmp/pdf-${path.basename(html, ".html")}-${Date.now()}.html`;
  fs.copyFileSync(html, fersk);
  await p.goto("file://" + fersk, { waitUntil: "networkidle" });
  await p.evaluate(async () => {
    await Promise.all([...document.images].map((i) =>
      i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; })));
  });
  const mangler = await p.evaluate(() =>
    [...document.images].filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.getAttribute("src")));
  if (mangler.length) {
    console.log(`  ADVARSEL: ${mangler.length} bilde(r) lastet ikke:`, mangler.slice(0, 4));
  }
  return { p, fersk };
}

(async () => {
  const b = await chromium.launch({ executablePath: NETTLESER });

  for (const s of SIDER) {
    // 1. Forsiden: fullt ark, ingen marger, ingen bunntekst
    {
      const { p, fersk } = await apne(b, s.forside);
      await p.pdf({
        path: path.join(ROT, s.utForside),
        format: "A4",
        printBackground: true,
        margin: { top: "0", bottom: "0", left: "0", right: "0" },
      });
      await p.close();
      fs.unlinkSync(fersk);
      console.log(`${s.utForside}  ${kB(path.join(ROT, s.utForside))} kB`);
    }

    // 2. Innholdet: vanlige marger, bunntekst og sidetall
    const innhold = `/tmp/innhold-${s.lang}.pdf`;
    {
      const { p, fersk } = await apne(b, s.inn);
      await p.pdf({
        path: innhold,
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: "<div></div>",
        footerTemplate: `<div style="width:100%;font-size:7pt;color:#7a736a;
          padding:0 15mm;display:flex;justify-content:space-between;
          font-family:-apple-system,sans-serif">
          <span>${s.bunn}</span>
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
        margin: { top: "16mm", bottom: "18mm", left: "15mm", right: "15mm" },
      });
      await p.close();
      fs.unlinkSync(fersk);
    }

    // 3. Forsiden foran innholdet. Forsiden er med vilje uten sidetall,
    //    slik at nummereringen i guiden starter på første tekstside.
    const ferdig = path.join(ROT, s.ut);
    try {
      execFileSync("python3", [
        path.join(__dirname, "slaa-sammen.py"),
        path.join(ROT, s.utForside), innhold, ferdig,
      ], { stdio: "pipe" });
    } catch (e) {
      console.log("  Fikk ikke slått sammen forsiden (mangler PyMuPDF?):",
        String(e.stderr || e.message).trim().split("\n").pop());
      fs.copyFileSync(innhold, ferdig);
    }
    fs.unlinkSync(innhold);
    console.log(`${s.ut}  ${kB(ferdig)} kB`);
  }

  await b.close();
})();
