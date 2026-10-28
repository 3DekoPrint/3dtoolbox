/* 3DToolBox — Beta-Hinweis + Ideen-/Feedback-Formular für die Generatoren.
   Kein Server nötig: Beim Absenden öffnet sich das E-Mail-Programm der Nutzer:in mit fertig ausgefüllter Nachricht
   an info@3dekoprint.de (keine Datenübertragung über die Website, siehe Datenschutz). */
(function () {
  'use strict';
  var TO = 'info@3dekoprint.de';
  var EN = location.pathname.indexOf('/en/') === 0;
  var L = EN ? {
    noticeT: 'Beta: not everything is fully tested yet',
    noticeP: 'All generators are still being tested and improved. If you notice anything – wrong dimensions, export problems, display glitches – please let me know using the form at the bottom of this page. Thank you for your help!',
    formT: 'Report a problem or suggest a tool',
    formP: 'Found an issue, or have an idea for another tool or generator? Write to me – I will check whether it can be built.',
    name: 'Name', subject: 'Subject', email: 'Your email address', msg: 'Message', send: 'Write message',
    consent: 'I agree that my details are used only to process my message. Submitting opens your email application with a ready-made message to us (no data is sent through this website) – see the <a href="/en/datenschutz.html">privacy policy</a>.',
    hint: 'Your email application opens with the finished message – you only need to click "Send". If nothing opens, write to ',
    err: 'Please fill in all fields and enter a valid email address.', errC: 'Please tick the consent box.', pre: '[3DToolBox] ',
    page: 'Page', from: 'From'
  } : {
    noticeT: 'Beta: noch nicht alles komplett getestet',
    noticeP: 'Alle Generatoren befinden sich noch in der Erprobung und werden laufend verbessert. Wenn dir etwas auffällt – falsche Maße, Probleme beim Export, Darstellungsfehler – melde es bitte über das Formular am Ende dieser Seite. Danke für deine Mithilfe!',
    formT: 'Problem melden oder Tool vorschlagen',
    formP: 'Etwas gefunden oder eine Idee für ein weiteres Tool oder einen weiteren Generator? Schreib mir – ich prüfe, ob sich das umsetzen lässt.',
    name: 'Name', subject: 'Betreff', email: 'Deine E-Mail-Adresse', msg: 'Nachricht', send: 'Nachricht schreiben',
    consent: 'Ich bin einverstanden, dass meine Angaben ausschließlich zur Bearbeitung meiner Nachricht verwendet werden. Beim Absenden öffnet sich dein E-Mail-Programm mit einer fertigen Nachricht an uns (über diese Website werden keine Daten übertragen) – siehe <a href="/datenschutz.html">Datenschutz</a>.',
    hint: 'Dein E-Mail-Programm öffnet sich mit der fertigen Nachricht – du musst nur noch auf „Senden“ klicken. Falls sich nichts öffnet, schreib direkt an ',
    err: 'Bitte alle Felder ausfüllen und eine gültige E-Mail-Adresse angeben.', errC: 'Bitte stimme der Verarbeitung zu.', pre: '[3DToolBox] ',
    page: 'Seite', from: 'Von'
  };

  var css = '.fb-notice{margin:0 0 20px;padding:14px 16px;border:1px solid var(--accent,#ff8c3c);border-radius:12px;background:rgba(255,140,60,.08);color:var(--ink,#eef3ee);font-size:14.5px;line-height:1.55}' +
    '.fb-notice b{color:var(--accent,#ff8c3c)}' +
    '.fb-box{margin:32px 0 8px;padding:22px 22px 20px;border:1px solid var(--line,#2f473c);border-radius:14px;background:var(--panel,#1b2b25);color:var(--ink,#eef3ee)}' +
    '.fb-box h2{margin:0 0 6px;font-size:20px}.fb-box p{margin:0 0 14px;color:var(--ink-dim,#a8bdb2);font-size:14.5px;line-height:1.55}' +
    '.fb-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:620px){.fb-grid{grid-template-columns:1fr}}' +
    '.fb-box label{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-dim,#a8bdb2);margin:0 0 4px}' +
    '.fb-box input[type=text],.fb-box input[type=email],.fb-box textarea{width:100%;background:var(--panel-2,#22362d);border:1px solid var(--line,#2f473c);color:var(--ink,#eef3ee);border-radius:8px;padding:10px 12px;font:inherit;font-size:15px}' +
    '.fb-box textarea{min-height:130px;resize:vertical}.fb-box input:focus,.fb-box textarea:focus{outline:2px solid var(--accent,#ff8c3c);outline-offset:1px}' +
    '.fb-full{grid-column:1/-1}.fb-consent{display:flex;gap:10px;align-items:flex-start;font-size:13px;color:var(--ink-dim,#a8bdb2);line-height:1.5}.fb-consent input{margin-top:3px}.fb-consent a{color:var(--accent-2,#5fd9a0)}' +
    '.fb-btn{background:var(--accent,#ff8c3c);color:#1a1206;border:0;border-radius:999px;padding:12px 24px;font:700 15px inherit;font-family:inherit;cursor:pointer}.fb-btn:hover{filter:brightness(1.08)}' +
    '.fb-msg{font-size:13.5px;margin-top:10px;color:var(--ink-dim,#a8bdb2)}.fb-msg.err{color:#ff8a7a}.fb-msg a{color:var(--accent-2,#5fd9a0)}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // 1) Hinweis unter dem Seitenkopf
  var hero = document.querySelector('header.bt-subhero') || document.querySelector('.bt-subhero');
  var notice = document.createElement('div'); notice.className = 'fb-notice'; notice.setAttribute('role', 'note');
  notice.innerHTML = '<b>' + L.noticeT + '.</b> ' + L.noticeP;
  if (hero && hero.parentNode) hero.parentNode.insertBefore(notice, hero.nextSibling);
  else { var r = document.querySelector('.fm-root') || document.body; r.insertBefore(notice, r.firstChild); }

  // 2) Formular vor dem Footer
  var box = document.createElement('section'); box.className = 'fb-box'; box.id = 'feedback';
  box.innerHTML = '<h2>' + L.formT + '</h2><p>' + L.formP + '</p>' +
    '<form novalidate><div class="fb-grid">' +
    '<div><label for="fbName">' + L.name + '</label><input type="text" id="fbName" maxlength="80" autocomplete="name" required></div>' +
    '<div><label for="fbMail">' + L.email + '</label><input type="email" id="fbMail" maxlength="120" autocomplete="email" required></div>' +
    '<div class="fb-full"><label for="fbSubj">' + L.subject + '</label><input type="text" id="fbSubj" maxlength="120" required></div>' +
    '<div class="fb-full"><label for="fbText">' + L.msg + '</label><textarea id="fbText" maxlength="1500" required></textarea></div>' +
    '<div class="fb-full fb-consent"><input type="checkbox" id="fbOk"><label for="fbOk" style="text-transform:none;letter-spacing:0;font-size:13px;margin:0">' + L.consent + '</label></div>' +
    '<div class="fb-full"><button class="fb-btn" type="submit">' + L.send + '</button><div class="fb-msg" id="fbMsg" aria-live="polite"></div></div>' +
    '</div></form>';
  var footer = document.querySelector('.fm-footer');
  if (footer && footer.parentNode) footer.parentNode.insertBefore(box, footer);
  else (document.querySelector('.fm-root') || document.body).appendChild(box);

  var form = box.querySelector('form'), msg = box.querySelector('#fbMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (id) { return box.querySelector('#' + id).value.trim(); };
    var name = v('fbName'), mail = v('fbMail'), subj = v('fbSubj'), text = v('fbText');
    msg.className = 'fb-msg err';
    if (!name || !subj || !text || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) { msg.textContent = L.err; return; }
    if (!box.querySelector('#fbOk').checked) { msg.textContent = L.errC; return; }
    var body = text + '\n\n--\n' + L.from + ': ' + name + ' <' + mail + '>\n' + L.page + ': ' + location.href;
    var href = 'mailto:' + TO + '?subject=' + encodeURIComponent(L.pre + subj) + '&body=' + encodeURIComponent(body);
    msg.className = 'fb-msg';
    msg.innerHTML = L.hint + '<a href="mailto:' + TO + '">' + TO + '</a>.';
    form.setAttribute('data-mailto', href);
    window.location.href = href;
  });
})();
