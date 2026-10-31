/* Schablone: Text als Öffnung, Inseln (z. B. im O) werden automatisch mit Stegen gehalten. */
GenKit.define({
  id: 'stencil', file: 'schablone',
  fname: function (p) { return (p.text || 'schablone').replace(/[^\w]+/g, '_').slice(0, 14); },
  meta: {
    cat: 'art', slug: { de: 'schablone-generator', en: 'stencil-generator' },
    title: { de: 'Schablonen-Generator: Textschablone mit Stegen als STL/3MF (kostenlos)', en: 'Stencil Generator: text stencil with bridges as STL/3MF (free)' },
    h1: { de: 'Schablone', en: 'Stencil' },
    sub: { de: 'Schablone für Beschriftung, Airbrush oder Sprühfarbe: Text eingeben, Stege für Buchstaben wie O, A oder B entstehen automatisch.', en: 'A stencil for lettering, airbrush or spray paint: enter text, bridges for letters like O, A or B are created automatically.' },
    desc: { de: 'Kostenloser Schablonen-Generator: Textschablonen mit automatischen Stegen für Buchstaben mit Innenflächen. Mehrere Zeilen, wählbare Schrift, Export als STL und 3MF.', en: 'Free stencil generator: text stencils with automatic bridges for letters with inner areas. Several lines, selectable font, export as STL and 3MF.' },
    tag: { de: 'Kunst & Schilder', en: 'Art & signs' },
    intro: { de: ['Bei einer Schablone fallen die Innenflächen von Buchstaben wie O, A, B, D, P, Q und R heraus. Der Generator erkennt diese Inseln und verbindet sie mit schmalen Stegen mit dem Rand.', 'Du stellst Schrifthöhe, Stegbreite und Plattendicke ein. Mehrere Zeilen trennst du mit einem senkrechten Strich.'], en: ['In a stencil the inner areas of letters like O, A, B, D, P, Q and R would fall out. The generator detects these islands and connects them to the surround with narrow bridges.', 'Set letter height, bridge width and plate thickness. Separate several lines with a vertical bar.'] },
    notes: { de: ['Flach drucken, 0,8 bis 1,6 mm Dicke genügen.', 'Auf die Fläche legen und mit Malerband fixieren, dann Farbe von der Seite auftupfen oder sprühen, nicht darunterlaufen lassen.', 'Je schmaler die Stege, desto sauberer das Bild, aber desto fragiler die Schablone. Ab 1,2 mm Breite wird sie stabil.'], en: ['Print flat; 0.8 to 1.6 mm thickness is enough.', 'Lay it on the surface and fix it with masking tape, then dab or spray paint from above without letting it run underneath.', 'The narrower the bridges, the cleaner the image, but the more fragile the stencil. From 1.2 mm wide it is sturdy.'] },
    faq: { de: [['Warum Stege?', 'Ohne Stege würden die Inneninseln (zum Beispiel der Kreis in einem O) herausfallen. Die Stege halten sie fest. So sind auch klassische Schablonenschriften aufgebaut.'], ['Welche Schrift ist am besten?', 'Fette, einfache Schriften ohne feine Linien. Schreibschrift ist für Schablonen schwierig, weil die Linien dünn sind.']], en: [['Why bridges?', 'Without bridges the inner islands (for example the circle in an O) would fall out. The bridges hold them. Classic stencil fonts are built the same way.'], ['Which font is best?', 'Bold, simple fonts without fine lines. Script fonts are hard for stencils because the lines are thin.']] }
  },
  groups: [
    { title: { de: 'Text', en: 'Text' }, items: [
      { k: 'text', t: 'txt', def: 'BOX 01', max: 40, label: { de: 'Text (Zeilen mit | trennen)', en: 'Text (separate lines with |)' } },
      { k: 'font', t: 'sel', def: 'Impact, Arial Black, TB Display, sans-serif', str: true, label: { de: 'Schrift', en: 'Font' }, opts: [['Impact, Arial Black, TB Display, sans-serif', { de: 'Schmal und fett', en: 'Condensed bold' }], ['TB Display, Inter, sans-serif', { de: 'Fett (Inter)', en: 'Bold (Inter)' }], ['Courier New, monospace', { de: 'Schreibmaschine', en: 'Typewriter' }], ['Georgia, Times New Roman, serif', { de: 'Serif', en: 'Serif' }]] },
      { k: 'th', t: 'num', min: 8, max: 80, step: 0.5, def: 25, unit: 'mm', label: { de: 'Höhe einer Zeile', en: 'Height of one line' } },
      { k: 'bridges', t: 'bool', def: true, label: { de: 'Stege für Inseln (O, A, B …)', en: 'Bridges for islands (O, A, B …)' } },
      { k: 'bw', t: 'num', min: 0.6, max: 4, step: 0.1, def: 1.4, unit: 'mm', label: { de: 'Stegbreite', en: 'Bridge width' }, show: function (p) { return p.bridges; } }
    ] },
    { title: { de: 'Platte', en: 'Plate' }, items: [
      { k: 'mg', t: 'num', min: 4, max: 30, step: 0.5, def: 8, unit: 'mm', label: { de: 'Rand um den Text', en: 'Margin around text' } },
      { k: 't', t: 'num', min: 0.6, max: 4, step: 0.2, def: 1.2, unit: 'mm', label: { de: 'Dicke der Platte', en: 'Plate thickness' } },
      { k: 'r', t: 'num', min: 0, max: 15, step: 0.5, def: 3, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } }
    ] }
  ],
  presets: [
    { label: { de: 'Kistenbeschriftung (BOX 01)', en: 'Crate marking (BOX 01)' }, v: { text: 'BOX 01', th: 25 } },
    { label: { de: 'Zahlen 0 bis 9', en: 'Numbers 0 to 9' }, v: { text: '0123456789', th: 18 } },
    { label: { de: 'Zwei Zeilen Name', en: 'Two-line name' }, v: { text: 'MAX|MUSTER', th: 22 } },
    { label: { de: 'Briefkasten (Hausnummer)', en: 'Mailbox (house number)' }, v: { text: '42', th: 40, mg: 10 } },
    { label: { de: 'Ohne Stege (Test)', en: 'Without bridges (test)' }, v: { text: 'OAB', bridges: false } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, lines = String(p.text || ' ').split('|').slice(0, 4).map(function (s) { return s.trim() || ' '; }), gap = p.th * 0.3, px = 6, i;
    var csl = lines.map(function (ln) { var r = H.rasterText(ln, p.font, p.th, px); if (p.bridges) r = H.stencilBridges(r, p.bw); var cs = H.maskToCS(r), b = cs.bounds(); return { cs: cs, b: b, w: b.max[0] - b.min[0], h: b.max[1] - b.min[1] }; });
    var tot = 0, maxW = 0, yy; csl.forEach(function (c) { tot += c.h; if (c.w > maxW) maxW = c.w; }); tot += gap * (csl.length - 1); yy = tot / 2;
    var holes = null; csl.forEach(function (c) { var t = c.cs.translate([-(c.b.min[0] + c.b.max[0]) / 2, yy - c.h - c.b.min[1]]); holes = holes ? holes.add(t) : t; yy -= c.h + gap; });
    var w = maxW + 2 * p.mg, h = tot + 2 * p.mg, r = Math.min(p.r, Math.min(w, h) / 2 - 0.5);
    var plate = H.rrect(w, h, r).subtract(holes);
    return [{ name: H.lang === 'en' ? 'Stencil' : 'Schablone', mesh: H.toMesh(H.ext(plate, 0, p.t)) }];
  }
});
