/* 3DToolBox — Gehäuse-Generator (Oberfläche). Läuft komplett im Browser; benötigt BoardDB, Enclosure, Conv, MeshPreview. */
(function () {
  'use strict';
  var DB = window.BoardDB, EN = window.Enclosure, C = window.Conv; if (!DB || !EN || !C) return;
  var LANG = (document.documentElement.lang || 'de').slice(0, 2) === 'en' ? 'en' : 'de';
  var T = {
    de: { loading: 'Lade 3D-Bibliothek …', busy: 'Berechne …', err: 'Das Gehäuse konnte nicht berechnet werden. Bitte Maße prüfen.', libErr: 'Die 3D-Bibliothek konnte nicht geladen werden (WebAssembly nötig).',
      custom: 'Eigene Platine (Maße selbst eingeben)', search: 'Board suchen …', none: 'Kein Board gefunden – wähle „Eigene Platine“ oder schreib mir, welches Board fehlt.',
      okTip: 'Platinen- und Lochmaße nach Herstellerzeichnung. Anschlusspositionen sind Näherungen: bitte in der Draufsicht prüfen und vor dem Druck eine Passprobe drucken.',
      apTip: 'Näherungswerte (kein Herstellerplan): Maße bitte mit dem Messschieber prüfen und die Passprobe drucken.', cuTip: 'Eigene Platine: Maße und Löcher mit dem Messschieber ermitteln und unten eintragen.',
      f: { cl: 'Spiel um die Platine (mm)', wall: 'Wandstärke (mm)', floor: 'Bodenstärke (mm)', under: 'Höhe der Halter unter der Platine (mm)', hr: 'Platz über der Platine (mm)', mode: 'Halter', lidT: 'Deckelstärke (mm)', fit: 'Spiel Deckel-Lippe (mm)', rc: 'Eckenradius (mm)', vents: 'Lüftungsschlitze im Deckel', lidcut: 'Öffnung im Deckel:', part: 'Teil' },
      modes: { pin: 'Stifte (Platine aufstecken)', screw: 'Schraubdome (Bohrung für Schraube)', rest: 'Nur Auflage' },
      parts: { both: 'Boden + Deckel', base: 'Nur Boden', lid: 'Nur Deckel', test: 'Passprobe (flacher Boden)' },
      cust: { L: 'Länge (mm)', W: 'Breite (mm)', t: 'Platinendicke (mm)', holes: 'Montagelöcher (4 im Rechteck)', ox: 'Abstand Loch von links (mm)', oy: 'Abstand Loch von unten (mm)', dx: 'Lochabstand X (mm)', dy: 'Lochabstand Y (mm)', hd: 'Lochdurchmesser (mm)' },
      ports: 'Aussparungen für Anschlüsse', add: '+ Aussparung hinzufügen', edge: 'Kante', e: { W: 'links', E: 'rechts', S: 'unten', N: 'oben' }, pos: 'Position (mm)', wid: 'Breite', hei: 'Höhe', zc: 'Höhe ab Platine',
      stl: 'STL herunterladen', mf: '3MF herunterladen', stat: 'Außenmaße', tris: 'Dreiecke', view: 'Draufsicht', top: 'oben', del: 'entfernen', pad: 'Platz für überstehende Buchsen' },
    en: { loading: 'Loading 3D library …', busy: 'Calculating …', err: 'The enclosure could not be calculated. Please check the dimensions.', libErr: 'The 3D library could not be loaded (WebAssembly required).',
      custom: 'Custom board (enter dimensions)', search: 'Search boards …', none: 'No board found – choose “Custom board” or tell me which board is missing.',
      okTip: 'Board outline and hole positions follow the manufacturer drawing. Connector positions are approximations: check them in the top view and print a fit test first.',
      apTip: 'Approximate values (no manufacturer drawing): measure with calipers and print the fit test first.', cuTip: 'Custom board: measure size and holes with calipers and enter them below.',
      f: { cl: 'Clearance around the board (mm)', wall: 'Wall thickness (mm)', floor: 'Floor thickness (mm)', under: 'Standoff height below the board (mm)', hr: 'Space above the board (mm)', mode: 'Mounts', lidT: 'Lid thickness (mm)', fit: 'Lid lip clearance (mm)', rc: 'Corner radius (mm)', vents: 'Ventilation slots in the lid', lidcut: 'Lid opening:', part: 'Part' },
      modes: { pin: 'Pins (push the board on)', screw: 'Screw posts (pilot hole)', rest: 'Rest only' },
      parts: { both: 'Base + lid', base: 'Base only', lid: 'Lid only', test: 'Fit test (low base)' },
      cust: { L: 'Length (mm)', W: 'Width (mm)', t: 'Board thickness (mm)', holes: 'Mounting holes (4 in a rectangle)', ox: 'Hole distance from left (mm)', oy: 'Hole distance from bottom (mm)', dx: 'Hole spacing X (mm)', dy: 'Hole spacing Y (mm)', hd: 'Hole diameter (mm)' },
      ports: 'Connector cut-outs', add: '+ Add cut-out', edge: 'Edge', e: { W: 'left', E: 'right', S: 'bottom', N: 'top' }, pos: 'Position (mm)', wid: 'Width', hei: 'Height', zc: 'Height above board',
      stl: 'Download STL', mf: 'Download 3MF', stat: 'Outer size', tris: 'triangles', view: 'Top view', top: 'top', del: 'remove', pad: 'Space for protruding jacks' }
  }[LANG];
  function $(i) { return document.getElementById(i); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var P = { cl: 0.6, wall: 2, floor: 2, under: 4, hr: 12, mode: 'pin', lidT: 2, fit: 0.2, rc: 2, vents: 0, lidcut: 1, part: 'both' };
  var SPEC = [['cl', 0.2, 4, 0.1], ['wall', 1.2, 5, 0.2], ['floor', 1.2, 5, 0.2], ['under', 1, 20, 0.5], ['hr', 3, 80, 0.5], ['lidT', 1.2, 5, 0.2], ['fit', 0, 0.6, 0.05], ['rc', 0, 8, 0.5]];
  var st = { id: 'rpi4', b: null, custom: { L: 60, W: 40, t: 1.6, holes: 1, ox: 3.5, oy: 3.5, dx: 53, dy: 33, hd: 2.75 }, timer: 0, ready: false, last: null };
  var prev = null, status = $('enStatus'), out = $('enOut');
  function msg(t, bad) { status.textContent = t || ''; status.className = 'cv-status' + (bad ? ' bad' : ''); }
  function num(el, d) { var v = parseFloat(el.value); return isFinite(v) ? v : d; }

  function boardFromId(id) {
    if (id === 'custom') {
      var c = st.custom, h = [];
      if (c.holes) h = [[c.ox, c.oy], [c.ox + c.dx, c.oy], [c.ox, c.oy + c.dy], [c.ox + c.dx, c.oy + c.dy]];
      return { id: 'custom', n: T.custom, L: c.L, W: c.W, t: c.t, holes: h, hd: c.hd, under: 4, hr: 12, ports: [], ok: -1, pad: {} };
    }
    var b = DB.byId(id), o = JSON.parse(JSON.stringify(b)); o.ports = o.ports || []; o.pad = o.pad || {}; return o;
  }
  function setBoard(id, keepPorts) {
    var old = st.b; st.id = id; st.b = boardFromId(id);
    if (keepPorts && old) st.b.ports = old.ports;
    if (!keepPorts) { P.under = st.b.under; P.hr = st.b.hr; }
    buildPanel(); recompute();
  }

  function buildSelect() {
    var sel = $('enBoard'), q = ($('enSearch').value || '').toLowerCase(), groups = {}, h = '', n = 0;
    DB.boards.forEach(function (b) { if (q && (b.n + ' ' + b.g).toLowerCase().indexOf(q) < 0) return; (groups[b.g] = groups[b.g] || []).push(b); n++; });
    Object.keys(groups).forEach(function (g) { h += '<optgroup label="' + esc(g) + '">' + groups[g].map(function (b) { return '<option value="' + b.id + '"' + (b.id === st.id ? ' selected' : '') + '>' + esc(b.n) + '</option>'; }).join('') + '</optgroup>'; });
    h += '<option value="custom"' + (st.id === 'custom' ? ' selected' : '') + '>' + T.custom + '</option>';
    sel.innerHTML = h; $('enNone').hidden = !!n;
  }

  function buildPanel() {
    var b = st.b, h = '';
    $('enTip').textContent = b.ok === 1 ? T.okTip : b.ok === 0 ? T.apTip : T.cuTip;
    if (b.id === 'custom') {
      var c = st.custom;
      h += '<div class="en-grid">' + ['L', 'W', 't'].map(function (k) { return '<label>' + T.cust[k] + '<input type="number" step="0.1" min="5" data-c="' + k + '" value="' + c[k] + '"></label>'; }).join('');
      h += '<label class="i3-chk"><input type="checkbox" data-c="holes"' + (c.holes ? ' checked' : '') + '> ' + T.cust.holes + '</label>';
      if (c.holes) h += ['ox', 'oy', 'dx', 'dy', 'hd'].map(function (k) { return '<label>' + T.cust[k] + '<input type="number" step="0.05" min="0" data-c="' + k + '" value="' + c[k] + '"></label>'; }).join('');
      h += '</div>';
    }
    h += '<div class="en-grid">';
    SPEC.forEach(function (s) { var k = s[0]; h += '<label>' + T.f[k] + ' <output>' + P[k] + '</output><input type="range" data-p="' + k + '" min="' + s[1] + '" max="' + s[2] + '" step="' + s[3] + '" value="' + P[k] + '"></label>'; });
    h += '<label>' + T.f.mode + '<select data-p="mode">' + Object.keys(T.modes).map(function (m) { return '<option value="' + m + '"' + (P.mode === m ? ' selected' : '') + '>' + T.modes[m] + '</option>'; }).join('') + '</select></label>';
    h += '<label>' + T.f.part + '<select data-p="part">' + Object.keys(T.parts).map(function (m) { return '<option value="' + m + '"' + (P.part === m ? ' selected' : '') + '>' + T.parts[m] + '</option>'; }).join('') + '</select></label>';
    h += '<label class="i3-chk"><input type="checkbox" data-p="vents"' + (P.vents ? ' checked' : '') + '> ' + T.f.vents + '</label>';
    if (b.lid && b.lid.length) h += '<label class="i3-chk"><input type="checkbox" data-p="lidcut"' + (P.lidcut ? ' checked' : '') + '> ' + T.f.lidcut + ' ' + esc(b.lid.map(function (l) { return l[4]; }).join(', ')) + '</label>';
    h += '</div>';
    $('enParams').innerHTML = h;
    Array.prototype.forEach.call($('enParams').querySelectorAll('[data-p]'), function (el) {
      el.addEventListener('input', function () {
        var k = el.getAttribute('data-p');
        P[k] = el.type === 'checkbox' ? (el.checked ? 1 : 0) : (el.tagName === 'SELECT' ? el.value : parseFloat(el.value));
        var o = el.parentNode.querySelector('output'); if (o) o.textContent = P[k];
        recompute();
      });
    });
    Array.prototype.forEach.call($('enParams').querySelectorAll('[data-c]'), function (el) {
      el.addEventListener('input', function () {
        var k = el.getAttribute('data-c');
        if (el.type === 'checkbox') { st.custom[k] = el.checked ? 1 : 0; var pk = st.b.ports; st.b = boardFromId('custom'); st.b.ports = pk; buildPanel(); recompute(); return; }
        var v = parseFloat(el.value); if (!(v >= 0)) return; st.custom[k] = v;
        var ports = st.b.ports; st.b = boardFromId('custom'); st.b.ports = ports; recompute();
      });
    });
    buildPorts();
  }

  function buildPorts() {
    var b = st.b, h = '';
    b.ports.forEach(function (q, i) {
      h += '<div class="en-port" data-i="' + i + '"><span class="en-pn">' + esc(q[5] || '') + '</span>' +
        '<label>' + T.edge + '<select data-q="0">' + ['W', 'E', 'S', 'N'].map(function (e) { return '<option value="' + e + '"' + (q[0] === e ? ' selected' : '') + '>' + T.e[e] + '</option>'; }).join('') + '</select></label>' +
        [[1, T.pos], [2, T.wid], [3, T.hei], [4, T.zc]].map(function (a) { return '<label>' + a[1] + '<input type="number" step="0.1" data-q="' + a[0] + '" value="' + q[a[0]] + '"></label>'; }).join('') +
        '<button type="button" class="en-del" title="' + T.del + '" aria-label="' + T.del + '">×</button></div>';
    });
    h += '<button type="button" id="enAdd" class="cv-btn">' + T.add + '</button>';
    $('enPorts').innerHTML = h;
    Array.prototype.forEach.call($('enPorts').querySelectorAll('.en-port'), function (row) {
      var i = +row.getAttribute('data-i');
      Array.prototype.forEach.call(row.querySelectorAll('[data-q]'), function (el) {
        el.addEventListener('input', function () { var k = +el.getAttribute('data-q'); b.ports[i][k] = k === 0 ? el.value : (parseFloat(el.value) || 0); recompute(); });
      });
      row.querySelector('.en-del').addEventListener('click', function () { b.ports.splice(i, 1); buildPorts(); recompute(); });
    });
    $('enAdd').addEventListener('click', function () { b.ports.push(['S', Math.round(b.L / 2), 10, 6, 1.5, '']); buildPorts(); recompute(); });
  }

  function params(part) {
    var b = st.b;
    return { L: b.L, W: b.W, t: b.t, holes: b.holes, hd: b.hd, mode: P.mode, cl: P.cl, wall: P.wall, floor: P.floor, under: P.under, hr: P.hr, lidT: P.lidT, lipH: 3, fit: P.fit, rc: P.rc, pad: b.pad,
      ports: b.ports.map(function (q) { return { e: q[0], c: q[1], w: q[2], h: q[3], zc: q[4] }; }),
      lidCuts: P.lidcut && b.lid ? b.lid.map(function (l) { return { x: l[0], y: l[1], w: l[2], h: l[3] }; }) : [], vents: P.vents, part: part || P.part };
  }

  function drawTop() {
    var b = st.b, pd = b.pad || {}, pw = pd.W || 0, pe = pd.E || 0, ps = pd.S || 0, pn = pd.N || 0, m = 6;
    var x0 = -P.cl - pw - P.wall - m, x1 = b.L + P.cl + pe + P.wall + m, y0 = -P.cl - ps - P.wall - m, y1 = b.W + P.cl + pn + P.wall + m, w = x1 - x0, h = y1 - y0;
    function Y(y) { return (y1 - y).toFixed(2); }
    var s = '<svg viewBox="0 0 ' + w.toFixed(1) + ' ' + h.toFixed(1) + '" class="en-svg" role="img" aria-label="' + T.view + '"><g transform="translate(' + (-x0).toFixed(2) + ',0)">';
    s += '<rect x="' + (-P.cl - pw - P.wall) + '" y="' + Y(b.W + P.cl + pn + P.wall) + '" width="' + (b.L + 2 * P.cl + pw + pe + 2 * P.wall) + '" height="' + (b.W + 2 * P.cl + ps + pn + 2 * P.wall) + '" rx="' + P.rc + '" class="en-o"/>';
    s += '<rect x="0" y="' + Y(b.W) + '" width="' + b.L + '" height="' + b.W + '" class="en-b"/>';
    b.holes.forEach(function (c) { s += '<circle cx="' + c[0] + '" cy="' + Y(c[1]) + '" r="' + (b.hd / 2) + '" class="en-h"/>'; });
    b.ports.forEach(function (q) {
      var c = q[1], hw = q[2] / 2;
      if (q[0] === 'W') s += '<line x1="' + (-P.cl - pw) + '" x2="' + (-P.cl - pw) + '" y1="' + Y(c - hw) + '" y2="' + Y(c + hw) + '" class="en-p"/>';
      else if (q[0] === 'E') s += '<line x1="' + (b.L + P.cl + pe) + '" x2="' + (b.L + P.cl + pe) + '" y1="' + Y(c - hw) + '" y2="' + Y(c + hw) + '" class="en-p"/>';
      else if (q[0] === 'S') s += '<line y1="' + Y(-P.cl - ps) + '" y2="' + Y(-P.cl - ps) + '" x1="' + (c - hw) + '" x2="' + (c + hw) + '" class="en-p"/>';
      else s += '<line y1="' + Y(b.W + P.cl + pn) + '" y2="' + Y(b.W + P.cl + pn) + '" x1="' + (c - hw) + '" x2="' + (c + hw) + '" class="en-p"/>';
    });
    if (P.lidcut && b.lid) b.lid.forEach(function (l) { s += '<rect x="' + l[0] + '" y="' + Y(l[1] + l[3]) + '" width="' + l[2] + '" height="' + l[3] + '" class="en-l"/>'; });
    s += '</g></svg>';
    $('enTopView').innerHTML = s;
  }

  function recompute() {
    if (!st.ready) return;
    clearTimeout(st.timer); msg(T.busy);
    st.timer = setTimeout(function () {
      try {
        drawTop();
        var r = EN.build(params()), mesh = r.both || r.base || r.lid;
        st.last = r; var s = C.stats(mesh);
        $('enStats').textContent = T.stat + ': ' + r.info.outer.map(function (x) { return x.toFixed(1); }).join(' × ') + ' mm · ' + s.tris.toLocaleString() + ' ' + T.tris;
        out.hidden = false; msg('');
        if (!prev) prev = window.MeshPreview.create($('enCanvas'), { rx: -0.9, rz: 0.5 });
        if (prev.ok) prev.set(mesh);
      } catch (e) { msg(T.err, true); if (window.console) console.error(e); }
    }, 140);
  }
  function save(fmt) {
    if (!st.last) return;
    var r = EN.build(params()), mesh = r.both || r.base || r.lid, nm = (st.b.id === 'custom' ? 'platine' : st.b.id) + '-gehaeuse-' + P.part;
    var blob = C.write(fmt, mesh, nm), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = nm + '.' + fmt; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }
  $('enDlStl').addEventListener('click', function () { save('stl'); });
  $('enDl3mf').addEventListener('click', function () { save('3mf'); });
  $('enBoard').addEventListener('change', function () { setBoard($('enBoard').value, false); history.replaceState(null, '', '#' + $('enBoard').value); });
  $('enSearch').addEventListener('input', buildSelect);

  var hash = (location.hash || '').replace('#', ''); if (hash && (DB.byId(hash) || hash === 'custom')) st.id = hash;
  buildSelect(); st.b = boardFromId(st.id); P.under = st.b.under; P.hr = st.b.hr; buildPanel();
  msg(T.loading);
  EN.init().then(function () { st.ready = true; msg(''); recompute(); }).catch(function () { msg(T.libErr, true); });
})();
