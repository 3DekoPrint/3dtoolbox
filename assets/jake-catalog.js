/* 3DJake-Sortiment: Filter, Suche, seitenweise Anzeige. Daten: window.JAKE (assets/jake-products.js), Texte: window.JK */
(function () {
  'use strict';
  var T = window.JK, PAGE = 60, shown = PAGE, view = [];
  var $ = function (id) { return document.getElementById(id); };
  var selB = $('jkBrand'), selM = $('jkMat'), q = $('jkQ'), list = $('jkList'), cnt = $('jkCount'), more = $('jkMore');
  function init() {
    var J = window.JAKE; if (!J) { return setTimeout(init, 50); }
    function fill(sel, arr, lab) {
      var o = document.createElement('option'); o.value = ''; o.textContent = T.all; sel.appendChild(o);
      arr.forEach(function (n, i) { var p = document.createElement('option'); p.value = i; p.textContent = lab ? lab(n) : n; sel.appendChild(p); });
    }
    fill(selB, J.brands); fill(selM, J.mats, function (m) { return m === 'Sonstige' ? T.mat0 : m; });
    function apply() {
      var b = selB.value, m = selM.value, s = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      view = J.rows.filter(function (r) {
        if (b !== '' && r[0] != b) return false;
        if (m !== '' && r[2] != m) return false;
        if (s.length) { var h = (J.brands[r[0]] + ' ' + r[1]).toLowerCase(); for (var i = 0; i < s.length; i++) if (h.indexOf(s[i]) < 0) return false; }
        return true;
      });
      shown = PAGE; render();
    }
    function render() {
      list.textContent = '';
      var J2 = window.JAKE, frag = document.createDocumentFragment();
      view.slice(0, shown).forEach(function (r) {
        var li = document.createElement('li'), s = document.createElement('small'), n = document.createElement('b'), a = document.createElement('a');
        s.textContent = J2.brands[r[0]];
        n.textContent = r[1];
        var mt = document.createElement('span'); mt.className = 'jk-mt'; mt.textContent = J2.mats[r[2]] === 'Sonstige' ? T.mat0 : J2.mats[r[2]];
        a.href = 'https://www.awin1.com/pclick.php?p=' + encodeURIComponent(r[3]) + '&a=3021867&m=21761&clickref=3dtoolbox';
        a.target = '_blank'; a.rel = 'sponsored nofollow noopener noreferrer';
        a.textContent = T.ad + ' · ' + T.buy + ' ↗';
        li.appendChild(s); li.appendChild(n); li.appendChild(mt); li.appendChild(a); frag.appendChild(li);
      });
      list.appendChild(frag);
      cnt.textContent = view.length ? view.length + T.count : T.none;
      more.hidden = view.length <= shown;
    }
    selB.addEventListener('change', apply); selM.addEventListener('change', apply);
    var t; q.addEventListener('input', function () { clearTimeout(t); t = setTimeout(apply, 120); });
    more.addEventListener('click', function () { shown += PAGE; render(); });
    try {
      var qs = new URLSearchParams(location.search), pb = (qs.get('brand') || '').toLowerCase(), pm = (qs.get('mat') || '').toLowerCase().replace('+', '');
      if (pb) J.brands.forEach(function (n, i) { if (n.toLowerCase() === pb) selB.value = i; });
      if (pm) J.mats.forEach(function (n, i) { var l = n.toLowerCase(); if (l === pm || l.indexOf(pm) === 0 || pm.indexOf(l) === 0) { if (selM.value === '') selM.value = i; } });
      if (qs.get('q')) q.value = qs.get('q');
    } catch (e) {}
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
