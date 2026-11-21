'use strict';
/* Erzeugt die Seiten der Druckbett-Vorschau (DE/EN) und trägt sie in die Sitemap ein. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), NAV = require('./site_nav.js');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const URL_DE = '/druckbett-vorschau.html', URL_EN = '/en/print-bed-preview.html';
const C = {
  de: { lang: 'de', locale: 'de_DE', url: URL_DE, other: URL_EN,
    title: 'Druckbett-Vorschau: Modell auf dem 3D-Drucker-Bett ansehen | 3DToolBox',
    desc: 'STL, 3MF, OBJ oder STEP laden und live auf dem Druckbett deines Druckers sehen. Passung prüfen, flach legen, Gewicht und Druckzeit schätzen. Kostenlos, läuft im Browser.',
    pill: 'Werkzeuge', h1: 'Druckbett-Vorschau', sub: 'Lade dein Modell und sieh sofort, wie es auf dem Druckbett deines Druckers liegt. Maße, Passung, Gewicht und Druckzeit auf einen Blick.',
    trust: ['Läuft lokal im Browser', 'Deine Datei wird nicht hochgeladen', 'Ohne Anmeldung', 'Kostenlos'],
    s1: 'Drucker wählen', printer: 'Drucker', height: 'Bauhöhe (mm, Richtwert)', s2: 'Datei laden', s3: 'Ausrichten', unit: 'Einheit der Datei', mm: 'mm', inch: 'Zoll', scale: 'Maßstab (%)',
    flat: 'Flach auf größte Fläche legen', reset: 'Ausrichtung zurücksetzen', s4: 'Material und Füllung', mat: 'Material', infill: 'Füllung', price: 'Preis pro kg (€)',
    views: ['Iso', 'Oben', 'Vorn', 'Seite'], empty: 'Lade eine Datei, um sie auf dem Druckbett zu sehen.', fileNote: 'STL, 3MF, OBJ oder STEP',
    results: 'Ergebnis', size: 'Maße (B × T × H)', fp: 'Fläche auf dem Bett', vol: 'Volumen', weight: 'Gewicht', time: 'Druckzeit', cost: 'Materialkosten', mesh: 'Netz', tris: 'Dreiecke',
    est: 'Richtwerte: Gewicht und Zeit werden aus Volumen, Oberfläche und Füllung geschätzt. Dein Slicer rechnet genauer. Die Bauhöhe der Drucker ist ein Richtwert, du kannst sie ändern.', calc: 'Im Kostenrechner weiterrechnen',
    hStep: 'So geht es', steps: ['Drucker wählen: Das Bett wird in der Größe deines Druckers gezeigt.', 'Datei laden: Das Modell erscheint in der Mitte des Betts. Mit der Maus drehen, mit dem Mausrad zoomen.', 'Ausrichten: Flach auf die größte Fläche legen oder in 90°-Schritten drehen. Rot bedeutet: passt nicht.', 'Material wählen: Du siehst Gewicht, Druckzeit und Materialkosten als Richtwert.'],
    hGood: 'Gut zu wissen', good: ['Die Vorschau ersetzt keinen Slicer. Stützen, Brim, Schichtlinien und exakte Zeiten kommen erst dort.', 'Bei mehrfarbigen Drucken mit Düsenwechsel (z. B. H2C) kann der nutzbare Bauraum kleiner sein als hier angezeigt.', 'Mehr Hilfe zu Maßen und Spiel: <a href="/3d-druck-toleranzen-wandstaerke.html">Toleranzen und Wandstärken</a> und das <a href="/3d-druck-lexikon.html">Lexikon</a>.'] },
  en: { lang: 'en', locale: 'en_US', url: URL_EN, other: URL_DE,
    title: 'Print Bed Preview: See Your Model on the 3D Printer Bed | 3DToolBox',
    desc: 'Load an STL, 3MF, OBJ or STEP file and see it live on your printer’s bed. Check the fit, lay it flat, estimate weight and print time. Free, runs in your browser.',
    pill: 'Tools', h1: 'Print Bed Preview', sub: 'Load your model and see at once how it sits on your printer’s bed. Size, fit, weight and print time at a glance.',
    trust: ['Runs locally in your browser', 'Your file is not uploaded', 'No sign-up', 'Free'],
    s1: 'Choose your printer', printer: 'Printer', height: 'Build height (mm, guide value)', s2: 'Load a file', s3: 'Orient', unit: 'File unit', mm: 'mm', inch: 'inch', scale: 'Scale (%)',
    flat: 'Lay flat on largest face', reset: 'Reset orientation', s4: 'Material and infill', mat: 'Material', infill: 'Infill', price: 'Price per kg (€)',
    views: ['Iso', 'Top', 'Front', 'Side'], empty: 'Load a file to see it on the print bed.', fileNote: 'STL, 3MF, OBJ or STEP',
    results: 'Result', size: 'Size (W × D × H)', fp: 'Footprint on bed', vol: 'Volume', weight: 'Weight', time: 'Print time', cost: 'Material cost', mesh: 'Mesh', tris: 'Triangles',
    est: 'Estimates: weight and time are derived from volume, surface and infill. Your slicer is more precise. Printer build heights are guide values, you can change them.', calc: 'Continue in the cost calculator',
    hStep: 'How it works', steps: ['Choose your printer: the bed is shown at your printer’s size.', 'Load a file: the model appears in the middle of the bed. Drag to rotate, scroll to zoom.', 'Orient: lay it flat on its largest face or rotate in 90° steps. Red means it does not fit.', 'Choose a material: you see weight, print time and material cost as a guide.'],
    hGood: 'Good to know', good: ['The preview does not replace a slicer. Supports, brim, layer lines and exact times only come there.', 'For multi-colour prints with nozzle changes (e.g. H2C) the usable build volume can be smaller than shown here.', 'More help on sizes and clearances: <a href="/en/3d-print-tolerances-wall-thickness.html">tolerances and wall thickness</a> and the <a href="/en/3d-print-lexicon.html">lexicon</a>.'] }
};
function page(lg) {
  const c = C[lg], base = 'https://3dtoolbox.info', DEs = lg === 'de';
  const ld = { '@context': 'https://schema.org', '@type': 'WebApplication', name: c.h1, url: base + c.url, description: c.desc, applicationCategory: 'DesignApplication', operatingSystem: 'Any', inLanguage: c.lang, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } };
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
<link rel="stylesheet" href="/assets/bedview.css">
<script src="/assets/ref-config.js"></script>
<script src="/assets/ref.js" defer></script>
<link rel="stylesheet" href="/assets/theme.css">
<script src="/assets/theme-init.js"></script>
<script src="/assets/ui.js" defer></script>
</head>
<body>
<a class="tb-skip" href="#main">${DEs ? 'Zum Inhalt springen' : 'Skip to content'}</a>
<div class="fm-root bt-sub">
${NAV.header(lg, { path: c.url, other: c.other, crumbs })}  <main id="main" tabindex="-1">

  <header class="bt-subhero"><span class="bt-pill"><i></i>${c.pill}</span><h1 class="fm-title">${c.h1}</h1><p class="fm-sub">${c.sub}</p></header>
  <ul class="bv-trust">${c.trust.map(t => '<li>' + t + '</li>').join('')}</ul>
  <section class="bt-panel mp">
  <div class="bv-grid">
    <div>
      <div class="bv-stage"><div id="bvCanvas" role="img" aria-label="${esc(c.h1)}"></div>
        <div class="bv-views">${['iso', 'top', 'front', 'side'].map((v, i) => `<button class="bv-btn" type="button" data-view="${v}">${c.views[i]}</button>`).join('')}</div></div>
      <p id="bvEmpty" class="bv-empty">${c.empty}</p>
      <span id="bvFit" class="bv-fit" aria-live="polite" hidden></span>
      <div id="bvInfo" hidden>
        <div class="bv-res">
          <div><small>${c.size}</small><b id="bvSize"></b></div><div><small>${c.fp}</small><b id="bvFp"></b></div>
          <div><small>${c.vol}</small><b id="bvVol"></b></div><div><small>${c.weight}</small><b id="bvW"></b></div>
          <div><small>${c.time}</small><b id="bvTime"></b></div><div><small>${c.cost}</small><b id="bvCost"></b></div>
          <div><small>${c.mesh}</small><b id="bvMesh"></b></div><div><small>${c.tris}</small><b id="bvTris"></b></div>
        </div>
        <p id="bvHint" class="bv-hint" hidden></p><p id="bvMeshMsg" class="bv-hint" hidden></p>
        <p class="bv-note">${c.est}</p>
        <a id="bvCalc" class="bv-link" href="#">${c.calc} →</a>
      </div>
    </div>
    <div>
      <div class="bv-step"><h2><i>1</i>${c.s1}</h2>
        <label>${c.printer}<select id="bvPrinter"></select></label>
        <label style="margin-top:8px">${c.height}<input id="bvH" type="number" min="20" max="1000" step="1" value="256"></label></div>
      <div class="bv-step"><h2><i>2</i>${c.s2}</h2>
        <div id="bvDrop" class="bv-drop" role="button" tabindex="0"><b>${DEs ? 'Datei hierher ziehen oder klicken' : 'Drop a file here or click'}</b><span>${c.fileNote}</span><span id="bvFile"></span></div>
        <input id="bvInput" type="file" accept=".stl,.3mf,.obj,.step,.stp" hidden>
        <p id="bvStatus" class="bv-status" role="status"></p></div>
      <div class="bv-step"><h2><i>3</i>${c.s3}</h2>
        <div class="bv-radio" role="radiogroup" aria-label="${c.unit}"><span>${c.unit}:</span><label><input type="radio" name="bvUnit" id="bvUnitMm" value="1" checked>${c.mm}</label><label><input type="radio" name="bvUnit" id="bvUnitIn" value="25.4">${c.inch}</label></div>
        <label style="margin-top:8px">${c.scale}<input id="bvScale" type="number" min="1" max="10000" step="1" value="100"></label>
        <div class="bv-tools"><button id="bvFlat" class="bv-btn" type="button">${c.flat}</button>
          <button class="bv-btn" type="button" data-rot="x:90">X 90°</button><button class="bv-btn" type="button" data-rot="y:90">Y 90°</button><button class="bv-btn" type="button" data-rot="z:90">Z 90°</button>
          <button id="bvReset" class="bv-btn" type="button">${c.reset}</button></div></div>
      <div class="bv-step"><h2><i>4</i>${c.s4}</h2>
        <div class="bv-row"><label>${c.mat}<select id="bvMat"></select></label><label>${c.price}<input id="bvPrice" type="number" min="1" max="1000" step="1" value="20"></label></div>
        <label style="margin-top:8px">${c.infill}: <b id="bvInfillOut">15 %</b><input id="bvInfill" type="range" min="5" max="100" step="5" value="15"></label></div>
    </div>
  </div>
  </section>
  <section class="bt-panel mp"><h2>${c.hStep}</h2><ol class="mp-list">${c.steps.map(s => '<li>' + s + '</li>').join('')}</ol>
  <h2>${c.hGood}</h2><ul class="mp-list">${c.good.map(s => '<li>' + s + '</li>').join('')}</ul></section>
  </main>
${NAV.footer(lg)}</div>
<script src="/assets/vendor/three/three.min.js"></script>
<script src="/assets/vendor/three/OrbitControls.js"></script>
<script src="/assets/converter-core.js"></script>
<script src="/assets/print-dock.js"></script>
<script src="/assets/bedview.js"></script>
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
  const ent = u => `  <url>\n    <loc>${b + u}</loc>\n${alt}    <lastmod>${day}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  sm = sm.replace('</urlset>', ent(URL_DE) + ent(URL_EN) + '</urlset>'); fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm);
}
console.log('OK');
