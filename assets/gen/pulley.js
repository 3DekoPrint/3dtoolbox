/* Riemenscheibe: GT2/GT3/HTD5-Zahnriemen, Keilriemen, Rundriemen oder flach, mit Bordscheiben, Nabe und Madenschraube. */
GenKit.define({
  id: 'pulley', file: 'riemenscheibe',
  fname: function (p) { return p.belt + '-' + p.z; },
  meta: {
    cat: 'workshop', slug: { de: 'riemenscheiben-generator', en: 'pulley-generator' },
    title: { de: 'Riemenscheiben-Generator: Zahnriemen- und Keilriemenscheibe als STL (kostenlos)', en: 'Pulley Generator: timing and V-belt pulleys as STL (free)' },
    h1: { de: 'Riemenscheibe', en: 'Pulley' },
    sub: { de: 'Scheiben für GT2-, GT3- und HTD5-Zahnriemen sowie Keil-, Rund- und Flachriemen. Zähnezahl, Bohrung und Bordscheiben einstellen.', en: 'Pulleys for GT2, GT3 and HTD5 timing belts plus V, round and flat belts. Set teeth, bore and flanges.' },
    desc: { de: 'Kostenloser Riemenscheiben-Generator für den 3D-Druck: GT2, GT3, HTD5, Keilriemen, Rundriemen und Flachriemen mit Bordscheiben, Nabe und Madenschraube. Export als STL und 3MF.', en: 'Free pulley generator for 3D printing: GT2, GT3, HTD5, V, round and flat belts with flanges, hub and set screw. Export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Wähle die Riemenart und die Zähnezahl. Bei Zahnriemen berechnet der Generator den Außendurchmesser aus dem Zahnabstand.', 'Die Bohrung passt für Motorwellen oder Achsen. Mit Nabe und Madenschraube hält die Scheibe auf einer glatten Welle.'], en: ['Choose the belt type and tooth count. For timing belts the generator works out the outside diameter from the tooth pitch.', 'The bore fits motor shafts or axles. With hub and set screw the pulley grips a smooth shaft.'] },
    notes: { de: ['Aufrecht auf der Bordscheibe drucken. Die Zähne bleiben dadurch maßhaltig.', 'Bei GT2 den Düsenweg klein halten: Düse 0,4 mm und 0,12 bis 0,16 mm Schichthöhe.', 'Sitzt der Riemen zu stramm, nimm 0,1 mm mehr Zahntiefe-Spiel.'], en: ['Print upright on the flange. The teeth then keep their accuracy.', 'For GT2 use a 0.4 mm nozzle and 0.12 to 0.16 mm layers.', 'If the belt sits too tight, add 0.1 mm clearance.'] },
    faq: { de: [['Welcher Riemen passt auf 20 Zähne?', 'Für 6 mm breite GT2-Riemen eine Scheibe mit 6,5 bis 7 mm Zahnbreite und Bordscheiben.'], ['Wie groß wird der Achsabstand?', 'Teilkreisdurchmesser beider Scheiben addieren, durch zwei teilen, dann den Riemen dazu legen.']], en: [['Which belt fits 20 teeth?', 'For 6 mm GT2 belts use 6.5 to 7 mm tooth width and flanges.'], ['How do I find the centre distance?', 'Add both pitch diameters, halve it, then lay the belt around.']] }
  },
  groups: [
    { title: { de: 'Riemen', en: 'Belt' }, items: [
      { k: 'belt', t: 'sel', def: 'gt2', str: true, label: { de: 'Riemenart', en: 'Belt type' }, opts: [['gt2', { de: 'GT2 (2 mm)', en: 'GT2 (2 mm)' }], ['gt3', { de: 'GT3 (3 mm)', en: 'GT3 (3 mm)' }], ['htd5', { de: 'HTD 5M (5 mm)', en: 'HTD 5M (5 mm)' }], ['v', { de: 'Keilriemen', en: 'V-belt' }], ['round', { de: 'Rundriemen', en: 'Round belt' }], ['flat', { de: 'Flachriemen', en: 'Flat belt' }]] },
      { k: 'z', t: 'int', min: 10, max: 120, step: 1, def: 20, label: { de: 'Zähnezahl (bei Zahnriemen)', en: 'Teeth (timing belts)' }, show: function (p) { return /gt2|gt3|htd5/.test(p.belt); } },
      { k: 'od', t: 'num', min: 10, max: 150, step: 0.5, def: 40, unit: 'mm', label: { de: 'Scheibendurchmesser', en: 'Pulley diameter' }, show: function (p) { return !/gt2|gt3|htd5/.test(p.belt); } },
      { k: 'bw', t: 'num', min: 2, max: 30, step: 0.5, def: 7, unit: 'mm', label: { de: 'Riemenbreite / Zahnbreite', en: 'Belt width / tooth width' } },
      { k: 'fl', t: 'bool', def: true, label: { de: 'Bordscheiben beidseitig', en: 'Flanges on both sides' } },
      { k: 'cl', t: 'num', min: 0, max: 0.4, step: 0.05, def: 0.1, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } }
    ] },
    { title: { de: 'Bohrung & Nabe', en: 'Bore & hub' }, items: [
      { k: 'bore', t: 'num', min: 2, max: 30, step: 0.1, def: 5, unit: 'mm', label: { de: 'Bohrung', en: 'Bore' } },
      { k: 'dflat', t: 'bool', def: false, label: { de: 'Abflachung (D-Welle)', en: 'D-flat' } },
      { k: 'hubl', t: 'num', min: 0, max: 30, step: 0.5, def: 8, unit: 'mm', label: { de: 'Nabenlänge (0 = ohne)', en: 'Hub length (0 = none)' } },
      { k: 'grub', t: 'bool', def: true, label: { de: 'Loch für Madenschraube M3', en: 'M3 set screw hole' }, show: function (p) { return p.hubl > 0; } }
    ] }
  ],
  presets: [
    { label: { de: 'GT2 20 Zähne, 5 mm Welle', en: 'GT2 20 teeth, 5 mm shaft' }, v: { belt: 'gt2', z: 20, bw: 7, bore: 5, hubl: 8, fl: true } },
    { label: { de: 'GT2 60 Zähne (Umlenkung)', en: 'GT2 60 teeth (idler)' }, v: { belt: 'gt2', z: 60, bw: 7, bore: 8, hubl: 0, fl: true } },
    { label: { de: 'HTD5 24 Zähne', en: 'HTD5 24 teeth' }, v: { belt: 'htd5', z: 24, bw: 16, bore: 8, hubl: 10 } },
    { label: { de: 'Keilriemenscheibe 50 mm', en: 'V-belt pulley 50 mm' }, v: { belt: 'v', od: 50, bw: 12, bore: 8, hubl: 10 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de';
    var tm = { gt2: [2, 0.254, 0.75], gt3: [3, 0.381, 1.14], htd5: [5, 0.5715, 2.06] }[p.belt];
    var R, pts = [], k, bw = p.bw, fl = p.fl ? 1.2 : 0, flR;
    var zone = [], body;
    if (tm) {
      var pd = p.z * tm[0] / Math.PI; R = pd / 2 - tm[1]; var depth = tm[2] + p.cl, N = p.z * 12;
      for (k = 0; k < N; k++) {
        var a = 2 * Math.PI * k / N, ph = (k % 12) / 12, tooth = ph < 0.5 ? Math.sin(Math.PI * ph / 0.5) : 0, r = R - depth * Math.pow(tooth, 0.6) * 1;
        pts.push([r * Math.cos(a), r * Math.sin(a)]);
      }
      body = Mf.extrude(CS.ofPolygons([pts]), bw + 0.2);
      flR = R + tm[2] + 1.2;
    } else {
      R = p.od / 2; flR = R + 3;
      var prof = p.belt === 'v' ? [[0, 0], [R - 4, 0], [R, bw], [R - 4, bw * 2], [0, bw * 2]] : p.belt === 'round' ? [[0, 0], [R, 0], [R - 1.2, bw * 0.5], [R, bw], [0, bw]] : [[0, 0], [R, 0], [R, bw], [0, bw]];
      if (p.belt === 'v') { var W = bw * 2; body = Mf.revolve(CS.ofPolygons([[[0, 0], [R - 5, 0], [R, W * 0.5], [R - 5, W], [0, W]]]), 96); bw = W; }
      else body = Mf.revolve(CS.ofPolygons([prof]), 96);
    }
    var zs = fl; body = body.translate([0, 0, zs]);
    var total = bw + 2 * fl + 0.2;
    if (fl) { var f1 = Mf.cylinder(fl, flR, flR, 96, false), f2 = f1.translate([0, 0, zs + bw + 0.2]); body = body.add(f1).add(f2); }
    var hubD = Math.max(p.bore + 7, 12), hubTop = 0;
    if (p.hubl > 0) { body = body.add(Mf.cylinder(p.hubl, hubD / 2, hubD / 2, 64, false).translate([0, 0, total - 0.01])); hubTop = p.hubl; }
    var hl = total + hubTop, bore = Mf.cylinder(hl + 2, p.bore / 2 + 0.1, p.bore / 2 + 0.1, 48, false).translate([0, 0, -1]);
    if (R - p.bore / 2 < 2) throw new Error('Bohrung zu groß');
    body = body.subtract(bore);
    if (p.dflat) body = body.subtract(H.box(-p.bore, p.bore / 2 - 0.5, -1, p.bore, p.bore, hl + 1));
    if (p.hubl > 0 && p.grub) body = body.subtract(Mf.cylinder(hubD, 1.5, 1.5, 24, false).rotate([0, 90, 0]).translate([0, 0, total + p.hubl / 2]));
    return [{ name: de ? 'Riemenscheibe' : 'Pulley', mesh: H.toMesh(body) }];
  }
});
