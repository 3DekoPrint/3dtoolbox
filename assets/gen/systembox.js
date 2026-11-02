/* Systembox: stapelbare Werkzeugbox mit Deckel, Trennwand-Schienen und Griffschlitzen. */
GenKit.define({
  id: 'systembox', file: 'systembox',
  fname: function (p) { return 'systembox_' + p.l + 'x' + p.w + 'x' + p.h; },
  meta: {
    cat: 'storage', slug: { de: 'systembox-generator', en: 'system-box-generator' },
    title: { de: 'Systembox-Generator: stapelbare Werkzeugbox mit Deckel als STL/3MF (kostenlos)', en: 'System Box Generator: stackable tool box with lid as STL/3MF (free)' },
    h1: { de: 'Systembox', en: 'System box' },
    sub: { de: 'Stapelbare Box mit Deckel für Werkzeug, Zubehör und Kleinteile. Länge, Breite und Höhe einstellen, Griffschlitze und Trennwände dazu.', en: 'A stackable box with lid for tools, accessories and small parts. Set length, width and height, add hand slots and dividers.' },
    desc: { de: 'Kostenloser Systembox-Generator für den 3D-Druck: stapelbare Werkzeugbox mit Deckel, Griffschlitzen und Trennwand-Schienen. Eigenes System, Export als STL und 3MF.', en: 'Free system box generator for 3D printing: stackable tool box with lid, hand slots and divider rails. Our own system, export as STL and 3MF.' },
    tag: { de: 'Aufbewahren', en: 'Storage' },
    intro: { de: ['Die Boxen stapeln sich selbst: Die Unterseite hat eine Vertiefung, in die die Erhebung des Deckels der Box darunter greift. Gleiche Länge und Breite genügen, die Höhe darf verschieden sein.', 'Das ist ein eigenes System und nicht kompatibel mit Systainer, Bosch-SystemBox oder anderen Herstellerlösungen. Alle Boxen aus diesem Generator passen untereinander.'], en: ['The boxes stack on their own: the underside has a recess that takes the raised plate on the lid of the box below. Equal length and width are enough, height may differ.', 'This is our own system and not compatible with Systainer, Bosch SystemBox or other manufacturer systems. All boxes from this generator fit each other.'] },
    notes: { de: ['Box und Deckel mit der Öffnung nach oben drucken, ohne Stützen.', 'Für schwere Werkzeuge 4 Wände und 20 % Füllung nehmen, Material PETG.', 'Die Trennwand-Schienen nehmen Platten aus dem Sortierschalen-Generator auf.', 'Große Boxen brauchen ein großes Druckbett. Die Vorschau zeigt, ob die Box passt.'], en: ['Print box and lid with the opening facing up, no supports.', 'For heavy tools use 4 walls and 20 % infill, material PETG.', 'The divider rails take plates made with the sorting tray generator.', 'Large boxes need a large bed. The preview shows whether the box fits.'] },
    faq: { de: [['Passt die Box zu Festool oder Bosch?', 'Nein. Es ist ein eigenes, offenes System. Die Boxen stapeln nur untereinander.'], ['Hält der Deckel fest?', 'Er sitzt mit leichter Klemmung. Für Transport empfehle ich ein Gummiband oder Klettband um die Box.']], en: [['Does it fit Festool or Bosch?', 'No. It is our own open system. The boxes only stack with each other.'], ['Does the lid hold?', 'It sits with a light press fit. For transport I recommend a rubber band or Velcro strap around the box.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'l', t: 'num', min: 80, max: 400, step: 5, def: 200, unit: 'mm', label: { de: 'Länge', en: 'Length' } },
      { k: 'w', t: 'num', min: 60, max: 300, step: 5, def: 150, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'h', t: 'num', min: 30, max: 200, step: 5, def: 70, unit: 'mm', label: { de: 'Höhe der Box (ohne Deckel)', en: 'Box height (without lid)' } },
      { k: 'wall', t: 'num', min: 1.6, max: 5, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'r', t: 'num', min: 2, max: 20, step: 1, def: 8, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } },
      { k: 'cl', t: 'num', min: 0.1, max: 0.6, step: 0.05, def: 0.25, unit: 'mm', label: { de: 'Spiel Deckel und Stapel', en: 'Lid and stack clearance' } }
    ] },
    { title: { de: 'Ausstattung', en: 'Features' }, items: [
      { k: 'slots', t: 'bool', def: true, label: { de: 'Griffschlitze an den Stirnseiten', en: 'Hand slots on the end walls' } },
      { k: 'rails', t: 'bool', def: false, label: { de: 'Schienen für Trennwände', en: 'Divider rails' } },
      { k: 'nrail', t: 'int', min: 1, max: 6, step: 1, def: 2, label: { de: 'Anzahl Trennwand-Positionen', en: 'Number of divider positions' }, show: function (p) { return p.rails; } },
      { k: 'stack', t: 'bool', def: true, label: { de: 'Stapel-Vertiefung und Deckel-Erhebung', en: 'Stacking recess and lid plate' } }
    ] }
  ],
  presets: [
    { label: { de: 'Mittlere Werkzeugbox 300×200×90', en: 'Medium tool box 300×200×90' }, v: { l: 300, w: 200, h: 90, wall: 2.8, r: 10, slots: true, rails: false } },
    { label: { de: 'Kleinteilebox 200×150×60', en: 'Small parts box 200×150×60' }, v: { l: 200, w: 150, h: 60, wall: 2.4, r: 8, rails: true, nrail: 2 } },
    { label: { de: 'Flache Schublade 250×180×40', en: 'Flat drawer 250×180×40' }, v: { l: 250, w: 180, h: 40, wall: 2.4, slots: false } },
    { label: { de: 'Kompakt 120×90×50', en: 'Compact 120×90×50' }, v: { l: 120, w: 90, h: 50, wall: 2, r: 6, slots: false } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, de = H.lang === 'de';
    var L = p.l, W = p.w, h = p.h, t = p.wall, r = p.r, cl = p.cl, sd = 2.2, floor = t + (p.stack ? sd : 0);
    if (L < 2 * t + 20 || W < 2 * t + 20) throw new Error('zu klein');
    function rr(a, b, rad, z0, z1) { return H.ext(H.rrect(a, b, Math.max(0.4, rad)), z0, z1); }
    var box = rr(L, W, r, 0, h).subtract(rr(L - 2 * t, W - 2 * t, r - t, floor, h + 1));
    if (p.stack) box = box.subtract(rr(L - 2 * t + 2 * cl, W - 2 * t + 2 * cl, r - t, -1, sd));
    if (p.rails) {
      var n = p.nrail, zr = floor + 3, zh = h - 4, k;
      for (k = 1; k <= n; k++) {
        var x = -L / 2 + t + (L - 2 * t) * k / (n + 1);
        [-1, 1].forEach(function (s) { [-1.7, 1.7].forEach(function (o) { box = box.add(H.box(x + o - 0.6, s * (W / 2 - t) - (s > 0 ? 2.4 : 0), floor, x + o + 0.6, s * (W / 2 - t) + (s > 0 ? 0 : 2.4), zh)); }); });
      }
    }
    if (p.slots) {
      var sw = Math.min(70, W * 0.5), sh = Math.min(18, h * 0.3), zc = h - sh / 2 - 8;
      if (zc - sh / 2 > floor + 4) {
        var cut = H.ext(H.rrect(sh, sw, sh / 2, 12), 0, t + 2).rotate([0, 90, 0]);
        box = box.subtract(cut.translate([L / 2 - t - 1, 0, zc])).subtract(cut.translate([-L / 2 - 1, 0, zc]));
      }
    }
    var lidT = 2.2, skirtD = 5, inner = rr(L, W, r, 0, lidT);
    var skirt = rr(L - 2 * t - 2 * cl, W - 2 * t - 2 * cl, r - t - cl, lidT, lidT + skirtD).subtract(rr(L - 2 * t - 2 * cl - 3.2, W - 2 * t - 2 * cl - 3.2, r - t - cl - 1.6, lidT - 0.01, lidT + skirtD + 1));
    var lid = inner.add(skirt);
    if (p.stack) lid = lid.add(rr(L - 2 * t - 2 * cl, W - 2 * t - 2 * cl, r - t - cl, -sd, 0.01));
    var lidOut = p.stack ? lid.translate([0, 0, sd]) : lid;
    return [{ name: de ? 'Box' : 'Box', mesh: H.toMesh(box) }, { name: de ? 'Deckel' : 'Lid', mesh: H.toMesh(lidOut) }];
  }
});
