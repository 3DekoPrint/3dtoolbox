/* Regalwinkel: L-Winkel mit Verstärkung, Schraublöcher, liegend gedruckt. */
GenKit.define({
  id: 'bracket', file: 'regalwinkel',
  fname: function (p) { return p.a + 'x' + p.b; },
  meta: {
    cat: 'home', slug: { de: 'regalwinkel-generator', en: 'shelf-bracket-generator' },
    title: { de: 'Regalwinkel-Generator: Winkelträger nach Maß als STL/3MF (kostenlos)', en: 'Shelf Bracket Generator: custom brackets as STL/3MF (free)' },
    h1: { de: 'Regalwinkel', en: 'Shelf Bracket' },
    sub: { de: 'Winkel für Regalbretter und Ablagen: Maße, Verstärkung und Schrauben einstellen, STL oder 3MF laden.', en: 'Brackets for shelf boards and ledges: set size, gusset and screws, download STL or 3MF.' },
    desc: { de: 'Kostenloser Regalwinkel-Generator: L-Winkel mit Verstärkung und Senkschraublöchern für Regalbretter und Ablagen. Export als STL und 3MF.', en: 'Free shelf bracket generator: L brackets with gusset and countersunk screw holes for shelf boards and ledges. Export as STL and 3MF.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Der Winkel besteht aus einer Wandplatte, einem Auflagearm und einer Verstärkung dazwischen. Du stellst die Länge der beiden Schenkel, Breite, Stärke und Schrauben ein.', 'Gedruckt wird er auf der Seite liegend, damit die Schichten die Last tragen.'], en: ['The bracket consists of a wall plate, a support arm and a gusset between them. Set the length of both legs, width, strength and screws.', 'It prints lying on its side so the layers carry the load.'] },
    notes: { de: ['Auf der Seite liegend drucken, ohne Stützen.', 'PETG, 4 Wände und 40 % Füllung. Für Regale mit Büchern lieber mehrere Winkel und metallene Schrauben benutzen.', 'Gedruckte Winkel sind für leichte Lasten gedacht. Prüfe die Tragfähigkeit selbst, bevor du Wertvolles ablegst.'], en: ['Print lying on its side, no supports.', 'PETG, 4 walls and 40 % infill. For shelves with books use several brackets and metal screws.', 'Printed brackets are meant for light loads. Test the capacity yourself before putting valuables on them.'] },
    faq: { de: [['Wie viel trägt ein Winkel?', 'Das hängt von Material, Druck und Befestigung ab. Rechne vorsichtig und teste mit Gewicht, bevor du dich darauf verlässt.'], ['Welche Schrauben?', 'Senkkopfschrauben 4 bis 5 mm mit passenden Dübeln für deine Wand.']], en: [['How much does one bracket carry?', 'That depends on material, print and fixing. Calculate cautiously and test with weight before relying on it.'], ['Which screws?', 'Countersunk screws 4 to 5 mm with anchors that suit your wall.']] }
  },
  groups: [
    { title: { de: 'Maße', en: 'Size' }, items: [
      { k: 'a', t: 'num', min: 40, max: 250, step: 1, def: 120, unit: 'mm', label: { de: 'Höhe an der Wand', en: 'Height at the wall' } },
      { k: 'b', t: 'num', min: 40, max: 250, step: 1, def: 100, unit: 'mm', label: { de: 'Tiefe des Arms', en: 'Arm depth' } },
      { k: 'w', t: 'num', min: 10, max: 60, step: 0.5, def: 25, unit: 'mm', label: { de: 'Breite', en: 'Width' } },
      { k: 't', t: 'num', min: 3, max: 15, step: 0.5, def: 6, unit: 'mm', label: { de: 'Materialstärke', en: 'Material thickness' } },
      { k: 'g', t: 'num', min: 0, max: 100, step: 5, def: 70, unit: '%', label: { de: 'Größe der Verstärkung', en: 'Gusset size' } }
    ] },
    { title: { de: 'Schrauben', en: 'Screws' }, items: [
      { k: 'n', t: 'int', min: 1, max: 4, step: 1, def: 2, label: { de: 'Löcher in der Wandplatte', en: 'Holes in the wall plate' } },
      { k: 'arm', t: 'bool', def: true, label: { de: 'Loch im Arm (Brett festschrauben)', en: 'Hole in the arm (fix the board)' } },
      { k: 'sd', t: 'num', min: 3, max: 7, step: 0.1, def: 4.5, unit: 'mm', label: { de: 'Schraubenloch', en: 'Screw hole' } }
    ] }
  ],
  presets: [
    { label: { de: 'Regalbrett 20 cm tief', en: 'Shelf board 20 cm deep' }, v: { a: 120, b: 100, w: 25, t: 6 } },
    { label: { de: 'Stark (Bücher)', en: 'Strong (books)' }, v: { a: 160, b: 150, w: 35, t: 8, g: 80, n: 3 } },
    { label: { de: 'Klein für Gewürze', en: 'Small for spices' }, v: { a: 70, b: 60, w: 18, t: 5, n: 1, g: 60 } },
    { label: { de: 'Schmale Ablage', en: 'Narrow ledge' }, v: { a: 90, b: 50, w: 20, t: 5, n: 2 } },
    { label: { de: 'Breiter Träger', en: 'Wide bracket' }, v: { a: 130, b: 110, w: 50, t: 7, n: 2 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, t = p.t, g = Math.min(p.a - t, p.b - t) * p.g / 100;
    var prof = CS.square([t, p.a], false).add(CS.square([p.b, t], false));
    if (g > 1) prof = prof.add(CS.ofPolygons([[[t - 0.01, t - 0.01], [t - 0.01 + g, t - 0.01], [t - 0.01, t - 0.01 + g]]]));
    var body = Mf.extrude(prof, p.w), i, n = Math.round(p.n), cs = Math.min(3, t * 0.45);
    for (i = 0; i < n; i++) {
      var y = (p.a - t) * (i + 0.5) / n + t * 0.5 + (p.a - t) * 0.0;
      body = body.subtract(Mf.cylinder(t + 2, p.sd / 2, p.sd / 2, 28, false).rotate([0, 90, 0]).translate([-1, y, p.w / 2]));
      body = body.subtract(Mf.cylinder(cs + 0.01, p.sd / 2, p.sd / 2 + cs, 28, false).rotate([0, 90, 0]).translate([t - cs, y, p.w / 2]));
    }
    if (p.arm) { var ax = p.b - Math.max(10, p.sd * 2.5); body = body.subtract(Mf.cylinder(t + 2, p.sd / 2, p.sd / 2, 28, false).rotate([-90, 0, 0]).translate([ax, -1, p.w / 2])); }
    return [{ name: H.lang === 'en' ? 'Bracket' : 'Winkel', mesh: H.toMesh(body) }];
  }
});
