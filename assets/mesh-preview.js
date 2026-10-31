/* 3DToolBox – kleine WebGL2-Vorschau für Dreiecksnetze (flach schattiert, drehbar, zoombar). */
(function (root) {
  'use strict';
  function create(cv, opt) {
    var gl = null, G = null, cur = null, view = { rx: (opt && opt.rx) != null ? opt.rx : -0.5, rz: (opt && opt.rz) != null ? opt.rz : 0.6, z: (opt && opt.z) != null ? opt.z : 1 };
    try { gl = cv.getContext('webgl2', { antialias: true }); } catch (e) { gl = null; }
    if (!gl) return { set: function () {}, ok: false };
    function sh(t, src) { var o = gl.createShader(t); gl.shaderSource(o, src); gl.compileShader(o); return o; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, '#version 300 es\nin vec3 p;uniform vec3 c;uniform vec4 r;uniform vec2 k;out vec3 vp;out float vz;uniform vec2 zr;void main(){vz=(p.z-zr.x)/max(zr.y,1e-6);vec3 q=p-c;float cz=r.x,sz=r.y,cx=r.z,sx=r.w;float x1=q.x*cz-q.y*sz,y1=q.x*sz+q.y*cz;float y2=y1*cx-q.z*sx,z2=y1*sx+q.z*cx;vp=vec3(x1,z2,y2);gl_Position=vec4(x1*k.x,z2*k.y,y2*k.x*0.02,1.0);}'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, '#version 300 es\nprecision highp float;in vec3 vp;in float vz;out vec4 o;void main(){vec3 n=normalize(cross(dFdx(vp),dFdy(vp)));float l=abs(dot(n,normalize(vec3(-0.35,0.55,-0.75))));float f=(0.28+0.72*l)*(0.62+0.38*vz);o=vec4(vec3(0.93,0.78,0.55)*f,1.0);}'));
    gl.linkProgram(pr); gl.useProgram(pr);
    G = { vao: gl.createVertexArray(), vb: gl.createBuffer(), ib: gl.createBuffer(), n: 0, c: [0, 0, 0], r: 1 };
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LESS);
    function upload(m) {
      var mn = [1e30, 1e30, 1e30], mx = [-1e30, -1e30, -1e30], v = m.v, k, j;
      for (k = 0; k < v.length; k += 3) for (j = 0; j < 3; j++) { if (v[k + j] < mn[j]) mn[j] = v[k + j]; if (v[k + j] > mx[j]) mx[j] = v[k + j]; }
      G.z = [mn[2], mx[2] - mn[2]]; G.c = [(mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2]; G.r = Math.max(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]) || 1;
      gl.bindVertexArray(G.vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, G.vb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, G.ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, m.i, gl.STATIC_DRAW);
      G.n = m.i.length;
    }
    function draw() {
      if (!cur || !G.n) { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); return; }
      var w = cv.width, h = cv.height, s = Math.min(w, h) * 0.8 / G.r * view.z;
      gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(pr); gl.bindVertexArray(G.vao);
      gl.uniform3f(gl.getUniformLocation(pr, 'c'), G.c[0], G.c[1], G.c[2]);
      gl.uniform4f(gl.getUniformLocation(pr, 'r'), Math.cos(view.rz), Math.sin(view.rz), Math.cos(view.rx), Math.sin(view.rx));
      gl.uniform2f(gl.getUniformLocation(pr, 'zr'), G.z[0], G.z[1]);
      gl.uniform2f(gl.getUniformLocation(pr, 'k'), s / (w / 2), s / (h / 2));
      gl.drawElements(gl.TRIANGLES, G.n, gl.UNSIGNED_INT, 0);
    }
    var drag = null;
    cv.addEventListener('pointerdown', function (e) { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointerup', function () { drag = null; });
    cv.addEventListener('pointermove', function (e) { if (!drag) return; view.rz += (e.clientX - drag[0]) * 0.01; view.rx = Math.max(-1.55, Math.min(1.55, view.rx + (e.clientY - drag[1]) * 0.01)); drag = [e.clientX, e.clientY]; draw(); });
    cv.addEventListener('wheel', function (e) { e.preventDefault(); view.z = Math.max(0.3, Math.min(5, view.z * (e.deltaY < 0 ? 1.1 : 0.9))); draw(); }, { passive: false });
    return { ok: true, set: function (m) { cur = m; upload(m); draw(); } };
  }
  root.MeshPreview = { create: create };
})(window);
