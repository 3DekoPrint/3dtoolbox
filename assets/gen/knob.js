/* Knopf / Drehknopf: Rillen, Wellenaufnahme rund/D/sechskant, optional Madenschraube. */
GenKit.define({
  id: 'knob', file: 'drehknopf',
  fname: function (p) { return 'd' + p.d + 'w' + p.sd; },
  meta: {
    cat: 'workshop', slug: { de: 'drehknopf-generator', en: 'knob-generator' },
    title: { de: 'Drehknopf-Generator: Knöpfe mit Wellenaufnahme als STL/3MF (kostenlos)', en: 'Knob Generator: knobs with shaft bore as STL/3MF (free)' },
    h1: { de: 'Drehknopf', en: 'Knob' },
    sub: { de: 'Knöpfe für Potis, Schalter und Geräte: Durchmesser, Rillen und Wellenaufnahme einstellen, STL oder 3MF laden.', en: 'Knobs for pots, switches and devices: set diameter, flutes and shaft bore, download STL or 3MF.' },
    desc: { de: 'Kostenloser Drehknopf-Generator: Knöpfe mit Rillen für Potentiometer, Schalter und Geräte, mit runder, D-förmiger oder sechseckiger Aufnahme und Madenschraube. Export als STL und 3MF.', en: 'Free knob generator: fluted knobs for potentiometers, switches and devices with round, D-shaped or hex bore and set screw. Export as STL and 3MF.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Wähle den Außendurchmesser und die Höhe, dann die Rillen für einen guten Griff. Die Aufnahme passt auf runde Wellen, Wellen mit Abflachung (D-Welle) oder Sechskant.', 'Für Potis nimm 6 mm mit Abflachung, für 1/4-Zoll-Wellen etwa 6,35 mm.'], en: ['Pick the outer diameter and height, then the flutes for a good grip. The bore fits round shafts, shafts with a flat (D-shaft) or hex.', 'For pots use 6 mm with a flat, for 1/4 inch shafts about 6.35 mm.'] },
    notes: { de: ['Mit der offenen Seite (Wellenloch) nach oben drucken, die Rillen verlaufen dann senkrecht und brauchen keine Stützen.', 'Das Wellenloch bekommt automatisch 0,1 mm Spiel. Passt die Welle trotzdem zu stramm, erhöhe es.', 'Die Madenschraube klemmt die Welle: Loch ca. 2,5 mm für M3 zum Gewindeschneiden.'], en: ['Print with the open side (shaft hole) up; the flutes run vertically and need no supports.', 'The bore gets 0.1 mm clearance automatically. If the shaft is still too tight, raise it.', 'The set screw clamps the shaft: about 2.5 mm hole for an M3 self-tapping screw.'] },
    faq: { de: [['Welche Welle haben Potis?', 'Die meisten Potis haben 6 mm Wellen mit Abflachung (D-Welle) oder Rändel, Gitarren-Potis oft 6,35 mm Rändel.'], ['Wie viele Rillen?', 'Zwischen 8 und 16 sehen gut aus und liegen gut in der Hand.']], en: [['Which shaft do pots have?', 'Most pots have 6 mm shafts with a flat (D-shaft) or knurl, guitar pots often 6.35 mm knurled.'], ['How many flutes?', 'Between 8 and 16 look good and feel good in the hand.']] }
  },
  groups: [
    { title: { de: 'Knopf', en: 'Knob' }, items: [
      { k: 'd', t: 'num', min: 12, max: 80, step: 0.5, def: 30, unit: 'mm', label: { de: 'Durchmesser', en: 'Diameter' } },
      { k: 'h', t: 'num', min: 6, max: 50, step: 0.5, def: 18, unit: 'mm', label: { de: 'Höhe', en: 'Height' } },
      { k: 'taper', t: 'num', min: 0, max: 10, step: 0.5, def: 3, unit: 'mm', label: { de: 'Verjüngung nach oben', en: 'Taper towards the top' } },
      { k: 'n', t: 'int', min: 0, max: 24, step: 1, def: 12, label: { de: 'Anzahl Rillen (0 = glatt)', en: 'Number of flutes (0 = smooth)' } },
      { k: 'fr', t: 'num', min: 1, max: 6, step: 0.25, def: 2.5, unit: 'mm', label: { de: 'Rillen-Radius', en: 'Flute radius' }, show: function (p) { return p.n > 0; } },
      { k: 'mark', t: 'bool', def: true, label: { de: 'Markierungsstrich oben', en: 'Indicator line on top' } }
    ] },
    { title: { de: 'Wellenaufnahme', en: 'Shaft bore' }, items: [
      { k: 'type', t: 'sel', def: 'd', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['d', { de: 'D-Welle (Abflachung)', en: 'D-shaft (flat)' }], ['round', { de: 'Rund', en: 'Round' }], ['hex', { de: 'Sechskant', en: 'Hex' }]] },
      { k: 'sd', t: 'num', min: 2, max: 20, step: 0.05, def: 6, unit: 'mm', label: { de: 'Wellendurchmesser / Schlüsselweite', en: 'Shaft diameter / across flats' } },
      { k: 'flat', t: 'num', min: 0.2, max: 3, step: 0.1, def: 0.5, unit: 'mm', label: { de: 'Tiefe der Abflachung', en: 'Flat depth' }, show: function (p) { return p.type === 'd'; } },
      { k: 'depth', t: 'num', min: 3, max: 40, step: 0.5, def: 12, unit: 'mm', label: { de: 'Tiefe der Aufnahme', en: 'Bore depth' } },
      { k: 'grub', t: 'bool', def: false, label: { de: 'Loch für Madenschraube', en: 'Set screw hole' } },
      { k: 'gd', t: 'num', min: 2, max: 5, step: 0.1, def: 2.6, unit: 'mm', label: { de: 'Madenschrauben-Loch', en: 'Set screw hole size' }, show: function (p) { return p.grub; } }
    ] }
  ],
  presets: [
    { label: { de: 'Poti-Knopf 6 mm (D-Welle)', en: 'Pot knob 6 mm (D-shaft)' }, v: { d: 30, h: 18, sd: 6, type: 'd' } },
    { label: { de: 'Gitarren-Poti 6,35 mm rund', en: 'Guitar pot 6.35 mm round' }, v: { d: 20, h: 16, sd: 6.35, type: 'round', n: 0, mark: true } },
    { label: { de: 'Großer Regler 45 mm', en: 'Large control 45 mm' }, v: { d: 45, h: 22, sd: 6, type: 'd', n: 16, fr: 2.5 } },
    { label: { de: 'Schraubknopf (Sechskant 8 mm)', en: 'Thumb knob (hex 8 mm)' }, v: { d: 28, h: 14, sd: 8, type: 'hex', n: 10, mark: false } },
    { label: { de: 'Mini 15 mm, 3 mm Welle', en: 'Mini 15 mm, 3 mm shaft' }, v: { d: 15, h: 10, sd: 3, type: 'round', n: 8, fr: 1.5, depth: 8 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, R = p.d / 2, cl = 0.1, n = Math.round(p.n), i;
    var body = Mf.cylinder(p.h, R, Math.max(2, R - p.taper), 96, false);
    for (i = 0; i < n; i++) { var a = 2 * Math.PI * i / n; body = body.subtract(Mf.cylinder(p.h + 2, p.fr, p.fr, 24, false).translate([(R + p.fr * 0.3) * Math.cos(a), (R + p.fr * 0.3) * Math.sin(a), -1])); }
    var prof, r = p.sd / 2 + cl;
    if (p.type === 'hex') prof = CS.circle((p.sd / 2 + cl) / Math.cos(Math.PI / 6), 6);
    else if (p.type === 'd') prof = CS.circle(r, 48).intersect(CS.square([6 * p.sd, 6 * p.sd], true).translate([(p.sd / 2 - p.flat + cl) - 3 * p.sd, 0]));
    else prof = CS.circle(r, 48);
    var dp = Math.min(p.depth, p.h - 2);
    body = body.subtract(H.ext(prof, -1, dp));
    if (p.grub) body = body.subtract(Mf.cylinder(R + 2, p.gd / 2, p.gd / 2, 24, false).rotate([0, 90, 0]).translate([0, 0, Math.min(dp * 0.5, dp - 2)]));
    if (p.mark) body = body.subtract(H.box(0, -0.7, p.h - 0.8, R + 1, 0.7, p.h + 1));
    return [{ name: H.lang === 'en' ? 'Knob' : 'Drehknopf', mesh: H.toMesh(body) }];
  }
});
