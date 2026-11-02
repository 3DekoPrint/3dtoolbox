/* Sichtlagerkasten fürs Regal: offene Front, Griffmulde, Etikett-Vertiefung, optional Trennwände. */
GenKit.define({
  id: 'binbox', file: 'lagerkasten',
  fname: function (p) { return 'lagerkasten_' + p.w + 'x' + p.d + 'x' + p.h; },
  meta: {
    cat: 'storage', slug: { de: 'lagerkasten-generator', en: 'storage-bin-generator' },
    title: { de: 'Lagerkasten-Generator: Sichtlagerkasten fürs Regal als STL/3MF (kostenlos)', en: 'Storage Bin Generator: open-front shelf bins as STL/3MF (free)' },
    h1: { de: 'Lagerkasten', en: 'Storage bin' },
    sub: { de: 'Offener Kasten für Regale mit Griffmulde und Beschriftungsfläche, auf Wunsch mit Trennwänden. Passend zu Fachböden und Werkstatt-Regalen.', en: 'An open-front bin for shelves with a finger scoop and a label area, optional dividers. Made for shelves and workshop racks.' },
    desc: { de: 'Kostenloser Lagerkasten-Generator für den 3D-Druck: Sichtlagerkasten mit offener Front, Griffmulde, Etikettfläche und Trennwänden. Export als STL und 3MF.', en: 'Free storage bin generator for 3D printing: open-front bins with finger scoop, label area and dividers. Export as STL and 3MF.' },
    tag: { de: 'Aufbewahren', en: 'Storage' },
    intro: { de: ['Der Kasten hat eine niedrige Front, sodass du den Inhalt siehst und leicht greifst. Maße so wählen, dass er genau in dein Regalfach passt.', 'Auf der Front sitzt eine flache Vertiefung für ein Etikett. Mit den Trennwänden entstehen Fächer für Schrauben und Kleinteile.'], en: ['The bin has a low front so you can see and reach the contents. Choose dimensions so it fits your shelf compartment exactly.', 'The front has a shallow recess for a label. Dividers create compartments for screws and small parts.'] },
    notes: { de: ['Aufrecht drucken, ohne Stützen.', 'Ein halbes Millimeter weniger als die Fachbreite ergibt gutes Spiel im Regal.', 'Für Schrauben und Kleinteile reichen 2 Wände.'], en: ['Print upright, no supports.', 'Half a millimetre less than the shelf width gives a good fit.', 'For screws and small parts 2 walls are enough.'] },
    faq: { de: [['Wie groß soll die Front sein?', 'Etwa ein Drittel der Kastenhöhe lässt gut hineingreifen.'], ['Passt ein Etikett?', 'Ja, ein Papier- oder Klebeetikett passt in die Vertiefung. Maße stehen im Generator.']], en: [['How tall should the front be?', 'About one third of the bin height makes reaching in easy.'], ['Does a label fit?', 'Yes, a paper or sticky label fits the recess. Dimensions are in the generator.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'w', t: 'num', min: 40, max: 300, step: 1, def: 100, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'd', t: 'num', min: 50, max: 400, step: 1, def: 150, unit: 'mm', label: { de: 'Tiefe', en: 'Depth' } },
      { k: 'h', t: 'num', min: 30, max: 250, step: 1, def: 80, unit: 'mm', label: { de: 'Höhe hinten', en: 'Rear height' } },
      { k: 'hf', t: 'num', min: 15, max: 200, step: 1, def: 30, unit: 'mm', label: { de: 'Höhe der Front', en: 'Front height' } },
      { k: 'wall', t: 'num', min: 1.2, max: 4, step: 0.2, def: 2, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'r', t: 'num', min: 0, max: 20, step: 1, def: 5, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } }
    ] },
    { title: { de: 'Ausstattung', en: 'Features' }, items: [
      { k: 'div', t: 'int', min: 0, max: 5, step: 1, def: 0, label: { de: 'Trennwände', en: 'Dividers' } },
      { k: 'scoop', t: 'bool', def: true, label: { de: 'Griffmulde in der Front', en: 'Finger scoop in the front' } },
      { k: 'label', t: 'bool', def: true, label: { de: 'Etikett-Vertiefung', en: 'Label recess' } }
    ] }
  ],
  presets: [
    { label: { de: 'Schraubenkasten klein', en: 'Small screw bin' }, v: { w: 60, d: 100, h: 50, hf: 25, div: 0 } },
    { label: { de: 'Regalfach 100×150', en: 'Shelf slot 100×150' }, v: { w: 100, d: 150, h: 80, hf: 30, div: 0 } },
    { label: { de: 'Breiter Kasten mit 3 Fächern', en: 'Wide bin with 3 compartments' }, v: { w: 200, d: 150, h: 80, hf: 35, div: 2 } },
    { label: { de: 'Tiefer Werkstattkasten', en: 'Deep workshop bin' }, v: { w: 150, d: 250, h: 120, hf: 45, div: 1 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, de = H.lang === 'de', W = p.w, D = p.d, h = p.h, hf = Math.min(p.hf, h), t = p.wall, r = p.r;
    if (W < 2 * t + 20) throw new Error('zu schmal');
    var outer = H.ext(H.rrect(W, D, Math.max(0.4, r)), 0, h);
    var inner = H.ext(H.rrect(W - 2 * t, D - 2 * t, Math.max(0.4, r - t)), t, h + 1);
    var body = outer.subtract(inner);
    /* Oberkante fällt von hinten (Höhe h) nach vorn (Höhe hf) ab, auch die Seitenwände */
    var sl = (h - hf) / D, cs = m.CrossSection.ofPolygons([[[-D / 2 - 1, hf - sl], [D / 2 + 1, h + sl], [D / 2 + 1, h + 6], [-D / 2 - 1, h + 6]]]);
    body = body.subtract(Mf.extrude(cs, W + 2).rotate([90, 0, 90]).translate([-W / 2 - 1, 0, 0]));
    var i;
    for (i = 1; i <= p.div; i++) { var x = -W / 2 + W * i / (p.div + 1); body = body.add(H.box(x - t / 2, -D / 2 + t, t - 0.01, x + t / 2, D / 2 - t, Math.max(hf, h * 0.6))); }
    if (p.scoop && hf > 20) body = body.subtract(H.cyl(0, -D / 2 + 1, hf - 12, hf + 1, 26, 40).scale([1, 1, 1]).translate([0, -2, 0]));
    if (p.label && W > 40) { var lw = Math.min(W - 16, 60), lh = Math.min(hf - 8, 20); if (lh > 8) body = body.subtract(H.box(-lw / 2, -D / 2 - 0.1, 4, lw / 2, -D / 2 + 0.7, 4 + lh)); }
    return [{ name: de ? 'Lagerkasten' : 'Storage bin', mesh: H.toMesh(body) }];
  }
});
