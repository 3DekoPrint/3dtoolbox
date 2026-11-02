/* Fenster-Sperrstück: S-förmiges Keilstück, das in die Lücke zwischen Fensterhebel und Rahmen gesetzt wird. */
GenKit.define({
  id: 'windowwedge', file: 'fenster-sperrstueck',
  fname: function (p) { return 'fenster_sperrstueck_' + p.len + 'x' + p.wid; },
  meta: {
    cat: 'caravan', slug: { de: 'fenster-sperrstueck-generator', en: 'window-lock-wedge-generator' },
    title: { de: 'Fenster-Sperrstück: Sicherung für Wohnwagen- und Wohnmobilfenster als STL (kostenlos)', en: 'Window Lock Wedge: security piece for caravan and motorhome windows as STL (free)' },
    h1: { de: 'Fenster-Sperrstück', en: 'Window lock wedge' },
    sub: { de: 'Das S-förmige Stück, das du auf den Fensterhebel oder in die Führung setzt und das den Hebel am Öffnen hindert. Mit Presets für Dometic Seitz, Hobby und Polyplastic Polyfix.', en: 'The S-shaped piece you set over the window lever or into the guide so the lever cannot open. With presets for Dometic Seitz, Hobby and Polyplastic Polyfix.' },
    desc: { de: 'Kostenloser Generator für Fenstersicherungen im Wohnwagen und Wohnmobil: S-förmiges Sperrstück in einstellbaren Maßen, mit Presets für Dometic Seitz, Hobby U450 und Polyplastic Polyfix. Export als STL und 3MF.', en: 'Free generator for window locks in caravans and motorhomes: S-shaped wedge with adjustable sizes, with presets for Dometic Seitz, Hobby U450 and Polyplastic Polyfix. Export as STL and 3MF.' },
    tag: { de: 'Wohnwagen', en: 'Caravan' },
    intro: { de: ['Wähle ein Preset oder miss dein Fenster. Das Stück hat zwei Arme, die über eine S-Kurve verbunden sind: einen breiten Arm, der am Fensterrahmen anliegt, und einen schmalen, der hinter den Hebel greift.', 'Für Fenster, die auf der anderen Seite öffnen, gibt es die gespiegelte Version. Gedruckt wird flach, ohne Stützen.'], en: ['Pick a preset or measure your window. The piece has two arms joined by an S-curve: a wide arm that rests on the window frame and a narrow one that reaches behind the lever.', 'For windows that open on the other side there is a mirrored version. It prints flat without supports.'] },
    notes: { de: ['Die Sicherung hält das Fenster gegen unbeabsichtigtes Öffnen, sie ist kein Einbruchschutz.', 'Fluchtfenster dürfen nicht blockiert werden. Das Stück muss sich von innen schnell abnehmen lassen.', 'PETG oder ASA nehmen. PLA wird im heißen Fahrzeug weich.', 'Die Presets sind aus bekannten Sicherungen abgemessen. Prüfe immer mit einem Probedruck, ob es an deinem Fenster passt.', 'Mit 4 Wänden und 40 % Füllung drucken, die Schichten liegen quer zur Belastung.'], en: ['The lock protects the window from opening accidentally, it is not burglar protection.', 'Escape windows must not be blocked. The piece must come off quickly from the inside.', 'Use PETG or ASA. PLA softens in a hot vehicle.', 'Presets are measured from known locks. Always check with a test print that it fits your window.', 'Print with 4 walls and 40 % infill, the layers run across the load.'] },
    faq: { de: [['Welches Preset passt zu meinem Fenster?', 'Dometic Seitz C4 und ähnliche Fenster nehmen das erste Preset, Hobby-Wohnwagen wie der U450 das zweite, Polyplastic-Fenster mit Polyfix-Riegel das dritte. Bei Zweifeln drucke das kleine Probestück.'], ['Wie passe ich die Größe an?', 'Ändere Gesamtlänge, Breite und die Armbreiten. Die Kurven passen sich an. Mit „gespiegelt“ drehst du die Seite.']], en: [['Which preset fits my window?', 'Dometic Seitz C4 and similar windows use the first preset, Hobby caravans like the U450 the second, Polyplastic windows with a Polyfix catch the third. If unsure, print the small test piece.'], ['How do I adjust the size?', 'Change overall length, width and the arm widths. The curves adapt. Use “mirrored” to flip the side.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'len', t: 'num', min: 40, max: 160, step: 0.5, def: 98, unit: 'mm', label: { de: 'Gesamtlänge', en: 'Overall length' } },
      { k: 'wid', t: 'num', min: 25, max: 80, step: 0.5, def: 43.5, unit: 'mm', label: { de: 'Gesamtbreite', en: 'Overall width' } },
      { k: 'th', t: 'num', min: 5, max: 25, step: 0.5, def: 13, unit: 'mm', label: { de: 'Dicke', en: 'Thickness' } },
      { k: 'wa', t: 'num', min: 6, max: 40, step: 0.5, def: 20.5, unit: 'mm', label: { de: 'Breite Arm 1 (unten)', en: 'Width of arm 1 (bottom)' } },
      { k: 'wb', t: 'num', min: 6, max: 40, step: 0.5, def: 12, unit: 'mm', label: { de: 'Breite Arm 2 (oben)', en: 'Width of arm 2 (top)' } },
      { k: 'mirror', t: 'bool', def: false, label: { de: 'Gespiegelt (andere Fensterseite)', en: 'Mirrored (other window side)' } }
    ] },
    { title: { de: 'Kurven', en: 'Curves' }, items: [
      { k: 'type', t: 'sel', def: 'a', str: true, label: { de: 'Bauform', en: 'Style' }, opts: [['a', { de: 'Bogen links, S-Kurve rechts', en: 'Arc left, S-curve right' }], ['b', { de: 'Bogen rechts, S-Kurve links', en: 'Arc right, S-curve left' }]] },
      { k: 'lena', t: 'num', min: 5, max: 90, step: 0.5, def: 38.8, unit: 'mm', label: { de: 'Gerades Stück vor dem Bogen', en: 'Straight part before the arc' } },
      { k: 'be', t: 'num', min: 8, max: 70, step: 0.5, def: 28.8, unit: 'mm', label: { de: 'Bogen in Längsrichtung', en: 'Arc along the length' } },
      { k: 'ae', t: 'num', min: 6, max: 60, step: 0.5, def: 31.5, unit: 'mm', label: { de: 'Bogen in Querrichtung (nur Bauform links)', en: 'Arc across the width (arc-left style only)' } },
      { k: 's0', t: 'num', min: 0, max: 90, step: 0.5, def: 8.7, unit: 'mm', label: { de: 'S-Kurve beginnt bei', en: 'S-curve starts at' } },
      { k: 'sl', t: 'num', min: 10, max: 80, step: 0.5, def: 39.8, unit: 'mm', label: { de: 'Länge der S-Kurve', en: 'S-curve length' } },
      { k: 'cr', t: 'num', min: 0, max: 15, step: 0.5, def: 0, unit: 'mm', label: { de: 'Rundung der Ecke am Ende von Arm 2', en: 'Corner rounding at the end of arm 2' } }
    ] },
    { title: { de: 'Zubehör', en: 'Extras' }, items: [
      { k: 'cord', t: 'bool', def: true, label: { de: 'Loch für Schnur oder Ring am Ende', en: 'Hole for cord or ring at the end' } }
    ] }
  ],
  presets: [
    { label: { de: 'Dometic Seitz C4 / Caravan-Fenster', en: 'Dometic Seitz C4 / caravan window' }, v: { len: 98, wid: 43.5, th: 13, wa: 20.5, wb: 12, type: 'a', lena: 38.8, be: 28.8, ae: 31.5, s0: 8.7, sl: 39.8, cr: 0, mirror: false } },
    { label: { de: 'Hobby U450', en: 'Hobby U450' }, v: { len: 100, wid: 55, th: 13.5, wa: 20.5, wb: 12, type: 'a', lena: 40, be: 29.4, ae: 28.2, s0: 14.5, sl: 29.8, cr: 0, mirror: false } },
    { label: { de: 'Polyplastic Polyfix', en: 'Polyplastic Polyfix' }, v: { len: 130, wid: 43.5, th: 17, wa: 10.9, wb: 19.7, type: 'b', lena: 35.3, be: 44.5, ae: 32.6, s0: 61, sl: 52.8, cr: 6.5, mirror: false } },
    { label: { de: 'Polyplastic Polyfix gespiegelt', en: 'Polyplastic Polyfix mirrored' }, v: { len: 130, wid: 43.5, th: 17, wa: 10.9, wb: 19.7, type: 'b', lena: 35.3, be: 44.5, ae: 32.6, s0: 61, sl: 52.8, cr: 6.5, mirror: true } },
    { label: { de: 'Dometic Seitz kompakt (80 %)', en: 'Dometic Seitz compact (80 %)' }, v: { len: 78, wid: 35, th: 11, wa: 16.5, wb: 10, type: 'a', lena: 31, be: 23, ae: 25, s0: 7, sl: 32, cr: 0, mirror: false } }
  ],
  build: function (p, H) {
    var CS = H.M.CrossSection, de = H.lang === 'de', L = p.len, W = p.wid, wa = Math.min(p.wa, W - 6), wb = Math.min(p.wb, W - 6), typeB = p.type === 'b';
    var ae = Math.min(p.ae, W - 2), be = Math.min(p.be, L - 6), lena = Math.min(p.lena, L - be - 2);
    var lf = Math.max(0, W - (typeB ? wa : wb) - ae), N = 24, i, t, L1 = [], R1 = [];
    function arc(x0, y0, dir) {
      var pts = [[x0, y0]], cx = x0 + dir * lf, cy = y0 + be;
      if (lf > 0.01) pts.push([cx, y0]);
      for (i = 1; i <= N; i++) { t = i / N * Math.PI / 2; pts.push([cx + dir * ae * Math.sin(t), cy - be * Math.cos(t)]); }
      return pts;
    }
    function arc2(x0, y0) {
      var pts = [[x0, y0]], aeB = W - x0, cx = W, cy = y0;
      for (i = 1; i <= N; i++) { t = i / N * Math.PI / 2; pts.push([cx - aeB * Math.pow(Math.cos(t), 1.2), cy + be * Math.pow(Math.sin(t), 1.2)]); }
      return pts;
    }
    function sc(x0, x1, ys, yl) {
      var pts = [[x0, 0], [x0, ys]], h1 = (typeB ? 0.3 : 0.2) * yl, h2 = (typeB ? 0.5 : 0.55) * yl;
      for (i = 1; i < N; i++) { t = i / N; var u = 1 - t, sx = 3 * t * t - 2 * t * t * t, sy = 3 * u * u * t * h1 + 3 * u * t * t * (yl - h2) + t * t * t * yl; pts.push([x0 + (x1 - x0) * sx, ys + sy]); }
      pts.push([x1, ys + yl]);
      return pts;
    }
    var s0 = Math.min(p.s0, L - 12), sl = Math.min(p.sl, L - s0 - 2);
    if (!typeB) { L1 = [[0, 0]].concat(arc(0, lena, 1).map(function (q) { return q; })); L1[1] = [0, lena]; R1 = sc(wa, W, s0, sl); }
    else { L1 = sc(0, W - wb, s0, sl); R1 = [[wa, 0]].concat(arc2(wa, lena)); R1[1] = [wa, lena]; }
    var lx = L1[L1.length - 1][0], rx = R1[R1.length - 1][0];
    var left = (typeB ? L1 : [[0, 0]].concat(L1.slice(1))), poly = [];
    poly = poly.concat(left.slice(typeB ? 1 : 0));
    var cr = Math.min(p.cr, wb - 2, 15);
    if (cr > 0.2) { for (i = 0; i <= 8; i++) { t = i / 8 * Math.PI / 2; poly.push([lx + cr - cr * Math.cos(t), L - cr + cr * Math.sin(t)]); } } else poly.push([lx, L]);
    poly.push([rx, L]);
    for (i = R1.length - 1; i >= 0; i--) poly.push(R1[i]);
    if (typeB) poly.unshift([0, 0]); else poly.push([wa, 0]);
    var seen = [];
    poly = poly.filter(function (q, k) { var pr = poly[(k + poly.length - 1) % poly.length]; return Math.abs(q[0] - pr[0]) + Math.abs(q[1] - pr[1]) > 0.005; });
    if (p.mirror) poly = poly.map(function (q) { return [W - q[0], q[1]]; });
    var ar = 0; for (i = 0; i < poly.length; i++) { var q0 = poly[i], q1 = poly[(i + 1) % poly.length]; ar += q0[0] * q1[1] - q1[0] * q0[1]; }
    if (ar < 0) poly.reverse();
    var body = H.ext(CS.ofPolygons([poly]), 0, p.th);
    if (p.cord) { var cxh = p.mirror ? wb / 2 : W - wb / 2; body = body.subtract(H.cyl(cxh, L - Math.min(8, wb * 0.5 + 2), -1, p.th + 1, Math.min(4.5, wb - 4), 24)); }
    return [{ name: de ? 'Sperrstück' : 'Lock wedge', mesh: H.toMesh(body) }];
  }
});
