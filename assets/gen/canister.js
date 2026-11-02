/* Kartuschen-Stabilisator: Dreibein-Standfuß für Gaskartuschen (Campingkocher). */
GenKit.define({
  id: 'canister', file: 'kartuschenfuss',
  fname: function (p) { return 'kartuschenfuss_' + p.d; },
  meta: {
    cat: 'camping', slug: { de: 'kartuschenfuss-generator', en: 'canister-stand-generator' },
    title: { de: 'Kartuschenfuß-Generator: Stabilisator für Gaskartuschen als STL (kostenlos)', en: 'Canister Stand Generator: stabiliser for gas canisters as STL (free)' },
    h1: { de: 'Kartuschenfuß', en: 'Canister stand' },
    sub: { de: 'Standfuß für Gaskartuschen von Campingkochern: breiter Dreibein-Stand macht den Kocher kippsicher.', en: 'A base for camping-stove gas canisters: a wide tripod stance keeps the stove from tipping.' },
    desc: { de: 'Kostenloser Kartuschenfuß-Generator für den 3D-Druck: Dreibein-Stabilisator für Gaskartuschen mit einstellbarem Durchmesser, Beinlänge und Beinzahl. Export als STL und 3MF.', en: 'Free canister stand generator for 3D printing: tripod stabiliser for gas canisters with adjustable diameter, leg length and leg count. Export as STL and 3MF.' },
    tag: { de: 'Camping', en: 'Camping' },
    intro: { de: ['Stelle den Durchmesser deiner Kartusche ein (die gängige 230-g-Kartusche hat rund 108 mm). Der Ring hält den Boden der Kartusche, die Beine stehen breit.', 'So steht der Kocher stabil auf Gras, Sand oder unebenem Tisch. Wichtig: Der Fuß ersetzt keine Aufsicht, halte Abstand zu Zelt und brennbaren Dingen.'], en: ['Set the diameter of your canister (the common 230 g canister is about 108 mm). The ring holds the bottom of the canister while the legs stand wide.', 'That keeps the stove steady on grass, sand or an uneven table. Note: the stand does not replace supervision, keep distance from tents and flammables.'] },
    notes: { de: ['Flach drucken, keine Stützen.', 'Für Kochernähe PETG oder ASA nehmen, PLA kann sich bei Wärme verformen. Der Fuß sitzt unten und wird kaum heiß.', 'Nicht um die Kartusche herum festkleben, der Fuß soll sich abnehmen lassen.'], en: ['Print flat, no supports.', 'Near stoves use PETG or ASA, PLA can deform with heat. The base sits low and rarely gets hot.', 'Do not glue it around the canister, the base should come off.'] },
    faq: { de: [['Welche Kartuschengröße?', 'Die 230-g-Kartusche hat rund 108 mm Durchmesser, die 100-g-Kartusche etwa 90 mm. Miss deine nach.'], ['Ist das sicher?', 'Der Fuß stabilisiert nur. Verwende ihn bei Kochern, die zugelassen sind, und prüfe den Sitz vor jedem Einsatz.']], en: [['Which canister size?', 'The 230 g canister is about 108 mm in diameter, the 100 g about 90 mm. Measure yours.'], ['Is it safe?', 'The base only stabilises. Use it with approved stoves and check the fit before every use.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'd', t: 'num', min: 60, max: 130, step: 0.5, def: 108, unit: 'mm', label: { de: 'Kartuschendurchmesser', en: 'Canister diameter' } },
      { k: 'cl', t: 'num', min: 0, max: 1.5, step: 0.1, def: 0.5, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } },
      { k: 'ringh', t: 'num', min: 6, max: 30, step: 1, def: 14, unit: 'mm', label: { de: 'Höhe des Rings', en: 'Ring height' } },
      { k: 'legs', t: 'int', min: 3, max: 4, step: 1, def: 3, label: { de: 'Anzahl Beine', en: 'Number of legs' } },
      { k: 'leg', t: 'num', min: 20, max: 120, step: 1, def: 55, unit: 'mm', label: { de: 'Länge der Beine (über den Ring)', en: 'Leg length (beyond the ring)' } },
      { k: 'lw', t: 'num', min: 8, max: 30, step: 1, def: 20, unit: 'mm', label: { de: 'Breite der Beine', en: 'Leg width' } },
      { k: 'th', t: 'num', min: 3, max: 8, step: 0.5, def: 4, unit: 'mm', label: { de: 'Dicke der Beine', en: 'Leg thickness' } }
    ] }
  ],
  presets: [
    { label: { de: '230-g-Kartusche (108 mm)', en: '230 g canister (108 mm)' }, v: { d: 108, legs: 3, leg: 55, lw: 20, ringh: 14, th: 4 } },
    { label: { de: '100-g-Kartusche (90 mm)', en: '100 g canister (90 mm)' }, v: { d: 90, legs: 3, leg: 45, lw: 14, ringh: 12, th: 4 } },
    { label: { de: '450-g-Kartusche (111 mm), 4 Beine', en: '450 g canister (111 mm), 4 legs' }, v: { d: 111, legs: 4, leg: 65, lw: 18, ringh: 16, th: 5 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, de = H.lang === 'de', R = p.d / 2 + p.cl, ring = H.cyl(0, 0, 0, p.ringh, 2 * (R + 3), 96).subtract(H.cyl(0, 0, p.th, p.ringh + 1, 2 * R, 96)), i;
    ring = ring.subtract(H.cyl(0, 0, -1, p.th + 1, 2 * (R - 5), 96));
    var body = ring, ang = 360 / p.legs;
    for (i = 0; i < p.legs; i++) {
      var leg = H.ext(H.rrect(p.leg + R * 0.6, p.lw, Math.min(p.lw / 2, 8)), 0, p.th).translate([(p.leg + R * 0.6) / 2 + R * 0.5 + 0, 0, 0]).rotate([0, 0, i * ang]);
      body = body.add(leg);
    }
    body = body.subtract(H.cyl(0, 0, p.th, p.ringh + 1, 2 * R, 96)).subtract(H.cyl(0, 0, -1, p.th + 1, 2 * (R - 5), 96));
    return [{ name: de ? 'Kartuschenfuß' : 'Canister stand', mesh: H.toMesh(body) }];
  }
});
