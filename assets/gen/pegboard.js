/* Lochwand-Halter: Haken oder Ablage mit zwei Stiften für Lochwände. Liegend gedruckt. */
GenKit.define({
  id: 'pegboard', file: 'lochwand-halter',
  fname: function (p) { return p.type + p.pitch; },
  meta: {
    cat: 'workshop', slug: { de: 'lochwand-halter-generator', en: 'pegboard-hook-generator' },
    title: { de: 'Lochwand-Halter-Generator: Haken & Ablagen als STL/3MF (kostenlos)', en: 'Pegboard Hook Generator: hooks & shelves as STL/3MF (free)' },
    h1: { de: 'Lochwand-Halter', en: 'Pegboard Hooks' },
    sub: { de: 'Haken und Ablagen für Lochwände: Lochabstand, Stiftmaße und Ausladung einstellen, STL oder 3MF laden.', en: 'Hooks and shelves for pegboards: set hole pitch, peg size and reach, download STL or 3MF.' },
    desc: { de: 'Kostenloser Lochwand-Generator: Haken und kleine Ablagen für jede Lochwand mit frei wählbarem Lochabstand und Stiftdurchmesser. Export als STL und 3MF.', en: 'Free pegboard generator: hooks and small shelves for any pegboard with adjustable hole pitch and peg diameter. Export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Miss den Abstand zweier Löcher und den Lochdurchmesser deiner Lochwand. Der Generator setzt zwei Stifte im richtigen Abstand an einen Haken oder eine Ablage.', 'Gedruckt wird der Halter auf der Seite, so verlaufen die Schichten entlang der Last.'], en: ['Measure the distance between two holes and the hole diameter of your pegboard. The generator places two pegs at the right spacing on a hook or shelf.', 'The holder prints on its side so the layers run along the load.'] },
    notes: { de: ['Auf der Seite liegend drucken, ohne Stützen. Stifte brauchen eine saubere erste Schicht.', 'PETG, 4 Wände, 40 % Füllung für Werkzeuge.', 'Passt der Stift zu stramm im Loch, verringere den Durchmesser um 0,1 mm.'], en: ['Print lying on its side, no supports. The pegs need a clean first layer.', 'PETG, 4 walls, 40 % infill for tools.', 'If the peg is too tight in the hole, reduce the diameter by 0.1 mm.'] },
    faq: { de: [['Welcher Lochabstand?', 'Viele Lochwände haben 25 mm oder 1 Zoll (25,4 mm), manche 38 mm. Miss von Mitte zu Mitte zweier Löcher.'], ['Sitzt der Halter fest?', 'Er klemmt im Loch. Für festen Sitz kann ein Tropfen Kleber oder ein Splint am Stift helfen.']], en: [['Which hole pitch?', 'Many pegboards use 25 mm or 1 inch (25.4 mm), some 38 mm. Measure centre to centre of two holes.'], ['Does it hold firmly?', 'It wedges in the hole. A drop of glue or a clip on the peg adds hold.']] }
  },
  groups: [
    { title: { de: 'Lochwand', en: 'Pegboard' }, items: [
      { k: 'pitch', t: 'num', min: 10, max: 60, step: 0.1, def: 25.4, unit: 'mm', label: { de: 'Lochabstand (Mitte zu Mitte)', en: 'Hole pitch (centre to centre)' } },
      { k: 'pd', t: 'num', min: 3, max: 12, step: 0.1, def: 5.8, unit: 'mm', label: { de: 'Stiftdurchmesser', en: 'Peg diameter' } },
      { k: 'pl', t: 'num', min: 6, max: 30, step: 1, def: 12, unit: 'mm', label: { de: 'Stiftlänge', en: 'Peg length' } }
    ] },
    { title: { de: 'Halter', en: 'Holder' }, items: [
      { k: 'type', t: 'sel', def: 'hook', str: true, label: { de: 'Typ', en: 'Type' }, opts: [['hook', { de: 'Haken', en: 'Hook' }], ['shelf', { de: 'Ablage', en: 'Shelf' }]] },
      { k: 'reach', t: 'num', min: 15, max: 100, step: 1, def: 35, unit: 'mm', label: { de: 'Ausladung', en: 'Reach' } },
      { k: 'lip', t: 'num', min: 5, max: 50, step: 1, def: 14, unit: 'mm', label: { de: 'Höhe der Spitze / des Randes', en: 'Tip / rim height' } },
      { k: 'w', t: 'num', min: 6, max: 50, step: 0.5, def: 12, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'th', t: 'num', min: 3, max: 15, step: 0.5, def: 5, unit: 'mm', label: { de: 'Materialstärke', en: 'Material thickness' } }
    ] }
  ],
  presets: [
    { label: { de: 'Standard 1 Zoll, Haken', en: 'Standard 1 inch, hook' }, v: { pitch: 25.4, pd: 5.8, type: 'hook' } },
    { label: { de: 'Lochwand 25 mm, Haken', en: 'Pegboard 25 mm, hook' }, v: { pitch: 25, pd: 5.6, type: 'hook' } },
    { label: { de: 'Ablage für Kleinteile (1 Zoll)', en: 'Small parts shelf (1 inch)' }, v: { pitch: 25.4, pd: 5.8, type: 'shelf', reach: 40, w: 30, lip: 12 } },
    { label: { de: 'Großer Werkzeughaken', en: 'Large tool hook' }, v: { pitch: 25.4, pd: 5.8, type: 'hook', reach: 60, lip: 22, w: 18, th: 7 } },
    { label: { de: 'Lochwand 38 mm, Haken', en: 'Pegboard 38 mm, hook' }, v: { pitch: 38.1, pd: 5.8, type: 'hook' } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, th = p.th, t = Math.max(th, 4), Hh = p.pitch + 2 * (p.pd / 2 + 4), y0 = Hh / 2 - p.pitch / 2, prof, yc = Hh / 2;
    prof = CS.square([t, Hh], false);
    if (p.type === 'hook') {
      var yb = yc - th / 2, x1 = t + p.reach, g = Math.min(p.reach * 0.6, th * 2);
      prof = prof.add(CS.square([p.reach + 0.01, th], false).translate([t - 0.01, yb])).add(CS.square([th, th + p.lip], false).translate([x1 - th, yb]));
      prof = prof.add(CS.ofPolygons([[[t - 0.01, yb - g], [t + g, yb + 0.01], [t - 0.01, yb + 0.01]]]));
    } else {
      var yb2 = 0, x2 = t + p.reach;
      prof = prof.add(CS.square([p.reach + 0.01, th], false).translate([t - 0.01, yb2])).add(CS.square([th, th + p.lip], false).translate([x2 - th, yb2]));
      prof = prof.add(CS.ofPolygons([[[t - 0.01, th], [t + Math.min(p.reach * 0.5, 20), th + 0.01], [t - 0.01, th + Math.min(p.reach * 0.5, 20)]]]));
    }
    var body = Mf.extrude(prof, p.w), r = p.pd / 2, k;
    [y0, y0 + p.pitch].forEach(function (y) {
      var peg = Mf.cylinder(p.pl - 1 + 0.02, r, r, 40, false).rotate([0, -90, 0]).translate([0.01, y, p.w / 2]);
      var tip = Mf.cylinder(1.0, r, Math.max(0.5, r - 0.9), 40, false).rotate([0, -90, 0]).translate([-(p.pl - 1) + 0.01, y, p.w / 2]);
      body = body.add(peg).add(tip);
    });
    return [{ name: p.type === 'hook' ? (H.lang === 'en' ? 'Hook' : 'Haken') : (H.lang === 'en' ? 'Shelf' : 'Ablage'), mesh: H.toMesh(body) }];
  }
});
