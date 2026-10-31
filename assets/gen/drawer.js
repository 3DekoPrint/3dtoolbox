/* Schubladen-Organizer: mehrere gleiche Boxen, die die Schublade ausfüllen. */
GenKit.define({
  id: 'drawer', file: 'schubladen-organizer',
  fname: function (p) { return p.dw + 'x' + p.dd; },
  meta: {
    cat: 'storage', slug: { de: 'schubladen-organizer-generator', en: 'drawer-organizer-generator' },
    title: { de: 'Schubladen-Organizer-Generator: Boxen nach Maß als STL/3MF (kostenlos)', en: 'Drawer Organizer Generator: custom bins as STL/3MF (free)' },
    h1: { de: 'Schubladen-Organizer', en: 'Drawer Organizer' },
    sub: { de: 'Maße deiner Schublade eingeben, Boxgröße wählen: der Generator füllt die Schublade mit passenden Einsätzen.', en: 'Enter your drawer size and pick a bin size: the generator fills the drawer with matching bins.' },
    desc: { de: 'Kostenloser Schubladen-Organizer: passende Boxen für jede Schublade nach Maß, mit niedriger Vorderkante und runden Ecken. Export als STL und 3MF.', en: 'Free drawer organizer generator: bins that fit any drawer, with a low front edge and rounded corners. Export as STL and 3MF.' },
    tag: { de: 'Aufbewahren', en: 'Storage' },
    intro: { de: ['Miss die Schublade innen aus und gib Breite, Tiefe und Höhe ein. Dann wählst du eine Wunschgröße für die einzelnen Boxen. Der Generator teilt die Fläche gleichmäßig auf, sodass die Boxen die Schublade sauber ausfüllen.', 'Mit niedriger Vorderkante kommst du leichter an kleine Teile heran.'], en: ['Measure the inside of the drawer and enter width, depth and height. Then pick a target size for the bins. The generator divides the area evenly so the bins fill the drawer neatly.', 'A low front edge makes it easier to reach small parts.'] },
    notes: { de: ['Boxen flach drucken, ohne Stützen. Ein Brim ist bei großen Boxen hilfreich.', '2 Wände und 10 bis 15 % Füllung reichen für Kleinteile.', 'Das Spiel von 0,5 mm gleicht Maßabweichungen der Schublade aus.'], en: ['Print bins flat without supports. A brim helps on large bins.', '2 walls and 10 to 15 % infill are enough for small parts.', 'The 0.5 mm clearance absorbs drawer size tolerance.'] },
    faq: { de: [['Wie viele Boxen werden erzeugt?', 'So viele, wie in die Schublade passen, höchstens 24. Alle sind gleich groß.'], ['Passt es auf mein Druckbett?', 'Wenn eine Box größer als dein Bett ist, zeigt die Seite eine Warnung. Wähle dann eine kleinere Boxgröße.']], en: [['How many bins are created?', 'As many as fit the drawer, at most 24. All are the same size.'], ['Does it fit my print bed?', 'If a bin is larger than your bed the page shows a warning. Pick a smaller bin size then.']] }
  },
  groups: [
    { title: { de: 'Schublade', en: 'Drawer' }, items: [
      { k: 'dw', t: 'num', min: 60, max: 800, step: 1, def: 300, unit: 'mm', label: { de: 'Innenbreite', en: 'Inner width' } },
      { k: 'dd', t: 'num', min: 60, max: 800, step: 1, def: 400, unit: 'mm', label: { de: 'Innentiefe', en: 'Inner depth' } },
      { k: 'h', t: 'num', min: 10, max: 150, step: 1, def: 45, unit: 'mm', label: { de: 'Höhe der Boxen', en: 'Bin height' } },
      { k: 'tw', t: 'num', min: 30, max: 250, step: 1, def: 100, unit: 'mm', label: { de: 'Wunschbreite je Box', en: 'Target bin width' } },
      { k: 'td', t: 'num', min: 30, max: 250, step: 1, def: 100, unit: 'mm', label: { de: 'Wunschtiefe je Box', en: 'Target bin depth' } }
    ] },
    { title: { de: 'Details', en: 'Details' }, items: [
      { k: 'wall', t: 'num', min: 0.8, max: 4, step: 0.2, def: 1.2, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'fl', t: 'num', min: 0.8, max: 4, step: 0.2, def: 1.2, unit: 'mm', label: { de: 'Bodendicke', en: 'Floor thickness' } },
      { k: 'r', t: 'num', min: 0, max: 15, step: 0.5, def: 3, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } },
      { k: 'tol', t: 'num', min: 0, max: 3, step: 0.1, def: 0.5, unit: 'mm', label: { de: 'Spiel in der Schublade', en: 'Drawer clearance' } },
      { k: 'low', t: 'bool', def: true, label: { de: 'Niedrige Vorderkante', en: 'Low front edge' } },
      { k: 'lowh', t: 'num', min: 5, max: 60, step: 1, def: 18, unit: 'mm', label: { de: 'Höhe der Vorderkante', en: 'Front edge height' }, show: function (p) { return p.low; } }
    ] }
  ],
  presets: [
    { label: { de: 'Küchenschublade (400 × 500)', en: 'Kitchen drawer (400 × 500)' }, v: { dw: 400, dd: 500, h: 55, tw: 130, td: 130 } },
    { label: { de: 'Werkstattschublade (300 × 400)', en: 'Workshop drawer (300 × 400)' }, v: { dw: 300, dd: 400, h: 45, tw: 100, td: 100 } },
    { label: { de: 'Schreibtisch (250 × 350, flach)', en: 'Desk drawer (250 × 350, shallow)' }, v: { dw: 250, dd: 350, h: 30, tw: 80, td: 110 } },
    { label: { de: 'Kleinteile (200 × 200, 4 Boxen)', en: 'Small parts (200 × 200, 4 bins)' }, v: { dw: 200, dd: 200, h: 35, tw: 100, td: 100 } },
    { label: { de: 'Besteckkasten (280 × 420)', en: 'Cutlery tray (280 × 420)' }, v: { dw: 280, dd: 420, h: 50, tw: 90, td: 210, low: false } }
  ],
  build: function (p, H) {
    var nx = Math.max(1, Math.round(p.dw / p.tw)), ny = Math.max(1, Math.round(p.dd / p.td));
    while (nx * ny > 24) { if (nx >= ny) nx--; else ny--; }
    var bw = (p.dw - p.tol) / nx, bd = (p.dd - p.tol) / ny, w = p.wall, r = Math.min(p.r, Math.min(bw, bd) / 2 - 0.5);
    var b = H.ext(H.rrect(bw, bd, r), 0, p.h).subtract(H.ext(H.rrect(bw - 2 * w, bd - 2 * w, Math.max(0.4, r - w)), p.fl, p.h + 1));
    if (p.low && p.lowh < p.h - 1) b = b.subtract(H.box(-(bw / 2 - w - 2), -bd / 2 - 1, p.lowh, bw / 2 - w - 2, -bd / 2 + w + 0.4, p.h + 1));
    var mesh = H.toMesh(b), out = [], k;
    for (k = 0; k < nx * ny; k++) out.push({ name: (H.lang === 'en' ? 'Bin ' : 'Box ') + (k + 1) + ' (' + bw.toFixed(0) + '×' + bd.toFixed(0) + ')', mesh: mesh });
    return out;
  }
});
