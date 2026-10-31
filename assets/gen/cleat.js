/* French Cleat: Wandleiste und Gegenstück mit 45°-Schräge, Senkschraublöcher. */
GenKit.define({
  id: 'cleat', file: 'french-cleat',
  fname: function (p) { return p.len + 'x' + p.h; },
  meta: {
    cat: 'workshop', slug: { de: 'french-cleat-generator', en: 'french-cleat-generator' },
    title: { de: 'French-Cleat-Generator: Wandleisten für Werkstatt als STL/3MF (kostenlos)', en: 'French Cleat Generator: workshop wall cleats as STL/3MF (free)' },
    h1: { de: 'French Cleat', en: 'French Cleat' },
    sub: { de: 'Wandleiste und Gegenstück mit 45°-Schräge für Werkstattwände: Länge, Höhe und Schrauben einstellen.', en: 'Wall cleat and matching piece with a 45° bevel for workshop walls: set length, height and screws.' },
    desc: { de: 'Kostenloser French-Cleat-Generator: Wandleiste und Gegenstück mit 45°-Schräge, Senkschraublöchern und frei wählbarer Länge. Export als STL und 3MF.', en: 'Free French cleat generator: wall cleat and matching piece with 45° bevel, countersunk screw holes and adjustable length. Export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Ein French Cleat ist eine Aufhängung aus zwei Leisten mit 45°-Schräge: Die eine wird an die Wand geschraubt, die andere an den Gegenstand. Er hängt sich ein und hält erstaunlich viel.', 'Du bekommst beide Teile. Die Länge der Wandleiste und des Gegenstücks stellst du getrennt ein.'], en: ['A French cleat is a hanging system of two strips with a 45° bevel: one is screwed to the wall, the other to the object. It simply hooks in and holds a surprising amount.', 'You get both parts. Length of wall cleat and counterpart are set separately.'] },
    notes: { de: ['Flach auf die Rückseite legen und ohne Stützen drucken.', 'Schichten verlaufen hier in Längsrichtung, das macht die Leiste stabil. PETG oder PLA mit 4 Wänden und 30 % Füllung.', 'Schraube mit Senkkopf durch jedes Loch, Abstand der Löcher so wählen, dass sie in Wandstützen oder Dübel greifen.'], en: ['Print flat on the back without supports.', 'The layers run along the length, which makes the cleat strong. PETG or PLA with 4 walls and 30 % infill.', 'Use countersunk screws through each hole and choose the spacing so they hit studs or anchors.'] },
    faq: { de: [['Welche Höhe ist üblich?', 'Etwa 30 bis 50 mm bei 10 bis 12 mm Dicke. Höhere Leisten tragen mehr.'], ['Kann ich nur das Gegenstück drucken?', 'Ja, die Länge der Wandleiste kannst du klein halten und nur die benötigten Teile exportieren.']], en: [['Which height is common?', 'About 30 to 50 mm at 10 to 12 mm thickness. Taller strips carry more.'], ['Can I print only the counterpart?', 'Yes, you can keep the wall cleat short and export only the parts you need.']] }
  },
  groups: [
    { title: { de: 'Leiste', en: 'Strip' }, items: [
      { k: 'len', t: 'num', min: 40, max: 250, step: 1, def: 200, unit: 'mm', label: { de: 'Länge Wandleiste', en: 'Wall cleat length' } },
      { k: 'len2', t: 'num', min: 20, max: 250, step: 1, def: 80, unit: 'mm', label: { de: 'Länge Gegenstück', en: 'Counterpart length' } },
      { k: 'h', t: 'num', min: 20, max: 80, step: 1, def: 40, unit: 'mm', label: { de: 'Höhe der Leiste', en: 'Strip height' } },
      { k: 'T', t: 'num', min: 6, max: 20, step: 0.5, def: 12, unit: 'mm', label: { de: 'Dicke (gleich der Schräge)', en: 'Thickness (equals the bevel)' } }
    ] },
    { title: { de: 'Schrauben', en: 'Screws' }, items: [
      { k: 'n', t: 'int', min: 1, max: 6, step: 1, def: 3, label: { de: 'Löcher in der Wandleiste', en: 'Holes in the wall cleat' } },
      { k: 'n2', t: 'int', min: 1, max: 4, step: 1, def: 2, label: { de: 'Löcher im Gegenstück', en: 'Holes in the counterpart' } },
      { k: 'sd', t: 'num', min: 3, max: 7, step: 0.1, def: 4.5, unit: 'mm', label: { de: 'Schraubenloch', en: 'Screw hole' } }
    ] }
  ],
  presets: [
    { label: { de: 'Standard 200 mm + 80 mm', en: 'Standard 200 mm + 80 mm' }, v: { len: 200, len2: 80, h: 40, T: 12 } },
    { label: { de: 'Schwere Last (50 mm hoch)', en: 'Heavy load (50 mm tall)' }, v: { len: 250, len2: 120, h: 50, T: 14, n: 4, n2: 3 } },
    { label: { de: 'Leicht, klein', en: 'Light, small' }, v: { len: 100, len2: 50, h: 30, T: 9, n: 2, n2: 1 } },
    { label: { de: 'Nur Gegenstück 60 mm', en: 'Counterpart only 60 mm' }, v: { len: 40, len2: 60, h: 40, n: 1, n2: 2 } },
    { label: { de: 'Werkzeugwand lang', en: 'Long tool wall' }, v: { len: 250, len2: 100, h: 45, T: 12, n: 5, n2: 2 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, T = p.T, h = p.h;
    function ccw(pts) { var a = 0, i; for (i = 0; i < pts.length; i++) { var q = pts[(i + 1) % pts.length]; a += pts[i][0] * q[1] - q[0] * pts[i][1]; } return a < 0 ? pts.slice().reverse() : pts; }
    /* Profil (Höhe v, Tiefe u). Wandleiste: Schräge oben, fällt nach außen ab. */
    var wallP = [[0, 0], [h, 0], [h - T, T], [0, T]];            /* u=0 Wand, u=T außen; Oberkante schräg */
    var objP = wallP.map(function (q) { return [h - q[0], T - q[1]]; });  /* um 180° gedreht, gleiche Form */
    function strip(pts, len, n) {
      var sol = Mf.extrude(CS.ofPolygons([ccw(pts)]), len).rotate([90, 0, 90]);
      var i, sp = len / n;
      for (i = 0; i < n; i++) {
        var x = sp * (i + 0.5), z0 = -1;
        sol = sol.subtract(Mf.cylinder(T + 2, p.sd / 2, p.sd / 2, 28, false).translate([x, h * 0.5, z0]));
        var cs = Math.min(3.2, T * 0.45);
        sol = sol.subtract(Mf.cylinder(cs + 0.01, p.sd / 2, p.sd / 2 + cs, 28, false).translate([x, h * 0.5, T - cs]));
      }
      return sol;
    }
    var wall = strip(wallP, p.len, Math.round(p.n));
    var obj = strip(objP, p.len2, Math.round(p.n2));
    return [{ name: H.lang === 'en' ? 'Wall cleat' : 'Wandleiste', mesh: H.toMesh(wall) }, { name: H.lang === 'en' ? 'Counterpart' : 'Gegenstück', mesh: H.toMesh(obj) }];
  }
});
