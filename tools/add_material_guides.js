// Fügt die Praxis-Abschnitte aus tools/material_guides.js vor "Ähnliche Materialien vergleichen" ein (idempotent).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), G = require('./material_guides.js');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const targets = { de: ['materialien/', '<h2>Ähnliche Materialien vergleichen</h2>'], en: ['en/materials/', '<h2>Compare similar materials</h2>'] };
let n = 0;
for (const id of Object.keys(G)) for (const lg of ['de', 'en']) {
  const f = path.join(ROOT, targets[lg][0] + id + '.html'), g = G[id][lg];
  let h = fs.readFileSync(f, 'utf8');
  const block = '<!--mat-guide--><h2>' + esc(g.probs) + '</h2>' + g.items.map(i => '<h3>' + esc(i[0]) + '</h3><p>' + esc(i[1]) + '</p>').join('') + '<h2>' + esc(g.when) + '</h2><p>' + esc(g.whenText) + '</p><!--/mat-guide-->\n  ';
  h = h.replace(/<!--mat-guide-->[\s\S]*?<!--\/mat-guide-->\n  /, '');
  const i = h.indexOf(targets[lg][1]); if (i < 0) { console.log('kein Anker', f); continue; }
  fs.writeFileSync(f, h.slice(0, i) + block + h.slice(i)); n++;
}
console.log(n, 'Seiten');
