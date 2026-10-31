/* Stempel: erhabene, gespiegelte Schrift auf Block mit Griff. */
GenKit.define({
  id: 'stamp', file: 'stempel',
  fname: function (p) { return (p.text || 'stempel').replace(/[^\w]+/g, '_').slice(0, 14); },
  meta: {
    cat: 'art', slug: { de: 'stempel-generator', en: 'stamp-generator' },
    title: { de: 'Stempel-Generator: Textstempel nach Maß als STL/3MF (kostenlos)', en: 'Stamp Generator: custom text stamps as STL/3MF (free)' },
    h1: { de: 'Stempel', en: 'Stamp' },
    sub: { de: 'Textstempel mit Griff: Text und Schrift eingeben, die Spiegelung ist schon eingerechnet.', en: 'Text stamps with a handle: enter text and font, the mirroring is already included.' },
    desc: { de: 'Kostenloser Stempel-Generator: Textstempel mit gespiegelter Schrift, Griff und mehreren Zeilen. Export als STL und 3MF, direkt im Browser.', en: 'Free stamp generator: text stamps with mirrored lettering, handle and several lines. Export as STL and 3MF, right in your browser.' },
    tag: { de: 'Kunst & Schilder', en: 'Art & signs' },
    intro: { de: ['Tippe deinen Text ein, für mehrere Zeilen trennst du sie mit einem senkrechten Strich. Der Generator spiegelt die Schrift automatisch, sodass der Abdruck richtig herum lesbar ist.', 'Der Stempel hat einen Griff auf der Rückseite. Er wird mit dem Griff nach unten gedruckt, die erhabene Schrift liegt oben.'], en: ['Type your text; separate several lines with a vertical bar. The generator mirrors the lettering automatically so the imprint reads correctly.', 'The stamp has a handle on the back. It prints with the handle down and the raised lettering on top.'] },
    notes: { de: ['Schrift mindestens 8 mm hoch wählen, sonst werden Details zu fein. Fette Schriftarten stempeln besser.', 'Mit 0,12 mm Schichthöhe wird die Schrift am schärfsten. Stempelkissen oder Stoffe mit Stoff- oder Acrylfarbe nutzen.', 'Die Schrift hängt davon ab, welche Schriftarten dein Gerät hat. Die erste Option ist immer enthalten.'], en: ['Choose lettering at least 8 mm high, otherwise details get too fine. Bold fonts stamp better.', 'A 0.12 mm layer height gives the sharpest lettering. Use an ink pad or fabric or acrylic paint.', 'Available fonts depend on your device. The first option is always included.'] },
    faq: { de: [['Warum ist die Schrift auf dem Modell gespiegelt?', 'Weil ein Stempel seitenverkehrt sein muss, damit der Abdruck richtig herum ist. Mit der Option Spiegeln kannst du das abschalten.'], ['Wie viele Zeilen sind möglich?', 'Bis zu drei Zeilen, getrennt durch den senkrechten Strich.']], en: [['Why is the lettering mirrored on the model?', 'A stamp must be mirrored so the imprint reads correctly. You can switch this off with the mirror option.'], ['How many lines are possible?', 'Up to three lines, separated by the vertical bar.']] }
  },
  groups: [
    { title: { de: 'Text', en: 'Text' }, items: [
      { k: 'text', t: 'txt', def: '3DToolBox|Handmade', max: 40, label: { de: 'Text (Zeilen mit | trennen)', en: 'Text (separate lines with |)' } },
      { k: 'font', t: 'sel', def: 'TB Display, Inter, sans-serif', str: true, label: { de: 'Schrift', en: 'Font' }, opts: [['TB Display, Inter, sans-serif', { de: 'Fett (Inter)', en: 'Bold (Inter)' }], ['Georgia, Times New Roman, serif', { de: 'Serif', en: 'Serif' }], ['Courier New, monospace', { de: 'Schreibmaschine', en: 'Typewriter' }], ['Impact, Arial Black, sans-serif', { de: 'Schmal und fett', en: 'Condensed bold' }], ['Brush Script MT, Segoe Script, cursive', { de: 'Schreibschrift', en: 'Script' }]] },
      { k: 'th', t: 'num', min: 5, max: 40, step: 0.5, def: 10, unit: 'mm', label: { de: 'Höhe einer Zeile', en: 'Height of one line' } },
      { k: 'mirror', t: 'bool', def: true, label: { de: 'Schrift spiegeln (für richtigen Abdruck)', en: 'Mirror lettering (for a correct imprint)' } }
    ] },
    { title: { de: 'Block & Griff', en: 'Block & handle' }, items: [
      { k: 'mg', t: 'num', min: 2, max: 20, step: 0.5, def: 5, unit: 'mm', label: { de: 'Rand um den Text', en: 'Margin around text' } },
      { k: 'bt', t: 'num', min: 2, max: 10, step: 0.5, def: 4, unit: 'mm', label: { de: 'Dicke des Blocks', en: 'Block thickness' } },
      { k: 'rh', t: 'num', min: 0.6, max: 3, step: 0.1, def: 1.2, unit: 'mm', label: { de: 'Höhe der Schrift', en: 'Lettering height' } },
      { k: 'r', t: 'num', min: 0, max: 15, step: 0.5, def: 3, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } },
      { k: 'handle', t: 'bool', def: true, label: { de: 'Griff auf der Rückseite', en: 'Handle on the back' } },
      { k: 'hh', t: 'num', min: 8, max: 40, step: 1, def: 18, unit: 'mm', label: { de: 'Höhe des Griffs', en: 'Handle height' }, show: function (p) { return p.handle; } }
    ] }
  ],
  presets: [
    { label: { de: 'Zweizeiliger Namensstempel', en: 'Two-line name stamp' }, v: { text: '3DToolBox|Handmade', th: 10 } },
    { label: { de: 'Einzeiler groß', en: 'Large single line' }, v: { text: 'Danke!', th: 16 } },
    { label: { de: 'Adressstempel (3 Zeilen)', en: 'Address stamp (3 lines)' }, v: { text: 'Max Muster|Hauptstr. 1|12345 Stadt', th: 7 } },
    { label: { de: 'Handmade-Stempel', en: 'Handmade stamp' }, v: { text: 'Handmade', th: 12 } },
    { label: { de: 'Ohne Spiegelung (Test)', en: 'Without mirroring (test)' }, v: { text: 'Test', mirror: false, th: 12 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, lines = String(p.text || ' ').split('|').slice(0, 3).map(function (s) { return s.trim() || ' '; }), gap = p.th * 0.35, px = 6, parts = [], y = 0, maxW = 0, i;
    var csl = lines.map(function (ln) { var cs = H.maskToCS(H.rasterText(ln, p.font, p.th, px)), b = cs.bounds(); return { cs: cs, b: b, w: b.max[0] - b.min[0], h: b.max[1] - b.min[1] }; });
    var tot = 0; csl.forEach(function (c) { tot += c.h; if (c.w > maxW) maxW = c.w; }); tot += gap * (csl.length - 1);
    var yy = tot / 2, layers = [];
    csl.forEach(function (c) { layers.push(c.cs.translate([-(c.b.min[0] + c.b.max[0]) / 2, yy - c.h - c.b.min[1] + 0 - 0]).translate([0, 0])); yy -= c.h + gap; });
    var text = layers[0]; for (i = 1; i < layers.length; i++) text = text.add(layers[i]);
    if (p.mirror) text = text.mirror([1, 0]);
    var w = maxW + 2 * p.mg, h = tot + 2 * p.mg, r = Math.min(p.r, Math.min(w, h) / 2 - 0.5), z0 = p.handle ? p.hh : 0;
    var block = H.ext(H.rrect(w, h, r), z0, z0 + p.bt);
    if (p.handle) { var hd = Math.min(Math.max(w, h) * 0.5, Math.min(w, h) - 2); block = block.add(H.ext(H.rrect(Math.min(w - 2, hd * 1.3), Math.min(h - 2, hd), Math.min(4, hd / 3)), -0.001 + 0, z0 + 0.01)); }
    block = block.add(H.ext(text, z0 + p.bt - 0.01, z0 + p.bt + p.rh));
    return [{ name: H.lang === 'en' ? 'Stamp' : 'Stempel', mesh: H.toMesh(block) }];
  }
});
