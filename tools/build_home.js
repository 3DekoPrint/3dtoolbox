'use strict';
/* Baut Kopf, Einstieg und Werkzeug-Übersicht der Startseiten (DE/EN) neu. Der Filament-Finder darunter bleibt unverändert. Wiederholbar. */
const fs = require('fs'), path = require('path');
const NAV = require('./site_nav.js');
const ROOT = path.resolve(__dirname, '..');
const AR = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-ar"/></svg>';
const ic = id => '<span class="tb-ico"><svg aria-hidden="true"><use href="#' + id + '"/></svg></span>';
const C = {
  de: {
    eyebrow: 'Kostenlos · ohne Anmeldung · läuft im Browser',
    h1: 'Werkzeuge für deinen <em>3D-Druck</em>',
    lead: 'Passendes Filament zu einem Foto finden, Druckkosten berechnen, Modelle nach Maß erzeugen. Deine Dateien bleiben auf deinem Gerät.',
    cta1: 'Filament-Finder starten', cta2: 'Generatoren ansehen',
    facts: ['1000+ Filamente', '30+ Generatoren', 'STL und 3MF'],
    demoT: 'Beispiel: Foto zu Filament', demoS: 'Grüntöne, ΔE nach CIEDE2000', demoCap: 'ΔE ist der Farbabstand. Je kleiner, desto näher am Foto.',
    popH: 'Das nutzen die meisten', popP: 'Sieben Werkzeuge für den Druckalltag. Mehr findest du unten nach Aufgabe sortiert.', all: 'Alle Generatoren',
    tiles: [['finder', 'Filament-Finder', 'Foto oder 3MF hochladen, passende Filamente mit Shop-Link bekommen.', 'i-spool', '#finder'], ['cost', 'Kostenrechner', 'Material, Strom und Verschleiß live berechnen.', 'i-calc'], ['grid', 'Gridfinity', 'Behälter und Grundplatten im 42-mm-Raster.', 'i-box'], ['case', 'Gehäuse-Generator', 'Gehäuse für Raspberry Pi, ESP32 und mehr.', 'i-hex'], ['conv', 'Datei-Konverter', 'STL, 3MF, OBJ und STEP umwandeln.', 'i-swap'], ['img', 'Bild zu 3D', 'Foto in Relief oder Lithophanie verwandeln.', 'i-image'], ['lex', 'Lexikon', 'Druckprobleme, Slicer-Tipps und Begriffe nachschlagen.', 'i-book']],
    taskH: 'Nach Aufgabe', taskP: 'Alles, was im Druckalltag anfällt, ohne Installation, auf Handy und Desktop.',
    cols: [['Filamente', [['finder', 'Filament-Finder'], ['db', 'Filament-Datenbank'], ['rest', 'Restmengenrechner']]], ['Rechnen & Umwandeln', [['cost', 'Kostenrechner'], ['conv', 'Datei-Konverter'], ['img', 'Bild zu 3D'], ['slicer', 'Slicer-Helfer']]], ['Generatoren', [['#storage', 'Aufbewahren & Ordnen'], ['#workshop', 'Werkstatt'], ['#home', 'Haushalt'], ['#art', 'Kunst & Schilder'], ['#electronics', 'Elektronik'], ['hub', 'Alle Generatoren']]], ['Wissen', [['lex', 'Lexikon'], ['mat', 'Materialien'], ['slicer', 'Slicer-Helfer']]]],
    extH: 'Empfehlungen', extP: 'Tools anderer Anbieter, die gut zu 3D-Druck passen. Sie öffnen sich auf der jeweiligen Fremdseite.', extNote: 'Meshy AI und Thangs enthalten Partner-Links (Werbung), für dich entstehen keine Mehrkosten. SolidCraft ist ein Tipp ohne Partner-Link.', ad: 'Werbung', tip: 'Tipp, keine Werbung',
    solid: ['SolidCraft ↗', 'Kostenloses Open-Source-CAD zum Konstruieren eigener Teile, auch im Browser.'],
    meshy: ['Meshy AI ↗', 'KI: aus Text oder Bild ein druckfertiges 3D-Modell erstellen.'], thangs: ['Thangs ↗', 'Große Bibliothek fertiger, druckbarer 3D-Modelle.']
  },
  en: {
    eyebrow: 'Free · no signup · runs in your browser',
    h1: 'Tools for your <em>3D printing</em>',
    lead: 'Find the right filament for a photo, calculate print costs, generate models to measure. Your files stay on your device.',
    cta1: 'Start the Filament Finder', cta2: 'Browse generators',
    facts: ['1000+ filaments', '30+ generators', 'STL and 3MF'],
    demoT: 'Example: photo to filament', demoS: 'Shades of green, ΔE by CIEDE2000', demoCap: 'ΔE is the colour distance. The smaller, the closer to your photo.',
    popH: 'What most people use', popP: 'Seven tools for everyday printing. More below, sorted by task.', all: 'All generators',
    tiles: [['finder', 'Filament Finder', 'Upload a photo or 3MF and get matching filaments with shop links.', 'i-spool', '#finder'], ['cost', 'Cost Calculator', 'Material, power and wear costs live.', 'i-calc'], ['grid', 'Gridfinity', 'Bins and baseplates on the 42 mm grid.', 'i-box'], ['case', 'Enclosure Generator', 'Cases for Raspberry Pi, ESP32 and more.', 'i-hex'], ['conv', 'File Converter', 'Convert STL, 3MF, OBJ and STEP.', 'i-swap'], ['img', 'Image to 3D', 'Turn a photo into a relief or lithophane.', 'i-image'], ['lex', 'Lexicon', 'Look up print problems, slicer tips and terms.', 'i-book']],
    taskH: 'By task', taskP: 'Everything that comes up when printing, no installation, on phone and desktop.',
    cols: [['Filaments', [['finder', 'Filament Finder'], ['db', 'Filament Database'], ['rest', 'Remaining Filament']]], ['Calculate & convert', [['cost', 'Cost Calculator'], ['conv', 'File Converter'], ['img', 'Image to 3D'], ['slicer', 'Slicer Helper']]], ['Generators', [['#storage', 'Storage & organising'], ['#workshop', 'Workshop'], ['#home', 'Home'], ['#art', 'Art & signs'], ['#electronics', 'Electronics'], ['hub', 'All generators']]], ['Knowledge', [['lex', 'Lexicon'], ['mat', 'Materials'], ['slicer', 'Slicer Helper']]]],
    extH: 'Recommended', extP: 'Tools by other providers that fit 3D printing well. They open on the provider’s own site.', extNote: 'Meshy AI and Thangs contain partner links (ad), no extra cost for you. SolidCraft is a tip without a partner link.', ad: 'Ad', tip: 'Tip, not an ad',
    solid: ['SolidCraft ↗', 'Free open-source CAD for designing your own parts, also in the browser.'],
    meshy: ['Meshy AI ↗', 'AI: create a print-ready 3D model from text or an image.'], thangs: ['Thangs ↗', 'Large library of ready-to-print 3D models.']
  }
};
function top(lg) {
  const c = C[lg], other = lg === 'de' ? '/en/' : '/';
  const h = (k) => NAV.href(k, lg);
  const link = (k) => k.charAt(0) === '#' ? NAV.href('hub', lg) + k : h(k);
  const sw = ['#00AE42', '#0056B8', '#FF6A13', '#EC008C', '#FEC600', '#00B1B7', '#e9e6df', '#1d1d1f'].map(x => '<i style="background:' + x + '"></i>').join('');
  let s = NAV.header(lg, { path: h('finder'), other, crumbs: null }).replace('<li class="tb-grp is-cur">', '<li class="tb-grp">');
  s += '\n  <header class="tb-hero">\n    <div>\n      <span class="tb-mono">' + c.eyebrow + '</span>\n      <h1>' + c.h1 + '</h1>\n      <p class="tb-lead">' + c.lead + '</p>\n      <p class="fm-tools-credit bt-credit" id="fmToolsCredit" style="display:none;"></p>\n';
  s += '      <div class="tb-cta"><a class="tb-btn tb-btn-primary" href="#finder">' + c.cta1 + ' ' + AR + '</a><a class="tb-btn tb-btn-ghost" href="' + h('hub') + '">' + c.cta2 + ' ' + AR + '</a></div>\n';
  s += '      <ul class="tb-facts">' + c.facts.map(f => '<li>' + f + '</li>').join('') + '</ul>\n    </div>\n';
  s += '    <div class="tb-demo" aria-hidden="true"><div class="tb-demo-img"><i></i><div><b>' + c.demoT + '</b><span>' + c.demoS + '</span></div></div>' +
    [['#2F8F5B', 'PLA matt, Grün', '#2F8F5B', '1,8'], ['#2B7A55', 'PLA Basic, Grün', '#2B7A55', '3,2'], ['#3D9A6A', 'PETG, Grün', '#3D9A6A', '4,6']].map(r => '<div class="tb-res-row"><i style="background:' + r[0] + '"></i><div><b>' + (lg === 'de' ? r[1] : r[1].replace('matt', 'matte').replace('Grün', 'Green')) + '</b><small>' + r[2] + '</small></div><span class="tb-de">ΔE ' + r[3] + '</span></div>').join('') + '<p class="tb-demo-cap">' + c.demoCap + '</p></div>\n  </header>\n\n';
  s += '  <section class="tb-sec" id="tools">\n    <div class="tb-head"><div><span class="tb-mono">' + (lg === 'de' ? 'Beliebt' : 'Popular') + '</span><h2>' + c.popH + '</h2></div><p>' + c.popP + '</p></div>\n    <div class="tb-grid">\n';
  c.tiles.forEach((t, i) => {
    const id = t[0] === 'cost' ? ' id="fmToolCalc"' : '';
    s += '      <a class="tb-t' + (i === 0 ? ' tb-flag' : '') + '"' + id + ' href="' + (t[4] || h(t[0])) + '">' + (i === 0 ? '<div class="tb-sw" aria-hidden="true">' + sw + '</div>' : ic(t[3])) + '<h3>' + t[1] + '</h3><p>' + t[2] + '</p></a>\n';
  });
  s += '    </div>\n  </section>\n\n  <section class="tb-sec" id="aufgaben">\n    <div class="tb-head"><div><span class="tb-mono">' + (lg === 'de' ? 'Übersicht' : 'Overview') + '</span><h2>' + c.taskH + '</h2></div><p>' + c.taskP + '</p></div>\n    <div class="tb-cols">\n';
  c.cols.forEach(col => { s += '      <div class="tb-col"><h3>' + col[0] + '</h3><ul>' + col[1].map(l => '<li><a href="' + link(l[0]) + '">' + l[1] + '</a></li>').join('') + '</ul></div>\n'; });
  s += '    </div>\n  </section>\n\n  <section class="tb-sec" id="extern">\n    <div class="tb-ext">\n      <div class="tb-ext-head"><span class="tb-mono">' + (lg === 'de' ? 'Nicht von 3DToolBox' : 'Not by 3DToolBox') + '</span><h2>' + c.extH + '</h2><p>' + c.extP + '</p></div>\n';
  s += '      <a class="tb-ext-item" id="fmToolMeshy" href="https://www.meshy.ai?via=3dekoprint" target="_blank" rel="noopener sponsored"><em class="tb-ad">' + c.ad + '</em><b>' + c.meshy[0] + '</b><span>' + c.meshy[1] + '</span></a>\n';
  s += '      <a class="tb-ext-item" id="fmToolThangs" href="https://than.gs/u/8355632" target="_blank" rel="noopener sponsored"><em class="tb-ad">' + c.ad + '</em><b>' + c.thangs[0] + '</b><span>' + c.thangs[1] + '</span></a>\n      <a class="tb-ext-item" id="fmToolSolid" href="https://solidcraft.io" target="_blank" rel="noopener noreferrer"><em class="tb-ad tb-tip">' + c.tip + '</em><b>' + c.solid[0] + '</b><span>' + c.solid[1] + '</span></a>\n      <small>' + c.extNote + '</small>\n    </div>\n  </section>\n\n';
  return s;
}
['de', 'en'].forEach(lg => {
  const f = path.join(ROOT, lg === 'de' ? 'index.html' : 'en/index.html'); let h = fs.readFileSync(f, 'utf8');
  /* Bereich vom Kopf bis zum Filament-Finder ersetzen */
  const a = h.search(/[ \t]*(?:<nav class="bt-nav">|<header class="tb-top">)/), b = h.indexOf('<section class="bt-finder" id="finder">');
  if (a < 0 || b < 0) throw new Error('Marker fehlen in ' + f);
  /* Reihenfolge: Hero, beliebte Werkzeuge, Filament-Finder, Video, danach „Nach Aufgabe“ und Empfehlungen */
  const t = top(lg), cut = t.indexOf('  <section class="tb-sec" id="aufgaben">'); if (cut < 0) throw new Error('aufgaben fehlt');
  let rest = h.slice(b).replace(/[ \t]*<section class="tb-sec" id="aufgaben">[\s\S]*?<\/section>\s*/, '').replace(/[ \t]*<section class="tb-sec" id="extern">[\s\S]*?<\/section>\s*/, '');
  const m = rest.search(/[ \t]*<footer class="tb-foot">/); if (m < 0) throw new Error('Fuss fehlt');
  rest = rest.slice(0, m).replace(/[ \t]*<\/main>\s*$/, '').replace(/\s+$/, '') + '\n\n' + t.slice(cut).replace(/\s+$/, '') + '\n' + rest.slice(m);
  h = h.slice(0, a) + t.slice(0, cut).replace(/\s+$/, '') + '\n\n' + rest;
  /* Partner-Kasten und alter Fuß ersetzen */
  h = h.replace(/[ \t]*<div id="partner"><\/div>\s*<div class="fm-partner">[\s\S]*?<\/div>\n/, '');
  h = h.replace(/[ \t]*<div class="fm-footer">[\s\S]*?<\/div>\s*<\/div>\n/, () => NAV.footer(lg));
  if (h.indexOf('/assets/theme-init.js') < 0) h = h.replace('</head>', '<script src="/assets/theme-init.js"></script>\n<script src="/assets/ui.js" defer></script>\n</head>');
  fs.writeFileSync(f, h);
});
console.log('Startseiten gebaut');
