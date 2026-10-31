/* Kabelclip: Halterung für 1 bis 8 Kabel mit Schraublöchern oder Klebefläche. */
GenKit.define({
  id: 'cableclip', file: 'kabelclip',
  fname: function (p) { return p.n + 'x' + p.cd; },
  meta: {
    cat: 'home', slug: { de: 'kabelclip-generator', en: 'cable-clip-generator' },
    title: { de: 'Kabelclip-Generator: Kabelhalter nach Maß als STL/3MF (kostenlos)', en: 'Cable Clip Generator: custom cable holders as STL/3MF (free)' },
    h1: { de: 'Kabelclip-Generator', en: 'Cable Clip Generator' },
    sub: { de: 'Kabelhalter für ein bis acht Kabel: Kabeldurchmesser eingeben, Öffnung und Befestigung wählen, STL oder 3MF laden.', en: 'Cable holders for one to eight cables: enter the cable diameter, choose opening and mounting, download STL or 3MF.' },
    desc: { de: 'Kostenloser Kabelclip-Generator: Kabelhalter für Schreibtisch, Wand und Werkstatt in jeder Größe, mit Schraublöchern oder Klebefläche. Export als STL und 3MF.', en: 'Free cable clip generator: cable holders for desk, wall and workshop in any size, with screw holes or adhesive base. Export as STL and 3MF.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Der Clip hält Kabel an Schreibtisch, Wand oder Rückseite von Möbeln. Der Kabeldurchmesser bestimmt die Ringgröße, die Öffnung oben lässt sich mit einem Klick auf das Kabel schieben.', 'Wähle Senkschrauben-Laschen oder eine glatte Unterseite zum Aufkleben mit doppelseitigem Klebeband.'], en: ['The clip holds cables on a desk, wall or the back of furniture. The cable diameter sets the ring size and the opening on top lets you snap the cable in.', 'Choose countersunk screw tabs or a flat underside for double-sided tape.'] },
    notes: { de: ['Liegend drucken, die Ringe zeigen dabei nach oben, ganz ohne Stützen.', 'PETG oder TPU federn besser als PLA und brechen nicht so schnell.', 'Ist der Clip zu stramm, gib dem Kabel 0,2 mm mehr Durchmesser.'], en: ['Print flat with the rings pointing up, no supports needed.', 'PETG or TPU flex better than PLA and are less likely to snap.', 'If the clip is too tight, add 0.2 mm to the cable diameter.'] },
    faq: { de: [['Wie groß ist ein USB-Kabel?', 'Die meisten USB-Kabel haben 3 bis 4,5 mm, Netzkabel 6 bis 8 mm, HDMI etwa 6 mm.'], ['Hält der Clip fest?', 'Mit Schrauben sehr gut. Zum Kleben nimm gutes Montageband und reinige die Fläche vorher.']], en: [['How thick is a USB cable?', 'Most USB cables are 3 to 4.5 mm, power cables 6 to 8 mm, HDMI about 6 mm.'], ['Does it hold well?', 'Very well with screws. For tape, use good mounting tape and clean the surface first.']] }
  },
  groups: [
    { title: { de: 'Kabel', en: 'Cables' }, items: [
      { k: 'cd', t: 'num', min: 2, max: 30, step: 0.1, def: 5, unit: 'mm', label: { de: 'Kabeldurchmesser', en: 'Cable diameter' } },
      { k: 'n', t: 'int', min: 1, max: 8, step: 1, def: 3, label: { de: 'Anzahl Kabel', en: 'Number of cables' } },
      { k: 'op', t: 'num', min: 30, max: 95, step: 1, def: 70, unit: '%', label: { de: 'Öffnung (Anteil des Durchmessers)', en: 'Opening (share of diameter)' } }
    ] },
    { title: { de: 'Form & Befestigung', en: 'Shape & mounting' }, items: [
      { k: 'wall', t: 'num', min: 1.2, max: 4, step: 0.1, def: 2, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'w', t: 'num', min: 4, max: 40, step: 0.5, def: 10, unit: 'mm', label: { de: 'Breite (Tiefe des Clips)', en: 'Width (depth of the clip)' } },
      { k: 'tabs', t: 'bool', def: true, label: { de: 'Laschen mit Schraubloch', en: 'Tabs with screw hole' } },
      { k: 'sd', t: 'num', min: 2, max: 6, step: 0.1, def: 3.5, unit: 'mm', label: { de: 'Schraubenloch', en: 'Screw hole' }, show: function (p) { return p.tabs; } }
    ] }
  ],
  presets: [
    { label: { de: 'USB-Kabel (4 mm, 3 Stück)', en: 'USB cable (4 mm, 3 pcs)' }, v: { cd: 4, n: 3 } },
    { label: { de: 'Ladekabel (3,5 mm, 1 Stück)', en: 'Charging cable (3.5 mm, 1 pc)' }, v: { cd: 3.5, n: 1 } },
    { label: { de: 'HDMI (6 mm, 2 Stück)', en: 'HDMI (6 mm, 2 pcs)' }, v: { cd: 6, n: 2 } },
    { label: { de: 'Netzkabel (7,5 mm, 1 Stück)', en: 'Mains cable (7.5 mm, 1 pc)' }, v: { cd: 7.5, n: 1 } },
    { label: { de: 'Mehrfachhalter (5 mm, 6 Stück)', en: 'Multi holder (5 mm, 6 pcs)' }, v: { cd: 5, n: 6 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, ri = p.cd / 2 + 0.15, ro = ri + p.wall, b = Math.max(p.wall, 2.2), pitch = 2 * ro - p.wall * 0.5;
    var n = Math.round(p.n), cy = b + ri, tab = p.tabs ? Math.max(p.sd * 2.6, 9) : 0, x1 = (n - 1) * pitch + ro;
    var prof = CS.square([x1 + ro + 2 * tab, b], false).translate([-ro - tab, 0]), k, op = Math.max(1, p.cd * p.op / 100);
    for (k = 0; k < n; k++) prof = prof.add(CS.circle(ro, 56).translate([k * pitch, cy]));
    for (k = 0; k < n; k++) {
      prof = prof.subtract(CS.circle(ri, 56).translate([k * pitch, cy]));
      prof = prof.subtract(CS.square([op, ro + 2], false).translate([k * pitch - op / 2, cy]));
    }
    var body = Mf.extrude(prof, p.w).rotate([90, 0, 0]).translate([0, p.w, 0]);
    if (p.tabs) [-ro - tab / 2, x1 + tab / 2].forEach(function (x) {
      body = body.subtract(H.cyl(x, p.w / 2, -1, b + 1, p.sd, 32)).subtract(H.cone(x, p.w / 2, b - Math.min(1.8, b - 0.4), b + 0.01, p.sd, p.sd * 1.9, 32));
    });
    return [{ name: H.lang === 'en' ? 'Cable clip' : 'Kabelclip', mesh: H.toMesh(body) }];
  }
});
