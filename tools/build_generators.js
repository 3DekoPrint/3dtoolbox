#!/usr/bin/env node
/* Erzeugt aus den Generator-Beschreibungen (assets/gen/*.js) die DE- und EN-Seiten, die Übersicht und die Sitemap-Einträge.
   Aufruf im Repo-Hauptverzeichnis:  node tools/build_generators.js
   Nutzt die vorhandenen Seiten (Gehäuse-Generator) als Vorlage für Navigation, Partner-Hinweis und Fußzeile. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), BASE = 'https://3dtoolbox.info';
const defs = [];
global.self = global; global.GenKit = { define: function (d) { defs.push(d); return d; } };
const files = fs.readdirSync(path.join(ROOT, 'assets/gen')).filter(f => f.endsWith('.js')).sort();
files.forEach(f => (0, eval)(fs.readFileSync(path.join(ROOT, 'assets/gen', f), 'utf8')));
const ORDER = ['gridfinity', 'spool', 'bolts', 'spacer', 'cableclip', 'hook', 'vent', 'vase'];
defs.sort((a, b) => (ORDER.indexOf(a.id) + 99) % 99 - (ORDER.indexOf(b.id) + 99) % 99);

const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const tpl = { de: read('gehaeuse-generator.html'), en: read('en/enclosure-generator.html') };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cut = (s, a, b) => { const i = s.indexOf(a), j = s.indexOf(b, i + 1); if (i < 0 || j < 0) throw new Error('Vorlage: ' + a); return s.slice(i, j); };
const T = {
  de: { lang: 'de', locale: 'de_DE', root: '/', pre: '', gen: 'Generatoren', all: 'Alle Generatoren', hubFile: '/generatoren.html', free: 'kostenlos', local: 'im Browser', kpiExp: 'Export', kpiFree: 'Kosten', kpiLocal: 'Läuft',
    notes: 'Druckhinweise', faq: 'Häufige Fragen', intro: 'So funktioniert es', nojs: 'Dieses Werkzeug braucht JavaScript und WebAssembly. Bitte aktiviere JavaScript in deinem Browser.', home: 'Startseite',
    cats: { storage: 'Aufbewahren & Ordnen', workshop: 'Werkstatt', home: 'Haushalt', art: 'Kunst & Schilder', electronics: 'Elektronik', tabletop: 'Tabletop' }, hubH1: 'Alle Generatoren', hubSub: 'Kostenlose 3D-Druck-Generatoren: Maße eingeben, Vorschau ansehen, STL oder 3MF laden. Alles läuft in deinem Browser.', hubSearch: 'Generator suchen …', hubNone: 'Nichts gefunden.', hubTitle: 'Alle 3D-Druck-Generatoren (kostenlos) | 3DToolBox', hubDesc: 'Alle Generatoren von 3DToolBox auf einen Blick: Gridfinity, Spulenhalter, Schrauben, Gehäuse, Getriebe und mehr. Kostenlos, im Browser, mit STL- und 3MF-Export.', open: 'Öffnen' },
  en: { lang: 'en', locale: 'en_US', root: '/en/', pre: '/en', gen: 'Generators', all: 'All generators', hubFile: '/en/generators.html', free: 'free', local: 'in browser', kpiExp: 'Export', kpiFree: 'Cost', kpiLocal: 'Runs',
    notes: 'Printing notes', faq: 'Common questions', intro: 'How it works', nojs: 'This tool needs JavaScript and WebAssembly. Please enable JavaScript in your browser.', home: 'Home',
    cats: { storage: 'Storage & organising', workshop: 'Workshop', home: 'Home', art: 'Art & signs', electronics: 'Electronics', tabletop: 'Tabletop' }, hubH1: 'All generators', hubSub: 'Free 3D-printing generators: type the dimensions, check the preview, download STL or 3MF. Everything runs in your browser.', hubSearch: 'Search generators …', hubNone: 'Nothing found.', hubTitle: 'All 3D Printing Generators (free) | 3DToolBox', hubDesc: 'Every 3DToolBox generator at a glance: Gridfinity, spool holder, bolts, enclosures, gears and more. Free, in your browser, with STL and 3MF export.', open: 'Open' }
};
const urlOf = (d, lg) => (lg === 'de' ? '/' : '/en/') + d.meta.slug[lg] + '.html';
/* bestehende Werkzeuge, die in der Übersicht mit auftauchen */
const EXISTING = [
  { cat: 'electronics', de: ['Gehäuse-Generator', 'Gehäuse für Raspberry Pi, Arduino, ESP32 und mehr', '/gehaeuse-generator.html'], en: ['Enclosure Generator', 'Cases for Raspberry Pi, Arduino, ESP32 and more', '/en/enclosure-generator.html'] },
  { cat: 'workshop', de: ['Planetengetriebe', 'Getriebe mit Hohlrad, Planeten und Sonne', '/3d-druck-planetengetriebe-generator.html'], en: ['Planetary Gearbox', 'Gearbox with ring, planets and sun gear', '/en/3d-print-planetary-gearbox-generator.html'] },
  { cat: 'workshop', de: ['Objekt-Generator', 'Boxen, Tabletts, Zykloiden und mehr', '/3d-druck-objektgenerator.html'], en: ['Object Generator', 'Boxes, trays, cycloids and more', '/en/3d-print-object-generator.html'] },
  { cat: 'art', de: ['Namens-Anhänger', 'Anhänger mit Namen, mehrfarbig', '/3d-druck-namens-anhaenger.html'], en: ['Layered Name Tag', 'Name tags in several colours', '/en/3d-print-layered-name-tag.html'] },
  { cat: 'art', de: ['Namensschild', 'Namensschild mit Anhänger', '/3d-druck-namensschild-anhaenger.html'], en: ['Name Plate Tag', 'Name plate with tag', '/en/3d-print-name-plate-tag.html'] },
  { cat: 'art', de: ['Bild zu 3D', 'Foto wird Relief oder Lithophanie', '/bild-zu-3d.html'], en: ['Image to 3D', 'Turn a photo into a relief or lithophane', '/en/image-to-3d.html'] }
];

function chunks(lg) {
  const t = tpl[lg];
  const nav = cut(t, '  <nav class="bt-nav">', '  </nav>') + '  </nav>\n';
  const chips = cut(t, '  <div class="bt-switch">', '  <header class="bt-subhero">');
  const tail = cut(t, '  <div class="fm-partner">', '</div>\n<script') + '</div>\n';
  return { nav, chips, tail };
}
function langNav(nav, lg, other) { return nav.replace(/<a class="fm-lang-link" href="[^"]*" hreflang="(en|de)">/, '<a class="fm-lang-link" href="' + other + '" hreflang="' + (lg === 'de' ? 'en' : 'de') + '">'); }
function chipsFor(chips, lg, d) {
  let c = chips.replace(/<span class="bt-chip bt-chip-active" aria-current="page">([^<]*)<\/span>/, (m, n) => '<a class="bt-chip" href="' + (lg === 'de' ? '/gehaeuse-generator.html' : '/en/enclosure-generator.html') + '">' + n + '</a>');
  const mine = d ? '<span class="bt-chip bt-chip-active" aria-current="page">' + esc(d.meta.h1[lg]) + '</span>' : '<span class="bt-chip bt-chip-active" aria-current="page">' + esc(T[lg].all) + '</span>';
  c = c.replace(/<a class="bt-chip" href="[^"]*(generatoren|generators)\.html">[^<]*<\/a>\s*/g, '');
  if (d) c = c.replace('<span class="bt-ext-group">', '<a class="bt-chip" href="' + T[lg].hubFile + '">' + esc(T[lg].all) + ' →</a>' + mine + '\n    <span class="bt-ext-group">');
  else c = c.replace('<span class="bt-ext-group">', mine + '\n    <span class="bt-ext-group">');
  return c;
}
function head(lg, o) {
  const Tl = T[lg], img = BASE + '/assets/og-image.png';
  const impact = (tpl[lg].match(/<meta name="impact-site-verification"[^>]*>/) || [''])[0];
  return '<!DOCTYPE html>\n<html lang="' + lg + '">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + esc(o.title) + '</title>\n<meta name="description" content="' + esc(o.desc) + '">\n' +
    '<link rel="canonical" href="' + BASE + o.url[lg] + '">\n<link rel="alternate" hreflang="de" href="' + BASE + o.url.de + '">\n<link rel="alternate" hreflang="en" href="' + BASE + o.url.en + '">\n<link rel="alternate" hreflang="x-default" href="' + BASE + o.url.de + '">\n' +
    '<meta property="og:type" content="website">\n<meta property="og:site_name" content="3DToolBox">\n<meta property="og:locale" content="' + Tl.locale + '">\n<meta property="og:title" content="' + esc(o.title) + '">\n<meta property="og:description" content="' + esc(o.desc) + '">\n<meta property="og:image" content="' + img + '">\n<meta property="og:url" content="' + BASE + o.url[lg] + '">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="' + esc(o.title) + '">\n<meta name="twitter:description" content="' + esc(o.desc) + '">\n<meta name="twitter:image" content="' + img + '">\n' + (impact ? impact + '\n' : '') +
    '<script type="application/ld+json">' + JSON.stringify(o.ld) + '</script>\n' +
    '<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192.png">\n' +
    '<link rel="stylesheet" href="/assets/site.css">\n<link rel="stylesheet" href="/assets/material-page.css">\n<script src="/assets/ref-config.js"></script>\n<script src="/assets/ref.js" defer></script>\n<link rel="stylesheet" href="/assets/theme.css">\n' + (o.css || '') + '</head>\n<body>\n<div class="fm-root bt-sub">\n';
}
function toolPage(d, lg) {
  const m = d.meta, Tl = T[lg], ch = chunks(lg), other = urlOf(d, lg === 'de' ? 'en' : 'de');
  const url = { de: urlOf(d, 'de'), en: urlOf(d, 'en') };
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebApplication', name: m.h1[lg], url: BASE + url[lg], description: m.desc[lg], applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any (Web Browser)', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } },
    { '@type': 'FAQPage', mainEntity: m.faq[lg].map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: '3DToolBox', item: BASE + Tl.root }, { '@type': 'ListItem', position: 2, name: Tl.gen, item: BASE + Tl.hubFile }, { '@type': 'ListItem', position: 3, name: m.h1[lg], item: BASE + url[lg] }] }] };
  let h = head(lg, { title: m.title[lg], desc: m.desc[lg], url, ld, css: '<link rel="stylesheet" href="/assets/gen-kit.css">\n' });
  h += langNav(ch.nav, lg, other) + chipsFor(ch.chips, lg, d);
  h += '  <header class="bt-subhero gk-hero"><span class="bt-pill"><i></i>' + esc(m.tag[lg]) + '</span><h1 class="fm-title">' + esc(m.h1[lg]) + '</h1><p class="fm-sub">' + esc(m.sub[lg]) + '</p>\n  <div class="bt-kpis"><div class="bt-kpi"><b>STL + 3MF</b><span>' + Tl.kpiExp + '</span></div><div class="bt-kpi"><b>0 €</b><span>' + Tl.kpiFree + '</span></div><div class="bt-kpi"><b>' + Tl.local + '</b><span>' + Tl.kpiLocal + '</span></div></div></header>\n';
  h += '  <div id="gk"></div>\n  <noscript><p class="cv-warn">' + Tl.nojs + '</p></noscript>\n  <section class="bt-panel mp">\n';
  h += '  <h2>' + Tl.intro + '</h2>' + m.intro[lg].map(p => '<p>' + esc(p) + '</p>').join('') + '\n';
  h += '  <h2>' + Tl.notes + '</h2><ul class="mp-list">' + m.notes[lg].map(n => '<li>' + esc(n) + '</li>').join('') + '</ul>\n';
  h += '  <h2>' + Tl.faq + '</h2>' + m.faq[lg].map(q => '<h3>' + esc(q[0]) + '</h3><p>' + esc(q[1]) + '</p>').join('') + '\n  </section>\n';
  h += ch.tail;
  h += '<script src="/assets/converter-core.js"></script>\n<script src="/assets/mesh-preview.js"></script>\n<script src="/assets/gen-kit.js"></script>\n<script src="/assets/gen/' + d.id + '.js"></script>\n<script>GenKit.run(GenKit.registry["' + d.id + '"], document.getElementById("gk"));</script>\n</body>\n</html>\n';
  return { path: (lg === 'de' ? '' : 'en/') + m.slug[lg] + '.html', html: h, url };
}
function hubPage(lg) {
  const Tl = T[lg], ch = chunks(lg), url = { de: '/generatoren.html', en: '/en/generators.html' };
  const ld = { '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', name: Tl.hubH1, url: BASE + url[lg], description: Tl.hubDesc }, { '@type': 'ItemList', itemListElement: defs.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: d.meta.h1[lg], url: BASE + urlOf(d, lg) })) }] };
  let h = head(lg, { title: Tl.hubTitle, desc: Tl.hubDesc, url, ld, css: '<link rel="stylesheet" href="/assets/gen-kit.css">\n' });
  h += langNav(ch.nav, lg, url[lg === 'de' ? 'en' : 'de']) + chipsFor(ch.chips, lg, null);
  h += '  <header class="bt-subhero"><span class="bt-pill"><i></i>' + Tl.gen + '</span><h1 class="fm-title">' + Tl.hubH1 + '</h1><p class="fm-sub">' + Tl.hubSub + '</p></header>\n  <section class="bt-panel mp">\n  <input id="hubQ" class="gk-hubq" type="search" placeholder="' + Tl.hubSearch + '" autocomplete="off" aria-label="' + Tl.hubSearch + '">\n';
  Object.keys(Tl.cats).forEach(cat => {
    const rows = defs.filter(d => d.meta.cat === cat).map(d => [d.meta.h1[lg], d.meta.sub[lg].split('. ')[0].replace(/\.$/, ''), urlOf(d, lg)]).concat(EXISTING.filter(e => e.cat === cat).map(e => e[lg]));
    if (!rows.length) return;
    h += '  <h2 class="gk-cat">' + Tl.cats[cat] + '</h2>\n  <ul class="gk-rows">' + rows.map(r => '<li><a href="' + r[2] + '"><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span><i>' + Tl.open + ' →</i></a></li>').join('') + '</ul>\n';
  });
  h += '  <p id="hubNone" class="cv-warn" hidden>' + Tl.hubNone + '</p>\n  </section>\n' + ch.tail;
  h += '<script>(function(){var q=document.getElementById("hubQ"),n=document.getElementById("hubNone");q.addEventListener("input",function(){var v=q.value.trim().toLowerCase(),any=false;document.querySelectorAll(".gk-rows li").forEach(function(li){var s=!v||li.textContent.toLowerCase().indexOf(v)>=0;li.style.display=s?"":"none";if(s)any=true});document.querySelectorAll(".gk-rows").forEach(function(ul){var vis=[].some.call(ul.children,function(li){return li.style.display!=="none"});ul.previousElementSibling.style.display=vis?"":"none";ul.style.display=vis?"":"none"});n.hidden=any})})();</script>\n</body>\n</html>\n';
  return { path: (lg === 'de' ? '' : 'en/') + url[lg].split('/').pop(), html: h, url };
}
const out = [];
defs.forEach(d => { out.push(toolPage(d, 'de')); out.push(toolPage(d, 'en')); });
out.push(hubPage('de')); out.push(hubPage('en'));
out.forEach(o => { fs.writeFileSync(path.join(ROOT, o.path), o.html); });
/* Sitemap: Block zwischen den Markierungen ersetzen */
const today = new Date().toISOString().slice(0, 10);
const urls = [{ de: '/generatoren.html', en: '/en/generators.html', p: '0.8' }].concat(defs.map(d => ({ de: urlOf(d, 'de'), en: urlOf(d, 'en'), p: '0.7' })));
let sm = read('sitemap.xml').replace(/\n?  <!-- gen:start -->[\s\S]*<!-- gen:end -->\n?/, '\n');
const entry = (u, lg, p) => '  <url>\n    <loc>' + BASE + u[lg] + '</loc>\n    <xhtml:link rel="alternate" hreflang="de" href="' + BASE + u.de + '"/>\n    <xhtml:link rel="alternate" hreflang="en" href="' + BASE + u.en + '"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="' + BASE + u.de + '"/>\n    <lastmod>' + today + '</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>' + p + '</priority>\n  </url>\n';
const block = '  <!-- gen:start -->\n' + urls.map(u => entry(u, 'de', u.p) + entry(u, 'en', u.p)).join('') + '  <!-- gen:end -->\n';
sm = sm.replace('</urlset>', block + '</urlset>');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm);

/* ---- bestehende Seiten: Chip „Alle Generatoren“ und Zeilen auf der Startseite (wiederholbar) ---- */
const ICON = { gridfinity: 'i-box', spool: 'i-gear', bolts: 'i-hex', spacer: 'i-hex', cableclip: 'i-layers', hook: 'i-tag', vent: 'i-plate', vase: 'i-spool' };
function patchChips() {
  const all = [];
  (function walk(dir) { fs.readdirSync(dir, { withFileTypes: true }).forEach(e => { if (e.name === '.git' || e.name === 'node_modules' || e.name === 'tools') return; const f = path.join(dir, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) all.push(f); }); })(ROOT);
  let n = 0;
  all.forEach(f => {
    let h = fs.readFileSync(f, 'utf8'); if (h.indexOf('bt-switch-gen') < 0) return;
    const lg = /<html lang="en"/.test(h) ? 'en' : 'de', hub = T[lg].hubFile;
    const isGen = out.some(o => path.join(ROOT, o.path) === f);
    if (isGen || h.indexOf('href="' + hub + '"') >= 0) return;
    const chip = '<a class="bt-chip" href="' + hub + '">' + esc(T[lg].all) + ' →</a>\n    ';
    const g = h.replace(/(\n\s*)<span class="bt-ext-group">/, (m, ws) => ws + chip.trim() + ws + '<span class="bt-ext-group">');
    if (g !== h) { fs.writeFileSync(f, g); n++; }
  });
  console.log('Chip ergänzt auf', n, 'Seiten');
}
function patchHome() {
  ['de', 'en'].forEach(lg => {
    const f = path.join(ROOT, lg === 'de' ? 'index.html' : 'en/index.html'); let h = fs.readFileSync(f, 'utf8');
    h = h.replace(/\n?<!-- gen-home:start -->[\s\S]*?<!-- gen-home:end -->/, '');
    const arrow = '<svg class="tb-ar" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-ar"/></svg>';
    let rows = '\n<!-- gen-home:start -->' + defs.map((d, i) => '<a class="tb-row" href="' + urlOf(d, lg) + '"><span class="tb-mono">G-' + String(5 + i).padStart(2, '0') + '</span><span class="tb-ico"><svg aria-hidden="true"><use href="#' + (ICON[d.id] || 'i-box') + '"/></svg></span><div><h3>' + esc(d.meta.h1[lg]) + '</h3><p>' + esc(d.meta.sub[lg].split('. ')[0].replace(/\.$/, '') + '.') + '</p></div><span class="tb-pill">3MF</span>' + arrow + '</a>').join('\n') +
      '\n<a class="tb-row" href="' + T[lg].hubFile + '"><span class="tb-mono">+</span><span class="tb-ico"><svg aria-hidden="true"><use href="#i-ar"/></svg></span><div><h3>' + esc(T[lg].all) + '</h3><p>' + esc(lg === 'de' ? 'Alle Werkzeuge im Überblick, mit Suche.' : 'All tools at a glance, with search.') + '</p></div><span class="tb-pill">→</span>' + arrow + '</a>\n<!-- gen-home:end -->';
    const i = h.indexOf('<div class="tb-rows">'); if (i < 0) return; const j = h.indexOf('\n    </div>\n  </section>', i); if (j < 0) throw new Error('Startseite: Zeilenende nicht gefunden');
    h = h.slice(0, j) + rows + h.slice(j); fs.writeFileSync(f, h);
  });
}
patchChips(); patchHome();

console.log('Seiten:', out.map(o => o.path).join(', '));
