/* 3DToolBox – Druckbett-Vorschau: Modell (STL/3MF/OBJ/STEP) lokal laden, auf dem Druckbett ansehen, ausrichten, Passung prüfen,
   Gewicht/Druckzeit schätzen. Alles läuft im Browser, keine Datei wird hochgeladen. Benötigt Conv, PrintDock, THREE (+OrbitControls). */
(function () {
  'use strict';
  var DE = (document.documentElement.lang || 'de').slice(0, 2) === 'de';
  var T = DE ? {
    drop: 'Datei hierher ziehen oder klicken', fmts: 'STL, 3MF, OBJ oder STEP', reading: 'Datei wird gelesen …', err: 'Die Datei konnte nicht gelesen werden. Ist sie beschädigt oder ein anderes Format?',
    huge: 'Die Datei ist größer als 400 MB.', fits: 'Passt aufs Druckbett', nofit: 'Zu groß fürs Druckbett', fitsRot: 'Passt nach einer Drehung um 90° um die Hochachse',
    tall: 'Zu hoch (Bauhöhe des Druckers: ', empty: 'Lade eine Datei, um sie auf dem Druckbett zu sehen.',
    size: 'Maße (B × T × H)', vol: 'Volumen', weight: 'Gewicht', time: 'Druckzeit', mat: 'Materialkosten', fp: 'Fläche auf dem Bett', tris: 'Dreiecke',
    mesh: 'Netz', meshOk: 'wasserdicht', meshBad: 'Probleme', meshBadMsg: 'Das Netz ist nicht ganz wasserdicht (offene Kanten: {o}, mehrfach genutzte Kanten: {m}, verdrehte Flächen: {f}, entartete Dreiecke: {d}). Der Slicer repariert das meist, kontrolliere die Vorschau dort.',
    smallHint: 'Das Modell ist sehr klein. Falls die Datei in Zoll gespeichert ist, stelle oben „Zoll“ ein.', bigHint: 'Das Modell ist sehr groß. Falls die Datei in Metern oder Zentimetern gespeichert ist, passe den Maßstab an.',
    est: 'Richtwerte: Gewicht und Zeit werden aus Volumen, Oberfläche und Füllung geschätzt. Dein Slicer rechnet genauer.', h: 'Std.', mn: 'Min.', calc: 'Im Kostenrechner weiterrechnen',
    stepNote: 'STEP wird beim ersten Mal nachgeladen (ca. 8 MB), das dauert einen Moment.', bad: 'Achtung: ', unitMm: 'mm', unitIn: 'Zoll'
  } : {
    drop: 'Drop a file here or click', fmts: 'STL, 3MF, OBJ or STEP', reading: 'Reading file …', err: 'The file could not be read. It may be damaged or a different format.',
    huge: 'The file is larger than 400 MB.', fits: 'Fits on the print bed', nofit: 'Too large for the print bed', fitsRot: 'Fits after rotating 90° around the vertical axis',
    tall: 'Too tall (printer build height: ', empty: 'Load a file to see it on the print bed.',
    size: 'Size (W × D × H)', vol: 'Volume', weight: 'Weight', time: 'Print time', mat: 'Material cost', fp: 'Footprint on bed', tris: 'Triangles',
    mesh: 'Mesh', meshOk: 'watertight', meshBad: 'Problems', meshBadMsg: 'The mesh is not completely watertight (open edges: {o}, multi-used edges: {m}, flipped faces: {f}, degenerate triangles: {d}). Slicers usually repair this, check the preview there.',
    smallHint: 'The model is very small. If the file is stored in inches, switch the unit to “inch” above.', bigHint: 'The model is very large. If the file is stored in metres or centimetres, adjust the scale.',
    est: 'Estimates: weight and time are derived from volume, surface and infill. Your slicer is more precise.', h: 'h', mn: 'min', calc: 'Continue in the cost calculator',
    stepNote: 'STEP is loaded on first use (about 8 MB), this takes a moment.', bad: 'Note: ', unitMm: 'mm', unitIn: 'inch'
  };
  /* Bauhöhe in mm (Richtwerte, im Formular änderbar) */
  var HEIGHT = { a1mini: 180, a1: 256, p1p: 256, p1s: 256, x1c: 256, x1e: 256, p2s: 256, h2s: 340, h2d: 325, h2c: 320, prusamini: 180, mk3s: 210, mk4: 220, coreone: 270, prusaxl: 360, ender3: 250, ender3v3p: 300, k1: 250, k1max: 300, k2plus: 350, centauri: 256, neptune4: 265, neptune4plus: 385, neptune4max: 420, kobra2: 250, kobra3: 260, kobra2max: 500, q1pro: 240, plus4: 305, sv06: 250, sv08: 345, ad5m: 220, voron250: 250, voron300: 300, voron350: 350 };
  var $ = function (id) { return document.getElementById(id); };
  var PD = window.PrintDock, C = window.Conv;
  var S = { base: null, name: '', unit: 1, scale: 1, R: [1, 0, 0, 0, 1, 0, 0, 0, 1], bw: 256, bd: 256, bh: 256, pid: 'x1c', mesh: null, st: null };
  var gl = {};

  /* ---------- 3D-Ansicht ---------- */
  function initView() {
    var host = $('bvCanvas'), T3 = window.THREE;
    if (!T3) { host.textContent = 'WebGL nicht verfügbar'; return false; }
    var r;
    try { r = new T3.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { host.textContent = DE ? 'WebGL wird von diesem Browser nicht unterstützt.' : 'WebGL is not supported by this browser.'; return false; }
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); host.appendChild(r.domElement);
    var scene = new T3.Scene(), cam = new T3.PerspectiveCamera(38, 1, 1, 6000);
    cam.up.set(0, 0, 1);
    scene.add(new T3.HemisphereLight(0xffffff, 0x8a8f99, 0.85));
    var d1 = new T3.DirectionalLight(0xffffff, 0.75); d1.position.set(-300, -400, 700); scene.add(d1);
    var d2 = new T3.DirectionalLight(0xffffff, 0.3); d2.position.set(400, 300, 200); scene.add(d2);
    var ctl = new T3.OrbitControls(cam, r.domElement); ctl.enableDamping = true; ctl.dampingFactor = 0.12; ctl.maxPolarAngle = Math.PI * 0.499;
    gl = { r: r, scene: scene, cam: cam, ctl: ctl, T: T3, bed: new T3.Group(), model: null, host: host };
    scene.add(gl.bed);
    function size() { var w = host.clientWidth, h = host.clientHeight; r.setSize(w, h, false); r.domElement.style.width = '100%'; r.domElement.style.height = '100%'; cam.aspect = w / Math.max(1, h); cam.updateProjectionMatrix(); }
    window.addEventListener('resize', size); if (window.ResizeObserver) new ResizeObserver(size).observe(host); size();
    (function loop() { requestAnimationFrame(loop); ctl.update(); r.render(scene, cam); })();
    return true;
  }
  function buildBed() {
    var T3 = gl.T, g = gl.bed, i;
    while (g.children.length) { var c = g.children.pop(); if (c.geometry) c.geometry.dispose(); }
    var w = S.bw, d = S.bd, h = S.bh;
    var plate = new T3.Mesh(new T3.PlaneGeometry(w, d), new T3.MeshBasicMaterial({ color: 0x3b4a45, transparent: true, opacity: 0.55, side: T3.DoubleSide })); plate.position.z = -0.05; g.add(plate);
    var pts = [], step = 10, x, y;
    for (x = -Math.floor(w / 2 / step) * step; x <= w / 2; x += step) pts.push(x, -d / 2, 0, x, d / 2, 0);
    for (y = -Math.floor(d / 2 / step) * step; y <= d / 2; y += step) pts.push(-w / 2, y, 0, w / 2, y, 0);
    var grid = new T3.LineSegments(new T3.BufferGeometry().setAttribute('position', new T3.Float32BufferAttribute(pts, 3)), new T3.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 })); g.add(grid);
    var edge = new T3.LineSegments(new T3.EdgesGeometry(new T3.PlaneGeometry(w, d)), new T3.LineBasicMaterial({ color: 0xff8c3c })); edge.position.z = 0.05; g.add(edge);
    var bx = new T3.BoxGeometry(w, d, h); bx.translate(0, 0, h / 2);
    g.add(new T3.LineSegments(new T3.EdgesGeometry(bx), new T3.LineBasicMaterial({ color: 0x5fd9a0, transparent: true, opacity: 0.35 })));
    var ax = new T3.LineSegments(new T3.BufferGeometry().setAttribute('position', new T3.Float32BufferAttribute([-w / 2, -d / 2, 0.1, -w / 2 + 30, -d / 2, 0.1, -w / 2, -d / 2, 0.1, -w / 2, -d / 2 + 30, 0.1, -w / 2, -d / 2, 0.1, -w / 2, -d / 2, 30], 3)), new T3.LineBasicMaterial({ color: 0xffffff }));
    ax.material.vertexColors = false; g.add(ax);
    view('iso');
  }
  function view(kind) {
    var cam = gl.cam, w = S.bw, d = S.bd, m = Math.max(w, d), t = new gl.T.Vector3(0, 0, Math.min(S.bh, m) * 0.12);
    var pos = kind === 'top' ? [0, -0.001, m * 1.55] : kind === 'front' ? [0, -m * 1.6, S.bh * 0.45] : kind === 'side' ? [m * 1.6, 0, S.bh * 0.45] : [m * 0.85, -m * 1.15, m * 0.85];
    cam.position.set(pos[0], pos[1], pos[2]); gl.ctl.target.copy(t); gl.ctl.update();
  }

  /* ---------- Geometrie ---------- */
  function rotMul(a, b) { var o = [], i, j; for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) o[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j]; return o; }
  function rotAxis(ax, deg) { var c = Math.cos(deg * Math.PI / 180), s = Math.sin(deg * Math.PI / 180); c = Math.abs(c) < 1e-12 ? 0 : c; s = Math.abs(s) < 1e-12 ? 0 : s; return ax === 'x' ? [1, 0, 0, 0, c, -s, 0, s, c] : ax === 'y' ? [c, 0, s, 0, 1, 0, -s, 0, c] : [c, -s, 0, s, c, 0, 0, 0, 1]; }
  function rotFromTo(a, b) { /* Drehung, die Einheitsvektor a auf b abbildet */
    var v = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], c = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    if (c > 0.999999) return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (c < -0.999999) return [1, 0, 0, 0, -1, 0, 0, 0, -1];
    var k = 1 / (1 + c);
    return [
      v[0] * v[0] * k + c, v[0] * v[1] * k - v[2], v[0] * v[2] * k + v[1],
      v[0] * v[1] * k + v[2], v[1] * v[1] * k + c, v[1] * v[2] * k - v[0],
      v[0] * v[2] * k - v[1], v[1] * v[2] * k + v[0], v[2] * v[2] * k + c];
  }
  function transformed() {
    var b = S.base, f = S.unit * S.scale, R = S.R, n = b.v.length / 3, out = new Float32Array(n * 3), k, x, y, z, mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity], tmp = new Float64Array(n * 3);
    for (k = 0; k < n; k++) {
      x = b.v[k * 3] * f; y = b.v[k * 3 + 1] * f; z = b.v[k * 3 + 2] * f;
      var X = R[0] * x + R[1] * y + R[2] * z, Y = R[3] * x + R[4] * y + R[5] * z, Z = R[6] * x + R[7] * y + R[8] * z;
      tmp[k * 3] = X; tmp[k * 3 + 1] = Y; tmp[k * 3 + 2] = Z;
      if (X < mn[0]) mn[0] = X; if (X > mx[0]) mx[0] = X; if (Y < mn[1]) mn[1] = Y; if (Y > mx[1]) mx[1] = Y; if (Z < mn[2]) mn[2] = Z; if (Z > mx[2]) mx[2] = Z;
    }
    var cx = (mn[0] + mx[0]) / 2, cy = (mn[1] + mx[1]) / 2;
    for (k = 0; k < n; k++) { out[k * 3] = tmp[k * 3] - cx; out[k * 3 + 1] = tmp[k * 3 + 1] - cy; out[k * 3 + 2] = tmp[k * 3 + 2] - mn[2]; }
    return { v: out, size: [mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]] };
  }
  function volArea(v, idx) {
    var vol = 0, area = 0, i, a, b, c, ax, ay, az, bx, by, bz, cx, cy, cz, ux, uy, uz, wx, wy, wz, nx, ny, nz;
    for (i = 0; i < idx.length; i += 3) {
      a = idx[i] * 3; b = idx[i + 1] * 3; c = idx[i + 2] * 3;
      ax = v[a]; ay = v[a + 1]; az = v[a + 2]; bx = v[b]; by = v[b + 1]; bz = v[b + 2]; cx = v[c]; cy = v[c + 1]; cz = v[c + 2];
      vol += (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6;
      ux = bx - ax; uy = by - ay; uz = bz - az; wx = cx - ax; wy = cy - ay; wz = cz - az;
      nx = uy * wz - uz * wy; ny = uz * wx - ux * wz; nz = ux * wy - uy * wx; area += Math.sqrt(nx * nx + ny * ny + nz * nz) / 2;
    }
    return { vol: Math.abs(vol), area: area };
  }
  function layFlat() {
    var b = S.base, f = S.unit * S.scale, R = S.R, v = b.v, idx = b.i, groups = {}, i, best = null, bestA = 0, key;
    for (i = 0; i < idx.length; i += 3) {
      var P = [0, 0, 0].map(function (_, j) { var k = idx[i + j] * 3, x = v[k] * f, y = v[k + 1] * f, z = v[k + 2] * f; return [R[0] * x + R[1] * y + R[2] * z, R[3] * x + R[4] * y + R[5] * z, R[6] * x + R[7] * y + R[8] * z]; });
      var ux = P[1][0] - P[0][0], uy = P[1][1] - P[0][1], uz = P[1][2] - P[0][2], wx = P[2][0] - P[0][0], wy = P[2][1] - P[0][1], wz = P[2][2] - P[0][2];
      var nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx, l = Math.sqrt(nx * nx + ny * ny + nz * nz); if (l < 1e-12) continue;
      nx /= l; ny /= l; nz /= l; key = Math.round(nx * 50) + ',' + Math.round(ny * 50) + ',' + Math.round(nz * 50);
      var g = groups[key] || (groups[key] = { a: 0, n: [0, 0, 0] }); g.a += l / 2; g.n[0] += nx * l; g.n[1] += ny * l; g.n[2] += nz * l;
    }
    for (key in groups) if (groups[key].a > bestA) { bestA = groups[key].a; best = groups[key]; }
    if (!best) return;
    var L = Math.sqrt(best.n[0] * best.n[0] + best.n[1] * best.n[1] + best.n[2] * best.n[2]) || 1, nn = [best.n[0] / L, best.n[1] / L, best.n[2] / L];
    S.R = rotMul(rotFromTo(nn, [0, 0, -1]), S.R); refresh();
  }

  /* ---------- Anzeige ---------- */
  function fmtT(h) { var m = Math.max(1, Math.round(h * 60)); return m < 60 ? m + ' ' + T.mn : Math.floor(m / 60) + ' ' + T.h + (m % 60 ? ' ' + (m % 60) + ' ' + T.mn : ''); }
  function num(v, d) { return v.toFixed(d).replace('.', DE ? ',' : '.'); }
  function refresh() {
    if (!S.base) { $('bvInfo').hidden = true; $('bvEmpty').hidden = false; return; }
    var t = transformed(), T3 = gl.T, w = t.size[0], d = t.size[1], h = t.size[2];
    var fitsBed = w <= S.bw + 0.01 && d <= S.bd + 0.01, fitsH = h <= S.bh + 0.01, fitsRot = d <= S.bw + 0.01 && w <= S.bd + 0.01, ok = fitsBed && fitsH;
    if (gl.model) { gl.scene.remove(gl.model); gl.model.geometry.dispose(); }
    var geo = new T3.BufferGeometry(); geo.setAttribute('position', new T3.BufferAttribute(t.v, 3)); geo.setIndex(new T3.BufferAttribute(S.base.i, 1)); geo.computeVertexNormals();
    var mesh = new T3.Mesh(geo, new T3.MeshStandardMaterial({ color: ok ? 0xf2a65a : 0xe5484d, roughness: 0.62, metalness: 0.05, flatShading: true, side: T3.DoubleSide }));
    gl.model = mesh; gl.scene.add(mesh);
    var va = volArea(t.v, S.base.i), st = { vol: va.vol, area: va.area }, mat = PD.MATS.filter(function (m) { return m[0] === $('bvMat').value; })[0] || PD.MATS[0];
    var infill = (parseFloat($('bvInfill').value) || 15) / 100, shell = st.area * 1.2, cm3 = Math.min(st.vol, shell + Math.max(0, st.vol - shell) * infill) / 1000, g = cm3 * mat[2];
    var hours = cm3 / PD.CFG.rate + 0.05, price = parseFloat($('bvPrice').value) || 20, eur = g / 1000 * price;
    S.st = { g: g, hours: hours, w: w, d: d, h: h };
    var msg = ok ? T.fits : (!fitsBed ? (fitsRot && fitsH ? T.fitsRot : T.nofit) : T.tall + num(S.bh, 0) + ' mm)');
    var s = $('bvFit'); s.textContent = (ok ? '✓ ' : '✕ ') + msg; s.className = 'bv-fit ' + (ok ? 'ok' : 'bad');
    $('bvSize').textContent = num(w, 1) + ' × ' + num(d, 1) + ' × ' + num(h, 1) + ' mm';
    $('bvFp').textContent = num(w, 0) + ' × ' + num(d, 0) + ' mm (' + num(w * d / (S.bw * S.bd) * 100, 0) + ' %)';
    $('bvVol').textContent = num(st.vol / 1000, 2) + ' cm³';
    $('bvW').textContent = '≈ ' + num(g, g < 10 ? 1 : 0) + ' g'; $('bvTime').textContent = '≈ ' + fmtT(hours); $('bvCost').textContent = '≈ ' + num(eur, 2) + ' €';
    var mx = Math.max(w, d, h), hint = '';
    if (mx < 5) hint = T.smallHint; else if (mx > 1500) hint = T.bigHint;
    $('bvHint').textContent = hint; $('bvHint').hidden = !hint;
    var ck = S.mesh;
    $('bvMesh').textContent = ck.ok ? T.meshOk : T.meshBad; $('bvMesh').className = ck.ok ? '' : 'warn';
    $('bvMeshMsg').textContent = ck.ok ? '' : T.meshBadMsg.replace('{o}', ck.open).replace('{m}', ck.multi).replace('{f}', ck.flipped).replace('{d}', ck.degen); $('bvMeshMsg').hidden = ck.ok;
    $('bvTris').textContent = String(S.base.i.length / 3).replace(/\B(?=(\d{3})+(?!\d))/g, DE ? '.' : ',');
    $('bvCalc').href = (DE ? '/3d-druck-kostenrechner.html' : '/en/3d-print-cost-calculator.html') + '?g=' + Math.round(g) + '&h=' + (Math.round(hours * 100) / 100) + '&mat=' + $('bvMat').value + '&p=' + price;
    $('bvInfo').hidden = false; $('bvEmpty').hidden = true; $('bvUnitIn').disabled = false;
  }
  function msg(t, bad) { var s = $('bvStatus'); s.textContent = t || ''; s.className = 'bv-status' + (bad ? ' bad' : ''); }
  function load(f) {
    if (!f) return;
    if (f.size > 400 * 1048576) { msg(T.huge, true); return; }
    var rd = new FileReader();
    rd.onerror = function () { msg(T.err, true); };
    rd.onload = async function () {
      var fmt = C.detect(f.name, rd.result);
      if (!fmt) { msg(T.err, true); return; }
      msg(fmt === 'step' ? T.stepNote : T.reading);
      try {
        var mesh = await C.parse(fmt, rd.result, { base: '/assets/vendor/', quality: 'normal' });
        if (!mesh || !mesh.i || !mesh.i.length) throw new Error('empty');
        S.base = mesh; S.name = f.name; S.R = [1, 0, 0, 0, 1, 0, 0, 0, 1]; S.scale = 1; S.unit = 1; $('bvScale').value = 100; $('bvUnitMm').checked = true;
        S.mesh = C.check(mesh); $('bvFile').textContent = f.name + ' · ' + (f.size / 1048576 < 1 ? Math.round(f.size / 1024) + ' KB' : (f.size / 1048576).toFixed(1) + ' MB');
        msg(''); refresh(); view('iso');
      } catch (e) { msg(T.err, true); }
    };
    rd.readAsArrayBuffer(f);
  }

  /* ---------- Bedienung ---------- */
  function setPrinter() {
    var id = $('bvPrinter').value, p = PD.printer(id); if (!p) return;
    S.pid = id; S.bw = p.w; S.bd = p.d; S.bh = HEIGHT[id] || 250; $('bvH').value = S.bh; if (gl.T) { buildBed(); refresh(); }
    try { var cur = JSON.parse(localStorage.getItem('tb_gk_env') || '{}'); cur.bed = id; localStorage.setItem('tb_gk_env', JSON.stringify(cur)); } catch (e) { /* ohne Speicher */ }
  }
  function init() {
    if (!PD || !C) return;
    $('bvPrinter').innerHTML = PD.bedOptions(); 
    $('bvMat').innerHTML = PD.MATS.map(function (m) { return '<option value="' + m[0] + '">' + m[1] + '</option>'; }).join('');
    var saved = 'x1c'; try { saved = JSON.parse(localStorage.getItem('tb_gk_env') || '{}').bed || 'x1c'; } catch (e) { /* */ }
    if (!PD.printer(saved)) saved = 'x1c'; $('bvPrinter').value = saved;
    if (!initView()) return;
    setPrinter();
    $('bvPrinter').addEventListener('change', setPrinter);
    $('bvH').addEventListener('input', function () { var v = parseFloat($('bvH').value); if (v > 20) { S.bh = v; buildBed(); refresh(); } });
    ['bvMat', 'bvInfill', 'bvPrice'].forEach(function (id) { $(id).addEventListener('input', function () { if (S.base) refresh(); }); });
    $('bvInfillOut').textContent = $('bvInfill').value + ' %'; $('bvInfill').addEventListener('input', function () { $('bvInfillOut').textContent = $('bvInfill').value + ' %'; });
    document.querySelectorAll('input[name=bvUnit]').forEach(function (r) { r.addEventListener('change', function () { S.unit = parseFloat(r.value); if (S.base && r.checked) refresh(); }); });
    $('bvScale').addEventListener('input', function () { var v = parseFloat($('bvScale').value); if (v > 0.1 && v < 100000) { S.scale = v / 100; if (S.base) refresh(); } });
    document.querySelectorAll('[data-rot]').forEach(function (b) { b.addEventListener('click', function () { if (!S.base) return; var p = b.getAttribute('data-rot').split(':'); S.R = rotMul(rotAxis(p[0], parseFloat(p[1])), S.R); refresh(); }); });
    $('bvFlat').addEventListener('click', function () { if (S.base) layFlat(); });
    $('bvReset').addEventListener('click', function () { if (S.base) { S.R = [1, 0, 0, 0, 1, 0, 0, 0, 1]; refresh(); } });
    document.querySelectorAll('[data-view]').forEach(function (b) { b.addEventListener('click', function () { view(b.getAttribute('data-view')); }); });
    var drop = $('bvDrop'), inp = $('bvInput');
    drop.addEventListener('click', function () { inp.click(); });
    drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); } });
    inp.addEventListener('change', function () { load(inp.files[0]); inp.value = ''; });
    ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
    drop.addEventListener('drop', function (e) { if (e.dataTransfer.files[0]) load(e.dataTransfer.files[0]); });
    window.BedView = { load: load, state: S, refresh: refresh };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
