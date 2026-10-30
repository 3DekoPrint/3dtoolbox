/* 3DToolBox — Konfiguration für Empfehlungs-Links (?ref=name) und Partner-Klickzählung.
   Alles hier ist öffentlich sichtbar (statische Seite) – keine Geheimnisse eintragen.
   Solange nichts eingetragen ist, passiert nichts: keine Umleitung, keine externen Aufrufe. */
window.TB_REF_CONFIG = {
  /* GoatCounter-Code (https://CODE.goatcounter.com). Leer lassen = Zählung aus. */
  goatcounter: '3dtoolbox',

  /* Partner-Tools mit Empfehlungslink. {code} wird durch den Code ersetzt.
     own    = dein eigener Code (gilt immer, wenn kein Influencer-Code greift)
     shared = true erlaubt Influencern, ihren eigenen Code einzusetzen.
     Nur Meshy AI und Thangs sind "shared". Alles andere (Filament-Shops, Filamentor, jeder Kauf-Link)
     läuft immer über deine Links – ein Influencer-Code wird dort ignoriert.
     Meshy und Thangs: Adresse erst eintragen, wenn das jeweilige Programm sie vorgibt, z. B.
     meshy: { url: 'https://www.meshy.ai/?ref={code}', own: 'DEIN-CODE', shared: true } */
  partners: {
    filamentor: { url: 'https://filamentor.io/?ref={code}', own: 'manuelbeuters', shared: false }
  },

  /* Influencer: ref-Name -> Codes je Partner. Beispiel:
     maxmakes: { meshy: 'MAXMAKES', thangs: 'MAXMAKES' }
     Aufruf: https://3dtoolbox.info/?ref=maxmakes */
  influencers: {}
};
