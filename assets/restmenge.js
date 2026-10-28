(function () {
  'use strict';
  var C = window.RR || {}, $ = function (i) { return document.getElementById(i); };
  var nf = new Intl.NumberFormat(C.en ? 'en-US' : 'de-DE', { maximumFractionDigits: 1 });
  function num(id) { var v = parseFloat(String($(id).value).replace(',', '.')); return isFinite(v) ? v : NaN; }
  function calc() {
    var net = num('rrNet'), empty = num('rrEmpty'), gross = num('rrGross'), need = num('rrNeed');
    var dens = parseFloat($('rrMat').value), d = parseFloat($('rrDia').value);
    var rest = gross - empty;
    if (!isFinite(rest) || !isFinite(net) || net <= 0) { ['rrRest', 'rrLen', 'rrPct'].forEach(function (i) { $(i).textContent = '–'; }); $('rrFill').style.width = '0'; $('rrVerdict').textContent = ''; return; }
    rest = Math.max(0, rest);
    var area = Math.PI * Math.pow(d / 20, 2); // cm²
    var len = rest / (dens * area) / 100;      // m
    var pct = Math.min(100, rest / net * 100);
    $('rrRest').textContent = nf.format(rest) + ' g';
    $('rrLen').textContent = nf.format(len) + ' m';
    $('rrPct').textContent = nf.format(pct) + ' %';
    $('rrFill').style.width = pct + '%';
    var v = $('rrVerdict');
    if (isFinite(need) && need > 0) {
      v.textContent = rest >= need ? C.enough + ' ' + C.after + ': ' + nf.format(rest - need) + ' g' : C.not_ + ' ' + nf.format(need - rest) + ' g';
      v.style.color = rest >= need ? 'var(--accent-2)' : 'var(--accent)';
    } else v.textContent = '';
  }
  ['rrMat', 'rrDia', 'rrNet', 'rrEmpty', 'rrGross', 'rrNeed'].forEach(function (i) { $(i).addEventListener('input', calc); });
  calc();
})();
