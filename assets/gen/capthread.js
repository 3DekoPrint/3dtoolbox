/* Schraubdeckel mit Gewinde plus passende Dose (oder nur Deckel für vorhandenes Gewinde). */
GenKit.define({
  id: 'capthread', file: 'schraubdeckel',
  fname: function (p) { return 'deckel-' + p.dia; },
  meta: {
    cat: 'storage', slug: { de: 'schraubdeckel-generator', en: 'screw-cap-generator' },
    title: { de: 'Schraubdeckel-Generator: Dose mit Gewinde als STL/3MF (kostenlos)', en: 'Screw Cap Generator: threaded jar and lid as STL/3MF (free)' },
    h1: { de: 'Schraubdeckel & Dose', en: 'Screw cap & jar' },
    sub: { de: 'Dose mit Gewinde und passendem Deckel für Kleinteile, Gewürze oder Perlen. Durchmesser, Höhe und Gewinde einstellen und laden.', en: 'A threaded jar with a matching lid for small parts, spices or beads. Set diameter, height and thread, then download.' },
    desc: { de: 'Kostenloser Generator für Schraubdeckel und Dosen mit Gewinde zum 3D-Drucken. Passender Deckel mit Spiel, Rändelrand oder Sechskant, Export als STL und 3MF.', en: 'Free generator for 3D-printed screw caps and threaded jars. Matching lid with clearance, knurled or hex edge, export as STL and 3MF.' },
    tag: { de: 'Aufbewahren', en: 'Storage' },
    intro: { de: ['Gib den Außendurchmesser des Gewindes ein, dann Höhe und Wandstärke. Du bekommst Dose und Deckel als zwei Teile, die zusammenpassen.', 'Mit der Option „nur Deckel“ druckst du einen Deckel für ein vorhandenes Gewinde. Miss dazu den Gewinde-Außendurchmesser und die Steigung.'], en: ['Enter the outside diameter of the thread, then height and wall thickness. You get a jar and a lid as two parts that fit together.', 'With the “lid only” option you print a lid for an existing thread. Measure its outside diameter and pitch.'] },
    notes: { de: ['Deckel mit der Oberseite aufs Bett drucken, die Dose mit dem Boden unten.', 'Eine Steigung von 3 bis 4 mm druckt sich sauber und lässt sich leicht schrauben.', 'Läuft das Gewinde streng, erhöhe das Spiel auf 0,4 mm.', 'Für Lebensmittel nur lebensmittelechtes Filament nehmen. Gedruckte Teile sind nie dauerhaft dicht.'], en: ['Print the lid top-down on the bed and the jar bottom-down.', 'A pitch of 3 to 4 mm prints cleanly and turns easily.', 'If the thread binds, raise the clearance to 0.4 mm.', 'For food use only food-safe filament. Printed parts are never permanently sealed.'] },
    faq: { de: [['Ist die Dose wasserdicht?', 'Nicht zuverlässig. Gedruckte Schichten sind nie ganz dicht. Für Trockenes ist sie gut geeignet.'], ['Welche Steigung nehme ich?', 'Für Dosen bis 60 mm Durchmesser passen 3 mm, größere vertragen 4 bis 5 mm.']], en: [['Is the jar watertight?', 'Not reliably. Printed layers are never fully sealed. It suits dry contents well.'], ['Which pitch should I use?', 'For jars up to 60 mm diameter 3 mm works, larger ones take 4 to 5 mm.']] }
  },
  groups: [
    { title: { de: 'Gewinde & Maße', en: 'Thread & size' }, items: [
      { k: 'dia', t: 'num', min: 15, max: 150, step: 0.5, def: 40, unit: 'mm', label: { de: 'Gewinde-Außendurchmesser', en: 'Thread outside diameter' } },
      { k: 'pitch', t: 'num', min: 1.5, max: 8, step: 0.5, def: 3.5, unit: 'mm', label: { de: 'Steigung', en: 'Pitch' } },
      { k: 'tl', t: 'num', min: 6, max: 40, step: 1, def: 12, unit: 'mm', label: { de: 'Gewindelänge', en: 'Thread length' } },
      { k: 'cl', t: 'num', min: 0.1, max: 0.8, step: 0.05, def: 0.3, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } },
      { k: 'wall', t: 'num', min: 1.2, max: 6, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'lefty', t: 'bool', def: false, label: { de: 'Linksgewinde', en: 'Left-hand thread' } }
    ] },
    { title: { de: 'Dose & Deckel', en: 'Jar & lid' }, items: [
      { k: 'lidOnly', t: 'bool', def: false, label: { de: 'Nur Deckel (ohne Dose)', en: 'Lid only (no jar)' } },
      { k: 'jh', t: 'num', min: 10, max: 150, step: 1, def: 40, unit: 'mm', label: { de: 'Höhe der Dose (ohne Gewinde)', en: 'Jar height (without thread)' }, show: function (p) { return !p.lidOnly; } },
      { k: 'top', t: 'num', min: 1.2, max: 6, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Deckeldicke oben', en: 'Lid top thickness' } },
      { k: 'edge', t: 'sel', def: 'knurl', str: true, label: { de: 'Deckelrand', en: 'Lid edge' }, opts: [['round', { de: 'Glatt', en: 'Smooth' }], ['knurl', { de: 'Gerändelt', en: 'Knurled' }], ['hex', { de: 'Sechskant', en: 'Hex' }]] }
    ] }
  ],
  presets: [
    { label: { de: 'Perlendose 40 mm', en: 'Bead jar 40 mm' }, v: { dia: 40, pitch: 3.5, tl: 12, jh: 40, lidOnly: false } },
    { label: { de: 'Große Vorratsdose 80 mm', en: 'Large storage jar 80 mm' }, v: { dia: 80, pitch: 4.5, tl: 16, jh: 80, wall: 3, lidOnly: false } },
    { label: { de: 'Gewürzdose 55 mm', en: 'Spice jar 55 mm' }, v: { dia: 55, pitch: 4, tl: 14, jh: 70, lidOnly: false } },
    { label: { de: 'Nur Deckel 30 mm', en: 'Lid only 30 mm' }, v: { dia: 30, pitch: 3, tl: 10, lidOnly: true } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de', pitch = p.pitch, R = p.dia / 2, depth = Math.min(0.6 * pitch, R * 0.3);
    if (R - depth - p.wall < 3 && !p.lidOnly) throw new Error('Wand zu dick');
    function profile(Rr, dp, N) {
      var pts = [], k; for (k = 0; k < N; k++) { var th = -Math.PI + 2 * Math.PI * k / N, tri = 1 - Math.abs(th) / Math.PI, f = Math.max(0, Math.min(1, (tri - 0.15) / 0.7)); var r = Rr - dp + dp * f; pts.push([r * Math.cos(th), r * Math.sin(th)]); }
      return CS.ofPolygons([pts]);
    }
    function thread(Rr, len, z0) {
      var tw = 360 * len / pitch * (p.lefty ? -1 : 1), nd = Math.max(8, Math.ceil(Math.abs(tw) / 14));
      return Mf.extrude(profile(Rr, depth, 64), len, nd, tw, [1, 1]).translate([0, 0, z0]);
    }
    var out = [], capR = R + p.wall + p.cl, capH = p.tl + p.top, body;
    if (p.edge === 'hex') body = Mf.extrude(CS.circle(capR * 1.08 / Math.cos(Math.PI / 6) , 6), capH).intersect(Mf.cylinder(capH, capR * 1.15, capR * 1.15, 64, false));
    else if (p.edge === 'knurl') {
      var N = 96, pts = [], k; for (k = 0; k < N; k++) { var a = 2 * Math.PI * k / N, rr = capR * (1 - 0.025 * (0.5 + 0.5 * Math.cos(36 * a))); pts.push([rr * Math.cos(a), rr * Math.sin(a)]); }
      body = Mf.extrude(CS.ofPolygons([pts]), capH);
    } else body = Mf.cylinder(capH, capR, capR, 96, false);
    var cavity = thread(R + p.cl, p.tl + 1, -0.5).intersect(Mf.cylinder(p.tl + 1, R + p.cl + 1, R + p.cl + 1, 64, false).translate([0, 0, -0.5]));
    // Deckel liegt mit der Oberseite unten: Spiegeln, damit er flach druckbar ist
    var lid = body.subtract(cavity.translate([0, 0, p.top]));
    lid = lid.mirror([0, 0, 1]).translate([0, 0, capH]);
    out.push({ name: de ? 'Deckel' : 'Lid', mesh: H.toMesh(lid) });
    if (!p.lidOnly) {
      var wallR = Math.max(R - depth - p.wall, 1), neck = thread(R, p.tl, p.jh), outer = Mf.cylinder(p.jh + 0.3, R + 0.0, R + 0.0, 96, false);
      var jar = outer.add(neck).subtract(Mf.cylinder(p.jh + p.tl + 2, wallR, wallR, 64, false).translate([0, 0, p.top]));
      out.push({ name: de ? 'Dose' : 'Jar', mesh: H.toMesh(jar) });
    }
    return out;
  }
});
