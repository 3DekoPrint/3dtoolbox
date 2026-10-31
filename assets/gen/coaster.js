/* Untersetzer: rund, quadratisch oder sechseckig, mit Rand, Muster und Text. */
GenKit.define({
  id: 'coaster', file: 'untersetzer',
  fname: function (p) { return p.shape + p.size; },
  meta: {
    cat: 'home', slug: { de: 'untersetzer-generator', en: 'coaster-generator' },
    title: { de: 'Untersetzer-Generator: Coaster nach Maß als STL/3MF (kostenlos)', en: 'Coaster Generator: custom coasters as STL/3MF (free)' },
    h1: { de: 'Untersetzer', en: 'Coaster' },
    sub: { de: 'Untersetzer für Gläser und Tassen: Form, Rand, Muster und Text einstellen, mehrere Stück auf einmal.', en: 'Coasters for glasses and mugs: set shape, rim, pattern and text, several at once.' },
    desc: { de: 'Kostenloser Untersetzer-Generator: runde, quadratische und sechseckige Coaster mit Rand, Waben- oder Ringmuster und eingravierter Schrift. Export als STL und 3MF.', en: 'Free coaster generator: round, square and hex coasters with rim, honeycomb or ring pattern and engraved text. Export as STL and 3MF.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Wähle Form und Größe, einen erhöhten Rand gegen Kondenswasser und ein Muster auf der Fläche. In die Mitte kannst du einen Namen oder ein Wort eingravieren.', 'Bis zu 8 Untersetzer ergeben ein Set in einer Datei.'], en: ['Pick shape and size, a raised rim against condensation and a pattern on the surface. Engrave a name or word in the centre.', 'Up to 8 coasters make a set in one file.'] },
    notes: { de: ['Flach drucken, die Fläche zeigt nach oben. Das Muster ist graviert und braucht keine Stützen.', 'Für heiße Getränke PETG nehmen, PLA wird ab etwa 55 °C weich.', 'Ein Streifen Filz oder Silikon unter dem Untersetzer schützt den Tisch.'], en: ['Print flat with the surface up. The pattern is engraved and needs no supports.', 'Use PETG for hot drinks; PLA softens from about 55 °C.', 'A strip of felt or silicone under the coaster protects the table.'] },
    faq: { de: [['Welche Größe passt?', 'Für Tassen und Gläser 90 bis 110 mm, für Dosen 85 mm.'], ['Kann ich Schrift gravieren?', 'Ja, einfach Text eingeben. Die Schrift ist 0,8 mm tief. Kurze Wörter sehen am besten aus.']], en: [['Which size fits?', 'For mugs and glasses 90 to 110 mm, for cans 85 mm.'], ['Can I engrave text?', 'Yes, just type text. The text is 0.8 mm deep. Short words look best.']] }
  },
  groups: [
    { title: { de: 'Form', en: 'Shape' }, items: [
      { k: 'shape', t: 'sel', def: 'round', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['round', { de: 'Rund', en: 'Round' }], ['square', { de: 'Quadratisch', en: 'Square' }], ['hex', { de: 'Sechseckig', en: 'Hexagonal' }]] },
      { k: 'size', t: 'num', min: 60, max: 150, step: 1, def: 100, unit: 'mm', label: { de: 'Größe', en: 'Size' } },
      { k: 't', t: 'num', min: 2, max: 8, step: 0.2, def: 4, unit: 'mm', label: { de: 'Dicke', en: 'Thickness' } },
      { k: 'qty', t: 'int', min: 1, max: 8, step: 1, def: 1, label: { de: 'Stückzahl', en: 'Quantity' } }
    ] },
    { title: { de: 'Rand, Muster & Text', en: 'Rim, pattern & text' }, items: [
      { k: 'rim', t: 'bool', def: true, label: { de: 'Erhöhter Rand', en: 'Raised rim' } },
      { k: 'rimh', t: 'num', min: 0.8, max: 5, step: 0.2, def: 1.6, unit: 'mm', label: { de: 'Höhe des Randes', en: 'Rim height' }, show: function (p) { return p.rim; } },
      { k: 'pattern', t: 'sel', def: 'hex', str: true, label: { de: 'Muster', en: 'Pattern' }, opts: [['none', { de: 'Keines', en: 'None' }], ['hex', { de: 'Waben', en: 'Honeycomb' }], ['rings', { de: 'Ringe', en: 'Rings' }]] },
      { k: 'text', t: 'txt', def: '', max: 14, label: { de: 'Gravur (leer = keine)', en: 'Engraving (empty = none)' } },
      { k: 'th', t: 'num', min: 6, max: 30, step: 1, def: 14, unit: 'mm', label: { de: 'Schrifthöhe', en: 'Text height' }, show: function (p) { return !!p.text; } }
    ] }
  ],
  presets: [
    { label: { de: 'Rund 100 mm mit Waben', en: 'Round 100 mm with honeycomb' }, v: { shape: 'round', size: 100, pattern: 'hex' } },
    { label: { de: 'Sechseck 100 mm schlicht', en: 'Hex 100 mm plain' }, v: { shape: 'hex', size: 100, pattern: 'none' } },
    { label: { de: 'Quadrat 95 mm mit Ringen', en: 'Square 95 mm with rings' }, v: { shape: 'square', size: 95, pattern: 'rings' } },
    { label: { de: 'Dosen-Untersetzer 85 mm', en: 'Can coaster 85 mm' }, v: { shape: 'round', size: 85, pattern: 'rings' } },
    { label: { de: 'Mit Name (Beispiel)', en: 'With name (example)' }, v: { shape: 'round', size: 100, pattern: 'none', text: 'MANUEL', th: 14 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, R = p.size / 2, t = p.t, rw = 3;
    function sec(r) { if (p.shape === 'round') return CS.circle(r, 96); if (p.shape === 'square') return H.rrect(2 * r, 2 * r, 6); return CS.circle(r / Math.cos(Math.PI / 6), 6); }
    var inner = sec(R - rw), body = H.ext(sec(R), 0, t + (p.rim ? p.rimh : 0));
    if (p.rim) body = body.subtract(H.ext(inner, t, t + p.rimh + 1));
    var depth = 0.8, cuts = [], pr = R - rw - 3;
    if (p.pattern === 'hex') {
      var c = 7, b = 1.4, rr = c / Math.sqrt(3), dx = c + b, dy = dx * Math.sqrt(3) / 2, polys = [], row, k;
      for (row = -14; row <= 14; row++) for (k = -14; k <= 14; k++) {
        var x = k * dx + (row % 2 ? dx / 2 : 0), y = row * dy;
        if (Math.sqrt(x * x + y * y) + rr > pr) continue; if (p.shape === 'square' && (Math.abs(x) + rr > pr || Math.abs(y) + rr > pr)) continue;
        var o = [], q; for (q = 0; q < 6; q++) { var a = Math.PI / 6 + q * Math.PI / 3; o.push([x + rr * Math.cos(a), y + rr * Math.sin(a)]); } polys.push(o);
      }
      if (polys.length) cuts.push(H.ext(CS.ofPolygons(polys), t - depth, t + 1));
    } else if (p.pattern === 'rings') {
      var r0 = 8, rs = [];
      for (var rr2 = r0; rr2 < pr; rr2 += 5) rs.push(CS.circle(rr2 + 0.7, 80).subtract(CS.circle(rr2 - 0.7, 80)));
      rs.forEach(function (c2) { cuts.push(H.ext(c2.intersect(sec(Math.min(pr + 1, R - rw - 1))), t - depth, t + 1)); });
    }
    if (p.text) {
      var rt = H.rasterText(p.text, 'TB Display, Inter, sans-serif', p.th, 6), tcs = H.maskToCS(rt), bb = tcs.bounds(), tw = bb.max[0] - bb.min[0], sc = Math.min(1, (2 * pr * 0.9) / tw);
      tcs = tcs.translate([-(bb.min[0] + bb.max[0]) / 2, -(bb.min[1] + bb.max[1]) / 2]).scale([sc, sc]);
      cuts.push(H.ext(tcs, t - depth, t + 1));
    }
    if (cuts.length) body = body.subtract(Mf.union(cuts));
    var one = H.toMesh(body), out = [], i;
    for (i = 0; i < Math.round(p.qty); i++) out.push({ name: (H.lang === 'en' ? 'Coaster ' : 'Untersetzer ') + (i + 1), mesh: one });
    return out;
  }
});
