(function () {
  'use strict';
  var C = window.Conv; if (!C) return;
  var LANG = (document.documentElement.lang || 'de').slice(0, 2) === 'en' ? 'en' : 'de';
  var T = {
    de: { drop: 'Datei hierher ziehen oder klicken', loaded: 'Geladen', tris: 'Dreiecke', size: 'Größe (mm)', err: 'Die Datei konnte nicht gelesen werden. Ist sie beschädigt oder ein anderes Format?', errStep: 'Die STEP-Datei konnte nicht verarbeitet werden. Möglicherweise enthält sie keine Volumenkörper/Flächen.', busy: 'Wird verarbeitet …', loadStep: 'STEP-Modul wird geladen (einmalig ca. 3 MB) …',
      conv: 'Konvertieren', dl: 'Herunterladen', done: 'Fertig', same: 'Quell- und Zielformat sind gleich.', big: 'Achtung: Bei sehr vielen Dreiecken wird die STEP-Datei sehr groß (grob 1 MB je 1.000 Dreiecke).', mb: 'MB', kb: 'KB',
      stepWarn: 'Hinweis: STL/3MF/OBJ sind Dreiecksnetze. Die STEP-Datei besteht deshalb aus lauter ebenen Dreiecksflächen – sie lässt sich in CAD öffnen, aber nicht wie ein ursprüngliches CAD-Modell bearbeiten (keine Bohrungen/Rundungen als Features).', none: 'Noch keine Datei gewählt.',
      meshBad: 'Das Netz ist nicht wasserdicht (offene Kanten: {o}, verdrehte Flächen: {f}, mehrfach genutzte Kanten: {m}, entartete Dreiecke: {d}). Bei STEP meldet z. B. Bambu Studio dann „Schale nicht geschlossen“. Tipp: Quelldatei vorher reparieren (Bambu Studio: Rechtsklick → Reparieren, oder Windows 3D-Builder).' },
    en: { drop: 'Drop a file here or click', loaded: 'Loaded', tris: 'triangles', size: 'Size (mm)', err: 'The file could not be read. It may be damaged or a different format.', errStep: 'The STEP file could not be processed. It may not contain solids/faces.', busy: 'Processing …', loadStep: 'Loading STEP module (one time, about 3 MB) …',
      conv: 'Convert', dl: 'Download', done: 'Done', same: 'Source and target format are the same.', big: 'Note: with very many triangles the STEP file gets very large (roughly 1 MB per 1,000 triangles).', mb: 'MB', kb: 'KB',
      stepWarn: 'Note: STL/3MF/OBJ are triangle meshes. The STEP file therefore consists of many flat triangular faces – it opens in CAD but cannot be edited like an original CAD model (no holes/fillets as features).', none: 'No file selected yet.',
      meshBad: 'The mesh is not watertight (open edges: {o}, flipped faces: {f}, multi-used edges: {m}, degenerate triangles: {d}). With STEP, e.g. Bambu Studio will then warn "shell not closed". Tip: repair the source file first (Bambu Studio: right-click → Repair, or Windows 3D Builder).' }
  }[LANG];
  function $(i) { return document.getElementById(i); }
  function fmtSize(n) { return n > 1048576 ? (n / 1048576).toFixed(1) + ' ' + T.mb : Math.max(1, Math.round(n / 1024)) + ' ' + T.kb; }
  var state = { name: 'model', fmt: null, buf: null, mesh: null, url: null };
  var drop = $('cvDrop'), file = $('cvFile'), status = $('cvStatus');
  function msg(t, bad) { status.textContent = t || ''; status.className = 'cv-status' + (bad ? ' bad' : ''); }
  function setFile(f) {
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      state.buf = rd.result; state.name = f.name.replace(/\.[^.]+$/, ''); state.fmt = C.detect(f.name, rd.result); state.mesh = null; $('cvOut').hidden = true; msg('');
      if (!state.fmt) { msg(T.err, true); return; }
      $('cvFileInfo').textContent = f.name + ' · ' + fmtSize(f.size);
      $('cvQualityWrap').hidden = state.fmt !== 'step';
      var t = $('cvTarget'); if (t.value === state.fmt || (state.fmt === 'stl' && t.value === 'stlA')) t.value = state.fmt === '3mf' ? 'stl' : '3mf';
      updateWarn();
    };
    rd.readAsArrayBuffer(f);
  }
  function updateWarn() { $('cvWarn').textContent = $('cvTarget').value === 'step' && state.fmt && state.fmt !== 'step' ? T.stepWarn : ''; }
  drop.addEventListener('click', function () { file.click(); });
  drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } });
  file.addEventListener('change', function () { setFile(file.files[0]); });
  ['dragover', 'dragenter'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
  drop.addEventListener('drop', function (e) { if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); });
  $('cvTarget').addEventListener('change', updateWarn);

  $('cvGo').addEventListener('click', async function () {
    if (!state.buf || !state.fmt) { msg(T.none, true); return; }
    var tv = $('cvTarget').value, tgt = tv === 'stlA' ? 'stl' : tv;
    if (tgt === state.fmt && tv !== 'stlA') { msg(T.same, true); return; }
    var btn = this; btn.disabled = true; msg(state.fmt === 'step' ? T.loadStep : T.busy);
    try {
      await new Promise(function (r) { setTimeout(r, 30); });
      var mesh = await C.parse(state.fmt, state.buf, { base: window.CONV_BASE || '/assets/vendor/', quality: $('cvQuality').value });
      state.mesh = mesh; var s = C.stats(mesh);
      msg(T.busy);
      await new Promise(function (r) { setTimeout(r, 30); });
      var blob = C.write(tgt, mesh, state.name, { ascii: tv === 'stlA' });
      if (state.url) URL.revokeObjectURL(state.url);
      state.url = URL.createObjectURL(blob);
      var ext = tgt === 'step' ? 'step' : tgt, a = $('cvDl'); a.href = state.url; a.download = state.name + '.' + ext;
      a.textContent = T.dl + ' ' + state.name + '.' + ext + ' (' + fmtSize(blob.size) + ')';
      $('cvStats').textContent = s.tris.toLocaleString() + ' ' + T.tris + ' · ' + T.size + ': ' + s.size.map(function (x) { return x.toFixed(1); }).join(' × ');
      $('cvOut').hidden = false; msg(T.done + (tgt === 'step' && s.tris > 50000 ? ' – ' + T.big : ''));
      var ck = C.check(mesh), wn = $('cvWarn');
      if (!ck.ok && tgt === 'step') wn.textContent = T.meshBad.replace('{o}', ck.open).replace('{f}', ck.flipped).replace('{m}', ck.multi).replace('{d}', ck.degen);
      draw(mesh);
    } catch (e) { msg(state.fmt === 'step' ? T.errStep : T.err, true); }
    btn.disabled = false;
  });

  // ---- einfache Vorschau (flach schattiert, drehbar) ----
  var cv = $('cvCanvas'), gl = null, ctx = null, view = { rx: -0.5, rz: 0.6, z: 1 }, cur = null, G = null;
  try { gl = cv.getContext('webgl2', { antialias: true }); } catch (e) { gl = null; }
  if (!gl) ctx = cv.getContext('2d');
  function initGL() {
    function sh(t, src) { var o = gl.createShader(t); gl.shaderSource(o, src); gl.compileShader(o); return o; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, '#version 300 es\nin vec3 p;uniform vec3 c;uniform vec4 r;uniform vec2 k;out vec3 vp;void main(){vec3 q=p-c;float cz=r.x,sz=r.y,cx=r.z,sx=r.w;float x1=q.x*cz-q.y*sz,y1=q.x*sz+q.y*cz;float y2=y1*cx-q.z*sx,z2=y1*sx+q.z*cx;vp=vec3(x1,z2,y2);gl_Position=vec4(x1*k.x,z2*k.y,y2*k.x*0.02,1.0);}'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, '#version 300 es\nprecision highp float;in vec3 vp;out vec4 o;void main(){vec3 n=normalize(cross(dFdx(vp),dFdy(vp)));float l=abs(dot(n,normalize(vec3(-0.35,0.55,-0.75))));float f=0.28+0.72*l;o=vec4(vec3(0.93,0.78,0.55)*f,1.0);}'));
    gl.linkProgram(pr); gl.useProgram(pr);
    G = { pr: pr, vao: gl.createVertexArray(), vb: gl.createBuffer(), ib: gl.createBuffer(), n: 0 };
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LESS);
  }
  function upload(m) {
    if (!G) initGL();
    var mn = [1e30, 1e30, 1e30], mx = [-1e30, -1e30, -1e30], v = m.v, k, j;
    for (k = 0; k < v.length; k += 3) for (j = 0; j < 3; j++) { if (v[k + j] < mn[j]) mn[j] = v[k + j]; if (v[k + j] > mx[j]) mx[j] = v[k + j]; }
    G.c = [(mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2];
    G.r = Math.max(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]) || 1;
    gl.bindVertexArray(G.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, G.vb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(G.pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, G.ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, m.i, gl.STATIC_DRAW);
    G.n = m.i.length;
  }
  function drawGL(mesh) {
    if (mesh) { cur = mesh; upload(mesh); } if (!cur) return;
    var w = cv.width, h = cv.height, s = Math.min(w, h) * 0.8 / G.r * view.z;
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(G.pr); gl.bindVertexArray(G.vao);
    gl.uniform3f(gl.getUniformLocation(G.pr, 'c'), G.c[0], G.c[1], G.c[2]);
    gl.uniform4f(gl.getUniformLocation(G.pr, 'r'), Math.cos(view.rz), Math.sin(view.rz), Math.cos(view.rx), Math.sin(view.rx));
    gl.uniform2f(gl.getUniformLocation(G.pr, 'k'), s / (w / 2), s / (h / 2));
    gl.drawElements(gl.TRIANGLES, G.n, gl.UNSIGNED_INT, 0);
  }
  function draw(mesh) {
    if (gl) return drawGL(mesh);
    if (mesh) cur = mesh; if (!cur) return;
    var m = cur, w = cv.width, h = cv.height, v = m.v, ix = m.i, n = ix.length / 3, step = Math.max(1, Math.ceil(n / 25000)), k;
    var mn = [1e30, 1e30, 1e30], mx = [-1e30, -1e30, -1e30];
    for (k = 0; k < v.length; k += 3) for (var j = 0; j < 3; j++) { mn[j] = Math.min(mn[j], v[k + j]); mx[j] = Math.max(mx[j], v[k + j]); }
    var c = [(mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2], r = Math.max(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]) || 1, sc = (Math.min(w, h) * 0.8 / r) * view.z;
    var cz = Math.cos(view.rz), sz = Math.sin(view.rz), cx = Math.cos(view.rx), sx = Math.sin(view.rx), P = new Float32Array(v.length);
    for (k = 0; k < v.length; k += 3) {
      var x = v[k] - c[0], y = v[k + 1] - c[1], z = v[k + 2] - c[2], x1 = x * cz - y * sz, y1 = x * sz + y * cz, y2 = y1 * cx - z * sx, z2 = y1 * sx + z * cx;
      P[k] = w / 2 + x1 * sc; P[k + 1] = h / 2 - z2 * sc; P[k + 2] = y2; // y2 = Tiefe
    }
    var tris = [];
    for (k = 0; k < n; k += step) { var a = ix[3 * k] * 3, b = ix[3 * k + 1] * 3, d = ix[3 * k + 2] * 3; tris.push([k, (P[a + 2] + P[b + 2] + P[d + 2]) / 3]); }
    tris.sort(function (p, q) { return q[1] - p[1]; });
    ctx.clearRect(0, 0, w, h);
    tris.forEach(function (t) {
      var a = ix[3 * t[0]] * 3, b = ix[3 * t[0] + 1] * 3, d = ix[3 * t[0] + 2] * 3;
      var ux = P[b] - P[a], uy = P[b + 1] - P[a + 1], vx = P[d] - P[a], vy = P[d + 1] - P[a + 1], cr = ux * vy - uy * vx;
      var shade = 90 + Math.min(120, Math.abs(cr) > 0 ? 0 : 0);
      // Beleuchtung aus Flächennormale im Weltraum
      var A = v.subarray(a, a + 3), B = v.subarray(b, b + 3), D = v.subarray(d, d + 3), e1 = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], e2 = [D[0] - A[0], D[1] - A[1], D[2] - A[2]];
      var nx = e1[1] * e2[2] - e1[2] * e2[1], ny = e1[2] * e2[0] - e1[0] * e2[2], nz = e1[0] * e2[1] - e1[1] * e2[0], nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      var wx = (nx * cz - ny * sz) / nl, wy = (nx * sz + ny * cz) / nl, wz = nz / nl, ty = wy * cx - wz * sx, tz = wy * sx + wz * cx;
      var l = Math.abs(wx * 0.3 + tz * 0.6 + ty * -0.5); shade = Math.round(70 + 150 * Math.min(1, l));
      ctx.fillStyle = 'rgb(' + shade + ',' + Math.round(shade * 0.85) + ',' + Math.round(shade * 0.6) + ')';
      ctx.beginPath(); ctx.moveTo(P[a], P[a + 1]); ctx.lineTo(P[b], P[b + 1]); ctx.lineTo(P[d], P[d + 1]); ctx.closePath(); ctx.fill();
    });
  }
  var drag = null;
  cv.addEventListener('pointerdown', function (e) { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointerup', function () { drag = null; });
  cv.addEventListener('pointermove', function (e) { if (!drag) return; view.rz += (e.clientX - drag[0]) * 0.01; view.rx = Math.max(-1.5, Math.min(1.5, view.rx + (e.clientY - drag[1]) * 0.01)); drag = [e.clientX, e.clientY]; draw(); });
  cv.addEventListener('wheel', function (e) { e.preventDefault(); view.z = Math.max(0.3, Math.min(4, view.z * (e.deltaY < 0 ? 1.1 : 0.9))); draw(); }, { passive: false });
})();
