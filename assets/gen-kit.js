/* 3DToolBox – Generator-Gerüst „Werkbank“.
   Ein Generator ist nur eine Beschreibung (Parameter + build-Funktion). Das Gerüst liefert Oberfläche, Vorschau,
   Link teilen, Konfiguration speichern/laden, Druckbett-Prüfung, Gewicht/Kosten/Zeit-Schätzung und STL/3MF-Export.
   Läuft komplett im Browser (Manifold-WASM, lokal ausgeliefert). Benötigt Conv (converter-core.js) und MeshPreview. */
(function (root) {
  'use strict';
  var registry = {};
  function define(def) { registry[def.id] = def; if (root.__GK_CAPTURE) root.__GK_CAPTURE(def); return def; }

  /* ---------- Geometrie-Helfer (Manifold) ---------- */
  var M = null, loading = null;
  function init() {
    if (M) return Promise.resolve(M);
    if (loading) return loading;
    loading = import('/assets/vendor/manifold/manifold.js').then(function (mod) { return mod.default(); })
      .then(function (w) { w.setup(); M = w; return M; });
    return loading;
  }
  function makeHelpers(m) {
    var Mf = m.Manifold, CS = m.CrossSection, H = { M: m };
    H.box = function (x0, y0, z0, x1, y1, z1) { return Mf.cube([x1 - x0, y1 - y0, z1 - z0], false).translate([x0, y0, z0]); };
    H.cyl = function (x, y, z0, z1, d, seg) { return Mf.cylinder(z1 - z0, d / 2, d / 2, seg || 48, false).translate([x, y, z0]); };
    H.cone = function (x, y, z0, z1, d0, d1, seg) { return Mf.cylinder(z1 - z0, d0 / 2, d1 / 2, seg || 48, false).translate([x, y, z0]); };
    H.union = function (a) { return Mf.union(a); };
    /* abgerundetes Rechteck als Querschnitt, Mitte im Ursprung */
    H.rrect = function (w, h, r, seg) {
      r = Math.max(0, Math.min(r, Math.min(w, h) / 2 - 0.001));
      var sq = CS.square([w - 2 * r, h - 2 * r], true);
      return r > 0.001 ? sq.offset(r, 'Round', 2, seg || 16) : CS.square([w, h], true);
    };
    H.ext = function (cs, z0, z1) { return Mf.extrude(cs, z1 - z0).translate([0, 0, z0]); };
    /* Hülle zweier Querschnitte in unterschiedlicher Höhe (für Fasen/Schrägen, nur konvexe Formen) */
    H.loft = function (cs0, z0, cs1, z1) {
      var e = 0.001;
      return Mf.hull([Mf.extrude(cs0, e).translate([0, 0, z0]), Mf.extrude(cs1, e).translate([0, 0, z1 - e])]);
    };
    H.toMesh = function (man) {
      var me = man.getMesh(), n = me.vertProperties.length / me.numProp, v = new Float64Array(n * 3), k;
      for (k = 0; k < n; k++) { v[3 * k] = me.vertProperties[k * me.numProp]; v[3 * k + 1] = me.vertProperties[k * me.numProp + 1]; v[3 * k + 2] = me.vertProperties[k * me.numProp + 2]; }
      return { v: v, i: new Uint32Array(me.triVerts) };
    };
    return H;
  }
  function bbox(mesh) {
    var mn = [1e30, 1e30, 1e30], mx = [-1e30, -1e30, -1e30], v = mesh.v, k, j;
    for (k = 0; k < v.length; k += 3) for (j = 0; j < 3; j++) { if (v[k + j] < mn[j]) mn[j] = v[k + j]; if (v[k + j] > mx[j]) mx[j] = v[k + j]; }
    return { min: mn, max: mx, size: [mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]] };
  }
  function shifted(m, dx, dy, dz) { var v = new Float64Array(m.v), k; for (k = 0; k < v.length; k += 3) { v[k] += dx; v[k + 1] += dy; v[k + 2] += dz; } return { v: v, i: m.i }; }
  function merge(list) {
    var nv = 0, ni = 0, o = 0, k, j;
    list.forEach(function (m) { nv += m.v.length; ni += m.i.length; });
    var v = new Float64Array(nv), ix = new Uint32Array(ni), pv = 0, pi = 0;
    list.forEach(function (m) { v.set(m.v, pv); for (j = 0; j < m.i.length; j++) ix[pi + j] = m.i[j] + pv / 3; pv += m.v.length; pi += m.i.length; });
    return { v: v, i: ix };
  }
  /* Teile nebeneinander auf die Platte legen (Druckausrichtung bleibt, z ab 0). */
  function layout(parts, gap) {
    var x = 0, out = [], maxY = 0;
    gap = gap == null ? 8 : gap;
    parts.forEach(function (p) {
      var b = bbox(p.mesh), s = shifted(p.mesh, x - b.min[0], -b.min[1], -b.min[2]);
      out.push({ name: p.name, mesh: s, size: b.size });
      x += b.size[0] + gap; if (b.size[1] > maxY) maxY = b.size[1];
    });
    return { parts: out, w: Math.max(0, x - gap), d: maxY };
  }
  function stats(mesh) {
    var v = mesh.v, ix = mesh.i, vol = 0, area = 0, k;
    for (k = 0; k < ix.length; k += 3) {
      var a = ix[k] * 3, b = ix[k + 1] * 3, c = ix[k + 2] * 3;
      var ax = v[a], ay = v[a + 1], az = v[a + 2], bx = v[b], by = v[b + 1], bz = v[b + 2], cx = v[c], cy = v[c + 1], cz = v[c + 2];
      vol += (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6;
      var ux = bx - ax, uy = by - ay, uz = bz - az, wx = cx - ax, wy = cy - ay, wz = cz - az;
      var nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
      area += Math.sqrt(nx * nx + ny * ny + nz * nz) / 2;
    }
    return { vol: Math.abs(vol), area: area, tris: ix.length / 3 };
  }

  /* ---------- Texte der Oberfläche ---------- */
  var UI = {
    de: { load: 'Lade 3D-Bibliothek …', busy: 'Berechne …', err: 'Mit diesen Werten lässt sich kein gültiges Teil berechnen. Bitte Maße prüfen.', lib: 'Die 3D-Bibliothek konnte nicht geladen werden (WebAssembly wird benötigt).',
      stage: 'Vorschau', drag: 'Ziehen = drehen · Mausrad = zoomen', preset: 'Voreinstellung', custom: '— eigene Werte —', size: 'Maße', vol: 'Volumen', weight: 'Gewicht', cost: 'Material', time: 'Druckzeit',
      est: 'Grobe Schätzung bei 3 Wänden und 15 % Füllung.', bed: 'Druckbett', mat: 'Material', price: 'Preis pro kg (€)', stl: 'STL laden', mf: '3MF laden', link: 'Link kopieren', copied: 'Link kopiert', save: 'Konfiguration speichern', load: 'Konfiguration laden',
      reset: 'Zurücksetzen', fits: 'passt aufs Druckbett', nofit: 'ist größer als das Druckbett', plate: 'Eigene Platte', parts: 'Teile', tri: 'Dreiecke', own: 'eigene Größe (B × T mm)', noGl: 'Die Vorschau braucht WebGL2. Die Dateien lassen sich trotzdem herunterladen.',
      bedFit: function (w, d) { return 'Platzbedarf ' + w.toFixed(0) + ' × ' + d.toFixed(0) + ' mm'; }, h: 'Std.', mn: 'Min.' },
    en: { load: 'Loading 3D library …', busy: 'Calculating …', err: 'These values do not give a valid part. Please check the dimensions.', lib: 'The 3D library could not be loaded (WebAssembly is required).',
      stage: 'Preview', drag: 'Drag = rotate · wheel = zoom', preset: 'Preset', custom: '— custom values —', size: 'Size', vol: 'Volume', weight: 'Weight', cost: 'Material', time: 'Print time',
      est: 'Rough estimate at 3 walls and 15 % infill.', bed: 'Print bed', mat: 'Material', price: 'Price per kg (€)', stl: 'Get STL', mf: 'Get 3MF', link: 'Copy link', copied: 'Link copied', save: 'Save configuration', load: 'Load configuration',
      reset: 'Reset', fits: 'fits on the print bed', nofit: 'is larger than the print bed', plate: 'Custom plate', parts: 'Parts', tri: 'triangles', own: 'custom size (W × D mm)', noGl: 'The preview needs WebGL2. You can still download the files.',
      bedFit: function (w, d) { return 'Footprint ' + w.toFixed(0) + ' × ' + d.toFixed(0) + ' mm'; }, h: 'h', mn: 'min' }
  };
  var BEDS = [['bambu256', 'Bambu X1 / P1 / A1 (256 × 256)', 256, 256], ['a1mini', 'Bambu A1 mini (180 × 180)', 180, 180], ['mk4', 'Prusa MK4 (250 × 210)', 250, 210], ['mini', 'Prusa Mini (180 × 180)', 180, 180],
    ['ender3', 'Ender 3 (220 × 220)', 220, 220], ['k1', 'Creality K1 (220 × 220)', 220, 220], ['voron250', 'Voron 250 (250 × 250)', 250, 250], ['voron300', 'Voron 300 (300 × 300)', 300, 300], ['custom', '', 0, 0]];
  var MATS = [['pla', 'PLA', 1.24], ['petg', 'PETG', 1.27], ['abs', 'ABS / ASA', 1.05], ['tpu', 'TPU', 1.21]];

  /* ---------- Oberfläche ---------- */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function run(def, host) {
    var LANG = (document.documentElement.lang || 'de').slice(0, 2) === 'en' ? 'en' : 'de', T = UI[LANG];
    function L(x) { return x == null ? '' : typeof x === 'string' ? x : (x[LANG] || x.de || ''); }
    var P = {}, DEF = {}, flat = [], busy = false, again = false, last = null, timer = null, H = null, prev = null;
    def.groups.forEach(function (g) { g.items.forEach(function (it) { DEF[it.k] = it.def; P[it.k] = it.def; flat.push(it); }); });
    var env = { bed: 'bambu256', bw: 220, bd: 220, mat: 'pla', price: 20 };
    try { var sv = JSON.parse(localStorage.getItem('tb_gk_env') || '{}'); Object.keys(sv).forEach(function (k) { if (k in env) env[k] = sv[k]; }); } catch (e) { /* Speicher gesperrt */ }
    function saveEnv() { try { localStorage.setItem('tb_gk_env', JSON.stringify(env)); } catch (e) { /* ignorieren */ } }

    host.innerHTML = '';
    host.classList.add('gk');
    var stage = el('div', 'gk-stage'), cv = el('canvas', 'gk-cv'), hud = el('div', 'gk-hud'), tip = el('div', 'gk-tip', T.drag), stat = el('div', 'gk-stat', T.load);
    stage.appendChild(cv); stage.appendChild(hud); stage.appendChild(tip); stage.appendChild(stat);
    var tabs = el('div', 'gk-tabs', ''), body = el('div', 'gk-body');
    var dock = el('div', 'gk-dock');
    host.appendChild(stage); host.appendChild(tabs); host.appendChild(body); var topHost = el('div', 'gk-sticky'); host.appendChild(topHost); host.appendChild(dock);

    /* HUD */
    var hSize = el('div', 'gk-chip'), hFit = el('div', 'gk-fit');
    hud.appendChild(hSize); hud.appendChild(hFit);

    /* Reiter + Felder */
    var inputs = {}, rows = {}, panes = [], tabBtns = [];
    function numStr(v) { return String(Math.round(v * 1000) / 1000); }
    def.groups.forEach(function (g, gi) {
      var b = el('button', 'gk-tab' + (gi === 0 ? ' on' : ''), '<span class="gk-tn">' + String(gi + 1).padStart(2, '0') + '</span>' + esc(L(g.title))); b.type = 'button';
      var pane = el('div', 'gk-pane' + (gi === 0 ? ' on' : ''));
      if (gi === 0 && def.presets && def.presets.length) {
        var pr = el('label', 'gk-f gk-f-wide'), sel = el('select'); sel.id = 'gkPreset';
        sel.innerHTML = '<option value="">' + esc(T.custom) + '</option>' + def.presets.map(function (p, i) { return '<option value="' + i + '">' + esc(L(p.label)) + '</option>'; }).join('');
        pr.innerHTML = '<span>' + esc(T.preset) + '</span>'; pr.appendChild(sel); pane.appendChild(pr);
        sel.addEventListener('change', function () {
          if (sel.value === '') return;
          var p = def.presets[+sel.value]; Object.keys(p.v).forEach(function (k) { P[k] = p.v[k]; }); syncInputs(); schedule();
        });
        inputs.__preset = sel;
      }
      g.items.forEach(function (it) {
        var f = el('label', 'gk-f' + (it.t === 'bool' ? ' gk-f-bool' : '')), c, lab = '<span>' + esc(L(it.label)) + (it.unit ? ' <i>' + esc(L(it.unit)) + '</i>' : '') + (it.hint ? ' <em title="' + esc(L(it.hint)) + '">?</em>' : '') + '</span>';
        if (it.t === 'num' || it.t === 'int') {
          f.innerHTML = lab; var w = el('div', 'gk-num'), r = el('input'), n = el('input');
          r.type = 'range'; n.type = 'number'; r.min = n.min = it.min; r.max = n.max = it.max; r.step = n.step = it.step || (it.t === 'int' ? 1 : 0.1);
          r.value = n.value = P[it.k]; w.appendChild(r); w.appendChild(n); f.appendChild(w);
          var upd = function (src) { return function () { var v = parseFloat(src.value); if (isNaN(v)) return; v = Math.max(it.min, Math.min(it.max, v)); if (it.t === 'int') v = Math.round(v); P[it.k] = v; if (src === r) n.value = numStr(v); else r.value = v; presetOff(); schedule(); }; };
          r.addEventListener('input', upd(r)); n.addEventListener('input', upd(n)); n.addEventListener('blur', function () { n.value = numStr(P[it.k]); });
          inputs[it.k] = { r: r, n: n };
        } else if (it.t === 'bool') {
          c = el('input'); c.type = 'checkbox'; c.checked = !!P[it.k]; f.appendChild(c); f.insertAdjacentHTML('beforeend', lab);
          c.addEventListener('change', function () { P[it.k] = c.checked; presetOff(); applyShow(); schedule(); }); inputs[it.k] = { c: c };
        } else if (it.t === 'sel') {
          f.innerHTML = lab; c = el('select'); c.innerHTML = it.opts.map(function (o) { return '<option value="' + esc(o[0]) + '">' + esc(L(o[1])) + '</option>'; }).join(''); c.value = P[it.k]; f.appendChild(c);
          c.addEventListener('change', function () { P[it.k] = isNaN(+c.value) || it.str ? c.value : +c.value; presetOff(); applyShow(); schedule(); }); inputs[it.k] = { s: c };
        }
        rows[it.k] = f; pane.appendChild(f);
      });
      b.addEventListener('click', function () { tabBtns.forEach(function (x) { x.classList.remove('on'); }); panes.forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); pane.classList.add('on'); });
      tabs.appendChild(b); tabBtns.push(b); body.appendChild(pane); panes.push(pane);
    });
    function presetOff() { if (inputs.__preset) inputs.__preset.value = ''; }
    function applyShow() { flat.forEach(function (it) { if (it.show) rows[it.k].style.display = it.show(P) ? '' : 'none'; }); }
    function syncInputs() {
      flat.forEach(function (it) { var i = inputs[it.k], v = P[it.k]; if (i.r) { i.r.value = v; i.n.value = numStr(v); } else if (i.c) i.c.checked = !!v; else if (i.s) i.s.value = v; });
      applyShow();
    }

    /* Dock */
    var dl = el('div', 'gk-dl'), bStl = el('button', 'gk-btn gk-btn-main', T.stl), bMf = el('button', 'gk-btn gk-btn-main', T.mf);
    bStl.type = bMf.type = 'button'; bStl.disabled = bMf.disabled = true; dl.appendChild(bStl); dl.appendChild(bMf);
    var est = el('div', 'gk-est');
    var env1 = el('div', 'gk-env'), bedSel = el('select'), matSel = el('select'), price = el('input'), bw = el('input'), bd = el('input');
    bedSel.innerHTML = BEDS.map(function (b) { return '<option value="' + b[0] + '">' + (b[0] === 'custom' ? esc(T.own) : esc(b[1])) + '</option>'; }).join('');
    matSel.innerHTML = MATS.map(function (m) { return '<option value="' + m[0] + '">' + m[1] + '</option>'; }).join('');
    price.type = bw.type = bd.type = 'number'; price.min = 1; price.max = 500; price.step = 1; bw.min = bd.min = 50; bw.max = bd.max = 2000;
    bedSel.value = env.bed; matSel.value = env.mat; price.value = env.price; bw.value = env.bw; bd.value = env.bd;
    var mk = function (t, ctl) { var l = el('label', 'gk-e'); l.innerHTML = '<span>' + esc(t) + '</span>'; if (Array.isArray(ctl)) ctl.forEach(function (c) { l.appendChild(c); }); else l.appendChild(ctl); return l; };
    env1.appendChild(mk(T.bed, [bedSel, bw, bd])); env1.appendChild(mk(T.mat, matSel)); env1.appendChild(mk(T.price, price));
    var acts = el('div', 'gk-acts'), bLink = el('button', 'gk-btn', T.link), bSave = el('button', 'gk-btn', T.save), bLoad = el('button', 'gk-btn', T.load), bRes = el('button', 'gk-btn', T.reset), fl = el('input');
    [bLink, bSave, bLoad, bRes].forEach(function (b) { b.type = 'button'; acts.appendChild(b); }); fl.type = 'file'; fl.accept = '.json,application/json'; fl.hidden = true; acts.appendChild(fl);
    var top = el('div', 'gk-dock-top'); top.appendChild(est); top.appendChild(dl);
    topHost.appendChild(top); dock.appendChild(env1); dock.appendChild(acts);
    function readEnv() {
      env.bed = bedSel.value; env.mat = matSel.value; env.price = Math.max(1, parseFloat(price.value) || 20);
      var b = BEDS.filter(function (x) { return x[0] === env.bed; })[0]; if (env.bed === 'custom') { env.bw = Math.max(50, parseFloat(bw.value) || 220); env.bd = Math.max(50, parseFloat(bd.value) || 220); } else { env.bw = b[2]; env.bd = b[3]; bw.value = env.bw; bd.value = env.bd; }
      bw.style.display = bd.style.display = env.bed === 'custom' ? '' : 'none'; saveEnv(); showResult();
    }
    [bedSel, matSel, price, bw, bd].forEach(function (c) { c.addEventListener('input', readEnv); c.addEventListener('change', readEnv); });

    /* Vorschau */
    var ok3d = true;
    function ensurePrev() { if (prev) return; try { prev = root.MeshPreview.create(cv, { rx: 0.7, rz: 0.75, z: 0.72 }); ok3d = !!prev.ok; } catch (e) { ok3d = false; } if (!ok3d) { stat.textContent = T.noGl; } }
    function sizeCv() { var r = stage.getBoundingClientRect(), d = Math.min(2, root.devicePixelRatio || 1); cv.width = Math.max(200, r.width * d); cv.height = Math.max(200, r.height * d); if (last && prev) prev.set(last.preview); }
    root.addEventListener('resize', sizeCv);

    /* Ergebnis anzeigen */
    function fmtTime(h) { if (h < 1) return Math.max(1, Math.round(h * 60)) + ' ' + T.mn; var hh = Math.floor(h), mm = Math.round((h - hh) * 60); return hh + ' ' + T.h + (mm ? ' ' + mm + ' ' + T.mn : ''); }
    function showResult() {
      if (!last) return;
      var r = last, dens = MATS.filter(function (m) { return m[0] === env.mat; })[0][2];
      var vol = r.total.vol / 1000, shell = r.total.area * 1.2, mat = Math.min(r.total.vol, shell + Math.max(0, r.total.vol - shell) * 0.15) / 1000;
      var g = mat * dens, eur = g / 1000 * env.price, hours = (mat * 1000) / 5.5 / 3600 + r.parts.length * 0.05;
      est.innerHTML = '<div class="gk-m"><b>' + g.toFixed(g < 10 ? 1 : 0) + ' g</b><span>' + T.weight + '</span></div><div class="gk-m"><b>' + eur.toFixed(2).replace('.', LANG === 'de' ? ',' : '.') + ' €</b><span>' + T.cost + '</span></div><div class="gk-m"><b>≈ ' + fmtTime(hours) + '</b><span>' + T.time + '</span></div><div class="gk-m gk-m-s"><b>' + vol.toFixed(1) + ' cm³</b><span>' + T.vol + '</span></div><p class="gk-note">' + esc(T.est) + '</p>';
      var fitA = r.w <= env.bw && r.d <= env.bd, fitB = r.w <= env.bd && r.d <= env.bw, fit = fitA || fitB;
      hFit.className = 'gk-fit ' + (fit ? 'ok' : 'bad'); hFit.innerHTML = '<i></i><span>' + T.bedFit(r.w, r.d) + ' · ' + (fit ? T.fits : T.nofit) + '</span>';
      var s = r.size; hSize.innerHTML = '<b>' + s[0].toFixed(1) + ' × ' + s[1].toFixed(1) + ' × ' + s[2].toFixed(1) + '</b> mm' + (r.parts.length > 1 ? ' · ' + r.parts.length + ' ' + T.parts : '');
    }
    function process(parts) {
      var lay = layout(parts, 8), all = merge(lay.parts.map(function (p) { return p.mesh; })), bb = bbox(all), st = stats(all);
      return { parts: lay.parts, preview: all, w: lay.w, d: lay.d, size: bb.size, total: st };
    }

    /* Berechnen */
    function schedule() { clearTimeout(timer); stat.textContent = T.busy; stat.classList.add('on'); timer = setTimeout(rebuild, 140); updateHash(); }
    function rebuild() {
      if (!M) return; if (busy) { again = true; return; } busy = true;
      setTimeout(function () {
        var res = null, bad = false;
        try { var out = def.build(P, H); if (!out || !out.length) bad = true; else res = process(out.map(function (o) { return { name: o.name, mesh: o.mesh }; })); } catch (e) { bad = true; if (root.console) console.warn(e); }
        busy = false;
        if (bad || !res || res.total.tris < 4) { stat.textContent = T.err; stat.classList.add('on', 'bad'); bStl.disabled = bMf.disabled = true; }
        else { last = res; stat.classList.remove('on', 'bad'); ensurePrev(); if (prev && ok3d) prev.set(res.preview); bStl.disabled = bMf.disabled = false; showResult(); }
        if (again) { again = false; rebuild(); }
      }, 0);
    }

    /* Download */
    function dlBlob(blob, name) { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000); }
    function fname() { return (def.file ? L(def.file) : def.id) + '-' + (def.fname ? def.fname(P) : ''); }
    function baseName() { var s = fname().replace(/-+$/, '').replace(/[^\w.\-]+/g, '_'); return s; }
    bStl.addEventListener('click', function () { if (last) dlBlob(root.Conv.write('stl', last.preview, baseName()), baseName() + '.stl'); });
    bMf.addEventListener('click', function () { if (last) dlBlob(root.Conv.write3MFParts(last.parts.map(function (p) { return { name: p.name, mesh: p.mesh }; })), baseName() + '.3mf'); });

    /* Teilen / Speichern */
    function diff() { var o = {}; flat.forEach(function (it) { if (P[it.k] !== DEF[it.k]) o[it.k] = P[it.k]; }); return o; }
    function updateHash() { try { var d = diff(), s = Object.keys(d).length ? 'c=' + btoa(unescape(encodeURIComponent(JSON.stringify(d)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : ''; history.replaceState(null, '', s ? '#' + s : location.pathname + location.search); } catch (e) { /* ignorieren */ } }
    function applyObj(o) { Object.keys(o || {}).forEach(function (k) { var it = flat.filter(function (x) { return x.k === k; })[0]; if (!it) return; var v = o[k]; if (it.t === 'bool') P[k] = !!v; else if (it.t === 'sel') { if (it.opts.some(function (x) { return String(x[0]) === String(v); })) P[k] = v; } else if (typeof v === 'number' && isFinite(v)) P[k] = Math.max(it.min, Math.min(it.max, it.t === 'int' ? Math.round(v) : v)); }); syncInputs(); }
    function fromHash() { var m = /[#&]c=([\w-]+)/.exec(location.hash || ''); if (!m) return; try { var b = m[1].replace(/-/g, '+').replace(/_/g, '/'); while (b.length % 4) b += '='; applyObj(JSON.parse(decodeURIComponent(escape(atob(b))))); } catch (e) { /* ungültiger Link */ } }
    bLink.addEventListener('click', function () {
      updateHash(); var u = location.href, done = function () { var o = bLink.textContent; bLink.textContent = T.copied; setTimeout(function () { bLink.textContent = T.link; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(done, function () { window.prompt('', u); }); else window.prompt('', u);
    });
    bSave.addEventListener('click', function () { dlBlob(new Blob([JSON.stringify({ tool: def.id, v: 1, params: P }, null, 1)], { type: 'application/json' }), def.id + '-konfiguration.json'); });
    bLoad.addEventListener('click', function () { fl.click(); });
    fl.addEventListener('change', function () { var f = fl.files && fl.files[0]; if (!f) return; var rd = new FileReader(); rd.onload = function () { try { var o = JSON.parse(rd.result); if (o && o.tool === def.id) { applyObj(o.params); presetOff(); schedule(); } } catch (e) { /* ungültig */ } fl.value = ''; }; rd.readAsText(f); });
    bRes.addEventListener('click', function () { Object.keys(DEF).forEach(function (k) { P[k] = DEF[k]; }); syncInputs(); presetOff(); schedule(); });

    /* Start */
    fromHash(); applyShow(); readEnv(); sizeCv();
    init().then(function (m) { H = makeHelpers(m); H.lang = LANG; rebuild(); }, function () { stat.textContent = T.lib; stat.classList.add('on', 'bad'); });
    root.__gk = { P: P, get last() { return last; }, rebuild: rebuild, set: function (o) { applyObj(o); presetOff(); schedule(); }, def: def };
  }

  root.GenKit = { define: define, run: run, init: init, makeHelpers: makeHelpers, bbox: bbox, layout: layout, stats: stats, merge: merge, shifted: shifted, registry: registry };
})(typeof self !== 'undefined' ? self : this);
