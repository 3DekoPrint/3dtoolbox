'use strict';
/* Idempotent: Menüpunkte Druckbett-Vorschau (vor Konverter) und Ratgeber/FAQ (nach Lexikon) in alle Seiten einfügen. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? (/^(node_modules|\.git|tools|assets)$/.test(e.name) ? [] : walk(path.join(d, e.name))) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);
const L = (u, b, s) => `<a href="${u}"><b>${b}</b><span>${s}</span></a>`;
const A = {
  de: [
    [/(<a href="\/3d-datei-konverter\.html"[^>]*><b>Datei-Konverter<\/b>)/, L('/druckbett-vorschau.html', 'Druckbett-Vorschau', 'Modell auf dem Druckbett ansehen und Passung prüfen'), '/druckbett-vorschau.html', 'before'],
    [/(<a href="\/3d-druck-lexikon\.html"[^>]*><b>Lexikon<\/b><span>[^<]*<\/span><\/a>)/, L('/3d-druck-kosten-sparen.html', 'Kosten sparen', 'Hebel für günstigere Drucke') + L('/3d-druck-toleranzen-wandstaerke.html', 'Toleranzen &amp; Wandstärken', 'Spiel, Passungen und Mindestwerte') + L('/ratgeber-ersatzteile-drucken.html', 'Ratgeber: Ersatzteile', 'Defekte Teile selbst nachdrucken') + L('/ratgeber-prototypen-drucken.html', 'Ratgeber: Prototypen', 'Schnell zum ersten Muster'), '/3d-druck-kosten-sparen.html', 'after']],
  en: [
    [/(<a href="\/en\/3d-file-converter\.html"[^>]*><b>File Converter<\/b>)/, L('/en/print-bed-preview.html', 'Print Bed Preview', 'See your model on the print bed and check the fit'), '/en/print-bed-preview.html', 'before'],
    [/(<a href="\/en\/3d-print-lexicon\.html"[^>]*><b>Lexicon<\/b><span>[^<]*<\/span><\/a>)/, L('/en/3d-print-save-costs.html', 'Save costs', 'Levers for cheaper prints') + L('/en/3d-print-tolerances-wall-thickness.html', 'Tolerances &amp; wall thickness', 'Clearances, fits and minimum values') + L('/en/guide-print-spare-parts.html', 'Guide: spare parts', 'Reprint broken parts yourself') + L('/en/guide-print-prototypes.html', 'Guide: prototypes', 'Fast route to a first sample'), '/en/3d-print-save-costs.html', 'after']]
};
let n = 0;
for (const f of walk(ROOT)) {
  let h = fs.readFileSync(f, 'utf8'), o = h; const lg = /<html lang="en"/.test(h) ? 'en' : 'de';
  for (const [re, link, key, pos] of A[lg]) {
    if (h.includes('<a href="' + key + '"') || !re.test(h)) continue;
    h = h.replace(re, m => pos === 'before' ? link + m : m + link);
  }
  if (h !== o) { fs.writeFileSync(f, h); n++; }
}
console.log('geaendert:', n);
