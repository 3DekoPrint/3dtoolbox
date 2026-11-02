/* Stangenklemme: Klemmring mit Ohren für Rundstangen (Fensterstellarm, Gestänge). */
GenKit.define({
  id: 'rodclamp', file: 'stangenklemme',
  fname: function (p) { return 'klemme_' + p.rod; },
  meta: {
    cat: 'caravan', slug: { de: 'stangenklemme-generator', en: 'rod-clamp-generator' },
    title: { de: 'Stangenklemme-Generator: Stopper für Fensterarm und Gestänge als STL (kostenlos)', en: 'Rod Clamp Generator: stopper for window arms and rods as STL (free)' },
    h1: { de: 'Stangenklemme', en: 'Rod clamp' },
    sub: { de: 'Klemmring für Stangen und Arme: hält Fensterstellarm, Teleskopstange oder Dachluke in Position. Mit Schraube M3 oder M4 festziehen.', en: 'A clamp ring for rods and arms: holds window stay arms, telescopic rods or roof vents in position. Tighten with an M3 or M4 screw.' },
    desc: { de: 'Kostenloser Stangenklemme-Generator für den 3D-Druck: Klemmring mit Ohren für Fensterstellarme, Teleskopstangen und Gestänge im Wohnwagen und Wohnmobil. Export als STL und 3MF.', en: 'Free rod clamp generator for 3D printing: clamp ring with ears for window stay arms, telescopic rods and frames in caravans and motorhomes. Export as STL and 3MF.' },
    tag: { de: 'Wohnwagen', en: 'Caravan' },
    intro: { de: ['Gib den Stangendurchmesser ein. Der Ring schließt die Stange ein und wird mit einer Schraube durch die Ohren festgezogen.', 'Als Anschlag am Fensterarm verhindert er, dass sich das Fenster weiter öffnet. Er ersetzt keine Sicherung gegen Einbruch.'], en: ['Enter the rod diameter. The ring wraps the rod and is tightened with a screw through the ears.', 'As a stop on a window arm it keeps the window from opening further. It does not replace burglary protection.'] },
    notes: { de: ['Aufrecht drucken, mit der Öffnung nach oben, ohne Stützen.', 'Die Schraube nicht überdrehen, PETG federt, PLA kann brechen.', 'Für bewegliche, belastete Teile bleiben Metallklemmen die bessere Wahl.'], en: ['Print upright with the opening facing up, no supports.', 'Do not overtighten the screw, PETG flexes, PLA can crack.', 'For moving, loaded parts metal clamps are the better choice.'] },
    faq: { de: [['Welche Schraube passt?', 'M3 für kleine Stangen bis etwa 12 mm, M4 für größere. Die Mutter kann in die Sechskantaufnahme.'], ['Hält die Klemme dauerhaft?', 'Für leichte Anwendungen ja. Bei Wärme kann PLA nachgeben, nimm PETG oder ASA.']], en: [['Which screw fits?', 'M3 for small rods up to about 12 mm, M4 for larger. The nut sits in the hex pocket.'], ['Does the clamp hold permanently?', 'For light uses yes. PLA can give in with heat, use PETG or ASA.']] }
  },
  groups: [
    { title: { de: 'Stange', en: 'Rod' }, items: [
      { k: 'rod', t: 'num', min: 4, max: 50, step: 0.1, def: 10, unit: 'mm', label: { de: 'Stangendurchmesser', en: 'Rod diameter' } },
      { k: 'cl', t: 'num', min: 0, max: 0.6, step: 0.05, def: 0.2, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } },
      { k: 'h', t: 'num', min: 6, max: 40, step: 1, def: 14, unit: 'mm', label: { de: 'Höhe des Rings', en: 'Ring height' } },
      { k: 'wall', t: 'num', min: 2, max: 8, step: 0.2, def: 3, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } }
    ] },
    { title: { de: 'Schraube', en: 'Screw' }, items: [
      { k: 'screw', t: 'sel', def: '3', str: true, label: { de: 'Schraubengröße', en: 'Screw size' }, opts: [['3', { de: 'M3', en: 'M3' }], ['4', { de: 'M4', en: 'M4' }], ['5', { de: 'M5', en: 'M5' }]] },
      { k: 'nut', t: 'bool', def: true, label: { de: 'Sechskant-Aufnahme für die Mutter', en: 'Hex pocket for the nut' } }
    ] }
  ],
  presets: [
    { label: { de: 'Fensterarm 10 mm', en: 'Window arm 10 mm' }, v: { rod: 10, h: 14, wall: 3, screw: '3' } },
    { label: { de: 'Teleskopstange 20 mm', en: 'Telescopic rod 20 mm' }, v: { rod: 20, h: 18, wall: 3.5, screw: '4' } },
    { label: { de: 'Dünner Draht 6 mm', en: 'Thin rod 6 mm' }, v: { rod: 6, h: 10, wall: 2.4, screw: '3' } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, de = H.lang === 'de', R = p.rod / 2 + p.cl, wl = p.wall, h = p.h, sd = parseFloat(p.screw), ear = sd + 6;
    var ring = H.cyl(0, 0, 0, h, 2 * (R + wl), 64);
    var ears = H.box(R + wl - 2, -ear / 2 - 1.5, 0, R + wl + ear + 2, ear / 2 + 1.5, h);
    var body = ring.add(ears).subtract(H.cyl(0, 0, -1, h + 1, 2 * R, 64)).subtract(H.box(0, -0.6, -1, R + wl + ear + 3, 0.6, h + 1));
    var zc = h / 2, sx = R + wl + ear / 2 + 0.5;
    body = body.subtract(Mf.cylinder(ear * 3, (sd + 0.4) / 2, (sd + 0.4) / 2, 20, false).rotate([90, 0, 0]).translate([sx, ear * 1.5, zc]));
    if (p.nut) body = body.subtract(Mf.extrude(m.CrossSection.circle((sd * 1.8 + 0.4) / 2 / Math.cos(Math.PI / 6) * 0.98, 6), sd * 0.9).rotate([90, 0, 0]).translate([sx, ear / 2 + 1.6, zc]));
    return [{ name: de ? 'Stangenklemme' : 'Rod clamp', mesh: H.toMesh(body) }];
  }
});
