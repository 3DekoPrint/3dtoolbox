'use strict';
/* Baut das 3DJake-Sortiment (DE/EN): assets/jake-products.js (Daten aus dem Awin-Produktfeed) + zwei Seiten + Sitemap.
   Aufruf: node tools/build_jake_catalog.js /pfad/products.json   (products.json = bereinigter Awin-Feed, siehe Status-Doku)
   Es werden KEINE Anfragen an 3djake.de gestellt. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const NAV = require('./site_nav.js');
const src = JSON.parse(fs.readFileSync(process.argv[2] || '/home/claude/feed/products.json', 'utf8'));
const brands = [...new Set(src.map(x => x.b))].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
const mats = [...new Set(src.map(x => x.m))].sort((a, b) => a === 'Sonstige' ? 1 : b === 'Sonstige' ? -1 : a.localeCompare(b));
const rows = src.map(x => [brands.indexOf(x.b), x.n, mats.indexOf(x.m), x.p]).sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1], 'en', { numeric: true }));
fs.writeFileSync(path.join(ROOT, 'assets/jake-products.js'),
  '/* 3DJake-Sortiment: Marken, Materialien, Produkte [Marke, Name, Material, Awin-Produkt-ID]. Quelle: Awin-Produktfeed (nur lieferbare Filamente). Erzeugt von tools/build_jake_catalog.js */\n' +
  'window.JAKE=' + JSON.stringify({ brands, mats, rows }) + ';\n');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const URL_DE = '/filament-3djake-sortiment.html', URL_EN = '/en/3djake-filament-range.html';
const N = rows.length, NB = brands.length;
const C = {
  de: { lang: 'de', locale: 'de_DE', url: URL_DE, other: URL_EN,
    title: '3DJake Filament-Sortiment: alle Marken an einem Ort | 3DToolBox',
    desc: 'Alle lieferbaren Filamente von 3DJake an einem Ort durchsuchen: ' + NB + ' Marken, ' + N + ' Produkte, nach Marke und Material filtern. Werbung: Links führen zu 3DJake.',
    pill: 'Filamente', h1: '3DJake-Sortiment', sub: 'Alle lieferbaren Filamente von 3DJake: nach Marke und Material filtern, suchen und direkt dort bestellen.',
    adTag: 'Werbung', adTxt: 'Alle Links auf dieser Seite sind Partnerlinks (Werbung) zu 3DJake. Wenn du über sie bestellst, erhalten wir eine kleine Provision. Für dich ändert sich der Preis nicht. Preise und Verfügbarkeit siehst du bei 3DJake.',
    fBrand: 'Marke', fMat: 'Material', fAll: 'Alle', fSearch: 'Suche', fPh: 'z. B. Silk, Schwarz, CF', count: n => n + ' Produkte', more: 'Mehr anzeigen', none: 'Nichts gefunden. Probiere eine andere Marke oder einen anderen Suchbegriff.',
    buy: 'Bei 3DJake ansehen', noscript: 'Für die Filterfunktion wird JavaScript benötigt.', mat0: 'Sonstige', 
    sInfo: 'Gut zu wissen', info: ['Der Bestand stammt aus dem Produktfeed von 3DJake und wird regelmäßig aktualisiert. Ob ein Artikel gerade lieferbar ist und was er kostet, zeigt dir 3DJake.', 'Du suchst nach Farbe? Im <a href="/">Filament-Finder</a> und in der <a href="/filament-datenbank.html">Filament-Datenbank</a> findest du passende Filamente nach Farbton, auch bei 3DJake.', 'Welches Material passt? Die <a href="/materialien/">Material-Übersicht</a> hilft bei der Auswahl.'] },
  en: { lang: 'en', locale: 'en_US', url: URL_EN, other: URL_DE,
    title: '3DJake Filament Range: All Brands in One Place | 3DToolBox',
    desc: 'Browse every in-stock 3DJake filament in one place: ' + NB + ' brands, ' + N + ' products, filter by brand and material. Ad: links lead to 3DJake.',
    pill: 'Filaments', h1: '3DJake range', sub: 'Every in-stock 3DJake filament: filter by brand and material, search and order directly there.',
    adTag: 'Ad', adTxt: 'All links on this page are affiliate links (ads) to 3DJake. If you order through them we receive a small commission. The price does not change for you. Prices and availability are shown by 3DJake.',
    fBrand: 'Brand', fMat: 'Material', fAll: 'All', fSearch: 'Search', fPh: 'e.g. Silk, Black, CF', count: n => n + ' products', more: 'Show more', none: 'Nothing found. Try another brand or search term.',
    buy: 'View at 3DJake', noscript: 'JavaScript is required for filtering.', mat0: 'Other',
    sInfo: 'Good to know', info: ['The range comes from 3DJake’s product feed and is updated regularly. Whether an item is in stock and what it costs is shown by 3DJake.', 'Looking for a colour? The <a href="/en/">Filament Finder</a> and the <a href="/en/filament-database.html">Filament Database</a> find matching filaments by shade, including at 3DJake.', 'Which material fits? The <a href="/en/materials/">materials overview</a> helps you choose.'] }
};
function page(lg) {
  const c = C[lg], o = lg === 'de' ? C.en : C.de, base = 'https://3dtoolbox.info';
  const ld = { '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', name: c.h1, url: base + c.url, description: c.desc, inLanguage: c.lang }] };
  const crumbs = NAV.crumbsFor(lg, c.url, c.h1);
  return `<!DOCTYPE html>
<html lang="${c.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.desc)}">
<link rel="canonical" href="${base + c.url}">
<link rel="alternate" hreflang="de" href="${base + URL_DE}">
<link rel="alternate" hreflang="en" href="${base + URL_EN}">
<link rel="alternate" hreflang="x-default" href="${base + URL_DE}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="3DToolBox">
<meta property="og:locale" content="${c.locale}">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.desc)}">
<meta property="og:image" content="https://3dtoolbox.info/assets/og-image.png">
<meta property="og:url" content="${base + c.url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(c.title)}">
<meta name="twitter:description" content="${esc(c.desc)}">
<meta name="twitter:image" content="https://3dtoolbox.info/assets/og-image.png">
<meta name="impact-site-verification" value="d9f2e77f-7d09-4a51-8edd-e7dffea888c4">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192.png">
<link rel="stylesheet" href="/assets/site.css">
<link rel="stylesheet" href="/assets/material-page.css">
<link rel="stylesheet" href="/assets/jake-catalog.css">
<script src="/assets/ref-config.js"></script>
<script src="/assets/ref.js" defer></script>
<link rel="stylesheet" href="/assets/theme.css">
<script src="/assets/theme-init.js"></script>
<script src="/assets/ui.js" defer></script>
</head>
<body>
<a class="tb-skip" href="#main">${lg === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}</a>
<div class="fm-root bt-sub">
${NAV.header(lg, { path: c.url, other: c.other, crumbs })}  <main id="main" tabindex="-1">

  <header class="bt-subhero"><span class="bt-pill"><i></i>${c.pill}</span><h1 class="fm-title">${c.h1}</h1><p class="fm-sub">${c.sub}</p></header>
  <section class="bt-panel mp">
  <p class="jk-ad"><span class="tb-tip jk-tag">${c.adTag}</span> ${c.adTxt}</p>
  <div class="jk-filters">
    <label>${c.fBrand}<select id="jkBrand"></select></label>
    <label>${c.fMat}<select id="jkMat"></select></label>
    <label>${c.fSearch}<input id="jkQ" type="search" placeholder="${esc(c.fPh)}" autocomplete="off"></label>
  </div>
  <p id="jkCount" class="jk-count" aria-live="polite"></p>
  <ul id="jkList" class="jk-list"></ul>
  <p><button id="jkMore" class="jk-more" type="button" hidden>${c.more}</button></p>
  <noscript><p>${c.noscript}</p></noscript>
  </section>
  <section class="bt-panel mp">
  <h2>${c.sInfo}</h2><ul class="mp-list">${c.info.map(s => '<li>' + s + '</li>').join('')}</ul>
  </section>
  </main>
${NAV.footer(lg)}</div>
<script>window.JK=${JSON.stringify({ lg, all: c.fAll, mat0: c.mat0, none: c.none, buy: c.buy, ad: c.adTag, count: lg === 'de' ? ' Produkte' : ' products' })};</script>
<script src="/assets/jake-products.js" defer></script>
<script src="/assets/jake-catalog.js" defer></script>
</body>
</html>
`;
}
fs.writeFileSync(path.join(ROOT, URL_DE.slice(1)), page('de'));
fs.writeFileSync(path.join(ROOT, URL_EN.slice(1)), page('en'));
let sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
if (!sm.includes(URL_DE)) {
  const day = new Date().toISOString().slice(0, 10), b = 'https://3dtoolbox.info';
  const alt = `    <xhtml:link rel="alternate" hreflang="de" href="${b + URL_DE}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${b + URL_EN}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${b + URL_DE}"/>\n`;
  const ent = u => `  <url>\n    <loc>${b + u}</loc>\n${alt}    <lastmod>${day}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  sm = sm.replace('</urlset>', ent(URL_DE) + ent(URL_EN) + '</urlset>');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm);
}
console.log('OK', N, 'Produkte', NB, 'Marken');
