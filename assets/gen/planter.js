/* Blumentopf mit Untersetzer: rund, sechseckig oder quadratisch, Abzugsloch. */
GenKit.define({
  id: 'planter', file: 'blumentopf',
  fname: function (p) { return p.shape + p.d; },
  meta: {
    cat: 'home', slug: { de: 'blumentopf-generator', en: 'planter-generator' },
    title: { de: 'Blumentopf-Generator: Töpfe mit Untersetzer als STL/3MF (kostenlos)', en: 'Planter Generator: pots with saucer as STL/3MF (free)' },
    h1: { de: 'Blumentopf', en: 'Planter' },
    sub: { de: 'Töpfe für Pflanzen, Kakteen und Kräuter: Form, Größe und Abzugslöcher einstellen, mit passendem Untersetzer.', en: 'Pots for plants, cacti and herbs: set shape, size and drainage holes, with a matching saucer.' },
    desc: { de: 'Kostenloser Blumentopf-Generator: runde, sechseckige und quadratische Töpfe mit Abzugslöchern und Untersetzer. Export als STL und 3MF, direkt im Browser.', en: 'Free planter generator: round, hexagonal and square pots with drainage holes and saucer. Export as STL and 3MF, right in your browser.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Wähle die Form, den Durchmesser oben und unten und die Höhe. Abzugslöcher im Boden und ein passender Untersetzer sind dabei.', 'Für Sukkulenten und Kräuter auf dem Fensterbrett genügen kleine Töpfe, für Zimmerpflanzen nimm 150 mm und mehr.'], en: ['Choose the shape, the top and bottom diameter and the height. Drainage holes in the base and a matching saucer are included.', 'For succulents and herbs on the windowsill small pots are enough; for houseplants use 150 mm and more.'] },
    notes: { de: ['Aufrecht drucken. Für wasserdichte Wände: 3 bis 4 Wände, 100 % Fluss, keine Füllung nötig.', 'PETG ist wasser- und UV-fester als PLA, besonders draußen.', 'Zum Bewässern den Topf auf den Untersetzer stellen und Wasser dort sammeln lassen.'], en: ['Print upright. For watertight walls use 3 to 4 walls, 100 % flow and no infill needed.', 'PETG is more water and UV resistant than PLA, especially outdoors.', 'To water, stand the pot on the saucer and let the water collect there.'] },
    faq: { de: [['Ist der Topf wasserdicht?', 'Mit guten Druckeinstellungen weitgehend. Der Untersetzer fängt Wasser aus den Löchern auf.'], ['Welche Größe wähle ich?', 'Der Topf sollte 2 bis 3 cm größer sein als der Wurzelballen. Das Volumen steigt stark mit dem Durchmesser.']], en: [['Is the pot watertight?', 'Largely, with good print settings. The saucer catches water from the holes.'], ['Which size?', 'The pot should be 2 to 3 cm larger than the root ball. Volume grows quickly with diameter.']] }
  },
  groups: [
    { title: { de: 'Topf', en: 'Pot' }, items: [
      { k: 'shape', t: 'sel', def: 'round', str: true, label: { de: 'Form', en: 'Shape' }, opts: [['round', { de: 'Rund', en: 'Round' }], ['hex', { de: 'Sechseckig', en: 'Hexagonal' }], ['square', { de: 'Quadratisch', en: 'Square' }]] },
      { k: 'd', t: 'num', min: 40, max: 250, step: 1, def: 100, unit: 'mm', label: { de: 'Durchmesser oben', en: 'Top diameter' } },
      { k: 'db', t: 'num', min: 30, max: 250, step: 1, def: 70, unit: 'mm', label: { de: 'Durchmesser unten', en: 'Bottom diameter' } },
      { k: 'h', t: 'num', min: 40, max: 250, step: 1, def: 90, unit: 'mm', label: { de: 'Höhe', en: 'Height' } },
      { k: 'wall', t: 'num', min: 1.2, max: 6, step: 0.2, def: 2.4, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } }
    ] },
    { title: { de: 'Abzug & Untersetzer', en: 'Drainage & saucer' }, items: [
      { k: 'holes', t: 'int', min: 0, max: 7, step: 1, def: 1, label: { de: 'Abzugslöcher', en: 'Drainage holes' } },
      { k: 'hd', t: 'num', min: 3, max: 15, step: 0.5, def: 8, unit: 'mm', label: { de: 'Durchmesser Abzugsloch', en: 'Drain hole diameter' }, show: function (p) { return p.holes > 0; } },
      { k: 'saucer', t: 'bool', def: true, label: { de: 'Untersetzer dazu', en: 'Add saucer' } },
      { k: 'sh', t: 'num', min: 8, max: 30, step: 1, def: 14, unit: 'mm', label: { de: 'Höhe des Untersetzers', en: 'Saucer height' }, show: function (p) { return p.saucer; } }
    ] }
  ],
  presets: [
    { label: { de: 'Kräutertopf 90 mm', en: 'Herb pot 90 mm' }, v: { shape: 'round', d: 90, db: 65, h: 80 } },
    { label: { de: 'Kaktus klein 60 mm', en: 'Small cactus 60 mm' }, v: { shape: 'round', d: 60, db: 45, h: 55, hd: 5 } },
    { label: { de: 'Sechseck-Topf 120 mm', en: 'Hex pot 120 mm' }, v: { shape: 'hex', d: 120, db: 90, h: 100 } },
    { label: { de: 'Quadratischer Topf 100 mm', en: 'Square pot 100 mm' }, v: { shape: 'square', d: 100, db: 80, h: 90 } },
    { label: { de: 'Großer Zimmerpflanzen-Topf', en: 'Large houseplant pot' }, v: { shape: 'round', d: 180, db: 130, h: 160, holes: 3, hd: 10, sh: 20 } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, w = p.wall, fl = Math.max(w, 2.4), h = p.h, rt = p.d / 2, rb = p.db / 2;
    function sec(r) { r = Math.max(1, r); if (p.shape === 'round') return CS.circle(r, 96); if (p.shape === 'hex') return CS.circle(r / Math.cos(Math.PI / 6), 6); return H.rrect(2 * r, 2 * r, Math.min(6, r * 0.25)); }
    function slab(cs, z) { return Mf.extrude(cs, 0.002).translate([0, 0, z]); }
    function rAt(z) { return rb + (rt - rb) * z / h; }
    var outer = Mf.hull([slab(sec(rb), 0), slab(sec(rt), h - 0.002)]);
    var inner = Mf.hull([slab(sec(rAt(fl) - w), fl), slab(sec(rAt(h + 1) - w), h + 1)]);
    var pot = outer.subtract(inner), i, nh = Math.round(p.holes);
    if (nh === 1) pot = pot.subtract(H.cyl(0, 0, -1, fl + 1, p.hd, 32));
    else for (i = 0; i < nh; i++) { var a = 2 * Math.PI * i / nh, rr = Math.max(0, rb - w - p.hd) * 0.6; pot = pot.subtract(H.cyl(rr * Math.cos(a), rr * Math.sin(a), -1, fl + 1, p.hd, 24)); }
    var out = [{ name: H.lang === 'en' ? 'Pot' : 'Topf', mesh: H.toMesh(pot) }];
    if (p.saucer) {
      var rs = rb + 8, rs2 = rt * 0.9 + 6, sh = p.sh, so = Mf.hull([slab(sec(rs), 0), slab(sec(rs2), sh - 0.002)]), si = Mf.hull([slab(sec(rs - 2.2), 2), slab(sec(rs2 - 2.2), sh + 1)]);
      out.push({ name: H.lang === 'en' ? 'Saucer' : 'Untersetzer', mesh: H.toMesh(so.subtract(si)) });
    }
    return out;
  }
});
