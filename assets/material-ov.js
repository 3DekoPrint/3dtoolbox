/* Datenblatt-Download der Materialseiten: erzeugt eine Textdatei lokal im Browser aus assets/materials.js. */
(function () {
  var btn = document.getElementById('mpDl'); if (!btn || !window.MaterialDB) return;
  btn.addEventListener('click', function () {
    var id = btn.getAttribute('data-id'), lg = btn.getAttribute('data-lang') === 'en' ? 'en' : 'de';
    var m = window.MaterialDB.items.filter(function (x) { return x.id === id; })[0]; if (!m) return;
    var T = lg === 'de'
      ? { t: 'Datenblatt (Richtwerte)', nozzle: 'Düse (°C)', bed: 'Bett (°C)', hdt: 'Hitzebeständigkeit HDT (°C)', tensile: 'Zugfestigkeit (MPa)', elong: 'Bruchdehnung', dens: 'Dichte (g/cm³)', dry: 'Trocknen', uses: 'Verwendung', pro: 'Vorteile', con: 'Nachteile', encl: ['Kein Gehäuse nötig', 'Gehäuse optional', 'Geschlossener Bauraum nötig'], hard: 'Gehärtete Düse nötig', note: 'Richtwerte aus Hersteller-Datenblättern; je nach Hersteller, Farbe und Druckparametern verschieden. Keine Garantie.', diff: 'Schwierigkeit (1–5)' }
      : { t: 'Data sheet (guide values)', nozzle: 'Nozzle (°C)', bed: 'Bed (°C)', hdt: 'Heat resistance HDT (°C)', tensile: 'Tensile strength (MPa)', elong: 'Elongation at break', dens: 'Density (g/cm³)', dry: 'Drying', uses: 'Use cases', pro: 'Pros', con: 'Cons', encl: ['No enclosure needed', 'Enclosure optional', 'Enclosed build chamber required'], hard: 'Hardened nozzle required', note: 'Guide values from manufacturer data sheets; they vary by brand, colour and print settings. No guarantee.', diff: 'Difficulty (1–5)' };
    var L = [m.name[lg] + ' – ' + T.t, '3dtoolbox.info', ''];
    ['nozzle', 'bed', 'hdt', 'tensile', 'elong', 'dens', 'dry'].forEach(function (k) { if (m[k] && m[k][lg]) L.push(T[k] + ': ' + m[k][lg]); });
    L.push(T.diff + ': ' + m.diff, T.encl[m.encl] + (m.hard ? ' | ' + T.hard : ''), '', T.uses + ': ' + m.uses[lg], T.pro + ': ' + m.pro[lg], T.con + ': ' + m.con[lg], '', T.note);
    var b = new Blob([L.join('\r\n')], { type: 'text/plain;charset=utf-8' }), a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = '3dtoolbox-' + id.toLowerCase() + '-datenblatt.txt'; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  });
})();
