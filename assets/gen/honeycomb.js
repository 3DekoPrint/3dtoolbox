/* Wabenwand: Sechseck-Fächer als Wandorganizer mit optionaler Rückwand und Schraublöchern. */
GenKit.define({
  id: 'honeycomb', file: 'wabenwand',
  fname: function (p) { return p.cols + 'x' + p.rows; },
  meta: {
    cat: 'storage', slug: { de: 'wabenwand-generator', en: 'honeycomb-wall-generator' },
    title: { de: 'Wabenwand-Generator: Honeycomb-Regal als STL/3MF (kostenlos)', en: 'Honeycomb Wall Generator: honeycomb shelf as STL/3MF (free)' },
    h1: { de: 'Wabenwand', en: 'Honeycomb Wall' },
    sub: { de: 'Wabenregal für Wand oder Schreibtisch: Anzahl, Zellgröße und Tiefe einstellen, mit Rückwand und Schraublöchern.', en: 'A honeycomb shelf for wall or desk: set number, cell size and depth, with back plate and screw holes.' },
    desc: { de: 'Kostenloser Wabenwand-Generator: Sechseck-Regale in jeder Größe mit Rückwand und Schraublöchern. Export als STL und 3MF, direkt im Browser.', en: 'Free honeycomb wall generator: hexagonal shelves of any size with back plate and screw holes. Export as STL and 3MF, right in your browser.' },
    tag: { de: 'Aufbewahren', en: 'Storage' },
    intro: { de: ['Waben sind ein beliebtes Muster für Wandregale und Schreibtischorganizer. Du stellst Spalten, Reihen, Zellgröße, Wandstärke und Tiefe ein.', 'Mit der Rückwand wird die Wabenwand stabil und lässt sich an der Wand verschrauben.'], en: ['Honeycombs are a popular pattern for wall shelves and desk organizers. Set columns, rows, cell size, wall thickness and depth.', 'The back plate makes the wall sturdy and lets you screw it to the wall.'] },
    notes: { de: ['Flach auf die Rückseite drucken, ohne Stützen.', 'Bei größeren Platten (über 200 mm) auf Verzug achten: Brim und gleichmäßige Temperatur helfen.', 'Zum Aufhängen die Schraublöcher benutzen und die Dübel für die Wand passend wählen.'], en: ['Print flat on the back, no supports.', 'With larger plates (over 200 mm) watch for warping: a brim and even temperature help.', 'Use the screw holes to hang it and choose anchors that suit your wall.'] },
    faq: { de: [['Wie groß wird die Wabenwand?', 'Das hängt von Spalten, Reihen und Zellgröße ab. Die Maße stehen oben in der Vorschau.'], ['Kann ich die Platte teilen?', 'Mach die Wand kleiner und drucke mehrere Teile, die du nebeneinander montierst.']], en: [['How big does it get?', 'It depends on columns, rows and cell size. The size is shown at the top of the preview.'], ['Can I split the plate?', 'Make the wall smaller and print several parts you mount side by side.']] }
  },
  groups: [
    { title: { de: 'Waben', en: 'Cells' }, items: [
      { k: 'cols', t: 'int', min: 1, max: 8, step: 1, def: 4, label: { de: 'Spalten', en: 'Columns' } },
      { k: 'rows', t: 'int', min: 1, max: 8, step: 1, def: 3, label: { de: 'Reihen', en: 'Rows' } },
      { k: 'af', t: 'num', min: 20, max: 90, step: 1, def: 50, unit: 'mm', label: { de: 'Zellgröße (Schlüsselweite innen + Wand)', en: 'Cell size (across flats incl. wall)' } },
      { k: 'wall', t: 'num', min: 1, max: 6, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'depth', t: 'num', min: 15, max: 120, step: 1, def: 60, unit: 'mm', label: { de: 'Tiefe', en: 'Depth' } }
    ] },
    { title: { de: 'Rückwand & Schrauben', en: 'Back & screws' }, items: [
      { k: 'back', t: 'num', min: 0, max: 5, step: 0.2, def: 2, unit: 'mm', label: { de: 'Rückwand (0 = offen)', en: 'Back plate (0 = open)' } },
      { k: 'holes', t: 'bool', def: true, label: { de: 'Schraublöcher in der Rückwand', en: 'Screw holes in the back plate' }, show: function (p) { return p.back > 0.5; } },
      { k: 'sd', t: 'num', min: 3, max: 7, step: 0.1, def: 4.5, unit: 'mm', label: { de: 'Schraubenloch', en: 'Screw hole' }, show: function (p) { return p.back > 0.5 && p.holes; } }
    ] }
  ],
  presets: [
    { label: { de: '4 × 3 Wandregal (50 mm)', en: '4 × 3 wall shelf (50 mm)' }, v: { cols: 4, rows: 3, af: 50, depth: 60 } },
    { label: { de: 'Schreibtisch klein (3 × 2)', en: 'Small desk (3 × 2)' }, v: { cols: 3, rows: 2, af: 40, depth: 50 } },
    { label: { de: 'Große Wand (6 × 4)', en: 'Large wall (6 × 4)' }, v: { cols: 6, rows: 4, af: 45, depth: 55 } },
    { label: { de: 'Kleinteile (6 × 3, 25 mm)', en: 'Small parts (6 × 3, 25 mm)' }, v: { cols: 6, rows: 3, af: 25, depth: 30, wall: 1.6 } },
    { label: { de: 'Einzelne Wabe', en: 'Single cell' }, v: { cols: 1, rows: 1, af: 60, depth: 60, holes: false } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, af = p.af, w = p.wall, R = af / Math.sqrt(3), Ri = (af - w) / Math.sqrt(3), cols = Math.round(p.cols), rows = Math.round(p.rows), out = [], inn = [], r, c, q;
    function hex(cx, cy, rr) { var o = [], k; for (k = 0; k < 6; k++) { var a = Math.PI / 6 + k * Math.PI / 3; o.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); } return o; }
    for (r = 0; r < rows; r++) for (c = 0; c < cols; c++) { var x = c * af + (r % 2 ? af / 2 : 0), y = r * 1.5 * R; out.push(hex(x, y, R)); inn.push(hex(x, y, Ri)); }
    var shape = CS.ofPolygons(out).subtract(CS.ofPolygons(inn));
    var body = H.ext(shape, 0, p.depth);
    if (p.back > 0.3) {
      var b = shape.bounds(), plate = CS.ofPolygons(out);
      body = H.ext(CS.ofPolygons(out), 0, p.back).add(H.ext(shape, p.back - 0.01, p.depth));
      if (p.holes) {
        var xs = [], ys = [], bb = plate.bounds(), cx = (bb.min[0] + bb.max[0]) / 2, cy = (bb.min[1] + bb.max[1]) / 2, inset = Math.max(8, p.sd * 2);
        [[bb.min[0] + af * 0.5, cy], [bb.max[0] - af * 0.5, cy]].forEach(function (pt) {
          body = body.subtract(H.cyl(pt[0], pt[1], -1, p.back + 1, p.sd, 28));
        });
      }
    }
    return [{ name: H.lang === 'en' ? 'Honeycomb wall' : 'Wabenwand', mesh: H.toMesh(body) }];
  }
});
