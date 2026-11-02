/* Schiebefenster-Stopper: Klemme auf der Laufschiene, begrenzt den Öffnungsweg (Lüftungsstellung). */
GenKit.define({
  id: 'railstop', file: 'schienenstopper',
  fname: function (p) { return 'schienenstopper_' + p.rw + 'x' + p.rh; },
  meta: {
    cat: 'caravan', slug: { de: 'schiebefenster-stopper-generator', en: 'sliding-window-stopper-generator' },
    title: { de: 'Schiebefenster-Stopper für Wohnwagen und Wohnmobil als STL (kostenlos)', en: 'Sliding Window Stopper for caravans and motorhomes as STL (free)' },
    h1: { de: 'Schiebefenster-Stopper', en: 'Sliding window stopper' },
    sub: { de: 'Klemme für die Laufschiene: begrenzt, wie weit sich das Fenster öffnen lässt. Für Lüftungsstellung und gegen Zuschlagen.', en: 'A clamp for the track: limits how far the window opens. For ventilation and against slamming.' },
    desc: { de: 'Kostenloser Generator für Schiebefenster-Stopper für Wohnwagen und Wohnmobil: Klemmstück für die Laufschiene mit einstellbarer Schienenbreite und Höhe. Hinweis: kein Einbruchschutz. Export als STL und 3MF.', en: 'Free generator for sliding window stoppers for caravans and motorhomes: clamp piece for the track with adjustable track width and height. Note: not burglar protection. Export as STL and 3MF.' },
    tag: { de: 'Wohnwagen', en: 'Caravan' },
    intro: { de: ['Miss Breite und Höhe der Laufschiene deines Fensters. Das Klemmstück sitzt auf der Schiene und stoppt den Schieber an der gewünschten Stelle.', 'Der Stopper ist für die Lüftungsstellung gedacht und verhindert, dass das Fenster beim Fahren oder bei Wind aufgeht. Er ist kein Einbruchschutz.'], en: ['Measure the width and height of your window track. The clamp sits on the track and stops the slider at the desired spot.', 'The stopper is meant for ventilation positions and keeps the window from sliding while driving or in wind. It is not burglar protection.'] },
    notes: { de: ['Mit der Öffnung nach oben drucken, ohne Stützen.', 'PETG oder ASA nehmen, im Wohnwagen kann es im Sommer über 50 °C heiß werden.', 'Die Rastnasen halten per Klemmung. Sitzt der Stopper zu locker, nimm 0,1 mm weniger Spiel.'], en: ['Print with the opening facing up, no supports.', 'Use PETG or ASA, a caravan can exceed 50 °C in summer.', 'The detents hold by friction. If the stopper is loose use 0.1 mm less clearance.'] },
    faq: { de: [['Schützt der Stopper vor Einbruch?', 'Nein. Gedruckte Teile ersetzen kein Schloss. Er soll nur das Fenster in Position halten.'], ['Welche Maße brauche ich?', 'Breite und Höhe der Laufschiene, am besten mit dem Messschieber an der Stelle, wo der Stopper sitzen soll.']], en: [['Does the stopper protect against burglary?', 'No. Printed parts do not replace a lock. It only keeps the window in position.'], ['Which sizes do I need?', 'Width and height of the track, best measured with calipers where the stopper will sit.']] }
  },
  groups: [
    { title: { de: 'Schiene', en: 'Track' }, items: [
      { k: 'rw', t: 'num', min: 4, max: 40, step: 0.1, def: 12, unit: 'mm', label: { de: 'Schienenbreite', en: 'Track width' } },
      { k: 'rh', t: 'num', min: 3, max: 30, step: 0.1, def: 6, unit: 'mm', label: { de: 'Schienenhöhe', en: 'Track height' } },
      { k: 'cl', t: 'num', min: 0, max: 0.6, step: 0.05, def: 0.15, unit: 'mm', label: { de: 'Spiel', en: 'Clearance' } }
    ] },
    { title: { de: 'Stopper', en: 'Stopper' }, items: [
      { k: 'len', t: 'num', min: 12, max: 60, step: 1, def: 24, unit: 'mm', label: { de: 'Länge auf der Schiene', en: 'Length on the track' } },
      { k: 'wall', t: 'num', min: 1.6, max: 5, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'stop', t: 'num', min: 4, max: 30, step: 1, def: 12, unit: 'mm', label: { de: 'Höhe des Anschlags über der Schiene', en: 'Stop height above the track' } },
      { k: 'detent', t: 'bool', def: true, label: { de: 'Rastnasen innen', en: 'Inner detents' } }
    ] }
  ],
  presets: [
    { label: { de: 'Schiene 12 × 6 mm', en: 'Track 12 × 6 mm' }, v: { rw: 12, rh: 6, len: 24, stop: 12 } },
    { label: { de: 'Schmale Schiene 8 × 5 mm', en: 'Narrow track 8 × 5 mm' }, v: { rw: 8, rh: 5, len: 20, stop: 10 } },
    { label: { de: 'Breite Schiene 20 × 8 mm', en: 'Wide track 20 × 8 mm' }, v: { rw: 20, rh: 8, len: 30, stop: 14 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, de = H.lang === 'de', iw = p.rw + 2 * p.cl, ih = p.rh + p.cl, t = p.wall, ow = iw + 2 * t, oh = ih + t, L = p.len;
    var body = H.box(-ow / 2, 0, 0, ow / 2, L, oh + p.stop);
    body = body.subtract(H.box(-iw / 2, -1, -1, iw / 2, L + 1, ih));
    if (p.detent) [-1, 1].forEach(function (s) { body = body.add(H.box(s > 0 ? iw / 2 - 0.5 : -iw / 2, L / 2 - 3, 0, s > 0 ? iw / 2 : -iw / 2 + 0.5, L / 2 + 3, Math.min(ih * 0.5, 3))); });
    return [{ name: de ? 'Stopper' : 'Stopper', mesh: H.toMesh(body.rotate([0, 0, 0]).mirror([0, 0, 1]).translate([0, 0, oh + p.stop])) }];
  }
});
