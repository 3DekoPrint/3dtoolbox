/* Sortierschale: eine Schale mit Fächern, niedrigere Trennstege optional. */
GenKit.define({
  id: 'tray', file: 'sortierschale',
  fname: function (p) { return p.cols + 'x' + p.rows + '_' + p.w + 'x' + p.d; },
  meta: {
    cat: 'storage', slug: { de: 'sortierschale-generator', en: 'sorting-tray-generator' },
    title: { de: 'Sortierschale-Generator: Fächerschale nach Maß als STL/3MF (kostenlos)', en: 'Sorting Tray Generator: compartment tray as STL/3MF (free)' },
    h1: { de: 'Sortierschale', en: 'Sorting Tray' },
    sub: { de: 'Schale mit Fächern für Schrauben, Perlen oder Spielsteine: Größe und Fächeranzahl einstellen, STL oder 3MF laden.', en: 'A tray with compartments for screws, beads or game pieces: set size and number of compartments, download STL or 3MF.' },
    desc: { de: 'Kostenloser Sortierschalen-Generator: Schalen mit 1 bis 8 mal 1 bis 6 Fächern, niedrigen Trennwänden und runden Ecken. Export als STL und 3MF.', en: 'Free sorting tray generator: trays with 1 to 8 by 1 to 6 compartments, low dividers and rounded corners. Export as STL and 3MF.' },
    tag: { de: 'Aufbewahren', en: 'Storage' },
    intro: { de: ['Die Schale hat ein gleichmäßiges Raster aus Fächern. Mit niedrigeren Trennstegen kannst du Teile leicht umsortieren, mit hohen bleibt alles getrennt.', 'Gut für Werkstatt, Basteltisch, Spielabende und Sammlungen.'], en: ['The tray has an even grid of compartments. Lower dividers let you easily shift parts around, tall dividers keep everything separate.', 'Great for the workshop, craft desk, game nights and collections.'] },
    notes: { de: ['Flach drucken, keine Stützen nötig.', 'Dünne Trennstege (unter 1,2 mm) drucken am besten mit 0,4-mm-Düse und langsamen Wänden.', 'Größere Schalen auf dem Bett mit Brim gegen Verzug sichern.'], en: ['Print flat, no supports needed.', 'Thin dividers (under 1.2 mm) print best with a 0.4 mm nozzle and slow walls.', 'Secure larger trays with a brim to prevent warping.'] },
    faq: { de: [['Wie viele Fächer sind möglich?', 'Bis zu 8 Spalten und 6 Reihen, zusammen also bis zu 48 Fächer.'], ['Warum niedrigere Trennstege?', 'So lässt sich der Inhalt wie in einer Schale schütteln und sortieren, ohne dass Teile in andere Fächer fallen, wenn sie klein sind.']], en: [['How many compartments?', 'Up to 8 columns and 6 rows, so up to 48 compartments.'], ['Why lower dividers?', 'You can shake and sort the contents like in a bowl, and small parts still stay in their compartments.']] }
  },
  groups: [
    { title: { de: 'Schale', en: 'Tray' }, items: [
      { k: 'w', t: 'num', min: 30, max: 300, step: 1, def: 160, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'd', t: 'num', min: 30, max: 300, step: 1, def: 110, unit: 'mm', label: { de: 'Tiefe', en: 'Depth' } },
      { k: 'h', t: 'num', min: 8, max: 100, step: 1, def: 30, unit: 'mm', label: { de: 'Höhe', en: 'Height' } },
      { k: 'cols', t: 'int', min: 1, max: 8, step: 1, def: 4, label: { de: 'Spalten', en: 'Columns' } },
      { k: 'rows', t: 'int', min: 1, max: 6, step: 1, def: 3, label: { de: 'Reihen', en: 'Rows' } }
    ] },
    { title: { de: 'Wände', en: 'Walls' }, items: [
      { k: 'wall', t: 'num', min: 0.8, max: 5, step: 0.2, def: 1.6, unit: 'mm', label: { de: 'Außenwand', en: 'Outer wall' } },
      { k: 'dt', t: 'num', min: 0.8, max: 5, step: 0.2, def: 1.2, unit: 'mm', label: { de: 'Trennstege', en: 'Dividers' } },
      { k: 'fl', t: 'num', min: 0.8, max: 5, step: 0.2, def: 1.6, unit: 'mm', label: { de: 'Boden', en: 'Floor' } },
      { k: 'dh', t: 'num', min: 20, max: 100, step: 5, def: 100, unit: '%', label: { de: 'Höhe der Trennstege (% der Wand)', en: 'Divider height (% of wall)' } },
      { k: 'r', t: 'num', min: 0, max: 20, step: 0.5, def: 4, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } }
    ] }
  ],
  presets: [
    { label: { de: 'Schraubenschale (4 × 3)', en: 'Screw tray (4 × 3)' }, v: { w: 160, d: 110, h: 30, cols: 4, rows: 3 } },
    { label: { de: 'Perlen-Sortierer (6 × 4)', en: 'Bead sorter (6 × 4)' }, v: { w: 180, d: 120, h: 25, cols: 6, rows: 4, dt: 1, dh: 60 } },
    { label: { de: 'Würfelschale (1 Fach)', en: 'Dice tray (1 compartment)' }, v: { w: 150, d: 150, h: 25, cols: 1, rows: 1 } },
    { label: { de: 'SMD-Teile (8 × 4)', en: 'SMD parts (8 × 4)' }, v: { w: 200, d: 100, h: 20, cols: 8, rows: 4, dt: 1, wall: 1.2 } },
    { label: { de: 'Spielsteine (2 × 2)', en: 'Game pieces (2 × 2)' }, v: { w: 120, d: 120, h: 35, cols: 2, rows: 2 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, nc = Math.round(p.cols), nr = Math.round(p.rows), w = p.wall;
    var cw = (p.w - 2 * w - (nc - 1) * p.dt) / nc, cd = (p.d - 2 * w - (nr - 1) * p.dt) / nr;
    if (cw < 2 || cd < 2) { cw = Math.max(cw, 2); cd = Math.max(cd, 2); }
    var cavs = [], i, j, rr = Math.min(Math.max(0.5, p.r - w), cw / 2 - 0.1, cd / 2 - 0.1), dhz = p.fl + (p.h - p.fl) * p.dh / 100;
    for (j = 0; j < nr; j++) for (i = 0; i < nc; i++) {
      var cx = -p.w / 2 + w + cw / 2 + i * (cw + p.dt), cy = -p.d / 2 + w + cd / 2 + j * (cd + p.dt);
      cavs.push(H.ext(H.rrect(cw, cd, Math.max(0.3, rr)), p.fl, p.h + 1).translate([cx, cy, 0]));
    }
    var cut = Mf.union(cavs);
    if (p.dh < 99.5) cut = cut.add(H.ext(H.rrect(p.w - 2 * w, p.d - 2 * w, Math.max(0.3, p.r - w)), dhz, p.h + 1));
    var body = H.ext(H.rrect(p.w, p.d, Math.min(p.r, Math.min(p.w, p.d) / 2 - 0.5)), 0, p.h).subtract(cut);
    return [{ name: H.lang === 'en' ? 'Tray' : 'Schale', mesh: H.toMesh(body) }];
  }
});
