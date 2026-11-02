/* Lager zum Drucken in einem Stück (Print-in-Place): Kugellager oder Rollenlager mit Spalt, kein Zusammenbau. */
GenKit.define({
  id: 'printbearing', file: 'lager',
  fname: function (p) { return p.kind + '-lager'; },
  meta: {
    cat: 'workshop', slug: { de: 'gedrucktes-lager-generator', en: 'printed-bearing-generator' },
    title: { de: 'Gedrucktes Lager: Kugellager und Rollenlager Print-in-Place als STL (kostenlos)', en: 'Printed Bearing: print-in-place ball and roller bearings as STL (free)' },
    h1: { de: 'Gedrucktes Lager', en: 'Printed bearing' },
    sub: { de: 'Kugel- oder Rollenlager in einem Stück gedruckt, ohne Zusammenbau. Für leichte Lasten, Spielzeug und Prototypen.', en: 'Ball or roller bearings printed in one piece, no assembly. For light loads, toys and prototypes.' },
    desc: { de: 'Kostenloser Generator für gedruckte Lager: Kugellager und Rollenlager als Print-in-Place, mit einstellbarem Spalt, Bohrung, Außendurchmesser und Breite. Export als STL und 3MF.', en: 'Free generator for printed bearings: print-in-place ball and roller bearings with adjustable gap, bore, outside diameter and width. Export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Wähle Kugel- oder Rollenlager und gib Bohrung, Außendurchmesser und Breite an. Alle Teile werden zusammen gedruckt und drehen sich gleich nach dem Druck.', 'Das Rollenlager druckt sicherer, weil die Rollen stehen. Das Kugellager läuft glatter, braucht aber einen sauberen Druck.'], en: ['Choose a ball or roller bearing and enter bore, outside diameter and width. All parts print together and spin right after printing.', 'The roller type prints more reliably because the rollers stand upright. The ball type runs smoother but needs a clean print.']  },
    notes: { de: ['Aufrecht drucken, ohne Stützen, Spalt 0,3 bis 0,5 mm je nach Drucker.', 'Nach dem Druck das Lager von Hand drehen, bis es frei läuft. Ein Tropfen Öl hilft.', 'Das Lager ersetzt kein Stahllager. Für Drehzahl oder Last ist der Lagersitz mit gekauftem Lager besser.', 'Ein erster Test mit kleinem Spalt zeigt, ob dein Drucker den Spalt sauber trennt. Plane einen Probedruck ein.'], en: ['Print upright without supports, gap 0.3 to 0.5 mm depending on your printer.', 'After printing turn the bearing by hand until it runs free. A drop of oil helps.', 'It is no replacement for a steel bearing. For speed or load use the bearing seat with a bought bearing.', 'A first test with a small gap shows whether your printer separates the gap cleanly. Plan a test print.'] },
    faq: { de: [['Wie viel trägt das Lager?', 'Wenig. Es eignet sich für Handräder, Spielzeug und Modelle, nicht für Motoren.'], ['Welcher Spalt ist richtig?', 'Fang mit 0,4 mm an. Klebt es, nimm 0,5 mm. Läuft es zu locker, 0,3 mm.']], en: [['How much load does it carry?', 'Little. It suits hand wheels, toys and models, not motors.'], ['Which gap is right?', 'Start with 0.4 mm. If it sticks use 0.5 mm. If it is too loose use 0.3 mm.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Dimensions' }, items: [
      { k: 'kind', t: 'sel', def: 'roller', str: true, label: { de: 'Bauart', en: 'Type' }, opts: [['roller', { de: 'Rollenlager (stehende Rollen)', en: 'Roller bearing (upright rollers)' }], ['ball', { de: 'Kugellager', en: 'Ball bearing' }]] },
      { k: 'bore', t: 'num', min: 4, max: 60, step: 0.5, def: 8, unit: 'mm', label: { de: 'Bohrung', en: 'Bore' } },
      { k: 'od', t: 'num', min: 16, max: 120, step: 0.5, def: 30, unit: 'mm', label: { de: 'Außendurchmesser', en: 'Outside diameter' } },
      { k: 'w', t: 'num', min: 5, max: 30, step: 0.5, def: 9, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'n', t: 'int', min: 5, max: 24, step: 1, def: 7, label: { de: 'Anzahl Wälzkörper', en: 'Number of rolling elements' } },
      { k: 'gap', t: 'num', min: 0.2, max: 0.8, step: 0.05, def: 0.4, unit: 'mm', label: { de: 'Spalt', en: 'Gap' } }
    ] }
  ],
  presets: [
    { label: { de: 'Rollenlager für 8 mm Achse', en: 'Roller bearing for 8 mm axle' }, v: { kind: 'roller', bore: 8, od: 30, w: 9, n: 7, gap: 0.4 } },
    { label: { de: 'Kugellager, groß', en: 'Ball bearing, large' }, v: { kind: 'ball', bore: 12, od: 40, w: 12, n: 10, gap: 0.45 } },
    { label: { de: 'Kleines Rollenlager 5 mm', en: 'Small roller bearing 5 mm' }, v: { kind: 'roller', bore: 5, od: 22, w: 7, n: 6, gap: 0.35 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de';
    var d = p.bore, D = p.od, B = p.w, g = p.gap, ri = d / 2, ro = D / 2, n = p.n, i;
    function ring(r0, r1, h) { return Mf.cylinder(h, r1, r1, 96, false).subtract(Mf.cylinder(h + 2, r0, r0, 96, false).translate([0, 0, -1])); }
    var mid, rb, parts;
    if (p.kind === 'roller') {
      var t = Math.min(1.4, B / 5);
      var span = ro - ri - 2 * 1.6 - 2 * g; rb = span / 2; mid = ri + 1.6 + g + rb;
      if (rb < 1.2) throw new Error('zu klein');
      if (2 * mid * Math.sin(Math.PI / n) < 2 * rb + 0.6) throw new Error('zu viele Rollen');
      var inner = ring(ri, mid - rb - g, B).add(Mf.cylinder(t, mid - 0.0, mid - 0.0, 96, false)).add(Mf.cylinder(t, mid, mid, 96, false).translate([0, 0, B - t]));
      inner = inner.subtract(Mf.cylinder(B + 2, ri, ri, 64, false).translate([0, 0, -1]));
      var outer = ring(mid + rb + g, ro, B).add(ring(mid + 0.4, ro, t)).add(ring(mid + 0.4, ro, t).translate([0, 0, B - t]));
      var L = B - 2 * t - 2 * g, all = inner.add(outer);
      for (i = 0; i < n; i++) { var a = 2 * Math.PI * i / n; all = all.add(Mf.cylinder(L, rb, rb, 32, false).translate([mid * Math.cos(a), mid * Math.sin(a), t + g])); }
      parts = all;
    } else {
      var sp = ro - ri; rb = Math.min(sp * 0.22, B * 0.36); mid = (ri + ro) / 2;
      if (rb < 1.2) throw new Error('zu klein');
      if (ri + 1.5 > mid - rb - g) throw new Error('Wand zu dünn');
      if (2 * mid * Math.sin(Math.PI / n) < 2 * rb + 0.8) throw new Error('zu viele Kugeln');
      var rIn = mid - rb * 0.45, rOut = mid + rb * 0.45;
      var rg = rb + g, groove = CS.circle(rg, 32).translate([mid, B / 2]);
      var torus = Mf.revolve(groove, 96);
      var inner2 = ring(ri, rIn, B).subtract(torus), outer2 = ring(rOut, ro, B).subtract(torus);
      var all2 = inner2.add(outer2);
      for (i = 0; i < n; i++) { var a2 = 2 * Math.PI * i / n; all2 = all2.add(Mf.sphere(rb, 32).translate([mid * Math.cos(a2), mid * Math.sin(a2), B / 2])); }
      parts = all2;
    }
    return [{ name: de ? 'Lager (in einem Stück)' : 'Bearing (one piece)', mesh: H.toMesh(parts) }];
  }
});
