/* Türkeil: Keil mit Rippen gegen das Wegrutschen, optional Schlüsselloch. */
GenKit.define({
  id: 'doorwedge', file: 'tuerkeil',
  fname: function (p) { return 'tuerkeil_' + p.hmax; },
  meta: {
    cat: 'caravan', slug: { de: 'tuerkeil-generator', en: 'door-wedge-generator' },
    title: { de: 'Türkeil-Generator: Türstopper für Wohnwagen und Wohnmobil als STL (kostenlos)', en: 'Door Wedge Generator: door stopper for caravans and motorhomes as STL (free)' },
    h1: { de: 'Türkeil', en: 'Door wedge' },
    sub: { de: 'Keil, der Wohnwagen-, Wohnmobil- oder Haustür offen hält. Höhe, Länge und Rippen einstellen, STL laden.', en: 'A wedge that holds a caravan, motorhome or house door open. Set height, length and ribs, download STL.' },
    desc: { de: 'Kostenloser Türkeil-Generator für den 3D-Druck: Türstopper mit Rippen gegen das Wegrutschen, Aufhängeloch und einstellbarer Höhe für Wohnwagen und Wohnmobil. Export als STL und 3MF.', en: 'Free door wedge generator for 3D printing: door stopper with anti-slip ribs, hanging hole and adjustable height for caravans and motorhomes. Export as STL and 3MF.' },
    tag: { de: 'Wohnwagen', en: 'Caravan' },
    intro: { de: ['Stelle ein, wie hoch der Spalt unter der Tür maximal ist. Der Keil läuft von dort flach aus und klemmt die Tür fest.', 'Die Rippen auf der Unterseite greifen auf Teppich, Fliesen und Wohnwagenboden. Mit einem Streifen Gummi wird der Halt noch besser.'], en: ['Set the maximum height of the gap under the door. The wedge tapers flat from there and jams the door.', 'The ribs on the underside grip carpet, tile and caravan floor. A strip of rubber improves the hold further.'] },
    notes: { de: ['Auf der breiten Seite liegend drucken, ohne Stützen.', 'Mit TPU oder einem Gummistreifen auf der Unterseite rutscht der Keil nicht.', 'Nicht als Notausgang-Blockierung verwenden, Fluchtwege müssen frei bleiben.'], en: ['Print lying on the wide side, no supports.', 'With TPU or a rubber strip underneath the wedge does not slip.', 'Do not use to block an emergency exit, escape routes must stay free.'] },
    faq: { de: [['Welche Höhe brauche ich?', 'Miss den Spalt zwischen Türunterkante und Boden an der Stelle, wo der Keil sitzen soll. Der Keil darf etwas höher sein.'], ['Hält der Keil bei Wind?', 'Bei normaler Brise ja. Bei Sturm Tür besser schließen oder sichern.']], en: [['Which height do I need?', 'Measure the gap between door bottom and floor where the wedge will sit. The wedge may be a little taller.'], ['Does it hold in wind?', 'In a normal breeze yes. In a storm better close or secure the door.']] }
  },
  groups: [
    { title: { de: 'Form', en: 'Shape' }, items: [
      { k: 'hmax', t: 'num', min: 10, max: 60, step: 1, def: 28, unit: 'mm', label: { de: 'Höhe an der dicken Seite', en: 'Height at the thick end' } },
      { k: 'len', t: 'num', min: 50, max: 200, step: 1, def: 110, unit: 'mm', label: { de: 'Länge', en: 'Length' } },
      { k: 'w', t: 'num', min: 20, max: 80, step: 1, def: 40, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'tip', t: 'num', min: 0.8, max: 5, step: 0.2, def: 1.6, unit: 'mm', label: { de: 'Höhe an der Spitze', en: 'Height at the tip' } },
      { k: 'ribs', t: 'int', min: 0, max: 12, step: 1, def: 6, label: { de: 'Rippen unten', en: 'Ribs underneath' } },
      { k: 'hole', t: 'bool', def: true, label: { de: 'Aufhängeloch', en: 'Hanging hole' } }
    ] }
  ],
  presets: [
    { label: { de: 'Wohnwagentür', en: 'Caravan door' }, v: { hmax: 28, len: 110, w: 40, tip: 1.6, ribs: 6 } },
    { label: { de: 'Hohe Schwelle 45 mm', en: 'High sill 45 mm' }, v: { hmax: 45, len: 150, w: 50, tip: 2, ribs: 8 } },
    { label: { de: 'Klein für unterwegs', en: 'Small for travel' }, v: { hmax: 18, len: 80, w: 30, tip: 1.2, ribs: 4 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de', L = p.len, W = p.w, h = p.hmax, i;
    var prof = CS.ofPolygons([[[0, 0], [L, 0], [L, h], [0, p.tip]]]);
    var body = Mf.extrude(prof, W).rotate([90, 0, 0]).translate([0, W, 0]);
    for (i = 1; i <= p.ribs; i++) { var x = L * i / (p.ribs + 1); body = body.subtract(H.box(x - 1, -1, -1, x + 1, W + 1, 0.9)); }
    if (p.hole && h > 14) body = body.subtract(Mf.cylinder(W + 2, 3.2, 3.2, 24, false).rotate([90, 0, 0]).translate([L - 9, W + 1, h * 0.55]));
    return [{ name: de ? 'Türkeil' : 'Door wedge', mesh: H.toMesh(body) }];
  }
});
