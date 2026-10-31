/* Schraube & Mutter: echtes Gewinde (Steigung frei), Sechskant-, Rändel- oder Stangenkopf, passende Mutter und Scheibe. */
(function () {
  var ISO = [['M3', 3, 0.5, 5.5], ['M4', 4, 0.7, 7], ['M5', 5, 0.8, 8], ['M6', 6, 1.0, 10], ['M8', 8, 1.25, 13], ['M10', 10, 1.5, 16], ['M12', 12, 1.75, 18], ['M16', 16, 2.0, 24], ['M20', 20, 2.5, 30], ['M24', 24, 3.0, 36]];
  function afFor(d) { var best = ISO[0]; ISO.forEach(function (r) { if (Math.abs(r[1] - d) < Math.abs(best[1] - d)) best = r; }); return Math.abs(best[1] - d) < 0.6 ? best[3] : Math.round(d * 1.6 * 2) / 2; }
  GenKit.define({
    id: 'bolts', file: 'schraube',
    fname: function (p) { return 'M' + p.major + 'x' + p.length + (p.left ? '-links' : ''); },
    meta: {
      cat: 'workshop', slug: { de: 'schrauben-und-muttern-generator', en: 'bolt-and-nut-generator' },
      title: { de: 'Schrauben- & Muttern-Generator: Gewinde zum 3D-Druck (kostenlos)', en: 'Bolt & Nut Generator: threads for 3D printing (free)' },
      h1: { de: 'Schrauben & Muttern', en: 'Bolts & Nuts' },
      sub: { de: 'Druckbare Schrauben, Muttern und Unterlegscheiben mit echtem Gewinde: ISO-Größen M3 bis M24 oder eigene Maße, auch Linksgewinde und Gewindestangen.', en: 'Printable bolts, nuts and washers with a real thread: ISO sizes M3 to M24 or your own dimensions, including left-hand threads and threaded rods.' },
      desc: { de: 'Kostenloser Generator für druckbare Schrauben, Muttern, Unterlegscheiben und Gewindestangen (M3 bis M24, Linksgewinde, eigene Steigung). Export als STL und 3MF, direkt im Browser.', en: 'Free generator for printable bolts, nuts, washers and threaded rods (M3 to M24, left-hand thread, custom pitch). Export as STL and 3MF, right in your browser.' },
      tag: { de: 'Werkstatt', en: 'Workshop' },
      intro: { de: ['Wähle eine ISO-Größe oder gib Durchmesser und Steigung selbst ein. Schraube und Mutter nutzen dasselbe Gewindeprofil und passen mit dem eingestellten Spiel zusammen. Mit „Linksgewinde“ drehst du die Steigungsrichtung um.', 'Gedruckte Schrauben sind ideal für Prototypen, Deko, Lehrmodelle, Verschlüsse und Halterungen. Für tragende oder sicherheitsrelevante Verbindungen ersetzen sie keine Stahlschrauben.'],
        en: ['Choose an ISO size or enter diameter and pitch yourself. Bolt and nut use the same thread profile and fit together with the clearance you set. “Left-hand thread” reverses the direction.', 'Printed bolts are ideal for prototypes, decoration, teaching models, closures and mounts. They do not replace steel screws in load-bearing or safety-relevant joints.'] },
      notes: { de: ['Schraube mit dem Kopf nach unten drucken, Mutter flach, jeweils ohne Stützen.', '0,12 bis 0,16 mm Schichthöhe und 3 Wände liefern saubere Gewindeflanken, 30 % Füllung reicht.', 'PETG hält wiederholtes Anziehen besser aus als PLA.', 'Passt die Mutter zu stramm, erhöhe das Spiel um 0,05 mm. Ist sie zu locker, verringere es.', 'Kleine Gewinde (M3, M4) gelingen mit einer 0,25-mm-Düse deutlich besser.'],
        en: ['Print the bolt head down and the nut flat, both without supports.', '0.12 to 0.16 mm layer height and 3 walls give clean thread flanks, 30 % infill is enough.', 'PETG withstands repeated tightening better than PLA.', 'If the nut is too tight, raise the clearance by 0.05 mm. If it is too loose, lower it.', 'Small threads (M3, M4) work much better with a 0.25 mm nozzle.'] },
      faq: { de: [['Welche Größen sind möglich?', 'Die ISO-Presets von M3 bis M24 mit Regelgewinde. Du kannst Durchmesser (3 bis 60 mm), Steigung und Länge aber auch frei einstellen, zum Beispiel für Grobgewinde an Flaschen oder Deckeln.'], ['Wofür ist das Spiel?', 'Gedruckte Gewinde brauchen etwas Luft, damit Schraube und Mutter zusammenlaufen. 0,2 bis 0,3 mm sind ein guter Start für eine 0,4-mm-Düse.'], ['Kann ich eine Gewindestange drucken?', 'Ja. Wähle als Kopf „Stange“, dann entsteht nur das Gewinde. Eine Mutter dazu kannst du gleich mit erzeugen.']],
        en: [['Which sizes are possible?', 'The ISO presets from M3 to M24 with coarse pitch. You can also set diameter (3 to 60 mm), pitch and length freely, for example for coarse threads on bottles or lids.'], ['What is the clearance for?', 'Printed threads need some air so bolt and nut can turn together. 0.2 to 0.3 mm is a good start for a 0.4 mm nozzle.'], ['Can I print a threaded rod?', 'Yes. Choose “Rod” as the head and only the thread is generated. You can create a matching nut at the same time.']] }
    },
    groups: [
      { title: { de: 'Gewinde', en: 'Thread' }, items: [
        { k: 'major', t: 'num', min: 3, max: 60, step: 0.5, def: 8, unit: 'mm', label: { de: 'Gewinde-Durchmesser', en: 'Thread diameter' } },
        { k: 'pitch', t: 'num', min: 0.4, max: 6, step: 0.05, def: 1.25, unit: 'mm', label: { de: 'Steigung', en: 'Pitch' } },
        { k: 'length', t: 'num', min: 4, max: 200, step: 1, def: 30, unit: 'mm', label: { de: 'Länge des Gewindes', en: 'Thread length' } },
        { k: 'cl', t: 'num', min: 0.05, max: 0.8, step: 0.05, def: 0.25, unit: 'mm', label: { de: 'Spiel für die Mutter', en: 'Clearance for the nut' } },
        { k: 'left', t: 'bool', def: false, label: { de: 'Linksgewinde', en: 'Left-hand thread' } }
      ] },
      { title: { de: 'Kopf, Mutter & Scheibe', en: 'Head, nut & washer' }, items: [
        { k: 'head', t: 'sel', def: 'hex', str: true, label: { de: 'Kopf', en: 'Head' }, opts: [['hex', { de: 'Sechskant', en: 'Hex' }], ['thumb', { de: 'Rändelkopf (Flügelschraube)', en: 'Knurled thumb head' }], ['rod', { de: 'Stange (ohne Kopf)', en: 'Rod (no head)' }]] },
        { k: 'af', t: 'num', min: 0, max: 100, step: 0.5, def: 0, unit: 'mm', label: { de: 'Schlüsselweite (0 = automatisch)', en: 'Across flats (0 = auto)' }, show: function (p) { return p.head !== 'thumb'; } },
        { k: 'hh', t: 'num', min: 0, max: 40, step: 0.5, def: 0, unit: 'mm', label: { de: 'Kopfhöhe (0 = automatisch)', en: 'Head height (0 = auto)' }, show: function (p) { return p.head !== 'rod'; } },
        { k: 'nut', t: 'bool', def: true, label: { de: 'Passende Mutter dazu', en: 'Matching nut' } },
        { k: 'nh', t: 'num', min: 0, max: 40, step: 0.5, def: 0, unit: 'mm', label: { de: 'Muttern-Höhe (0 = automatisch)', en: 'Nut height (0 = auto)' }, show: function (p) { return p.nut; } },
        { k: 'wash', t: 'bool', def: false, label: { de: 'Unterlegscheibe dazu', en: 'Matching washer' } }
      ] }
    ],
    presets: ISO.map(function (r) { return { label: { de: r[0] + ' – Steigung ' + r[2] + ' mm', en: r[0] + ' – pitch ' + r[2] + ' mm' }, v: { major: r[1], pitch: r[2], length: Math.max(10, Math.round(r[1] * 4 / 5) * 5), af: 0, hh: 0, nh: 0 } }; }),
    build: function (p, H) {
      var m = H.M, Mf = m.Manifold, CS = m.CrossSection, d = p.major, pitch = p.pitch, de = H.lang === 'de';
      function profile(R, depth, N) {
        var pts = [], k; for (k = 0; k < N; k++) { var th = -Math.PI + 2 * Math.PI * k / N, tri = 1 - Math.abs(th) / Math.PI, f = Math.max(0, Math.min(1, (tri - 0.15) / 0.7)); var r = R - depth + depth * f; pts.push([r * Math.cos(th), r * Math.sin(th)]); }
        return CS.ofPolygons([pts]);
      }
      function thread(R, depth, len, z0) {
        var tw = 360 * len / pitch * (p.left ? -1 : 1), nd = Math.max(8, Math.ceil(Math.abs(tw) / 14));
        return Mf.extrude(profile(R, depth, 56), len, nd, tw, [1, 1]).translate([0, 0, z0]);
      }
      var depth = Math.min(0.6 * pitch, d * 0.3), R = d / 2;
      if (R - depth < 0.5) throw new Error('zu fein');
      var af = p.af > 0 ? p.af : afFor(d), Rc = af / Math.sqrt(3), hh = p.hh > 0 ? p.hh : Math.max(2, d * 0.65), c = Math.min(pitch * 0.9, R / 3);
      function hexBody(h, both) {
        var r0 = af / 2 * 0.97, Rb = Rc * 1.03, cc = Math.min(h / 3, (Rb - r0) * 0.8 + 0.4);
        var pts = both ? [[0, 0], [r0, 0], [Rb, cc], [Rb, h - cc], [r0, h], [0, h]] : [[0, 0], [Rb, 0], [Rb, h - cc], [r0, h], [0, h]];
        return Mf.revolve(CS.ofPolygons([pts]), 6).rotate([0, 0, 0]);
      }
      function hexPrism(h) { return Mf.extrude(CS.circle(Rc, 6), h); }
      var out = [], bolt;
      var headH = p.head === 'rod' ? 0 : (p.head === 'thumb' ? Math.max(hh, 4) : hh), ov = headH ? 0.6 : 0, zs = headH - ov, lenT = p.length + ov, cH = c + 0.5;
      function tipMask() { return Mf.cylinder(Math.max(0.1, lenT - cH), R + 0.5, R + 0.5, 64, false).translate([0, 0, zs]).add(Mf.cylinder(cH, R + 0.5, Math.max(0.3, R - c), 64, false).translate([0, 0, zs + lenT - cH])); }
      var th = thread(R, depth, lenT, zs).intersect(tipMask());
      if (p.head === 'hex') bolt = hexPrism(hh).intersect(hexBody(hh, false)).add(th);
      else if (p.head === 'thumb') {
        var RT = Math.max(7, d * 1.35), N = 120, pts = [], k; for (k = 0; k < N; k++) { var a2 = 2 * Math.PI * k / N, rr = RT * (1 - 0.07 * (0.5 + 0.5 * Math.cos(20 * a2))); pts.push([rr * Math.cos(a2), rr * Math.sin(a2)]); }
        bolt = Mf.extrude(CS.ofPolygons([pts]), headH).add(th);
      } else bolt = th;
      out.push({ name: de ? 'Schraube' : 'Bolt', mesh: H.toMesh(bolt) });
      if (p.nut) {
        var nh = p.nh > 0 ? p.nh : Math.max(2.5, d * 0.8), hole = thread(R + p.cl, depth, nh + 2, -1);
        var nutBody = (p.head === 'thumb' ? hexPrism(nh) : hexPrism(nh).intersect(hexBody(nh, true))).subtract(hole);
        out.push({ name: de ? 'Mutter' : 'Nut', mesh: H.toMesh(nutBody) });
      }
      if (p.wash) {
        var wt = Math.max(0.8, d * 0.2), w = Mf.cylinder(wt, d, d, 64, false).subtract(Mf.cylinder(wt + 2, R + p.cl + 0.3, R + p.cl + 0.3, 48, false).translate([0, 0, -1]));
        out.push({ name: de ? 'Unterlegscheibe' : 'Washer', mesh: H.toMesh(w) });
      }
      return out;
    }
  });
})();
