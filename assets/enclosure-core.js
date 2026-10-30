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

  // Lüfter: s = Kantenlänge, h = Lochabstand (Schrauben), d = Öffnung im Deckel, sd = Schraubenloch, th = Dicke
  var FAN = { 25: { s: 25, h: 20, d: 22, sd: 2.8, th: 10 }, 30: { s: 30, h: 24, d: 27, sd: 3.0, th: 10 }, 40: { s: 40, h: 32, d: 37, sd: 3.4, th: 10 },
    50: { s: 50, h: 40, d: 46, sd: 3.4, th: 15 }, 60: { s: 60, h: 50, d: 56, sd: 3.4, th: 15 }, 80: { s: 80, h: 71.5, d: 76, sd: 4.3, th: 25 },
    92: { s: 92, h: 82.5, d: 86, sd: 4.3, th: 25 }, 120: { s: 120, h: 105, d: 114, sd: 4.3, th: 25 } };

  function boxMesh(x0, y0, z0, x1, y1, z1) {
    var v = new Float64Array([x0, y0, z0, x1, y0, z0, x1, y1, z0, x0, y1, z0, x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1]);
    var i = new Uint32Array([0, 2, 1, 0, 3, 2, 4, 5, 6, 4, 6, 7, 0, 1, 5, 0, 5, 4, 1, 2, 6, 1, 6, 5, 2, 3, 7, 2, 7, 6, 3, 0, 4, 3, 4, 7]);
    return { v: v, i: i };
  }
  function shift(m, dx, dy, dz) { var v = new Float64Array(m.v), k; for (k = 0; k < v.length; k += 3) { v[k] += dx; v[k + 1] += dy; v[k + 2] += dz; } return { v: v, i: m.i }; }

  // Schematisches Modell der Platine (PCB, Anschlüsse, Chips) und des Lüfters – nur für die Vorschau
  var PCB_COL = { 'Raspberry Pi': [0.12, 0.55, 0.26], 'Arduino': [0.0, 0.5, 0.55], 'ESP32 / ESP8266': [0.1, 0.11, 0.13], 'Weitere Boards': [0.08, 0.35, 0.2] };
  function models(p, g) {
    var parts = [], zb = g.zp - p.t, k;
    var pcb = box(0, 0, zb, p.L, p.W, g.zp);
    (p.holes || []).forEach(function (h) { pcb = pcb.subtract(cyl(h[0], h[1], zb - 1, g.zp + 1, p.hd || 2.7)); });
    parts.push({ id: 'pcb', c: p.pcbCol || [0.12, 0.55, 0.26], m: toMesh(pcb) });
    var conn = [], dark = [], metal = [];
    (p.ports || []).forEach(function (q) {
      var w = Math.max(q.w - 1.5, 3), hh = Math.max(q.h - 0.8, 1.5), d = Math.max(5, Math.min(21, q.w * 1.25)), zlo = g.zp + q.zc - hh / 2, zhi = g.zp + q.zc + hh / 2, c = q.c, nm = (q.n || '').toLowerCase();
      if (q.zc < 0) { zlo = Math.max(zlo, zb - 3); zhi = Math.min(zhi, zb + 0.4); d = 12; }
      else if (zlo < g.zp) zlo = g.zp;
      if (zhi <= zlo) return;
      var m;
      if (q.e === 'E') m = boxMesh(p.L - d + 1, c - w / 2, zlo, p.L + 1, c + w / 2, zhi);
      else if (q.e === 'W') m = boxMesh(-1, c - w / 2, zlo, d - 1, c + w / 2, zhi);
      else if (q.e === 'S') m = boxMesh(c - w / 2, -1, zlo, c + w / 2, d - 1, zhi);
      else m = boxMesh(c - w / 2, p.W - d + 1, zlo, c + w / 2, p.W + 1, zhi);
      (/dc|audio|sd|strom/.test(nm) && !/usb/.test(nm) ? dark : metal).push(m);
    });
    (p.lidCuts || []).forEach(function (l) { dark.push(boxMesh(l.x, l.y, g.zp, l.x + l.w, l.y + l.h, g.zp + 8.5)); });
    var chips = [];
    (p.chips || []).forEach(function (c) { chips.push(boxMesh(c[0], c[1], g.zp, c[0] + c[2], c[1] + c[3], g.zp + c[4])); });
    function join(arr) { var o = arr[0], j; for (j = 1; j < arr.length; j++) o = merge(o, arr[j]); return o; }
    if (metal.length) parts.push({ id: 'conn', c: [0.78, 0.8, 0.83], m: join(metal) });
    if (dark.length) parts.push({ id: 'conn2', c: [0.1, 0.1, 0.11], m: join(dark) });
    if (chips.length) parts.push({ id: 'chip', c: [0.55, 0.57, 0.6], m: join(chips) });
    var res = { board: parts, fan: [] };
    var fan = g.fan;
    if (fan && p.fanShow !== 0) {
      var fi = g.info.fan, z0 = g.zr + g.lt, s = fan.s, th = fan.th, fx = fi.cx, fy = fi.cy;
      var frame = ext(rrect(fx - s / 2, fy - s / 2, fx + s / 2, fy + s / 2, 3), z0, z0 + th).subtract(cyl(fx, fy, z0 - 1, z0 + th + 1, fan.d));
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { frame = frame.subtract(cyl(fx + q[0] * fan.h / 2, fy + q[1] * fan.h / 2, z0 - 1, z0 + th + 1, fan.sd)); });
      var hub = cyl(fx, fy, z0 + th * 0.1, z0 + th * 0.9, s * 0.36), rotor = hub, bl = 7, rl = fan.d / 2 - 0.8;
      for (k = 0; k < bl; k++) rotor = rotor.add(box(0, -s * 0.06, 0, rl, s * 0.06, th * 0.45).translate([s * 0.12, 0, th * 0.275]).rotate([0, 0, k * 360 / bl]).translate([fx, fy, z0]));
      var spokes = box(fx - fan.d / 2 - 0.5, fy - 0.8, z0, fx + fan.d / 2 + 0.5, fy + 0.8, z0 + 1.2);
      res.fan.push({ id: 'fanframe', c: [0.13, 0.14, 0.16], m: toMesh(frame) });
      res.fan.push({ id: 'fanrotor', c: [0.32, 0.34, 0.38], m: toMesh(rotor) });
    }
    return res;
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

    // Seitliche Lüftungsschlitze (Wände unten/oben)
    if (p.sideVents) {
      var svw = p.ventW || 2, svp = p.ventPitch || 5, svh = Math.max(3, Math.min(14, hr - 3)), sz0 = zp + 1.5;
      var sa0 = x0 + p.rc + 3, sa1 = x1 - p.rc - 3;
      if (sa1 - sa0 > svw + 2 && svh > 2) {
        var sn = Math.max(1, Math.floor((sa1 - sa0 + svp - svw) / svp)), stt = (sn - 1) * svp + svw, ssx = (x0 + x1) / 2 - stt / 2;
        for (k = 0; k < sn; k++) {
          base = base.subtract(box(ssx + k * svp, y0 - wall - 1, sz0, ssx + k * svp + svw, y0 + 0.4, sz0 + svh));
          base = base.subtract(box(ssx + k * svp, y1 - 0.4, sz0, ssx + k * svp + svw, y1 + wall + 1, sz0 + svh));
        }
      }
    }

    var out = { info: { outer: [x1 - x0 + 2 * wall, y1 - y0 + 2 * wall, zr], inner: [x1 - x0, y1 - y0, zr - f], zp: zp, zr: zr, lipH: lipH, lt: lt, f: f } };
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
    var yc = (y0 + y1) / 2, xc = (x0 + x1) / 2;
    var fan = FAN[p.fan | 0];
    if (fan) {
      var fcx = xc + (p.fanOx || 0), fcy = yc + (p.fanOy || 0), fd = Math.min(fan.d, Math.min(x1 - x0, y1 - y0) - 8);
      out.info.fan = { size: fan.s, d: fd, cx: fcx, cy: fcy, fits: fd >= fan.d - 0.01 && (x1 - x0) >= fan.s - 2 && (y1 - y0) >= fan.s - 2 };
      var cut = cyl(fcx, fcy, -1, lipH + lt + 1, fd);
      if (p.fanGrille) {
        var rw = 1.6;
        cut = cut.subtract(box(fcx - fd / 2 - 1, fcy - rw / 2, -2, fcx + fd / 2 + 1, fcy + rw / 2, lipH + lt + 2)).subtract(box(fcx - rw / 2, fcy - fd / 2 - 1, -2, fcx + rw / 2, fcy + fd / 2 + 1, lipH + lt + 2));
        if (p.fanGrille > 1) for (k = 1; k <= Math.floor(fd / 2 / 7); k++) {
          var ro = k * 7, ringc = M.Manifold.cylinder(lipH + lt + 4, ro, ro, 48, false).subtract(M.Manifold.cylinder(lipH + lt + 6, ro - 1.4, ro - 1.4, 48, false).translate([0, 0, -1])).translate([fcx, fcy, -2]);
          cut = cut.subtract(ringc);
        }
      }
      lid = lid.subtract(cut);
      var hs = fan.h / 2;
      var fsd = p.fanScrew === 1 ? (fan.sd > 4 ? 3.3 : fan.sd > 3.2 ? 2.6 : 2.2) : fan.sd;
      out.info.fan.holes = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(function (q) { return [fcx + q[0] * hs, fcy + q[1] * hs]; });
      out.info.fan.sd = fsd; out.info.fan.m = fan.sd > 4 ? 'M4' : fan.sd > 3.2 ? 'M3' : fan.sd > 2.9 ? 'M2.5' : 'M2';
      out.info.fan.holes.forEach(function (h) { lid = lid.subtract(cyl(h[0], h[1], lipH - 1, lipH + lt + 1, fsd)); });
    }
    out.lidAsm = toMesh(lid);
    if (p.models) out.models = models(p, { x0: x0, x1: x1, y0: y0, y1: y1, zp: zp, zr: zr, lt: lt, fan: fan, info: out.info });
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
