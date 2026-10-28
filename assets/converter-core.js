/* 3DToolBox – Konverter-Kern (läuft komplett im Browser, keine Abhängigkeiten außer optional occt-import-js für STEP).
   Mesh-Format intern: { v: Float64Array (x,y,z …), i: Uint32Array (3 Indizes je Dreieck) } in Millimetern. */
(function (root) {
  'use strict';
  var enc = new TextEncoder(), dec = new TextDecoder();

  // ---------- Hilfsfunktionen ----------
  function Builder() { this.v = []; this.i = []; this.map = new Map(); }
  Builder.prototype.vert = function (x, y, z) {
    var k = x.toPrecision(9) + ',' + y.toPrecision(9) + ',' + z.toPrecision(9), id = this.map.get(k);
    if (id === undefined) { id = this.v.length / 3; this.v.push(x, y, z); this.map.set(k, id); }
    return id;
  };
  Builder.prototype.tri = function (a, b, c) { if (a !== b && b !== c && a !== c) this.i.push(a, b, c); };
  Builder.prototype.done = function () { return { v: Float64Array.from(this.v), i: Uint32Array.from(this.i) }; };

  function crcTable() { var t = [], c, n, k; for (n = 0; n < 256; n++) { c = n; for (k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; }
  var CRC = crcTable();
  function crc32(b) { var c = 0xFFFFFFFF; for (var i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }

  // ---------- ZIP lesen/schreiben (für 3MF) ----------
  async function unzip(buf) {
    var d = new DataView(buf), u8 = new Uint8Array(buf), n = u8.length, e = -1, i;
    for (i = n - 22; i >= Math.max(0, n - 65557); i--) if (d.getUint32(i, true) === 0x06054b50) { e = i; break; }
    if (e < 0) throw new Error('ZIP');
    var cnt = d.getUint16(e + 10, true), p = d.getUint32(e + 16, true), files = {};
    for (i = 0; i < cnt; i++) {
      if (d.getUint32(p, true) !== 0x02014b50) throw new Error('ZIP');
      var method = d.getUint16(p + 10, true), csize = d.getUint32(p + 20, true), nlen = d.getUint16(p + 28, true), xlen = d.getUint16(p + 30, true), clen = d.getUint16(p + 32, true), off = d.getUint32(p + 42, true);
      var name = dec.decode(u8.subarray(p + 46, p + 46 + nlen));
      var lh = off + 30 + d.getUint16(off + 26, true) + d.getUint16(off + 28, true);
      files[name] = { method: method, data: u8.subarray(lh, lh + csize) };
      p += 46 + nlen + xlen + clen;
    }
    return files;
  }
  async function inflateRaw(bytes) {
    var ds = new DecompressionStream('deflate-raw'), w = ds.writable.getWriter(); w.write(bytes); w.close();
    return new Uint8Array(await new Response(ds.readable).arrayBuffer());
  }
  async function zipRead(files, name) {
    var f = files[name]; if (!f) return null;
    return f.method === 0 ? f.data : inflateRaw(f.data);
  }
  function zipStore(entries) { // [{name, data:Uint8Array}] – ohne Kompression (Methode 0)
    var parts = [], cd = [], off = 0;
    entries.forEach(function (en) {
      var nm = enc.encode(en.name), crc = crc32(en.data), h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
      h.setUint32(14, crc, true); h.setUint32(18, en.data.length, true); h.setUint32(22, en.data.length, true); h.setUint16(26, nm.length, true);
      parts.push(new Uint8Array(h.buffer), nm, en.data);
      var c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true);
      c.setUint32(16, crc, true); c.setUint32(20, en.data.length, true); c.setUint32(24, en.data.length, true); c.setUint16(28, nm.length, true); c.setUint32(42, off, true);
      cd.push(new Uint8Array(c.buffer), nm);
      off += 30 + nm.length + en.data.length;
    });
    var cdSize = cd.reduce(function (s, a) { return s + a.length; }, 0), end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, entries.length, true); end.setUint16(10, entries.length, true); end.setUint32(12, cdSize, true); end.setUint32(16, off, true);
    return new Blob(parts.concat(cd, [new Uint8Array(end.buffer)]), { type: 'application/octet-stream' });
  }

  // ---------- Leser ----------
  function parseSTL(buf) {
    var u8 = new Uint8Array(buf), b = new Builder(), dv = new DataView(buf), k, tn;
    var binary = false;
    if (u8.length >= 84) { tn = dv.getUint32(80, true); binary = 84 + tn * 50 === u8.length; }
    if (binary) {
      for (k = 0; k < tn; k++) {
        var o = 84 + k * 50 + 12, ids = [];
        for (var j = 0; j < 3; j++, o += 12) ids.push(b.vert(dv.getFloat32(o, true), dv.getFloat32(o + 4, true), dv.getFloat32(o + 8, true)));
        b.tri(ids[0], ids[1], ids[2]);
      }
    } else {
      var txt = dec.decode(u8), re = /vertex\s+([-+0-9.eE]+)\s+([-+0-9.eE]+)\s+([-+0-9.eE]+)/g, m, ids2 = [];
      while ((m = re.exec(txt))) { ids2.push(b.vert(+m[1], +m[2], +m[3])); if (ids2.length === 3) { b.tri(ids2[0], ids2[1], ids2[2]); ids2 = []; } }
    }
    var r = b.done(); if (!r.i.length) throw new Error('empty'); return r;
  }
  function parseOBJ(buf) {
    var lines = dec.decode(new Uint8Array(buf)).split(/\r?\n/), vs = [], b = new Builder(), ids = [];
    lines.forEach(function (ln) {
      var t = ln.trim().split(/\s+/);
      if (t[0] === 'v') vs.push([+t[1], +t[2], +t[3]]);
      else if (t[0] === 'f') {
        var f = t.slice(1).map(function (s) { var n = parseInt(s.split('/')[0], 10); n = n < 0 ? vs.length + n : n - 1; var p = vs[n]; return b.vert(p[0], p[1], p[2]); });
        for (var k = 1; k + 1 < f.length; k++) b.tri(f[0], f[k], f[k + 1]);
      }
    });
    var r = b.done(); if (!r.i.length) throw new Error('empty'); return r;
  }
  var UNIT = { micron: 0.001, millimeter: 1, centimeter: 10, inch: 25.4, foot: 304.8, meter: 1000 };
  async function parse3MF(buf) {
    var files = await unzip(buf), name = Object.keys(files).filter(function (n) { return /3D\/.*\.model$/i.test(n); })[0];
    var rel = await zipRead(files, '_rels/.rels');
    if (rel) { var rm = /Target="([^"]*\.model)"/i.exec(dec.decode(rel)); if (rm) name = rm[1].replace(/^\//, ''); }
    if (!name || !files[name]) throw new Error('3MF');
    var doc = new DOMParser().parseFromString(dec.decode(await zipRead(files, name)), 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('3MF');
    var model = doc.documentElement, scale = UNIT[model.getAttribute('unit') || 'millimeter'] || 1;
    function collect(d) { var o = {}, all = d.getElementsByTagName('*'); for (var i = 0; i < all.length; i++) if (all[i].localName === 'object') o[all[i].getAttribute('id')] = all[i]; return o; }
    var main = { objs: collect(doc), scale: scale }, docs = {};
    function kids(el, n) { var o = []; for (var c = el.firstElementChild; c; c = c.nextElementSibling) if (c.localName === n) o.push(c); return o; }
    function tf(s) { var m = s ? s.trim().split(/\s+/).map(Number) : [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]; return m.length === 12 ? m : [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]; }
    function comp(a, b) { // erst a, dann b (Zeilenvektor-Konvention)
      var r = new Array(12), x, y;
      for (x = 0; x < 4; x++) for (y = 0; y < 3; y++) {
        if (x < 3) r[x * 3 + y] = a[x * 3] * b[y] + a[x * 3 + 1] * b[3 + y] + a[x * 3 + 2] * b[6 + y];
        else r[9 + y] = a[9] * b[y] + a[10] * b[3 + y] + a[11] * b[6 + y] + b[9 + y];
      }
      return r;
    }
    async function loadExt(path) { // externe Modell-Dateien (z. B. Bambu/Orca: 3D/Objects/object_1.model)
      path = path.replace(/^\//, '');
      if (docs[path] === undefined) {
        docs[path] = null; var raw = await zipRead(files, path);
        if (raw) { var d2 = new DOMParser().parseFromString(dec.decode(raw), 'application/xml'); docs[path] = { objs: collect(d2), scale: UNIT[d2.documentElement.getAttribute('unit') || 'millimeter'] || 1 }; }
      }
      return docs[path];
    }
    var out = new Builder();
    async function emit(ctx, obj, m, depth) {
      if (depth > 8) return;
      var mesh = kids(obj, 'mesh')[0];
      if (mesh) {
        var vEl = kids(kids(mesh, 'vertices')[0] || mesh, 'vertex'), map = [], sc = ctx.scale;
        vEl.forEach(function (v, k) {
          var x = +v.getAttribute('x'), y = +v.getAttribute('y'), z = +v.getAttribute('z');
          map[k] = out.vert((x * m[0] + y * m[3] + z * m[6] + m[9]) * sc, (x * m[1] + y * m[4] + z * m[7] + m[10]) * sc, (x * m[2] + y * m[5] + z * m[8] + m[11]) * sc);
        });
        kids(kids(mesh, 'triangles')[0] || mesh, 'triangle').forEach(function (t) { out.tri(map[+t.getAttribute('v1')], map[+t.getAttribute('v2')], map[+t.getAttribute('v3')]); });
      }
      var cs = kids(obj, 'components')[0];
      if (cs) {
        var cl = kids(cs, 'component');
        for (var q = 0; q < cl.length; q++) {
          var c = cl[q], path = null;
          for (var at = 0; at < c.attributes.length; at++) if (c.attributes[at].localName === 'path') path = c.attributes[at].value;
          var cc = path ? await loadExt(path) : ctx, o = cc && cc.objs[c.getAttribute('objectid')];
          if (o) await emit(cc, o, comp(tf(c.getAttribute('transform')), m), depth + 1);
        }
      }
    }
    var build = doc.getElementsByTagName('build')[0], items = build ? kids(build, 'item') : [], k2;
    if (items.length) { for (k2 = 0; k2 < items.length; k2++) { var it = items[k2], o2 = main.objs[it.getAttribute('objectid')]; if (o2) await emit(main, o2, tf(it.getAttribute('transform')), 0); } }
    else { var ids = Object.keys(main.objs); for (k2 = 0; k2 < ids.length; k2++) await emit(main, main.objs[ids[k2]], tf(), 0); }
    var r = out.done(); if (!r.i.length) throw new Error('empty'); return r;
  }
  var occtP = null;
  function loadOcct(base) {
    if (occtP) return occtP;
    occtP = new Promise(function (res, rej) {
      function go() { root.occtimportjs({ locateFile: function (f) { return base + f; } }).then(res, rej); }
      if (root.occtimportjs) return go();
      var s = document.createElement('script'); s.src = base + 'occt-import-js.js'; s.onload = go; s.onerror = function () { occtP = null; rej(new Error('occt')); }; document.head.appendChild(s);
    });
    return occtP;
  }
  async function parseSTEP(buf, opts) {
    opts = opts || {};
    var occt = await loadOcct(opts.base || '/assets/vendor/'), q = opts.quality || 'normal';
    var params = q === 'fine' ? { linearUnit: 'millimeter', linearDeflectionType: 'bounding_box_ratio', linearDeflection: 0.0005, angularDeflection: 0.1 }
      : q === 'coarse' ? { linearUnit: 'millimeter', linearDeflectionType: 'bounding_box_ratio', linearDeflection: 0.005, angularDeflection: 0.5 }
      : { linearUnit: 'millimeter', linearDeflectionType: 'bounding_box_ratio', linearDeflection: 0.001, angularDeflection: 0.25 };
    var res = occt.ReadStepFile(new Uint8Array(buf), params);
    if (!res || !res.success || !res.meshes || !res.meshes.length) throw new Error('step');
    var b = new Builder();
    res.meshes.forEach(function (m) {
      var p = m.attributes.position.array, ix = m.index.array, map = [];
      for (var k = 0; k < p.length / 3; k++) map[k] = b.vert(p[3 * k], p[3 * k + 1], p[3 * k + 2]);
      for (k = 0; k < ix.length; k += 3) b.tri(map[ix[k]], map[ix[k + 1]], map[ix[k + 2]]);
    });
    return b.done();
  }

  // ---------- Schreiber ----------
  function writeSTL(mesh, ascii, name) {
    var n = mesh.i.length / 3, v = mesh.v, ix = mesh.i, k, a, b, c;
    function normal(t) {
      var ax = v[3 * ix[3 * t + 1]] - v[3 * ix[3 * t]], ay = v[3 * ix[3 * t + 1] + 1] - v[3 * ix[3 * t] + 1], az = v[3 * ix[3 * t + 1] + 2] - v[3 * ix[3 * t] + 2];
      var bx = v[3 * ix[3 * t + 2]] - v[3 * ix[3 * t]], by = v[3 * ix[3 * t + 2] + 1] - v[3 * ix[3 * t] + 1], bz = v[3 * ix[3 * t + 2] + 2] - v[3 * ix[3 * t] + 2];
      var nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx, l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      return [nx / l, ny / l, nz / l];
    }
    if (ascii) {
      var s = ['solid ' + (name || 'model')];
      for (k = 0; k < n; k++) {
        var nm = normal(k); s.push(' facet normal ' + nm.join(' ') + '\n  outer loop');
        for (var j = 0; j < 3; j++) s.push('   vertex ' + v[3 * ix[3 * k + j]] + ' ' + v[3 * ix[3 * k + j] + 1] + ' ' + v[3 * ix[3 * k + j] + 2]);
        s.push('  endloop\n endfacet');
      }
      s.push('endsolid ' + (name || 'model'));
      return new Blob([s.join('\n')], { type: 'model/stl' });
    }
    var buf = new ArrayBuffer(84 + n * 50), d = new DataView(buf); d.setUint32(80, n, true);
    for (k = 0; k < n; k++) {
      var o = 84 + k * 50, nn = normal(k); nn.forEach(function (x, j) { d.setFloat32(o + 4 * j, x, true); }); o += 12;
      for (var q = 0; q < 3; q++, o += 12) for (var w = 0; w < 3; w++) d.setFloat32(o + 4 * w, v[3 * ix[3 * k + q] + w], true);
    }
    return new Blob([buf], { type: 'model/stl' });
  }
  function writeOBJ(mesh, name) {
    var s = ['# 3DToolBox', 'o ' + (name || 'model')], k;
    for (k = 0; k < mesh.v.length; k += 3) s.push('v ' + mesh.v[k] + ' ' + mesh.v[k + 1] + ' ' + mesh.v[k + 2]);
    for (k = 0; k < mesh.i.length; k += 3) s.push('f ' + (mesh.i[k] + 1) + ' ' + (mesh.i[k + 1] + 1) + ' ' + (mesh.i[k + 2] + 1));
    return new Blob([s.join('\n')], { type: 'text/plain' });
  }
  function write3MF(mesh, name) {
    var p = ['<?xml version="1.0" encoding="UTF-8"?>\n<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"><metadata name="Application">3DToolBox</metadata><resources><object id="1" type="model"><mesh><vertices>'], k;
    for (k = 0; k < mesh.v.length; k += 3) p.push('<vertex x="' + mesh.v[k] + '" y="' + mesh.v[k + 1] + '" z="' + mesh.v[k + 2] + '"/>');
    p.push('</vertices><triangles>');
    for (k = 0; k < mesh.i.length; k += 3) p.push('<triangle v1="' + mesh.i[k] + '" v2="' + mesh.i[k + 1] + '" v3="' + mesh.i[k + 2] + '"/>');
    p.push('</triangles></mesh></object></resources><build><item objectid="1"/></build></model>');
    return zipStore([
      { name: '[Content_Types].xml', data: enc.encode('<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>') },
      { name: '_rels/.rels', data: enc.encode('<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>') },
      { name: '3D/3dmodel.model', data: enc.encode(p.join('')) }
    ]);
  }
  function writeSTEP(mesh, name) { // B-Rep aus ebenen Dreiecksflächen (jedes Dreieck = eine Fläche)
    var nm = String(name || 'model').replace(/[^\w.\- ]/g, '_'), L = [], id = 0, k;
    function add(s) { id++; L.push('#' + id + '=' + s + ';'); return id; }
    L.push('ISO-10303-21;', 'HEADER;', "FILE_DESCRIPTION(('3DToolBox planar B-Rep'),'2;1');", "FILE_NAME('" + nm + ".step','2026-01-01T00:00:00',(''),(''),'3DToolBox','3dtoolbox.info','');", "FILE_SCHEMA(('AUTOMOTIVE_DESIGN { 1 0 10303 214 1 1 1 1 }'));", 'ENDSEC;', 'DATA;');
    var app = add("APPLICATION_CONTEXT('automotive design')");
    add("APPLICATION_PROTOCOL_DEFINITION('international standard','automotive_design',2000," + '#' + app + ')');
    var pdc = add("PRODUCT_DEFINITION_CONTEXT('part definition',#" + app + ",'design')"), pc = add("PRODUCT_CONTEXT('',#" + app + ",'mechanical')");
    var prod = add("PRODUCT('" + nm + "','" + nm + "','',(#" + pc + '))'), pdf = add("PRODUCT_DEFINITION_FORMATION('','',#" + prod + ')');
    var pd = add("PRODUCT_DEFINITION('design','',#" + pdf + ',#' + pdc + ')'), pds = add("PRODUCT_DEFINITION_SHAPE('','',#" + pd + ')');
    var o = add("CARTESIAN_POINT('',(0.,0.,0.))"), zd = add("DIRECTION('',(0.,0.,1.))"), xd = add("DIRECTION('',(1.,0.,0.))"), ax = add("AXIS2_PLACEMENT_3D('',#" + o + ',#' + zd + ',#' + xd + ')');
    var len = add('(LENGTH_UNIT() NAMED_UNIT(*) SI_UNIT(.MILLI.,.METRE.))'), ang = add('(NAMED_UNIT(*) PLANE_ANGLE_UNIT() SI_UNIT($,.RADIAN.))'), sa = add('(NAMED_UNIT(*) SI_UNIT($,.STERADIAN.) SOLID_ANGLE_UNIT())');
    var unc = add("UNCERTAINTY_MEASURE_WITH_UNIT(LENGTH_MEASURE(1.E-06),#" + len + ",'distance_accuracy_value','confusion accuracy')");
    var ctx = add('(GEOMETRIC_REPRESENTATION_CONTEXT(3) GLOBAL_UNCERTAINTY_ASSIGNED_CONTEXT((#' + unc + ')) GLOBAL_UNIT_ASSIGNED_CONTEXT((#' + len + ',#' + ang + ',#' + sa + ")) REPRESENTATION_CONTEXT('',''))");
    function f(x) { var s = String(+x.toPrecision(12)).toUpperCase(); if (/E/.test(s)) { var pr = s.split('E'); return (/\./.test(pr[0]) ? pr[0] : pr[0] + '.') + 'E' + pr[1].replace('+', ''); } return /\./.test(s) ? s : s + '.'; }
    function vec3(a) { return f(a[0]) + ',' + f(a[1]) + ',' + f(a[2]); }
    var V = mesh.v, I = mesh.i, vp = [], pt = [], edges = new Map(), faces = [];
    function P(k) { return [V[3 * k], V[3 * k + 1], V[3 * k + 2]]; }
    function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function norm(a) { var l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]); return l ? [a[0] / l, a[1] / l, a[2] / l] : null; }
    function used(k) { if (pt[k] === undefined) { pt[k] = add("CARTESIAN_POINT('',(" + vec3(P(k)) + '))'); vp[k] = add("VERTEX_POINT('',#" + pt[k] + ')'); } }
    function edge(a, b) { // liefert [id, vorwärts?]
      var lo = Math.min(a, b), hi = Math.max(a, b), key = lo + '_' + hi, e = edges.get(key);
      if (!e) {
        var d = sub(P(hi), P(lo)), len = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]), dn = norm(d);
        var dir = add("DIRECTION('',(" + vec3(dn) + '))'), ve = add("VECTOR('',#" + dir + ',' + f(len) + ')'), ln = add("LINE('',#" + pt[lo] + ',#' + ve + ')');
        e = add("EDGE_CURVE('',#" + vp[lo] + ',#' + vp[hi] + ',#' + ln + ',.T.)'); edges.set(key, e);
      }
      return [e, a < b];
    }
    for (k = 0; k < I.length; k += 3) {
      var a = I[k], b = I[k + 1], c = I[k + 2], pa = P(a), pb = P(b), pc = P(c), e1 = sub(pb, pa), e2 = sub(pc, pa);
      var n = norm([e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]]), rd = norm(e1);
      if (!n || !rd) continue;
      used(a); used(b); used(c);
      var nd = add("DIRECTION('',(" + vec3(n) + '))'), rdd = add("DIRECTION('',(" + vec3(rd) + '))'), axp = add("AXIS2_PLACEMENT_3D('',#" + pt[a] + ',#' + nd + ',#' + rdd + ')'), pl = add("PLANE('',#" + axp + ')');
      var oes = [[a, b], [b, c], [c, a]].map(function (ab) { var e = edge(ab[0], ab[1]); return '#' + add("ORIENTED_EDGE('',*,*,#" + e[0] + ',' + (e[1] ? '.T.' : '.F.') + ')'); });
      var lp = add("EDGE_LOOP('',(" + oes.join(',') + '))'), fb = add("FACE_OUTER_BOUND('',#" + lp + ',.T.)');
      faces.push('#' + add("ADVANCED_FACE('',(#" + fb + '),#' + pl + ',.T.)'));
    }
    var sh = add("CLOSED_SHELL('',(" + faces.join(',') + '))'), br = add("MANIFOLD_SOLID_BREP('" + nm + "',#" + sh + ')');
    var sr = add("SHAPE_REPRESENTATION('',(#" + ax + ',#' + br + '),#' + ctx + ')');
    add('SHAPE_DEFINITION_REPRESENTATION(#' + pds + ',#' + sr + ')');
    L.push('ENDSEC;', 'END-ISO-10303-21;');
    return new Blob([L.join('\n')], { type: 'application/step' });
  }

  function stats(m) {
    var mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity], k, j;
    for (k = 0; k < m.v.length; k += 3) for (j = 0; j < 3; j++) { mn[j] = Math.min(mn[j], m.v[k + j]); mx[j] = Math.max(mx[j], m.v[k + j]); }
    return { tris: m.i.length / 3, verts: m.v.length / 3, size: [mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]] };
  }
  function detect(name, buf) {
    var e = (name.split('.').pop() || '').toLowerCase();
    if (e === 'stp') e = 'step';
    if (['stl', '3mf', 'obj', 'step'].indexOf(e) >= 0) return e;
    var h = new Uint8Array(buf, 0, Math.min(16, buf.byteLength));
    if (h[0] === 0x50 && h[1] === 0x4b) return '3mf';
    return null;
  }
  async function parse(fmt, buf, opts) { return fmt === 'stl' ? parseSTL(buf) : fmt === 'obj' ? parseOBJ(buf) : fmt === '3mf' ? parse3MF(buf) : parseSTEP(buf, opts); }
  function write(fmt, mesh, name, opts) { return fmt === 'stl' ? writeSTL(mesh, opts && opts.ascii, name) : fmt === 'obj' ? writeOBJ(mesh, name) : fmt === '3mf' ? write3MF(mesh, name) : writeSTEP(mesh, name); }
  var api = { parse: parse, write: write, stats: stats, detect: detect };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Conv = api;
})(typeof self !== 'undefined' ? self : this);
