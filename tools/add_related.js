// Fügt den Block "Verwandte Werkzeuge" in bestehende Generator-Seiten ein (idempotent, Marker gk-related).
// Nutzt dieselbe Logik wie build_generators.js, ohne die Seiten komplett neu zu erzeugen.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
let src = fs.readFileSync(path.join(__dirname, 'build_generators.js'), 'utf8').replace(/^#!.*\n/, '');
// Nur Definitionen, T, EXISTING und relatedHtml aus dem Build-Skript übernehmen (alles bis function chunks / hubPage ausschneiden)
const startRel = src.indexOf('/* Verwandte Werkzeuge');
const endRel = src.indexOf('function toolPage');
const head = src.slice(0, src.indexOf('function chunks'));
const relPart = src.slice(startRel, endRel);
const code = head + relPart + '\nmodule.exports = { defs, relatedHtml, urlOf };';
const m = { exports: {} };
new Function('require', 'module', '__dirname', code)((r) => require(r.startsWith('.') ? path.join(__dirname, r) : r), m, __dirname);
const { defs, relatedHtml, urlOf } = m.exports;
let n = 0;
for (const d of defs) for (const lg of ['de', 'en']) {
  const f = path.join(ROOT, (lg === 'de' ? '' : 'en/') + d.meta.slug[lg] + '.html');
  let h = fs.readFileSync(f, 'utf8');
  const block = relatedHtml(d, lg);
  if (h.includes('gk-related')) h = h.replace(/  <section class="bt-panel mp gk-related">[\s\S]*?<\/section>\n/, block);
  else { const i = h.indexOf('</section>\n', h.indexOf('class="bt-panel mp"')); if (i < 0) { console.log('kein Anker', f); continue; } h = h.slice(0, i + 11) + block + h.slice(i + 11); }
  fs.writeFileSync(f, h); n++;
}
console.log(n, 'Seiten aktualisiert');
