/* 3DToolBox – WebGL2-Vorschau für mehrere Teile (Farbe, Sichtbarkeit, Transparenz, Versatz). Nur für den Gehäuse-Generator. */
(function (root) {
  'use strict';
  function create(cv) {
    var gl = null, parts = [], view = { rx: -0.9, rz: 0.5, z: 1 }, B = { c: [0, 0, 0], r: 1, z0: 0, zh: 1 };
    try { gl = cv.getContext('webgl2', { antialias: true }); } catch (e) { gl = null; }
    if (!gl) return { ok: false, set: function () {}, update: function () {} };
    function sh(t, src) { var o = gl.createShader(t); gl.shaderSource(o, src); gl.compileShader(o); return o; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, '#version 300 es\nin vec3 p;uniform vec3 c;uniform vec4 r;uniform vec2 k;uniform vec3 o;out vec3 vp;out float vz;uniform vec2 zr;void main(){vec3 w=p+o;vz=(w.z-zr.x)/max(zr.y,1e-6);vec3 q=w-c;float cz=r.x,sz=r.y,cx=r.z,sx=r.w;float x1=q.x*cz-q.y*sz,y1=q.x*sz+q.y*cz;float y2=y1*cx-q.z*sx,z2=y1*sx+q.z*cx;vp=vec3(x1,z2,y2);gl_Position=vec4(x1*k.x,z2*k.y,y2*k.x*0.02,1.0);}'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, '#version 300 es\nprecision highp float;in vec3 vp;in float vz;uniform vec4 col;out vec4 o;void main(){vec3 n=normalize(cross(dFdx(vp),dFdy(vp)));float l=abs(dot(n,normalize(vec3(-0.35,0.55,-0.75))));float f=(0.32+0.68*l)*(0.78+0.22*vz);o=vec4(col.rgb*f,col.a);}'));
    gl.linkProgram(pr); gl.useProgram(pr);
    var U = {}; ['c', 'r', 'k', 'o', 'zr', 'col'].forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
    var loc = gl.getAttribLocation(pr, 'p');
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LESS); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    function mk(m) {
      var g = { vao: gl.createVertexArray(), vb: gl.createBuffer(), ib: gl.createBuffer(), n: m.i.length };
      gl.bindVertexArray(g.vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, g.vb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(m.v), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g.ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, m.i, gl.STATIC_DRAW);
      return g;
    }
    function free(g) { gl.deleteVertexArray(g.vao); gl.deleteBuffer(g.vb); gl.deleteBuffer(g.ib); }
    // list: [{id, m:{v,i}, c:[r,g,b], dz:0|1 (Versatz-Faktor), visible, alpha}]
    function set(list) {
      parts.forEach(function (q) { free(q.g); });
      var mn = [1e30, 1e30, 1e30], mx = [-1e30, -1e30, -1e30];
      parts = list.map(function (q) {
        var v = q.m.v, k, j;
        for (k = 0; k < v.length; k += 3) for (j = 0; j < 3; j++) { if (v[k + j] < mn[j]) mn[j] = v[k + j]; if (v[k + j] > mx[j]) mx[j] = v[k + j]; }
        return { id: q.id, g: mk(q.m), c: q.c, dz: q.dz || 0, visible: q.visible !== false, alpha: q.alpha == null ? 1 : q.alpha };
      });
      B.c = [(mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2]; B.r = Math.max(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]) || 1; B.z0 = mn[2]; B.zh = mx[2] - mn[2];
      draw();
    }
    // Sichtbarkeit / Transparenz / Auseinanderziehen ändern, ohne neu hochzuladen
    function update(o) {
      if (o.vis) parts.forEach(function (q) { if (o.vis[q.id] != null) q.visible = !!o.vis[q.id]; });
      if (o.alpha) parts.forEach(function (q) { if (o.alpha[q.id] != null) q.alpha = o.alpha[q.id]; });
      if (o.explode != null) view.ex = o.explode;
      draw();
    }
    function draw() {
      var w = cv.width, h = cv.height; gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      if (!parts.length) return;
      var s = Math.min(w, h) * 0.8 / (B.r + (view.ex || 0) * 0.6) * view.z;
      gl.useProgram(pr);
      gl.uniform3f(U.c, B.c[0], B.c[1], B.c[2] + (view.ex || 0) * 0.5);
      gl.uniform4f(U.r, Math.cos(view.rz), Math.sin(view.rz), Math.cos(view.rx), Math.sin(view.rx));
      gl.uniform2f(U.zr, B.z0, B.zh + (view.ex || 0)); gl.uniform2f(U.k, s / (w / 2), s / (h / 2));
      [false, true].forEach(function (pass) {
        gl.depthMask(!pass);
        parts.forEach(function (q) {
          if (!q.visible || (q.alpha < 1) !== pass) return;
          gl.uniform3f(U.o, 0, 0, q.dz * (view.ex || 0)); gl.uniform4f(U.col, q.c[0], q.c[1], q.c[2], q.alpha);
          gl.bindVertexArray(q.g.vao); gl.drawElements(gl.TRIANGLES, q.g.n, gl.UNSIGNED_INT, 0);
        });
      });
      gl.depthMask(true);
    }
    var drag = null;
    cv.addEventListener('pointerdown', function (e) { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointerup', function () { drag = null; });
    cv.addEventListener('pointermove', function (e) { if (!drag) return; view.rz += (e.clientX - drag[0]) * 0.01; view.rx = Math.max(-1.55, Math.min(1.55, view.rx + (e.clientY - drag[1]) * 0.01)); drag = [e.clientX, e.clientY]; draw(); });
    cv.addEventListener('wheel', function (e) { e.preventDefault(); view.z = Math.max(0.3, Math.min(5, view.z * (e.deltaY < 0 ? 1.1 : 0.9))); draw(); }, { passive: false });
    return { ok: true, set: set, update: update, redraw: draw };
  }
  root.EnclosureView = { create: create };
})(window);
