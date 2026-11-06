---
name: "3dtoolbox-seitenpruefung"
description: "Use before any go-live of 3DToolBox changes, or when asked to check the site thoroughly for errors (functions, console, links, a11y, SEO, DE/EN, privacy, ad labelling)."
---

# 3DToolBox Seitenprüfung (Audit)

Ziel: Vor jedem Livegang die ganze Seite bis auf den Grund prüfen und einen kurzen Bericht liefern. Nichts geht ohne Manuels Freigabe online.

## Ablauf
1. **Statische Prüfung:** `static_audit.py` im Repo-Verzeichnis ausführen, Ziel "ISSUES 0". Prüft defekte Links, fehlende Dateien, hreflang, Sitemap, DE/EN-Paare.
2. **Lokaler Server:** `python3 -m http.server <port>` im Repo, später mit `kill $(lsof -ti:<port>)` beenden (nie pkill).
3. **Funktionstest je Tool (Playwright, Desktop 1440 px und Handy 390 px):** Seite laden, Haupteingaben ausfüllen, Ergebnis prüfen, Downloads (STL/3MF/Text) auslösen, Sprachwechsel DE/EN. Tools: Filament-Finder (Foto + 3MF), Datenbank (Filter, Hex-Suche), Lexikon (Suche, Filter, Deep-Links), Kostenrechner, Konverter, Objektgenerator, Gehäuse-Generator (alle Boards, Lüfter, Belüftung, Ansicht, Export), Restmengenrechner, Slicer-Helfer.
4. **Konsole/Netzwerk:** Keine JS-Fehler, keine 404, keine unerwarteten externen Requests (Datenschutz: nur GoatCounter und gekennzeichnete Partner nach Klick).
5. **Layout:** Screenshots in 390/768/1440 px; kein horizontales Scrollen, nichts überlappt, Dunkel- und Hellmodus lesbar.
6. **Barrierefreiheit:** Kontrast, Tastaturbedienung, Fokus, Labels, Alt-Texte, Überschriftenhierarchie.
7. **SEO:** title, meta description, canonical, hreflang DE/EN, OG-Tags, sitemap.xml, robots, strukturierte Daten, interne Verlinkung.
8. **DE/EN-Gleichstand:** Jede DE-Änderung hat die EN-Entsprechung (Texte, Links, Funktionen).
9. **Datenschutz/Impressum:** Passt zur tatsächlich eingesetzten Technik (GoatCounter, Partnernetzwerke, sessionStorage für ?ref=).
10. **Affiliate:** Nur Manuels eigene Links, exakte Produktseite oder keiner; jede Werbefläche mit "Werbung"/"Ad" gekennzeichnet; Kennzeichnung auch auf Mobil sichtbar.
11. **Performance:** Ladezeit, Dateigrößen, Lazy Loading, WASM/WebGL nur auf Tool-Seiten.
12. **Regression:** Bisher funktionierende Features gegen den letzten Stand vergleichen; nichts darf verschwinden oder schlechter werden.

## Bericht
Kurze Liste: Bestanden / Fehler (mit Datei, Zeile, Ursache) / behoben / offen. Gefundene Fehler zuerst beheben und erneut prüfen. Danach die Live-Seite im Browser gegenprüfen (Pages-Deploy dauert ca. 1–2 Minuten; die Sandbox erreicht 3dtoolbox.info nicht, Prüfung über Chrome in neuem Tab, danach schließen).