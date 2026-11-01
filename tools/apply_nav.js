'use strict';
/* Spielt den neuen Kopf (Navigation + Brotkrumen) und Fuß auf alle bestehenden Seiten ein. Wiederholbar. */
const fs = require('fs'), path = require('path');
const NAV = require('./site_nav.js');
const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['.git', 'node_modules', 'tools', 'assets']);
const files = [];
(function walk(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { if (SKIP.has(e.name)) return; const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) files.push(f); }); })(ROOT);

const stripTags = s => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
let n = 0, skipped = [];
files.forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  const rel = '/' + path.relative(ROOT, f).split(path.sep).join('/');
  const lg = /<html lang="en"/.test(h) ? 'en' : 'de';
  const isHome = rel === '/index.html' || rel === '/en/index.html';
  const pagePath = isHome ? (lg === 'de' ? '/' : '/en/') : rel.replace(/index\.html$/, '');
  if (isHome) return; /* Startseiten werden separat gebaut */
  const legal = /\/(impressum|datenschutz)\.html$/.test(rel);
  /* Gegenseite aus hreflang lesen */
  let other = (h.match(/<link rel="alternate" hreflang="(?:de|en)" href="https:\/\/3dtoolbox\.info([^"]*)"/g) || []).map(s => s.match(/hreflang="(\w+)" href="https:\/\/3dtoolbox\.info([^"]*)"/)).filter(m => m[1] === (lg === 'de' ? 'en' : 'de'))[0];
  other = other ? other[2] : (lg === 'de' ? '/en' + rel : rel.replace(/^\/en/, '') || '/');
  if (legal) other = lg === 'de' ? '/en' + rel : rel.replace(/^\/en/, '');
  const title = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  const crumbs = legal ? [[NAV.L[lg].home, lg === 'de' ? '/' : '/en/'], [stripTags(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), null]] : NAV.crumbsFor(lg, pagePath, title ? stripTags(title) : '');
  const head = NAV.header(lg, { path: pagePath, other, crumbs });
  const foot = NAV.footer(lg);

  /* 1. Kopf ersetzen */
  const reTool = /[ \t]*<nav class="bt-nav">[\s\S]*?<\/nav>\s*<div class="bt-switch">[\s\S]*?<\/div>\s*<div class="bt-switch bt-switch-gen">[\s\S]*?<\/span>\s*<\/div>\n?/;
  if (/<header class="tb-top">/.test(h)) h = h.replace(/[ \t]*<header class="tb-top">[\s\S]*?<\/header>\n/, () => head);
  else if (reTool.test(h)) h = h.replace(reTool, () => head);
  else if (legal) h = h.replace(/<nav class="lg-nav">[\s\S]*?<\/nav>\s*<a class="lg-back"[^>]*>[^<]*<\/a>\n?/, () => head);
  else { skipped.push(rel + ' (kein Kopf gefunden)'); return; }
  if (/class="bt-switch/.test(h)) { skipped.push(rel + ' (Rest-Chips)'); return; }

  /* 2. Fuß ersetzen (Partner-Kasten + alter Fuß) */
  const reFoot = /[ \t]*(?:<div class="fm-partner">[\s\S]*?<\/div>\s*)?<div class="fm-footer">[\s\S]*?<\/div>\s*<\/div>\n/;
  if (reFoot.test(h)) h = h.replace(reFoot, () => foot);
  else if (/<footer class="tb-foot">/.test(h)) h = h.replace(/[ \t]*<footer class="tb-foot">[\s\S]*?<\/footer>\n/, () => foot);
  else if (legal) { h = h.replace(/(<\/p>\s*)(<\/div>\s*<\/body>)/, (m, a, b) => a + foot + b); }
  else { skipped.push(rel + ' (kein Fuß gefunden)'); }

  /* 3. Kopf-Skripte (Theme ohne Flackern, Menü-Verhalten) */
  if (h.indexOf('/assets/theme-init.js') < 0) h = h.replace('</head>', '<script src="/assets/theme-init.js"></script>\n<script src="/assets/ui.js" defer></script>\n</head>');
  if (legal && h.indexOf('/assets/theme.css') < 0) h = h.replace('</head>', '<link rel="stylesheet" href="/assets/theme.css">\n</head>');
  fs.writeFileSync(f, h); n++;
});
console.log('Seiten umgestellt:', n, 'von', files.length);
if (skipped.length) console.log('Übersprungen/Hinweise:\n' + skipped.join('\n'));
