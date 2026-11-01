'use strict';
/* Barrierefreiheits-Nachlauf: Sprunglink + <main>-Bereich auf allen Seiten. Wiederholbar (idempotent).
   Nach build_home / build_generators / apply_nav / add_video ausführen. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['.git', 'node_modules', 'tools', 'assets']);
const files = [];
(function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { if (SKIP.has(e.name)) return; const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) files.push(f); }); })(ROOT);

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
/* Prüft, ob ein HTML-Ausschnitt in sich ausgeglichen ist (Tags öffnen/schließen sauber). */
function balanced(s) {
  s = s.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|textarea)\b[\s\S]*?<\/\1>/gi, '');
  const st = [], re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/?)>/g; let m;
  while ((m = re.exec(s))) {
    const tag = m[2].toLowerCase();
    if (m[1]) { if (st.pop() !== tag) return false; }
    else if (!VOID.has(tag) && !m[3]) st.push(tag);
  }
  return st.length === 0;
}
let done = 0; const notes = [];
files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8'); const o = h;
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  const en = /<html lang="en"/.test(h);
  if (h.indexOf('class="tb-skip"') < 0) h = h.replace(/(<body[^>]*>\n?)/, '$1<a class="tb-skip" href="#main">' + (en ? 'Skip to content' : 'Zum Inhalt springen') + '</a>\n');
  if (h.indexOf('<main') < 0) {
    const a = h.indexOf('<header class="tb-top">');
    const aEnd = a < 0 ? -1 : h.indexOf('</header>', a);
    const b = h.indexOf('<footer class="tb-foot">');
    if (aEnd < 0 || b < 0 || b < aEnd) notes.push(rel + ': kein Kopf/Fuß gefunden');
    else {
      const start = h.indexOf('\n', aEnd) + 1;
      const inner = h.slice(start, b);
      if (!balanced(inner)) notes.push(rel + ': Bereich nicht ausgeglichen, main übersprungen');
      else h = h.slice(0, start) + '  <main id="main" tabindex="-1">\n' + inner + '  </main>\n' + h.slice(b);
    }
  }
  if (h !== o) { fs.writeFileSync(f, h); done++; }
});
console.log('Seiten angepasst:', done, 'von', files.length);
if (notes.length) console.log(notes.join('\n'));
