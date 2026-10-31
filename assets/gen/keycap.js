/* Tastenkappe für MX-Schalter: Stem, Wölbung, Legende. Kopfüber gedruckt. */
GenKit.define({
  id: 'keycap', file: 'tastenkappe',
  fname: function (p) { return p.u + 'u'; },
  meta: {
    cat: 'electronics', slug: { de: 'tastenkappen-generator', en: 'keycap-generator' },
    title: { de: 'Tastenkappen-Generator: MX-Keycaps als STL/3MF (kostenlos)', en: 'Keycap Generator: MX keycaps as STL/3MF (free)' },
    h1: { de: 'Tastenkappen', en: 'Keycaps' },
    sub: { de: 'Keycaps für Cherry-MX-Schalter: Breite, Höhe und Beschriftung wählen, mehrere Stück auf einmal.', en: 'Keycaps for Cherry MX switches: choose width, height and legend, several at once.' },
    desc: { de: 'Kostenloser Tastenkappen-Generator: Keycaps für Cherry-MX-kompatible Schalter in 1u bis 2u, mit Wölbung, Schrift und einstellbarem Stem-Spiel. Export als STL und 3MF.', en: 'Free keycap generator: keycaps for Cherry MX compatible switches from 1u to 2u, with dish, legend and adjustable stem clearance. Export as STL and 3MF.' },
    tag: { de: 'Elektronik', en: 'Electronics' },
    intro: { de: ['Tastenkappen für mechanische Tastaturen: Du wählst die Breite in Einheiten (1u ist die Standardtaste), die Höhe, die Wölbung der Oberfläche und eine Beschriftung.', 'Der Stem ist für Cherry-MX-kompatible Schalter ausgelegt. Das Spiel kannst du anpassen, bis die Kappe satt sitzt.'], en: ['Keycaps for mechanical keyboards: choose the width in units (1u is the standard key), the height, the dish of the top and a legend.', 'The stem is made for Cherry MX compatible switches. You can adjust the clearance until the cap sits snug.'] },
    notes: { de: ['Kopfüber drucken, die Oberseite liegt auf dem Bett. Das ergibt eine glatte Oberfläche ohne Stützen.', '0,08 bis 0,12 mm Schichthöhe, langsam drucken, der Stem braucht Genauigkeit.', 'Druck erst eine einzelne Kappe als Test und stelle das Stem-Spiel ein, bevor du alle druckst. Nur für leichte Schreibarbeit, gedruckte Stems können brechen.'], en: ['Print upside down with the top on the bed. This gives a smooth surface without supports.', '0.08 to 0.12 mm layer height, print slowly, the stem needs accuracy.', 'Print a single test cap first and set the stem clearance before printing all. For light typing only, printed stems can break.'] },
    faq: { de: [['Welche Schalter passen?', 'Cherry MX und kompatible Schalter mit Kreuz-Stem, zum Beispiel Gateron, Kailh und Outemu. Nicht für Choc oder Topre.'], ['Warum sitzt die Kappe zu locker oder zu fest?', 'Der Kreuz-Stem ist toleranzempfindlich. Verringere das Spiel für festeren Sitz, erhöhe es, wenn sie klemmt.']], en: [['Which switches fit?', 'Cherry MX and compatible cross-stem switches, for example Gateron, Kailh and Outemu. Not for Choc or Topre.'], ['Why is the cap too loose or too tight?', 'The cross stem is tolerance sensitive. Reduce the clearance for a firmer fit, raise it if it binds.']] }
  },
  groups: [
    { title: { de: 'Kappe', en: 'Cap' }, items: [
      { k: 'u', t: 'num', min: 1, max: 2.25, step: 0.25, def: 1, unit: 'u', label: { de: 'Breite in Einheiten', en: 'Width in units' } },
      { k: 'h', t: 'num', min: 5, max: 14, step: 0.25, def: 8.5, unit: 'mm', label: { de: 'Gesamthöhe', en: 'Total height' } },
      { k: 'dish', t: 'num', min: 0, max: 2, step: 0.1, def: 0.8, unit: 'mm', label: { de: 'Wölbung der Oberfläche', en: 'Top dish depth' } },
      { k: 'taper', t: 'num', min: 0, max: 9, step: 0.25, def: 5, unit: 'mm', label: { de: 'Verjüngung oben (gesamt)', en: 'Taper at top (total)' } },
      { k: 'wall', t: 'num', min: 1, max: 2.5, step: 0.1, def: 1.4, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'qty', t: 'int', min: 1, max: 24, step: 1, def: 1, label: { de: 'Stückzahl', en: 'Quantity' } }
    ] },
    { title: { de: 'Stem & Schrift', en: 'Stem & legend' }, items: [
      { k: 'cl', t: 'num', min: 0, max: 0.35, step: 0.02, def: 0.12, unit: 'mm', label: { de: 'Spiel am Kreuz-Stem', en: 'Cross stem clearance' } },
      { k: 'text', t: 'txt', def: 'A', max: 4, label: { de: 'Beschriftung (leer = keine)', en: 'Legend (empty = none)' } },
      { k: 'th', t: 'num', min: 2, max: 8, step: 0.25, def: 5, unit: 'mm', label: { de: 'Schrifthöhe', en: 'Legend height' }, show: function (p) { return !!p.text; } },
      { k: 'ld', t: 'num', min: 0.2, max: 1, step: 0.1, def: 0.4, unit: 'mm', label: { de: 'Gravurtiefe', en: 'Engraving depth' }, show: function (p) { return !!p.text; } }
    ] }
  ],
  presets: [
    { label: { de: 'Standardtaste 1u mit A', en: 'Standard 1u key with A' }, v: { u: 1, text: 'A' } },
    { label: { de: 'Leertaste 2u', en: 'Spacebar 2u' }, v: { u: 2, text: '', dish: 1.0 } },
    { label: { de: 'Enter 1,5u', en: 'Enter 1.5u' }, v: { u: 1.5, text: 'Ent', th: 3.5 } },
    { label: { de: 'Flach und niedrig', en: 'Flat and low' }, v: { u: 1, h: 6.5, dish: 0.4, taper: 3, text: '' } },
    { label: { de: 'Hoch mit starker Wölbung', en: 'Tall with deep dish' }, v: { u: 1, h: 11, dish: 1.5, taper: 6, text: 'X' } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, w0 = p.u * 19.05 - 0.85, d0 = 18.2, w = p.wall, h = p.h, tt = Math.max(1.2, w + 0.2);
    function slab(wd, dp, z, r) { return Mf.extrude(H.rrect(wd, dp, r), 0.002).translate([0, 0, z]); }
    var wt = Math.max(6, w0 - p.taper), dt = Math.max(6, d0 - p.taper);
    var outer = Mf.hull([slab(w0, d0, 0, 1.2), slab(wt, dt, h - 0.002, 2.2)]);
    var inner = Mf.hull([slab(w0 - 2 * w, d0 - 2 * w, -0.01, 0.6), slab(Math.max(2, wt - 2 * w), Math.max(2, dt - 2 * w), h - tt - 0.002, 1.2)]);
    var cap = outer.subtract(inner);
    /* MX-Kreuz-Stem: Zylinder 5,5 mm mit Kreuz-Loch, vom Dach nach unten */
    var sh = h - tt + 0.3, stem = Mf.cylinder(sh, 2.75, 2.75, 40, false);
    var cross = CS.square([4.1 + p.cl * 2, 1.35 + p.cl * 2], true).add(CS.square([1.35 + p.cl * 2, 4.1 + p.cl * 2], true));
    stem = stem.subtract(H.ext(cross, -0.5, 4.6));
    cap = cap.add(stem);
    if (p.dish > 0.05) { var a = Math.min(wt, dt) * 0.5 + 2, Rd = (a * a + p.dish * p.dish) / (2 * p.dish); cap = cap.subtract(Mf.sphere(Rd, 64).translate([0, 0, h + Rd - p.dish])); }
    if (p.text) {
      var rt = H.rasterText(p.text, 'TB Display, Inter, sans-serif', p.th, 10), tcs = H.maskToCS(rt), bb = tcs.bounds(), tw = bb.max[0] - bb.min[0], sc = Math.min(1, (Math.min(wt, dt) - 3) / tw);
      tcs = tcs.translate([-(bb.min[0] + bb.max[0]) / 2, -(bb.min[1] + bb.max[1]) / 2]).scale([sc, sc]);
      cap = cap.subtract(H.ext(tcs, h - p.dish - p.ld, h + 1));
    }
    /* Kopfüber: Oberseite auf das Druckbett */
    cap = cap.rotate([180, 0, 0]).translate([0, 0, h]);
    var one = H.toMesh(cap), out = [], i;
    for (i = 0; i < Math.round(p.qty); i++) out.push({ name: (H.lang === 'en' ? 'Keycap ' : 'Tastenkappe ') + (i + 1), mesh: one });
    return out;
  }
});
