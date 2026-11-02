/* Zahnrad: Gerad- oder Schrägverzahnung (Evolvente), optional Zahnradpaar, Nabe, Passfeder und Madenschraube. */
GenKit.define({
  id: 'gear', file: 'zahnrad',
  fname: function (p) { return 'm' + p.mod + 'z' + p.z; },
  meta: {
    cat: 'workshop', slug: { de: 'zahnrad-generator', en: 'gear-generator' },
    title: { de: 'Zahnrad-Generator: Stirnräder und Zahnradpaare als STL/3MF (kostenlos)', en: 'Gear Generator: spur and helical gears as STL/3MF (free)' },
    h1: { de: 'Zahnrad', en: 'Gear' },
    sub: { de: 'Stirnräder mit Evolventenverzahnung, auch Schrägverzahnung und passendes Gegenrad: Modul, Zähnezahl und Bohrung einstellen, STL oder 3MF laden.', en: 'Involute spur gears, helical teeth and a matching mate: set module, teeth and bore, download STL or 3MF.' },
    desc: { de: 'Kostenloser Zahnrad-Generator für den 3D-Druck: Stirnräder mit Evolventenverzahnung, Schrägverzahnung, Zahnradpaar mit Achsabstand, Nabe, Passfeder und Madenschraube. Export als STL und 3MF.', en: 'Free gear generator for 3D printing: involute spur gears, helical teeth, gear pairs with centre distance, hub, keyway and set screw. Export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Wähle Modul und Zähnezahl, dann die Breite und die Bohrung. Mit einem Gegenrad bekommst du zwei Zahnräder, die zusammenpassen, und den Achsabstand dazu.', 'Zwei Zahnräder greifen nur ineinander, wenn sie das gleiche Modul und den gleichen Eingriffswinkel haben. Bei Schrägverzahnung braucht das Gegenrad die entgegengesetzte Schräge, der Generator macht das automatisch.'], en: ['Choose module and number of teeth, then the width and the bore. With a mating gear you get two gears that fit together, plus the centre distance.', 'Two gears only mesh if they share the same module and pressure angle. Helical gears need opposite helix directions, which the generator handles for you.'] },
    notes: { de: ['Flach drucken, mit der Stirnseite auf dem Bett. Die Zähne brauchen dann keine Stützen.', 'Das Zahnspiel gleicht Druckungenauigkeit aus. Läuft das Paar zu stramm, erhöhe das Spiel um 0,05 mm.', 'Stell den Achsabstand genau so ein, wie unten angezeigt. Schon 0,3 mm weniger lassen das Paar klemmen.', 'Für Belastung eher PETG oder Nylon nehmen und mehr Wände, mindestens 4.'], en: ['Print flat with the face on the bed. The teeth need no supports.', 'Backlash compensates printing inaccuracy. If the pair runs tight, add 0.05 mm.', 'Set the centre distance exactly as shown below. Even 0.3 mm less makes the pair bind.', 'For load use PETG or nylon with more walls, at least 4.'] },
    faq: { de: [['Was ist das Modul?', 'Das Modul ist der Teilkreisdurchmesser geteilt durch die Zähnezahl, in Millimetern. Modul 1 bis 2 ist für den 3D-Druck üblich.'], ['Wie finde ich das Modul eines vorhandenen Zahnrads?', 'Außendurchmesser durch (Zähnezahl + 2) teilen. Bei 22 mm Außendurchmesser und 9 Zähnen ist das Modul 2.'], ['Wann nehme ich Schrägverzahnung?', 'Sie läuft leiser und trägt mehr, erzeugt aber eine Kraft in Achsrichtung. Für den Alltag reicht Geradverzahnung.']], en: [['What is the module?', 'The module is the pitch diameter divided by the number of teeth, in millimetres. Module 1 to 2 is common for 3D printing.'], ['How do I find the module of an existing gear?', 'Divide the outside diameter by (teeth + 2). A gear with 22 mm outside diameter and 9 teeth has module 2.'], ['When should I use helical teeth?', 'They run quieter and carry more load, but create an axial force. Spur teeth are fine for everyday use.']] }
  },
  groups: [
    { title: { de: 'Verzahnung', en: 'Teeth' }, items: [
      { k: 'mod', t: 'num', min: 0.5, max: 6, step: 0.25, def: 2, unit: 'mm', label: { de: 'Modul', en: 'Module' } },
      { k: 'z', t: 'int', min: 8, max: 120, step: 1, def: 20, label: { de: 'Zähnezahl', en: 'Number of teeth' } },
      { k: 'pa', t: 'sel', def: '20', str: true, label: { de: 'Eingriffswinkel', en: 'Pressure angle' }, opts: [['14.5', { de: '14,5°', en: '14.5°' }], ['20', { de: '20° (Standard)', en: '20° (standard)' }], ['25', { de: '25°', en: '25°' }]] },
      { k: 'w', t: 'num', min: 2, max: 50, step: 0.5, def: 8, unit: 'mm', label: { de: 'Breite', en: 'Face width' } },
      { k: 'helix', t: 'num', min: 0, max: 30, step: 1, def: 0, unit: '°', label: { de: 'Schrägungswinkel (0 = gerade)', en: 'Helix angle (0 = straight)' } },
      { k: 'bl', t: 'num', min: 0, max: 0.6, step: 0.05, def: 0.15, unit: 'mm', label: { de: 'Zahnspiel', en: 'Backlash' } }
    ] },
    { title: { de: 'Bohrung und Nabe', en: 'Bore and hub' }, items: [
      { k: 'bore', t: 'num', min: 2, max: 40, step: 0.1, def: 5, unit: 'mm', label: { de: 'Bohrung', en: 'Bore' } },
      { k: 'key', t: 'bool', def: false, label: { de: 'Passfedernut', en: 'Keyway' } },
      { k: 'hub', t: 'bool', def: false, label: { de: 'Nabe', en: 'Hub' } },
      { k: 'hubd', t: 'num', min: 6, max: 60, step: 0.5, def: 14, unit: 'mm', label: { de: 'Nabendurchmesser', en: 'Hub diameter' }, show: function (p) { return p.hub; } },
      { k: 'hubl', t: 'num', min: 2, max: 40, step: 0.5, def: 8, unit: 'mm', label: { de: 'Nabenlänge', en: 'Hub length' }, show: function (p) { return p.hub; } },
      { k: 'grub', t: 'bool', def: false, label: { de: 'Loch für Madenschraube (in der Nabe)', en: 'Set screw hole (in the hub)' }, show: function (p) { return p.hub; } }
    ] },
    { title: { de: 'Gegenrad', en: 'Mating gear' }, items: [
      { k: 'pair', t: 'bool', def: false, label: { de: 'Passendes Gegenrad dazu', en: 'Add a matching gear' } },
      { k: 'z2', t: 'int', min: 8, max: 150, step: 1, def: 40, label: { de: 'Zähnezahl Gegenrad', en: 'Teeth of mating gear' }, show: function (p) { return p.pair; } },
      { k: 'bore2', t: 'num', min: 2, max: 40, step: 0.1, def: 5, unit: 'mm', label: { de: 'Bohrung Gegenrad', en: 'Bore of mating gear' }, show: function (p) { return p.pair; } }
    ] }
  ],
  presets: [
    { label: { de: 'Motorritzel 20 Zähne, Modul 1', en: 'Motor pinion 20 teeth, module 1' }, v: { mod: 1, z: 20, w: 8, bore: 5, hub: true, grub: true, hubd: 12, hubl: 6, pair: false } },
    { label: { de: 'Paar 20:40, Modul 2', en: 'Pair 20:40, module 2' }, v: { mod: 2, z: 20, w: 10, bore: 6, pair: true, z2: 40, bore2: 8 } },
    { label: { de: 'Schrägverzahntes Paar 15°', en: 'Helical pair 15°' }, v: { mod: 1.5, z: 24, w: 12, helix: 15, bore: 6, pair: true, z2: 36, bore2: 6 } },
    { label: { de: 'Großes Zahnrad 60 Zähne', en: 'Large gear 60 teeth' }, v: { mod: 2, z: 60, w: 8, bore: 10, pair: false } },
    { label: { de: 'Kleines Getriebe Modul 0,8', en: 'Small gearbox module 0.8' }, v: { mod: 0.8, z: 16, w: 5, bore: 3, pair: true, z2: 32, bore2: 3 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de';
    var alpha = parseFloat(p.pa) * Math.PI / 180, beta = p.helix * Math.PI / 180;
    function inv(a) { return Math.tan(a) - a; }
    function keyDims(d) { var t = [[8, 2, 1.0], [10, 3, 1.4], [12, 4, 1.8], [17, 5, 2.3], [22, 6, 2.8], [30, 8, 3.3], [38, 10, 3.3], [44, 12, 3.3], [100, 14, 3.8]], i; for (i = 0; i < t.length; i++) if (d <= t[i][0]) return t[i]; return t[t.length - 1]; }
    function gearProfile(z) {
      var r = p.mod * z / 2, rb = r * Math.cos(alpha), ra = r + p.mod, rf = Math.max(0.5, r - 1.25 * p.mod);
      if (rf >= rb && z < 8) throw new Error('zu wenig Zähne');
      var thick = Math.PI / (2 * z) - p.bl / (2 * r);              // halber Zahnwinkel am Teilkreis
      function half(rr) { var ph = Math.acos(Math.min(1, rb / rr)); return thick + inv(alpha) - inv(ph); }
      var pts = [], i, k, N = 8;
      for (i = 0; i < z; i++) {
        var c = 2 * Math.PI * i / z, rs = Math.max(rb, rf), hb = half(rs), seq = [];
        if (rf < rb) seq.push([rf, -hb]);
        for (k = 0; k <= N; k++) { var rr = rs + (ra - rs) * k / N; seq.push([rr, -half(rr)]); }
        for (k = N; k >= 0; k--) { var r2 = rs + (ra - rs) * k / N; seq.push([r2, half(r2)]); }
        if (rf < rb) seq.push([rf, hb]);
        seq.forEach(function (q) { pts.push([q[0] * Math.cos(c + q[1]), q[0] * Math.sin(c + q[1])]); });
        // Fußkreis bis zum nächsten Zahn
        var nextC = 2 * Math.PI * (i + 1) / z, mid = (c + hb + nextC - hb) / 2, rrf = rf < rb ? rf : rs;
        pts.push([rrf * Math.cos(mid), rrf * Math.sin(mid)]);
      }
      return { cs: CS.ofPolygons([pts]), r: r, ra: ra, rf: rf };
    }
    function makeGear(z, bore, dir, withHub) {
      var g = gearProfile(z), tw = beta ? dir * (p.w * Math.tan(beta) / g.r) * 180 / Math.PI : 0, nd = Math.max(1, Math.ceil(Math.abs(tw) / 3));
      var body = beta ? Mf.extrude(g.cs, p.w, nd, tw) : Mf.extrude(g.cs, p.w);
      var hubTop = 0;
      if (withHub && p.hub) { var hd = Math.max(p.hubd, bore + 4); body = body.add(Mf.cylinder(p.hubl, hd / 2, hd / 2, 64, false).translate([0, 0, p.w - 0.01])); hubTop = p.hubl; }
      var total = p.w + hubTop, hole = Mf.cylinder(total + 2, bore / 2 + 0.1, bore / 2 + 0.1, 48, false).translate([0, 0, -1]);
      if (g.rf - bore / 2 < 1.2) throw new Error('Bohrung zu groß');
      body = body.subtract(hole);
      if (p.key && bore >= 6) { var kd = keyDims(bore); body = body.subtract(H.box(-kd[1] / 2, bore / 2 - 0.1, -1, kd[1] / 2, bore / 2 + kd[2] + 0.1, total + 1)); }
      if (withHub && p.hub && p.grub) { var gz = p.w + p.hubl / 2; body = body.subtract(Mf.cylinder(p.hubd, 1.4, 1.4, 24, false).rotate([0, 90, 0]).translate([0, 0, gz])); }
      return body;
    }
    var out = [makeGear(p.z, p.bore, 1, true)];
    out[0] = { name: de ? 'Zahnrad' : 'Gear', mesh: H.toMesh(out[0]) };
    if (p.pair) {
      var a = p.mod * (p.z + p.z2) / 2;
      out.push({ name: (de ? 'Gegenrad (Achsabstand ' : 'Mating gear (centre distance ') + a.toFixed(2) + ' mm)', mesh: H.toMesh(makeGear(p.z2, p.bore2, -1, true)) });
    }
    return out;
  }
});
