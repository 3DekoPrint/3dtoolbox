---
name: "3dtoolbox-designsystem"
description: "Use when designing or changing any page, tool or component of 3DToolBox (3dtoolbox.info) so the look stays consistent, modern and not like generic AI output."
---

# 3DToolBox Designsystem

Ziel: Eine moderne, eigenständige Optik für 3DToolBox, die nicht nach KI-Standardvorlage aussieht und über alle Tools gleich bleibt.

## Vorgehen
1. Bestehende Seiten, `assets/*.css` und vorhandene Komponenten lesen, bevor etwas Neues entsteht. Vorhandenes Stylesheet hat Vorrang vor eigenen Ideen.
2. Ist noch keine Stilrichtung freigegeben: 2–3 Richtungen als Vorschau (Startseite + Filament-Finder) zeigen, Manuel wählt. Richtung danach unten in "Freigegebener Stil" festhalten.
3. Alles über Design-Tokens (CSS-Variablen auf `:root`: Farben, Schriftgrößen, Abstände, Radien, Schatten). Keine Einzelwerte in Komponenten.
4. Hell- und Dunkelmodus über Tokens (`prefers-color-scheme` plus manueller Schalter), `body` mit explizitem Hintergrund.
5. Neue Tools nutzen dieselben Komponenten: Header/Navigation, Tool-Karte, Eingabefelder, Buttons, Ergebnisfläche, "Werbung"-Box, Footer.

## Gegen den KI-Look
- Keine violett/blauen Standard-Verläufe, keine Glas-Karten-Orgie, keine drei gleichen Feature-Karten als Standardlayout.
- Keine Emoji als Icons. Einheitliches Inline-SVG-Iconset im selben Strichstil.
- Keine Standard-Systemschrift allein: eine bewusste Schriftkombination (Überschrift + Text, optional Mono für Maße/Werte), lokal eingebunden (Datenschutz, kein Google-Fonts-Abruf ohne Einwilligung).
- Inhalte aus der Welt des 3D-Drucks nutzen: echte Einheiten (mm, g, °C, ΔE), Düsen-/Schicht-Motive, Filament-Farbmuster, Maßlinien. Keine Floskeln wie "revolutionär" oder "nahtlos".
- Echte Texte statt Platzhalter. Kurze, konkrete Sätze.
- Sparsam mit Effekten: wenige, gezielte Animationen, `prefers-reduced-motion` beachten.

## Technische Vorgaben
- Mobil zuerst, kein horizontales Scrollen, mind. 16 px Seitenrand, Touch-Ziele mind. 44 px.
- Kontrast mind. WCAG AA, sichtbarer Tastaturfokus, Labels an allen Feldern.
- Performance: keine schweren Bibliotheken ohne Grund, Bilder in passender Größe, WebGL/WASM nur auf Tool-Seiten.
- Statisches HTML/JS bleibt Grundlage. DE im Root, EN unter `/en/`, beide Fassungen immer gemeinsam ändern.

## Affiliate und Werbung
- Jeder Kauf-/Partnerlink: nur Manuels eigener Link auf die genaue Produktseite, sonst kein Link.
- Jede Werbefläche gekennzeichnet mit "Werbung" (EN: "Ad"). Empfehlungen nur dort, wo sie zum Tool/Ergebnis passen. Nie wie eine Linksammlung wirken.

## Nie
- Funktionierende Features entfernen oder verschlechtern.
- Etwas ohne Vorschau und ausdrückliche Freigabe von Manuel live schalten.

## Freigegebener Stil
(noch offen – nach Auswahl durch Manuel hier Farben, Schriften, Radien, Komponenten eintragen)