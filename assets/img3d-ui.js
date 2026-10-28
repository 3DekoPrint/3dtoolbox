(function () {
  'use strict';
  var I3 = window.Img3D, C = window.Conv; if (!I3 || !C) return;
  var LANG = (document.documentElement.lang || 'de').slice(0, 2) === 'en' ? 'en' : 'de';
  var T = {
    de: { err: 'Das Bild konnte nicht gelesen werden (JPG, PNG, WebP, SVG oder GIF).', busy: 'Berechne …', tris: 'Dreiecke', size: 'Maße (mm)', dlStl: 'STL herunterladen', dl3mf: '3MF herunterladen', noWebgl: 'Die 3D-Vorschau wird von diesem Browser nicht unterstützt – der Download funktioniert trotzdem.', empty: 'Keine Umrisse gefunden – passe Schwelle oder „Umkehren“ an.',
      modes: { litho: 'Lithophane', relief: 'Relief', sil: 'Silhouette / Logo' },
      tips: { litho: 'Foto wird zur Platte: dunkle Stellen dick, helle dünn. Aufrecht drucken, mit weißem Filament und Licht von hinten betrachten – die glatte Seite zeigt zum Betrachter.', relief: 'Helle Stellen werden hoch, dunkle tief – für Schilder, Münzen, Prägungen und Landschaftsreliefs. Flach auf dem Druckbett drucken.', sil: 'Schwarz-weißes Bild oder Logo mit transparentem Hintergrund wird zu einem Körper – für Schlüsselanhänger, Ausstecher, Aufsteller. Flach drucken.' },
      f: { size: 'Größe (mm, längere Seite)', detail: 'Auflösung', contrast: 'Kontrast', invert: 'Umkehren', smooth: 'Glätten', minT: 'Dicke hell (mm)', maxT: 'Dicke dunkel (mm)', frame: 'Rahmen (mm)', baseT: 'Grundplatte (mm)', heightH: 'Reliefhöhe (mm)', height: 'Höhe (mm)', thr: 'Schwelle (%)', lug: 'Öse zum Aufhängen', lugD: 'Öse Außen-Ø (mm)', holeD: 'Loch-Ø (mm)' },
      det: ['Standard', 'Fein', 'Sehr fein'] },
    en: { err: 'The image could not be read (JPG, PNG, WebP, SVG or GIF).', busy: 'Calculating …', tris: 'triangles', size: 'Size (mm)', dlStl: 'Download STL', dl3mf: 'Download 3MF', noWebgl: 'This browser does not support the 3D preview – the download still works.', empty: 'No outline found – adjust threshold or “Invert”.',
      modes: { litho: 'Lithophane', relief: 'Relief', sil: 'Silhouette / Logo' },
      tips: { litho: 'The photo becomes a plate: dark areas thick, light areas thin. Print upright with white filament and view with light from behind – the smooth side faces the viewer.', relief: 'Light areas become high, dark areas low – for signs, coins, embossing and landscape reliefs. Print flat on the bed.', sil: 'A black-and-white image or a logo with transparent background becomes a solid – for keychains, cookie cutters, stands. Print flat.' },
      f: { size: 'Size (mm, longer side)', detail: 'Resolution', contrast: 'Contrast', invert: 'Invert', smooth: 'Smoothing', minT: 'Thickness light (mm)', maxT: 'Thickness dark (mm)', frame: 'Frame (mm)', baseT: 'Base plate (mm)', heightH: 'Relief height (mm)', height: 'Height (mm)', thr: 'Threshold (%)', lug: 'Hanging loop', lugD: 'Loop outer Ø (mm)', holeD: 'Hole Ø (mm)' },
      det: ['Standard', 'Fine', 'Very fine'] }
  }[LANG];
  var DET = [250, 400, 600];
  function $(i) { return document.getElementById(i); }
  var P = { // Standardwerte je Modus
    litho: { size: 100, det: 1, contrast: 1, invert: 0, smooth: 0, minT: 0.8, maxT: 3, frame: 3 },
    relief: { size: 80, det: 0, contrast: 1, invert: 0, smooth: 1, baseT: 1, heightH: 3, frame: 0 },
    sil: { size: 60, det: 0, invert: 0, smooth: 1, thr: 50, height: 4, lug: 0, lugD: 8, holeD: 4 }
  };
  var SPEC = { // [Schlüssel, Typ, min, max, Schritt]
    litho: [['size', 'n', 20, 300, 1], ['det', 'd'], ['minT', 'r', 0.4, 2, 0.1], ['maxT', 'r', 1.5, 6, 0.1], ['frame', 'r', 0, 10, 0.5], ['contrast', 'r', 0.3, 3, 0.05], ['smooth', 'r', 0, 4, 1], ['invert', 'c']],
    relief: [['size', 'n', 20, 300, 1], ['det', 'd'], ['baseT', 'r', 0.4, 5, 0.1], ['heightH', 'r', 0.5, 15, 0.1], ['frame', 'r', 0, 10, 0.5], ['contrast', 'r', 0.3, 3, 0.05], ['smooth', 'r', 0, 4, 1], ['invert', 'c']],
    sil: [['size', 'n', 10, 300, 1], ['det', 'd'], ['height', 'r', 0.4, 30, 0.2], ['thr', 'r', 5, 95, 1], ['smooth', 'r', 0, 4, 1], ['invert', 'c'], ['lug', 'c'], ['lugD', 'r', 4, 20, 0.5], ['holeD', 'r', 2, 10, 0.5]]
  };
  var st = { mode: 'litho', img: null, name: 'bild', mesh: null, grid: {}, timer: 0 };
  var out = $('i3Out'), status = $('i3Status'), prev = null;
  function msg(t, bad) { status.textContent = t || ''; status.className = 'cv-status' + (bad ? ' bad' : ''); }

  function buildModes() {
    var h = '';
    ['litho', 'relief', 'sil'].forEach(function (m) { h += '<button type="button" class="i3-mode' + (m === st.mode ? ' on' : '') + '" data-m="' + m + '" role="tab" aria-selected="' + (m === st.mode) + '">' + T.modes[m] + '</button>'; });
    $('i3Modes').innerHTML = h;
    Array.prototype.forEach.call($('i3Modes').children, function (b) { b.addEventListener('click', function () { st.mode = b.getAttribute('data-m'); buildModes(); buildParams(); recompute(); }); });
  }
  function buildParams() {
    var v = P[st.mode], h = '';
    $('i3Tip').textContent = T.tips[st.mode];
    SPEC[st.mode].forEach(function (s) {
      var k = s[0], lab = T.f[k] || T.f.detail;
      if (s[1] === 'd') h += '<label>' + T.f.detail + '<select data-k="det">' + T.det.map(function (n, i) { return '<option value="' + i + '"' + (v.det === i ? ' selected' : '') + '>' + n + ' (' + DET[i] + ' px)</option>'; }).join('') + '</select></label>';
      else if (s[1] === 'c') h += '<label class="i3-chk"><input type="checkbox" data-k="' + k + '"' + (v[k] ? ' checked' : '') + '> ' + lab + '</label>';
      else if (s[1] === 'n') h += '<label>' + lab + '<input type="number" data-k="' + k + '" min="' + s[2] + '" max="' + s[3] + '" step="' + s[4] + '" value="' + v[k] + '"></label>';
      else h += '<label>' + lab + ' <output>' + v[k] + '</output><input type="range" data-k="' + k + '" min="' + s[2] + '" max="' + s[3] + '" step="' + s[4] + '" value="' + v[k] + '"></label>';
    });
    $('i3Params').innerHTML = h;
    Array.prototype.forEach.call($('i3Params').querySelectorAll('[data-k]'), function (el) {
      el.addEventListener('input', function () {
        var k = el.getAttribute('data-k'), val = el.type === 'checkbox' ? (el.checked ? 1 : 0) : parseFloat(el.value);
        if (el.type === 'number' && !(val >= +el.min)) return;
        v[k] = val; var o = el.parentNode.querySelector('output'); if (o) o.textContent = val;
        recompute();
      });
    });
  }

  function gridFor(px) {
    if (st.grid[px]) return st.grid[px];
    var iw = st.img.naturalWidth || st.img.width || 300, ih = st.img.naturalHeight || st.img.height || 300, s = px / Math.max(iw, ih), w = Math.max(2, Math.round(iw * s)), h = Math.max(2, Math.round(ih * s));
    var cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    var cx = cv.getContext('2d', { willReadFrequently: true }); cx.imageSmoothingQuality = 'high'; cx.drawImage(st.img, 0, 0, w, h);
    return (st.grid[px] = { w: w, h: h, data: cx.getImageData(0, 0, w, h).data });
  }
  function recompute() {
    if (!st.img) return;
    clearTimeout(st.timer); msg(T.busy);
    st.timer = setTimeout(function () {
      try {
        var v = P[st.mode], p = { size: v.size, contrast: v.contrast, invert: !!v.invert, smooth: v.smooth };
        if (st.mode === 'litho') p.litho = { minT: v.minT, maxT: Math.max(v.maxT, v.minT + 0.2), frame: v.frame };
        if (st.mode === 'relief') p.relief = { baseT: v.baseT, heightH: v.heightH, frame: v.frame };
        if (st.mode === 'sil') { p.height = v.height; p.threshold = v.thr / 100; p.lug = !!v.lug; p.lugD = v.lugD; p.holeD = Math.min(v.holeD, v.lugD - 1); }
        var mesh = I3.build(st.mode, gridFor(DET[v.det]), p);
        if (!mesh.i.length) { st.mesh = null; out.hidden = true; msg(T.empty, true); return; }
        st.mesh = mesh; var s = C.stats(mesh);
        drawLight(p, v);
        $('i3Stats').textContent = s.tris.toLocaleString() + ' ' + T.tris + ' · ' + T.size + ': ' + s.size.map(function (x) { return x.toFixed(1); }).join(' × ');
        out.hidden = false; msg('');
        if (!prev) prev = window.MeshPreview.create($('i3Canvas'), { rx: -0.95, rz: 0.35 });
        if (prev.ok) prev.set(mesh); else msg(T.noWebgl);
      } catch (e) { msg(T.err, true); }
    }, 160);
  }

  function drawLight(p, v) {
    var cv = $('i3Light'), cap = $('i3LightCap'), on = st.mode === 'litho';
    cv.hidden = cap.hidden = !on; if (!on) return;
    var g = gridFor(DET[v.det]), hf = I3.heightField('litho', g, p), w = g.w + 2 * hf.fr, h = g.h + 2 * hf.fr, k = 0.8;
    cv.width = w; cv.height = h; cv.style.aspectRatio = w + '/' + h;
    var cx = cv.getContext('2d'), im = cx.createImageData(w, h), x, y, t, I, o;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      var ix = x - hf.fr, iy = y - hf.fr;
      t = ix >= 0 && iy >= 0 && ix < g.w && iy < g.h ? hf.hg[iy * g.w + ix] : hf.frameH;
      I = Math.exp(-k * (t - p.litho.minT)); o = 4 * (y * w + x);
      im.data[o] = 255 * I; im.data[o + 1] = 244 * I; im.data[o + 2] = 214 * I; im.data[o + 3] = 255;
    }
    cx.putImageData(im, 0, 0);
  }
  function save(fmt) {
    if (!st.mesh) return;
    var blob = C.write(fmt, st.mesh, st.name + '-' + st.mode), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = st.name + '-' + st.mode + '.' + fmt; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }
  $('i3DlStl').addEventListener('click', function () { save('stl'); });
  $('i3Dl3mf').addEventListener('click', function () { save('3mf'); });

  function setFile(f) {
    if (!f) return;
    var url = URL.createObjectURL(f), im = new Image();
    im.onload = function () {
      st.img = im; st.grid = {}; st.name = f.name.replace(/\.[^.]+$/, '').replace(/[^\w\-]+/g, '_') || 'bild';
      $('i3FileInfo').textContent = f.name; $('i3Work').hidden = false; recompute();
    };
    im.onerror = function () { msg(T.err, true); };
    im.src = url;
  }
  var drop = $('i3Drop'), file = $('i3File');
  drop.addEventListener('click', function () { file.click(); });
  drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } });
  file.addEventListener('change', function () { setFile(file.files[0]); });
  ['dragover', 'dragenter'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
  ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
  drop.addEventListener('drop', function (e) { if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); });
  buildModes(); buildParams();
})();
