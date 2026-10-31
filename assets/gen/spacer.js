/* Abstandshalter: Hülsen rund, sechskant oder quadratisch mit Bohrung, Fase und Stückzahl. */
GenKit.define({
  id: 'spacer', file: 'abstandshalter',
  fname: function (p) { return p.shape + p.od + 'x' + p.bore + 'x' + p.h; },
  meta: {
    cat: 'workshop', slug: { de: 'abstandshalter-generator', en: 'spacer-generator' },
    title: { de: 'Abstandshalter-Generator: Hülsen & Distanzstücke als STL/3MF (kostenlos)', en: 'Spacer Generator: standoffs & spacers as STL/3MF (free)' },
    h1: { de: 'Abstandshalter-Generator', en: 'Spacer Generator' },
    sub: { de: 'Distanzhülsen rund, sechskant oder quadratisch: Außenmaß, Bohrung und Höhe eingeben, Stückzahl wählen, STL oder 3MF laden.', en: 'Round, hex or square spacers: enter outer size, bore and height, pick a quantity, download STL or 3MF.' },
    desc: { de: 'Kostenloser Abstandshalter-Generator: Distanzhülsen mit Bohrung, Fase und Stückzahl nach Maß. Export als STL und 3MF, direkt im Browser.', en: 'Free spacer generator: custom spacers and standoffs with bore, chamfer and quantity. Export as STL and 3MF, right in your browser.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Abstandshalter braucht man überall: zwischen Platinen und Gehäuse, unter Motoren oder an Möbeln. Hier stellst du Form, Durchmesser, Bohrung und Höhe ein und bekommst mehrere identische Hülsen in einer Datei.', 'Die Bohrung bekommt automatisch ein kleines Spiel, damit die Schraube hindurchpasst.'], en: ['Spacers are needed everywhere: between boards and enclosures, under motors or on furniture. Set shape, diameter, bore and height and get several identical spacers in one file.', 'The bore gets a small clearance automatically so the screw slides through.'] },
    notes: { de: ['Hülsen stehend drucken, 4 Wände und mindestens 30 % Füllung halten Schraubenkräfte gut aus.', 'Kurze, dicke Hülsen drucken in PLA problemlos, bei Wärme besser PETG.', 'Passt die Schraube zu stramm, erhöhe das Bohrungsspiel um 0,05 mm.'], en: ['Print spacers standing up. 4 walls and at least 30 % infill handle screw loads well.', 'Short, thick spacers print fine in PLA; use PETG near heat.', 'If the screw is too tight, raise the bore clearance by 0.05 mm.'] },
    faq: { de: [['Welche Bohrung für M3?', 'Für M3 nimm 3,2 mm, für M4 4,3 mm, für M5 5,3 mm. Das Spiel kommt zusätzlich dazu und gleicht Druckungenauigkeit aus.'], ['Kann ich mehrere gleichzeitig drucken?', 'Ja, bis zu 24 Stück. Sie liegen nebeneinander auf dem Druckbett.']], en: [['Which bore for M3?', 'Use 3.2 mm for M3, 4.3 mm for M4 and 5.3 mm for M5. The clearance is added on top to offset print inaccuracy.'], ['Can I print several at once?', 'Yes, up to 24 pieces. They sit side by side on the bed.']] }
  },
  groups: [
    { title: { de: 'Form & Maße', en: 'Shape & size' }, items: [
      { k: 'shape', t: 'sel', def: 'round', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['round', { de: 'Rund', en: 'Round' }], ['hex', { de: 'Sechskant', en: 'Hex' }], ['square', { de: 'Quadratisch', en: 'Square' }]] },
      { k: 'od', t: 'num', min: 3, max: 60, step: 0.5, def: 8, unit: 'mm', label: { de: 'Außenmaß (Durchmesser / Schlüsselweite)', en: 'Outer size (diameter / across flats)' } },
      { k: 'bore', t: 'num', min: 0, max: 50, step: 0.1, def: 3.2, unit: 'mm', label: { de: 'Bohrung', en: 'Bore' } },
      { k: 'h', t: 'num', min: 1, max: 100, step: 0.5, def: 10, unit: 'mm', label: { de: 'Höhe', en: 'Height' } }
    ] },
    { title: { de: 'Details', en: 'Details' }, items: [
      { k: 'ch', t: 'num', min: 0, max: 3, step: 0.1, def: 0.4, unit: 'mm', label: { de: 'Fase an den Kanten', en: 'Edge chamfer' } },
      { k: 'cl', t: 'num', min: 0, max: 0.6, step: 0.05, def: 0.15, unit: 'mm', label: { de: 'Spiel in der Bohrung', en: 'Bore clearance' } },
      { k: 'qty', t: 'int', min: 1, max: 24, step: 1, def: 4, label: { de: 'Stückzahl', en: 'Quantity' } }
    ] }
  ],
  presets: [
    { label: { de: 'M3 Platinen-Abstand (6 × 3,2 × 8)', en: 'M3 PCB standoff (6 × 3.2 × 8)' }, v: { shape: 'round', od: 6, bore: 3.2, h: 8 } },
    { label: { de: 'M4 Hülse (9 × 4,3 × 12)', en: 'M4 spacer (9 × 4.3 × 12)' }, v: { shape: 'round', od: 9, bore: 4.3, h: 12 } },
    { label: { de: 'M5 Hülse (10 × 5,3 × 15)', en: 'M5 spacer (10 × 5.3 × 15)' }, v: { shape: 'round', od: 10, bore: 5.3, h: 15 } },
    { label: { de: 'Sechskant-Distanz M3 (5,5 SW)', en: 'Hex standoff M3 (5.5 AF)' }, v: { shape: 'hex', od: 5.5, bore: 3.2, h: 12 } },
    { label: { de: 'Möbelfuß (30 × 8 × 20)', en: 'Furniture foot (30 × 8 × 20)' }, v: { shape: 'round', od: 30, bore: 8.2, h: 20 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, R = p.od / 2, ch = Math.min(p.ch, R * 0.5, p.h * 0.45);
    function sec(r) { if (p.shape === 'round') return CS.circle(r, 64); if (p.shape === 'hex') return CS.circle(r / Math.cos(Math.PI / 6), 6); return CS.square([2 * r, 2 * r], true); }
    var body = ch > 0.01 ? H.loft(sec(R - ch), 0, sec(R), ch).add(H.ext(sec(R), ch, p.h - ch)).add(H.loft(sec(R), p.h - ch, sec(R - ch), p.h)) : H.ext(sec(R), 0, p.h);
    if (p.bore > 0.05) { var br = Math.min(p.bore / 2 + p.cl, R - 0.4); body = body.subtract(H.cyl(0, 0, -1, p.h + 1, 2 * br, 40)); }
    var parts = [], n = Math.round(p.qty), k, one = H.toMesh(body);
    for (k = 0; k < n; k++) parts.push({ name: (H.lang === 'en' ? 'Spacer ' : 'Hülse ') + (k + 1), mesh: one });
    return parts;
  }
});
