(function () {
  'use strict';
  var D = window.SlicerData, M = window.MaterialDB; if (!D || !M) return;
  var LANG = (document.documentElement.lang || 'de').slice(0, 2) === 'en' ? 'en' : 'de';
  var T = {
    de: { n: 'Düsentemperatur', n1: 'Erste Schicht', b: 'Betttemperatur', lh: 'Schichthöhe', lw: 'Linienbreite', so: 'Außenwand', si: 'Innenwände / Infill', fl: 'Max. Fluss', fan: 'Lüfter', ret: 'Retraction', dry: 'Trocknen', surf: 'Druckoberfläche',
      warn: 'Hinweise', enc2: 'Geschlossener Bauraum nötig – ohne Gehäuse drohen Warping und Schichtrisse.', enc1: 'Ein Gehäuse ist optional, hilft aber bei großen Teilen.', hard: 'Gehärtete Düse erforderlich (abrasiver Füllstoff).',
      dd: 'Direktantrieb empfohlen; am Bowden-Extruder kann das Filament knicken.', ddno: 'Mit Bowden-Extruder wird TPU schwierig – Direktantrieb dringend empfohlen.', small: 'Mit einer 0,2-mm-Düse verstopfen gefüllte Filamente schnell – besser ab 0,4 mm.',
      nobow: 'nicht empfohlen', mm: 'mm', go: 'Ausführlicher Ratgeber zu', base: 'Alle Werte sind Startwerte aus Herstellerdaten und Erfahrungswerten – Drucker, Hotend und Filament weichen ab. Die Geschwindigkeiten setzen ein Hotend für ca. 15–20 mm³/s voraus (z. B. Bambu Lab, Prusa MK4); bei einfachen Hotends (ca. 10 mm³/s) senke sie anteilig. Mit Temperaturturm und Fluss-Test feintunen.' },
    en: { n: 'Nozzle temperature', n1: 'First layer', b: 'Bed temperature', lh: 'Layer height', lw: 'Line width', so: 'Outer wall', si: 'Inner walls / infill', fl: 'Max. flow', fan: 'Fan', ret: 'Retraction', dry: 'Drying', surf: 'Build surface',
      warn: 'Notes', enc2: 'Enclosed chamber required – without one expect warping and layer cracks.', enc1: 'An enclosure is optional but helps on large parts.', hard: 'Hardened nozzle required (abrasive filler).',
      dd: 'Direct drive recommended; on a Bowden extruder the filament can buckle.', ddno: 'TPU is difficult on a Bowden extruder – direct drive strongly recommended.', small: 'With a 0.2 mm nozzle filled filaments clog quickly – better 0.4 mm and up.',
      nobow: 'not recommended', mm: 'mm', go: 'Full guide to', base: 'All values are starting points from manufacturer data and experience – printers, hotends and filaments differ. The speeds assume a hotend good for about 15–20 mm³/s (e.g. Bambu Lab, Prusa MK4); on basic hotends (about 10 mm³/s) reduce them proportionally. Fine-tune with a temperature tower and flow test.' }
  }[LANG];
  var GOAL = { q: { t: 0.25, l: 0.3, w: 1.05, v: 0.7, o: 0.5 }, s: { t: 0.5, l: 0.5, w: 1.1, v: 1, o: 0.6 }, f: { t: 0.85, l: 0.7, w: 1.1, v: 1, o: 0.7, top: 1 } };
  function $(i) { return document.getElementById(i); }
  function r(x, s) { return Math.round(x / s) * s; }
  function f(x, d) { return x.toLocaleString(LANG === 'en' ? 'en-US' : 'de-DE', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }
  function rng(a, u, d) { return a[0] === a[1] ? f(a[0], d) + u : f(a[0], d) + '–' + f(a[1], d) + u; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  var sel = $('shMat');
  M.items.forEach(function (m) { if (D.m[m.id]) { var o = document.createElement('option'); o.value = m.id; o.textContent = m.name[LANG]; sel.appendChild(o); } });
  var wantedHash = (location.hash || '').replace('#', '').toUpperCase();
  if (wantedHash && D.m[wantedHash]) sel.value = wantedHash;
  function slug(id) { return id.toLowerCase().replace('+', '-plus'); }
  function calc() {
    var id = sel.value, d = D.m[id], mat = M.items.filter(function (m) { return m.id === id; })[0];
    var nz = parseFloat($('shNoz').value), g = GOAL[$('shGoal').value], dd = $('shDD').value === '1', enc = $('shEnc').value === '1';
    var lh = Math.max(0.08, r(nz * g.l, 0.02)), lw = r(nz * g.w, 0.01);
    var vol = g.top ? d.vol[1] : d.vol[0] * g.v;
    var spd = Math.min(d.cap, vol / (lh * lw));
    var temp = r(d.n[0] + g.t * (d.n[1] - d.n[0]), 5), bed = r(d.b[0] + 0.7 * (d.b[1] - d.b[0]), 5);
    if (d.n[0] === d.n[1]) temp = d.n[0];
    var ret = dd ? rng(d.rd, ' ' + T.mm, 1) : (d.rb ? rng(d.rb, ' ' + T.mm, 0) : T.nobow);
    var rows = [
      [T.n, f(temp) + ' °C', T.n1 + ': ' + f(temp + 5) + ' °C'],
      [T.b, f(bed) + ' °C', ''],
      [T.lh, f(lh, 2) + ' ' + T.mm, ''],
      [T.lw, f(lw, 2) + ' ' + T.mm, ''],
      [T.so, f(r(spd * g.o, 5) || 5) + ' mm/s', ''],
      [T.si, f(r(spd, 5) || 5) + ' mm/s', ''],
      [T.fl, f(Math.round(vol * 10) / 10, 1) + ' mm³/s', ''],
      [T.fan, rng(d.fan, ' %'), ''],
      [T.ret, ret, ''],
      [T.dry, mat.dry[LANG] || '–', ''],
      [T.surf, D.surf[d.surf][LANG], '']
    ];
    $('shOut').innerHTML = rows.map(function (x) { return '<div class="sh-row"><span>' + esc(x[0]) + '</span><b>' + esc(x[1]) + '</b>' + (x[2] ? '<small>' + esc(x[2]) + '</small>' : '') + '</div>'; }).join('');
    var w = [];
    if (mat.encl === 2 && !enc) w.push(T.enc2); else if (mat.encl === 1 && !enc) w.push(T.enc1);
    if (mat.hard) w.push(T.hard);
    if (/^TPU/.test(id) && !dd) w.push(T.ddno); else if (/^TPU/.test(id)) w.push(T.dd);
    if (nz < 0.4 && (mat.hard || id === 'WOOD' || id === 'LW-PLA')) w.push(T.small);
    w.push(d.tip[LANG]);
    $('shWarn').innerHTML = '<h3>' + T.warn + '</h3><ul>' + w.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<p><a class="md-link" href="' + (LANG === 'en' ? '/en/materials/' : '/materialien/') + slug(id) + '.html">' + T.go + ' ' + esc(mat.name[LANG]) + ' →</a></p><p class="md-note">' + T.base + '</p>';
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
  }
  ['shMat', 'shNoz', 'shGoal', 'shDD', 'shEnc'].forEach(function (i) { $(i).addEventListener('input', calc); });
  calc();
})();
