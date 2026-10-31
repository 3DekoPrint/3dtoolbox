/* Handyständer: Fuß, Anschlag und geneigte Rückenplatte, Kabelloch optional. */
GenKit.define({
  id: 'phonestand', file: 'handystaender',
  fname: function (p) { return 'a' + p.angle + 't' + p.t; },
  meta: {
    cat: 'home', slug: { de: 'handystaender-generator', en: 'phone-stand-generator' },
    title: { de: 'Handyständer-Generator: Smartphone- und Tablet-Ständer als STL/3MF (kostenlos)', en: 'Phone Stand Generator: smartphone and tablet stands as STL/3MF (free)' },
    h1: { de: 'Handyständer', en: 'Phone Stand' },
    sub: { de: 'Ständer für Handy, Tablet oder E-Reader: Gerätedicke, Winkel und Breite einstellen, mit Kabelloch zum Laden.', en: 'A stand for phone, tablet or e-reader: set device thickness, angle and width, with a cable hole for charging.' },
    desc: { de: 'Kostenloser Handyständer-Generator: Smartphone- und Tablet-Ständer nach Maß mit einstellbarem Winkel, Kabelloch und Rutschschutz-Anschlag. Export als STL und 3MF.', en: 'Free phone stand generator: smartphone and tablet stands to size with adjustable angle, cable hole and anti-slip lip. Export as STL and 3MF.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Gib die Dicke deines Geräts inklusive Hülle ein, wähle den Neigungswinkel und die Breite. Das Gerät steht auf dem Fuß, lehnt an der Rückenplatte und wird vorn von einem Anschlag gehalten.', 'Mit dem Kabelloch kannst du das Gerät am Ständer laden.'], en: ['Enter the thickness of your device including case, choose the tilt angle and the width. The device stands on the base, leans on the back plate and is held at the front by a lip.', 'The cable hole lets you charge the device while it stands.'] },
    notes: { de: ['Aufrecht drucken, wie das Modell steht, ohne Stützen.', 'PETG oder PLA mit 3 Wänden und 20 % Füllung, damit der Ständer auch ein Tablet trägt.', 'Ein Streifen Gummi oder Filz auf der Unterseite verhindert Rutschen.'], en: ['Print upright as the model stands, without supports.', 'PETG or PLA with 3 walls and 20 % infill so the stand can carry a tablet.', 'A strip of rubber or felt underneath prevents sliding.'] },
    faq: { de: [['Welche Dicke wähle ich?', 'Miss das Gerät mit Hülle an der dicksten Stelle und addiere 1 bis 2 mm. Handys liegen meist bei 9 bis 14 mm, Tablets bei 8 bis 12 mm.'], ['Welcher Winkel ist gut?', 'Etwa 65 bis 75 Grad für Handys auf dem Tisch, flacher für Tablets zum Tippen.']], en: [['Which thickness?', 'Measure the device with case at its thickest point and add 1 to 2 mm. Phones are usually 9 to 14 mm, tablets 8 to 12 mm.'], ['Which angle is good?', 'About 65 to 75 degrees for phones on a desk, flatter for tablets for typing.']] }
  },
  groups: [
    { title: { de: 'Gerät', en: 'Device' }, items: [
      { k: 't', t: 'num', min: 5, max: 25, step: 0.5, def: 12, unit: 'mm', label: { de: 'Dicke des Geräts mit Hülle', en: 'Device thickness with case' } },
      { k: 'angle', t: 'num', min: 40, max: 85, step: 1, def: 68, unit: '°', label: { de: 'Neigung (zur Tischfläche)', en: 'Tilt (from the desk)' } },
      { k: 'w', t: 'num', min: 30, max: 250, step: 1, def: 80, unit: 'mm', label: { de: 'Breite des Ständers', en: 'Stand width' } },
      { k: 'len', t: 'num', min: 40, max: 200, step: 1, def: 75, unit: 'mm', label: { de: 'Höhe der Rückenplatte', en: 'Back plate height' } }
    ] },
    { title: { de: 'Fuß & Kabel', en: 'Base & cable' }, items: [
      { k: 'lh', t: 'num', min: 6, max: 40, step: 1, def: 16, unit: 'mm', label: { de: 'Höhe des Anschlags', en: 'Lip height' } },
      { k: 'bt', t: 'num', min: 3, max: 10, step: 0.5, def: 5, unit: 'mm', label: { de: 'Dicke von Fuß und Platte', en: 'Base and plate thickness' } },
      { k: 'cable', t: 'bool', def: true, label: { de: 'Kabelloch', en: 'Cable hole' } },
      { k: 'cw', t: 'num', min: 8, max: 40, step: 1, def: 18, unit: 'mm', label: { de: 'Breite des Kabellochs', en: 'Cable hole width' }, show: function (p) { return p.cable; } }
    ] }
  ],
  presets: [
    { label: { de: 'Smartphone mit Hülle', en: 'Smartphone with case' }, v: { t: 12, angle: 68, w: 80, len: 75 } },
    { label: { de: 'Tablet (breit)', en: 'Tablet (wide)' }, v: { t: 11, angle: 62, w: 180, len: 110, lh: 20 } },
    { label: { de: 'E-Reader flach', en: 'E-reader flat' }, v: { t: 9, angle: 60, w: 110, len: 90 } },
    { label: { de: 'Handy zum Filmschauen (quer)', en: 'Phone for movies (landscape)' }, v: { t: 12, angle: 55, w: 100, len: 70, lh: 14 } },
    { label: { de: 'Schreibtisch, ohne Kabel', en: 'Desk, no cable' }, v: { t: 11, angle: 72, w: 70, len: 70, cable: false } }
  ],
  build: function (p, H) {
    var m = H.M, CS = m.CrossSection, Mf = m.Manifold, a = p.angle * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a), bt = p.bt, lw = Math.max(4, bt);
    var xs = lw + p.t / sa, ux = ca, uy = sa, nx = sa, ny = -ca, Lp = p.len;
    function P(x, y) { return [x, y]; }
    var A = [xs, bt - 0.01], B = [xs + bt * nx, bt - 0.01 + bt * ny], C = [B[0] + Lp * ux, B[1] + Lp * uy], D = [A[0] + Lp * ux, A[1] + Lp * uy];
    var endX = Math.max(C[0], D[0]) + 4, prof = CS.square([endX, bt], false).add(CS.square([lw, p.lh], false)).add(CS.ofPolygons([[A, B, C, D]]));
    var body = Mf.extrude(prof, p.w).rotate([90, 0, 0]).translate([0, p.w, 0]);
    /* Fuß unter der Platte verlängern, damit der Ständer nicht kippt: Dreiecksstütze hinten */
    if (p.cable) body = body.subtract(H.box(lw + 2, p.w / 2 - p.cw / 2, -1, xs + 4, p.w / 2 + p.cw / 2, bt + 1));
    return [{ name: H.lang === 'en' ? 'Stand' : 'Ständer', mesh: H.toMesh(body) }];
  }
});
