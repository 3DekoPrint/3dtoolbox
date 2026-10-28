(function () {
  'use strict';
  var box = document.getElementById('mpFil');
  if (!box || !window.FilamentCatalog) return;
  var lang = (document.documentElement.lang || 'de').slice(0, 2);
  var inc = box.dataset.inc ? new RegExp(box.dataset.inc, 'i') : null;
  var exc = box.dataset.exc ? new RegExp(box.dataset.exc, 'i') : null;
  var list = window.FilamentCatalog.items(lang).filter(function (i) {
    return i.material === box.dataset.mat && (!inc || inc.test(i.name)) && (!exc || !exc.test(i.name));
  });
  var byBrand = {};
  list.forEach(function (i) { (byBrand[i.brand] = byBrand[i.brand] || []).push(i); });
  var brands = Object.keys(byBrand), out = [], k = 0;
  while (out.length < 12 && brands.length) {
    var any = false;
    brands.forEach(function (b) { var a = byBrand[b]; if (a[k] && out.length < 12) { out.push(a[k]); any = true; } });
    if (!any) break; k += 3; // jede Marke mit größerem Abstand → buntere Auswahl
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  var label = lang === 'en' ? 'Go to shop ↗' : 'Zum Shop ↗';
  box.innerHTML = out.map(function (i) {
    return '<div class="mp-fc"><span class="mp-sw" style="background:' + esc(i.hex) + '"></span><div><b>' + esc(i.name) + '</b><small>' + esc(i.brand) + '</small><br>' +
      '<a href="' + esc(i.url) + '" target="_blank" rel="sponsored nofollow noopener">' + label + '</a></div></div>';
  }).join('');
  if (!out.length) box.style.display = 'none';
})();
