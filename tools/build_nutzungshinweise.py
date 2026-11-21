#!/usr/bin/env python3
"""Erzeugt Nutzungshinweise/Haftungsausschluss (DE+EN) aus dem Impressum-Gerüst und trägt den Footer-Link ein (idempotent)."""
import re, os, glob
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DE = dict(
 file='nutzungshinweise.html', other='/en/terms-of-use.html', imp='impressum.html',
 title='Nutzungshinweise und Haftungsausschluss – 3DToolBox', desc='Nutzungshinweise und Haftungsausschluss für die Werkzeuge von 3DToolBox.',
 crumb_old='Impressum', crumb='Nutzungshinweise', h1='Nutzungshinweise und Haftungsausschluss', other_label='English version',
 body='''
  <p class="lg-updated">Stand: November 2026 · <a href="/en/terms-of-use.html">English version</a></p>
  <p>Die Werkzeuge von 3DToolBox sind kostenlos und wurden mit Sorgfalt erstellt. Für den 3D-Druck gilt aber: Ergebnisse hängen von Drucker, Material, Umgebung und deinen Einstellungen ab. Bitte beachte deshalb Folgendes.</p>

  <h2>1. Richtwerte, keine Zusagen</h2>
  <p>Temperaturen, Druckparameter, Materialangaben, Lexikon-Inhalte und die Ergebnisse der Rechner (zum Beispiel Kosten, Restmengen, Maße) sind Richtwerte nach bestem Wissen. Es gelten immer die Angaben des Filament- und Druckerherstellers. Teste neue Einstellungen mit einem kleinen Probedruck.</p>

  <h2>2. Sicherheit beim 3D-Druck</h2>
  <p>Beim 3D-Druck entstehen heiße Teile, Dämpfe und Brandgefahr. Lasse Drucker nicht unbeaufsichtigt laufen, sorge für gute Belüftung (besonders bei ABS, ASA und Polyamid) und beachte die Sicherheitshinweise deines Herstellers. Gedruckte Teile sind nicht automatisch lebensmittelecht oder für Kinderspielzeug, tragende, elektrische oder medizinische Anwendungen geeignet. Prüfe die Eignung in solchen Fällen selbst.</p>

  <h2>3. Generatoren, Konverter und Dateien</h2>
  <p>Erzeugte oder konvertierte Modelle (STL, 3MF, STEP u. a.) solltest du vor dem Druck prüfen, zum Beispiel Maße, Toleranzen, Passung und Druckbarkeit im Slicer. Wir sichern keine Passgenauigkeit, Festigkeit oder Eignung für einen bestimmten Zweck zu. Deine Dateien und Bilder werden nach Möglichkeit lokal in deinem Browser verarbeitet. Du bist dafür verantwortlich, dass du die Rechte an den Dateien hast, die du verwendest.</p>

  <h2>4. Farbempfehlungen</h2>
  <p>Die Farbvorschläge sind per Farbabstandsberechnung ermittelte Näherungswerte. Bildschirm, Foto, Beleuchtung, Charge und Druckeinstellungen beeinflussen das Ergebnis. Eine exakte Farbübereinstimmung können wir nicht garantieren.</p>

  <h2>5. Händler, Preise und Werbung</h2>
  <p>Links zu Händlern sind Partnerlinks (Werbung). Wenn du darüber bestellst, erhalten wir gegebenenfalls eine Provision, für dich ändert sich der Preis nicht. Über die Händlerlinks verkaufen wir nichts selbst. Preise, Verfügbarkeit, Lieferung und der Kaufvertrag betreffen ausschließlich dich und den Händler. Produktnamen und Sortimentsdaten stammen aus Angaben der Händler und können abweichen oder veraltet sein. Maßgeblich ist immer die Produktseite des Händlers.</p>
  <h3>Druckanfragen bei 3DekoPrint</h3>
  <p>Über „Von 3DekoPrint drucken lassen“ kannst du eine unverbindliche Anfrage stellen. Der angezeigte Preis ist ein Richtpreis aus einer automatischen Schätzung von Material und Druckzeit, zuzüglich Versand und gegebenenfalls Reinigung. Ein Vertrag kommt erst zustande, wenn 3DekoPrint dir ein Angebot schickt und du es annimmst. Es wird keine Umsatzsteuer ausgewiesen (Kleinunternehmerregelung nach § 19 UStG). Eigene Dateien schickst du per E-Mail an 3DekoPrint und bestätigst dabei, dass du die Rechte daran hast. Mehrere Stücke und Versand ins Nicht-EU-Ausland gibt es nur auf Anfrage.</p>

  <h2>6. Marken</h2>
  <p>Marken- und Produktnamen gehören ihren jeweiligen Inhabern. Wir nennen sie nur, um Produkte zu bezeichnen. Es besteht keine Verbindung zu den Herstellern und keine Billigung durch sie.</p>

  <h2>7. Verfügbarkeit und Fehler</h2>
  <p>Die Nutzung ist kostenlos. Einen Anspruch auf ständige Verfügbarkeit oder bestimmte Funktionen gibt es nicht, Änderungen und Einstellungen einzelner Werkzeuge bleiben vorbehalten. Fehler melde bitte an <a href="mailto:info@3dtoolbox.info">info@3dtoolbox.info</a>.</p>

  <h2>8. Haftung</h2>
  <p>Wir haften unbegrenzt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit sowie nach dem Produkthaftungsgesetz. Bei leichter Fahrlässigkeit haften wir nur bei der Verletzung wesentlicher Vertragspflichten (Pflichten, auf deren Einhaltung du regelmäßig vertrauen darfst) und beschränkt auf den vorhersehbaren, typischen Schaden. Im Übrigen ist die Haftung ausgeschlossen. Ergänzend gelten die Hinweise im <a href="/impressum.html">Impressum</a> (Haftung für Inhalte und Links, Urheberrecht).</p>

  <p class="lg-note">Dieser Text wurde nach bestem Wissen erstellt und ersetzt keine rechtliche Beratung.</p>
''')
EN = dict(
 file='en/terms-of-use.html', other='/nutzungshinweise.html', imp='en/impressum.html',
 title='Terms of Use and Disclaimer – 3DToolBox', desc='Terms of use and disclaimer for the tools of 3DToolBox.',
 crumb_old='Legal Notice', crumb='Terms of Use', h1='Terms of Use and Disclaimer', other_label='',
 body='''
  <p class="lg-updated">Last updated: November 2026 · <a href="/nutzungshinweise.html">The German version is legally binding.</a></p>
  <p>The tools on 3DToolBox are free and built with care. In 3D printing, however, results depend on your printer, material, environment and settings. Please note the following.</p>

  <h2>1. Guide values, not guarantees</h2>
  <p>Temperatures, print parameters, material data, lexicon content and calculator results (for example costs, remaining amounts, dimensions) are guide values to the best of our knowledge. The specifications of your filament and printer manufacturer always take precedence. Test new settings with a small trial print.</p>

  <h2>2. Safety when 3D printing</h2>
  <p>3D printing involves hot parts, fumes and a risk of fire. Do not leave printers running unattended, ensure good ventilation (especially for ABS, ASA and polyamide) and follow your manufacturer’s safety instructions. Printed parts are not automatically food safe or suitable for children’s toys or for load-bearing, electrical or medical uses. In such cases, check suitability yourself.</p>

  <h2>3. Generators, converters and files</h2>
  <p>Check generated or converted models (STL, 3MF, STEP and others) before printing, for example dimensions, tolerances, fit and printability in your slicer. We do not guarantee fit, strength or suitability for a particular purpose. Where possible, your files and images are processed locally in your browser. You are responsible for having the rights to the files you use.</p>

  <h2>4. Colour suggestions</h2>
  <p>Colour suggestions are approximations calculated from colour distance. Screen, photo, lighting, batch and print settings affect the result. We cannot guarantee an exact colour match.</p>

  <h2>5. Retailers, prices and advertising</h2>
  <p>Links to retailers are affiliate links (ads). If you order through them we may receive a commission; the price does not change for you. We do not sell anything ourselves through the retailer links. Prices, availability, delivery and the purchase contract concern only you and the retailer. Product names and range data come from retailer information and may differ or be out of date. The retailer’s product page is always authoritative.</p>
  <h3>Print requests to 3DekoPrint</h3>
  <p>Using “Have 3DekoPrint print it” you can send a non-binding request. The price shown is an indicative price from an automatic estimate of material and print time, plus shipping and, if chosen, cleaning. A contract is only concluded when 3DekoPrint sends you a quote and you accept it. No VAT is shown (small-business rule under § 19 UStG). You send your own files to 3DekoPrint by e-mail and confirm that you hold the rights to them. Several pieces and shipping outside the EU are available on request only.</p>

  <h2>6. Trademarks</h2>
  <p>Brand and product names belong to their respective owners. We use them only to identify products. There is no connection to, or endorsement by, the manufacturers.</p>

  <h2>7. Availability and errors</h2>
  <p>Use is free of charge. There is no entitlement to constant availability or to particular features; we reserve the right to change or discontinue individual tools. Please report errors to <a href="mailto:info@3dtoolbox.info">info@3dtoolbox.info</a>.</p>

  <h2>8. Liability</h2>
  <p>We are liable without limit for intent and gross negligence, for injury to life, body or health, and under the Product Liability Act. In cases of slight negligence we are liable only for breach of essential contractual obligations (obligations you can regularly rely on) and limited to the foreseeable, typical damage. Liability is otherwise excluded. The notes in the <a href="/en/impressum.html">Legal Notice</a> (liability for content and links, copyright) apply in addition.</p>

  <p class="lg-note">This text was prepared to the best of our knowledge and does not replace legal advice.</p>
''')
for C, src, lang in ((DE, 'impressum.html', 'de'), (EN, 'en/impressum.html', 'en')):
    h = open(os.path.join(R, src), encoding='utf-8').read()
    h = re.sub(r'<title>.*?</title>', '<title>%s</title>' % C['title'], h, 1)
    h = re.sub(r'(<link rel="canonical" href="https://3dtoolbox.info/)[^"]*(")', r'\g<1>%s\2' % C['file'], h, 1)
    h = re.sub(r'(<meta name="description" content=")[^"]*(")', r'\g<1>%s\2' % C['desc'], h, 1)
    h = h.replace('<li><span aria-current="page">%s</span></li>' % C['crumb_old'], '<li><span aria-current="page">%s</span></li>' % C['crumb'])
    h = re.sub(r'(<a class="fm-lang-link" href=")[^"]*(")', r'\g<1>%s\2' % C['other'], h, 1)
    a = h.index('<h1>'); b = h.index('</main>')
    h = h[:a] + '<h1>%s</h1>' % C['h1'] + C['body'] + '  ' + h[b:]
    open(os.path.join(R, C['file']), 'w', encoding='utf-8').write(h)
# Footer-Link (idempotent)
LINK = {'de': ('<a href="/datenschutz.html">Datenschutz</a>', '<a href="/nutzungshinweise.html">Nutzungshinweise</a>', '/nutzungshinweise.html'),
        'en': ('<a href="/en/datenschutz.html">Privacy Policy</a>', '<a href="/en/terms-of-use.html">Terms of Use</a>', '/en/terms-of-use.html')}
n = 0
for f in glob.glob(R + '/**/*.html', recursive=True):
    if '/node_modules/' in f or '/.git/' in f: continue
    h = open(f, encoding='utf-8').read()
    lg = 'en' if '<html lang="en"' in h else 'de'
    anchor, new, key = LINK[lg]
    if 'tb-foot-legal' not in h or ('href="%s"' % key) in h: continue
    h2 = h.replace(anchor + '</p>', anchor + '<span aria-hidden="true">·</span>' + new + '</p>', 1)
    if h2 != h: open(f, 'w', encoding='utf-8').write(h2); n += 1
print('Footer ergänzt in', n, 'Dateien')
