/* Ausstecher: Form mit dünner Schneide, Wand und Flansch. */
GenKit.define({
  id: 'cutter', file: 'ausstecher',
  fname: function (p) { return p.shape + p.size; },
  meta: {
    cat: 'home', slug: { de: 'ausstecher-generator', en: 'cookie-cutter-generator' },
    title: { de: 'Ausstecher-Generator: Keksausstecher nach Maß als STL/3MF (kostenlos)', en: 'Cookie Cutter Generator: custom cutters as STL/3MF (free)' },
    h1: { de: 'Ausstecher', en: 'Cookie Cutter' },
    sub: { de: 'Keks- und Plätzchenausstecher in vielen Formen oder als Buchstabe: Größe und Höhe einstellen, STL oder 3MF laden.', en: 'Cookie and biscuit cutters in many shapes or as a letter: set size and height, download STL or 3MF.' },
    desc: { de: 'Kostenloser Ausstecher-Generator: Herz, Stern, Blume, Kreis, Sechseck oder Buchstabe als Keksausstecher mit Schneide und Flansch. Export als STL und 3MF.', en: 'Free cookie cutter generator: heart, star, flower, circle, hexagon or a letter as cutter with cutting edge and flange. Export as STL and 3MF.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Wähle eine Form und die Größe. Der Ausstecher hat unten eine dünne Schneide, die in der Wand dicker wird, und oben einen Rand zum Drücken.', 'Mit der Form Text bekommst du einen Buchstaben oder ein kurzes Wort als Ausstecher.'], en: ['Pick a shape and size. The cutter has a thin cutting edge at the bottom that thickens up the wall and a rim on top for pressing.', 'With the Text shape you get a letter or a short word as a cutter.'] },
    notes: { de: ['Mit der Schneide nach oben drucken, also umgedreht, so ist die Schneide am saubersten. Der Flansch liegt dann auf dem Bett.', 'Nur für Teig geeignet. Gedruckte Teile sind nicht spülmaschinenfest und die Schichtfugen können Reste halten. Vor dem Gebrauch gut waschen und lebensmittelechtes Filament benutzen.', 'Zwischen Teig und Ausstecher etwas Mehl streuen, dann löst sich der Teig leichter.'], en: ['Print with the cutting edge up (upside down) so the edge is cleanest. The flange then sits on the bed.', 'Only for dough. Printed parts are not dishwasher safe and layer lines can trap residue. Wash well before use and use food-safe filament.', 'Dust some flour between dough and cutter so the dough releases more easily.'] },
    faq: { de: [['Ist der Ausstecher lebensmittelecht?', 'Das hängt vom Filament ab. Nutze ein als lebensmittelsicher ausgewiesenes Filament, wasche den Ausstecher von Hand und verwende ihn nur kurz für Teig.'], ['Welche Größe ist sinnvoll?', 'Für Kekse 50 bis 80 mm. Sehr feine Formen brauchen eine größere Wand.']], en: [['Is the cutter food safe?', 'That depends on the filament. Use a filament labeled food safe, hand wash the cutter and use it only briefly on dough.'], ['Which size makes sense?', 'For cookies 50 to 80 mm. Very fine shapes need a thicker wall.']] }
  },
  groups: [
    { title: { de: 'Form', en: 'Shape' }, items: [
      { k: 'shape', t: 'sel', def: 'heart', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['heart', { de: 'Herz', en: 'Heart' }], ['star', { de: 'Stern', en: 'Star' }], ['flower', { de: 'Blume', en: 'Flower' }], ['circle', { de: 'Kreis', en: 'Circle' }], ['hex', { de: 'Sechseck', en: 'Hexagon' }], ['square', { de: 'Quadrat', en: 'Square' }], ['text', { de: 'Buchstabe / Text', en: 'Letter / text' }]] },
      { k: 'size', t: 'num', min: 25, max: 200, step: 1, def: 70, unit: 'mm', label: { de: 'Größe (längste Seite)', en: 'Size (longest side)' } },
      { k: 'pts', t: 'int', min: 3, max: 12, step: 1, def: 5, label: { de: 'Zacken / Blütenblätter', en: 'Points / petals' }, show: function (p) { return p.shape === 'star' || p.shape === 'flower'; } },
      { k: 'text', t: 'txt', def: 'A', max: 6, label: { de: 'Text (kurz)', en: 'Text (short)' }, show: function (p) { return p.shape === 'text'; } }
    ] },
    { title: { de: 'Wand & Rand', en: 'Wall & rim' }, items: [
      { k: 'h', t: 'num', min: 10, max: 30, step: 1, def: 16, unit: 'mm', label: { de: 'Höhe', en: 'Height' } },
      { k: 'wall', t: 'num', min: 1.2, max: 3, step: 0.1, def: 1.6, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'fl', t: 'num', min: 3, max: 15, step: 0.5, def: 6, unit: 'mm', label: { de: 'Breite des Randes (Flansch)', en: 'Rim (flange) width' } },
      { k: 'edge', t: 'num', min: 0.4, max: 1.2, step: 0.1, def: 0.6, unit: 'mm', label: { de: 'Schneide', en: 'Cutting edge' } }
    ] }
  ],
  presets: [
    { label: { de: 'Herz 70 mm', en: 'Heart 70 mm' }, v: { shape: 'heart', size: 70 } },
    { label: { de: 'Stern 5 Zacken 80 mm', en: 'Star 5 points 80 mm' }, v: { shape: 'star', size: 80, pts: 5 } },
    { label: { de: 'Blume 6 Blätter 70 mm', en: 'Flower 6 petals 70 mm' }, v: { shape: 'flower', size: 70, pts: 6 } },
    { label: { de: 'Kreis 60 mm', en: 'Circle 60 mm' }, v: { shape: 'circle', size: 60 } },
    { label: { de: 'Buchstabe A, 70 mm', en: 'Letter A, 70 mm' }, v: { shape: 'text', size: 70, text: 'A' } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, n = Math.round(p.pts), i, N = 120, shape;
    function poly(f, cnt) { var o = [], j, a = 0; for (j = 0; j < cnt; j++) o.push(f(2 * Math.PI * j / cnt)); for (j = 0; j < cnt; j++) { var q = o[(j + 1) % cnt]; a += o[j][0] * q[1] - q[0] * o[j][1]; } if (a < 0) o.reverse(); return CS.ofPolygons([o]); }
    if (p.shape === 'heart') shape = poly(function (t) { return [16 * Math.pow(Math.sin(t), 3), 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)]; }, N);
    else if (p.shape === 'star') { var sp = []; for (i = 0; i < 2 * n; i++) { var rr = i % 2 ? 0.45 : 1, aa = Math.PI * i / n; sp.push([rr * Math.sin(aa), rr * Math.cos(aa)]); } sp.reverse(); shape = CS.ofPolygons([sp]); }
    else if (p.shape === 'flower') shape = poly(function (t) { var r = 0.7 + 0.3 * Math.abs(Math.cos(n * t / 2)); return [r * Math.cos(t), r * Math.sin(t)]; }, N * 2);
    else if (p.shape === 'hex') shape = CS.circle(1, 6);
    else if (p.shape === 'square') shape = H.rrect(2, 2, 0.15);
    else if (p.shape === 'text') { var rt = H.rasterText(p.text || 'A', 'TB Display, Inter, sans-serif', 40, 5); shape = H.maskToCS(rt).offset(0.25, 'Round', 2, 12); }
    else shape = CS.circle(1, 96);
    var b = shape.bounds(), bw = b.max[0] - b.min[0], bh = b.max[1] - b.min[1], sc = p.size / Math.max(bw, bh);
    shape = shape.translate([-(b.min[0] + b.max[0]) / 2, -(b.min[1] + b.max[1]) / 2]).scale([sc, sc]);
    var w = p.wall, e = p.edge, h = p.h, fl = Math.min(1.4, h * 0.2);
    function ring(off, z0, z1) { return H.ext(shape.offset(off, 'Round', 2, 16).subtract(shape), z0, z1); }
    var c = ring(e, 0, 0.8).add(ring((e + w) / 2, 0.79, 1.6)).add(ring(w, 1.59, h)).add(ring(w + p.fl, h - fl, h));
    return [{ name: H.lang === 'en' ? 'Cutter' : 'Ausstecher', mesh: H.toMesh(c) }];
  }
});
