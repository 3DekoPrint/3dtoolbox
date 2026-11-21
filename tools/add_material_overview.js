'use strict';
/* Fügt auf allen Materialseiten (DE/EN) idempotent einen Überblickskasten mit Datenblatt-Download ein. */
const fs = require('fs'), path = require('path');
global.window = {}; require('../assets/materials.js'); const items = window.MaterialDB.items;
const ROOT = path.resolve(__dirname, '..'), esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SPEC = { 'pla-plus': 'PLA+', 'tpu-soft': 'TPU-SOFT', 'pet-cf': 'PET-CF' };
const idOf = f => SPEC[f] || f.toUpperCase();
const TX = {
  de: { h: 'Kurzüberblick', nozzle: 'Düse', bed: 'Bett', encl: ['Kein Gehäuse nötig', 'Gehäuse optional', 'Geschlossener Bauraum nötig'], bau: 'Bauraum', diff: ['', 'sehr einfach', 'einfach', 'mittel', 'anspruchsvoll', 'schwierig'], dl: 'Datenblatt als Textdatei laden', hard: 'Gehärtete Düse nötig', nohard: 'Standard-Düse reicht', dry: 'Trocknen', nozzleK: 'Düse', nozzleT: 'Düsentyp', ease: 'Schwierigkeit', colors: 'Farben', colLink: 'Farben in der Filament-Datenbank ansehen', colHref: '/filament-datenbank.html', use: 'Ideal für', note: 'Die Datei wird lokal in deinem Browser erzeugt. Werte sind Richtwerte.' },
  en: { h: 'At a glance', nozzle: 'Nozzle', bed: 'Bed', encl: ['No enclosure needed', 'Enclosure optional', 'Enclosed chamber required'], bau: 'Build chamber', diff: ['', 'very easy', 'easy', 'medium', 'demanding', 'difficult'], dl: 'Download data sheet (text file)', hard: 'Hardened nozzle required', nohard: 'Standard nozzle is fine', dry: 'Drying', nozzleK: 'Nozzle', nozzleT: 'Nozzle type', ease: 'Difficulty', colors: 'Colours', colLink: 'See colours in the filament database', colHref: '/en/filament-database.html', use: 'Best for', note: 'The file is generated locally in your browser. Values are guide values.' }
};
let n = 0;
for (const lg of ['de', 'en']) {
  const dir = path.join(ROOT, lg === 'de' ? 'materialien' : 'en/materials'), t = TX[lg];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.html') || f === 'index.html') continue;
    const m = items.find(x => x.id === idOf(f.slice(0, -5))); if (!m) { console.log('kein Material:', f); continue; }
    const p = path.join(dir, f); let s = fs.readFileSync(p, 'utf8');
    if (s.includes('<!--mat-ov-->')) continue;
    const box = `<!--mat-ov--><div class="mp-ov"><h2>${t.h}</h2><dl class="mp-ov-grid"><div><dt>${t.nozzleK}</dt><dd>${esc(m.nozzle[lg])} °C</dd></div><div><dt>${t.bed}</dt><dd>${esc(m.bed[lg])} °C</dd></div><div><dt>${t.bau}</dt><dd>${t.encl[m.encl]}</dd></div><div><dt>${t.nozzleT}</dt><dd>${m.hard ? t.hard : t.nohard}</dd></div><div><dt>${t.ease}</dt><dd>${m.diff}/5 · ${t.diff[m.diff]}</dd></div>${m.dry[lg] ? `<div><dt>${t.dry}</dt><dd>${esc(m.dry[lg])}</dd></div>` : ''}</dl><p><b>${t.use}:</b> ${esc(m.uses[lg])}</p><p><a class="md-link" href="${t.colHref}">${t.colLink} →</a></p><button type="button" id="mpDl" class="mp-ov-btn" data-id="${esc(m.id)}" data-lang="${lg}">${t.dl} ↓</button><p class="md-note" style="margin-top:8px">${t.note}</p></div><!--/mat-ov-->`;
    const k = '<section class="bt-panel mp">'; const i = s.indexOf(k); if (i < 0) { console.log('keine Section:', f); continue; }
    s = s.slice(0, i + k.length) + '\n  ' + box + s.slice(i + k.length);
    s = s.replace('<script src="/assets/material-page.js"></script>', '<script src="/assets/material-page.js"></script>\n<script src="/assets/materials.js"></script>\n<script src="/assets/material-ov.js"></script>');
    fs.writeFileSync(p, s); n++;
  }
}
console.log('geändert:', n);
