/* 3DToolBox — Empfehlungs-Links pro Influencer (?ref=name), ohne Cookies.
   1. Liest ?ref=name und merkt es sich nur für diese Browser-Sitzung (sessionStorage).
   2. Links mit data-partner="meshy" bekommen den Code des Influencers (sonst deinen eigenen).
   3. Awin- und Impact-Links bekommen die Kennung als Sub-ID, damit das Netzwerk Verkäufe pro Influencer zeigt.
   4. Seitenaufrufe und Klicks auf Partner-Links werden – nur wenn ein GoatCounter-Code eingetragen ist – anonym und ohne Cookies gezählt.
   Konfiguration: assets/ref-config.js */
(function () {
  'use strict';
  var C = window.TB_REF_CONFIG || {};
  var KEY = 'tb_ref', ref = '';
  function clean(s) { s = String(s || '').toLowerCase(); return /^[a-z0-9_-]{1,32}$/.test(s) ? s : ''; }
  try {
    var q = new URLSearchParams(location.search).get('ref');
    ref = clean(q);
    if (ref) sessionStorage.setItem(KEY, ref); else ref = clean(sessionStorage.getItem(KEY));
  } catch (e) { /* Speicher gesperrt – dann gilt nur ein ref aus der aktuellen URL */ }

  function codeFor(partner) {
    var p = (C.partners || {})[partner];
    if (!p || !p.url) return null;
    /* Nur Partner mit shared:true dürfen Influencer-Codes bekommen; alle anderen Links gehören immer dir. */
    var inf = ref && p.shared === true && (C.influencers || {})[ref];
    var code = (inf && inf[partner]) || p.own || '';
    return code ? p.url.replace('{code}', encodeURIComponent(code)) : null;
  }
  function setParam(href, name, val) {
    try {
      var u = new URL(href, location.href);
      if (u.searchParams.has(name)) return href;
      u.searchParams.set(name, val);
      return u.toString();
    } catch (e) { return href; }
  }
  function decorate(a) {
    var partner = a.getAttribute('data-partner');
    if (partner) { var h = codeFor(partner); if (h) a.href = h; }
    if (!ref) return;
    var host = (a.hostname || '').toLowerCase();
    if (host.indexOf('awin1.com') > -1) a.href = setParam(a.href, 'clickref', ref);
    else if (host.indexOf('sjv.io') > -1 || host.indexOf('impact.com') > -1) a.href = setParam(a.href, 'subId1', ref);
  }
  function isPartner(a) {
    var h = (a.hostname || '').toLowerCase();
    return a.hasAttribute('data-partner') || h.indexOf('awin1.com') > -1 || h.indexOf('sjv.io') > -1 || /sca_ref=/.test(a.search || '');
  }
  /* GoatCounter: zählt Seitenaufrufe (mit Quelle aus ?ref=) und Klicks auf Partner-Links – ohne Cookies. */
  var gc = /^[a-z0-9-]{1,40}$/.test(C.goatcounter || '') ? C.goatcounter : '';
  var gcQueue = [];
  function count(name) {
    if (!gc) return;
    if (window.goatcounter && window.goatcounter.count) { try { window.goatcounter.count({ path: name, title: 'Klick', event: true }); } catch (e) {} }
    else gcQueue.push(name);
  }
  if (gc) {
    var s = document.createElement('script');
    s.async = true; s.src = 'https://gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://' + gc + '.goatcounter.com/count');
    s.onload = function () { while (gcQueue.length) count(gcQueue.shift()); };
    document.head.appendChild(s);
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    decorate(a);
    if (isPartner(a)) count('klick/' + (a.getAttribute('data-partner') || (a.hostname || 'partner').replace(/^www\./, '')) + '/' + (ref || 'direkt'));
  }, true);
  document.addEventListener('DOMContentLoaded', function () {
    var l = document.querySelectorAll('a[data-partner]');
    for (var i = 0; i < l.length; i++) decorate(l[i]);
  });
  window.TBRef = { get: function () { return ref; } };
})();
