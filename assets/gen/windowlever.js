/* Griffkappe: Klotz mit Tasche, der über den Fenstergriff oder Hebel geschoben wird und ihn blockiert. */
GenKit.define({
  id: 'windowlever', file: 'griffkappe',
  fname: function (p) { return 'griffkappe_' + p.lw + 'x' + p.lt; },
  meta: {
    cat: 'caravan', slug: { de: 'fenster-griffkappe-generator', en: 'window-handle-cap-generator' },
    title: { de: 'Fenster-Griffkappe: Hebel-Sicherung für Wohnwagen und Wohnmobil als STL (kostenlos)', en: 'Window Handle Cap: lever lock for caravans and motorhomes as STL (free)' },
    h1: { de: 'Fenster-Griffkappe', en: 'Window handle cap' },
    sub: { de: 'Ein Klotz mit Tasche, den du über den Fensterhebel schiebst. So bleibt der Hebel in der Raststellung, auch bei Fahrtwind und Rütteln.', en: 'A block with a pocket you slide over the window lever. The lever stays in its detent, even with wind and vibration.' },
    desc: { de: 'Kostenloser Generator für Griffkappen und Hebelsicherungen an Wohnwagen- und Wohnmobilfenstern. Hebelbreite, Hebeldicke und Einschubtiefe eingeben, STL oder 3MF laden.', en: 'Free generator for handle caps and lever locks on caravan and motorhome windows. Enter lever width, thickness and insertion depth, export STL or 3MF.' },
    tag: { de: 'Wohnwagen', en: 'Caravan' },
    intro: { de: ['Miss den Fensterhebel an der dicksten Stelle: Breite und Dicke. Der Generator macht daraus eine Tasche mit einstellbarem Spiel.', 'Die Kappe wird flach gedruckt, die Tasche liegt unten. Eine Bohrung am Ende nimmt eine Schnur oder einen Ring auf, damit die Kappe nicht verloren geht.'], en: ['Measure the window lever at its thickest point: width and thickness. The generator turns that into a pocket with adjustable clearance.', 'Print the cap flat with the pocket facing down. A hole at the end takes a cord or ring so the cap is not lost.'] },
    notes: { de: ['Das ist eine Sicherung gegen unbeabsichtigtes Öffnen, kein Einbruchschutz.', 'Fluchtfenster dürfen nicht blockiert werden. Die Kappe muss sich schnell abziehen lassen.', 'PETG oder ASA nehmen, PLA wird im heißen Fahrzeug weich.', 'Erst einen kurzen Probedruck mit Einschubtiefe 10 mm machen, dann passt das Spiel.'], en: ['This secures against accidental opening, it is not burglar protection.', 'Escape windows must not be blocked. The cap has to come off quickly.', 'Use PETG or ASA, PLA softens in a hot vehicle.', 'Print a short test piece with 10 mm depth first to check the fit.'] },
    faq: { de: [['Welches Fenster passt?', 'Alles mit einem Hebel oder Griff, den du messen kannst. Die Presets sind Startwerte, miss deinen Hebel mit einem Messschieber nach.'], ['Sitzt die Kappe zu fest?', 'Spiel auf 0,5 mm erhöhen. Zu locker: 0,3 mm.']], en: [['Which window fits?', 'Any window with a lever or handle you can measure. The presets are starting values, check your lever with calipers.'], ['The cap is too tight?', 'Raise the clearance to 0.5 mm. Too loose: 0.3 mm.']] }
  },
  groups: [
    { title: { de: 'Hebel', en: 'Lever' }, items: [
      { k: 'lw', t: 'num', min: 8, max: 40, step: 0.5, def: 16, unit: 'mm', label: { de: 'Hebelbreite', en: 'Lever width' } },
      { k: 'lt', t: 'num', min: 3, max: 20, step: 0.5, def: 7, unit: 'mm', label: { de: 'Hebeldicke', en: 'Lever thickness' } },
      { k: 'dep', t: 'num', min: 10, max: 80, step: 1, def: 40, unit: 'mm', label: { de: 'Einschubtiefe', en: 'Insertion depth' } },
      { k: 'clr', t: 'num', min: 0.2, max: 1, step: 0.05, def: 0.4, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } }
    ] },
    { title: { de: 'Kappe', en: 'Cap' }, items: [
      { k: 'wall', t: 'num', min: 2, max: 8, step: 0.5, def: 3.5, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'tail', t: 'num', min: 0, max: 40, step: 1, def: 18, unit: 'mm', label: { de: 'Griffzunge', en: 'Grip tab' } },
      { k: 'cord', t: 'bool', def: true, label: { de: 'Loch für Schnur oder Ring', en: 'Hole for cord or ring' } }
    ] }
  ],
  presets: [
    { label: { de: 'Schmaler Hebel', en: 'Slim lever' }, v: { lw: 12, lt: 5, dep: 30, wall: 3 } },
    { label: { de: 'Standard-Fensterhebel', en: 'Standard window lever' }, v: { lw: 16, lt: 7, dep: 40, wall: 3.5 } },
    { label: { de: 'Großer Hebel', en: 'Large lever' }, v: { lw: 28, lt: 11, dep: 60, wall: 4.5 } },
    { label: { de: 'Probedruck', en: 'Test piece' }, v: { dep: 10, tail: 0, cord: false } }
  ],
  build: function (p, H) {
    var de = H.lang === 'de', c = p.clr, iw = p.lw + 2 * c, ih = p.lt + c, w = p.wall;
    var W = iw + 2 * w, Hh = ih + w, L = p.dep + w + p.tail;
    var body = H.ext(H.rrect(L, W, Math.min(4, W / 3), 40), 0, Hh).translate([L / 2, 0, 0]);
    body = body.subtract(H.box(-1, -iw / 2, -1, p.dep, iw / 2, ih));
    if (p.cord && p.tail >= 8) body = body.subtract(H.cyl(p.dep + w + p.tail / 2, 0, -1, Hh + 1, 4, 24));
    return [{ name: de ? 'Griffkappe' : 'Handle cap', mesh: H.toMesh(body) }];
  }
});
