/* Vase: Stern- oder Kreisquerschnitt mit Verdrehung, Bauch und Verjüngung. Als Körper mit Boden und Wand. */
GenKit.define({
  id: 'vase', file: 'vase',
  fname: function (p) { return 'h' + p.h + 'd' + p.bd; },
  meta: {
    cat: 'home', slug: { de: 'vasen-generator', en: 'vase-generator' },
    title: { de: 'Vasen-Generator: verdrehte Vasen nach Maß als STL/3MF (kostenlos)', en: 'Vase Generator: twisted vases made to size as STL/3MF (free)' },
    h1: { de: 'Vasen-Generator', en: 'Vase Generator' },
    sub: { de: 'Verdrehte Sternvasen und Deko-Vasen: Höhe, Durchmesser, Bauch, Zacken und Drehung einstellen, STL oder 3MF laden.', en: 'Twisted star vases and decor vases: set height, diameter, belly, points and twist, download STL or 3MF.' },
    desc: { de: 'Kostenloser Vasen-Generator: verdrehte Vasen mit Sternquerschnitt, Bauch und Verjüngung in jeder Größe. Export als STL und 3MF, direkt im Browser.', en: 'Free vase generator: twisted vases with star cross-section, belly and taper in any size. Export as STL and 3MF, right in your browser.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Vasen gehören zu den beliebtesten Deko-Drucken. Hier formst du den Querschnitt (Kreis oder Stern mit 3 bis 12 Zacken), die Verdrehung und die Silhouette mit Bauch und Verjüngung.', 'Die Vase hat einen Boden und eine feste Wand. Sie ist nur für Trockenblumen oder mit einem Glas im Inneren gedacht, weil gedruckte Wände nicht immer wasserdicht sind.'], en: ['Vases are among the most popular decor prints. Shape the cross-section (circle or star with 3 to 12 points), the twist and the silhouette with belly and taper.', 'The vase has a base and a solid wall. It is meant for dried flowers or with a glass inside, because printed walls are not always watertight.'] },
    notes: { de: ['Stehend drucken. Die Verdrehung ist selbsttragend, solange sie nicht zu stark ist (bis etwa 270°).', 'Für Wasser: ein Glas einsetzen oder Außenwand mit Epoxid versiegeln.', 'Mit 0,6-mm-Düse und 2 Wänden sieht die Struktur besonders gut aus. Das Spiralvasen-Profil deines Slicers funktioniert ebenfalls, wenn du die Wand auf eine Linie reduzierst.'], en: ['Print standing up. The twist is self-supporting as long as it is not too strong (up to about 270°).', 'For water: insert a glass or seal the outside with epoxy.', 'With a 0.6 mm nozzle and 2 walls the pattern looks best. Your slicer’s spiral vase profile also works if you reduce the wall to a single line.'] },
    faq: { de: [['Ist die Vase wasserdicht?', 'Nicht zuverlässig. Setze ein Glas ein oder versiegle die Innenseite.'], ['Wie stark darf die Drehung sein?', 'Bis etwa 270° druckt die Vase ohne Stützen. Bei mehr Drehung können Überhänge entstehen.']], en: [['Is the vase waterproof?', 'Not reliably. Use a glass insert or seal the inside.'], ['How much twist is possible?', 'Up to about 270° prints without supports. More twist may cause overhangs.']] }
  },
  groups: [
    { title: { de: 'Form', en: 'Shape' }, items: [
      { k: 'h', t: 'num', min: 40, max: 300, step: 1, def: 150, unit: 'mm', label: { de: 'Höhe', en: 'Height' } },
      { k: 'bd', t: 'num', min: 30, max: 200, step: 1, def: 70, unit: 'mm', label: { de: 'Durchmesser unten', en: 'Diameter at base' } },
      { k: 'td', t: 'num', min: 20, max: 200, step: 1, def: 60, unit: 'mm', label: { de: 'Durchmesser oben', en: 'Diameter at top' } },
      { k: 'belly', t: 'num', min: -30, max: 60, step: 1, def: 15, unit: 'mm', label: { de: 'Bauch (positiv) oder Taille (negativ)', en: 'Belly (positive) or waist (negative)' } }
    ] },
    { title: { de: 'Muster', en: 'Pattern' }, items: [
      { k: 'sides', t: 'int', min: 3, max: 12, step: 1, def: 6, label: { de: 'Anzahl Zacken', en: 'Number of points' } },
      { k: 'star', t: 'num', min: 0, max: 40, step: 1, def: 15, unit: '%', label: { de: 'Zackentiefe (0 = Vieleck)', en: 'Point depth (0 = polygon)' } },
      { k: 'twist', t: 'num', min: -360, max: 360, step: 5, def: 120, unit: '°', label: { de: 'Verdrehung', en: 'Twist' } },
      { k: 'wall', t: 'num', min: 1.2, max: 6, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'floor', t: 'num', min: 1.2, max: 8, step: 0.2, def: 3, unit: 'mm', label: { de: 'Bodendicke', en: 'Base thickness' } }
    ] }
  ],
  presets: [
    { label: { de: 'Sternvase (6 Zacken, 120°)', en: 'Star vase (6 points, 120°)' }, v: { sides: 6, star: 15, twist: 120, belly: 15 } },
    { label: { de: 'Schlanke Kerzen-Vase', en: 'Slim taper vase' }, v: { h: 200, bd: 55, td: 40, belly: 5, sides: 5, star: 10, twist: 90 } },
    { label: { de: 'Rundbauch-Vase', en: 'Round belly vase' }, v: { h: 140, bd: 60, td: 50, belly: 35, sides: 12, star: 0, twist: 0 } },
    { label: { de: 'Spiral-Vase (8 Zacken, 270°)', en: 'Spiral vase (8 points, 270°)' }, v: { sides: 8, star: 20, twist: 270, belly: 10 } },
    { label: { de: 'Mini-Vase', en: 'Mini vase' }, v: { h: 80, bd: 45, td: 38, belly: 8, sides: 6, star: 12, twist: 60 } }
  ],
  build: function (p, H) {
    /* Exaktes Ringnetz: außen, innen, Boden und Rand teilen sich ihre Eckpunkte, daher garantiert geschlossen. */
    var n = Math.round(p.sides), pts = 2 * n, L = Math.max(24, Math.min(120, Math.round(p.h / 1.6))), V = [], T = [], k, i;
    function rad(t) { return (p.bd + (p.td - p.bd) * t) / 2 + p.belly / 2 * Math.sin(Math.PI * t); }
    function ring(z, r, rot) { var base = V.length / 3; for (i = 0; i < pts; i++) { var a = rot + 2 * Math.PI * i / pts, rr = r * (i % 2 ? 1 - p.star / 100 : 1); V.push(rr * Math.cos(a), rr * Math.sin(a), z); } return base; }
    function rot(t) { return p.twist * t * Math.PI / 180; }
    var c0 = V.length / 3; V.push(0, 0, 0);
    var O = [], I = [];
    for (k = 0; k <= L; k++) { var t = k / L; O.push(ring(p.h * t, Math.max(3, rad(t)), rot(t))); }
    var cf = V.length / 3; V.push(0, 0, p.floor);
    for (k = 0; k <= L; k++) { var z = p.floor + (p.h - p.floor) * k / L, tt = z / p.h; I.push(ring(z, Math.max(1.5, rad(tt) - p.wall), rot(tt))); }
    for (i = 0; i < pts; i++) {
      var j = (i + 1) % pts;
      T.push(c0, O[0] + j, O[0] + i);
      T.push(cf, I[0] + i, I[0] + j);
      T.push(O[L] + i, O[L] + j, I[L] + j, O[L] + i, I[L] + j, I[L] + i);
      for (k = 0; k < L; k++) {
        T.push(O[k] + i, O[k] + j, O[k + 1] + j, O[k] + i, O[k + 1] + j, O[k + 1] + i);
        T.push(I[k] + i, I[k + 1] + i, I[k + 1] + j, I[k] + i, I[k + 1] + j, I[k] + j);
      }
    }
    return [{ name: H.lang === 'en' ? 'Vase' : 'Vase', mesh: { v: new Float64Array(V), i: new Uint32Array(T) } }];
  }
});
