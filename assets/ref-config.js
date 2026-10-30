/* 3DToolBox — Konfiguration für Empfehlungs-Links (?ref=name) und Partner-Klickzählung.
   Alles hier ist öffentlich sichtbar (statische Seite) – keine Geheimnisse eintragen.
   Solange nichts eingetragen ist, passiert nichts: keine Umleitung, keine externen Aufrufe. */
window.TB_REF_CONFIG = {
  /* GoatCounter-Code (https://CODE.goatcounter.com). Leer lassen = Zählung aus. */
  goatcounter: '3dtoolbox',

  /* Partner-Tools mit Empfehlungslink. {code} wird durch den Code des Influencers
     (oder durch "own" = dein eigener Code) ersetzt. Beispiel (Adresse nur eintragen, wenn das Programm sie so vorgibt):
     meshy: { url: 'https://www.meshy.ai/?ref={code}', own: 'DEIN-CODE' } */
  partners: {},

  /* Influencer: ref-Name -> Codes je Partner. Beispiel:
     maxmakes: { meshy: 'MAXMAKES' }
     Aufruf: https://3dtoolbox.info/?ref=maxmakes */
  influencers: {}
};
