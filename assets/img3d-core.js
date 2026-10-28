/* 3DToolBox – Bild-zu-3D-Kern (läuft komplett im Browser, keine Abhängigkeiten).
   Eingabe: Pixelraster { w, h, data: RGBA-Bytes }, Ausgabe: Mesh { v: Float64Array, i: Uint32Array } in Millimetern (z = oben).
   Modi: 'litho' (Lithophane), 'relief' (Höhenkarte), 'sil' (Silhouette/Logo extrudieren). */
(function (root) {
  'use strict';

  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }

  // Helligkeit 0..1 (Transparenz zählt als weiß) und Deckkraft 0..1
  function channels(g) {
    var n = g.w * g.h, lum = new Float32Array(n), alpha = new Float32Array(n), d = g.data, k, a, l, hasAlpha = false;
    for (k = 0; k < n; k++) {
      a = d[4 * k + 3] / 255;
      l = (0.2126 * d[4 * k] + 0.7152 * d[4 * k + 1] + 0.0722 * d[4 * k + 2]) / 255;
      if (a < 0.98) hasAlpha = true;
      lum[k] = l * a + (1 - a); alpha[k] = a;
    }
    return { lum: lum, alpha: alpha, hasAlpha: hasAlpha };
  }

  function boxBlur(src, w, h, r) {
    if (!r) return src;
    var tmp = new Float32Array(src.length), out = new Float32Array(src.length), x, y, k, s, c, lo, hi;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      s = 0; c = 0; lo = Math.max(0, x - r); hi = Math.min(w - 1, x + r);
      for (k = lo; k <= hi; k++) { s += src[y * w + k]; c++; }
      tmp[y * w + x] = s / c;
    }
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      s = 0; c = 0; lo = Math.max(0, y - r); hi = Math.min(h - 1, y + r);
      for (k = lo; k <= hi; k++) { s += tmp[k * w + x]; c++; }
      out[y * w + x] = s / c;
    }
    return out;
  }

  // Oberfläche (Dreiecke, von oben gesehen gegen den Uhrzeigersinn) zu einem geschlossenen Körper machen.
  // X,Y,Z: Eckpunkte der Oberseite. mode 'fan': Unterseite = Fächer um den Mittelpunkt (nur für einen konvexen Außenrand),
  // mode 'mirror': Unterseite = gespiegelte Kopie der Oberseite bei z = 0.
  function extrude(X, Y, Z, tris, mode) {
    var v = [], nT = tris.length, remap = new Map(), top = [], k, i, a, b, c;
    function topV(p) { var t = remap.get(p); if (t === undefined) { t = v.length / 3; v.push(X[p], Y[p], Z[p]); remap.set(p, t); } return t; }
    var out = [], edges = new Map(), M = X.length;
    for (k = 0; k < nT; k += 3) {
      a = tris[k]; b = tris[k + 1]; c = tris[k + 2];
      out.push(topV(a), topV(b), topV(c));
      var e = [[a, b], [b, c], [c, a]];
      for (i = 0; i < 3; i++) {
        var p = e[i][0], q = e[i][1], key = p < q ? p * M + q : q * M + p, r = edges.get(key);
        if (!r) edges.set(key, { p: p, q: q, n: 1 }); else r.n++;
      }
    }
    // Unterseite-Eckpunkte
    var bot = new Map();
    function botV(p) { var t = bot.get(p); if (t === undefined) { t = v.length / 3; v.push(X[p], Y[p], 0); bot.set(p, t); } return t; }
    var bnd = [];
    edges.forEach(function (r) { if (r.n === 1) bnd.push(r); });
    bnd.forEach(function (r) {
      var pt = topV(r.p), qt = topV(r.q), pb = botV(r.p), qb = botV(r.q);
      out.push(qt, pt, pb, qt, pb, qb);
    });
    if (mode === 'fan') {
      var sx = 0, sy = 0, cnt = 0;
      bot.forEach(function (_, p) { sx += X[p]; sy += Y[p]; cnt++; });
      var cc = v.length / 3; v.push(sx / cnt, sy / cnt, 0);
      bnd.forEach(function (r) { out.push(cc, botV(r.q), botV(r.p)); });
    } else {
      for (k = 0; k < nT; k += 3) out.push(botV(tris[k]), botV(tris[k + 2]), botV(tris[k + 1]));
    }
    return { v: Float64Array.from(v), i: Uint32Array.from(out) };
  }

  // Höhenfeld (Lithophane/Relief): hgt je Pixel in mm, optional Rahmen
  function heightMesh(hgt, w, h, pitch, frame, frameH, mirror) {
    var W = w + 2 * frame, H = h + 2 * frame, x, y, X = new Float64Array(W * H), Y = new Float64Array(W * H), Z = new Float64Array(W * H);
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      var ix = x - frame, iy = y - frame, inside = ix >= 0 && iy >= 0 && ix < w && iy < h, id = y * W + x;
      Z[id] = inside ? hgt[iy * w + ix] : frameH;
      X[id] = (mirror ? W - 1 - x : x) * pitch; Y[id] = (H - 1 - y) * pitch;
    }
    var T = [];
    for (y = 0; y < H - 1; y++) for (x = 0; x < W - 1; x++) {
      var a = y * W + x, b = a + 1, c = a + W, d = c + 1;
      if (mirror) T.push(a, b, d, a, d, c); else T.push(a, c, d, a, d, b);
    }
    return extrude(X, Y, Z, T, 'fan');
  }

  // ---- Silhouette: Marching Squares + Vereinfachung + Earcut (glatte Kanten, wenige Dreiecke) ----
  function earcutFn() {
    var e = root.earcut; return e && (e.default || e);
  }
  // Ring (Öse) in das Feld zeichnen; das Feld wird oben vergrößert. f > 0 = innen.
  function addLug(f, w, h, pitch, outerD, holeD) {
    var ro = outerD / 2 / pitch, rh = holeD / 2 / pitch, pad = Math.ceil(ro * 2) + 2, W = w, H = h + pad, x, y, r0 = -1;
    var m = new Float32Array(W * H).fill(-1);
    m.set(f, pad * w);
    for (y = 0; y < H && r0 < 0; y++) for (x = 0; x < W; x++) if (m[y * W + x] > 0) { r0 = y; break; }
    if (r0 < 0) return { f: f, w: w, h: h };
    var sx = 0, sc = 0;
    for (y = r0; y < Math.min(H, r0 + 4); y++) for (x = 0; x < W; x++) if (m[y * W + x] > 0) { sx += x; sc++; }
    var cx = sx / sc, cy = r0 - ro * 0.35;
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      var d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)), i = y * W + x;
      m[i] = Math.max(m[i], (ro - d) / 1.0);
      m[i] = Math.min(m[i], (d - rh) / 1.0);
    }
    return { f: m, w: W, h: H };
  }

  function contours(f, w, h) { // f: Feld (Zeile 0 = oben), Rückgabe: Schleifen in Pixelkoordinaten (x nach rechts, y nach oben), innen links
    var Wp = w + 2, Hp = h + 2, g = new Float32Array(Wp * Hp).fill(-1), x, y;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) g[(h - 1 - y + 1) * Wp + x + 1] = f[y * w + x]; // y nach oben, 1 Pixel Rand
    var next = new Map(), pts = new Map();
    function eid(kind, ex, ey) { return 2 * (ey * Wp + ex) + kind; } // kind 0: horizontal (ex,ey)-(ex+1,ey), 1: vertikal (ex,ey)-(ex,ey+1)
    function pt(id, ax, ay, bx, by) {
      var p = pts.get(id); if (p) return id;
      var va = g[ay * Wp + ax], vb = g[by * Wp + bx], t = va / (va - vb);
      pts.set(id, [ax + (bx - ax) * t, ay + (by - ay) * t]); return id;
    }
    for (y = 0; y < Hp - 1; y++) for (x = 0; x < Wp - 1; x++) {
      var bl = g[y * Wp + x], br = g[y * Wp + x + 1], tr = g[(y + 1) * Wp + x + 1], tl = g[(y + 1) * Wp + x];
      var c = (bl > 0 ? 1 : 0) | (br > 0 ? 2 : 0) | (tr > 0 ? 4 : 0) | (tl > 0 ? 8 : 0);
      if (c === 0 || c === 15) continue;
      var B = function () { return pt(eid(0, x, y), x, y, x + 1, y); }, T = function () { return pt(eid(0, x, y + 1), x, y + 1, x + 1, y + 1); },
          L = function () { return pt(eid(1, x, y), x, y, x, y + 1); }, R = function () { return pt(eid(1, x + 1, y), x + 1, y, x + 1, y + 1); };
      var segs;
      switch (c) {
        case 1: segs = [[B, L]]; break; case 2: segs = [[R, B]]; break; case 4: segs = [[T, R]]; break; case 8: segs = [[L, T]]; break;
        case 3: segs = [[R, L]]; break; case 6: segs = [[T, B]]; break; case 12: segs = [[L, R]]; break; case 9: segs = [[B, T]]; break;
        case 7: segs = [[T, L]]; break; case 11: segs = [[R, T]]; break; case 13: segs = [[B, R]]; break; case 14: segs = [[L, B]]; break;
        case 5: segs = (bl + br + tr + tl) > 0 ? [[T, L], [B, R]] : [[B, L], [T, R]]; break;
        case 10: segs = (bl + br + tr + tl) > 0 ? [[L, B], [R, T]] : [[R, B], [L, T]]; break;
      }
      segs.forEach(function (s) { next.set(s[0](), s[1]()); });
    }
    var loops = [], seen = new Set();
    next.forEach(function (_, start) {
      if (seen.has(start)) return;
      var loop = [], cur = start, guard = 0;
      while (cur !== undefined && !seen.has(cur) && guard++ < 1e7) { seen.add(cur); var p = pts.get(cur); loop.push([p[0] - 1, p[1] - 1]); cur = next.get(cur); }
      if (cur === start && loop.length >= 3) loops.push(loop);
    });
    return loops;
  }

  function area(l) { var a = 0, i, n = l.length; for (i = 0; i < n; i++) { var p = l[i], q = l[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; }
  function dp(pts, lo, hi, tol, keep) { // Douglas-Peucker (iterativ) auf pts[lo..hi]
    var st = [[lo, hi]];
    while (st.length) {
      var s = st.pop(), a = pts[s[0]], b = pts[s[1]], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy) || 1e-12, md = -1, mi = -1, i;
      for (i = s[0] + 1; i < s[1]; i++) { var d = Math.abs((pts[i][0] - a[0]) * dy - (pts[i][1] - a[1]) * dx) / len; if (d > md) { md = d; mi = i; } }
      if (md > tol) { keep[mi] = 1; st.push([s[0], mi], [mi, s[1]]); }
    }
  }
  function simplify(loop, tol) {
    var n = loop.length; if (n < 8) return loop;
    var far = 0, i, md = -1;
    for (i = 1; i < n; i++) { var d = (loop[i][0] - loop[0][0]) * (loop[i][0] - loop[0][0]) + (loop[i][1] - loop[0][1]) * (loop[i][1] - loop[0][1]); if (d > md) { md = d; far = i; } }
    var keep = new Uint8Array(n); keep[0] = 1; keep[far] = 1;
    var a = loop.slice(0, far + 1), b = loop.slice(far).concat([loop[0]]), ka = new Uint8Array(a.length), kb = new Uint8Array(b.length);
    ka[0] = ka[a.length - 1] = 1; kb[0] = kb[b.length - 1] = 1; dp(a, 0, a.length - 1, tol, ka); dp(b, 0, b.length - 1, tol, kb);
    var out = [];
    for (i = 0; i < a.length; i++) if (ka[i]) out.push(a[i]);
    for (i = 1; i < b.length - 1; i++) if (kb[i]) out.push(b[i]);
    return out.length >= 3 ? out : loop;
  }
  function dropCollinear(l) { // Punkte entfernen, die (fast) auf der Linie ihrer Nachbarn liegen
    var out = l.slice(), ch = true, i, n;
    while (ch && out.length > 3) {
      ch = false;
      for (i = 0; i < out.length; i++) {
        n = out.length; var a = out[(i + n - 1) % n], b = out[i], c = out[(i + 1) % n];
        var cr = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])), len = Math.hypot(c[0] - a[0], c[1] - a[1]) || 1e-12;
        if (cr / len < 1e-4) { out.splice(i, 1); ch = true; break; }
      }
    }
    return out;
  }
  function inPoly(p, poly) { var c = false, i, j; for (i = 0, j = poly.length - 1; i < poly.length; j = i++) { if ((poly[i][1] > p[1]) !== (poly[j][1] > p[1]) && p[0] < (poly[j][0] - poly[i][0]) * (p[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) c = !c; } return c; }

  function silMesh1(f, w, h, pitch, height, tol) {
    var ec = earcutFn(), loops = contours(f, w, h), outers = [], holes = [], k;
    loops = loops.map(function (l) { return dropCollinear(simplify(l, tol)); }).filter(function (l) { return l.length >= 3 && Math.abs(area(l)) > 0.05; });
    loops.forEach(function (l) { (area(l) > 0 ? outers : holes).push({ pts: l, area: Math.abs(area(l)), holes: [] }); });
    holes.forEach(function (hl) {
      var best = null; outers.forEach(function (o) { if (o.area > hl.area && inPoly(hl.pts[0], o.pts) && (!best || o.area < best.area)) best = o; });
      if (best) best.holes.push(hl);
    });
    var topV = [], T = [], walls = [];
    outers.forEach(function (o) {
      var coords = [], hi = [], base = topV.length, ring = [o.pts].concat(o.holes.map(function (x) { return x.pts; })), tot = 0;
      ring.forEach(function (l, i) { if (i > 0) hi.push(tot); l.forEach(function (p) { coords.push(p[0], p[1]); }); tot += l.length; });
      var tri = ec(coords, hi, 2), offs = [], run = 0;
      ring.forEach(function (l) { offs.push(run); run += l.length; });
      for (k = 0; k < tri.length; k += 3) {
        var a = tri[k], b = tri[k + 1], c = tri[k + 2], ar = (coords[2 * b] - coords[2 * a]) * (coords[2 * c + 1] - coords[2 * a + 1]) - (coords[2 * c] - coords[2 * a]) * (coords[2 * b + 1] - coords[2 * a + 1]);
        if (ar < 0) { var t = b; b = c; c = t; }
        T.push([base + a, base + b, base + c]);
      }
      ring.forEach(function (l, li) { var n = l.length; for (var i = 0; i < n; i++) walls.push([base + offs[li] + i, base + offs[li] + (i + 1) % n]); });
      ring.forEach(function (l) { l.forEach(function (p) { topV.push([p[0] * pitch, p[1] * pitch]); }); });
    });
    // Eckpunkte: oben bei 0..N-1, unten bei N..2N-1
    var N = topV.length, V = new Float64Array(N * 6), out = [];
    for (k = 0; k < N; k++) { V[3 * k] = topV[k][0]; V[3 * k + 1] = topV[k][1]; V[3 * k + 2] = height; V[3 * (N + k)] = topV[k][0]; V[3 * (N + k) + 1] = topV[k][1]; V[3 * (N + k) + 2] = 0; }
    T.forEach(function (t) { out.push(t[0], t[1], t[2], N + t[0], N + t[2], N + t[1]); });
    walls.forEach(function (e) { var p = e[0], q = e[1]; out.push(q, p, N + p, q, N + p, N + q); });
    return { v: V, i: Uint32Array.from(out) };
  }

  function openEdges(m) {
    var e = new Map(), I = m.i, k, j, n = 0;
    for (k = 0; k < I.length; k += 3) for (j = 0; j < 3; j++) {
      var a = I[k + j], b = I[k + (j + 1) % 3], key = a < b ? a * 4294967296 + b : b * 4294967296 + a;
      e.set(key, (e.get(key) || 0) + 1);
    }
    e.forEach(function (c) { if (c !== 2) n++; });
    return n;
  }
  // Vereinfachungstoleranz so wählen, dass der Körper geschlossen bleibt
  function silMesh(f, w, h, pitch, height) {
    var tols = [0.3, 0.15, 0.06, 0], i, m;
    for (i = 0; i < tols.length; i++) { m = silMesh1(f, w, h, pitch, height, tols[i]); if (!openEdges(m)) return m; }
    return m;
  }

  /* p: { size (mm, längere Seite des Bildbereichs), contrast (0.3–3), invert, smooth (px),
          litho: { minT, maxT, frame }, relief: { baseT, heightH, frame }, sil: { height, threshold (0–1), lug, lugD, holeD } } */
  function build(mode, g, p) {
    var ch = channels(g), w = g.w, h = g.h, pitch = p.size / Math.max(1, Math.max(w, h) - 1), n = w * h, k, l, out;
    if (mode === 'sil') {
      var thr = p.threshold == null ? 0.5 : p.threshold, f = new Float32Array(n);
      var src = ch.hasAlpha ? ch.alpha : ch.lum;
      if (p.smooth) src = boxBlur(src, w, h, p.smooth);
      for (k = 0; k < n; k++) {
        var v0 = ch.hasAlpha ? src[k] - thr : thr - src[k]; // Alpha: deckend = innen, sonst dunkel = innen
        f[k] = p.invert ? -v0 : v0;
        if (f[k] === 0) f[k] = 1e-6;
      }
      // auf die Umrisse zuschneiden; size gilt für die längere Seite des Objekts
      var x0 = w, x1 = -1, y0 = h, y1 = -1, xx, yy;
      for (yy = 0; yy < h; yy++) for (xx = 0; xx < w; xx++) if (f[yy * w + xx] > 0) { if (xx < x0) x0 = xx; if (xx > x1) x1 = xx; if (yy < y0) y0 = yy; if (yy > y1) y1 = yy; }
      if (x1 < 0) return { v: new Float64Array(0), i: new Uint32Array(0) };
      var cw = x1 - x0 + 3, chh = y1 - y0 + 3, cf = new Float32Array(cw * chh).fill(-1);
      for (yy = 0; yy < chh - 2; yy++) for (xx = 0; xx < cw - 2; xx++) cf[(yy + 1) * cw + xx + 1] = f[(y0 + yy) * w + x0 + xx];
      pitch = p.size / Math.max(cw - 2, chh - 2);
      var fw = cw, fh = chh;
      if (p.lug) { var r = addLug(cf, cw, chh, pitch, p.lugD || 8, p.holeD || 4); cf = r.f; fw = r.w; fh = r.h; }
      return silMesh(cf, fw, fh, pitch, p.height || 4);
    }
    var hf = heightField(mode, g, p, ch);
    return heightMesh(hf.hg, w, h, hf.pitch, hf.fr, hf.frameH, mode === 'litho');
  }

  // Höhenwerte je Pixel (mm) für Lithophane/Relief – auch für die Durchlicht-Vorschau nutzbar
  function heightField(mode, g, p, ch) {
    ch = ch || channels(g);
    var w = g.w, h = g.h, n = w * h, k, l, oo = mode === 'litho' ? p.litho : p.relief, lum = ch.lum;
    var pitch = Math.max(0.001, (p.size - 2 * (oo.frame || 0)) / Math.max(1, Math.max(w, h) - 1)); // size = Außenmaß inkl. Rahmen
    if (p.smooth) lum = boxBlur(lum, w, h, p.smooth);
    var c = p.contrast == null ? 1 : p.contrast, hg = new Float32Array(n), fr = Math.round((oo.frame || 0) / pitch);
    for (k = 0; k < n; k++) {
      l = clamp((lum[k] - 0.5) * c + 0.5, 0, 1);
      if (p.invert) l = 1 - l;
      hg[k] = mode === 'litho' ? oo.maxT - l * (oo.maxT - oo.minT) : oo.baseT + l * oo.heightH; // Litho: dunkel = dick, Relief: hell = hoch
    }
    return { hg: hg, pitch: pitch, fr: fr, frameH: mode === 'litho' ? oo.maxT : oo.baseT + oo.heightH };
  }

  var api = { build: build, heightField: heightField };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Img3D = api;
})(typeof self !== 'undefined' ? self : typeof globalThis !== 'undefined' ? globalThis : this);
