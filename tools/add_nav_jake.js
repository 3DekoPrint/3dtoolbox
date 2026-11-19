'use strict';
/* Idempotent: fuegt den Menuepunkt "3DJake-Sortiment" hinter "Filament-Datenbank" in allen Seiten ein. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? (/^(node_modules|\.git|tools|assets)$/.test(e.name) ? [] : walk(path.join(d, e.name))) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);
const A = {
  de: [/(<a href="\/filament-datenbank\.html"[^>]*><b>Filament-Datenbank<\/b><span>[^<]*<\/span><\/a>)/, '<a href="/filament-3djake-sortiment.html"><b>3DJake-Sortiment</b><span>Alle lieferbaren Filamente von 3DJake (Werbung)</span></a>', '/filament-3djake-sortiment.html'],
  en: [/(<a href="\/en\/filament-database\.html"[^>]*><b>Filament Database<\/b><span>[^<]*<\/span><\/a>)/, '<a href="/en/3djake-filament-range.html"><b>3DJake range</b><span>Every in-stock 3DJake filament (ad)</span></a>', '/en/3djake-filament-range.html']
};
let n = 0;
for (const f of walk(ROOT)) {
  let h = fs.readFileSync(f, 'utf8');
  const lg = /<html lang="en"/.test(h) ? 'en' : 'de', [re, link, key] = A[lg];
  if (h.includes('<a href="' + key + '"') || !re.test(h)) continue;
  fs.writeFileSync(f, h.replace(re, '$1' + link)); n++;
}
console.log('geaendert:', n);
