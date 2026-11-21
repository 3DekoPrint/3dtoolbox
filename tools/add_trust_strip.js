'use strict';
/* Idempotent: Vertrauenszeile unter dem Seitenkopf der Werkzeugseiten, die wirklich lokal im Browser rechnen. */
const fs = require('fs'), path = require('path'), NAV = require('./site_nav.js');
const ROOT = path.resolve(__dirname, '..');
const T = { de: ['Läuft lokal im Browser', 'Keine Anmeldung', 'Kostenlos'], en: ['Runs locally in your browser', 'No sign-up', 'Free'] };
const FILE = { de: 'Deine Datei wird nicht hochgeladen', en: 'Your file is not uploaded' };
let n = 0;
for (const k of ['cost', 'conv', 'rest', 'case', 'obj', 'gear', 'grid', 'tag', 'plate']) {
  NAV.P[k].forEach((u, i) => {
    const lg = i ? 'en' : 'de', p = path.join(ROOT, u.slice(1)); if (!fs.existsSync(p)) { console.log('fehlt', u); return; }
    let s = fs.readFileSync(p, 'utf8'); if (s.includes('class="bv-trust"')) return;
    const m = s.match(/<header class="bt-subhero">[\s\S]*?<\/header>/); if (!m) { console.log('kein Kopf', u); return; }
    const items = (k === 'conv' ? [T[lg][0], FILE[lg]].concat(T[lg].slice(1)) : T[lg]);
    s = s.replace(m[0], m[0] + '\n  <ul class="bv-trust">' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>'); fs.writeFileSync(p, s); n++;
  });
}
console.log('geändert', n);
