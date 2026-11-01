/* Setzt die gewählte Darstellung (hell/dunkel) vor dem ersten Zeichnen, damit nichts aufblitzt. */
(function () { try { var t = localStorage.getItem('tb_theme'); if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t); } catch (e) {} })();
