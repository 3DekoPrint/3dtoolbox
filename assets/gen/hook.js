/* Wandhaken: Platte mit 1 bis 4 Haken, Senkschrauben, Verstärkung. Liegend gedruckt. */
GenKit.define({
  id: 'hook', file: 'wandhaken',
  fname: function (p) { return p.n + 'x' + p.reach; },
  meta: {
    cat: 'home', slug: { de: 'wandhaken-generator', en: 'wall-hook-generator' },
    title: { de: 'Wandhaken-Generator: Haken & Garderobe nach Maß als STL/3MF (kostenlos)', en: 'Wall Hook Generator: custom hooks & coat racks as STL/3MF (free)' },
    h1: { de: 'Wandhaken-Generator', en: 'Wall Hook Generator' },
    sub: { de: 'Haken für Jacken, Taschen oder Werkzeug: Anzahl, Ausladung und Stärke einstellen, STL oder 3MF laden.', en: 'Hooks for jackets, bags or tools: set number, reach and strength, download STL or 3MF.' },
    desc: { de: 'Kostenloser Wandhaken-Generator: 1 bis 4 Haken auf einer Platte mit Senkschrauben, Verstärkung und frei wählbarer Ausladung. Export als STL und 3MF.', en: 'Free wall hook generator: 1 to 4 hooks on one plate with countersunk screws, gusset and adjustable reach. Export as STL and 3MF.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Der Haken wird liegend gedruckt, so verlaufen die Schichten entlang des Hakens und er hält deutlich mehr Last als ein stehend gedruckter.', 'Die Verstärkung unter dem Arm nimmt die Kraft auf. Zwei Senkschrauben halten die Platte an der Wand.'], en: ['The hook prints lying down so the layers run along the hook, which holds far more load than a hook printed upright.', 'The gusset under the arm takes the force. Two countersunk screws hold the plate to the wall.'] },
    notes: { de: ['Auf der Rückseite liegend drucken, ohne Stützen.', 'PETG, 4 Wände und 40 % Füllung für schwere Jacken.', 'Dübel und Schrauben müssen zur Wand passen: bei Gipskarton Hohlraumdübel nehmen.'], en: ['Print lying on its back without supports.', 'PETG, 4 walls and 40 % infill for heavy jackets.', 'Anchors and screws must suit the wall: use cavity anchors in drywall.'] },
    faq: { de: [['Wie viel hält ein Haken?', 'Das hängt von Material, Wänden und Befestigung ab. Für Jacken und Taschen genügt PETG mit der Standardstärke. Für schwere Lasten wähle mehr Stärke und Breite.'], ['Welche Schrauben?', 'Senkkopfschrauben 3,5 bis 4,5 mm. Das Loch ist 4 mm, der Kopf versenkt.']], en: [['How much does a hook hold?', 'That depends on material, wall and fixing. PETG with the default strength suits jackets and bags. For heavy loads pick more strength and width.'], ['Which screws?', 'Countersunk screws 3.5 to 4.5 mm. The hole is 4 mm with a countersunk head.']] }
  },
  groups: [
    { title: { de: 'Haken', en: 'Hooks' }, items: [
      { k: 'n', t: 'int', min: 1, max: 4, step: 1, def: 1, label: { de: 'Anzahl Haken', en: 'Number of hooks' } },
      { k: 'reach', t: 'num', min: 20, max: 120, step: 1, def: 45, unit: 'mm', label: { de: 'Ausladung', en: 'Reach' } },
      { k: 'lip', t: 'num', min: 5, max: 50, step: 1, def: 18, unit: 'mm', label: { de: 'Höhe der Spitze', en: 'Tip height' } },
      { k: 'sp', t: 'num', min: 30, max: 150, step: 1, def: 60, unit: 'mm', label: { de: 'Abstand zwischen Haken', en: 'Spacing between hooks' }, show: function (p) { return p.n > 1; } }
    ] },
    { title: { de: 'Stärke & Platte', en: 'Strength & plate' }, items: [
      { k: 'w', t: 'num', min: 8, max: 60, step: 0.5, def: 20, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'th', t: 'num', min: 4, max: 20, step: 0.5, def: 8, unit: 'mm', label: { de: 'Stärke des Arms', en: 'Arm thickness' } },
      { k: 'pt', t: 'num', min: 3, max: 12, step: 0.5, def: 6, unit: 'mm', label: { de: 'Plattendicke', en: 'Plate thickness' } },
      { k: 'sd', t: 'num', min: 2.5, max: 6, step: 0.1, def: 4, unit: 'mm', label: { de: 'Schraubenloch', en: 'Screw hole' } }
    ] }
  ],
  presets: [
    { label: { de: 'Einzelhaken für Jacken', en: 'Single jacket hook' }, v: { n: 1, reach: 45, lip: 18, w: 20, th: 8 } },
    { label: { de: 'Garderobe mit 3 Haken', en: 'Coat rack with 3 hooks' }, v: { n: 3, reach: 50, lip: 20, w: 22, th: 8, sp: 70 } },
    { label: { de: 'Kleiner Schlüsselhaken', en: 'Small key hook' }, v: { n: 1, reach: 25, lip: 12, w: 12, th: 5, pt: 4 } },
    { label: { de: 'Schwerer Werkstatthaken', en: 'Heavy workshop hook' }, v: { n: 1, reach: 70, lip: 25, w: 30, th: 12, pt: 8 } },
    { label: { de: 'Kopfhörerhalter', en: 'Headphone hanger' }, v: { n: 1, reach: 60, lip: 15, w: 40, th: 8 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, t = p.pt, th = p.th, n = Math.round(p.n), g = Math.min(p.reach * 0.6, th * 2.2), margin = Math.max(p.sd * 3, 14), per = th + p.lip;
    var Hh = (n - 1) * (n > 1 ? p.sp : 0) + per + 2 * margin, y0 = margin, prof = CS.square([t, Hh], false), k;
    for (k = 0; k < n; k++) {
      var yb = y0 + k * (n > 1 ? p.sp : 0), x1 = t + p.reach;
      prof = prof.add(CS.square([p.reach + 0.01, th], false).translate([t - 0.01, yb]));
      prof = prof.add(CS.square([th, th + p.lip], false).translate([x1 - th, yb]));
      prof = prof.add(CS.ofPolygons([[[t - 0.01, yb - g], [t + g, yb + 0.01], [t - 0.01, yb + 0.01]]]));
    }
    var body = Mf.extrude(prof, p.w);
    var ys = [margin * 0.5 + 0, Hh - margin * 0.5];
    ys.forEach(function (y) {
      body = body.subtract(Mf.cylinder(t + 2, p.sd / 2, p.sd / 2, 32, false).rotate([0, 90, 0]).translate([-1, y, p.w / 2]));
      var cs = Math.min(t - 1.2, p.sd * 0.5 + 0.8);
      body = body.subtract(Mf.cylinder(cs + 0.01, p.sd / 2, p.sd / 2 + cs, 32, false).rotate([0, 90, 0]).translate([t - cs, y, p.w / 2]));
    });
    return [{ name: H.lang === 'en' ? 'Hook' : 'Haken', mesh: H.toMesh(body) }];
  }
});
