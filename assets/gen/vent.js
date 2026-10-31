/* Lüftungsgitter: Rahmen mit Schlitzen, Waben oder Löchern, Eckschrauben. */
GenKit.define({
  id: 'vent', file: 'lueftungsgitter',
  fname: function (p) { return p.pat + p.w + 'x' + p.h; },
  meta: {
    cat: 'electronics', slug: { de: 'lueftungsgitter-generator', en: 'vent-grille-generator' },
    title: { de: 'Lüftungsgitter-Generator: Gitter nach Maß als STL/3MF (kostenlos)', en: 'Vent Grille Generator: custom grilles as STL/3MF (free)' },
    h1: { de: 'Lüftungsgitter-Generator', en: 'Vent Grille Generator' },
    sub: { de: 'Gitter für Lüfter, Gehäuse und Schränke: Größe, Muster und Befestigung einstellen, STL oder 3MF laden.', en: 'Grilles for fans, enclosures and cabinets: set size, pattern and mounting, download STL or 3MF.' },
    desc: { de: 'Kostenloser Lüftungsgitter-Generator: Schlitze, Waben oder Lochmuster in beliebiger Größe, mit Eckschrauben und runden Ecken. Export als STL und 3MF.', en: 'Free vent grille generator: slots, honeycomb or round holes in any size, with corner screws and rounded corners. Export as STL and 3MF.' },
    tag: { de: 'Elektronik', en: 'Electronics' },
    intro: { de: ['Das Gitter schützt Lüfter, lässt Luft durch und passt in jeden Ausschnitt. Wähle Schlitze, Waben oder Löcher und stelle die Stege so schmal ein, wie dein Drucker sie sauber schafft.', 'Für Lüfter nimm Schraubenabstand und Größe aus dem Datenblatt, etwa 40, 60, 80 oder 120 mm.'], en: ['The grille protects fans, lets air through and fits any cut-out. Pick slots, honeycomb or round holes and set the bars as thin as your printer can do cleanly.', 'For fans use the screw spacing and size from the data sheet, for example 40, 60, 80 or 120 mm.'] },
    notes: { de: ['Flach drucken, ohne Stützen. Brims sind nicht nötig.', 'Stege unter 1,2 mm brauchen eine 0,4-mm-Düse und saubere Einstellung.', 'Für Lüfter: Luft strömt besser durch Waben als durch schmale Schlitze.'], en: ['Print flat, no supports. Brims are not needed.', 'Bars under 1.2 mm need a 0.4 mm nozzle and clean settings.', 'For fans: air flows better through honeycomb than through narrow slots.'] },
    faq: { de: [['Wie groß ist das Schraubenloch?', 'Das Loch passt für M3 (3,4 mm). Für größere Schrauben ändere den Wert.'], ['Welche Lüftergrößen gibt es?', 'Üblich sind 40, 60, 80, 92 und 120 mm. Die Voreinstellungen enthalten Lochabstand und Außenmaß.']], en: [['How big is the screw hole?', 'The hole fits M3 (3.4 mm). Change the value for larger screws.'], ['Which fan sizes exist?', 'Common are 40, 60, 80, 92 and 120 mm. The presets include hole spacing and outer size.']] }
  },
  groups: [
    { title: { de: 'Größe & Muster', en: 'Size & pattern' }, items: [
      { k: 'w', t: 'num', min: 20, max: 250, step: 1, def: 80, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'h', t: 'num', min: 20, max: 250, step: 1, def: 80, unit: 'mm', label: { de: 'Höhe', en: 'Height' } },
      { k: 'pat', t: 'sel', def: 'hex', str: true, label: { de: 'Muster', en: 'Pattern' }, opts: [['hex', { de: 'Waben', en: 'Honeycomb' }], ['slot', { de: 'Schlitze (längs)', en: 'Slots (long)' }], ['slotv', { de: 'Schlitze (hoch)', en: 'Slots (tall)' }], ['round', { de: 'Runde Löcher', en: 'Round holes' }]] },
      { k: 'cell', t: 'num', min: 2, max: 30, step: 0.5, def: 6, unit: 'mm', label: { de: 'Lochgröße', en: 'Hole size' } },
      { k: 'bar', t: 'num', min: 0.8, max: 6, step: 0.1, def: 1.6, unit: 'mm', label: { de: 'Stegbreite', en: 'Bar width' } }
    ] },
    { title: { de: 'Rahmen & Befestigung', en: 'Frame & mounting' }, items: [
      { k: 'th', t: 'num', min: 1, max: 10, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Dicke', en: 'Thickness' } },
      { k: 'fr', t: 'num', min: 3, max: 20, step: 0.5, def: 8, unit: 'mm', label: { de: 'Rahmenbreite', en: 'Frame width' } },
      { k: 'r', t: 'num', min: 0, max: 20, step: 0.5, def: 3, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } },
      { k: 'mount', t: 'bool', def: true, label: { de: 'Eckschrauben', en: 'Corner screws' } },
      { k: 'sd', t: 'num', min: 2, max: 6, step: 0.1, def: 3.4, unit: 'mm', label: { de: 'Schraubenloch', en: 'Screw hole' }, show: function (p) { return p.mount; } },
      { k: 'inset', t: 'num', min: 3, max: 15, step: 0.5, def: 4, unit: 'mm', label: { de: 'Lochabstand zur Kante', en: 'Hole distance from edge' }, show: function (p) { return p.mount; } }
    ] }
  ],
  presets: [
    { label: { de: '40-mm-Lüfter', en: '40 mm fan' }, v: { w: 40, h: 40, cell: 3.5, bar: 1.2, fr: 5, r: 2, inset: 4, pat: 'hex' } },
    { label: { de: '60-mm-Lüfter', en: '60 mm fan' }, v: { w: 60, h: 60, cell: 4.5, bar: 1.4, fr: 6, r: 3, inset: 4, pat: 'hex' } },
    { label: { de: '80-mm-Lüfter', en: '80 mm fan' }, v: { w: 80, h: 80, cell: 6, bar: 1.6, fr: 8, r: 4, inset: 4, pat: 'hex' } },
    { label: { de: '120-mm-Lüfter', en: '120 mm fan' }, v: { w: 120, h: 120, cell: 8, bar: 2, fr: 10, r: 6, inset: 5, pat: 'hex' } },
    { label: { de: 'Schrank-Lüftung (Schlitze)', en: 'Cabinet vent (slots)' }, v: { w: 150, h: 60, cell: 4, bar: 2.4, fr: 8, r: 3, inset: 4, pat: 'slot' } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, W = p.w, Hh = p.h, f = p.fr, iw = W - 2 * f, ih = Hh - 2 * f, polys = [], c = p.cell, b = p.bar, x, y, k, row;
    function ngon(cx, cy, r, n, rot) { var o = [], i; for (i = 0; i < n; i++) { var a = rot + 2 * Math.PI * i / n; o.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return o; }
    function stad(cx, cy, w, h) { var r = Math.min(w, h) / 2, o = [], i, s = 8, hw = w / 2, hh = h / 2; if (w >= h) { for (i = 0; i <= s; i++) { var a = -Math.PI / 2 + Math.PI * i / s; o.push([cx + hw - r + r * Math.cos(a), cy + r * Math.sin(a)]); } for (i = 0; i <= s; i++) { var a2 = Math.PI / 2 + Math.PI * i / s; o.push([cx - hw + r + r * Math.cos(a2), cy + r * Math.sin(a2)]); } } else { for (i = 0; i <= s; i++) { var a3 = Math.PI * i / s; o.push([cx + r * Math.cos(a3), cy + hh - r + r * Math.sin(a3)]); } for (i = 0; i <= s; i++) { var a4 = Math.PI + Math.PI * i / s; o.push([cx + r * Math.cos(a4), cy - hh + r + r * Math.sin(a4)]); } } return o; }
    var cx0 = W / 2, cy0 = Hh / 2;
    if (p.pat === 'hex') {
      var rr = (c / 2) / Math.cos(Math.PI / 6), dx = c + b, dy = dx * Math.sqrt(3) / 2;
      var rows = Math.max(1, Math.floor((ih - 2 * rr) / dy) + 1), off0 = -(rows - 1) * dy / 2, colsA = Math.floor((iw - 2 * rr) / dx) + 1;
      for (row = 0; row < rows; row++) { y = cy0 + off0 + row * dy; for (k = -1; k <= colsA; k++) { x = f + rr + k * dx + (row % 2 ? dx / 2 : 0); if (x - rr < f - 0.001 || x + rr > W - f + 0.001 || y - rr < f - 0.001 || y + rr > Hh - f + 0.001) continue; polys.push(ngon(x, y, rr, 6, Math.PI / 6)); } }
    } else if (p.pat === 'round') {
      var pr = c + b, nx = Math.max(1, Math.floor((iw - c) / pr) + 1), ny = Math.max(1, Math.floor((ih - c) / pr) + 1), j;
      for (j = 0; j < ny; j++) for (k = 0; k < nx; k++) polys.push(ngon(cx0 - (nx - 1) * pr / 2 + k * pr, cy0 - (ny - 1) * pr / 2 + j * pr, c / 2, 40, 0));
    } else if (p.pat === 'slot') {
      var sl = iw, nr = Math.max(1, Math.floor((ih - c) / (c + b)) + 1), j2;
      for (j2 = 0; j2 < nr; j2++) polys.push(stad(cx0, cy0 - (nr - 1) * (c + b) / 2 + j2 * (c + b), sl, c));
    } else {
      var nc = Math.max(1, Math.floor((iw - c) / (c + b)) + 1), k2;
      for (k2 = 0; k2 < nc; k2++) polys.push(stad(cx0 - (nc - 1) * (c + b) / 2 + k2 * (c + b), cy0, c, ih));
    }
    var outer = H.rrect(W, Hh, p.r).translate([cx0, cy0]);
    if (polys.length) outer = outer.subtract(CS.ofPolygons(polys));
    var body = Mf.extrude(outer, p.th);
    if (p.mount) {
      var holes = []; [[p.inset, p.inset], [W - p.inset, p.inset], [p.inset, Hh - p.inset], [W - p.inset, Hh - p.inset]].forEach(function (q) { holes.push(ngon(q[0], q[1], p.sd / 2, 32, 0)); });
      body = body.subtract(Mf.extrude(CS.ofPolygons(holes), p.th + 2).translate([0, 0, -1]));
    }
    return [{ name: H.lang === 'en' ? 'Grille' : 'Gitter', mesh: H.toMesh(body) }];
  }
});
