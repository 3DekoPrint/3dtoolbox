/* Werkzeug-Einsatz: Schaum-Ersatz mit Löchern und Schlitzen für Schraubendreher, Bits, Zangen, Nüsse. */
GenKit.define({
  id: 'toolinsert', file: 'werkzeug-einsatz',
  fname: function (p) { return 'einsatz_' + p.kind; },
  meta: {
    cat: 'workshop', slug: { de: 'werkzeug-einsatz-generator', en: 'tool-insert-generator' },
    title: { de: 'Werkzeug-Einsatz-Generator: Organizer für Schraubendreher, Bits und Zangen (kostenlos)', en: 'Tool Insert Generator: organizer for screwdrivers, bits and pliers (free)' },
    h1: { de: 'Werkzeug-Einsatz', en: 'Tool insert' },
    sub: { de: 'Einlage mit Löchern oder Schlitzen für Schraubendreher, Bits, Steckschlüssel oder Zangen. Passt in jede Box mit dieser Innenmaß-Größe.', en: 'An insert with holes or slots for screwdrivers, bits, sockets or pliers. Fits any box with these inner dimensions.' },
    desc: { de: 'Kostenloser Werkzeug-Einsatz-Generator: Organizer-Einlage mit Löchern für Schraubendreher, 6-kant-Bits, Nüsse und Schlitzen für Zangen. Größe passend zur Systembox, Export als STL und 3MF.', en: 'Free tool insert generator: organizer insert with holes for screwdrivers, hex bits, sockets and slots for pliers. Sized to match the system box, export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Gib die Innenmaße deiner Box ein, wähle den Einsatz-Typ und stelle Lochgröße und Anzahl ein. Die Einlage ist ein Block mit Aussparungen und hält dein Werkzeug an seinem Platz.', 'In der Systembox liegt der Einsatz auf dem Boden. Messe die Innenmaße der Box und ziehe 0,5 mm Spiel ab.'], en: ['Enter the inner dimensions of your box, choose the insert type, and set hole size and count. The insert is a block with cut-outs that keeps your tools in place.', 'In the system box the insert sits on the floor. Measure the inner dimensions of the box and subtract 0.5 mm clearance.'] },
    notes: { de: ['Flach drucken, die Löcher zeigen nach oben. Keine Stützen nötig.', 'Für Bits 6,5 mm Lochweite, für 1/4-Zoll-Halter 6,4 mm. Probier mit einem Bit und passe an.', 'Bei großen Einsätzen die Wand klein halten und 10 % Füllung nehmen, das spart Material.'], en: ['Print flat with the holes facing up. No supports needed.', 'For bits use a 6.5 mm hole, for 1/4 inch holders 6.4 mm. Test with one bit and adjust.', 'For large inserts keep the walls low and use 10 % infill to save material.'] },
    faq: { de: [['Wie groß muss das Loch sein?', 'Etwas größer als das Werkzeug: Durchmesser plus 0,4 mm.'], ['Kann ich zwei Typen mischen?', 'Dafür druckst du zwei Einsätze und legst sie nebeneinander in die Box.']], en: [['How large must the hole be?', 'Slightly larger than the tool: diameter plus 0.4 mm.'], ['Can I mix two types?', 'Print two inserts and place them side by side in the box.']] }
  },
  groups: [
    { title: { de: 'Einsatz', en: 'Insert' }, items: [
      { k: 'kind', t: 'sel', def: 'round', str: true, label: { de: 'Typ', en: 'Type' }, opts: [['round', { de: 'Runde Löcher (Schraubendreher, Nüsse)', en: 'Round holes (screwdrivers, sockets)' }], ['hex', { de: 'Sechskant-Löcher (Bits)', en: 'Hex holes (bits)' }], ['slot', { de: 'Schlitze (Zangen, Schlüssel)', en: 'Slots (pliers, wrenches)' }]] },
      { k: 'l', t: 'num', min: 40, max: 360, step: 1, def: 195, unit: 'mm', label: { de: 'Länge (Innenmaß der Box)', en: 'Length (inner box size)' } },
      { k: 'w', t: 'num', min: 30, max: 260, step: 1, def: 145, unit: 'mm', label: { de: 'Breite (Innenmaß der Box)', en: 'Width (inner box size)' } },
      { k: 'h', t: 'num', min: 8, max: 80, step: 1, def: 30, unit: 'mm', label: { de: 'Höhe des Einsatzes', en: 'Insert height' } },
      { k: 'cols', t: 'int', min: 1, max: 14, step: 1, def: 6, label: { de: 'Spalten', en: 'Columns' } },
      { k: 'rows', t: 'int', min: 1, max: 10, step: 1, def: 3, label: { de: 'Reihen', en: 'Rows' } }
    ] },
    { title: { de: 'Maße der Aussparung', en: 'Cut-out size' }, items: [
      { k: 'd', t: 'num', min: 3, max: 60, step: 0.1, def: 14, unit: 'mm', label: { de: 'Durchmesser / Schlüsselweite / Schlitzbreite', en: 'Diameter / across flats / slot width' } },
      { k: 'sl', t: 'num', min: 10, max: 160, step: 1, def: 40, unit: 'mm', label: { de: 'Schlitzlänge', en: 'Slot length' }, show: function (p) { return p.kind === 'slot'; } },
      { k: 'depth', t: 'num', min: 4, max: 78, step: 1, def: 22, unit: 'mm', label: { de: 'Tiefe', en: 'Depth' } },
      { k: 'cl', t: 'num', min: 0, max: 1, step: 0.05, def: 0.3, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } },
      { k: 'fing', t: 'bool', def: true, label: { de: 'Griffmulde an der Vorderkante', en: 'Finger scoop at the front edge' } }
    ] }
  ],
  presets: [
    { label: { de: 'Schraubendreher 5 Stück', en: 'Screwdrivers x5' }, v: { kind: 'round', cols: 5, rows: 1, d: 28, depth: 20, h: 30, l: 195, w: 60 } },
    { label: { de: 'Bit-Block 6-kant 1/4 Zoll', en: 'Hex bit block 1/4 inch' }, v: { kind: 'hex', cols: 10, rows: 3, d: 6.5, depth: 22, h: 26, l: 190, w: 60 } },
    { label: { de: 'Zangenhalter 4 Stück', en: 'Pliers holder x4' }, v: { kind: 'slot', cols: 4, rows: 1, d: 18, sl: 40, depth: 40, h: 50, l: 160, w: 50 } },
    { label: { de: 'Steckschlüssel-Nüsse', en: 'Socket holder' }, v: { kind: 'round', cols: 6, rows: 2, d: 22, depth: 20, h: 26, l: 190, w: 90 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de';
    var L = p.l, W = p.w, h = p.h, dp = Math.min(p.depth, h - 3), d = p.d + p.cl, cx = L / p.cols, cy = W / p.rows;
    var cellW = p.kind === 'slot' ? p.d + p.cl : d, cellL = p.kind === 'slot' ? p.sl : d;
    if (p.kind === 'slot') { cx = L / p.cols; cy = W / p.rows; if (cellW + 3 > cx || cellL + 3 > cy) throw new Error('Schlitze zu groß'); }
    else if (d + 3 > cx || d + 3 > cy) throw new Error('Löcher zu groß');
    var body = H.ext(H.rrect(L, W, Math.min(6, Math.min(L, W) / 4)), 0, h), i, j, hole;
    for (i = 0; i < p.cols; i++) for (j = 0; j < p.rows; j++) {
      var x = -L / 2 + cx * (i + 0.5), y = -W / 2 + cy * (j + 0.5);
      if (p.kind === 'round') hole = H.cyl(x, y, h - dp, h + 1, d, 40);
      else if (p.kind === 'hex') hole = Mf.extrude(CS.circle(d / Math.sqrt(3), 6), dp + 1).translate([x, y, h - dp]);
      else hole = H.ext(H.rrect(cellW, cellL, Math.min(cellW, cellL) / 2 - 0.01, 12), h - dp, h + 1).translate([x, y, 0]);
      body = body.subtract(hole);
    }
    if (p.fing && W > 40) body = body.subtract(H.cyl(0, -W / 2 - 8, h - 8, h + 1, 36, 48).scale([1.6, 1, 1]));
    return [{ name: de ? 'Einsatz' : 'Insert', mesh: H.toMesh(body) }];
  }
});
