'use strict';
/* Gemeinsamer Seitenkopf (Navigation mit 5 Bereichen, Brotkrumen) und Fuß für alle Seiten.
   Wird von tools/apply_nav.js (bestehende Seiten) und tools/build_generators.js (Generator-Seiten) genutzt. */

const LOGO = {
  de: '<a class="bt-logo" href="/" aria-label="3DToolBox"><svg viewBox="0 0 220 220" class="fm-brand-icon" aria-hidden="true"><rect width="220" height="220" rx="44" fill="#FF6A2B"/><polygon points="110,40 175,77.5 110,115 45,77.5" fill="#3E5169"/><polygon points="45,77.5 110,115 110,190 45,152.5" fill="#26313F"/><polygon points="110,115 175,77.5 175,152.5 110,190" fill="#161D26"/></svg><span class="fm-brand-word"><span class="fm-brand-3d">3D</span>ToolBox</span></a>',
  en: '<a class="bt-logo" href="/en/" aria-label="3DToolBox"><svg viewBox="0 0 220 220" class="fm-brand-icon" aria-hidden="true"><rect width="220" height="220" rx="44" fill="#FF6A2B"/><polygon points="110,40 175,77.5 110,115 45,77.5" fill="#3E5169"/><polygon points="45,77.5 110,115 110,190 45,152.5" fill="#26313F"/><polygon points="110,115 175,77.5 175,152.5 110,190" fill="#161D26"/></svg><span class="fm-brand-word"><span class="fm-brand-3d">3D</span>ToolBox</span></a>'
};

/* key -> [DE-Pfad, EN-Pfad] */
const P = {
  finder: ['/', '/en/'],
  db: ['/filament-datenbank.html', '/en/filament-database.html'],
  rest: ['/filament-restmengenrechner.html', '/en/filament-remaining-calculator.html'],
  cost: ['/3d-druck-kostenrechner.html', '/en/3d-print-cost-calculator.html'],
  conv: ['/3d-datei-konverter.html', '/en/3d-file-converter.html'],
  img: ['/bild-zu-3d.html', '/en/image-to-3d.html'],
  slicer: ['/slicer-einstellungen-helfer.html', '/en/slicer-settings-helper.html'],
  lex: ['/3d-druck-lexikon.html', '/en/3d-print-lexicon.html'],
  mat: ['/materialien/', '/en/materials/'],
  hub: ['/generatoren.html', '/en/generators.html'],
  case: ['/gehaeuse-generator.html', '/en/enclosure-generator.html'],
  obj: ['/3d-druck-objektgenerator.html', '/en/3d-print-object-generator.html'],
  gear: ['/3d-druck-planetengetriebe-generator.html', '/en/3d-print-planetary-gearbox-generator.html'],
  tag: ['/3d-druck-namens-anhaenger.html', '/en/3d-print-layered-name-tag.html'],
  plate: ['/3d-druck-namensschild-anhaenger.html', '/en/3d-print-name-plate-tag.html'],
  grid: ['/gridfinity-generator.html', '/en/gridfinity-generator.html']
};

const L = {
  de: {
    adTag: 'Werbung', tipTag: 'Tipp, keine Werbung',
    nav: 'Hauptnavigation', menu: 'Menü', theme: 'Darstellung wechseln (hell/dunkel)', crumb: 'Brotkrumen', home: 'Startseite',
    groups: [
      { id: 'fil', label: 'Filamente', items: [['finder', 'Filament-Finder', 'Foto oder 3MF hochladen, passende Filamente finden'], ['db', 'Filament-Datenbank', 'Über 1000 Filamente nach Farbe durchsuchen'], ['rest', 'Restmengenrechner', 'Wie viel Filament ist noch auf der Spule?']] },
      { id: 'tool', label: 'Werkzeuge', items: [['cost', 'Kostenrechner', 'Material, Strom und Verschleiß live berechnen'], ['conv', 'Datei-Konverter', 'STL, 3MF, OBJ und STEP umwandeln'], ['img', 'Bild zu 3D', 'Foto in Relief oder Lithophanie verwandeln']] },
      { id: 'gen', label: 'Generatoren', items: [['hub', 'Alle Generatoren', 'Über 30 Generatoren mit Suche'], ['grid', 'Gridfinity', 'Behälter und Grundplatten im 42-mm-Raster'], ['case', 'Gehäuse-Generator', 'Gehäuse für Raspberry Pi, ESP32 und mehr'], ['obj', 'Objekt-Generator', 'Boxen, Tabletts, Zykloiden und mehr'], ['gear', 'Planetengetriebe', 'Getriebe mit Hohlrad, Planeten und Sonne'], ['tag', 'Namens-Anhänger', 'Mehrfarbige Anhänger mit Namen'], ['plate', 'Namensschild', 'Namensschild mit Anhänger']] },
      { id: 'wiss', label: 'Wissen', items: [['lex', 'Lexikon', 'Druckprobleme, Slicer-Tipps und Begriffe'], ['mat', 'Materialien', 'PLA, PETG, ABS, ASA, TPU und mehr im Vergleich'], ['slicer', 'Slicer-Helfer', 'Einstellungen für Bambu Studio, Prusa und Cura']] }
    ],
    ext: { id: 'ext', label: 'Empfehlungen', note: 'Extern · nicht von uns', items: [['https://www.meshy.ai?via=3dekoprint', 'Meshy AI ↗', 'KI: aus Text oder Bild ein 3D-Modell erstellen'], ['https://than.gs/u/8355632', 'Thangs ↗', 'Große Bibliothek fertiger 3D-Modelle'], ['https://solidcraft.io', 'SolidCraft ↗', 'Kostenloses Open-Source-CAD zum Konstruieren eigener Teile', 'tip']] },
    foot: {
      about: 'Kostenlose Werkzeuge für den 3D-Druck. Alles läuft in deinem Browser, ohne Konto.',
      creatorT: 'Creator?', creatorP: 'Du zeigst 3D-Druck in deinem Content? Melde dich mit ein paar Infos zu deinem Kanal.', creatorBtn: 'Kooperation anfragen', mailSubj: 'Partneranfrage%203DToolBox',
      coop: 'Ein Projekt von', imp: 'Impressum', priv: 'Datenschutz', impUrl: '/impressum.html', privUrl: '/datenschutz.html'
    }
  },
  en: {
    adTag: 'Ad', tipTag: 'Tip, not an ad',
    nav: 'Main navigation', menu: 'Menu', theme: 'Switch appearance (light/dark)', crumb: 'Breadcrumb', home: 'Home',
    groups: [
      { id: 'fil', label: 'Filaments', items: [['finder', 'Filament Finder', 'Upload a photo or 3MF and find matching filaments'], ['db', 'Filament Database', 'Browse 1000+ filaments by colour'], ['rest', 'Remaining Filament', 'How much filament is left on the spool?']] },
      { id: 'tool', label: 'Tools', items: [['cost', 'Cost Calculator', 'Material, power and wear costs live'], ['conv', 'File Converter', 'Convert STL, 3MF, OBJ and STEP'], ['img', 'Image to 3D', 'Turn a photo into a relief or lithophane']] },
      { id: 'gen', label: 'Generators', items: [['hub', 'All generators', '30+ generators with search'], ['grid', 'Gridfinity', 'Bins and baseplates on the 42 mm grid'], ['case', 'Enclosure Generator', 'Cases for Raspberry Pi, ESP32 and more'], ['obj', 'Object Generator', 'Boxes, trays, cycloids and more'], ['gear', 'Planetary Gearbox', 'Gearbox with ring, planets and sun gear'], ['tag', 'Layered Name Tag', 'Multicolour name tags'], ['plate', 'Name Plate Tag', 'Name plate with tag']] },
      { id: 'wiss', label: 'Knowledge', items: [['lex', 'Lexicon', 'Print problems, slicer tips and terms'], ['mat', 'Materials', 'PLA, PETG, ABS, ASA, TPU and more compared'], ['slicer', 'Slicer Helper', 'Settings for Bambu Studio, Prusa and Cura']] }
    ],
    ext: { id: 'ext', label: 'Recommended', note: 'External · not by us', items: [['https://www.meshy.ai?via=3dekoprint', 'Meshy AI ↗', 'AI: create a 3D model from text or an image'], ['https://than.gs/u/8355632', 'Thangs ↗', 'Large library of ready-to-print 3D models'], ['https://solidcraft.io', 'SolidCraft ↗', 'Free open-source CAD for designing your own parts', 'tip']] },
    foot: {
      about: 'Free tools for 3D printing. Everything runs in your browser, no account needed.',
      creatorT: 'Creator?', creatorP: 'Do you show 3D printing in your content? Get in touch with a few details about your channel.', creatorBtn: 'Request a collaboration', mailSubj: 'Partner%20inquiry%20-%203DToolBox',
      coop: 'A project by', imp: 'Legal Notice', priv: 'Privacy Policy', impUrl: '/en/impressum.html', privUrl: '/en/datenschutz.html'
    }
  }
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const idx = lg => (lg === 'de' ? 0 : 1);
const href = (key, lg) => P[key][idx(lg)];

/* Zu welchem Bereich gehört eine Seite? path = absoluter Pfad wie '/gridfinity-generator.html' */
function groupOf(path, lg) {
  const g = L[lg].groups;
  for (const gr of g) for (const it of gr.items) if (href(it[0], lg) === path && it[0] !== 'hub') return gr.id;
  if (path === href('hub', lg)) return 'gen';
  if (/\/(materialien|materials)\//.test(path)) return 'wiss';
  if (/generator\.html$/.test(path) || /-generator\.html$/.test(path)) return 'gen';
  return '';
}

function header(lg, o) {
  /* o: { path, other (URL der anderen Sprache), crumbs: [[label, url|null], ...] } */
  const T = L[lg], act = groupOf(o.path, lg);
  const grp = (id, label, items, cur, extra) => {
    const links = items.map(it => {
      const url = extra ? it[0] : href(it[0], lg);
      const isCur = !extra && url === o.path;
      const tip = extra && it[3] === 'tip';
      const attrs = extra ? (tip ? ' target="_blank" rel="noopener noreferrer"' : ' target="_blank" rel="noopener sponsored"') : '';
      const pre = extra ? (tip ? T.tipTag : T.adTag) + ' · ' : '';
      return '<a href="' + url + '"' + attrs + (isCur ? ' aria-current="page"' : '') + '><b>' + esc(it[1]) + '</b><span>' + esc(pre + it[2]) + '</span></a>';
    }).join('');
    const note = extra ? '<small>' + esc(T.ext.note) + '</small>' : '';
    return '<li class="tb-grp' + (cur ? ' is-cur' : '') + '"><details><summary>' + esc(label) + '</summary><div class="tb-dd">' + note + links + '</div></details></li>';
  };
  let h = '  <header class="tb-top">\n  <nav class="tb-nav" aria-label="' + T.nav + '">\n    ' + LOGO[lg] + '\n';
  h += '    <input type="checkbox" id="tbm" class="tb-mchk" aria-label="' + T.menu + '"><label for="tbm" class="tb-mbtn"><span></span><span></span><span></span><em>' + T.menu + '</em></label>\n';
  h += '    <ul class="tb-menu">' + T.groups.map(g => grp(g.id, g.label, g.items, g.id === act, false)).join('') + grp('ext', T.ext.label, T.ext.items, false, true) + '</ul>\n';
  const cur = lg === 'de' ? ['DE', 'EN', 'en'] : ['EN', 'DE', 'de'];
  h += '    <div class="tb-tools"><div class="fm-lang-switch"><span class="fm-lang-current">' + cur[0] + '</span><a class="fm-lang-link" href="' + o.other + '" hreflang="' + cur[2] + '">' + cur[1] + '</a></div>' +
    '<button class="tb-theme" type="button" aria-label="' + T.theme + '"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button></div>\n  </nav>\n';
  if (o.crumbs && o.crumbs.length) {
    h += '  <nav class="tb-crumb" aria-label="' + T.crumb + '"><ol>' + o.crumbs.map((c, i) => '<li>' + (c[1] && i < o.crumbs.length - 1 ? '<a href="' + c[1] + '">' + esc(c[0]) + '</a>' : '<span' + (i === o.crumbs.length - 1 ? ' aria-current="page"' : '') + '>' + esc(c[0]) + '</span>') + '</li>').join('') + '</ol></nav>\n';
  }
  return h + '  </header>\n';
}

function crumbsFor(lg, path, title) {
  const T = L[lg], gid = groupOf(path, lg);
  if (path === href('finder', lg)) return null;
  const home = [T.home, lg === 'de' ? '/' : '/en/'];
  if (!gid) return [home, [title, null]];
  const g = T.groups.find(x => x.id === gid);
  const gUrl = gid === 'gen' ? href('hub', lg) : null;
  const mid = [g.label, gUrl];
  const isMatIdx = path === href('mat', lg);
  if (path === href('hub', lg)) return [home, [title, null]];
  if (gid === 'wiss' && /\/(materialien|materials)\/.+/.test(path) && !isMatIdx) return [home, mid, [lg === 'de' ? 'Materialien' : 'Materials', href('mat', lg)], [title, null]];
  return [home, mid, [title, null]];
}

function footer(lg) {
  const T = L[lg], F = T.foot;
  const col = g => '<nav aria-label="' + esc(g.label) + '"><b>' + esc(g.label) + '</b>' + g.items.filter(it => it[0] !== 'hub' && it[0] !== 'grid').slice(0, 5).map(it => '<a href="' + href(it[0], lg) + '">' + esc(it[1]) + '</a>').join('') + (g.id === 'gen' ? '<a href="' + href('hub', lg) + '">' + (lg === 'de' ? 'Alle Generatoren →' : 'All generators →') + '</a>' : '') + '</nav>';
  return '  <footer class="tb-foot">\n    <div class="tb-foot-grid">\n      <div class="tb-foot-about"><b>3DToolBox</b><p>' + esc(F.about) + '</p></div>\n      ' + T.groups.map(col).join('\n      ') + '\n' +
    '      <div class="tb-foot-creator"><b>' + F.creatorT + '</b><p>' + esc(F.creatorP) + '</p><a class="tb-foot-btn" href="mailto:info@3dtoolbox.info?subject=' + F.mailSubj + '">' + esc(F.creatorBtn) + '</a></div>\n    </div>\n' +
    '    <div class="tb-foot-bot"><p class="fm-footer-coop"><img src="/assets/3dekoprint-logo.png" alt="3DekoPrint Logo" class="fm-footer-logo" width="20" height="20"> ' + F.coop + ' <a href="https://3dekoprint.de" target="_blank" rel="noopener">3DekoPrint</a></p>' +
    '<p class="tb-foot-legal"><a href="' + F.impUrl + '">' + F.imp + '</a><span aria-hidden="true">·</span><a href="' + F.privUrl + '">' + F.priv + '</a></p></div>\n  </footer>\n';
}

module.exports = { header, footer, crumbsFor, groupOf, P, L, LOGO, href };
