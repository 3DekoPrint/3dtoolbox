/* 3DToolBox – gemeinsames Druck-Dock: Druckerliste, Material-/Zeitschätzung, Anfrage bei 3DekoPrint (per E-Mail).
   Alles läuft lokal im Browser; es werden keine Daten an einen Server gesendet. */
(function (root) {
  'use strict';
  /* ---- Einstellungen für Richtpreis und Kontakt (hier anpassen) ---- */
  var CFG = { mail: 'info@3dekoprint.de', minEur: 8, factor: 3, hourEur: 0.5, spoolEur: 20, watt: 200, kwhEur: 0.39, /* DHL Paket, Online-Frankierung, Stand DHL-Preisseite 01.11.2026: [bis kg, €]. Welt = Startpreis „ab“ (je nach Zone teurer). pack = Verpackung in g */
    shipTable: { de: [[2, 6.19], [5, 7.69], [10, 10.49], [20, 18.99], [31.5, 23.99]], eu: [[2, 14.49], [5, 17.49], [10, 22.49], [20, 28.49], [30, 45.49]], world: [[2, 19.49], [5, 26.99], [10, 34.99], [20, 48.99], [30, 62.99]] }, pack: 300, rate: 19.8 /* cm³/h (= 5,5 mm³/s, Mix aus Wand und Füllung) */ };

  /* ---- Druckerliste: [id, Name, Breite, Tiefe] in mm (nutzbarer Bauraum, ein Düsenbetrieb) ---- */
  var GROUPS = [
    ['Bambu Lab', [['a1mini', 'A1 mini', 180, 180], ['a1', 'A1', 256, 256], ['p1p', 'P1P', 256, 256], ['p1s', 'P1S', 256, 256], ['x1c', 'X1 Carbon', 256, 256], ['x1e', 'X1E', 256, 256], ['p2s', 'P2S', 256, 256], ['h2s', 'H2S', 340, 320], ['h2d', 'H2D', 325, 320], ['h2c', 'H2C', 305, 320]]],
    ['Prusa', [['prusamini', 'MINI+', 180, 180], ['mk3s', 'MK3S+', 250, 210], ['mk4', 'MK4 / MK4S', 250, 210], ['coreone', 'Core One', 250, 220], ['prusaxl', 'XL', 360, 360]]],
    ['Creality', [['ender3', 'Ender-3 / Ender-3 V2 / V3 SE', 220, 220], ['ender3v3p', 'Ender-3 V3 Plus', 300, 300], ['k1', 'K1 / K1C', 220, 220], ['k1max', 'K1 Max', 300, 300], ['k2plus', 'K2 Plus', 350, 350]]],
    ['Elegoo', [['centauri', 'Centauri Carbon', 256, 256], ['neptune4', 'Neptune 4 / 4 Pro', 225, 225], ['neptune4plus', 'Neptune 4 Plus', 320, 320], ['neptune4max', 'Neptune 4 Max', 420, 420]]],
    ['Anycubic', [['kobra2', 'Kobra 2 / Kobra Neo', 220, 220], ['kobra3', 'Kobra 3 / Kobra S1', 250, 250], ['kobra2max', 'Kobra 2 Max / Kobra 3 Max', 420, 420]]],
    ['Qidi', [['q1pro', 'Q1 Pro', 245, 245], ['plus4', 'Plus4', 305, 305]]],
    ['Sovol / Flashforge', [['sv06', 'Sovol SV06', 220, 220], ['sv08', 'Sovol SV08', 350, 350], ['ad5m', 'Flashforge Adventurer 5M / 5X', 220, 220]]],
    ['Voron (Eigenbau)', [['voron250', 'Voron 250', 250, 250], ['voron300', 'Voron 300', 300, 300], ['voron350', 'Voron 350', 350, 350]]]
  ];
  var ALIAS = { bambu256: 'x1c' };
  var MATS = [['pla', 'PLA', 1.24], ['petg', 'PETG', 1.27], ['abs', 'ABS / ASA', 1.05], ['tpu', 'TPU', 1.21]];

  function flat() { var o = []; GROUPS.forEach(function (g) { g[1].forEach(function (p) { o.push({ id: p[0], name: g[0] + ' ' + p[1], w: p[2], d: p[3] }); }); }); return o; }
  function printer(id) { id = ALIAS[id] || id; return flat().filter(function (p) { return p.id === id; })[0] || null; }
  function bedOptions(ownLabel) {
    return GROUPS.map(function (g) { return '<optgroup label="' + g[0] + '">' + g[1].map(function (p) { return '<option value="' + p[0] + '">' + esc(g[0] === 'Voron (Eigenbau)' || g[0] === 'Sovol / Flashforge' ? p[1] : g[0] + ' ' + p[1]) + ' (' + p[2] + ' × ' + p[3] + ')</option>'; }).join('') + '</optgroup>'; }).join('') + '<option value="custom">' + esc(ownLabel) + '</option>';
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mat(id) { return MATS.filter(function (m) { return m[0] === id; })[0] || MATS[0]; }

  /* ---- Schätzung: vol in mm³, area in mm² ---- */
  function estimate(st, matId, pricePerKg, parts) {
    var shell = st.area * 1.2, m = Math.min(st.vol, shell + Math.max(0, st.vol - shell) * 0.15) / 1000; // cm³
    var g = m * mat(matId)[2], eur = g / 1000 * pricePerKg, hours = m / CFG.rate + (parts || 1) * 0.05;
    return { g: g, eur: eur, hours: hours, cm3: st.vol / 1000 };
  }
  function power(est) { return est.hours * CFG.watt / 1000 * CFG.kwhEur; }
  function single(est) { return Math.max(CFG.minEur, (est.eur + power(est)) * CFG.factor + est.hours * CFG.hourEur); }
  function quote(est, qty) {
    var one = single(est), total = one * qty; if (qty > 1) total = one + (qty - 1) * Math.max(CFG.minEur * 0.6, one * 0.85);
    return Math.ceil(total);
  }
  /* Versand: {eur, kg} oder null (zu schwer/groß → Angebot). Pakete bis 2 kg nur, wenn das Teil in 60 × 30 × 15 cm passt. */
  function shipFor(zone, grams, qty, sizeStr) {
    var tab = CFG.shipTable[zone]; if (!tab) return null;
    var kg = (grams * qty + CFG.pack) / 1000, dims = (String(sizeStr || '').replace(/\(.*?\)/g, '').match(/[\d.]+/g) || []).map(Number).sort(function (a, b) { return b - a; });
    var small = dims.length >= 3 ? dims[0] <= 550 && dims[1] <= 250 && dims[2] <= 100 : kg <= 2;
    if (dims.length >= 3 && dims[0] > 1100) return null;
    for (var i = 0; i < tab.length; i++) if (kg <= tab[i][0] && (i > 0 || small)) return { eur: tab[i][1], kg: tab[i][0] };
    return null;
  }
  function fmtT(h, L) { var m = Math.max(1, Math.round(h * 60)); return m < 60 ? m + ' ' + L.mn : Math.floor(m / 60) + ' ' + L.h + ' ' + (m % 60 ? (m % 60) + ' ' + L.mn : '').trim(); }

  var T = {
    de: { btn: 'Von 3DekoPrint drucken lassen', title: 'Von 3DekoPrint drucken lassen', intro: 'Kein Drucker? Ich drucke dir das Teil. Du schickst eine unverbindliche Anfrage per E-Mail, ich melde mich mit einem verbindlichen Angebot.',
      qty: 'Menge', mat: 'Material', color: 'Wunschfarbe', colorPh: 'z. B. Schwarz, Waldgrün …', note: 'Nachricht (optional)', noteSh: 'Besondere Wünsche, Lieferort, Termin …', ind: 'Richtpreis',
      indNote: 'Unverbindlicher Richtpreis aus Material und Druckzeit, zzgl. Versand. Den verbindlichen Preis nenne ich dir nach Prüfung des Modells im Angebot.',
      send: 'Anfrage per E-Mail vorbereiten', copy: 'Text kopieren', copied: 'Text kopiert', priv: 'Es öffnet sich dein E-Mail-Programm mit einer fertigen Nachricht. Erst wenn du sie absendest, erreicht sie mich; vorher werden keine Daten übertragen.',
      mailFail: 'Falls sich nichts öffnet: Text kopieren und an', subj: 'Druckanfrage', hello: 'Hallo 3DekoPrint,', want: 'ich möchte folgendes Teil drucken lassen:', tool: 'Werkzeug', size: 'Größe', weight: 'Gewicht (geschätzt)', time: 'Druckzeit (geschätzt)',
      link: 'Konfiguration', ind2: 'Richtpreis laut Rechner', bye: 'Bitte schick mir ein Angebot. Danke!', h: 'Std.', mn: 'Min.', bed: 'Drucker', priceKg: 'Preis pro kg (€)', own: 'eigene Größe (B × T mm)', est: 'Grobe Schätzung bei 3 Wänden und 15 % Füllung.',
      fits: 'passt aufs Druckbett', nofit: 'ist größer als das Druckbett', fp: 'Platzbedarf', none: 'Noch kein Modell berechnet.', w: 'Gewicht', cost: 'Material', t: 'Druckzeit', parts: 'Teile', deliv: 'Lieferung', pick: 'Abholung', shipDe: 'Versand per DHL (Deutschland)', shipEu: 'Versand per DHL (EU)', shipWorld: 'Versand per DHL (Ausland außerhalb EU)', country: 'Land / PLZ', countryPh: 'z. B. Österreich, 1010', shipNote: 'Versandkosten kommen dazu', shipNote2: 'zzgl. Versand', shipLine: function (m, kg, w) { return 'Versand: ' + m + ' (DHL Paket bis ' + kg + ' kg, mit Sendungsverfolgung' + (w ? '; je nach Land teurer' : '') + ')'; }, shipOffer: 'Versandkosten nenne ich dir im Angebot (nach Ziel und Paketgröße)', pickNote: 'Abholung ohne Versandkosten',
      calc: 'So setzt sich der Richtpreis zusammen', calcLine: function (m, pw, f, t, th, min) { return '(Material ' + m + ' + Strom ' + pw + ') × ' + f + ' + Druckzeit ' + t + ' × ' + th + ' (Mindestpreis ' + min + ')'; }, calcQty: 'Weitere Stücke zählen mit ca. 85 % des Einzelpreises.',
      hint: 'Wähle deinen Drucker für den Passcheck und die Materialschätzung.' },
    en: { btn: 'Have 3DekoPrint print it', title: 'Have 3DekoPrint print it', intro: 'No printer? I will print the part for you. Send a non-binding request by e-mail and I will reply with a binding quote.',
      qty: 'Quantity', mat: 'Material', color: 'Colour', colorPh: 'e.g. black, forest green …', note: 'Message (optional)', noteSh: 'Special wishes, delivery country, deadline …', ind: 'Indicative price',
      indNote: 'Non-binding estimate from material and print time, plus shipping. I will give you the binding price in my quote after checking the model.',
      send: 'Prepare request by e-mail', copy: 'Copy text', copied: 'Text copied', priv: 'Your e-mail app opens with a ready message. It only reaches me when you send it; nothing is transferred before that.',
      mailFail: 'If nothing opens: copy the text and send it to', subj: 'Print request', hello: 'Hello 3DekoPrint,', want: 'I would like to have the following part printed:', tool: 'Tool', size: 'Size', weight: 'Weight (estimated)', time: 'Print time (estimated)',
      link: 'Configuration', ind2: 'Indicative price from the calculator', bye: 'Please send me a quote. Thanks!', h: 'h', mn: 'min', bed: 'Printer', priceKg: 'Price per kg (€)', own: 'custom size (W × D mm)', est: 'Rough estimate at 3 walls and 15 % infill.',
      fits: 'fits on the print bed', nofit: 'is larger than the print bed', fp: 'Footprint', none: 'No model calculated yet.', w: 'Weight', cost: 'Material', t: 'Print time', parts: 'parts', deliv: 'Delivery', pick: 'Pick-up', shipDe: 'Shipping by DHL (Germany)', shipEu: 'Shipping by DHL (EU)', shipWorld: 'Shipping by DHL (outside the EU)', country: 'Country / postcode', countryPh: 'e.g. Austria, 1010', shipNote: 'plus shipping', shipNote2: 'plus shipping', shipLine: function (m, kg, w) { return 'Shipping: ' + m + ' (DHL parcel up to ' + kg + ' kg, tracked' + (w ? '; more expensive depending on the country' : '') + ')'; }, shipOffer: 'I will name the shipping cost in my quote (by destination and parcel size)', pickNote: 'Pick-up, no shipping cost',
      calc: 'How the indicative price is made up', calcLine: function (m, pw, f, t, th, min) { return '(material ' + m + ' + electricity ' + pw + ') × ' + f + ' + print time ' + t + ' × ' + th + ' (minimum ' + min + ')'; }, calcQty: 'Additional pieces count at about 85 % of the single price.',
      hint: 'Pick your printer for the fit check and material estimate.' }
  };

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function money(v, lang) { return v.toFixed(2).replace('.', lang === 'de' ? ',' : '.') + ' €'; }

  /* ---- Anfrage-Panel. info(): {tool, size:'a × b × c mm', est:{g,eur,hours}, link, details} oder null ---- */
  function orderPanel(lang, info, opt) {
    var L = T[lang] || T.de, box = el('section', 'pd-order'), id = 'pd' + Math.random().toString(36).slice(2, 7);
    box.hidden = true; box.setAttribute('aria-label', L.title);
    box.innerHTML = '<h3>' + esc(L.title) + '</h3><p class="pd-intro">' + esc(L.intro) + '</p>' +
      '<div class="pd-grid"><label>' + esc(L.qty) + '<input type="number" min="1" max="99" value="1" id="' + id + 'q"></label>' +
      '<label>' + esc(L.mat) + '<select id="' + id + 'm">' + MATS.map(function (m) { return '<option value="' + m[0] + '">' + m[1] + '</option>'; }).join('') + '</select></label>' +
      '<label>' + esc(L.color) + '<input type="text" maxlength="60" placeholder="' + esc(L.colorPh) + '" id="' + id + 'c"></label></div>' +
      '<div class="pd-grid pd-deliv"><label>' + esc(L.deliv) + '<select id="' + id + 'd"><option value="pick">' + esc(L.pick) + '</option><option value="de">' + esc(L.shipDe) + '</option><option value="eu">' + esc(L.shipEu) + '</option><option value="world">' + esc(L.shipWorld) + '</option></select></label>' +
      '<label id="' + id + 'cl" hidden>' + esc(L.country) + '<input type="text" maxlength="60" placeholder="' + esc(L.countryPh) + '" id="' + id + 'o"></label></div>' +
      '<label class="pd-wide">' + esc(L.note) + '<textarea rows="3" maxlength="600" placeholder="' + esc(L.noteSh) + '" id="' + id + 'n"></textarea></label>' +
      '<div class="pd-price"><span>' + esc(L.ind) + '</span><b id="' + id + 'p">–</b></div><p class="pd-small" id="' + id + 'sh"></p><p class="pd-small" id="' + id + 'b"></p><p class="pd-small">' + esc(L.indNote) + '</p>' +
      '<div class="pd-acts"><a class="pd-btn pd-main" id="' + id + 's" role="button">' + esc(L.send) + '</a><button type="button" class="pd-btn" id="' + id + 'k">' + esc(L.copy) + '</button></div>' +
      '<p class="pd-small">' + esc(L.priv) + ' ' + esc(L.mailFail) + ' ' + CFG.mail + '.</p><p class="pd-small pd-msg" id="' + id + 'x" role="status"></p>';
    var q = box.querySelector('#' + id + 'q'), m = box.querySelector('#' + id + 'm'), c = box.querySelector('#' + id + 'c'), n = box.querySelector('#' + id + 'n'), p = box.querySelector('#' + id + 'p'), s = box.querySelector('#' + id + 's'), k = box.querySelector('#' + id + 'k'), x = box.querySelector('#' + id + 'x'), dl = box.querySelector('#' + id + 'd'), co = box.querySelector('#' + id + 'o'), cl = box.querySelector('#' + id + 'cl'), sh = box.querySelector('#' + id + 'sh'), bk = box.querySelector('#' + id + 'b');
    dl.addEventListener('change', function () { refresh(); }); var userMat = false; m.addEventListener('change', function () { userMat = true; refresh(); });
    function qty() { return Math.max(1, Math.min(99, parseInt(q.value, 10) || 1)); }
    function data() {
      var i = info(); if (!i || !i.stats) return null;
      var e = estimate(i.stats, m.value, CFG.spoolEur, i.parts); return { i: i, e: e, price: quote(e, qty()) };
    }
    function text() {
      var d = data(); if (!d) return '';
      var i = d.i, e = d.e, ls = [L.hello, '', L.want, '', '• ' + L.tool + ': ' + i.tool, '• ' + L.size + ': ' + i.size, '• ' + L.qty + ': ' + qty(), '• ' + L.mat + ': ' + mat(m.value)[1] + (c.value.trim() ? ', ' + c.value.trim() : ''),
        '• ' + L.weight + ': ' + Math.round(e.g) + ' g', '• ' + L.time + ': ' + fmtT(e.hours, L)];
      var sp2 = dl.value === 'pick' ? null : shipFor(dl.value, e.g, qty(), i.size);
      var dtxt = dl.options[dl.selectedIndex].text; if (dl.value !== 'pick' && co.value.trim()) dtxt += ', ' + co.value.trim(); ls.push('• ' + L.deliv + ': ' + dtxt);
      if (i.details) ls.push('• ' + i.details);
      if (i.link) ls.push('• ' + L.link + ': ' + i.link);
      ls.push('• ' + L.ind2 + ': ' + d.price + ' €' + (dl.value !== 'pick' ? ' (' + (sp2 ? L.shipNote2 + ' ' + (dl.value === 'world' ? (lang === 'en' ? 'from ' : 'ab ') : '') + money(sp2.eur, lang) : L.shipNote) + ')' : ''));
      if (n.value.trim()) ls.push('', n.value.trim());
      ls.push('', L.bye); return ls.join('\n');
    }
    function refresh() {
      var d = data(); if (!d) { p.textContent = L.none; s.removeAttribute('href'); s.setAttribute('aria-disabled', 'true'); return; }
      var sp = dl.value === 'pick' ? null : shipFor(dl.value, d.e.g, qty(), d.i.size), shipCost = sp ? sp.eur : null; cl.hidden = dl.value === 'pick';
      var from = dl.value === 'world' ? (lang === 'en' ? 'from ' : 'ab ') : '';
      p.textContent = dl.value === 'pick' ? '≈ ' + d.price + ' €' : shipCost == null ? '≈ ' + d.price + ' € + ' + (lang === 'en' ? 'shipping' : 'Versand') : '≈ ' + (d.price + Math.ceil(shipCost)) + ' € ' + (lang === 'en' ? 'incl. shipping' : 'inkl. Versand');
      sh.textContent = dl.value === 'pick' ? L.pickNote : (shipCost == null ? L.shipOffer : L.shipLine(from + money(shipCost, lang), sp.kg, lang === 'de' ? CFG.shipTable[dl.value] === CFG.shipTable.world : CFG.shipTable[dl.value] === CFG.shipTable.world));
      var one = single(d.e), pw = power(d.e), fm = function (v) { return String(v).replace('.', lang === 'de' ? ',' : '.'); };
      bk.textContent = L.calc + ': ' + L.calcLine(money(d.e.eur, lang), money(pw, lang), String(CFG.factor), fmtT(d.e.hours, L), fm(CFG.hourEur) + ' €/' + (lang === 'en' ? 'h' : 'Std.'), CFG.minEur + ' €') + ' = ' + Math.ceil(one) + ' €. ' + (qty() > 1 ? L.calcQty : '');
      s.removeAttribute('aria-disabled');
      s.href = 'mailto:' + CFG.mail + '?subject=' + encodeURIComponent(L.subj + ': ' + d.i.tool) + '&body=' + encodeURIComponent(text());
    }
    [q, c, n, co].forEach(function (f) { f.addEventListener('input', refresh); });
    s.addEventListener('click', function (ev) { if (s.getAttribute('aria-disabled')) ev.preventDefault(); else refresh(); });
    k.addEventListener('click', function () {
      var t = text(); if (!t) return;
      var done = function () { x.textContent = L.copied; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { x.textContent = t; }); else x.textContent = t;
    });
    return { el: box, refresh: function () { if (!userMat && info() && info().mat) m.value = info().mat; refresh(); }, toggle: function (open) { box.hidden = open === undefined ? !box.hidden : !open; if (!box.hidden) this.refresh(); return !box.hidden; } };
  }

  /* ---- Dock für Werkzeuge ohne GenKit: Drucker, Material, Schätzung, Passcheck, Anfrage ---- */
  function mount(host, o) {
    var lang = o.lang || (document.documentElement.lang === 'en' ? 'en' : 'de'), L = T[lang], env = { bed: 'x1c', bw: 220, bd: 220, mat: 'pla', price: 20 };
    try { var sv = JSON.parse(localStorage.getItem('tb_gk_env') || '{}'); Object.keys(sv).forEach(function (k) { if (k in env) env[k] = sv[k]; }); } catch (e) { /* Speicher gesperrt */ }
    if (env.bed !== 'custom' && !printer(env.bed)) env.bed = 'x1c';
    var box = el('div', 'pd-dock'); box.setAttribute('role', 'group'); box.setAttribute('aria-label', L.bed);
    box.innerHTML = '<div class="pd-est" aria-live="polite"></div><div class="pd-fit"></div><div class="pd-env"><label>' + esc(L.bed) + '<select class="pd-bed">' + bedOptions(L.own) + '</select></label>' +
      '<label class="pd-bwl">W<input type="number" min="50" max="2000" class="pd-bw" aria-label="' + esc(L.bed) + ' ' + (lang === 'en' ? 'width' : 'Breite') + ' (mm)"></label><label class="pd-bwl">D<input type="number" min="50" max="2000" class="pd-bd" aria-label="' + esc(L.bed) + ' ' + (lang === 'en' ? 'depth' : 'Tiefe') + ' (mm)"></label>' +
      '<label>' + esc(L.mat) + '<select class="pd-mat">' + MATS.map(function (m) { return '<option value="' + m[0] + '">' + m[1] + '</option>'; }).join('') + '</select></label>' +
      '<label>' + esc(L.priceKg) + '<input type="number" min="1" max="500" step="1" class="pd-price-in"></label></div><div class="pd-acts"><button type="button" class="pd-btn pd-main pd-open" aria-expanded="false">' + esc(L.btn) + '</button></div>';
    var order = orderPanel(lang, function () {
      var s = o.stats(); if (!s) return null;
      return { tool: o.tool, stats: s, parts: s.parts || 1, size: s.size, details: o.describe ? o.describe() : '', link: o.link ? o.link() : '', mat: env.mat };
    });
    host.classList.add('pd-host'); host.appendChild(box); host.appendChild(order.el);
    var $ = function (c) { return box.querySelector(c); }, bed = $('.pd-bed'), bw = $('.pd-bw'), bd = $('.pd-bd'), mt = $('.pd-mat'), pr = $('.pd-price-in'), open = $('.pd-open');
    bed.value = env.bed; mt.value = env.mat; pr.value = env.price; bw.value = env.bw; bd.value = env.bd;
    function save() { try { var cur = JSON.parse(localStorage.getItem('tb_gk_env') || '{}'); Object.keys(env).forEach(function (k) { cur[k] = env[k]; }); localStorage.setItem('tb_gk_env', JSON.stringify(cur)); } catch (e) { /* ignorieren */ } }
    function read() {
      env.bed = bed.value; env.mat = mt.value; env.price = Math.max(1, parseFloat(pr.value) || 20);
      if (env.bed === 'custom') { env.bw = Math.max(50, parseFloat(bw.value) || 220); env.bd = Math.max(50, parseFloat(bd.value) || 220); } else { var p = printer(env.bed); env.bw = p.w; env.bd = p.d; bw.value = env.bw; bd.value = env.bd; }
      bw.parentNode.style.display = bd.parentNode.style.display = env.bed === 'custom' ? '' : 'none'; save(); update();
    }
    function update() {
      var s = o.stats(), est = $('.pd-est'), fit = $('.pd-fit');
      if (!s) { est.innerHTML = '<span class="pd-hint">' + esc(L.hint) + '</span>'; fit.innerHTML = ''; open.disabled = true; if (!order.el.hidden) order.refresh(); return; }
      open.disabled = false; var e = estimate(s, env.mat, env.price, s.parts);
      est.innerHTML = '<div class="pd-m"><b>' + Math.round(e.g) + ' g</b><span>' + L.w + '</span></div><div class="pd-m"><b>' + money(e.eur, lang) + '</b><span>' + L.cost + '</span></div><div class="pd-m"><b>≈ ' + fmtT(e.hours, L) + '</b><span>' + L.t + '</span></div><div class="pd-m pd-s"><b>' + e.cm3.toFixed(1) + ' cm³</b><span>Vol.</span></div>';
      var ok = (s.w <= env.bw && s.d <= env.bd) || (s.w <= env.bd && s.d <= env.bw);
      fit.className = 'pd-fit ' + (ok ? 'ok' : 'bad'); fit.innerHTML = '<i></i><span>' + L.fp + ' ' + s.w.toFixed(0) + ' × ' + s.d.toFixed(0) + ' mm · ' + (ok ? L.fits : L.nofit) + '</span>';
      if (!order.el.hidden) order.refresh();
    }
    [bed, mt].forEach(function (f) { f.addEventListener('change', read); }); [bw, bd, pr].forEach(function (f) { f.addEventListener('input', read); });
    open.addEventListener('click', function () { var on = order.toggle(); open.setAttribute('aria-expanded', on ? 'true' : 'false'); if (on) order.el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
    read();
    return { update: update };
  }

  /* Statistik aus THREE-Meshes (Gruppe oder Liste) → {vol, area, w, d, size, parts} */
  function statsFromMeshes(meshes) {
    var vol = 0, area = 0, mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9], n = 0;
    meshes.forEach(function (m) {
      var g = m.geometry; if (!g || !g.attributes || !g.attributes.position) return;
      m.updateMatrixWorld(true); var pos = g.attributes.position, idx = g.index, mw = m.matrixWorld.elements, cnt = idx ? idx.count : pos.count; n++;
      function V(i, o) { var x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i); o[0] = mw[0] * x + mw[4] * y + mw[8] * z + mw[12]; o[1] = mw[1] * x + mw[5] * y + mw[9] * z + mw[13]; o[2] = mw[2] * x + mw[6] * y + mw[10] * z + mw[14]; for (var k = 0; k < 3; k++) { if (o[k] < mn[k]) mn[k] = o[k]; if (o[k] > mx[k]) mx[k] = o[k]; } }
      var a = [0, 0, 0], b = [0, 0, 0], c = [0, 0, 0];
      for (var t = 0; t + 2 < cnt; t += 3) {
        var i0 = idx ? idx.getX(t) : t, i1 = idx ? idx.getX(t + 1) : t + 1, i2 = idx ? idx.getX(t + 2) : t + 2; V(i0, a); V(i1, b); V(i2, c);
        vol += (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6;
        var ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
        var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx; area += 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz);
      }
    });
    if (!n) return null;
    var s = [mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]];
    return { vol: Math.abs(vol), area: area, w: s[0], d: s[1], size: s.map(function (v) { return v.toFixed(1); }).join(' × ') + ' mm', parts: n };
  }

  /* Statistik aus {v: Float32/64Array, i: Index-Array} (Konverter-Netz); list = ein Netz oder mehrere */
  function statsFromIndexed(list) {
    list = Array.isArray(list) ? list : [list]; var vol = 0, area = 0, mn = [1e12, 1e12, 1e12], mx = [-1e12, -1e12, -1e12], any = false;
    list.forEach(function (m) {
      if (!m || !m.i || !m.i.length) return; any = true; var V = m.v, I = m.i, k, j;
      for (k = 0; k < V.length; k += 3) for (j = 0; j < 3; j++) { if (V[k + j] < mn[j]) mn[j] = V[k + j]; if (V[k + j] > mx[j]) mx[j] = V[k + j]; }
      for (k = 0; k < I.length; k += 3) {
        var a = 3 * I[k], b = 3 * I[k + 1], c = 3 * I[k + 2], ax = V[a], ay = V[a + 1], az = V[a + 2], bx = V[b], by = V[b + 1], bz = V[b + 2], cx = V[c], cy = V[c + 1], cz = V[c + 2];
        vol += (ax * (by * cz - bz * cy) - ay * (bx * cz - bz * cx) + az * (bx * cy - by * cx)) / 6;
        var ux = bx - ax, uy = by - ay, uz = bz - az, vx = cx - ax, vy = cy - ay, vz = cz - az, qx = uy * vz - uz * vy, qy = uz * vx - ux * vz, qz = ux * vy - uy * vx; area += 0.5 * Math.sqrt(qx * qx + qy * qy + qz * qz);
      }
    });
    if (!any) return null; var s = [mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]];
    return { vol: Math.abs(vol), area: area, w: s[0], d: s[1], size: s.map(function (v) { return v.toFixed(1); }).join(' × ') + ' mm', parts: list.length };
  }
  /* THREE-Gruppe: sichtbare Meshes zählen; Änderungen der Kinder per Abfrage erkennen */
  function statsFromGroup(g) { var ms = []; g.traverse(function (o) { if (o.isMesh && o.visible) ms.push(o); }); return statsFromMeshes(ms); }
  function watchGroup(g, cb) {
    var last = ''; setInterval(function () { var sig = ''; g.traverse(function (o) { if (o.isMesh) sig += o.uuid + (o.visible ? '1' : '0'); }); if (sig !== last) { last = sig; cb(); } }, 500);
  }
  /* Eingaben der Seite als Text ("Name: Wert; …") für die Anfrage */
  function labelText(f) {
    var l = f.labels && f.labels[0]; if (!l) return ''; var c = l.cloneNode(true);
    [].forEach.call(c.querySelectorAll('select,input,output,textarea,option'), function (n) { n.remove(); }); return c.textContent;
  }
  function describeForm(scope, max) {
    var out = [], seen = {};
    [].forEach.call(scope.querySelectorAll('input,select,textarea'), function (f) {
      if (f.closest('.pd-dock,.pd-order') || f.type === 'file' || f.type === 'hidden' || f.type === 'button' || f.type === 'range') return;
      var v;
      if (f.type === 'checkbox') { if (!f.checked) return; v = document.documentElement.lang === 'en' ? 'yes' : 'ja'; } else if (f.type === 'radio') { if (!f.checked) return; v = f.value; } else if (f.tagName === 'SELECT') { v = f.options[f.selectedIndex] ? f.options[f.selectedIndex].text : ''; } else v = f.value;
      v = String(v || '').trim(); if (!v) return;
      var lab = f.getAttribute('aria-label') || labelText(f) || f.name || f.id; lab = String(lab).replace(/\s+/g, ' ').trim().slice(0, 40); if (!lab) return;
      var key = lab + '=' + v; if (seen[key]) return; seen[key] = 1; out.push(lab + ': ' + v.slice(0, 80));
    });
    var t = out.join('; '); return t.length > (max || 800) ? t.slice(0, (max || 800) - 1) + '…' : t;
  }
  root.PrintDock = { describeForm: describeForm, statsFromIndexed: statsFromIndexed, statsFromGroup: statsFromGroup, watchGroup: watchGroup, CFG: CFG, GROUPS: GROUPS, MATS: MATS, printer: printer, flat: flat, bedOptions: bedOptions, estimate: estimate, quote: quote, orderPanel: orderPanel, mount: mount, statsFromMeshes: statsFromMeshes, fmtT: fmtT, T: T };
})(typeof window !== 'undefined' ? window : this);
