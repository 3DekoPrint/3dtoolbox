/* Schnurwickler: Knochenform mit Kerben zum Aufwickeln von Leine, Kabel oder Schnur. */
GenKit.define({
  id: 'linewinder', file: 'schnurwickler',
  fname: function (p) { return 'wickler_' + p.len; },
  meta: {
    cat: 'camping', slug: { de: 'schnurwickler-generator', en: 'line-winder-generator' },
    title: { de: 'Schnurwickler-Generator: Wickler für Leine, Kabel und Angelschnur (kostenlos)', en: 'Line Winder Generator: winders for cord, cable and fishing line (free)' },
    h1: { de: 'Schnurwickler', en: 'Line winder' },
    sub: { de: 'Wickler für Zeltleinen, Kabel oder Angelschnur: Länge, Taille und Kerben einstellen, mit Schlitz für das Leinenende.', en: 'Winders for guylines, cables or fishing line: set length, waist and notches, with a slot for the line end.' },
    desc: { de: 'Kostenloser Schnurwickler-Generator für den 3D-Druck: Knochen- und Doppelhaken-Form mit Kerben und Schlitzen für Leine, Kabel und Angelschnur. Export als STL und 3MF.', en: 'Free line winder generator for 3D printing: bone and double-hook shapes with notches and slots for cord, cable and fishing line. Export as STL and 3MF.' },
    tag: { de: 'Camping', en: 'Camping' },
    intro: { de: ['Der Wickler hält Leine ordentlich aufgerollt. Das Ende rastet in einem Schlitz, damit nichts aufspringt.', 'Die Taille bestimmt, wie viel Leine passt: Je länger der Wickler und je schmaler die Taille, desto mehr Platz.'], en: ['The winder keeps line neatly coiled. The end clips into a slot so nothing unwinds.', 'The waist sets how much line fits: the longer the winder and the narrower the waist, the more room.'] },
    notes: { de: ['Flach drucken, keine Stützen.', '2 bis 3 mm Dicke reichen, dickere Wickler sind steifer.', 'Mit Kerben an den Enden hält die Leine auch beim Auswerfen und Stopfen in die Tasche.'], en: ['Print flat, no supports.', '2 to 3 mm thickness is enough, thicker winders are stiffer.', 'With notches at the ends the line stays put when you toss it into a bag.'] },
    faq: { de: [['Wie viel Leine passt?', 'Bei 120 mm Länge und 20 mm Taille etwa 15 bis 20 m Leine mit 3 mm Durchmesser.'], ['Kann ich ein Loch zum Aufhängen setzen?', 'Ja, das Aufhängeloch lässt sich zuschalten.']], en: [['How much line fits?', 'With 120 mm length and 20 mm waist about 15 to 20 m of 3 mm line.'], ['Can I add a hanging hole?', 'Yes, the hanging hole can be switched on.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'len', t: 'num', min: 60, max: 250, step: 5, def: 120, unit: 'mm', label: { de: 'Länge', en: 'Length' } },
      { k: 'w', t: 'num', min: 20, max: 80, step: 1, def: 40, unit: 'mm', label: { de: 'Breite der Enden', en: 'End width' } },
      { k: 'waist', t: 'num', min: 8, max: 50, step: 1, def: 18, unit: 'mm', label: { de: 'Breite der Taille', en: 'Waist width' } },
      { k: 'th', t: 'num', min: 2, max: 8, step: 0.5, def: 3, unit: 'mm', label: { de: 'Dicke', en: 'Thickness' } },
      { k: 'notch', t: 'bool', def: true, label: { de: 'Schlitze für das Leinenende', en: 'Slots for the line end' } },
      { k: 'hang', t: 'bool', def: true, label: { de: 'Aufhängeloch', en: 'Hanging hole' } }
    ] }
  ],
  presets: [
    { label: { de: 'Zeltleine 120 mm', en: 'Guyline 120 mm' }, v: { len: 120, w: 40, waist: 18, th: 3 } },
    { label: { de: 'Kabelwickler klein', en: 'Small cable winder' }, v: { len: 80, w: 28, waist: 12, th: 2.5 } },
    { label: { de: 'Großer Wickler 200 mm', en: 'Large winder 200 mm' }, v: { len: 200, w: 60, waist: 30, th: 4 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, de = H.lang === 'de', L = p.len, W = p.w, t = p.th, ww = Math.min(p.waist, W - 6), lobe = Math.min(L / 3, W);
    var body = H.ext(H.rrect(L, ww, ww / 2), 0, t);
    [-1, 1].forEach(function (s) { body = body.add(H.ext(H.rrect(lobe, W, Math.min(W / 2, lobe / 2)), 0, t).translate([s * (L / 2 - lobe / 2), 0, 0])); });
    if (p.notch) [-1, 1].forEach(function (s) { body = body.subtract(H.box(s * (L / 2 - lobe / 2) - 1.2, (s > 0 ? 1 : -1) * 0 + W / 2 - 8, -1, s * (L / 2 - lobe / 2) + 1.2, W / 2 + 1, t + 1).translate([0, 0, 0])); });
    if (p.hang) body = body.subtract(H.cyl(0, 0, -1, t + 1, Math.min(5, ww * 0.35), 24));
    return [{ name: de ? 'Wickler' : 'Winder', mesh: H.toMesh(body) }];
  }
});
