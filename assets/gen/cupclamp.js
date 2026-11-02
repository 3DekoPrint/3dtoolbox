/* Becherhalter zum Einklemmen an Tischkanten (Campingtisch). */
GenKit.define({
  id: 'cupclamp', file: 'becherhalter',
  fname: function (p) { return 'becherhalter_' + p.cup; },
  meta: {
    cat: 'camping', slug: { de: 'becherhalter-generator', en: 'cup-holder-clamp-generator' },
    title: { de: 'Becherhalter-Generator: Klemm-Halter für Campingtisch als STL (kostenlos)', en: 'Cup Holder Clamp Generator for camping tables as STL (free)' },
    h1: { de: 'Becherhalter zum Klemmen', en: 'Clamp-on cup holder' },
    sub: { de: 'Halter für Becher, Flasche oder Dose, der an der Tischkante klemmt. Becherdurchmesser und Tischdicke einstellen, STL laden.', en: 'A holder for cups, bottles or cans that clamps to the table edge. Set cup diameter and table thickness, download STL.' },
    desc: { de: 'Kostenloser Becherhalter-Generator für den 3D-Druck: Klemmhalter für Campingtische mit einstellbarem Becherdurchmesser, Tischdicke und Wandstärke. Export als STL und 3MF.', en: 'Free cup holder generator for 3D printing: clamp holder for camping tables with adjustable cup diameter, table thickness and wall. Export as STL and 3MF.' },
    tag: { de: 'Camping', en: 'Camping' },
    intro: { de: ['Miss den Durchmesser deines Bechers (oder der Flasche) und die Dicke der Tischplatte. Der Halter klemmt sich über die Kante und trägt das Getränk neben dem Tisch.', 'Die Klemme sitzt eng und lässt sich bei Bedarf mit einer Schraube sichern, wenn du die Bohrung einschaltest.'], en: ['Measure your cup or bottle diameter and the thickness of the table top. The holder clamps over the edge and carries the drink next to the table.', 'The clamp fits snugly and can be secured with a screw if you switch the bore on.'] },
    notes: { de: ['Mit der Rückwand nach unten drucken, die Klemmarme brauchen dann Stützen.', 'PETG ist belastbarer als PLA. Für Tischkanten mit Radius 1 mm Spiel lassen.', 'Der Halter ist für Getränke gedacht, nicht für schwere Lasten.'], en: ['Print with the back plate down, the clamp arms need supports.', 'PETG is stronger than PLA. For table edges with a radius leave 1 mm clearance.', 'The holder is meant for drinks, not heavy loads.'] },
    faq: { de: [['Welche Tischdicke passt?', 'Das stellst du selbst ein, zum Beispiel 20 mm bei Klapptischen. Gib 0,5 mm Spiel dazu.'], ['Hält die Flasche sicher?', 'Für Becher und Flaschen bis etwa 1 Liter ja, solange der Tisch nicht wackelt.']], en: [['Which table thickness fits?', 'You set it yourself, for example 20 mm for folding tables. Add 0.5 mm clearance.'], ['Does it hold a bottle safely?', 'For cups and bottles up to about 1 litre yes, as long as the table does not wobble.']] }
  },
  groups: [
    { title: { de: 'Becher', en: 'Cup' }, items: [
      { k: 'cup', t: 'num', min: 40, max: 120, step: 1, def: 75, unit: 'mm', label: { de: 'Becherdurchmesser', en: 'Cup diameter' } },
      { k: 'rh', t: 'num', min: 20, max: 120, step: 1, def: 60, unit: 'mm', label: { de: 'Höhe des Halters', en: 'Holder height' } },
      { k: 'wall', t: 'num', min: 1.6, max: 5, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'drain', t: 'bool', def: true, label: { de: 'Löcher im Boden', en: 'Holes in the floor' } }
    ] },
    { title: { de: 'Klemme', en: 'Clamp' }, items: [
      { k: 'tt', t: 'num', min: 8, max: 60, step: 0.5, def: 22, unit: 'mm', label: { de: 'Tischdicke', en: 'Table thickness' } },
      { k: 'cd', t: 'num', min: 20, max: 80, step: 1, def: 40, unit: 'mm', label: { de: 'Tiefe der Klemme', en: 'Clamp depth' } },
      { k: 'cw', t: 'num', min: 20, max: 80, step: 1, def: 40, unit: 'mm', label: { de: 'Breite der Klemme', en: 'Clamp width' } },
      { k: 'screw', t: 'bool', def: false, label: { de: 'Bohrung für Klemmschraube M6', en: 'M6 clamp screw hole' } }
    ] }
  ],
  presets: [
    { label: { de: 'Becher 75 mm, Tisch 22 mm', en: 'Cup 75 mm, table 22 mm' }, v: { cup: 75, tt: 22, rh: 60, cd: 40, cw: 40 } },
    { label: { de: 'Dosen 66 mm, Tisch 18 mm', en: 'Cans 66 mm, table 18 mm' }, v: { cup: 67, tt: 18, rh: 70, cd: 35, cw: 36 } },
    { label: { de: 'Flasche 85 mm, Tisch 30 mm', en: 'Bottle 85 mm, table 30 mm' }, v: { cup: 85, tt: 30, rh: 80, cd: 45, cw: 44 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, de = H.lang === 'de', R = p.cup / 2 + 0.6, wl = p.wall, rh = p.rh, tt = p.tt + 0.5, a = 5, zt = rh;
    if (zt - tt - a < 4) throw new Error('Halter zu niedrig');
    var ring = H.cyl(0, 0, 0, rh, 2 * (R + wl), 64).subtract(H.cyl(0, 0, 3, rh + 1, 2 * R, 64));
    var floor = ring;
    if (p.drain) floor = floor.subtract(H.cyl(0, 0, -1, 4, 12, 24));
    var xp = R + wl - 1;
    var plate = H.box(xp, -p.cw / 2, 0, xp + a, p.cw / 2, zt + a);
    var top = H.box(xp, -p.cw / 2, zt, xp + a + p.cd, p.cw / 2, zt + a);
    var bot = H.box(xp, -p.cw / 2, zt - tt - a, xp + a + p.cd, p.cw / 2, zt - tt);
    var body = floor.add(plate).add(top).add(bot);
    if (p.screw) body = body.subtract(H.cyl(xp + a + p.cd / 2, 0, zt - tt - a - 1, zt - tt + 1, 6.4, 24));
    return [{ name: de ? 'Becherhalter' : 'Cup holder', mesh: H.toMesh(body) }];
  }
});
