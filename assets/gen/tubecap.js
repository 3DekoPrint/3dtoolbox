/* Rohrkappe mit Standfuß: Kappe über das Rohr oder Stopfen ins Rohr, rund oder quadratisch. */
GenKit.define({
  id: 'tubecap', file: 'rohrkappe',
  fname: function (p) { return 'rohrkappe_' + p.shape + '_' + p.d; },
  meta: {
    cat: 'camping', slug: { de: 'rohrkappe-generator', en: 'tube-cap-generator' },
    title: { de: 'Rohrkappe-Generator: Stuhlfüße und Zeltstangen-Kappen als STL (kostenlos)', en: 'Tube Cap Generator: chair feet and tent pole caps as STL (free)' },
    h1: { de: 'Rohrkappe & Standfuß', en: 'Tube cap & foot' },
    sub: { de: 'Kappen für runde und eckige Rohre: Stuhlbeine, Zeltstangen, Gestelle. Mit breitem Standfuß, damit nichts im Boden versinkt.', en: 'Caps for round and square tubes: chair legs, tent poles, frames. With a wide foot so nothing sinks into the ground.' },
    desc: { de: 'Kostenloser Rohrkappen-Generator für den 3D-Druck: Kappe über das Rohr oder Stopfen im Rohr, rund oder quadratisch, mit Standfuß für weichen Boden. Export als STL und 3MF.', en: 'Free tube cap generator for 3D printing: cap over the tube or plug inside, round or square, with a foot for soft ground. Export as STL and 3MF.' },
    tag: { de: 'Camping', en: 'Camping' },
    intro: { de: ['Miss den Außendurchmesser des Rohrs oder bei einem Stopfen den Innendurchmesser. Der Standfuß verteilt das Gewicht, praktisch für Campingstühle und Tische auf Gras und Sand.', 'Mit dem Entwässerungsloch läuft Wasser ab, wenn die Kappe über dem Rohrende sitzt.'], en: ['Measure the outside diameter of the tube, or the inside diameter for a plug. The foot spreads the weight, handy for camping chairs and tables on grass and sand.', 'The drain hole lets water out when the cap sits over the tube end.'] },
    notes: { de: ['Mit dem Fuß nach unten drucken, ohne Stützen.', 'TPU macht den Fuß rutschfest und dämpft. PETG ist für harte Böden besser.', 'Sitzt die Kappe zu stramm, erhöhe das Spiel um 0,1 mm.'], en: ['Print with the foot down, no supports.', 'TPU makes the foot grippy and cushioned. PETG is better for hard ground.', 'If the cap fits too tight raise the clearance by 0.1 mm.'] },
    faq: { de: [['Wie messe ich ein Rohr?', 'Mit dem Messschieber außen. Bei einem Stopfen die lichte Weite messen und 0,3 mm abziehen.'], ['Hält die Kappe von allein?', 'Ja, durch leichte Klemmung. Für Rutschfestigkeit hilft etwas Klebeband am Rohr.']], en: [['How do I measure a tube?', 'Outside with calipers. For a plug measure the inside width and subtract 0.3 mm.'], ['Does the cap stay on by itself?', 'Yes, with a light press fit. A bit of tape on the tube improves grip.']] }
  },
  groups: [
    { title: { de: 'Rohr', en: 'Tube' }, items: [
      { k: 'shape', t: 'sel', def: 'round', str: true, label: { de: 'Rohrform', en: 'Tube shape' }, opts: [['round', { de: 'Rund', en: 'Round' }], ['square', { de: 'Quadratisch', en: 'Square' }]] },
      { k: 'mode', t: 'sel', def: 'over', str: true, label: { de: 'Sitz', en: 'Fit' }, opts: [['over', { de: 'Kappe über das Rohr', en: 'Cap over the tube' }], ['plug', { de: 'Stopfen ins Rohr', en: 'Plug inside the tube' }]] },
      { k: 'd', t: 'num', min: 8, max: 60, step: 0.1, def: 22, unit: 'mm', label: { de: 'Maß (außen bei Kappe, innen bei Stopfen)', en: 'Size (outside for cap, inside for plug)' } },
      { k: 'depth', t: 'num', min: 8, max: 50, step: 1, def: 20, unit: 'mm', label: { de: 'Einstecktiefe', en: 'Insert depth' } },
      { k: 'cl', t: 'num', min: 0, max: 0.6, step: 0.05, def: 0.2, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } },
      { k: 'wall', t: 'num', min: 1.2, max: 5, step: 0.2, def: 2, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } }
    ] },
    { title: { de: 'Standfuß', en: 'Foot' }, items: [
      { k: 'foot', t: 'num', min: 0, max: 90, step: 1, def: 50, unit: 'mm', label: { de: 'Fußdurchmesser (0 = ohne)', en: 'Foot diameter (0 = none)' } },
      { k: 'ft', t: 'num', min: 2, max: 10, step: 0.5, def: 4, unit: 'mm', label: { de: 'Fußdicke', en: 'Foot thickness' } },
      { k: 'drain', t: 'bool', def: true, label: { de: 'Entwässerungsloch (nur Kappe)', en: 'Drain hole (cap only)' } }
    ] }
  ],
  presets: [
    { label: { de: 'Campingstuhl 22 mm rund', en: 'Camping chair 22 mm round' }, v: { shape: 'round', mode: 'over', d: 22, foot: 50, depth: 20 } },
    { label: { de: 'Zeltstange 8,5 mm Stopfen', en: 'Tent pole 8.5 mm plug' }, v: { shape: 'round', mode: 'plug', d: 8.5, foot: 0, depth: 14, wall: 1.6 } },
    { label: { de: 'Tischbein 25 mm quadratisch', en: 'Table leg 25 mm square' }, v: { shape: 'square', mode: 'over', d: 25, foot: 55, depth: 22 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, de = H.lang === 'de', d = p.d, w = p.wall, cl = p.cl, ft = p.foot > 0 ? p.ft : 0;
    function sec(dd, rr) { return p.shape === 'round' ? m.CrossSection.circle(dd / 2, 64) : H.rrect(dd, dd, rr == null ? 1.5 : rr); }
    var z0 = ft, body, foot = null;
    if (p.mode === 'over') {
      var inner = d + cl * 2, outer = inner + 2 * w;
      body = H.ext(sec(outer, 3), z0, z0 + w + p.depth).subtract(H.ext(sec(inner, 1.5), z0 + w, z0 + w + p.depth + 1));
      if (p.drain) body = body.subtract(Mf.cylinder(w + ft + 2, 1.2, 1.2, 16, false).translate([0, 0, -1]).add(Mf.cylinder(w + 1, 1.2, 1.2, 16, false).translate([0, 0, z0 - 1])));
    } else {
      var o = d - cl * 2, hole = o - 2 * w;
      body = H.ext(sec(o, 1.5), z0, z0 + p.depth).subtract(hole > 3 ? H.ext(sec(hole, 1), z0 + 1.2, z0 + p.depth + 1) : Mf.cube([0.01, 0.01, 0.01], false));
      var flange = o + 2 * w + 2;
      body = body.add(H.ext(sec(flange, 2), z0 - 0.01, z0 + 2));
    }
    if (ft > 0) { var fd = Math.max(p.foot, (p.mode === 'over' ? d + 2 * w + 2 * cl : d) + 6); body = body.add(H.ext(H.rrect(fd, fd, p.shape === 'round' ? fd / 2 : 6, 64), 0, ft)); }
    if (ft > 0 && p.mode === 'plug') body = body.subtract(H.ext(sec(d - cl * 2 - 2 * w, 1), -1, ft + 1.2));
    return [{ name: de ? 'Rohrkappe' : 'Tube cap', mesh: H.toMesh(body) }];
  }
});
