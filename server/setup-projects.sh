#!/usr/bin/env bash
# Legt die Projektordner auf dem Server an (Benutzer claude). Mehrfach ausführbar.
set -euo pipefail
P="$HOME/projects"
mkdir -p "$P" "$HOME/.config/systemd/user"
git config --global user.name "Claude Server"
git config --global user.email "claude-server@users.noreply.github.com"
git config --global init.defaultBranch main

# 1) 3DToolBox in den Projektordner verschieben
if [ -d "$HOME/3dtoolbox" ] && [ ! -d "$P/3dtoolbox" ]; then
  systemctl --user disable --now claude-rc.service 2>/dev/null || true
  mv "$HOME/3dtoolbox" "$P/3dtoolbox"
  rm -f "$HOME/.config/systemd/user/claude-rc.service"
fi
if [ -d "$P/3dtoolbox/.git" ]; then
  git -C "$P/3dtoolbox" fetch -q origin server-setup 2>/dev/null || true
  git -C "$P/3dtoolbox" show origin/server-setup:server/CLAUDE.md > "$P/3dtoolbox/CLAUDE.md" 2>/dev/null || true
  # Dateien nur lokal halten, damit sie nie im Repo (und damit live) landen
  printf 'CLAUDE.md\n.claude/\n' >> "$P/3dtoolbox/.git/info/exclude"
  sort -u "$P/3dtoolbox/.git/info/exclude" -o "$P/3dtoolbox/.git/info/exclude"
fi

# 2) Allgemeine Regeln für alle Projekte
cat > "$HOME/.claude/CLAUDE.md" <<'EOF'
# Allgemeine Regeln (Manuel, Emden)

Sprache: Deutsch, knapp und konkret. Manuel arbeitet oft vom Handy: kurze Antworten, klare nächste Schritte.
Dies ist ein Produktionsserver. Keine Systemeinstellungen, Firewall, SSH oder DNS ändern. Der Benutzer claude hat kein sudo; für Systemänderungen Manuel als administrator um Hilfe bitten.
Zugangsdaten, Passwörter, API-Schlüssel, Zahlungen und Konten sind Manuels Sache: nie danach fragen, nie in Repos oder Chats schreiben (nur in .env-Dateien, die nicht ins Repo kommen).
Jedes Projekt liegt in ~/projects/<name> und hat eine eigene CLAUDE.md mit den Regeln für dieses Projekt. Immer zuerst diese lesen.
Änderungen mit Außenwirkung (git push, Veröffentlichen, Geld, Nachrichten) nur nach ausdrücklicher Freigabe von Manuel.
EOF

mk() { # name beschreibung
  local d="$P/$1"
  mkdir -p "$d"
  [ -d "$d/.git" ] || git -C "$d" init -q
  [ -f "$d/README.md" ] || printf '# %s\n\n%s\n' "$1" "$2" > "$d/README.md"
  [ -f "$d/.gitignore" ] || printf '.env\n.env.*\n*.key\nsecrets/\ndata/\nlogs/\nnode_modules/\n__pycache__/\n*.log\n' > "$d/.gitignore"
}
keep() { for x in "$@"; do mkdir -p "$x"; [ -e "$x/.gitkeep" ] || touch "$x/.gitkeep"; done; }

# 3) Jarvis
mk jarvis "Persönlicher KI-Assistent von Manuel (Aufgaben, Erinnerungen, Automatisierungen)."
( cd "$P/jarvis" && keep docs src config skills data logs )
[ -f "$P/jarvis/CLAUDE.md" ] || cat > "$P/jarvis/CLAUDE.md" <<'EOF'
# Jarvis – persönlicher Assistent
Ziel: Manuels eigener KI-Assistent auf dem Server (Aufgaben, Erinnerungen, Automatisierung rund um seine Projekte).
Status: Ideenphase. Zuerst docs/konzept.md mit Manuel klären (Funktionen, Schnittstellen, Datenschutz), dann bauen.
Regeln: Keine Zugangsdaten im Repo. Persönliche Daten bleiben in data/ (nicht im Repo). Aktionen nach außen nur nach Freigabe.
Ordner: docs/ Konzept, src/ Code, config/ Einstellungen ohne Geheimnisse, skills/ Fähigkeiten, data/ lokale Daten, logs/.
EOF

# 4) Trading-Bot
mk tradingbot "Vollautomatischer Trading-Bot mit Langzeitdiagnose (läuft rund um die Uhr auf dem Server)."
( cd "$P/tradingbot" && keep docs src/strategies src/data src/risk src/execution config backtests reports tests data logs )
[ -f "$P/tradingbot/CLAUDE.md" ] || cat > "$P/tradingbot/CLAUDE.md" <<'EOF'
# Tradingbot
Ziel: vollautomatischer Trading-Bot, der rund um die Uhr läuft und über lange Zeit eine Auswertung (Langzeitdiagnose) erstellt.
Regeln (wichtig, es geht um Geld):
1. Standard ist IMMER Papier-Handel (Simulation) bzw. Backtest. Echtgeld-Handel nur, wenn Manuel es für diesen Zeitpunkt ausdrücklich freigibt.
2. Börsen-/Broker-Zugänge und API-Schlüssel nie in Repo, Chat oder Logs. Nur in einer .env, die Manuel selbst anlegt.
3. Eingebaute Schutzfunktionen vor jeder Strategie: Positionsgrößen-Limit, Tagesverlust-Limit, Notaus (Kill-Switch), Plausibilitätsprüfung der Daten.
4. Jede Strategie wird erst mit Backtest und Papier-Handel über einen längeren Zeitraum bewertet. Ergebnisse ehrlich ausweisen, auch Verluste. Keine Gewinn-Versprechen, keine Anlageberatung.
5. Alle Entscheidungen und Orders protokollieren (logs/, reports/) für die Langzeitdiagnose.
Ordner: docs/ Konzept, src/ (strategies, data, risk, execution), config/, backtests/, reports/, tests/, data/ und logs/ (lokal, nicht im Repo).
EOF

# 5) Spiele-App
mk spiele-app "Spiele-App (Idee und Prototyp)."
( cd "$P/spiele-app" && keep docs design src assets tests builds )
[ -f "$P/spiele-app/CLAUDE.md" ] || cat > "$P/spiele-app/CLAUDE.md" <<'EOF'
# Spiele-App
Ziel: Spiele-App von Manuel. Status: Ideenphase. Zuerst docs/konzept.md klären (Genre, Plattform Handy/Web, Spielidee, Umfang), dann Prototyp.
Regeln: Eigene Grafiken und Töne oder frei lizenzierte (Lizenz in assets/LIZENZEN.md notieren). Keine fremden Marken oder Figuren.
Ordner: docs/, design/, src/, assets/, tests/, builds/ (nicht im Repo).
EOF

# 6) Programmierer-Plattform
mk programmierer-plattform "Plattform für Programmierer und Inbetriebnehmer in der Automatisierung (Siemens TIA zuerst, später alle Steuerungen)."
( cd "$P/programmierer-plattform" && keep docs/konzept docs/architektur docs/roadmap plattform/web plattform/backend tools/siemens-tia tools/inbetriebnahme community bezahlfunktionen content tests )
[ -f "$P/programmierer-plattform/CLAUDE.md" ] || cat > "$P/programmierer-plattform/CLAUDE.md" <<'EOF'
# Programmierer-Plattform
Ziel: Plattform für Industrieautomatisierung: Tools für SPS-Programmierer und Inbetriebnehmer, zuerst für Siemens TIA, später für alle Steuerungen. Community für Reichweite, spezielle Funktionen kostenpflichtig.
Status: Struktur angelegt, Planung. Ersten Schritt mit Manuel festlegen (siehe docs/roadmap).
Regeln: Keine Firmen-, Kunden- oder Projektdaten von Manuels Arbeitgeber verwenden. Keine urheberrechtlich geschützten Siemens-Inhalte kopieren, Funktionen eigenständig bauen. Bezahlfunktionen und Konten erst nach Absprache.
Ordner: docs/ (konzept, architektur, roadmap), plattform/ (web, backend), tools/ (siemens-tia, inbetriebnahme), community/, bezahlfunktionen/, content/, tests/.
EOF

# 7) Erster Commit in den neuen Projekten
for n in jarvis tradingbot spiele-app programmierer-plattform; do
  git -C "$P/$n" add -A
  git -C "$P/$n" diff --cached --quiet || git -C "$P/$n" commit -q -m "Projektstruktur angelegt"
done

# 8) Dienstvorlage: ein Remote-Control-Dienst pro Projekt
cat > "$HOME/.config/systemd/user/claude-rc@.service" <<'EOF'
[Unit]
Description=Claude Code Remote Control (%i)
After=network-online.target
Wants=network-online.target

[Service]
WorkingDirectory=%h/projects/%i
ExecStart=%h/.local/bin/claude remote-control
Restart=always
RestartSec=15

[Install]
WantedBy=default.target
EOF
systemctl --user daemon-reload || true
echo; echo "Projekte:"; ls "$P"
