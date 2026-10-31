/* Innensechskant-Griff: Griff für Inbusschlüssel, gerade oder T-Form, mit Rillen. */
GenKit.define({
  id: 'hexgrip', file: 'inbus-griff',
  fname: function (p) { return p.style + p.key; },
  meta: {
    cat: 'workshop', slug: { de: 'inbus-griff-generator', en: 'hex-key-handle-generator' },
    title: { de: 'Inbus-Griff-Generator: Griff für Innensechskant als STL/3MF (kostenlos)', en: 'Hex Key Handle Generator: handle for Allen keys as STL/3MF (free)' },
    h1: { de: 'Inbus-Griff', en: 'Hex Key Handle' },
    sub: { de: 'Griffe für Inbusschlüssel und Bits: Schlüsselweite, Form und Griffdicke einstellen, STL oder 3MF laden.', en: 'Handles for Allen keys and bits: set key size, shape and grip thickness, download STL or 3MF.' },
    desc: { de: 'Kostenloser Inbus-Griff-Generator: gerade oder T-förmige Griffe für Innensechskantschlüssel von 1,5 bis 10 mm, mit Rillen und einstellbarer Passung. Export als STL und 3MF.', en: 'Free hex key handle generator: straight or T-shaped handles for Allen keys from 1.5 to 10 mm, with flutes and adjustable fit. Export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Ein Inbusschlüssel liegt nur selten gut in der Hand. Der Griff macht daraus ein Werkzeug mit mehr Hebel und weniger Druckstellen. Gib die Schlüsselweite ein, wähle gerade oder T-Form und die Griffdicke.', 'Das Sechskantloch bekommt ein kleines Spiel, das du anpassen kannst, damit der Schlüssel fest, aber austauschbar sitzt.'], en: ['An Allen key rarely sits well in the hand. The handle turns it into a tool with more leverage and fewer pressure marks. Enter the key size, choose straight or T shape and the grip thickness.', 'The hex hole gets a small clearance you can adjust so the key sits firmly but stays swappable.'] },
    notes: { de: ['Der Griff steht aufrecht mit dem Loch nach oben, ohne Stützen. T-Griffe liegend drucken (Querstück unten).', 'Für Hebelkraft 4 Wände und 40 % Füllung, PETG ist zäher als PLA.', 'Sitzt der Schlüssel zu lose, verringere das Spiel um 0,05 mm, bei zu festem Sitz erhöhe es.'], en: ['The handle stands upright with the hole facing up, no supports. Print T handles lying down (crossbar at the bottom).', 'For leverage use 4 walls and 40 % infill; PETG is tougher than PLA.', 'If the key is too loose reduce the clearance by 0.05 mm; if too tight raise it.'] },
    faq: { de: [['Passt das für Bits?', 'Ja, 1/4-Zoll-Bits haben 6,35 mm Schlüsselweite. Stelle die Schlüsselweite auf 6,35 und das Spiel auf 0,1 mm.'], ['Wie tief ist das Loch?', 'Standardmäßig 25 mm. Für lange Schlüssel erhöhst du die Tiefe, bis die Spitze am Boden anliegt.']], en: [['Does it fit bits?', 'Yes, 1/4 inch bits have 6.35 mm across flats. Set the key size to 6.35 and the clearance to 0.1 mm.'], ['How deep is the hole?', '25 mm by default. For long keys raise the depth until the tip touches the bottom.']] }
  },
  groups: [
    { title: { de: 'Schlüssel', en: 'Key' }, items: [
      { k: 'key', t: 'num', min: 1.5, max: 14, step: 0.05, def: 4, unit: 'mm', label: { de: 'Schlüsselweite', en: 'Key size (across flats)' } },
      { k: 'cl', t: 'num', min: 0, max: 0.4, step: 0.02, def: 0.12, unit: 'mm', label: { de: 'Spiel im Sechskant', en: 'Hex clearance' } },
      { k: 'depth', t: 'num', min: 8, max: 60, step: 1, def: 25, unit: 'mm', label: { de: 'Tiefe des Lochs', en: 'Hole depth' } }
    ] },
    { title: { de: 'Griff', en: 'Handle' }, items: [
      { k: 'style', t: 'sel', def: 'straight', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['straight', { de: 'Gerade', en: 'Straight' }], ['t', { de: 'T-Griff', en: 'T handle' }]] },
      { k: 'gd', t: 'num', min: 12, max: 40, step: 0.5, def: 22, unit: 'mm', label: { de: 'Griffdurchmesser', en: 'Grip diameter' } },
      { k: 'len', t: 'num', min: 30, max: 120, step: 1, def: 60, unit: 'mm', label: { de: 'Länge', en: 'Length' } },
      { k: 'bar', t: 'num', min: 50, max: 160, step: 1, def: 90, unit: 'mm', label: { de: 'Länge des T-Querstücks', en: 'T crossbar length' }, show: function (p) { return p.style === 't'; } },
      { k: 'n', t: 'int', min: 0, max: 16, step: 1, def: 8, label: { de: 'Rillen (0 = glatt)', en: 'Flutes (0 = smooth)' } }
    ] }
  ],
  presets: [
    { label: { de: '4 mm gerade', en: '4 mm straight' }, v: { key: 4, style: 'straight' } },
    { label: { de: '5 mm T-Griff', en: '5 mm T handle' }, v: { key: 5, style: 't', gd: 20, bar: 90 } },
    { label: { de: '3 mm klein', en: '3 mm small' }, v: { key: 3, style: 'straight', gd: 18, len: 50 } },
    { label: { de: '6 mm kräftig', en: '6 mm sturdy' }, v: { key: 6, style: 'straight', gd: 26, len: 70 } },
    { label: { de: '1/4-Zoll-Bit-Halter', en: '1/4 inch bit holder' }, v: { key: 6.35, cl: 0.1, style: 'straight', gd: 24, len: 65 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, R = p.gd / 2, n = Math.round(p.n), i, L = p.len;
    var body = Mf.cylinder(L, R, R * 0.92, 72, false).add(Mf.cylinder(3, R * 0.85, R, 72, false).translate([0, 0, L - 3 + 0.01]).scale([1, 1, 0.01 / 3 + 1]).scale([1, 1, 1]));
    body = Mf.cylinder(L, R, R * 0.95, 72, false);
    if (p.style === 't') body = body.add(Mf.cylinder(p.bar, R * 0.8, R * 0.8, 48, false).rotate([0, 90, 0]).translate([-p.bar / 2, 0, L - R * 0.8 - 2]));
    for (i = 0; i < n; i++) { var a = 2 * Math.PI * i / n, fr = Math.max(1.2, R * 0.16); body = body.subtract(Mf.cylinder(L + 2, fr, fr, 20, false).translate([(R + fr * 0.35) * Math.cos(a), (R + fr * 0.35) * Math.sin(a), -1])); }
    var hexR = (p.key / 2 + p.cl) / Math.cos(Math.PI / 6);
    body = body.subtract(H.ext(CS.circle(hexR, 6), -1, Math.min(p.depth, L - 3)));
    return [{ name: H.lang === 'en' ? 'Handle' : 'Griff', mesh: H.toMesh(body) }];
  }
});
