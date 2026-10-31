/* Trichter: Drehkörper mit Ablaufrohr und optionalem Rand. */
GenKit.define({
  id: 'funnel', file: 'trichter',
  fname: function (p) { return 'd' + p.d1 + 'x' + p.d2; },
  meta: {
    cat: 'home', slug: { de: 'trichter-generator', en: 'funnel-generator' },
    title: { de: 'Trichter-Generator: Trichter nach Maß als STL/3MF (kostenlos)', en: 'Funnel Generator: custom funnels as STL/3MF (free)' },
    h1: { de: 'Trichter', en: 'Funnel' },
    sub: { de: 'Trichter für Flaschen, Tanks und Werkstatt: Öffnung, Ablauf und Höhe eingeben, STL oder 3MF laden.', en: 'Funnels for bottles, tanks and the workshop: enter opening, spout and height, download STL or 3MF.' },
    desc: { de: 'Kostenloser Trichter-Generator: Trichter in jeder Größe mit einstellbarem Ablaufrohr, Öffnung und Rand. Export als STL und 3MF, direkt im Browser.', en: 'Free funnel generator: funnels of any size with adjustable spout, opening and rim. Export as STL and 3MF, right in your browser.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Der Trichter entsteht als Drehkörper. Du stellst den Durchmesser der oberen Öffnung, den Durchmesser des Ablaufs, die Länge des Rohrs und die Höhe des Kegels ein.', 'Ein Rand oben macht den Trichter steifer und angenehmer in der Hand.'], en: ['The funnel is a solid of revolution. You set the diameter of the top opening, the diameter of the spout, the length of the pipe and the height of the cone.', 'A rim on top stiffens the funnel and feels nicer in the hand.'] },
    notes: { de: ['Mit dem Ablaufrohr nach unten drucken, die schrägen Flächen sind selbsttragend, solange der Kegel steiler als 45° ist.', 'Nicht für Lebensmittel oder Flüssigkeiten ohne Prüfung: Schichtfugen sind nicht immer dicht. Für Wasser, Sand, Schrauben und Pellets bestens.', 'Für dichte Wände: 4 Wände, Fluss 105 %, kein Zick-Zack-Füllmuster in der Wand.'], en: ['Print with the spout down; the sloped surfaces are self-supporting as long as the cone is steeper than 45°.', 'Not for food or liquids without checking: layer lines are not always tight. Great for water, sand, screws and pellets.', 'For tight walls: 4 walls, 105 % flow, no zigzag infill in the wall.'] },
    faq: { de: [['Welche Maße für einen Öltrichter?', 'Oben 100 mm, Ablauf 25 bis 30 mm, Rohrlänge 40 mm. Lege vorher fest, was in die Öffnung des Behälters passt.'], ['Warum ist der Kegel flach?', 'Weil Höhe und Durchmesser den Winkel bestimmen. Mach den Kegel höher, wenn die Flüssigkeit schneller laufen soll.']], en: [['Which dimensions for an oil funnel?', 'Top 100 mm, spout 25 to 30 mm, pipe length 40 mm. First check what fits in the container opening.'], ['Why is the cone flat?', 'Height and diameter set the angle. Make the cone taller if the liquid should flow faster.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'd1', t: 'num', min: 20, max: 250, step: 1, def: 90, unit: 'mm', label: { de: 'Innendurchmesser oben', en: 'Top inner diameter' } },
      { k: 'd2', t: 'num', min: 4, max: 80, step: 0.5, def: 16, unit: 'mm', label: { de: 'Innendurchmesser Ablauf', en: 'Spout inner diameter' } },
      { k: 'ls', t: 'num', min: 5, max: 120, step: 1, def: 30, unit: 'mm', label: { de: 'Länge des Ablaufrohrs', en: 'Spout length' } },
      { k: 'hc', t: 'num', min: 10, max: 200, step: 1, def: 55, unit: 'mm', label: { de: 'Höhe des Kegels', en: 'Cone height' } },
      { k: 'wall', t: 'num', min: 1, max: 5, step: 0.2, def: 1.6, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } }
    ] },
    { title: { de: 'Rand', en: 'Rim' }, items: [
      { k: 'rim', t: 'bool', def: true, label: { de: 'Rand oben', en: 'Rim on top' } },
      { k: 'rw', t: 'num', min: 2, max: 15, step: 0.5, def: 5, unit: 'mm', label: { de: 'Breite des Randes', en: 'Rim width' }, show: function (p) { return p.rim; } },
      { k: 'rh', t: 'num', min: 1, max: 8, step: 0.5, def: 3, unit: 'mm', label: { de: 'Höhe des Randes', en: 'Rim height' }, show: function (p) { return p.rim; } }
    ] }
  ],
  presets: [
    { label: { de: 'Flaschentrichter (Wasser)', en: 'Bottle funnel (water)' }, v: { d1: 90, d2: 16, ls: 30, hc: 55 } },
    { label: { de: 'Öltrichter groß', en: 'Large oil funnel' }, v: { d1: 110, d2: 26, ls: 45, hc: 60 } },
    { label: { de: 'Kleiner Pulvertrichter', en: 'Small powder funnel' }, v: { d1: 40, d2: 8, ls: 20, hc: 30 } },
    { label: { de: 'Pellet-Trichter (breit)', en: 'Pellet funnel (wide)' }, v: { d1: 150, d2: 40, ls: 40, hc: 70 } },
    { label: { de: 'Schraubenflasche', en: 'Screw bottle' }, v: { d1: 60, d2: 22, ls: 25, hc: 40 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, w = p.wall, ri1 = p.d1 / 2, ri2 = p.d2 / 2, ls = p.ls, zt = ls + p.hc;
    var ro1 = ri1 + w, ro2 = ri2 + w, pts = [[ri2, 0], [ro2, 0], [ro2, ls], [ro1, zt]];
    if (p.rim) { pts.push([ro1 + p.rw, zt], [ro1 + p.rw, zt + p.rh], [ri1, zt + p.rh]); } else { pts.push([ri1, zt]); }
    pts.push([ri2, ls]);
    return [{ name: H.lang === 'en' ? 'Funnel' : 'Trichter', mesh: H.toMesh(Mf.revolve(CS.ofPolygons([pts]), 96)) }];
  }
});
