/* Schrank- und Türhaken: Grundplatte mit drehbarem Haken (Print-in-Place) und Stiftplatte als Gegenstück. */
GenKit.define({
  id: 'doorcatch', file: 'tuerhaken',
  fname: function (p) { return 'tuerhaken_' + p.arm; },
  meta: {
    cat: 'caravan', slug: { de: 'tuerhaken-generator', en: 'door-hook-generator' },
    title: { de: 'Türhaken-Generator: Transportsicherung für Schränke im Wohnmobil als STL (kostenlos)', en: 'Door Hook Generator: transport latch for cupboards in motorhomes as STL (free)' },
    h1: { de: 'Türhaken', en: 'Door hook' },
    sub: { de: 'Haken mit Stiftplatte, der Schranktüren und Schubladen während der Fahrt geschlossen hält. Der Haken dreht sich, in einem Stück gedruckt.', en: 'A hook with a pin plate that keeps cupboard doors and drawers closed while driving. The hook swivels, printed in one piece.' },
    desc: { de: 'Kostenloser Generator für Transportsicherungen im Wohnmobil und Wohnwagen: Haken mit drehbarem Arm (Print-in-Place) und Stiftplatte für Schränke und Schubladen. Export als STL und 3MF.', en: 'Free generator for transport latches in motorhomes and caravans: hook with swivelling arm (print-in-place) and pin plate for cupboards and drawers. Export as STL and 3MF.' },
    tag: { de: 'Wohnwagen', en: 'Caravan' },
    intro: { de: ['Du bekommst zwei Teile: die Grundplatte mit dem drehbaren Haken und die Stiftplatte. Die Grundplatte schraubst du auf den Rahmen, die Stiftplatte an die Tür.', 'Der Haken fällt hinter den Stift und hält die Tür zu. Mit dem Griff am Haken gibst du die Tür wieder frei.'], en: ['You get two parts: the base plate with the swivel hook and the pin plate. Screw the base to the frame and the pin plate to the door.', 'The hook drops behind the pin and keeps the door shut. Lift it by the grip to release the door.'] },
    notes: { de: ['Grundplatte flach drucken, der Haken ist in einem Stück mitgedruckt (Spalt einstellbar).', 'PETG hält besser als PLA, das im heißen Fahrzeug weich wird.', 'Es ist eine Transportsicherung gegen Aufspringen, keine Sicherung gegen Kinder oder Einbruch.', 'Nach dem Druck den Haken von Hand lösen und mehrmals bewegen.'], en: ['Print the base flat, the hook is printed in one piece with it (gap adjustable).', 'PETG holds better than PLA, which softens in a hot vehicle.', 'It is a transport latch against doors popping open, not child-proofing or burglar protection.', 'After printing free the hook by hand and move it several times.'] },
    faq: { de: [['Welche Schrauben?', 'Flachkopf- oder Senkkopfschrauben 3 bis 4 mm. Die Löcher sind im Generator einstellbar.'], ['Der Haken klemmt, was tun?', 'Spalt auf 0,5 mm erhöhen, nach dem Druck mehrmals bewegen.']], en: [['Which screws?', 'Flat or countersunk screws, 3 to 4 mm. The holes can be set in the generator.'], ['The hook sticks, what now?', 'Raise the gap to 0.5 mm and move it a few times after printing.']] }
  },
  groups: [
    { title: { de: 'Haken', en: 'Hook' }, items: [
      { k: 'arm', t: 'num', min: 25, max: 80, step: 1, def: 40, unit: 'mm', label: { de: 'Länge des Hakenarms', en: 'Hook arm length' } },
      { k: 'aw', t: 'num', min: 8, max: 24, step: 1, def: 12, unit: 'mm', label: { de: 'Breite des Arms', en: 'Arm width' } },
      { k: 'ath', t: 'num', min: 2, max: 6, step: 0.5, def: 3, unit: 'mm', label: { de: 'Dicke des Arms', en: 'Arm thickness' } },
      { k: 'gap', t: 'num', min: 0.2, max: 0.8, step: 0.05, def: 0.4, unit: 'mm', label: { de: 'Spalt', en: 'Gap' } },
      { k: 'pin', t: 'num', min: 3, max: 8, step: 0.5, def: 5, unit: 'mm', label: { de: 'Stiftdurchmesser', en: 'Pin diameter' } }
    ] },
    { title: { de: 'Platten', en: 'Plates' }, items: [
      { k: 'pw', t: 'num', min: 16, max: 40, step: 1, def: 24, unit: 'mm', label: { de: 'Breite der Platten', en: 'Plate width' } },
      { k: 'pt', t: 'num', min: 2.5, max: 6, step: 0.5, def: 3.5, unit: 'mm', label: { de: 'Dicke der Platten', en: 'Plate thickness' } },
      { k: 'screw', t: 'num', min: 2.5, max: 6, step: 0.1, def: 3.5, unit: 'mm', label: { de: 'Schraubenloch', en: 'Screw hole' } }
    ] }
  ],
  presets: [
    { label: { de: 'Schranktür Standard', en: 'Cupboard door standard' }, v: { arm: 40, aw: 12, ath: 3, pin: 5, pw: 24, pt: 3.5 } },
    { label: { de: 'Schublade kompakt', en: 'Drawer compact' }, v: { arm: 30, aw: 10, ath: 2.5, pin: 4, pw: 20, pt: 3 } },
    { label: { de: 'Kräftig für große Türen', en: 'Sturdy for large doors' }, v: { arm: 55, aw: 16, ath: 4, pin: 6, pw: 30, pt: 4 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de', t = p.pt, g = p.gap, a = p.arm, aw = p.aw, th = p.ath, rp = p.pin / 2, pw = p.pw, PL = a + 28;
    var base = H.ext(H.rrect(PL, pw, 4), 0, t).translate([PL / 2 - 12, 0, 0]);
    var zA = t + g, post = H.cyl(0, 0, t - 0.01, zA + th + g + 1.6, p.pin, 32).add(H.cyl(0, 0, zA + th + g, zA + th + g + 1.6, p.pin + 3, 32));
    var arm = H.ext(H.rrect(a + aw, aw, aw / 2.2), zA, zA + th).translate([a / 2, 0, 0]);
    var slot = H.box(a - 1, -(p.pin + 0.8) / 2, zA - 1, a + aw, (p.pin + 0.8) / 2, zA + th + 6);
    var hook = arm.add(H.cyl(a * 0.55, 0, zA + th - 0.01, zA + th + 5, 8, 20)).subtract(slot).subtract(H.cyl(0, 0, zA - 1, zA + th + 1, p.pin + 2 * g + 0.4, 32));
    var holes = [[-6, 0], [PL - 18, 0]].forEach(function (c) { base = base.subtract(H.cyl(c[0], c[1], -1, t + 1, p.screw, 24)); });
    var unit = base.add(post).add(hook);
    var strike = H.ext(H.rrect(44, pw, 4), 0, t).translate([10, 0, 0]).add(H.cyl(0, 0, t - 0.01, t + th + 2.5, p.pin, 32)).add(H.cyl(0, 0, t + th + 1.2, t + th + 2.5, p.pin + 2.5, 32));
    [-7, 25].forEach(function (x) { strike = strike.subtract(H.cyl(x, 0, -1, t + 1, p.screw, 24)); });
    return [{ name: de ? 'Grundplatte mit Haken' : 'Base with hook', mesh: H.toMesh(unit) }, { name: de ? 'Stiftplatte' : 'Pin plate', mesh: H.toMesh(strike) }];
  }
});
