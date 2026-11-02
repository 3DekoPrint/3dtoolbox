'use strict';
/* Baut die SolidCraft-Infoseite (DE/EN). Danach: apply_nav.js (Kopf/Fuß), Sitemap wird hier ergänzt. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const URL_DE = '/solidcraft-step-bearbeiten.html', URL_EN = '/en/edit-step-in-solidcraft.html';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const C = {
  de: {
    lang: 'de', locale: 'de_DE', url: URL_DE,
    title: 'STEP-Datei in SolidCraft bearbeiten (kostenloses CAD im Browser) | 3DToolBox',
    desc: 'So holst du ein Teil aus dem 3DToolBox-Generator in SolidCraft: STL im Datei-Konverter in STEP umwandeln, importieren und Kanten, Löcher und Maße ändern. Ehrlich erklärt, wann das klappt.',
    pill: 'Wissen', h1: 'Teile in SolidCraft weiter bearbeiten',
    sub: 'Generator-Teil als STEP laden und in einem kostenlosen CAD im Browser anpassen – mit klaren Grenzen.',
    tip: 'Tipp, keine Werbung', tipTxt: 'SolidCraft ist ein externes Programm. Wir haben keine Partnerschaft und erhalten keine Vergütung für diese Empfehlung.',
    open: 'SolidCraft öffnen ↗', openRel: 'noopener noreferrer',
    s1: 'Wofür das gut ist',
    p1: 'Die Generatoren von 3DToolBox liefern STL und 3MF. Das sind Dreiecksnetze: Sie eignen sich zum Drucken, aber nicht zum Konstruieren. Wenn du an einem fertigen Teil noch eine Kante abrunden, ein Loch versetzen oder eine Wand ändern willst, brauchst du ein CAD-Programm, das echte Flächen kennt. <a href="https://solidcraft.io" target="_blank" rel="noopener noreferrer">SolidCraft</a> ist ein kostenloses CAD, das direkt im Browser läuft und STEP-Dateien importiert.',
    s2: 'So gehst du vor',
    steps: [
      'Teil im Generator einstellen und als <b>STL</b> herunterladen.',
      'Im <a href="/3d-datei-konverter.html">Datei-Konverter</a> die STL laden und als Ziel <b>STEP</b> wählen. Die Umwandlung läuft in deinem Browser, die Datei wird nicht hochgeladen.',
      'In SolidCraft auf der Startseite <b>Importieren</b> wählen und die STEP-Datei öffnen.',
      'Das Teil als Volumenkörper bearbeiten, zum Beispiel mit <b>Vollrundung</b>, <b>Abschrägung</b>, <b>Bohrung</b> oder <b>Drücken/Ziehen</b>, und danach wieder als STL oder 3MF exportieren.'
    ],
    s3: 'Wann es funktioniert – und wann nicht',
    ok: ['<b>Gut geeignet:</b> Teile aus ebenen Flächen, etwa Platten, Halter, Winkel, Kästen und Gehäuse. Der Konverter fasst Dreiecke in derselben Ebene zu einer Fläche zusammen, sodass in SolidCraft zum Beispiel eine ganze Kante auswählbar ist.',
         '<b>Eingeschränkt:</b> Runde Teile wie Zylinder, Knöpfe oder Vasen. Gekrümmte Flächen bleiben im STEP viele kleine ebene Flächen. Sie lassen sich öffnen und messen, aber nicht als glatte Rundung ändern.',
         '<b>Nicht bearbeitbar:</b> STL, 3MF und OBJ lassen sich in SolidCraft zwar öffnen, messen, verschieben und exportieren, aber nicht als Konstruktion ändern.'],
    tested: 'Getestet haben wir einen STEP-Export mit Loch: SolidCraft importiert ihn als einen Volumenkörper, eine Kante ließ sich abrunden. Weitere Funktionen hängen vom jeweiligen Teil ab; probiere es mit einer Kopie.',
    s4: 'Häufige Fragen',
    faq: [
      ['Kostet SolidCraft etwas?', 'Nach unserem Stand ist die Browser-Version kostenlos nutzbar. Prüfe die aktuellen Bedingungen direkt bei SolidCraft.'],
      ['Wird meine Datei hochgeladen?', 'Unser Konverter arbeitet lokal in deinem Browser. Was du danach in SolidCraft öffnest, bestimmst du selbst; beachte dessen Datenschutzhinweise.'],
      ['Warum nicht direkt die STL bearbeiten?', 'Eine STL besteht nur aus Dreiecken. CAD-Funktionen wie Abrunden brauchen echte Flächen und Kanten, die ein STEP liefert.'],
      ['Brauche ich ein Konto?', 'Zum Ausprobieren haben wir keines gebraucht. Ob SolidCraft für bestimmte Funktionen eines verlangt, siehst du dort.']
    ],
    also: 'Weiter: <a href="/generatoren.html">Alle Generatoren</a> · <a href="/3d-datei-konverter.html">Datei-Konverter</a>'
  },
  en: {
    lang: 'en', locale: 'en_US', url: URL_EN,
    title: 'Edit a STEP File in SolidCraft (Free Browser CAD) | 3DToolBox',
    desc: 'How to take a part from a 3DToolBox generator into SolidCraft: convert the STL to STEP in the file converter, import it and change edges, holes and sizes. Honest about when this works.',
    pill: 'Knowledge', h1: 'Keep editing your parts in SolidCraft',
    sub: 'Load a generator part as STEP and adjust it in a free browser CAD – with clear limits.',
    tip: 'Tip, not an ad', tipTxt: 'SolidCraft is an external program. We have no partnership and receive no compensation for this recommendation.',
    open: 'Open SolidCraft ↗', openRel: 'noopener noreferrer',
    s1: 'What this is for',
    p1: '3DToolBox generators deliver STL and 3MF. Those are triangle meshes: fine for printing, not for designing. If you want to round an edge, move a hole or change a wall on a finished part, you need CAD that understands real faces. <a href="https://solidcraft.io" target="_blank" rel="noopener noreferrer">SolidCraft</a> is a free CAD that runs in the browser and imports STEP files.',
    s2: 'How to do it',
    steps: [
      'Set up the part in the generator and download it as <b>STL</b>.',
      'Load the STL in the <a href="/en/3d-file-converter.html">file converter</a> and choose <b>STEP</b> as the target. The conversion runs in your browser, the file is not uploaded.',
      'In SolidCraft choose <b>Import</b> on the start screen and open the STEP file.',
      'Edit the part as a solid, for example with <b>fillet</b>, <b>chamfer</b>, <b>hole</b> or <b>push/pull</b>, then export it again as STL or 3MF.'
    ],
    s3: 'When it works – and when it does not',
    ok: ['<b>Works well:</b> parts made of flat faces, such as plates, brackets, angles, boxes and enclosures. The converter merges triangles in the same plane into one face, so in SolidCraft you can select a whole edge, for example.',
         '<b>Limited:</b> round parts such as cylinders, knobs or vases. Curved surfaces stay many small flat faces in the STEP. You can open and measure them, but not change them as a smooth curve.',
         '<b>Not editable:</b> STL, 3MF and OBJ open in SolidCraft for viewing, measuring, moving and exporting, but cannot be changed as a design.'],
    tested: 'We tested a STEP export with a hole: SolidCraft imports it as one solid and an edge could be rounded. Other functions depend on the part; try it on a copy.',
    s4: 'Frequently asked questions',
    faq: [
      ['Does SolidCraft cost anything?', 'As far as we know the browser version is free to use. Check the current terms with SolidCraft directly.'],
      ['Is my file uploaded?', 'Our converter works locally in your browser. What you open in SolidCraft afterwards is up to you; see their privacy information.'],
      ['Why not edit the STL directly?', 'An STL consists of triangles only. CAD functions like filleting need real faces and edges, which a STEP provides.'],
      ['Do I need an account?', 'We did not need one to try it. Whether SolidCraft asks for one for certain features, you will see there.']
    ],
    also: 'Next: <a href="/en/generators.html">All generators</a> · <a href="/en/3d-file-converter.html">File converter</a>'
  }
};
function page(lg) {
  const c = C[lg], other = lg === 'de' ? C.en : C.de, base = 'https://3dtoolbox.info';
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', name: c.h1, url: base + c.url, description: c.desc, inLanguage: c.lang },
    { '@type': 'FAQPage', mainEntity: c.faq.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) }] };
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
<script src="/assets/ref-config.js"></script>
<script src="/assets/ref.js" defer></script>
<link rel="stylesheet" href="/assets/theme.css">
<script src="/assets/theme-init.js"></script>
<script src="/assets/ui.js" defer></script>
</head>
<body>
<a class="tb-skip" href="#main">${lg === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}</a>
<div class="fm-root bt-sub">
  <header class="tb-top">
  </header>
  <main id="main" tabindex="-1">

  <header class="bt-subhero"><span class="bt-pill"><i></i>${c.pill}</span><h1 class="fm-title">${c.h1}</h1><p class="fm-sub">${c.sub}</p></header>
  <section class="bt-panel mp">
  <h2>${c.s1}</h2><p>${c.p1}</p>
  <p><a class="mp-cta" href="https://solidcraft.io" target="_blank" rel="${c.openRel}">${c.open}</a> <span class="tb-tip">${c.tip}</span></p>
  <p class="mp-note">${c.tipTxt}</p>
  <h2>${c.s2}</h2><ol>${c.steps.map(s => '<li>' + s + '</li>').join('')}</ol>
  <h2>${c.s3}</h2><ul>${c.ok.map(s => '<li>' + s + '</li>').join('')}</ul><p>${c.tested}</p>
  <h2>${c.s4}</h2>${c.faq.map(q => '<h3>' + esc(q[0]) + '</h3><p>' + esc(q[1]) + '</p>').join('')}
  <p>${c.also}</p>
  </section>
  </main>
<footer class="tb-foot">
</footer>
</div>
</body>
</html>
`;
}
fs.writeFileSync(path.join(ROOT, URL_DE.slice(1)), page('de'));
fs.writeFileSync(path.join(ROOT, URL_EN.slice(1)), page('en'));
/* Sitemap */
let sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
if (!sm.includes(URL_DE)) {
  const day = new Date().toISOString().slice(0, 10), b = 'https://3dtoolbox.info';
  const alt = `    <xhtml:link rel="alternate" hreflang="de" href="${b + URL_DE}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${b + URL_EN}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${b + URL_DE}"/>\n`;
  const ent = u => `  <url>\n    <loc>${b + u}</loc>\n${alt}    <lastmod>${day}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  sm = sm.replace('</urlset>', ent(URL_DE) + ent(URL_EN) + '</urlset>');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm);
}
