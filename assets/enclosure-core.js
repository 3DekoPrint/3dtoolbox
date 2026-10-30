/* 3DToolBox — Gehäuse-Generator (Kern). Baut Boden + Deckel für eine Platine mit der freien Bibliothek „Manifold“
   (Apache-2.0, läuft per WebAssembly im Browser). Ergebnis sind geschlossene Körper in mm.
   Aufbau (alle Maße in mm, Koordinaten der Platine: Ursprung unten links, X nach rechts, Y nach oben):
     Boden: Außenform mit Wänden und Boden, Halter an den Montagelöchern, Aussparungen für Anschlüsse.
     Deckel: Platte mit Lippe, die in den Boden greift; liegt im Druck mit der Außenseite nach unten. */
(function (root) {
  'use strict';
  var M = null, loading = null;

  function init() {
    if (M) return Promise.resolve(M);
    if (loading) return loading;
    loading = import('/assets/vendor/manifold/manifold.js').then(function (mod) {
      return mod.default();
    }).then(function (w) { w.setup(); M = w; return M; });
    return loading;
  }

  function rrect(x0, y0, x1, y1, r) {
    var CS = M.CrossSection, w = x1 - x0, h = y1 - y0;
    r = Math.max(0, Math.min(r, w / 2 - 0.01, h / 2 - 0.01));
    if (r < 0.05) return CS.square([w, h], false).translate([x0, y0]);
    return CS.square([w - 2 * r, h - 2 * r], false).translate([x0 + r, y0 + r]).offset(r, 'Round', 2, 24);
  }
  function box(x0, y0, z0, x1, y1, z1) { return M.Manifold.cube([x1 - x0, y1 - y0, z1 - z0], false).translate([x0, y0, z0]); }
  function cyl(x, y, z0, z1, d) { return M.Manifold.cylinder(z1 - z0, d / 2, d / 2, 32, false).translate([x, y, z0]); }
  function ext(cs, z0, z1) { return M.Manifold.extrude(cs, z1 - z0).translate([0, 0, z0]); }

  function toMesh(man) {
    var m = man.getMesh(), n = m.vertProperties.length / m.numProp, v = new Float64Array(n * 3), k;
    for (k = 0; k < n; k++) { v[3 * k] = m.vertProperties[k * m.numProp]; v[3 * k + 1] = m.vertProperties[k * m.numProp + 1]; v[3 * k + 2] = m.vertProperties[k * m.numProp + 2]; }
    return { v: v, i: new Uint32Array(m.triVerts) };
  }
  function merge(a, b) {
    var v = new Float64Array(a.v.length + b.v.length), i = new Uint32Array(a.i.length + b.i.length), n = a.v.length / 3, k;
    v.set(a.v); v.set(b.v, a.v.length); i.set(a.i);
    for (k = 0; k < b.i.length; k++) i[a.i.length + k] = b.i[k] + n;
    return { v: v, i: i };
  }

  /* p: { L, W, t, holes:[[x,y]], hd, mode:'pin'|'screw'|'rest', cl, wall, floor, under, hr, lidT, lipH, fit, rc,
          pad:{W,E,S,N}, ports:[{e,c,w,h,zc}], lidCuts:[{x,y,w,h}], vents:0|1, ventW, ventPitch, part:'both'|'base'|'lid'|'test' } */
  function build(p) {
    if (!M) throw new Error('Manifold nicht geladen');
    var pad = p.pad || {}, pw = pad.W || 0, pe = pad.E || 0, ps = pad.S || 0, pn = pad.N || 0;
    var cl = p.cl, wall = p.wall, f = p.floor, lt = p.lidT, lipH = p.lipH, fit = p.fit;
    var x0 = -cl - pw, x1 = p.L + cl + pe, y0 = -cl - ps, y1 = p.W + cl + pn;
    var zp = f + p.under + p.t;                       // Oberseite der Platine
    var hr = p.part === 'test' ? Math.min(p.hr, 2.5) : p.hr;
    var zr = zp + hr;                                 // Oberkante der Wände
    var rcIn = Math.max(0.4, p.rc - wall);
    var outer = rrect(x0 - wall, y0 - wall, x1 + wall, y1 + wall, p.rc);
    var cav = rrect(x0, y0, x1, y1, rcIn);
    var base = ext(outer, 0, zr).subtract(ext(cav, f, zr + 1));

    // Halter an den Montagelöchern
    var so = Math.max((p.hd || 2.75) + 3.2, 5.5), hasHoles = p.holes && p.holes.length > 0, post = [], k;
    if (hasHoles) {
      p.holes.forEach(function (h) {
        var s = cyl(h[0], h[1], f - 0.3, f + p.under, so);
        if (p.mode === 'pin') s = s.add(cyl(h[0], h[1], f + p.under - 0.01, f + p.under + p.t * 0.8, Math.max(1.2, p.hd - 0.3)));
        else if (p.mode === 'screw') s = s.subtract(cyl(h[0], h[1], f + 0.8, f + p.under + 1, Math.max(1.4, p.hd - 0.5)));
        post.push(s);
      });
    } else { // ohne Montagelöcher: zwei Auflageleisten unter den langen Kanten
      var rw = cl + 2.2;
      post.push(box(x0 - 0.2, y0 - 0.2, f - 0.3, x1 + 0.2, y0 + rw, f + p.under));
      post.push(box(x0 - 0.2, y1 - rw, f - 0.3, x1 + 0.2, y1 + 0.2, f + p.under));
    }
    post.forEach(function (s) { base = base.add(s); });

    // Aussparungen für Anschlüsse
    (p.ports || []).forEach(function (q) {
      var hw = q.w / 2, zlo = Math.max(zp + q.zc - q.h / 2, f + 0.4), zhi = zp + q.zc + q.h / 2;
      if (zhi <= zlo) return;
      var c;
      if (q.e === 'W') c = box(x0 - wall - 1, q.c - hw, zlo, x0 + 0.4, q.c + hw, zhi);
      else if (q.e === 'E') c = box(x1 - 0.4, q.c - hw, zlo, x1 + wall + 1, q.c + hw, zhi);
      else if (q.e === 'S') c = box(q.c - hw, y0 - wall - 1, zlo, q.c + hw, y0 + 0.4, zhi);
      else c = box(q.c - hw, y1 - 0.4, zlo, q.c + hw, y1 + wall + 1, zhi);
      base = base.subtract(c);
    });

    var out = { info: { outer: [x1 - x0 + 2 * wall, y1 - y0 + 2 * wall, zr], inner: [x1 - x0, y1 - y0, zr - f], zp: zp } };
    if (p.part !== 'lid') out.base = toMesh(base);
    if (p.part === 'base' || p.part === 'test') return out;

    // Deckel: im Einbau-Zustand Lippe unten (z 0..lipH), Platte oben; danach zum Druck umgedreht (Außenseite nach unten)
    var li = rrect(x0 + fit, y0 + fit, x1 - fit, y1 - fit, Math.max(0.4, rcIn - fit));
    var lo = rrect(x0 + fit + 1.2, y0 + fit + 1.2, x1 - fit - 1.2, y1 - fit - 1.2, Math.max(0.3, rcIn - fit - 1.2));
    var ring = ext(li, 0, lipH + 0.01).subtract(ext(lo, -1, lipH + 1));
    var lid = ext(outer, lipH, lipH + lt).add(ring);
    (p.lidCuts || []).forEach(function (c) { lid = lid.subtract(box(c.x, c.y, lipH - 1, c.x + c.w, c.y + c.h, lipH + lt + 1)); });
    if (p.vents) {
      var vw = p.ventW || 2, vp = p.ventPitch || 5, mx = 6, ax0 = x0 + wall + mx, ax1 = x1 - wall - mx, ay0 = y0 + wall + mx, ay1 = y1 - wall - mx;
      if (ax1 - ax0 > 8 && ay1 - ay0 > 8) {
        var n = Math.max(1, Math.floor((ax1 - ax0 + vp - vw) / vp)), tot = (n - 1) * vp + vw, sx = (x0 + x1) / 2 - tot / 2;
        for (k = 0; k < n; k++) lid = lid.subtract(box(sx + k * vp, ay0, lipH - 1, sx + k * vp + vw, ay1, lipH + lt + 1));
      }
    }
    var yc = (y0 + y1) / 2;
    lid = lid.mirror([0, 1, 0]).mirror([0, 0, 1]).translate([0, 2 * yc, lipH + lt]);
    var lm = toMesh(lid);
    if (p.part === 'lid') { out.lid = lm; return out; }
    var dx = (x1 - x0) + 2 * wall + 8, v = lm.v;
    for (k = 0; k < v.length; k += 3) v[k] += dx;
    out.lid = lm; out.both = merge(out.base, lm);
    return out;
  }

  root.Enclosure = { init: init, build: build };
})(window);
