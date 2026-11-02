/* Fensterriegel: Leiste mit Kerbe, die über den Stellarm des Ausstellfensters greift und ihn festsetzt. */
GenKit.define({
  id: 'windowbar', file: 'fensterriegel',
  fname: function (p) { return 'fensterriegel_' + p.len; },
  meta: {
    cat: 'caravan', slug: { de: 'fensterriegel-generator', en: 'window-bar-lock-generator' },
    title: { de: 'Fensterriegel-Generator: Leiste für Ausstellfenster im Wohnwagen als STL (kostenlos)', en: 'Window Bar Lock Generator: bar for push-out windows in caravans as STL (free)' },
    h1: { de: 'Fensterriegel', en: 'Window bar lock' },
    sub: { de: 'Eine Leiste mit Kerbe und Schrägfläche, die du auf den Stellarm oder die Raste des Ausstellfensters setzt. Wie wird gedruckt.', en: 'A bar with a notch and ramp that you set over the stay arm or catch of a push-out window. Prints without supports.' },
    desc: { de: 'Kostenloser Generator für Riegel an Ausstellfenstern von Wohnwagen und Wohnmobilen (zum Beispiel Polyplastic, Seitz, Hobby). Länge, Kerbe und Höhe einstellen, STL oder 3MF laden.', en: 'Free generator for bar locks on push-out windows of caravans and motorhomes (for example Polyplastic, Seitz, Hobby). Set length, notch and height, export STL or 3MF.' },
    tag: { de: 'Wohnwagen', en: 'Caravan' },
    intro: { de: ['Du misst die Dicke des Stellarms oder der Raste und gibst sie als Kerbenbreite ein. Die Kerbentiefe bestimmt, wie weit die Leiste über das Teil greift.', 'Die Schrägfläche führt die Leiste beim Aufschieben. Mit dem Haken am Ende kannst du eine Schnur befestigen.'], en: ['Measure the thickness of the stay arm or catch and enter it as notch width. The notch depth sets how far the bar reaches over the part.', 'The ramp guides the bar when you push it on. The eyelet at the end takes a cord.'] },
    notes: { de: ['Sicherung gegen ungewolltes Öffnen und Klappern, kein Einbruchschutz.', 'Fluchtfenster nicht blockieren.', 'Für die Leiste PETG oder ASA nehmen.', 'Die Maße der Presets sind Startwerte. Miss dein Fenster nach.'], en: ['Secures against accidental opening and rattling, not burglar protection.', 'Do not block escape windows.', 'Use PETG or ASA.', 'Preset sizes are starting values. Measure your window.'] },
    faq: { de: [['Wie wird gedruckt?', 'Liegend, ohne Stützen: Die Kerbe zeigt zur Seite und die Schichten liegen quer zur Belastung.'], ['Passt das für mein Fenster?', 'Wenn Stellarm und Raste ähnlich geformt sind, ja. Kerbenbreite und Tiefe anpassen.']], en: [['How is it printed?', 'Lying flat without supports: the notch faces sideways and the layers run across the load.'], ['Will it fit my window?', 'If stay arm and catch are similar, yes. Adjust notch width and depth.']] }
  },
  groups: [
    { title: { de: 'Leiste', en: 'Bar' }, items: [
      { k: 'len', t: 'num', min: 60, max: 180, step: 1, def: 130, unit: 'mm', label: { de: 'Länge', en: 'Length' } },
      { k: 'h', t: 'num', min: 15, max: 60, step: 0.5, def: 43.5, unit: 'mm', label: { de: 'Höhe', en: 'Height' } },
      { k: 'bw', t: 'num', min: 8, max: 30, step: 0.5, def: 17, unit: 'mm', label: { de: 'Breite der Leiste', en: 'Bar width' } },
      { k: 'cord', t: 'bool', def: true, label: { de: 'Loch für Schnur oder Ring', en: 'Hole for cord or ring' } }
    ] },
    { title: { de: 'Kerbe', en: 'Notch' }, items: [
      { k: 'nw', t: 'num', min: 4, max: 40, step: 0.5, def: 16, unit: 'mm', label: { de: 'Kerbenbreite', en: 'Notch width' } },
      { k: 'nd', t: 'num', min: 4, max: 30, step: 0.5, def: 13, unit: 'mm', label: { de: 'Kerbentiefe', en: 'Notch depth' } },
      { k: 'nx', t: 'num', min: 10, max: 120, step: 1, def: 50, unit: 'mm', label: { de: 'Position der Kerbe von links', en: 'Notch position from left' } },
      { k: 'ramp', t: 'num', min: 0, max: 40, step: 1, def: 20, unit: 'mm', label: { de: 'Länge der Schrägfläche', en: 'Ramp length' } }
    ] }
  ],
  presets: [
    { label: { de: 'Polyfix-Stil (lang)', en: 'Polyfix style (long)' }, v: { len: 130, h: 43.5, bw: 17, nw: 16, nd: 13, nx: 50, ramp: 20 } },
    { label: { de: 'Kompakt', en: 'Compact' }, v: { len: 90, h: 32, bw: 14, nw: 12, nd: 10, nx: 35, ramp: 14 } },
    { label: { de: 'Kräftig', en: 'Sturdy' }, v: { len: 150, h: 50, bw: 22, nw: 20, nd: 16, nx: 60, ramp: 24 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, de = H.lang === 'de', L = p.len, h = p.h, nx = Math.min(p.nx, L - p.nw - 5), nd = Math.min(p.nd, h - 6), r = Math.min(p.ramp, nx);
    var poly = [[0, 0], [nx - r, 0], [nx, nd], [nx + p.nw, nd], [nx + p.nw, 0], [L, 0], [L, h], [0, h]];
    var bar = H.ext(CS.ofPolygons([poly]), 0, p.bw);
    if (p.cord) bar = bar.subtract(H.cyl(L - 12, h * 0.6, -1, p.bw + 1, Math.min(5, h * 0.3), 24));
    return [{ name: de ? 'Fensterriegel' : 'Window bar lock', mesh: H.toMesh(bar) }];
  }
});
