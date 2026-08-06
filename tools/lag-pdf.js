/* =====================================================================
   Gjør utskriftsguiden om til ferdige PDF-er.

       node tools/lag-utskriftsguide.js     # lager HTML-en
       node tools/lag-pdf.js                # lager PDF-ene

   Krever at nettsiden kjører lokalt (python3 -m http.server 8899 i
   prosjektmappen), slik at bilder og QR-koder blir med, og at
   Playwright er tilgjengelig.

   Resultatet legges i assets/filer/ og kan skrives ut og legges på hytta.
   ===================================================================== */

"use strict";

const path = require("path");
const { chromium } = require("playwright");

const ROT = path.join(__dirname, "..");
const NETTLESER = process.env.CHROME_PATH ||
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const SIDER = [
  { lang: "no", inn: "/tmp/utskrift-no.html", ut: "assets/filer/husmanual-voss-chalet.pdf",
    bunn: "Voss Chalet · Tråstølsvegen 10, Voss" },
  { lang: "en", inn: "/tmp/utskrift-en.html", ut: "assets/filer/house-manual-voss-chalet.pdf",
    bunn: "Voss Chalet · Tråstølsvegen 10, Voss, Norway" },
];

(async () => {
  const b = await chromium.launch({ executablePath: NETTLESER });
  for (const s of SIDER) {
    const p = await b.newPage();
    // Kopier til en fersk filbane: nettleseren mellomlagrer file://-adresser,
    // og kan ellers vise en gammel utgave av filen
    const fersk = `/tmp/utskrift-${s.lang}-${Date.now()}.html`;
    require("fs").copyFileSync(s.inn, fersk);
    await p.goto("file://" + fersk, { waitUntil: "networkidle" });
    // vent til alle bilder og QR-koder faktisk er lastet
    await p.evaluate(async () => {
      await Promise.all([...document.images].map((i) =>
        i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; })));
    });
    const mangler = await p.evaluate(() =>
      [...document.images].filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute("src")));
    if (mangler.length) console.log(`  ADVARSEL: ${mangler.length} bilde(r) lastet ikke:`, mangler.slice(0, 4));

    await p.pdf({
      path: path.join(ROT, s.ut),
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
    require("fs").unlinkSync(fersk);
    const kb = Math.round(require("fs").statSync(path.join(ROT, s.ut)).size / 1024);
    console.log(`${s.ut}  ${kb} kB`);
  }
  await b.close();
})();
