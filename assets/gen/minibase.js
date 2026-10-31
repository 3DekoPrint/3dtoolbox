/* Miniaturbasen für Tabletop: rund, quadratisch, sechseckig oder oval, mit Magnet- oder Münzfach. */
GenKit.define({
  id: 'minibase', file: 'miniaturbasis',
  fname: function (p) { return p.shape + p.size; },
  meta: {
    cat: 'tabletop', slug: { de: 'miniaturbasis-generator', en: 'miniature-base-generator' },
    title: { de: 'Miniaturbasis-Generator: Bases für Tabletop als STL/3MF (kostenlos)', en: 'Miniature Base Generator: tabletop bases as STL/3MF (free)' },
    h1: { de: 'Miniaturbasis', en: 'Miniature Base' },
    sub: { de: 'Bases für Warhammer, D&D und andere Tabletops: Form, Größe und Unterseite wählen, mehrere Stück auf einmal.', en: 'Bases for Warhammer, D&D and other tabletops: choose shape, size and underside, several pieces at once.' },
    desc: { de: 'Kostenloser Miniaturbasis-Generator: runde, quadratische, sechseckige und ovale Bases in 20 bis 100 mm, mit Magnetfach oder Münzfach und Abschrägung. Export als STL und 3MF.', en: 'Free miniature base generator: round, square, hex and oval bases from 20 to 100 mm, with magnet or coin pocket and bevel. Export as STL and 3MF.' },
    tag: { de: 'Tabletop', en: 'Tabletop' },
    intro: { de: ['Gib Form und Durchmesser ein, wähle eine Abschrägung am oberen Rand und optional ein Fach an der Unterseite für Magnete oder eine Münze als Gewicht. Bis zu 24 Bases landen in einer Datei.', 'Die Voreinstellungen enthalten die gängigen Größen von 25 bis 100 mm.'], en: ['Enter shape and diameter, pick a bevel on the top edge and optionally a pocket on the underside for magnets or a coin as weight. Up to 24 bases land in one file.', 'The presets contain the common sizes from 25 to 100 mm.'] },
    notes: { de: ['Mit der Unterseite nach unten drucken, das Fach ist von unten offen und braucht keine Stützen.', 'Magnet nach dem Druck von unten einkleben, auf die Polung achten.', 'Für schwere Figuren ein Münzfach nutzen und eine Münze einkleben.'], en: ['Print with the underside down; the pocket is open from below and needs no supports.', 'Glue the magnet in from below after printing and mind the polarity.', 'For heavy figures use a coin pocket and glue a coin in.'] },
    faq: { de: [['Welche Größen sind üblich?', '25 mm und 32 mm für normale Figuren, 40 mm für größere, 50 bis 100 mm für Monster. Ovale Bases sind meist 60 × 35 oder 75 × 42 mm.'], ['Welcher Magnet passt?', 'Standard sind 6 × 2 mm. Das Fach bekommt automatisch ein kleines Spiel.']], en: [['Which sizes are common?', '25 mm and 32 mm for normal figures, 40 mm for larger ones, 50 to 100 mm for monsters. Oval bases are usually 60 × 35 or 75 × 42 mm.'], ['Which magnet fits?', 'The standard is 6 × 2 mm. The pocket gets a small clearance automatically.']] }
  },
  groups: [
    { title: { de: 'Form', en: 'Shape' }, items: [
      { k: 'shape', t: 'sel', def: 'round', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['round', { de: 'Rund', en: 'Round' }], ['square', { de: 'Quadratisch', en: 'Square' }], ['hex', { de: 'Sechseckig', en: 'Hexagonal' }], ['oval', { de: 'Oval', en: 'Oval' }]] },
      { k: 'size', t: 'num', min: 15, max: 150, step: 0.5, def: 32, unit: 'mm', label: { de: 'Größe (Durchmesser / Breite)', en: 'Size (diameter / width)' } },
      { k: 'ratio', t: 'num', min: 40, max: 100, step: 1, def: 58, unit: '%', label: { de: 'Ovalverhältnis (Tiefe zu Breite)', en: 'Oval ratio (depth to width)' }, show: function (p) { return p.shape === 'oval'; } },
      { k: 'h', t: 'num', min: 2, max: 15, step: 0.5, def: 3, unit: 'mm', label: { de: 'Höhe', en: 'Height' } },
      { k: 'bev', t: 'num', min: 0, max: 4, step: 0.25, def: 1.2, unit: 'mm', label: { de: 'Abschrägung oben', en: 'Top bevel' } },
      { k: 'qty', t: 'int', min: 1, max: 24, step: 1, def: 5, label: { de: 'Stückzahl', en: 'Quantity' } }
    ] },
    { title: { de: 'Unterseite & Details', en: 'Underside & details' }, items: [
      { k: 'under', t: 'sel', def: 'magnet', str: true, label: { de: 'Fach an der Unterseite', en: 'Underside pocket' }, opts: [['none', { de: 'Keines', en: 'None' }], ['magnet', { de: 'Magnetfach', en: 'Magnet pocket' }], ['coin', { de: 'Münz- / Gewichtsfach', en: 'Coin / weight pocket' }]] },
      { k: 'pd', t: 'num', min: 3, max: 40, step: 0.1, def: 6, unit: 'mm', label: { de: 'Durchmesser des Fachs', en: 'Pocket diameter' }, show: function (p) { return p.under !== 'none'; } },
      { k: 'pdepth', t: 'num', min: 0.5, max: 8, step: 0.1, def: 2, unit: 'mm', label: { de: 'Tiefe des Fachs', en: 'Pocket depth' }, show: function (p) { return p.under !== 'none'; } },
      { k: 'groove', t: 'bool', def: false, label: { de: 'Zierrille am Rand', en: 'Decorative groove' } },
      { k: 'peg', t: 'bool', def: false, label: { de: 'Loch für Flugständer (3 mm)', en: 'Hole for flight stand (3 mm)' } }
    ] }
  ],
  presets: [
    { label: { de: '25 mm rund (Infanterie)', en: '25 mm round (infantry)' }, v: { shape: 'round', size: 25, h: 3, pd: 6, pdepth: 2 } },
    { label: { de: '32 mm rund (Standard)', en: '32 mm round (standard)' }, v: { shape: 'round', size: 32, h: 3, pd: 6, pdepth: 2 } },
    { label: { de: '40 mm rund (Fahrzeuge)', en: '40 mm round (vehicles)' }, v: { shape: 'round', size: 40, h: 3, pd: 8, pdepth: 2.5 } },
    { label: { de: '60 × 35 mm oval (Kavallerie)', en: '60 × 35 mm oval (cavalry)' }, v: { shape: 'oval', size: 60, ratio: 58, h: 3, qty: 3 } },
    { label: { de: '100 mm rund (Monster)', en: '100 mm round (monster)' }, v: { shape: 'round', size: 100, h: 4, pd: 25, pdepth: 3, under: 'coin', qty: 1 } },
    { label: { de: '25 mm quadratisch (Regimenter)', en: '25 mm square (regiments)' }, v: { shape: 'square', size: 25, h: 3, qty: 10 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, R = p.size / 2, k = p.ratio / 100;
    function sec(r) { if (r < 0.2) r = 0.2; if (p.shape === 'round') return CS.circle(r, 72); if (p.shape === 'square') return H.rrect(2 * r, 2 * r, Math.min(2, r * 0.3)); if (p.shape === 'hex') return CS.circle(r / Math.cos(Math.PI / 6), 6); return CS.circle(r, 72).scale([1, k]); }
    var bev = Math.min(p.bev, p.h - 0.6, R * 0.4), ch = Math.min(0.4, p.h * 0.3);
    function slab(cs, z) { return Mf.extrude(cs, 0.002).translate([0, 0, z]); }
    var body = Mf.hull([slab(sec(R - ch), 0), slab(sec(R), ch), slab(sec(R), p.h - bev - 0.002), slab(sec(R - bev), p.h - 0.002)]);
    var minDim = p.shape === 'oval' ? p.size * k : p.size;
    if (p.under !== 'none') { var d = Math.min(p.pd + 0.25, minDim - 4), dp = Math.min(p.pdepth, p.h - 1); body = body.subtract(H.cyl(0, 0, -1, dp, d, 48)); }
    if (p.groove && minDim > 14) { var g0 = Math.max(1, minDim / 2 - 2.2); body = body.subtract(H.ext(sec(g0 + 0.4).subtract(sec(g0 - 0.4)), p.h - 0.6, p.h + 1)); }
    if (p.peg) body = body.subtract(H.cyl(0, 0, p.h - 5, p.h + 1, 3.2, 24));
    var one = H.toMesh(body), out = [], i, n = Math.round(p.qty);
    for (i = 0; i < n; i++) out.push({ name: (H.lang === 'en' ? 'Base ' : 'Base ') + (i + 1), mesh: one });
    return out;
  }
});
