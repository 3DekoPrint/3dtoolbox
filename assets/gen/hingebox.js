/* Scharnierbox: Box mit Deckel, Scharnier im Druck integriert (print-in-place), geschlossen gedruckt. */
GenKit.define({
  id: 'hingebox', file: 'scharnierbox',
  fname: function (p) { return p.w + 'x' + p.d + 'x' + (p.hb + p.hl); },
  meta: {
    cat: 'storage', slug: { de: 'scharnierbox-generator', en: 'hinge-box-generator' },
    title: { de: 'Scharnierbox-Generator: Box mit Klappdeckel (Print-in-Place) als STL/3MF', en: 'Hinge Box Generator: box with hinged lid (print-in-place) as STL/3MF' },
    h1: { de: 'Scharnierbox', en: 'Hinge Box' },
    sub: { de: 'Box mit Klappdeckel, in einem Stück gedruckt: das Scharnier bewegt sich ohne Montage.', en: 'A box with a hinged lid, printed in one piece: the hinge moves without assembly.' },
    desc: { de: 'Kostenloser Scharnierbox-Generator: Box mit Klappdeckel und eingedrucktem Scharnier in beliebiger Größe. Ohne Montage, Export als STL und 3MF.', en: 'Free hinge box generator: a box with a hinged lid and built-in hinge in any size. No assembly, export as STL and 3MF.' },
    tag: { de: 'Aufbewahren', en: 'Storage' },
    intro: { de: ['Box und Deckel werden geschlossen in einem Druck erzeugt. Das Scharnier besteht aus drei Gelenkstücken mit Stiften, zwischen allen Teilen liegt ein kleiner Spalt, sodass sich der Deckel nach dem Druck sofort öffnen lässt.', 'Das Spiel (Standard 0,35 mm) ist der wichtigste Wert: Wenn der Deckel nicht aufgeht, erhöhe ihn, wenn er wackelt, verringere ihn.'], en: ['Box and lid are generated closed in one print. The hinge consists of three knuckles with pins, with a small gap between all parts so the lid opens right after printing.', 'The clearance (default 0.35 mm) is the key value: if the lid will not open, raise it; if it wobbles, lower it.'] },
    notes: { de: ['Mit 0,2 mm Schichthöhe und 0,4-mm-Düse gut druckbar, ohne Stützen und ohne Brim an den Spalten.', 'Nach dem Druck den Deckel einmal kräftig öffnen, dann löst sich ein eventuell verklebtes Scharnier.', 'PETG neigt zum Verkleben im Scharnier. PLA ist hier zuverlässiger.'], en: ['Prints well at 0.2 mm layer height with a 0.4 mm nozzle, without supports and without a brim at the gaps.', 'After printing, open the lid firmly once to break any stuck hinge free.', 'PETG tends to fuse in the hinge. PLA is more reliable here.'] },
    faq: { de: [['Warum geht der Deckel nicht auf?', 'Der Spalt ist zu klein für deinen Drucker. Erhöhe das Spiel in 0,05-mm-Schritten und drucke ein kleines Testteil.'], ['Kann ich den Deckel abnehmen?', 'Nein, das Scharnier ist fest eingedruckt. Für abnehmbare Deckel nutze den Deckbox-Generator.']], en: [['Why does the lid not open?', 'The gap is too small for your printer. Raise the clearance in 0.05 mm steps and print a small test.'], ['Can I remove the lid?', 'No, the hinge is printed in. For removable lids use the deck box generator.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'w', t: 'num', min: 30, max: 200, step: 1, def: 80, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'd', t: 'num', min: 25, max: 200, step: 1, def: 55, unit: 'mm', label: { de: 'Tiefe', en: 'Depth' } },
      { k: 'hb', t: 'num', min: 10, max: 100, step: 1, def: 25, unit: 'mm', label: { de: 'Höhe Unterteil', en: 'Base height' } },
      { k: 'hl', t: 'num', min: 6, max: 60, step: 1, def: 12, unit: 'mm', label: { de: 'Höhe Deckel', en: 'Lid height' } },
      { k: 'wall', t: 'num', min: 1.2, max: 4, step: 0.2, def: 2, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } }
    ] },
    { title: { de: 'Scharnier', en: 'Hinge' }, items: [
      { k: 'cl', t: 'num', min: 0.2, max: 0.6, step: 0.05, def: 0.35, unit: 'mm', label: { de: 'Spiel / Spalt', en: 'Clearance / gap' } },
      { k: 'hr', t: 'num', min: 3, max: 8, step: 0.5, def: 4.5, unit: 'mm', label: { de: 'Scharnier-Radius', en: 'Hinge radius' } },
      { k: 'kw', t: 'num', min: 5, max: 25, step: 1, def: 10, unit: 'mm', label: { de: 'Breite der äußeren Gelenke', en: 'Width of outer knuckles' } },
      { k: 'r', t: 'num', min: 0, max: 12, step: 0.5, def: 3, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } }
    ] }
  ],
  presets: [
    { label: { de: 'Schmuckbox (80 × 55)', en: 'Jewellery box (80 × 55)' }, v: { w: 80, d: 55, hb: 25, hl: 12 } },
    { label: { de: 'Kleinteilebox (60 × 40)', en: 'Small parts box (60 × 40)' }, v: { w: 60, d: 40, hb: 20, hl: 10 } },
    { label: { de: 'Speicherkartenbox (50 × 40)', en: 'Memory card box (50 × 40)' }, v: { w: 50, d: 40, hb: 12, hl: 8, wall: 1.6 } },
    { label: { de: 'Große Box (140 × 100)', en: 'Large box (140 × 100)' }, v: { w: 140, d: 100, hb: 45, hl: 20, kw: 16 } },
    { label: { de: 'Stiftebox (180 × 40)', en: 'Pen box (180 × 40)' }, v: { w: 180, d: 40, hb: 30, hl: 15, kw: 14 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, W = p.w, D = p.d, g = p.cl, w = p.wall, hr = p.hr, Hb = p.hb, Hl = p.hl, kw = Math.min(p.kw, (W - 6 * g) / 3), r = Math.min(p.r, Math.min(W, D) / 2 - 0.6);
    var za = Hb + g / 2, ya = D + hr + g, pr = hr * 0.42, pc = 0.25, pl = kw - 2.2;
    function X(x0, x1, y0, y1, z0, z1) { return H.box(x0, y0, z0, x1, y1, z1); }
    function cylX(x0, x1, rad, yy, zz) { return Mf.cylinder(x1 - x0, rad, rad, 48, false).rotate([0, 90, 0]).translate([x0, yy, zz]); }
    var cx = W / 2, cy = D / 2;
    var base = H.ext(H.rrect(W, D, r), 0, Hb).translate([cx, cy, 0]).subtract(H.ext(H.rrect(W - 2 * w, D - 2 * w, Math.max(0.4, r - w)), w, Hb + 1).translate([cx, cy, 0]));
    var lid = H.ext(H.rrect(W, D, r), Hb + g, Hb + g + Hl).translate([cx, cy, 0]).subtract(H.ext(H.rrect(W - 2 * w, D - 2 * w, Math.max(0.4, r - w)), Hb + g, Hb + g + Hl - w).translate([cx, cy, 0]));
    /* Gelenke der Basis: außen links und rechts */
    [[0, kw], [W - kw, W]].forEach(function (rg, idx) {
      var k = cylX(rg[0], rg[1], hr, ya, za).add(X(rg[0], rg[1], D - 1, ya, za - hr, Hb)).add(X(rg[0], rg[1], D - 1, ya, za - hr, za));
      base = base.add(k);
      var hx0 = idx === 0 ? rg[1] - pl - 1.6 : rg[0], hx1 = idx === 0 ? rg[1] + 0.01 : rg[0] + pl + 1.6;
      base = base.subtract(cylX(hx0, hx1, pr + pc, ya, za));
    });
    /* Mittleres Gelenk des Deckels mit Zapfen */
    var mx0 = kw + g, mx1 = W - kw - g;
    lid = lid.add(cylX(mx0, mx1, hr, ya, za)).add(X(mx0, mx1, D - 1, ya, Hb + g, za + hr));
    var pin0 = Mf.cylinder(pl, pr, pr, 36, false).rotate([0, 90, 0]).translate([mx0 - pl, ya, za]);
    var tip0 = Mf.cylinder(0.9, pr, pr - 0.7, 36, false).rotate([0, -90, 0]).translate([mx0 - pl + 0.01, ya, za]);
    var pin1 = Mf.cylinder(pl, pr, pr, 36, false).rotate([0, 90, 0]).translate([mx1, ya, za]);
    var tip1 = Mf.cylinder(0.9, pr, pr - 0.7, 36, false).rotate([0, 90, 0]).translate([mx1 + pl - 0.01, ya, za]);
    lid = lid.add(pin0).add(pin1).add(tip0).add(tip1);
    var all = base.add(lid);
    return [{ name: H.lang === 'en' ? 'Box with hinge' : 'Box mit Scharnier', mesh: H.toMesh(all) }];
  }
});
