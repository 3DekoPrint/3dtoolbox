# 3DToolBox – Arbeitsregeln (Manuel, 3DekoPrint, Emden)

Sprache: Antworte auf Deutsch, knapp und konkret. Manuel arbeitet oft vom Handy: kurze Antworten, klare nächste Schritte, keine langen Listen.

## Projekt
3dtoolbox.info: kostenlose statische DE/EN-Tools für den 3D-Druck (kein Backend, alles im Browser). Repo: ~/3dtoolbox (GitHub 3DekoPrint/3dtoolbox, Branch main). DE liegt flach im Root, EN unter /en/. Interne Links nutzen echte Pfade. Generatoren: assets/gen-kit.js, assets/gen/<id>.js, Build-Skripte in tools/ (build_generators.js, build_solidcraft.js, seo_trim.js, site_nav.js). Konverter: assets/converter-core.js, converter-ui.js.

## Live-Betrieb
Die Seite läuft auf Manuels one.com-Server (Caddy, HTTPS). Der Server zieht main alle 2 Minuten selbst per Cron aus GitHub. Ein Push auf main ist also LIVE.

## Feste Regeln
1. Erst Vorschau auf einem Nebenzweig. Auf main nur nach ausdrücklichem „stelle es online“ von Manuel. Jeden git push von Manuel freigeben lassen.
2. DE und EN immer zusammen ändern.
3. Funktionierende Features nie unbeabsichtigt entfernen oder verschlechtern. Vor größeren Änderungen Auswirkung auf DE/EN, SEO, Datenschutz, Performance und Affiliate-Links bedenken.
4. Affiliate-/Kauflinks nur Manuels eigene (aktuell Sunlu, Elegoo, Recreus, Redline). Jede Werbefläche mit „Werbung“/„Ad“ kennzeichnen. Nie ohne Rückfrage Affiliate-Programme beantragen.
5. Datenschutz/Impressum müssen zur tatsächlichen Technik passen. Dateien und Bilder nur lokal im Browser verarbeiten, keine Uploads.
6. Zugangsdaten, Passwörter, Zahlungen, DNS, Konten sind Manuels Sache. Nie danach fragen oder sie annehmen, keine CAPTCHAs umgehen.
7. Logo bleibt unverändert. Nutzung bleibt kostenlos. Spenden-Button ist verschoben.
8. Kein Code von Drittseiten kopieren, gleichwertige Funktion selbst bauen.
9. Vor jeder Veröffentlichung: Seitenprüfung (Links, Konsole, DE/EN-Gleichstand, Kennzeichnung der Werbung, Handy-Ansicht). Danach melden, was geprüft wurde und was offen ist.
10. Design: Farbstil „Waldgrün hell“ (tiefes Grün, Kupfer-Akzent), kein generischer KI-Look.

## Server
Dieser Rechner ist ein Produktionsserver. Keine Systemeinstellungen, Firewall, SSH oder DNS ändern. Der Benutzer `claude` hat kein sudo; für Systemänderungen Manuel um Hilfe als `administrator` bitten.
