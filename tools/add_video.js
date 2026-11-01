'use strict';
/* Fügt auf den Tool-Seiten die Video-Anleitung ein (DE + EN). Wiederholbar. Nach build_generators/build_home erneut ausführen. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DUR = require('./video_durations.json');
const MAP = {
  finder: { de: '/index.html', en: '/en/index.html' },
  cost: { de: '/3d-druck-kostenrechner.html', en: '/en/3d-print-cost-calculator.html' },
  grid: { de: '/gridfinity-generator.html', en: '/en/gridfinity-generator.html' },
  conv: { de: '/3d-datei-konverter.html', en: '/en/3d-file-converter.html' },
  db: { de: '/filament-datenbank.html', en: '/en/filament-database.html' },
  lex: { de: '/3d-druck-lexikon.html', en: '/en/3d-print-lexicon.html' }
};
const T = {
  de: { h: 'Video-Anleitung', p: 'So funktioniert das Tool in etwa einer Minute – Schritt für Schritt, mit Untertiteln.', n: { finder: 'Filament-Finder: Schritt-für-Schritt-Anleitung', cost: 'Kostenrechner: Schritt-für-Schritt-Anleitung', grid: 'Gridfinity-Generator: Schritt-für-Schritt-Anleitung', conv: 'Datei-Konverter: Schritt-für-Schritt-Anleitung', db: 'Filament-Datenbank: Schritt-für-Schritt-Anleitung', lex: '3D-Druck-Lexikon: Schritt-für-Schritt-Anleitung' }, d: { finder: 'Foto oder 3MF hochladen und passende Filamente mit Farbabstand finden.', cost: 'Material, Strom, Verschleiß und Fehldrucke berechnen.', grid: 'Gridfinity-Behälter und Grundplatten konfigurieren und als STL oder 3MF laden.', conv: '3D-Dateien lokal im Browser zwischen STL, 3MF, OBJ und STEP umwandeln.', db: 'Filamente nach Material, Marke und Farbe finden.', lex: 'Druckprobleme mit Ursache, Lösung und Prävention nachschlagen.' }, nojs: 'Dein Browser kann dieses Video nicht abspielen.' },
  en: { h: 'Video guide', p: 'How the tool works in about a minute – step by step, with captions.', n: { finder: 'Filament Finder: step-by-step guide', cost: 'Cost Calculator: step-by-step guide', grid: 'Gridfinity Generator: step-by-step guide', conv: 'File Converter: step-by-step guide', db: 'Filament Database: step-by-step guide', lex: '3D Printing Lexicon: step-by-step guide' }, d: { finder: 'Upload a photo or 3MF and find matching filaments by colour distance.', cost: 'Calculate material, energy, wear and failed prints.', grid: 'Configure Gridfinity bins and baseplates and download STL or 3MF.', conv: 'Convert 3D files between STL, 3MF, OBJ and STEP locally in your browser.', db: 'Find filaments by material, brand and colour.', lex: 'Look up print problems with cause, solution and prevention.' }, nojs: 'Your browser cannot play this video.' }
};
const iso = s => 'PT' + Math.floor(s / 60) + 'M' + (s % 60) + 'S';
function block(lg, k) {
  const t = T[lg], base = '/assets/video/' + k + '-' + lg, name = t.n[k];
  const ld = { '@context': 'https://schema.org', '@type': 'VideoObject', name, description: t.d[k], thumbnailUrl: 'https://3dtoolbox.info' + base + '.jpg', uploadDate: '2026-11-01', duration: iso(DUR[k + '-' + lg]), contentUrl: 'https://3dtoolbox.info' + base + '.mp4', inLanguage: lg };
  return '  <!--tb-video-->\n  <section class="tb-video" aria-labelledby="tbv-' + k + '">\n    <h2 id="tbv-' + k + '">' + t.h + '</h2>\n    <p>' + t.p + '</p>\n    <video controls preload="none" playsinline poster="' + base + '.jpg" width="1280" height="720"><source src="' + base + '.mp4" type="video/mp4">' + t.nojs + '</video>\n    <script type="application/ld+json">' + JSON.stringify(ld) + '</script>\n  </section>\n  <!--/tb-video-->\n';
}
let n = 0;
Object.keys(MAP).forEach(k => ['de', 'en'].forEach(lg => {
  const f = path.join(ROOT, MAP[k][lg]); let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/  <!--tb-video-->[\s\S]*?<!--\/tb-video-->\n/, '');
  const i = h.indexOf('  <footer class="tb-foot">');
  if (i < 0) { console.log('kein Fuß:', f); return; }
  h = h.slice(0, i) + block(lg, k) + h.slice(i); fs.writeFileSync(f, h); n++;
}));
console.log('Video-Blöcke:', n);
module.exports = { block };
