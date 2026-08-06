/* =====================================================================
   Bygger landingssidene index.html (norsk) og en.html (engelsk)
   ut fra innholdet i assets/js/content.js.

   Kjør etter at du har endret tekst i content.js:

       node tools/bygg-landingsside.js

   Hvorfor finnes dette: resten av nettstedet bygges av JavaScript i
   nettleseren, og da ser Google nesten ingen tekst. Landingssiden er
   den eneste siden søkemotorene skal finne, så den skrives ut som ekte
   HTML her — med teksten hentet fra samme kilde som resten av siden.
   ===================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");

const ROT = path.join(__dirname, "..");
global.window = {};
require(path.join(ROT, "assets/js/content.js"));
const S = global.window.SITE;

const BASE = S.meta.siteUrl.replace(/\/?$/, "/");
const VERSJON = "8"; // ?v= på js og css, så nettleseren ikke bruker gamle filer

/* Landingssiden er kortet alene: bilde, kort presentasjon, «Book på
   Airbnb» og innlogging — ingenting å scrolle forbi.

   Settes denne til true, kommer en full presentasjon under kortet (om
   hytta, fasiliteter, galleri, anmeldelser, beliggenhet, smakebit fra
   områdeguiden). Det gir Google mye mer å lese — omtrent 6 300 tegn mot
   400 — men gjesten møter da en lang side i stedet for et rent kort.

   Alt av usynlig søkemotor-arbeid (tittel, beskrivelse, strukturerte
   data, canonical, hreflang, sitemap) gjelder uansett hva som står her. */
const VIS_PRESENTASJON = false;

/* --- små hjelpere -------------------------------------------------- */

const esc = (t) =>
  String(t == null ? "" : t)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const abs = (rel) => BASE + String(rel).replace(/^\.?\//, "");

const IKON_LOGO = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" ' +
  'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M2.5 20l6.5-11.5 3.6 6.3 2.1-3.4L21.5 20zM9 8.5L12.5 3l3.7 6.3"/></svg>';

const IKON_STJERNE = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' +
  '<path d="M12 3.2l2.7 5.7 6.1.8-4.5 4.2 1.2 6.1L12 17.1 6.5 20l1.2-6.1L3.2 9.7l6.1-.8z"/></svg>';

const IKON_HAKE = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" ' +
  'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M20 6.5L9.2 17.3 4 12"/></svg>';

const STJERNER = '<span class="stars" aria-label="5 av 5">' + IKON_STJERNE.repeat(5) + '</span>';

/* --- delene av siden ------------------------------------------------ */

function hero(T, sider) {
  const L = T.landing;
  const r = S.meta.rating;
  const score = sider.lang === "no" ? r.score : (r.scoreEn || r.score);
  const merke = sider.lang === "no" ? r.badgeNo : r.badgeEn;
  const anmeldelser = sider.lang === "no" ? "anmeldelser" : "reviews";
  const hint = sider.lang === "no" ? S.meta.access.hintNo : S.meta.access.hintEn;

  return `
  <section class="landing">
    <div class="landing-media">
      <img src="${esc(S.media.landing)}" alt="${esc(L.title)} – ${esc(L.tagline)}" fetchpriority="high" width="1600" height="2133">
    </div>
    <div class="landing-top">
      <div class="lang-switch" role="group" aria-label="${esc(T.common.langLabel)}">
        <a href="index.html" hreflang="no"${sider.lang === "no" ? ' aria-current="page"' : ""}>NO</a>
        <a href="en.html" hreflang="en"${sider.lang === "en" ? ' aria-current="page"' : ""}>EN</a>
      </div>
      <button class="icon-btn theme-btn" type="button" aria-label="${esc(T.common.themeLabel)}"></button>
    </div>
    <div class="wrap">
      <div class="landing-card">
        <p class="landing-brand">${IKON_LOGO}<span>${esc(S.meta.siteName)}</span></p>
        <p class="eyebrow">${esc(L.eyebrow)}</p>
        <h1>${esc(L.title)}</h1>
        <p class="landing-tagline">${esc(L.tagline)}</p>
        <p class="rating-badge">${IKON_STJERNE}<strong>${esc(score)}</strong>
          <span>· ${r.count} ${anmeldelser} · ${esc(merke)}</span></p>
        <p><a class="btn btn-primary btn-lg" href="${esc(S.meta.airbnbUrl)}" target="_blank" rel="noopener">${esc(L.bookCta)}</a></p>
        <hr class="landing-divider">
        <div class="landing-guest" id="vc-guest">
          <h2>${esc(L.guestTitle)}</h2>
          <p>${esc(L.guestText)}</p>
          <form class="landing-form" id="vc-form">
            <label class="field">
              <span>${esc(L.passwordLabel)}</span>
              <input class="field-input" type="password" id="vc-pw" required
                     autocomplete="current-password" autocapitalize="none"
                     autocorrect="off" spellcheck="false" aria-describedby="vc-pw-help">
            </label>
            <button class="btn btn-primary" type="submit">${esc(L.submit)}</button>
            <p class="form-error" role="alert" id="vc-error" hidden></p>
            ${hint ? `<p class="field-help" id="vc-pw-help">${esc(hint)}</p>` : ""}
          </form>
        </div>
        ${VIS_PRESENTASJON ? `<p class="landing-scroll"><a href="#om">${esc(sider.lang === "no" ? "Les mer om hytta" : "Read more about the chalet")}</a></p>` : ""}
      </div>
    </div>
  </section>`;
}

function omHytta(T) {
  const f = S.meta.facts;
  const fakta = [
    [f.guests, T.facts.guests], [f.bedrooms, T.facts.bedrooms],
    [f.beds, T.facts.beds], [f.baths, T.facts.baths]
  ];
  return `
  <section class="facts">
    <div class="wrap">
      <ul>${fakta.map(([n, t]) => `
        <li><strong>${n}</strong><span>${esc(t)}</span></li>`).join("")}
      </ul>
    </div>
  </section>

  <section class="section" id="om">
    <div class="wrap">
      <div class="about-grid">
        <div>
          <h2>${esc(T.about.title)}</h2>
          <p class="lead">${esc(T.about.lead)}</p>
        </div>
        <div>${T.about.paragraphs.map((p) => `
          <p>${esc(p)}</p>`).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

function hoydepunkter(T) {
  return `
  <section class="section section-alt" id="hoydepunkter">
    <div class="wrap">
      <div class="section-head"><h2>${esc(T.highlights.title)}</h2></div>
      <div class="card-grid">${T.highlights.items.map((it) => `
        <article class="card">
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.text)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function soverom(T) {
  return `
  <section class="section" id="soverom">
    <div class="wrap">
      <div class="section-head">
        <h2>${esc(T.sleeping.title)}</h2>
        <p>${esc(T.sleeping.subtitle)}</p>
      </div>
      <div class="room-grid">${T.sleeping.rooms.map((r) => `
        <article class="room">
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.beds)}</p>
        </article>`).join("")}
      </div>
      <p class="room-note">${esc(T.sleeping.note)}</p>
    </div>
  </section>`;
}

function fasiliteter(T) {
  return `
  <section class="section section-alt" id="fasiliteter">
    <div class="wrap">
      <div class="section-head">
        <h2>${esc(T.amenities.title)}</h2>
        <p>${esc(T.amenities.subtitle)}</p>
      </div>
      <div class="amenity-groups">${T.amenities.groups.map((g) => `
        <div>
          <h3>${esc(g.title)}</h3>
          <ul>${g.items.map((i) => `
            <li>${IKON_HAKE}<span>${esc(i)}</span></li>`).join("")}
          </ul>
        </div>`).join("")}
      </div>
      <div class="note-box">
        <strong>${esc(T.amenities.noteTitle)}</strong>
        <p>${esc(T.amenities.note)}</p>
      </div>
    </div>
  </section>`;
}

function galleri(T, lang) {
  const bilder = S.media.gallery.slice(0, 8);
  return `
  <section class="section" id="bilder">
    <div class="wrap">
      <div class="section-head"><h2>${esc(T.gallery.title)}</h2></div>
      <div class="gallery is-static">${bilder.map((b) => {
        const tekst = lang === "no" ? b.captionNo : b.captionEn;
        return `
        <figure>
          <img src="${esc(b.src)}" alt="${esc(tekst)}" loading="lazy">
          <figcaption>${esc(tekst)}</figcaption>
        </figure>`;
      }).join("")}
      </div>
    </div>
  </section>`;
}

function anmeldelser(T) {
  return `
  <section class="section section-alt" id="anmeldelser">
    <div class="wrap">
      <div class="section-head">
        <h2>${esc(T.reviews.title)}</h2>
        <p>${esc(T.reviews.subtitle)}</p>
      </div>
      <div class="review-grid">${T.reviews.items.slice(0, 6).map((r) => `
        <article class="review">
          ${STJERNER}
          <blockquote><p>${esc(r.text)}</p></blockquote>
          <footer><strong>${esc(r.author)}</strong><span>${esc(r.meta)}</span></footer>
        </article>`).join("")}
      </div>
      <p style="margin-top:24px">
        <a class="btn btn-ghost btn-sm" href="${esc(S.meta.airbnbUrl)}" target="_blank" rel="noopener">${esc(T.reviews.cta)}</a>
      </p>
    </div>
  </section>`;
}

function beliggenhet(T) {
  return `
  <section class="section" id="beliggenhet">
    <div class="wrap">
      <div class="section-head"><h2>${esc(T.location.title)}</h2></div>
      <div class="location-grid">
        <div>
          <p class="lead">${esc(T.location.text)}</p>
          <h3 style="margin-top:28px">${esc(T.location.distancesTitle)}</h3>
          <ul class="distances">${T.location.distances.map((d) => `
            <li><strong>${esc(d.label)}</strong><span>${esc(d.value)}</span></li>`).join("")}
          </ul>
          <p style="margin-top:22px">
            <a class="btn btn-ghost btn-sm" href="${esc(S.meta.mapLink)}" target="_blank" rel="noopener">${esc(T.location.mapCta)}</a>
          </p>
        </div>
        <div class="map-frame">
          <img src="${esc(S.media.locationMap)}" alt="${esc(T.location.title)} – ${esc(S.meta.address)}" loading="lazy">
        </div>
      </div>
    </div>
  </section>`;
}

// Smakebit fra områdeguiden. Selve guiden ligger bak passord, men dette
// er ekte lokalt innhold som gjør landingssiden mer verdt å finne.
function omradet(T, lang) {
  const punkter = [];
  T.area.categories.forEach((kat) => {
    kat.items.forEach((it) => { if (it.img && punkter.length < 6) punkter.push(it); });
  });
  const tittel = lang === "no" ? "Slik er det på Voss" : "What Voss is like";
  return `
  <section class="section section-alt" id="omradet">
    <div class="wrap">
      <div class="section-head">
        <h2>${esc(tittel)}</h2>
        <p>${esc(T.area.intro)}</p>
      </div>
      <div class="area-list">${punkter.map((it) => `
        <article class="area-item has-img">
          <div class="area-img"><img src="${esc(it.img)}" alt="${esc(it.name)} – ${esc(it.meta || "")}" loading="lazy"></div>
          <div class="area-body">
            <div class="area-item-head">
              <h3>${esc(it.name)}</h3>
              ${it.meta ? `<span class="meta">${esc(it.meta)}</span>` : ""}
            </div>
            <p>${esc(it.desc)}</p>
          </div>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function cta(T) {
  return `
  <section class="cta-band" id="book">
    <div class="wrap">
      <h2>${esc(T.cta.title)}</h2>
      <p>${esc(T.cta.text)}</p>
      <a class="btn" href="${esc(S.meta.airbnbUrl)}" target="_blank" rel="noopener">${esc(T.cta.button)}</a>
    </div>
  </section>`;
}

function bunn(T, lang) {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <p class="brand">${IKON_LOGO}<span>${esc(S.meta.siteName)}</span></p>
          <p>${esc(T.footer.about)}</p>
        </div>
        <div>
          <h3>${esc(T.footer.contactTitle)}</h3>
          <ul>
            <li><a href="${esc(S.meta.mapLink)}" target="_blank" rel="noopener">${esc(S.meta.address)}</a></li>
          </ul>
        </div>
        <div>
          <h3>${esc(T.footer.bookTitle)}</h3>
          <p>${esc(T.footer.bookText)}</p>
          <a class="btn btn-ghost btn-sm" href="${esc(S.meta.airbnbUrl)}" target="_blank" rel="noopener">${esc(T.nav.book)}</a>
        </div>
        <div>
          <h3>${esc(lang === "no" ? "Språk" : "Language")}</h3>
          <ul>
            <li><a href="index.html" hreflang="no">Norsk</a></li>
            <li><a href="en.html" hreflang="en">English</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${esc(S.meta.siteName)}. ${esc(T.footer.rights)}</span>
        <span>${esc(T.host.name)}</span>
      </div>
    </div>
  </footer>`;
}

/* --- strukturerte data (JSON-LD) ------------------------------------
   Forteller Google hva slags sted dette er, hvor det ligger og hva som
   finnes her. Bare fakta vi faktisk har.                              */

function jsonLd(T, lang) {
  const fasiliteter = [];
  T.amenities.groups.forEach((g) => g.items.forEach((i) => fasiliteter.push(i)));

  const data = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: S.meta.siteName,
    description: T.about.lead,
    url: lang === "no" ? BASE : BASE + "en.html",
    image: [abs(S.media.hero), abs(S.media.landing), abs(S.media.gallery[0].src)],
    sameAs: [S.meta.airbnbUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tråstølsvegen 10",
      addressLocality: "Voss",
      addressRegion: "Vestland",
      addressCountry: "NO"
    },
    numberOfRooms: S.meta.facts.bedrooms,
    numberOfBathroomsTotal: S.meta.facts.baths,
    numberOfBedrooms: S.meta.facts.bedrooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: S.meta.facts.guests, unitText: lang === "no" ? "gjester" : "guests" },
    petsAllowed: false,
    smokingAllowed: false,
    checkinTime: S.meta.checkIn,
    checkoutTime: S.meta.checkOut,
    amenityFeature: fasiliteter.map((navn) => ({
      "@type": "LocationFeatureSpecification", name: navn, value: true
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (S.meta.rating.scoreEn || S.meta.rating.score).replace(",", "."),
      reviewCount: S.meta.rating.count,
      bestRating: 5,
      // Vurderingen er hentet fra Airbnb-annonsen, ikke samlet inn her
      url: S.meta.airbnbUrl
    },
    containedInPlace: { "@type": "Place", name: "Voss, Vestland, Norge" }
  };
  return JSON.stringify(data, null, 2);
}

/* --- selve siden ----------------------------------------------------- */

function side(lang) {
  const T = S[lang];
  const L = T.landing;
  const kanonisk = lang === "no" ? BASE : BASE + "en.html";
  // Tittelen er det viktigste enkeltfeltet i søkeresultatet. Den skal
  // si hva stedet er og hvor det ligger, uten å gjenta navnet to ganger.
  const tittel = lang === "no"
    ? `${S.meta.siteName} – hytte med ski in/ski out i Tråstølen på Voss`
    : `${S.meta.siteName} – ski-in/ski-out cabin in Tråstølen, Voss`;
  const beskrivelse = lang === "no"
    ? `${L.tagline} ${S.meta.facts.guests} gjester, ${S.meta.facts.bedrooms} soverom. Vurdert ${S.meta.rating.score} av 5 av ${S.meta.rating.count} gjester. Book på Airbnb.`
    : `${L.tagline} ${S.meta.facts.guests} guests, ${S.meta.facts.bedrooms} bedrooms. Rated ${S.meta.rating.scoreEn} out of 5 by ${S.meta.rating.count} guests. Book on Airbnb.`;

  return `<!DOCTYPE html>
<html lang="${lang === "no" ? "no" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tittel)}</title>
<meta name="description" content="${esc(beskrivelse)}">
<link rel="canonical" href="${esc(kanonisk)}">
<link rel="alternate" hreflang="no" href="${esc(BASE)}">
<link rel="alternate" hreflang="en" href="${esc(BASE)}en.html">
<link rel="alternate" hreflang="x-default" href="${esc(BASE)}">
<meta name="theme-color" content="#2f5d50">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(S.meta.siteName)}">
<meta property="og:title" content="${esc(L.title)} · ${esc(S.meta.siteName)}">
<meta property="og:description" content="${esc(L.tagline)}">
<meta property="og:image" content="${esc(abs(S.media.hero))}">
<meta property="og:image:alt" content="${esc(L.title)}">
<meta property="og:url" content="${esc(kanonisk)}">
<meta property="og:locale" content="${lang === "no" ? "nb_NO" : "en_GB"}">
<meta property="og:locale:alternate" content="${lang === "no" ? "en_GB" : "nb_NO"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(L.title)} · ${esc(S.meta.siteName)}">
<meta name="twitter:description" content="${esc(L.tagline)}">
<meta name="twitter:image" content="${esc(abs(S.media.hero))}">

<link rel="stylesheet" href="assets/css/styles.css?v=${VERSJON}">
<script type="application/ld+json">
${jsonLd(T, lang)}
</script>
</head>
<body data-page="landing" class="is-landing">
<a class="skip-link" href="#main">${esc(lang === "no" ? "Hopp til innhold" : "Skip to content")}</a>

<main id="main">
${hero(T, { lang })}
${VIS_PRESENTASJON ? [
  omHytta(T), hoydepunkter(T), soverom(T), fasiliteter(T),
  galleri(T, lang), anmeldelser(T), beliggenhet(T), omradet(T, lang), cta(T)
].join("\n") : ""}
</main>
${VIS_PRESENTASJON ? bunn(T, lang) : ""}

<script src="assets/js/content.js?v=${VERSJON}"></script>
<script src="assets/js/app.js?v=${VERSJON}"></script>
</body>
</html>
`;
}

/* --- skriv filene ---------------------------------------------------- */

const filer = { "index.html": side("no"), "en.html": side("en") };
Object.entries(filer).forEach(([navn, html]) => {
  fs.writeFileSync(path.join(ROT, navn), html, "utf8");
  const tekst = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, "")
    .replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).join(" ");
  console.log(`${navn.padEnd(11)} ${(html.length / 1024).toFixed(1)} kB · ${tekst.length} tegn lesbar tekst`);
});

/* --- sitemap og robots ----------------------------------------------- */

const dato = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(ROT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${BASE}</loc>
    <lastmod>${dato}</lastmod>
    <xhtml:link rel="alternate" hreflang="no" href="${BASE}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}en.html"/>
  </url>
  <url>
    <loc>${BASE}en.html</loc>
    <lastmod>${dato}</lastmod>
    <xhtml:link rel="alternate" hreflang="no" href="${BASE}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}en.html"/>
  </url>
</urlset>
`, "utf8");

fs.writeFileSync(path.join(ROT, "robots.txt"), `# Landingssidene (/ og /en.html) skal indekseres.
#
# Gjestesidene — hytta, husmanual, husregler og omradet — skal IKKE
# indekseres, og er merket <meta name="robots" content="noindex"> i selve
# siden. De er bevisst ikke sperret med Disallow her: en sperre ville
# hindret Google i å hente siden, og da ville den heller aldri lest
# noindex-merket. Resultatet kunne blitt at adressene lå i søkeresultatet
# uten innhold. Slik det står nå får Google hente sidene, se «ikke
# indekser», og holde dem ute.
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${BASE}sitemap.xml
`, "utf8");

// Enkel 404-side, så feilskrevne adresser lander pent
fs.writeFileSync(path.join(ROT, "404.html"), `<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fant ikke siden · ${S.meta.siteName}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="${BASE}assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${BASE}assets/css/styles.css?v=${VERSJON}">
</head>
<body>
<main class="wrap wrap-narrow" style="padding:14vh 20px;text-align:center">
  <p class="eyebrow" style="justify-content:center">${esc(S.meta.siteName)}</p>
  <h1>Fant ikke siden</h1>
  <p class="lead">Adressen finnes ikke her. Prøv forsiden — eller book direkte på Airbnb.</p>
  <p class="lead" style="color:var(--muted);font-size:1rem">
    This page does not exist. Try the front page, or book on Airbnb.</p>
  <p style="margin-top:28px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <a class="btn btn-primary" href="${BASE}">Til forsiden</a>
    <a class="btn btn-ghost" href="${esc(S.meta.airbnbUrl)}" target="_blank" rel="noopener">Book på Airbnb</a>
  </p>
</main>
</body>
</html>
`, "utf8");

console.log("sitemap.xml, robots.txt og 404.html skrevet");
