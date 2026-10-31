/* Spulenhalter: A-Rahmen mit offenen Lagerschalen, zwei Konusnaben, Achse. Optional 608-Kugellager. */
GenKit.define({
  id: 'spool', file: 'spulenhalter',
  fname: function (p) { return 'd' + p.sd + 'x' + p.sw; },
  meta: {
    cat: 'workshop', slug: { de: 'spulenhalter-generator', en: 'spool-holder-generator' },
    title: { de: 'Spulenhalter-Generator: Filamenthalter nach Maß als STL/3MF (kostenlos)', en: 'Spool Holder Generator: custom filament holder as STL/3MF (free)' },
    h1: { de: 'Spulenhalter-Generator', en: 'Spool Holder Generator' },
    sub: { de: 'Filamenthalter für jede Spule: Durchmesser, Breite und Kernbohrung eingeben, optional mit 608-Kugellagern für leichten Lauf.', en: 'A filament holder for any spool: enter diameter, width and core bore, optionally with 608 ball bearings for smooth running.' },
    desc: { de: 'Kostenloser Spulenhalter-Generator: Rahmen, Konusnaben und Achse für jede Filamentspule nach Maß, optional mit 608-Kugellagern. Export als STL und 3MF, direkt im Browser.', en: 'Free spool holder generator: frame, cone hubs and axle for any filament spool to size, optionally with 608 bearings. STL and 3MF export, right in your browser.' },
    tag: { de: 'Werkstatt', en: 'Workshop' },
    intro: { de: ['Der Halter besteht aus einem stabilen Rahmen mit zwei offenen Lagerschalen, zwei Konusnaben, die die Spule in der Mitte zentrieren, und einer Achse. Die Spule samt Naben wird auf die Achse gesteckt, die Achse einfach von oben in den Rahmen gelegt: kein Werkzeug, keine Schrauben.', 'Die Standardwerte passen für eine 1-kg-Spule mit 200 mm Durchmesser. Für eigene Spulen misst du Durchmesser, Breite und die Bohrung in der Mitte und trägst sie ein.'],
      en: ['The holder consists of a sturdy frame with two open bearing cradles, two cone hubs that centre the spool, and an axle. Slide the spool with its hubs onto the axle and simply drop the axle into the frame: no tools, no screws.', 'The defaults fit a 1 kg spool of 200 mm diameter. For your own spools, measure diameter, width and the centre bore and enter them.'] },
    notes: { de: ['Rahmen flach drucken (Seite nach unten), Naben mit der Bundseite nach unten, ohne Stützen.', 'Die Achse am besten liegend mit 4 Wänden drucken, so ist sie am stabilsten.', '3 Wände und 15 % Füllung tragen eine 1-kg-Spule. Für 5-kg-Spulen den Rahmen mit 4 Wänden und 25 % Füllung drucken.', 'Mit 608-Kugellagern (Skateboard-Lager, 8 × 22 × 7 mm) läuft die Spule fast ohne Widerstand. Ohne Lager läuft sie auf der glatten Achse.', 'Wenn die Naben zu stramm sitzen, die Bohrung der Spule um 0,5 mm kleiner eintragen oder die Naben leicht anschleifen.'],
      en: ['Print the frame flat (side down) and the hubs with the flange down, without supports.', 'Print the axle lying down with 4 walls, which makes it strongest.', '3 walls and 15 % infill carry a 1 kg spool. For 5 kg spools use 4 walls and 25 % infill for the frame.', 'With 608 bearings (skateboard bearings, 8 × 22 × 7 mm) the spool runs almost without resistance. Without bearings it turns on the smooth axle.', 'If the hubs fit too tight, enter a 0.5 mm smaller spool bore or sand the hubs lightly.'] },
    faq: { de: [['Welche Spulen passen?', 'Alle üblichen Spulen von etwa 100 bis 300 mm Durchmesser. Gib einfach Durchmesser, Breite und die Bohrung in der Mitte an. Die Bohrung beträgt bei den meisten Spulen 52 bis 58 mm.'], ['Brauche ich Kugellager?', 'Nein, sie sind optional. Die Lagerschalen und die Achse funktionieren auch ohne. Lager machen den Lauf leiser und leichter.'], ['Rutscht die Spule bei hohem Tempo?', 'Der Rahmen steht auf einer breiten Basis. Bei sehr schnellen Druckern stelle ihn auf eine rutschfeste Unterlage.']],
      en: [['Which spools fit?', 'All common spools from about 100 to 300 mm in diameter. Just enter diameter, width and the centre bore. Most spools have a bore of 52 to 58 mm.'], ['Do I need ball bearings?', 'No, they are optional. The cradles and the axle work without them. Bearings make the spool quieter and easier to turn.'], ['Does the holder slide around at high speed?', 'The frame has a wide base. With very fast printers, place it on a non-slip mat.']] }
  },
  groups: [
    { title: { de: 'Spule', en: 'Spool' }, items: [
      { k: 'sd', t: 'num', min: 80, max: 400, step: 1, def: 200, unit: 'mm', label: { de: 'Spulendurchmesser', en: 'Spool diameter' } },
      { k: 'sw', t: 'num', min: 25, max: 120, step: 1, def: 70, unit: 'mm', label: { de: 'Spulenbreite', en: 'Spool width' } },
      { k: 'bore', t: 'num', min: 20, max: 100, step: 0.5, def: 55, unit: 'mm', label: { de: 'Bohrung in der Spulenmitte', en: 'Spool centre bore' }, hint: { de: 'Innendurchmesser des Spulenkerns, meist 52 bis 58 mm.', en: 'Inner diameter of the spool core, usually 52 to 58 mm.' } },
      { k: 'bear', t: 'bool', def: false, label: { de: 'Mit 608-Kugellagern', en: 'With 608 ball bearings' } }
    ] },
    { title: { de: 'Rahmen & Achse', en: 'Frame & axle' }, items: [
      { k: 'fw', t: 'num', min: 8, max: 20, step: 0.5, def: 10, unit: 'mm', label: { de: 'Rahmendicke', en: 'Frame thickness' } },
      { k: 'ax', t: 'num', min: 6, max: 12, step: 0.5, def: 8, unit: 'mm', label: { de: 'Achsdurchmesser', en: 'Axle diameter' } },
      { k: 'lift', t: 'num', min: 0, max: 40, step: 1, def: 12, unit: 'mm', label: { de: 'Abstand Spule zum Tisch', en: 'Gap spool to table' } },
      { k: 'cl', t: 'num', min: 0.1, max: 0.6, step: 0.05, def: 0.25, unit: 'mm', label: { de: 'Spiel (Passung)', en: 'Clearance (fit)' } }
    ] }
  ],
  presets: [
    { label: { de: '1 kg Standardspule (200 × 70)', en: '1 kg standard spool (200 × 70)' }, v: { sd: 200, sw: 70, bore: 55 } },
    { label: { de: '1 kg schmale Spule (200 × 55)', en: '1 kg narrow spool (200 × 55)' }, v: { sd: 200, sw: 55, bore: 55 } },
    { label: { de: '500 g Spule (165 × 55)', en: '500 g spool (165 × 55)' }, v: { sd: 165, sw: 55, bore: 55 } },
    { label: { de: '250 g Spule (150 × 50)', en: '250 g spool (150 × 50)' }, v: { sd: 150, sw: 50, bore: 52 } },
    { label: { de: '3 kg Spule (300 × 105)', en: '3 kg spool (300 × 105)' }, v: { sd: 300, sw: 105, bore: 55 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, t = p.fw, cl = p.cl, ax = p.ax;
    var collar = 4, cone = 12, gap = p.sw + 2 * (collar + 2);                 /* lichte Weite zwischen den Rahmenseiten */
    var C = p.sd / 2 + p.lift, axleZ = C + 6, L = Math.max(120, p.sd * 0.9), top = 26, bh = 14, rail = 16;
    /* Seitenteil (A-Form) in XZ, Dicke t entlang Y */
    function sideProfile() {
      var outer = [[-L / 2, 0], [L / 2, 0], [top / 2, axleZ], [-top / 2, axleZ]];
      var inset = 14, hole = [[-L / 2 + inset + 10, bh], [L / 2 - inset - 10, bh], [top / 2 + 2, axleZ - 22], [-top / 2 - 2, axleZ - 22]];
      var o = CS.ofPolygons([outer]); if (hole[0][0] < hole[1][0] && hole[2][0] > hole[3][0] && axleZ - 22 > bh + 6) o = o.subtract(CS.ofPolygons([hole]));
      return o;
    }
    var prof = sideProfile();
    var notchR = ax / 2 + cl + 0.1;
    function side(y0) {
      var s = Mf.extrude(prof, t).rotate([90, 0, 0]).translate([0, t, 0]);     /* Profil in XZ, Dicke von y=0..t */
      s = s.translate([0, y0, 0]);
      var nt = H.box(-notchR, y0 - 1, C, notchR, y0 + t + 1, axleZ + 1).add(Mf.cylinder(t + 2, notchR, notchR, 40, false).rotate([-90, 0, 0]).translate([0, y0 - 1, C]));
      /* Lagerschale: Zylinder um die Achsmitte, darüber ein offener Schlitz */
      return s.subtract(nt);
    }
    var y2 = t + gap;
    var frame = side(0).add(side(y2));
    [-L / 2 + rail / 2 + 6, L / 2 - rail / 2 - 6].forEach(function (x) { frame = frame.add(H.box(x - rail / 2, t - 0.01, 0, x + rail / 2, y2 + 0.01, bh)); });
    /* Achse: Kopf außen, liegend gedruckt (x-Achse) */
    var alen = gap + 2 * t + 10, axle = Mf.cylinder(alen, ax / 2, ax / 2, 40, false).rotate([0, 90, 0]).add(Mf.cylinder(4, ax / 2 + 4, ax / 2 + 4, 40, false).rotate([0, 90, 0]).translate([-4 + 0.01, 0, 0]));
    /* Nabe: Bund + Konus, Bohrung für Achse oder 608-Lager (Tasche außen) */
    function hub() {
      var cd = Math.max(p.bore + 14, p.bear ? 31 : 0), r0 = p.bore - 0.5 - cl, r1 = p.bore - 3.5;
      var h = Mf.cylinder(collar, cd / 2, cd / 2, 56, false).add(Mf.cylinder(cone, r0 / 2, r1 / 2, 56, false).translate([0, 0, collar - 0.01]));
      var total = collar + cone;
      if (p.bear) { h = h.subtract(Mf.cylinder(7.3, 11.2 + cl, 11.2 + cl, 48, false).translate([0, 0, -0.01])); h = h.subtract(Mf.cylinder(total + 2, ax / 2 + 1.2, ax / 2 + 1.2, 40, false).translate([0, 0, -1])); }
      else h = h.subtract(Mf.cylinder(total + 2, ax / 2 + cl + 0.15, ax / 2 + cl + 0.15, 40, false).translate([0, 0, -1]));
      return h;
    }
    var out = [{ name: 'Rahmen', mesh: H.toMesh(frame) }, { name: 'Achse', mesh: H.toMesh(axle) }];
    out.push({ name: 'Nabe 1', mesh: H.toMesh(hub()) }); out.push({ name: 'Nabe 2', mesh: H.toMesh(hub()) });
    return out;
  }
});
