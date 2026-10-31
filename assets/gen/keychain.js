/* Schlüsselanhänger: Text erhaben auf Platte mit Ring-Öse und optionalem Rand. */
GenKit.define({
  id: 'keychain', file: 'schluesselanhaenger',
  fname: function (p) { return (p.text || 'anhaenger').replace(/[^\w]+/g, '_').slice(0, 14); },
  meta: {
    cat: 'art', slug: { de: 'schluesselanhaenger-generator', en: 'keychain-generator' },
    title: { de: 'Schlüsselanhänger-Generator: Namensanhänger als STL/3MF (kostenlos)', en: 'Keychain Generator: name tags as STL/3MF (free)' },
    h1: { de: 'Schlüsselanhänger', en: 'Keychain' },
    sub: { de: 'Anhänger mit Namen oder Text: Form, Schrift und Öse einstellen, STL oder 3MF laden.', en: 'A tag with a name or text: set shape, font and eyelet, download STL or 3MF.' },
    desc: { de: 'Kostenloser Schlüsselanhänger-Generator: Anhänger mit erhabener Schrift, Öse und Rand in Kapsel-, Rechteck- oder Kreisform. Export als STL und 3MF.', en: 'Free keychain generator: tags with raised lettering, eyelet and rim in pill, rectangle or circle shape. Export as STL and 3MF.' },
    tag: { de: 'Kunst & Schilder', en: 'Art & signs' },
    intro: { de: ['Gib den Text ein, wähle Form und Schrift und stelle Öse und Dicke ein. Die Schrift steht erhaben auf der Platte, optional mit Rand.', 'Für mehrfarbige Anhänger nutze die Schichtfarbwechsel deines Slicers an der Höhe, wo die Schrift beginnt.'], en: ['Enter the text, choose shape and font and set the eyelet and thickness. The lettering stands raised on the plate, optionally with a rim.', 'For multicolor tags use your slicer’s color change at the height where the lettering starts.'] },
    notes: { de: ['Flach drucken, Schrift nach oben.', 'Farbwechsel bei der Plattendicke (siehe Zahl in den Reglern), dann hat die Schrift eine andere Farbe.', 'Das Loch ist 4 mm. Ein größerer Ring braucht ein größeres Loch.'], en: ['Print flat with the lettering up.', 'Change color at the plate thickness (see the value in the sliders) and the lettering gets another color.', 'The hole is 4 mm. A larger ring needs a larger hole.'] },
    faq: { de: [['Wie lang darf der Text sein?', 'Bis 24 Zeichen. Je länger, desto größer wird der Anhänger bei gleicher Schrifthöhe.'], ['Welche Schrift ist am besten?', 'Fette Schriften halten besser und drucken sauberer als feine Schreibschriften.']], en: [['How long can the text be?', 'Up to 24 characters. The longer the text, the larger the tag at the same lettering height.'], ['Which font is best?', 'Bold fonts hold up better and print cleaner than fine script fonts.']] }
  },
  groups: [
    { title: { de: 'Text', en: 'Text' }, items: [
      { k: 'text', t: 'txt', def: 'MANUEL', max: 24, label: { de: 'Text', en: 'Text' } },
      { k: 'font', t: 'sel', def: 'TB Display, Inter, sans-serif', str: true, label: { de: 'Schrift', en: 'Font' }, opts: [['TB Display, Inter, sans-serif', { de: 'Fett (Inter)', en: 'Bold (Inter)' }], ['Georgia, Times New Roman, serif', { de: 'Serif', en: 'Serif' }], ['Courier New, monospace', { de: 'Schreibmaschine', en: 'Typewriter' }], ['Impact, Arial Black, sans-serif', { de: 'Schmal und fett', en: 'Condensed bold' }]] },
      { k: 'th', t: 'num', min: 5, max: 30, step: 0.5, def: 12, unit: 'mm', label: { de: 'Schrifthöhe', en: 'Lettering height' } },
      { k: 'rh', t: 'num', min: 0.4, max: 3, step: 0.1, def: 1, unit: 'mm', label: { de: 'Höhe der Schrift', en: 'Lettering relief' } }
    ] },
    { title: { de: 'Platte & Öse', en: 'Plate & eyelet' }, items: [
      { k: 'shape', t: 'sel', def: 'pill', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['pill', { de: 'Kapsel', en: 'Pill' }], ['rect', { de: 'Rechteck', en: 'Rectangle' }]] },
      { k: 't', t: 'num', min: 1.2, max: 5, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Dicke der Platte', en: 'Plate thickness' } },
      { k: 'mg', t: 'num', min: 2, max: 12, step: 0.5, def: 4, unit: 'mm', label: { de: 'Rand um die Schrift', en: 'Margin around lettering' } },
      { k: 'hole', t: 'num', min: 2.5, max: 8, step: 0.1, def: 4.2, unit: 'mm', label: { de: 'Loch für den Ring', en: 'Hole for the ring' } },
      { k: 'rim', t: 'bool', def: true, label: { de: 'Erhabener Rand', en: 'Raised rim' } }
    ] }
  ],
  presets: [
    { label: { de: 'Name (Kapsel)', en: 'Name (pill)' }, v: { text: 'MANUEL', shape: 'pill' } },
    { label: { de: 'Hausnummer', en: 'House number' }, v: { text: '42', th: 16, shape: 'rect' } },
    { label: { de: 'Mit Schreibmaschinenschrift', en: 'Typewriter font' }, v: { text: 'Home', font: 'Courier New, monospace', th: 12 } },
    { label: { de: 'Kurz und fett', en: 'Short and bold' }, v: { text: 'OK', font: 'Impact, Arial Black, sans-serif', th: 18, shape: 'pill' } },
    { label: { de: 'Ohne Rand', en: 'Without rim' }, v: { text: 'Keys', rim: false } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, rt = H.rasterText(p.text || ' ', p.font, p.th, 8), tcs = H.maskToCS(rt), b = tcs.bounds(), tw = b.max[0] - b.min[0], th = b.max[1] - b.min[1];
    tcs = tcs.translate([-(b.min[0] + b.max[0]) / 2, -(b.min[1] + b.max[1]) / 2]);
    var w = tw + 2 * p.mg, h = th + 2 * p.mg, ear = p.hole + 4, r = p.shape === 'pill' ? h / 2 : Math.min(2, h / 4);
    var plate = H.rrect(w, h, r).add(CS.circle(ear / 2 + 0.2, 48).translate([-w / 2 - ear / 2 + 1, 0])), cx = -w / 2 - ear / 2 + 1;
    plate = plate.subtract(CS.circle(p.hole / 2, 40).translate([cx, 0]));
    var body = H.ext(plate, 0, p.t);
    if (p.rim) body = body.add(H.ext(plate.subtract(plate.offset(-1.2, 'Round', 2, 16)), p.t - 0.01, p.t + p.rh));
    body = body.add(H.ext(tcs, p.t - 0.01, p.t + p.rh));
    return [{ name: H.lang === 'en' ? 'Keychain' : 'Anhänger', mesh: H.toMesh(body) }];
  }
});
