/* 3DToolBox – kleine Oberflächen-Helfer: Menüs, Darstellung hell/dunkel. Alles funktioniert auch ohne diese Datei (Menüs sind <details>). */
(function () {
  'use strict';
  var root = document.documentElement;
  function eff() { var t = root.getAttribute('data-theme'); if (t) return t; return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  function closeAll(except) { var d = document.querySelectorAll('.tb-menu details[open]'); for (var i = 0; i < d.length; i++) if (d[i] !== except) d[i].removeAttribute('open'); }
  document.addEventListener('DOMContentLoaded', function () {
    var det = document.querySelectorAll('.tb-menu details');
    for (var i = 0; i < det.length; i++) (function (d) { d.addEventListener('toggle', function () { if (d.open) closeAll(d); }); })(det[i]);
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.tb-menu')) closeAll(null);
      var a = e.target.closest ? e.target.closest('.tb-dd a') : null;
      if (a) { var c = document.getElementById('tbm'); if (c) c.checked = false; closeAll(null); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(null); var c = document.getElementById('tbm'); if (c) c.checked = false; } });
    var b = document.querySelector('.tb-theme');
    if (b) b.addEventListener('click', function () {
      var n = eff() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', n);
      try { localStorage.setItem('tb_theme', n); } catch (e) {}
    });
  });
})();

/* Barrierefreiheit: <label>Text <output>…</output><input type="range"></label> -
   das <output> ist selbst beschriftbar und "frisst" das Label, der Regler bliebe ohne Namen. */
(function () {
  function fix(root) {
    (root || document).querySelectorAll('label > output').forEach(function (o) {
      var l = o.parentNode, i = l.querySelector('input,select,textarea');
      if (!i || i.getAttribute('aria-label') || i.getAttribute('aria-labelledby')) return;
      var t = (l.textContent || '').replace(o.textContent, '').replace(/\s+/g, ' ').trim();
      if (t) i.setAttribute('aria-label', t);
    });
  }
  var timer;
  function later() { clearTimeout(timer); timer = setTimeout(fix, 120); }
  function start() { fix(); if (window.MutationObserver) new MutationObserver(later).observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
