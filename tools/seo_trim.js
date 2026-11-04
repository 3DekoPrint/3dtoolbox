'use strict';
/* Kürzt zu lange <title> (>65) und meta description (>160) an Wort-/Satzgrenzen; wiederholbar (idempotent).
   Läuft am Ende der Build-Kette über alle Seiten. Betrifft title/og:title/twitter:title und description/og:/twitter:. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SKIP = new Set(['.git', 'node_modules', 'tools', 'assets']);
const files = [];
(function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { if (SKIP.has(e.name)) return; const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) files.push(f); }); })(ROOT);
const T = 65, D = 160, BRAND = ' | 3DToolBox';
function trimTitle(t) {
  if (t.length <= T) return t;
  let s = t.replace(/\s*\((?:kostenlos|free)\)/i, '');            /* 1. Klammer "(kostenlos)" */
  if (s.length <= T) return s;
  const hasBrand = s.endsWith(BRAND), core = hasBrand ? s.slice(0, -BRAND.length) : s, room = T - (hasBrand ? BRAND.length : 0);
  if (core.length <= room) return s;
  /* 2. Kern an Trennzeichen (: – , &) kürzen, sonst Wortgrenze */
  let cut = core.slice(0, room + 1), i = Math.max(cut.lastIndexOf(': '), cut.lastIndexOf(' – '), cut.lastIndexOf(', '), cut.lastIndexOf(' & '), cut.lastIndexOf(' '));
  if (i < room * 0.5) i = cut.lastIndexOf(' ');
  cut = cut.slice(0, i).replace(/[\s,:;–&-]+$/, '');
  return cut + (hasBrand ? BRAND : '');
}
function trimDesc(d) {
  if (d.length <= D) return d;
  const cut = d.slice(0, D + 1);
  let i = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '));
  if (i >= 90) return cut.slice(0, i + 1);
  i = Math.max(cut.lastIndexOf(' – '), cut.lastIndexOf(' — '), cut.lastIndexOf('; '), cut.lastIndexOf(': '), cut.lastIndexOf(', '));
  if (i >= 100) return cut.slice(0, i).replace(/[\s,;:–-]+$/, '') + '.';
  i = cut.lastIndexOf(' ');
  return cut.slice(0, i).replace(/[\s,;:–&-]+$/, '') + '…';
}
const unesc = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let n = 0;
files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8'), o = h;
  h = h.replace(/<title>([\s\S]*?)<\/title>/, (m, t) => '<title>' + esc(trimTitle(unesc(t))) + '</title>');
  h = h.replace(/(<meta (?:property="og:title"|name="twitter:title") content=")([^"]*)(")/g, (m, a, t, c) => a + esc(trimTitle(unesc(t))) + c);
  h = h.replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")([^"]*)(")/g, (m, a, t, c) => a + esc(trimDesc(unesc(t))) + c);
  if (h !== o) { fs.writeFileSync(f, h); n++; }
});
console.log('seo_trim: ' + n + ' Seiten angepasst');
