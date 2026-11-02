/* Fensterplatte: Platte mit gebogenem Führungsschlitz, die über einen Stift oder Bolzen am Fensterrahmen geschoben wird. */
GenKit.define({
  id: 'windowplate', file: 'fensterplatte',
  fname: function (p) { return 'fensterplatte_' + p.len + 'x' + p.wid; },
  meta: {
    cat: 'caravan', slug: { de: 'fensterplatte-generator', en: 'window-plate-generator' },
    title: { de: 'Fensterplatte-Generator: Kurvenschlitz-Sicherung für Wohnwagenfenster als STL (kostenlos)', en: 'Window Plate Generator: curved-slot lock for caravan windows as STL (free)' },
    h1: { de: 'Fensterplatte mit Kurvenschlitz', en: 'Window plate with curved slot' },
    sub: { de: 'Eine flache Platte mit gebogenem Schlitz. Sie wird über Stift oder Schraubenkopf am Rahmen geschoben und gedreht, bis das Fenster nicht mehr aufgeht.', en: 'A flat plate with a curved slot. Slide it over a pin or screw head on the frame and turn it until the window no longer opens.' },
    desc: { de: 'Kostenloser Generator für Fenstersicherungen mit Kurvenschlitz für Wohnwagen und Wohnmobil, zum Beispiel für Hobby-Fenster. Schlitzbreite, Radius und Plattengröße einstellen, STL oder 3MF laden.', en: 'Free generator for curved-slot window locks for caravans and motorhomes, for example Hobby windows. Set slot width, radius and plate size, export STL or 3MF.' },
    tag: { de: 'Wohnwagen', en: 'Caravan' },
    intro: { de: ['Der Schlitz beginnt am Rand der Platte, führt gerade hinein und biegt dann ab. Der Stift am Fenster wandert beim Drehen in die Kurve und die Platte sitzt fest.', 'Gib den Durchmesser deines Stifts oder Schraubenkopfes ein, der Generator addiert das Spiel.'], en: ['The slot starts at the plate edge, runs straight in and then bends. When turned, the pin on the window moves into the curve and the plate locks.', 'Enter the diameter of your pin or screw head, the generator adds the clearance.'] },
    notes: { de: ['Sicherung gegen ungewolltes Öffnen und Klappern, kein Einbruchschutz.', 'Fluchtfenster dürfen nicht blockiert werden.', 'PETG oder ASA, mindestens 4 Wände, damit der Schlitzrand hält.', 'Die Presets sind Startwerte, miss Stift und Abstand an deinem Fenster.'], en: ['Secures against accidental opening and rattling, not burglar protection.', 'Escape windows must not be blocked.', 'PETG or ASA, at least 4 walls so the slot edge holds.', 'Presets are starting values, measure pin and spacing on your window.'] },
    faq: { de: [['Welcher Stift passt?', 'Alles zwischen 4 und 14 mm Durchmesser. Miss mit dem Messschieber.'], ['Wie fest sitzt die Platte?', 'Je enger die Kurve und je kleiner das Spiel, desto fester. Mit 0,3 mm Spiel sitzt sie stramm.']], en: [['Which pin fits?', 'Anything from 4 to 14 mm diameter. Measure with calipers.'], ['How tight is the plate?', 'The tighter the curve and the smaller the clearance, the tighter. 0.3 mm clearance is snug.']] }
  },
  groups: [
    { title: { de: 'Platte', en: 'Plate' }, items: [
      { k: 'len', t: 'num', min: 50, max: 140, step: 1, def: 100, unit: 'mm', label: { de: 'Länge', en: 'Length' } },
      { k: 'wid', t: 'num', min: 30, max: 90, step: 1, def: 55, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 'th', t: 'num', min: 3, max: 10, step: 0.5, def: 6, unit: 'mm', label: { de: 'Dicke', en: 'Thickness' } }
    ] },
    { title: { de: 'Schlitz', en: 'Slot' }, items: [
      { k: 'pin', t: 'num', min: 4, max: 14, step: 0.5, def: 7, unit: 'mm', label: { de: 'Stift- oder Kopfdurchmesser', en: 'Pin or head diameter' } },
      { k: 'clr', t: 'num', min: 0.2, max: 1, step: 0.05, def: 0.4, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } },
      { k: 'lead', t: 'num', min: 5, max: 60, step: 1, def: 25, unit: 'mm', label: { de: 'Gerader Einlauf', en: 'Straight lead-in' } },
      { k: 'rad', t: 'num', min: 8, max: 40, step: 1, def: 18, unit: 'mm', label: { de: 'Kurvenradius', en: 'Curve radius' } },
      { k: 'arc', t: 'num', min: 30, max: 180, step: 5, def: 90, unit: '°', label: { de: 'Kurvenwinkel', en: 'Curve angle' } }
    ] },
    { title: { de: 'Befestigung', en: 'Mounting' }, items: [
      { k: 'hole', t: 'bool', def: true, label: { de: 'Loch für Schnur oder Ring', en: 'Hole for cord or ring' } }
    ] }
  ],
  presets: [
    { label: { de: 'Hobby-Stil', en: 'Hobby style' }, v: { len: 100, wid: 55, th: 6, pin: 7, lead: 25, rad: 18, arc: 90 } },
    { label: { de: 'Klein', en: 'Small' }, v: { len: 70, wid: 40, th: 5, pin: 5, lead: 16, rad: 12, arc: 90 } },
    { label: { de: 'Groß, enge Kurve', en: 'Large, tight curve' }, v: { len: 120, wid: 70, th: 8, pin: 10, lead: 30, rad: 22, arc: 120 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, de = H.lang === 'de', L = p.len, W = p.wid, sw = p.pin + 2 * p.clr, r = sw / 2;
    var plate = H.ext(H.rrect(L, W, Math.min(6, W / 4), 48), 0, p.th).translate([L / 2, 0, 0]);
    /* Mittellinie: von x=0 gerade bis x=lead, dann Bogen nach +y */
    var rad = Math.min(p.rad, W / 2 - r - 3), lead = Math.min(p.lead, L - 10 - rad), pts = [[-1, 0], [lead, 0]], n = Math.max(6, Math.round(p.arc / 6));
    for (var i = 1; i <= n; i++) { var a = (p.arc * i / n) * Math.PI / 180; pts.push([lead + rad * Math.sin(a), rad - rad * Math.cos(a)]); }
    var prof = CS.circle(r, 24).translate(pts[0]);
    for (var j = 0; j < pts.length - 1; j++) {
      var a0 = pts[j], a1 = pts[j + 1], dx = a1[0] - a0[0], dy = a1[1] - a0[1], dl = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / dl * r, ny = dx / dl * r;
      prof = prof.add(CS.ofPolygons([[[a0[0] + nx, a0[1] + ny], [a0[0] - nx, a0[1] - ny], [a1[0] - nx, a1[1] - ny], [a1[0] + nx, a1[1] + ny]]])).add(CS.circle(r, 24).translate(a1));
    }
    var cut = H.ext(prof, -1, p.th + 1);
    plate = plate.subtract(cut);
    if (p.hole) plate = plate.subtract(H.cyl(L - 10, -W / 4, -1, p.th + 1, 5, 24));
    return [{ name: de ? 'Fensterplatte' : 'Window plate', mesh: H.toMesh(plate) }];
  }
});
