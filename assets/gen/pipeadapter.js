/* Rohr- und Schlauchadapter: zwei Enden mit eigenem Durchmesser, optional Widerhaken. */
GenKit.define({
  id: 'pipeadapter', file: 'adapter',
  fname: function (p) { return 'adapter-' + p.d1 + 'x' + p.d2; },
  meta: {
    cat: 'home', slug: { de: 'rohradapter-generator', en: 'pipe-adapter-generator' },
    title: { de: 'Rohr- und Schlauchadapter-Generator als STL (kostenlos)', en: 'Pipe and Hose Adapter Generator as STL (free)' },
    h1: { de: 'Rohr- & Schlauchadapter', en: 'Pipe & hose adapter' },
    sub: { de: 'Verbinde zwei Durchmesser: Staubsaugerschlauch, Absaugung, Lüftungsrohr oder Aquarium. Jedes Ende steckst du ein oder stülpst es über.', en: 'Join two diameters: vacuum hose, dust extraction, ducting or aquarium. Each end plugs in or slips over.' },
    desc: { de: 'Kostenloser Generator für Rohradapter und Schlauchadapter zum 3D-Drucken: zwei Durchmesser verbinden, Steckende oder Muffe, Widerhaken, Export als STL und 3MF.', en: 'Free generator for 3D-printed pipe and hose adapters: join two diameters, plug or sleeve ends, barbs, export as STL and 3MF.' },
    tag: { de: 'Haushalt', en: 'Home' },
    intro: { de: ['Gib für jedes Ende den Durchmesser an und wähle, ob es in ein Rohr gesteckt oder über ein Rohr gestülpt wird.', 'Beim Steckende ist der Wert der Außendurchmesser des Adapters, bei der Muffe der Rohr-Außendurchmesser, den der Adapter umschließt.'], en: ['Enter the diameter for each end and choose whether it plugs into a pipe or slips over one.', 'For a plug the value is the adapter outside diameter, for a sleeve it is the outside diameter of the pipe it covers.'] },
    notes: { de: ['Aufrecht auf dem größeren Ende drucken.', 'Für Luftströme reicht PLA. Für warme Luft ab 50 °C PETG oder ASA nehmen.', 'Widerhaken halten Schläuche, machen aber das Abziehen schwer.'], en: ['Print upright on the larger end.', 'PLA is fine for airflow. For warm air above 50 °C use PETG or ASA.', 'Barbs grip hoses but make removing them harder.'] },
    faq: { de: [['Wie messe ich einen Schlauch?', 'Für ein Steckende den Innendurchmesser messen und 0,2 mm abziehen. Für eine Muffe den Außendurchmesser messen.'], ['Dichtet das?', 'Gut für Luft und Staub. Für Wasser unter Druck nicht gedacht.']], en: [['How do I measure a hose?', 'For a plug measure the inside diameter and subtract 0.2 mm. For a sleeve measure the outside diameter.'], ['Is it airtight?', 'Good for air and dust. Not intended for pressurised water.']] }
  },
  groups: [
    { title: { de: 'Ende A', en: 'End A' }, items: [
      { k: 'd1', t: 'num', min: 6, max: 200, step: 0.5, def: 32, unit: 'mm', label: { de: 'Durchmesser A', en: 'Diameter A' } },
      { k: 'm1', t: 'sel', def: 'plug', str: true, label: { de: 'Art A', en: 'Type A' }, opts: [['plug', { de: 'Steckende (in Rohr)', en: 'Plug (into pipe)' }], ['sleeve', { de: 'Muffe (über Rohr)', en: 'Sleeve (over pipe)' }]] },
      { k: 'l1', t: 'num', min: 10, max: 120, step: 1, def: 30, unit: 'mm', label: { de: 'Länge A', en: 'Length A' } },
      { k: 'b1', t: 'bool', def: false, label: { de: 'Widerhaken A', en: 'Barbs A' } }
    ] },
    { title: { de: 'Ende B', en: 'End B' }, items: [
      { k: 'd2', t: 'num', min: 6, max: 200, step: 0.5, def: 50, unit: 'mm', label: { de: 'Durchmesser B', en: 'Diameter B' } },
      { k: 'm2', t: 'sel', def: 'plug', str: true, label: { de: 'Art B', en: 'Type B' }, opts: [['plug', { de: 'Steckende (in Rohr)', en: 'Plug (into pipe)' }], ['sleeve', { de: 'Muffe (über Rohr)', en: 'Sleeve (over pipe)' }]] },
      { k: 'l2', t: 'num', min: 10, max: 120, step: 1, def: 30, unit: 'mm', label: { de: 'Länge B', en: 'Length B' } },
      { k: 'b2', t: 'bool', def: false, label: { de: 'Widerhaken B', en: 'Barbs B' } }
    ] },
    { title: { de: 'Übergang', en: 'Transition' }, items: [
      { k: 'tr', t: 'num', min: 10, max: 120, step: 1, def: 30, unit: 'mm', label: { de: 'Länge des Übergangs', en: 'Transition length' } },
      { k: 'wall', t: 'num', min: 1.2, max: 5, step: 0.2, def: 2, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'cl', t: 'num', min: 0, max: 0.6, step: 0.05, def: 0.2, unit: 'mm', label: { de: 'Spiel bei Muffen', en: 'Clearance for sleeves' } }
    ] }
  ],
  presets: [
    { label: { de: 'Staubsauger 32 mm auf 50 mm', en: 'Vacuum 32 mm to 50 mm' }, v: { d1: 32, d2: 50, m1: 'plug', m2: 'plug', l1: 30, l2: 30, tr: 30 } },
    { label: { de: 'Absaugung 100 mm auf 57 mm', en: 'Extraction 100 mm to 57 mm' }, v: { d1: 100, d2: 57, m1: 'plug', m2: 'plug', l1: 40, l2: 40, tr: 50 } },
    { label: { de: 'Schlauch 16 mm auf 20 mm mit Haken', en: 'Hose 16 mm to 20 mm with barbs' }, v: { d1: 16, d2: 20, m1: 'plug', m2: 'plug', b1: true, b2: true, l1: 25, l2: 25, tr: 15, wall: 1.6 } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, CS = m.CrossSection, de = H.lang === 'de';
    function ends(d, mode) { return mode === 'plug' ? { o: d / 2, i: d / 2 - p.wall } : { o: d / 2 + p.cl + p.wall, i: d / 2 + p.cl }; }
    var A = ends(p.d1, p.m1), B = ends(p.d2, p.m2);
    if (A.i < 2 || B.i < 2) throw new Error('Wand zu dick');
    var z1 = p.l1, z2 = z1 + p.tr, z3 = z2 + p.l2, i;
    var outer = [[A.o, 0]];
    if (p.b1) for (i = 0; i < Math.max(2, Math.floor(p.l1 / 6)); i++) { var zb = 3 + i * 6; outer.push([A.o, zb], [A.o + 0.9, zb + 2.6], [A.o, zb + 2.7]); }
    outer.push([A.o, z1], [B.o, z2]);
    if (p.b2) for (i = 0; i < Math.max(2, Math.floor(p.l2 / 6)); i++) { var zc = z3 - 3 - i * 6; outer.push([B.o, zc], [B.o + 0.9, zc - 2.6], [B.o, zc - 2.7]); }
    outer.push([B.o, z3]);
    var poly = [[A.i, 0]].concat(outer, [[B.i, z3], [B.i, z2], [A.i, z1]]);
    // Außenlinie von unten nach oben, Innenlinie wieder hinunter
    poly = [[A.i, 0]].concat(outer, [[B.i, z3], [B.i, z2], [A.i, z1]]);
    var cs = CS.ofPolygons([poly]);
    var body = Mf.revolve(cs, 96);
    return [{ name: de ? 'Adapter' : 'Adapter', mesh: H.toMesh(body) }];
  }
});
