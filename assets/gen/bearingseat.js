/* Lagersitz für gekaufte Kugellager: Einsatz, Flansch oder Block mit Befestigungslöchern. */
GenKit.define({
  id: 'bearingseat', file: 'lagersitz',
  fname: function (p) { return 'lagersitz-' + p.type; },
  meta: {
    cat: 'workshop', slug: { de: 'lagersitz-generator', en: 'bearing-seat-generator' },
    title: { de: 'Lagersitz-Generator für Kugellager (608, 625, 6000 u. a.) als STL (kostenlos)', en: 'Bearing Seat Generator for ball bearings (608, 625, 6000 etc.) as STL (free)' },
    h1: { de: 'Lagersitz', en: 'Bearing seat' },
    sub: { de: 'Aufnahme für gekaufte Kugellager: wähle die Lagernummer, dann Einsatz, Flansch oder Block mit Schraublöchern.', en: 'A housing for bought ball bearings: choose the bearing number, then insert, flange or block with screw holes.' },
    desc: { de: 'Kostenloser Lagersitz-Generator für den 3D-Druck: Aufnahmen für Kugellager 608, 625, 623, 6000, 6200 und weitere mit Presspassung, Anschlag und Befestigungslöchern. Export als STL und 3MF.', en: 'Free bearing seat generator for 3D printing: housings for 608, 625, 623, 6000, 6200 and more ball bearings with press fit, stop and mounting holes. Export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Wähle die Lagernummer, die auf dem Lager steht. Die Maße (Innen, Außen, Breite) setzt der Generator selbst.', 'Das Lager wird in den Sitz gepresst. Ein Anschlag auf einer Seite hält es in Position, die Welle läuft durch die Öffnung.'], en: ['Pick the number printed on the bearing. The generator fills in bore, outside diameter and width itself.', 'The bearing is pressed into the seat. A stop on one side holds it in place and the shaft runs through the opening.'] },
    notes: { de: ['Mit der Öffnung nach oben drucken, ohne Stützen.', 'Sitzt das Lager zu locker, verringere das Spiel um 0,05 mm. Ist es zu stramm, erhöhe es.', 'Mehr Wände (mindestens 4) machen den Sitz belastbar.'], en: ['Print with the opening facing up, no supports.', 'If the bearing sits loose, reduce the clearance by 0.05 mm. If too tight, raise it.', 'More walls (at least 4) make the seat stronger.'] },
    faq: { de: [['Welche Lagernummer habe ich?', 'Sie steht auf dem Lager, zum Beispiel 608 oder 6001. Sonst Innen-, Außendurchmesser und Breite messen.'], ['Welches Spiel brauche ich?', 'Meist 0,1 mm für eine feste Presspassung. Je nach Drucker 0,05 bis 0,2 mm.']], en: [['Which bearing number do I have?', 'It is printed on the bearing, for example 608 or 6001. Otherwise measure bore, outside diameter and width.'], ['Which clearance do I need?', 'Usually 0.1 mm for a firm press fit. Depending on your printer 0.05 to 0.2 mm.']] }
  },
  groups: [
    { title: { de: 'Lager', en: 'Bearing' }, items: [
      { k: 'brg', t: 'sel', def: '608', str: true, label: { de: 'Lagernummer', en: 'Bearing number' }, opts: [['603', { de: '603 (3×9×5)', en: '603 (3×9×5)' }], ['623', { de: '623 (3×10×4)', en: '623 (3×10×4)' }], ['624', { de: '624 (4×13×5)', en: '624 (4×13×5)' }], ['625', { de: '625 (5×16×5)', en: '625 (5×16×5)' }], ['626', { de: '626 (6×19×6)', en: '626 (6×19×6)' }], ['607', { de: '607 (7×19×6)', en: '607 (7×19×6)' }], ['608', { de: '608 (8×22×7)', en: '608 (8×22×7)' }], ['688', { de: '688 (8×16×4)', en: '688 (8×16×4)' }], ['6000', { de: '6000 (10×26×8)', en: '6000 (10×26×8)' }], ['6001', { de: '6001 (12×28×8)', en: '6001 (12×28×8)' }], ['6002', { de: '6002 (15×32×9)', en: '6002 (15×32×9)' }], ['6200', { de: '6200 (10×30×9)', en: '6200 (10×30×9)' }], ['6201', { de: '6201 (12×32×10)', en: '6201 (12×32×10)' }], ['6202', { de: '6202 (15×35×11)', en: '6202 (15×35×11)' }], ['6204', { de: '6204 (20×47×14)', en: '6204 (20×47×14)' }], ['6205', { de: '6205 (25×52×15)', en: '6205 (25×52×15)' }]] },
      { k: 'cl', t: 'num', min: 0, max: 0.4, step: 0.05, def: 0.1, unit: 'mm', label: { de: 'Spiel (Presspassung)', en: 'Clearance (press fit)' } },
      { k: 'two', t: 'bool', def: false, label: { de: 'Zwei Lager im Abstand (stabilere Welle)', en: 'Two bearings spaced apart (stiffer shaft)' } },
      { k: 'sp', t: 'num', min: 5, max: 80, step: 1, def: 20, unit: 'mm', label: { de: 'Abstand der Lager', en: 'Spacing between bearings' }, show: function (p) { return p.two; } }
    ] },
    { title: { de: 'Gehäuse', en: 'Housing' }, items: [
      { k: 'type', t: 'sel', def: 'insert', str: true, label: { de: 'Bauform', en: 'Style' }, opts: [['insert', { de: 'Einsatz (zylindrisch)', en: 'Insert (cylindrical)' }], ['flange', { de: 'Flansch mit 4 Löchern', en: 'Flange with 4 holes' }], ['block', { de: 'Block mit 2 Löchern', en: 'Block with 2 holes' }]] },
      { k: 'wall', t: 'num', min: 1.6, max: 12, step: 0.2, def: 3, unit: 'mm', label: { de: 'Wandstärke um das Lager', en: 'Wall around the bearing' } },
      { k: 'stop', t: 'num', min: 1, max: 6, step: 0.2, def: 1.6, unit: 'mm', label: { de: 'Anschlag unten', en: 'Bottom stop' } },
      { k: 'hole', t: 'num', min: 2.5, max: 9, step: 0.1, def: 4.5, unit: 'mm', label: { de: 'Schraubenloch', en: 'Screw hole' }, show: function (p) { return p.type !== 'insert'; } }
    ] }
  ],
  presets: [
    { label: { de: '608 Skateboard-Lager, Einsatz', en: '608 skate bearing, insert' }, v: { brg: '608', type: 'insert', wall: 3, two: false } },
    { label: { de: '608, Flansch für Rollen', en: '608, flange for wheels' }, v: { brg: '608', type: 'flange', wall: 4, two: false } },
    { label: { de: '625 Block für Zahnriemen-Umlenkung', en: '625 block for belt idler' }, v: { brg: '625', type: 'block', wall: 3, two: false } },
    { label: { de: '6001 doppelt, Welle 12 mm', en: '6001 double, 12 mm shaft' }, v: { brg: '6001', type: 'block', wall: 5, two: true, sp: 20 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de';
    var T = { '603': [3, 9, 5], '623': [3, 10, 4], '624': [4, 13, 5], '625': [5, 16, 5], '626': [6, 19, 6], '607': [7, 19, 6], '608': [8, 22, 7], '688': [8, 16, 4], '6000': [10, 26, 8], '6001': [12, 28, 8], '6002': [15, 32, 9], '6200': [10, 30, 9], '6201': [12, 32, 10], '6202': [15, 35, 11], '6204': [20, 47, 14], '6205': [25, 52, 15] };
    var b = T[p.brg] || T['608'], d = b[0], D = b[1], B = b[2], R = D / 2 + p.cl, OR = R + p.wall;
    var n = p.two ? 2 : 1, pocketH = B, total = p.stop + (n === 2 ? 2 * B + p.sp : B);
    var body;
    if (p.type === 'insert') body = Mf.cylinder(total, OR, OR, 96, false);
    else if (p.type === 'flange') {
      var Rf = OR + p.hole / 2 + 4; body = Mf.cylinder(Math.min(total, 4), Rf, Rf, 96, false).add(Mf.cylinder(total, OR, OR, 96, false));
    } else {
      var half = OR + p.hole + 5; body = H.box(-half, -OR, 0, half, OR, Math.min(total, 5)).add(Mf.cylinder(total, OR, OR, 96, false));
    }
    var through = Mf.cylinder(total + 2, d / 2 + 0.8, d / 2 + 0.8, 48, false).translate([0, 0, -1]);
    body = body.subtract(through);
    if (d / 2 + 0.8 + 1 > R) throw new Error('Wand zu dünn');
    function pocket(z) { return Mf.cylinder(B + 1, R, R, 96, false).translate([0, 0, z]); }
    body = body.subtract(pocket(p.stop));
    if (n === 2) body = body.subtract(pocket(p.stop + B + p.sp));
    var hz = Math.min(total, p.type === 'flange' ? 4 : 5), i;
    if (p.type === 'flange') { var rr = OR + p.hole / 2 + 2; for (i = 0; i < 4; i++) { var a = Math.PI / 4 + i * Math.PI / 2; body = body.subtract(Mf.cylinder(hz + 2, p.hole / 2, p.hole / 2, 24, false).translate([rr * Math.cos(a), rr * Math.sin(a), -1])); } }
    if (p.type === 'block') { var xo = OR + p.hole / 2 + 2.5; [-1, 1].forEach(function (s) { body = body.subtract(Mf.cylinder(hz + 2, p.hole / 2, p.hole / 2, 24, false).translate([s * xo, 0, -1])); }); }
    return [{ name: de ? 'Lagersitz' : 'Bearing seat', mesh: H.toMesh(body) }];
  }
});
