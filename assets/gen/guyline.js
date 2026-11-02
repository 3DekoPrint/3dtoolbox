/* Leinenspanner: Platte mit drei Löchern für Zeltleinen. */
GenKit.define({
  id: 'guyline', file: 'leinenspanner',
  fname: function (p) { return 'leinenspanner_' + p.hole; },
  meta: {
    cat: 'camping', slug: { de: 'leinenspanner-generator', en: 'guyline-tensioner-generator' },
    title: { de: 'Leinenspanner-Generator: Abspannleinen-Spanner für Zelt und Tarp (kostenlos)', en: 'Guyline Tensioner Generator for tents and tarps as STL (free)' },
    h1: { de: 'Leinenspanner', en: 'Guyline tensioner' },
    sub: { de: 'Spanner für Abspannleinen: Lochgröße passend zur Leine einstellen, Länge und Form wählen, STL laden.', en: 'Tensioners for guylines: set the hole size to your cord, choose length and shape, download STL.' },
    desc: { de: 'Kostenloser Leinenspanner-Generator für den 3D-Druck: Spanner mit drei Löchern für Zeltleinen, Tarp und Hängematte mit einstellbarem Lochdurchmesser. Export als STL und 3MF.', en: 'Free guyline tensioner generator for 3D printing: three-hole tensioners for tent lines, tarps and hammocks with adjustable hole diameter. Export as STL and 3MF.' },
    tag: { de: 'Camping', en: 'Camping' },
    intro: { de: ['Miss den Durchmesser deiner Leine und stelle das Loch etwas größer ein. Die Leine läuft im Zickzack durch die drei Löcher und klemmt sich unter Zug selbst.', 'Die Platte lässt sich mehrfach drucken. Mit kleineren Löchern klemmt sie stärker, mit größeren lässt sie sich leichter verschieben.'], en: ['Measure the diameter of your cord and set the hole slightly larger. The line runs in a zigzag through the three holes and grips itself under tension.', 'The plate can be printed several times. Smaller holes grip more, larger holes slide more easily.'] },
    notes: { de: ['Flach drucken, 3 bis 4 Wände.', 'Die Kanten der Löcher leicht abrunden, damit die Leine nicht scheuert (Fase einstellbar).', 'Für Reflektor- oder Dyneema-Leinen die Lochgröße am Stück Leine testen.'], en: ['Print flat with 3 to 4 walls.', 'Slightly round the hole edges so the line does not chafe (chamfer adjustable).', 'For reflective or Dyneema line test the hole size on a piece of cord.'] },
    faq: { de: [['Welche Lochgröße brauche ich?', 'Leinendurchmesser plus 0,5 bis 1 mm. Für 3-mm-Leine also 3,5 bis 4 mm.'], ['Hält der Spanner dauerhaft?', 'Er ist für Zeltleinen und leichte Lasten gedacht, nicht für Sicherungen oder Klettern.']], en: [['Which hole size do I need?', 'Cord diameter plus 0.5 to 1 mm. For 3 mm line that is 3.5 to 4 mm.'], ['Does it hold permanently?', 'It is meant for tent lines and light loads, not for safety or climbing.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'hole', t: 'num', min: 2, max: 8, step: 0.1, def: 3.8, unit: 'mm', label: { de: 'Lochdurchmesser (Leine + 0,5 mm)', en: 'Hole diameter (cord + 0.5 mm)' } },
      { k: 'len', t: 'num', min: 30, max: 90, step: 1, def: 55, unit: 'mm', label: { de: 'Länge', en: 'Length' } },
      { k: 'w', t: 'num', min: 12, max: 40, step: 1, def: 20, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'th', t: 'num', min: 2, max: 6, step: 0.5, def: 3, unit: 'mm', label: { de: 'Dicke', en: 'Thickness' } },
      { k: 'shape', t: 'sel', def: 'round', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['round', { de: 'Abgerundet', en: 'Rounded' }], ['leaf', { de: 'Blatt', en: 'Leaf' }]] },
      { k: 'ch', t: 'num', min: 0, max: 1.5, step: 0.1, def: 0.6, unit: 'mm', label: { de: 'Fase an den Löchern', en: 'Hole chamfer' } }
    ] }
  ],
  presets: [
    { label: { de: 'Für 3-mm-Leine', en: 'For 3 mm line' }, v: { hole: 3.8, len: 55, w: 20, th: 3 } },
    { label: { de: 'Für 2-mm-Leine', en: 'For 2 mm line' }, v: { hole: 2.8, len: 45, w: 16, th: 2.5 } },
    { label: { de: 'Für 4-mm-Leine', en: 'For 4 mm line' }, v: { hole: 4.8, len: 65, w: 24, th: 3.5 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de', L = p.len, W = p.w, t = p.th;
    if (p.hole * 2 + 6 > Math.min(L, W * 2.2)) throw new Error('Loch zu groß');
    var body = p.shape === 'leaf'
      ? Mf.hull([H.cyl(-L / 2 + W / 2, 0, 0, t, W, 40), H.cyl(L / 2 - W / 4, 0, 0, t, W / 2, 40)])
      : H.ext(H.rrect(L, W, W / 2.5), 0, t);
    var xs = [-L / 3, 0, L / 3], ys = [W / 5, -W / 5, W / 5];
    xs.forEach(function (x, i) {
      body = body.subtract(H.cyl(x, ys[i], -1, t + 1, p.hole, 32));
      if (p.ch > 0) { var r0 = p.hole / 2 + p.ch; body = body.subtract(H.cone(x, ys[i], t - p.ch, t + 0.01, p.hole, p.hole + 2 * p.ch, 32)).subtract(H.cone(x, ys[i], -0.01, p.ch, p.hole + 2 * p.ch, p.hole, 32)); }
    });
    return [{ name: de ? 'Leinenspanner' : 'Tensioner', mesh: H.toMesh(body) }];
  }
});
