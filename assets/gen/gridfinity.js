/* Gridfinity-Generator: Behälter (Bin) und Grundplatte im offenen 42-mm-Raster. */
GenKit.define({
  id: 'gridfinity', file: 'gridfinity',
  fname: function (p) { return p.kind === 'plate' ? p.nx + 'x' + p.ny + '-grundplatte' : p.nx + 'x' + p.ny + 'x' + p.u; },
  meta: {
    cat: 'storage', slug: { de: 'gridfinity-generator', en: 'gridfinity-generator' },
    title: { de: 'Gridfinity-Generator: Bins & Grundplatten als STL/3MF (kostenlos)', en: 'Gridfinity Generator: Bins & Baseplates as STL/3MF (free)' },
    h1: { de: 'Gridfinity-Generator', en: 'Gridfinity Generator' },
    sub: { de: 'Behälter und Grundplatten im 42-mm-Raster mit Stapelrand, Magneten, Schaufel und Beschriftungsleiste. Maße eintippen, Vorschau drehen, STL oder 3MF laden.', en: 'Bins and baseplates on the 42 mm grid with stacking lip, magnets, scoop and label ledge. Type the size, rotate the preview, download STL or 3MF.' },
    desc: { de: 'Kostenloser Gridfinity-Generator im Browser: Bins in beliebiger Größe und Grundplatten erzeugen, mit Fächern, Stapelrand, Magnettaschen, Schaufel und Beschriftungsleiste. Export als STL und 3MF.', en: 'Free Gridfinity generator in your browser: create bins of any size and baseplates with compartments, stacking lip, magnet pockets, scoop and label ledge. Export as STL and 3MF.' },
    tag: { de: 'Aufbewahren', en: 'Storage' },
    intro: { de: ['Gridfinity ist ein offenes Ordnungssystem: Alle Behälter sitzen auf einem 42-mm-Raster und lassen sich beliebig auf Grundplatten stecken und stapeln. Hier stellst du die Größe in Rastereinheiten ein, wählst die Details, und das Teil entsteht direkt in deinem Browser.', 'Dateien und Eingaben bleiben auf deinem Gerät. Es gibt keine Anmeldung.'],
      en: ['Gridfinity is an open organising system: every bin sits on a 42 mm grid and can be placed on baseplates and stacked. Set the size in grid units, choose the details and the part is built right in your browser.', 'Files and inputs stay on your device. No sign-up.'] },
    notes: { de: ['Ohne Stützen drucken, Boden unten (der Fuß liegt auf dem Druckbett).', '2 Wände, 15 % Füllung reichen für fast alle Bins. Für schwere Teile 3 Wände.', 'Magnete (6 × 2 mm) sind optional und werden in die Taschen am Fuß gedrückt. Pausiere den Druck nicht, die Taschen sind von unten offen.', 'Der Fuß hat 0,15 mm Spiel. Sitzt ein Bin zu fest, drucke ihn mit etwas weniger Elefantenfuß oder schleife den Fuß leicht.', 'Baseplates möglichst nebeneinander kacheln statt eine riesige Platte zu drucken.'],
      en: ['Print without supports with the base down (the foot sits on the bed).', '2 walls and 15 % infill are enough for nearly every bin. Use 3 walls for heavy parts.', 'Magnets (6 × 2 mm) are optional and pressed into the pockets in the foot. Do not pause the print, the pockets are open from below.', 'The foot has 0.15 mm clearance. If a bin sits too tight, reduce elephant foot or sand the foot lightly.', 'Tile baseplates side by side instead of printing one huge plate.'] },
    faq: { de: [['Passt das zu anderen Gridfinity-Teilen?', 'Ja. Raster 42 mm, Höheneinheit 7 mm und das Fußprofil folgen dem offenen Standard. Teile anderer Ersteller passen in der Regel zusammen.'], ['Brauche ich Magnete?', 'Nein. Sie halten Bins auf der Platte, sind aber optional. Ohne Magnete reicht das Rasten im Fußprofil.'], ['Wie groß darf eine Grundplatte sein?', 'So groß wie dein Druckbett. Unten rechts prüft das Werkzeug die Maße gegen deinen Drucker und zeigt, ob alles passt.']],
      en: [['Does it fit other Gridfinity parts?', 'Yes. The 42 mm grid, 7 mm height unit and foot profile follow the open standard. Parts from other creators normally fit.'], ['Do I need magnets?', 'No. They hold bins on the plate but are optional. Without magnets the foot profile still locates the bin.'], ['How large can a baseplate be?', 'As large as your print bed. The tool checks the size against your printer and shows whether it fits.']] }
  },
  groups: [
    { title: { de: 'Teil', en: 'Part' }, items: [
      { k: 'kind', t: 'sel', def: 'bin', str: true, label: { de: 'Art', en: 'Kind' }, opts: [['bin', { de: 'Bin (Behälter)', en: 'Bin' }], ['plate', { de: 'Grundplatte', en: 'Baseplate' }]] },
      { k: 'nx', t: 'int', min: 1, max: 8, def: 2, label: { de: 'Breite', en: 'Width' }, unit: { de: 'Einheiten à 42 mm', en: 'units of 42 mm' } },
      { k: 'ny', t: 'int', min: 1, max: 8, def: 2, label: { de: 'Tiefe', en: 'Depth' }, unit: { de: 'Einheiten à 42 mm', en: 'units of 42 mm' } },
      { k: 'u', t: 'int', min: 2, max: 18, def: 4, label: { de: 'Höhe', en: 'Height' }, unit: { de: 'Einheiten à 7 mm', en: 'units of 7 mm' }, show: function (p) { return p.kind === 'bin'; } }
    ] },
    { title: { de: 'Fächer & Details', en: 'Compartments & details' }, items: [
      { k: 'cx', t: 'int', min: 1, max: 8, def: 1, label: { de: 'Fächer nebeneinander', en: 'Compartments across' }, show: function (p) { return p.kind === 'bin'; } },
      { k: 'cy', t: 'int', min: 1, max: 8, def: 1, label: { de: 'Fächer hintereinander', en: 'Compartments deep' }, show: function (p) { return p.kind === 'bin'; } },
      { k: 'wall', t: 'num', min: 0.8, max: 2.4, step: 0.1, def: 1.2, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' }, show: function (p) { return p.kind === 'bin'; } },
      { k: 'lip', t: 'bool', def: true, label: { de: 'Stapelrand (Bins stapelbar)', en: 'Stacking lip (stackable)' }, show: function (p) { return p.kind === 'bin'; } },
      { k: 'magnets', t: 'bool', def: true, label: { de: 'Magnettaschen 6,5 × 2,4 mm im Fuß', en: 'Magnet pockets 6.5 × 2.4 mm in the foot' }, show: function (p) { return p.kind === 'bin'; } },
      { k: 'scoop', t: 'bool', def: true, label: { de: 'Schaufel (abgerundete Vorderkante)', en: 'Scoop (rounded front edge)' }, show: function (p) { return p.kind === 'bin'; } },
      { k: 'label', t: 'bool', def: false, label: { de: 'Beschriftungsleiste hinten', en: 'Label ledge at the back' }, show: function (p) { return p.kind === 'bin'; } },
      { k: 'screws', t: 'bool', def: false, label: { de: 'M3-Schraubenlöcher in den Ecken', en: 'M3 screw holes in the corners' } }
    ] }
  ],
  presets: [
    { label: { de: '1 × 1 × 3 (klein)', en: '1 × 1 × 3 (small)' }, v: { kind: 'bin', nx: 1, ny: 1, u: 3, cx: 1, cy: 1 } },
    { label: { de: '2 × 1 × 3', en: '2 × 1 × 3' }, v: { kind: 'bin', nx: 2, ny: 1, u: 3, cx: 1, cy: 1 } },
    { label: { de: '2 × 2 × 4 (Standard)', en: '2 × 2 × 4 (standard)' }, v: { kind: 'bin', nx: 2, ny: 2, u: 4, cx: 1, cy: 1 } },
    { label: { de: '3 × 2 × 6, 3 Fächer', en: '3 × 2 × 6, 3 compartments' }, v: { kind: 'bin', nx: 3, ny: 2, u: 6, cx: 3, cy: 1 } },
    { label: { de: '4 × 3 × 6, 4 Fächer', en: '4 × 3 × 6, 4 compartments' }, v: { kind: 'bin', nx: 4, ny: 3, u: 6, cx: 2, cy: 2 } },
    { label: { de: 'Grundplatte 4 × 4', en: 'Baseplate 4 × 4' }, v: { kind: 'plate', nx: 4, ny: 4 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, PITCH = 42, nx = p.nx, ny = p.ny, W = PITCH * nx, D = PITCH * ny;
    var cells = [], i, j;
    for (i = 0; i < nx; i++) for (j = 0; j < ny; j++) cells.push([(i + 0.5) * PITCH - W / 2, (j + 0.5) * PITCH - D / 2]);
    /* Fußprofil von unten nach oben: [z, Abstand vom Zellrand] */
    function prof(inset) { var o = inset || 0; return [[0, 3.2 + o], [0.8, 2.4 + o], [2.6, 2.4 + o], [4.75, 0.25 + o]]; }
    function slice(off) { return H.rrect(PITCH - 2 * off, PITCH - 2 * off, Math.max(0.8, 4 - off), 20); }
    function chain(pr, dz) {
      var parts = [], k;
      for (k = 0; k < pr.length - 1; k++) {
        var a = pr[k], b = pr[k + 1];
        parts.push(Math.abs(a[1] - b[1]) < 1e-6 ? H.ext(slice(a[1]), a[0] + dz, b[0] + dz) : H.loft(slice(a[1]), a[0] + dz, slice(b[1]), b[0] + dz));
      }
      return Mf.union(parts);
    }
    function copies(man) { return Mf.union(cells.map(function (c) { return man.translate([c[0], c[1], 0]); })); }
    function holes(z0, z1, d) { return Mf.union(cells.reduce(function (a, c) { [[-13, -13], [13, -13], [-13, 13], [13, 13]].forEach(function (q) { a.push(H.cyl(c[0] + q[0], c[1] + q[1], z0, z1, d, 24)); }); return a; }, [])); }
    var out;
    if (p.kind === 'plate') {
      var PH = 5.4, plate = H.ext(H.rrect(W, D, 4, 24), 0, PH);
      plate = plate.subtract(copies(chain(prof(0), PH - 4.75)));
      if (p.screws) plate = plate.subtract(holes(-0.01, PH + 0.01, 3.4));
      out = plate;
    } else {
      var hz = p.u * 7, tol = 0.15, wall = p.wall, floorZ = 5.4;
      var body = H.ext(H.rrect(W - 0.5, D - 0.5, 3.75, 24), 4.74, hz);
      var foot = copies(chain(prof(tol), 0));
      var bin = body.add(foot);
      var IW = W - 0.5 - 2 * wall, ID = D - 0.5 - 2 * wall, dw = wall, cw = (IW - (p.cx - 1) * dw) / p.cx, cd = (ID - (p.cy - 1) * dw) / p.cy, cav = [], solids = [], a, b;
      if (cw < 3 || cd < 3) throw new Error('zu schmal');
      for (a = 0; a < p.cx; a++) for (b = 0; b < p.cy; b++) {
        var x0 = -IW / 2 + a * (cw + dw), y0 = -ID / 2 + b * (cd + dw), x1 = x0 + cw, y1 = y0 + cd;
        cav.push(H.box(x0, y0, floorZ, x1, y1, hz + 0.01));
        var depth = hz - floorZ;
        if (p.scoop) {
          var R = Math.max(1, Math.min(10, depth - 1, cd / 2 - 0.5));
          var sc = H.box(x0, y0, floorZ - 0.01, x1, y0 + R, floorZ + R).subtract(Mf.cylinder(cw + 2, R, R, 32, false).rotate([0, 90, 0]).translate([x0 - 1, y0 + R, floorZ + R]));
          solids.push(sc);
        }
        if (p.label && depth > 12) {
          var rise = Math.min(8.7, depth - 3), wd = Math.min(12, cd - 2);
          if (rise > 2 && wd > 2) solids.push(Mf.extrude(CS.ofPolygons([[[y1 - wd, hz], [y1 + 0.3, hz - rise], [y1 + 0.3, hz]]]), cw + 0.6).rotate([90, 0, 90]).translate([x0 - 0.3, 0, 0]));
        }
      }
      var ox = 0;
      /* Fächer ausräumen, dann Schaufel/Leiste wieder zufügen */
      bin = bin.subtract(Mf.union(cav));
      if (solids.length) bin = bin.add(Mf.union(solids));
      if (p.lip) {
        var lip = H.ext(H.rrect(W - 0.5, D - 0.5, 3.75, 24), hz - 0.01, hz + 4.4);
        var ci = function (off) { return H.rrect(W - 0.5 - 2 * off, D - 0.5 - 2 * off, Math.max(0.5, 3.75 - off), 24); };
        var cavL = Mf.union([H.loft(ci(3.1), hz - 0.02, ci(1.2), hz + 1.9), H.ext(ci(1.2), hz + 1.9, hz + 3.7), H.loft(ci(1.2), hz + 3.7, ci(0.5), hz + 4.41)]);
        bin = bin.add(lip.subtract(cavL));
      }
      if (p.magnets) bin = bin.subtract(holes(-0.01, 2.4, 6.5));
      if (p.screws) bin = bin.subtract(holes(-0.01, floorZ + 0.3, 3.0));
      out = bin;
    }
    return [{ name: p.kind === 'plate' ? 'Gridfinity-Grundplatte' : 'Gridfinity-Bin', mesh: H.toMesh(out) }];
  }
});
