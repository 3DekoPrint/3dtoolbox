(function () {
  'use strict';
  var DB = window.MaterialDB; if (!DB) return;
  var LANG = (document.documentElement.lang || 'de').slice(0, 2) === 'en' ? 'en' : 'de';
  var L = {
    de: { tabColors: 'Farben', tabMat: 'Materialien & Eigenschaften', all: 'Alle', search: 'Material suchen …',
      intro: 'Alle gängigen Filamentarten im Überblick: Verwendungszweck, Temperaturen, Hitzebeständigkeit (HDT), Zugfestigkeit, Dehnung/Härte sowie Vor- und Nachteile. Die Werte sind Richtwerte aus Herstellerdatenblättern – je nach Marke, Farbe und Druckeinstellung weichen sie ab.',
      diff: 'Schwierigkeit', nozzle: 'Düse °C', bed: 'Bett °C', hdt: 'Hitzebest. (HDT) °C', tensile: 'Zugfestigkeit MPa', elong: 'Dehnung', shore: 'Shore-Härte', dens: 'Dichte g/cm³', dry: 'Trocknen',
      uses: 'Verwendung', pro: 'Vorteile', con: 'Nachteile', encl: ['Kein Gehäuse nötig', 'Gehäuse optional', 'Geschlossener Bauraum nötig'], hard: 'Gehärtete Düse nötig',
      table: 'Vergleichstabelle anzeigen', tableHide: 'Vergleichstabelle ausblenden', none: 'Kein Material gefunden.', src: 'Quellen',
      diffLbl: ['sehr einfach', 'einfach', 'mittel', 'anspruchsvoll', 'nur für Profis'],
      note: '<b>Hinweise:</b> HDT = Wärmeformbeständigkeit (Temperatur, ab der sich ein belastetes Teil verformt). Zugfestigkeit = Kraft pro Fläche bis zum Bruch. Shore A/D = Härte von Elastomeren. Die Werte stammen aus verschiedenen Datenblättern unterschiedlicher Produkte und sind nicht direkt vergleichbar mit Normwerten; ein Feld bleibt leer, wenn wir keine belegte Angabe gefunden haben. Zu Biegeradius/Biegbarkeit nennen Hersteller meist keine Zahl – maßgeblich sind Dehnung und Shore-Härte (z. B. TPU 95A: über 500 % Dehnung). Gedruckte Teile sind in Z-Richtung (zwischen den Schichten) deutlich schwächer als in XY.',
      srcs: 'Quellen: <a href="https://wiki.polymaker.com/polymaker-products/polymaker-filaments/technical-data-at-a-glance" target="_blank" rel="noopener">Polymaker – Technical Data at a Glance</a> · <a href="https://cdn1.bambulab.com/filament/a5e185aed14e6/filament-guide-en-4.pdf" target="_blank" rel="noopener">Bambu Lab Filament Guide</a> · <a href="https://help.prusa3d.com/category/materials_220" target="_blank" rel="noopener">Prusa Knowledge Base – Materials</a> · <a href="https://cdn.shopify.com/s/files/1/0789/2979/files/PolyWood_TDS_V5.1.pdf" target="_blank" rel="noopener">PolyWood TDS</a> · <a href="https://cdn.shopify.com/s/files/1/0645/5876/0155/files/Bambu_TPU_95A_Technical_Data_Sheet.pdf" target="_blank" rel="noopener">Bambu TPU 95A TDS</a>' },
    en: { tabColors: 'Colours', tabMat: 'Materials & properties', all: 'All', search: 'Search material …',
      intro: 'All common filament types at a glance: use cases, temperatures, heat resistance (HDT), tensile strength, elongation/hardness, pros and cons. Values are guidelines from manufacturer datasheets – they vary by brand, colour and print settings.',
      diff: 'Difficulty', nozzle: 'Nozzle °C', bed: 'Bed °C', hdt: 'Heat resist. (HDT) °C', tensile: 'Tensile strength MPa', elong: 'Elongation', shore: 'Shore hardness', dens: 'Density g/cm³', dry: 'Drying',
      uses: 'Use cases', pro: 'Pros', con: 'Cons', encl: ['No enclosure needed', 'Enclosure optional', 'Enclosure required'], hard: 'Hardened nozzle required',
      table: 'Show comparison table', tableHide: 'Hide comparison table', none: 'No material found.', src: 'Sources',
      diffLbl: ['very easy', 'easy', 'medium', 'demanding', 'experts only'],
      note: '<b>Notes:</b> HDT = heat deflection temperature (where a loaded part starts to deform). Tensile strength = force per area until break. Shore A/D = hardness of elastomers. Values come from different datasheets of different products and are not directly comparable to standard values; a field is left empty when we found no documented figure. Manufacturers rarely give a bend radius – elongation and Shore hardness are what matter (e.g. TPU 95A: over 500% elongation). Printed parts are much weaker in Z (between layers) than in XY.',
      srcs: 'Sources: <a href="https://wiki.polymaker.com/polymaker-products/polymaker-filaments/technical-data-at-a-glance" target="_blank" rel="noopener">Polymaker – Technical Data at a Glance</a> · <a href="https://cdn1.bambulab.com/filament/a5e185aed14e6/filament-guide-en-4.pdf" target="_blank" rel="noopener">Bambu Lab Filament Guide</a> · <a href="https://help.prusa3d.com/category/materials_220" target="_blank" rel="noopener">Prusa Knowledge Base – Materials</a> · <a href="https://cdn.shopify.com/s/files/1/0789/2979/files/PolyWood_TDS_V5.1.pdf" target="_blank" rel="noopener">PolyWood TDS</a> · <a href="https://cdn.shopify.com/s/files/1/0645/5876/0155/files/Bambu_TPU_95A_Technical_Data_Sheet.pdf" target="_blank" rel="noopener">Bambu TPU 95A TDS</a>' }
  }[LANG];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  var colorPanel = document.querySelector('section.bt-panel');
  if (!colorPanel) return;

  var tabs = document.createElement('div');
  tabs.className = 'md-tabs'; tabs.setAttribute('role', 'tablist');
  tabs.innerHTML = '<button class="md-tab" role="tab" id="mdTabColors" aria-selected="true">' + L.tabColors + '</button>' +
                   '<button class="md-tab" role="tab" id="mdTabMat" aria-selected="false">' + L.tabMat + '</button>';
  colorPanel.parentNode.insertBefore(tabs, colorPanel);

  var panel = document.createElement('section');
  panel.className = 'bt-panel'; panel.id = 'mdPanel'; panel.style.display = 'none';
  panel.innerHTML = '<p class="md-intro">' + L.intro + '</p>' +
    '<div class="md-bar"><div class="fd-pills" id="mdPills"></div><input class="md-search" id="mdSearch" type="search" placeholder="' + esc(L.search) + '" aria-label="' + esc(L.search) + '"></div>' +
    '<div class="md-grid" id="mdGrid"></div><div class="fd-empty" id="mdEmpty" style="display:none">' + L.none + '</div>' +
    '<p><button class="fd-pill" id="mdTableBtn" type="button">' + L.table + '</button></p><div class="md-tablewrap" id="mdTableWrap" style="display:none"></div>' +
    '<p class="md-note">' + L.note + '</p><p class="md-note">' + L.srcs + '</p>';
  colorPanel.parentNode.insertBefore(panel, colorPanel.nextSibling);

  var grp = 'ALL', q = '';
  var pills = document.getElementById('mdPills');
  function drawPills() {
    var h = '<button type="button" class="fd-pill' + (grp === 'ALL' ? ' fd-pill-active' : '') + '" data-g="ALL">' + L.all + '</button>';
    Object.keys(DB.groups).forEach(function (g) { h += '<button type="button" class="fd-pill' + (grp === g ? ' fd-pill-active' : '') + '" data-g="' + g + '">' + esc(DB.groups[g][LANG]) + '</button>'; });
    pills.innerHTML = h;
  }
  pills.addEventListener('click', function (e) { var b = e.target.closest('button[data-g]'); if (!b) return; grp = b.dataset.g; drawPills(); render(); });
  document.getElementById('mdSearch').addEventListener('input', function (e) { q = e.target.value.trim().toLowerCase(); render(); });

  function dots(n) { var h = ''; for (var i = 1; i <= 5; i++) h += '<i class="' + (i <= n ? 'on' : '') + '"></i>'; return '<span class="md-dots" title="' + esc(L.diffLbl[n - 1]) + '">' + h + ' ' + esc(L.diffLbl[n - 1]) + '</span>'; }
  function spec(label, v) { v = v && v[LANG]; return v ? '<div><dt>' + label + '</dt><dd>' + esc(v) + '</dd></div>' : ''; }
  function list() {
    return DB.items.filter(function (m) {
      if (grp !== 'ALL' && m.grp !== grp) return false;
      if (!q) return true;
      return (m.name[LANG] + ' ' + m.id + ' ' + m.uses[LANG] + ' ' + m.pro[LANG] + ' ' + m.con[LANG]).toLowerCase().indexOf(q) !== -1;
    });
  }
  function render() {
    var items = list(), g = document.getElementById('mdGrid');
    document.getElementById('mdEmpty').style.display = items.length ? 'none' : 'block';
    g.innerHTML = items.map(function (m) {
      return '<article class="md-card" id="mat-' + esc(m.id) + '"><div class="md-grp">' + esc(DB.groups[m.grp][LANG]) + '</div><h3>' + esc(m.name[LANG]) + '</h3>' + dots(m.diff) +
        '<dl class="md-specs">' + spec(L.nozzle, m.nozzle) + spec(L.bed, m.bed) + spec(L.hdt, m.hdt) + spec(L.tensile, m.tensile) + spec(L.elong, m.elong) + spec(L.shore, m.shore) + spec(L.dens, m.dens) + spec(L.dry, m.dry) + '</dl>' +
        '<div><span class="md-badge">' + esc(L.encl[m.encl]) + '</span>' + (m.hard ? '<span class="md-badge warn">' + esc(L.hard) + '</span>' : '') + '</div>' +
        '<p><b>' + L.uses + ':</b> ' + esc(m.uses[LANG]) + '</p><p class="md-pro"><b>+ ' + L.pro + ':</b> ' + esc(m.pro[LANG]) + '</p><p class="md-con"><b>– ' + L.con + ':</b> ' + esc(m.con[LANG]) + '</p></article>';
    }).join('');
    var w = document.getElementById('mdTableWrap');
    w.innerHTML = '<table class="md-table"><thead><tr><th>Material</th><th>' + L.diff + '</th><th>' + L.nozzle + '</th><th>' + L.bed + '</th><th>' + L.hdt + '</th><th>' + L.tensile + '</th><th>' + L.elong + ' / Shore</th></tr></thead><tbody>' +
      items.map(function (m) { return '<tr><td><b>' + esc(m.name[LANG]) + '</b></td><td>' + m.diff + '/5</td><td>' + esc(m.nozzle[LANG]) + '</td><td>' + esc(m.bed[LANG]) + '</td><td>' + esc(m.hdt[LANG]) + '</td><td>' + esc(m.tensile[LANG]) + '</td><td>' + esc([m.elong[LANG], m.shore[LANG]].filter(Boolean).join(' / ')) + '</td></tr>'; }).join('') + '</tbody></table>';
  }
  document.getElementById('mdTableBtn').addEventListener('click', function () {
    var w = document.getElementById('mdTableWrap'), open = w.style.display === 'none';
    w.style.display = open ? 'block' : 'none'; this.textContent = open ? L.tableHide : L.table;
  });

  function show(which) {
    var mat = which === 'mat';
    colorPanel.style.display = mat ? 'none' : '';
    panel.style.display = mat ? '' : 'none';
    document.getElementById('mdTabColors').setAttribute('aria-selected', String(!mat));
    document.getElementById('mdTabMat').setAttribute('aria-selected', String(mat));
    try { history.replaceState(null, '', mat ? '#materialien' : location.pathname + location.search); } catch (e) {}
  }
  document.getElementById('mdTabColors').addEventListener('click', function () { show('colors'); });
  document.getElementById('mdTabMat').addEventListener('click', function () { show('mat'); });
  drawPills(); render();
  if (/^#(materialien|materials)/.test(location.hash)) show('mat');
  // Deep-Link auf einzelne Karte, z. B. #materialien-PETG
  var m = location.hash.match(/^#(?:materialien|materials)-(.+)$/);
  if (m) { var el = document.getElementById('mat-' + decodeURIComponent(m[1])); if (el) el.scrollIntoView(); }
})();
