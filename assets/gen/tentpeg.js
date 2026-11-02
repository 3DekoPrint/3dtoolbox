/* Zeltharing: flache Platte oder V-Profil mit Spitze und Hakenkerbe. */
GenKit.define({
  id: 'tentpeg', file: 'zelthering',
  fname: function (p) { return 'hering_' + p.kind + '_' + p.len; },
  meta: {
    cat: 'camping', slug: { de: 'zelthering-generator', en: 'tent-peg-generator' },
    title: { de: 'Zelthering-Generator: Heringe für Zelt und Tarp als STL (kostenlos)', en: 'Tent Peg Generator: pegs for tents and tarps as STL (free)' },
    h1: { de: 'Zelthering', en: 'Tent peg' },
    sub: { de: 'Heringe für Zelt, Tarp und Hängematte: Länge, Breite und Profil einstellen, Hakenkerbe und Leinenloch dazu.', en: 'Pegs for tent, tarp and hammock: set length, width and profile, add a hook notch and a line hole.' },
    desc: { de: 'Kostenloser Zelthering-Generator für den 3D-Druck: Flach- und V-Profil, Spitze, Hakenkerbe und Leinenloch. Export als STL und 3MF.', en: 'Free tent peg generator for 3D printing: flat and V profile, tip, hook notch and line hole. Export as STL and 3MF.' },
    tag: { de: 'Camping', en: 'Camping' },
    intro: { de: ['Wähle das Profil und die Länge. Das V-Profil ist steifer und hält weicheren Boden besser, die flache Variante druckt schneller.', 'Die Kerbe nimmt die Leine oder den Zeltring auf, das Loch dient als zweite Möglichkeit zum Einhängen.'], en: ['Choose the profile and length. The V profile is stiffer and holds soft ground better, the flat one prints faster.', 'The notch takes the line or tent loop, the hole is a second place to hook in.'] },
    notes: { de: ['Liegend drucken. Das V-Profil liegt mit der Spitze nach unten, die Schenkel zeigen nach oben.', 'PETG oder ASA nehmen und 4 Wände, PLA wird in der Kälte spröde.', 'Für harten Boden sind gedruckte Heringe nicht geeignet. Eine Metallspitze oder ein Hammer aus Holz hilft bei weichem Boden.'], en: ['Print lying down. The V profile lies point down with the arms facing up.', 'Use PETG or ASA with 4 walls, PLA gets brittle in the cold.', 'Printed pegs are not suited to hard ground. A wooden mallet helps in soft ground.'] },
    faq: { de: [['Wie lang soll ein Hering sein?', '15 bis 20 cm für normalen Boden, 25 cm und mehr für Sand und Schnee.'], ['Hält er Sturm aus?', 'Nur eingeschränkt. Für Sturmabspannung nimm Metallheringe und nutze gedruckte nur für leichte Lasten.']], en: [['How long should a peg be?', '15 to 20 cm for normal ground, 25 cm or more for sand and snow.'], ['Does it hold in storms?', 'Only to a limited extent. For storm guying use metal pegs and keep printed ones for light loads.']] }
  },
  groups: [
    { title: { de: 'Form', en: 'Shape' }, items: [
      { k: 'kind', t: 'sel', def: 'v', str: true, label: { de: 'Profil', en: 'Profile' }, opts: [['v', { de: 'V-Profil (steif)', en: 'V profile (stiff)' }], ['flat', { de: 'Flach (schnell)', en: 'Flat (fast)' }]] },
      { k: 'len', t: 'num', min: 80, max: 300, step: 5, def: 180, unit: 'mm', label: { de: 'Länge', en: 'Length' } },
      { k: 'w', t: 'num', min: 10, max: 40, step: 1, def: 20, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'th', t: 'num', min: 2, max: 8, step: 0.5, def: 3.5, unit: 'mm', label: { de: 'Materialstärke', en: 'Material thickness' } },
      { k: 'tip', t: 'num', min: 15, max: 80, step: 1, def: 40, unit: 'mm', label: { de: 'Länge der Spitze', en: 'Tip length' } }
    ] },
    { title: { de: 'Kopf', en: 'Head' }, items: [
      { k: 'head', t: 'num', min: 0, max: 20, step: 1, def: 8, unit: 'mm', label: { de: 'Kopfverbreiterung (je Seite)', en: 'Head widening (each side)' } },
      { k: 'notch', t: 'bool', def: true, label: { de: 'Hakenkerbe', en: 'Hook notch' } },
      { k: 'hole', t: 'num', min: 0, max: 12, step: 0.5, def: 6, unit: 'mm', label: { de: 'Leinenloch (0 = ohne)', en: 'Line hole (0 = none)' } }
    ] }
  ],
  presets: [
    { label: { de: 'Standard V 18 cm', en: 'Standard V 18 cm' }, v: { kind: 'v', len: 180, w: 20, th: 3.5, tip: 40, head: 8 } },
    { label: { de: 'Lang für Sand 25 cm', en: 'Long for sand 25 cm' }, v: { kind: 'v', len: 250, w: 28, th: 4, tip: 50, head: 10 } },
    { label: { de: 'Leicht flach 15 cm', en: 'Light flat 15 cm' }, v: { kind: 'flat', len: 150, w: 18, th: 3, tip: 35, head: 6 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de';
    var L = p.len, w = p.w, hw = w / 2 + p.head, t = p.th, tip = Math.min(p.tip, L - 30), hl = 12;
    var pts = [[0, -hw], [hl, -hw], [hl + 4, -w / 2], [L - tip, -w / 2], [L, 0], [L - tip, w / 2], [hl + 4, w / 2], [hl, hw], [0, hw]];
    var sil = Mf.extrude(CS.ofPolygons([pts]), 60).translate([0, 0, -10]);
    var body;
    if (p.kind === 'flat') body = Mf.extrude(CS.ofPolygons([pts]), t);
    else {
      var a = w / 2 * Math.SQRT2;
      var armL = Mf.cube([L + 2, a + 2, t], false).translate([-1, 0, 0]).rotate([45, 0, 0]);
      var armR = Mf.cube([L + 2, a + 2, t], false).translate([-1, -(a + 2), 0]).rotate([-45, 0, 0]);
      body = armL.add(armR).intersect(sil);
      var bb = body.boundingBox(); body = body.translate([0, 0, -bb.min[2]]);
      body = body.add(Mf.extrude(CS.ofPolygons([pts]), t).intersect(Mf.cube([hl + 6, 3 * hw, t], false).translate([-1, -1.5 * hw, 0])));
    }
    if (p.notch) body = body.subtract(H.box(hl - 1, -w / 2 - 2, -5, hl + 5, -w / 2 + 6, 40).add(H.box(hl - 1, w / 2 - 6, -5, hl + 5, w / 2 + 2, 40)));
    if (p.hole > 0) body = body.subtract(Mf.cylinder(40, p.hole / 2, p.hole / 2, 24, false).translate([hl / 2 + 2, 0, -5]));
    return [{ name: de ? 'Hering' : 'Peg', mesh: H.toMesh(body) }];
  }
});
