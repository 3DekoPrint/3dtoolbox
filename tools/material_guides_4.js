// Batch 4: HT-PLA, LW-PLA, METAL, PA-GF, PET-CF, GLOW, HIGH
const mk = (de, en) => ({ de, en });
module.exports = {
  'ht-pla': mk(
    { probs: 'Typische Probleme beim Drucken von HT-PLA und was hilft', items: [
      ['Hitzebeständigkeit erst nach dem Tempern', 'Viele HT-PLA-Sorten erreichen ihre höhere Wärmeformbeständigkeit erst nach dem Tempern im Ofen. Die Vorgaben des Herstellers beachten, denn dabei können sich Teile verziehen oder schrumpfen.'],
      ['Maßänderung beim Tempern', 'Teile ändern beim Tempern oft leicht ihre Maße. Bei Passungen Übermaß einplanen und mit einem Testteil prüfen.'],
      ['Verstopfung und Fäden', 'Filament trocknen und die Temperatur laut Herstellerangabe wählen.'],
      ['Sprödigkeit', 'Getempertes HT-PLA kann spröder werden.']
    ], when: 'Wann HT-PLA die richtige Wahl ist', whenText: 'HT-PLA ist eine Option, wenn PLA zu weich bei Wärme ist, du aber keinen geschlossenen Drucker für ABS oder ASA hast. Die genauen Werte unterscheiden sich je nach Hersteller.' },
    { probs: 'Common problems when printing HT-PLA and what helps', items: [
      ['Heat resistance only after annealing', 'Many HT-PLA types reach their higher heat deflection only after annealing in an oven. Follow the manufacturer’s instructions, as parts can warp or shrink in the process.'],
      ['Dimensions change when annealing', 'Parts often change size slightly when annealed. Allow extra material for fits and check with a test part.'],
      ['Clogs and strings', 'Dry the filament and choose the temperature according to the manufacturer.'],
      ['Brittleness', 'Annealed HT-PLA can become more brittle.']
    ], when: 'When HT-PLA is the right choice', whenText: 'HT-PLA is an option if PLA is too soft in heat but you have no enclosed printer for ABS or ASA. Exact values differ between manufacturers.' }),
  'lw-pla': mk(
    { probs: 'Typische Probleme beim Drucken von LW-PLA und was hilft', items: [
      ['Temperatur bestimmt die Dichte', 'Leichtes PLA schäumt bei höherer Temperatur stärker auf. Die Herstellerangaben beachten und mit einem Testdruck die gewünschte Dichte einstellen.'],
      ['Fluss anpassen', 'Der Fluss muss je nach Temperatur deutlich reduziert werden, sonst wird das Teil überextrudiert.'],
      ['Fäden und Düsenverstopfung', 'Retraction anpassen und Filament trocknen. Nicht lange heiß stehen lassen.'],
      ['Geringere Festigkeit', 'Geschäumte Teile sind weniger fest und weniger maßgenau.']
    ], when: 'Wann LW-PLA die richtige Wahl ist', whenText: 'LW-PLA eignet sich für leichte Teile wie Flugzeugmodelle und Drohnen, bei denen Gewicht wichtiger ist als Festigkeit.' },
    { probs: 'Common problems when printing LW-PLA and what helps', items: [
      ['Temperature sets the density', 'Lightweight PLA foams more at higher temperatures. Follow the manufacturer’s values and use a test print to set the density you want.'],
      ['Adjust the flow', 'Flow must be reduced noticeably depending on temperature, otherwise the part is over-extruded.'],
      ['Strings and nozzle clogs', 'Adjust retraction and dry the filament. Do not leave it heated for long.'],
      ['Lower strength', 'Foamed parts are less strong and less dimensionally accurate.']
    ], when: 'When LW-PLA is the right choice', whenText: 'LW-PLA suits lightweight parts such as model aircraft and drones, where weight matters more than strength.' }),
  'metal': mk(
    { probs: 'Typische Probleme beim Drucken von Metall-Filament und was hilft', items: [
      ['Verschleiß an der Düse', 'Metallpartikel schleifen Messingdüsen ab. Eine gehärtete Düse verwenden.'],
      ['Hohes Gewicht und Sprödigkeit', 'Die Teile sind schwerer und oft spröder als reines PLA. Auf dünne Stege verzichten.'],
      ['Verstopfung', 'Düsen ab 0,4 mm verwenden und nicht zu langsam drucken.'],
      ['Metalloptik nur nach Nachbearbeitung', 'Erst durch Schleifen und Polieren entsteht der metallische Glanz.']
    ], when: 'Wann Metall-Filament die richtige Wahl ist', whenText: 'Metall-Filament ist vor allem für Optik und Haptik gedacht, etwa für Deko, Modelle und Gehäuse. Die Teile sind kein echtes Metall und nicht tragfähiger als das Trägermaterial.' },
    { probs: 'Common problems when printing metal filament and what helps', items: [
      ['Nozzle wear', 'Metal particles wear brass nozzles. Use a hardened nozzle.'],
      ['High weight and brittleness', 'Parts are heavier and often more brittle than plain PLA. Avoid thin ribs.'],
      ['Clogging', 'Use nozzles of 0.4 mm or larger and do not print too slowly.'],
      ['Metal look only after finishing', 'The metallic shine appears only after sanding and polishing.']
    ], when: 'When metal filament is the right choice', whenText: 'Metal filament is mainly for look and feel, for example decoration, models and enclosures. The parts are not real metal and no stronger than the base material.' }),
  'pa-gf': mk(
    { probs: 'Typische Probleme beim Drucken von PA-GF und was hilft', items: [
      ['Verschleiß an der Düse', 'Glasfasern sind sehr abrasiv. Eine gehärtete Düse ist Pflicht.'],
      ['Feuchtigkeit', 'Nylon nimmt schnell Feuchtigkeit auf. Gründlich trocknen und trocken lagern, am besten auch während des Drucks.'],
      ['Warping', 'Geschlossener Bauraum, heißes Bett und Brim verwenden.'],
      ['Raue Oberfläche', 'Glasfasern machen die Oberfläche rau. Das ist normal.']
    ], when: 'Wann PA-GF die richtige Wahl ist', whenText: 'PA-GF ist steif, fest und hitzebeständig und eignet sich für technische Teile unter Last. Es ist ein Material für erfahrene Anwender mit geeignetem Drucker.' },
    { probs: 'Common problems when printing PA-GF and what helps', items: [
      ['Nozzle wear', 'Glass fibres are very abrasive. A hardened nozzle is a must.'],
      ['Moisture', 'Nylon absorbs moisture quickly. Dry it thoroughly and store it dry, ideally during printing too.'],
      ['Warping', 'Use an enclosed chamber, a hot bed and a brim.'],
      ['Rough surface', 'Glass fibres make the surface rough. This is normal.']
    ], when: 'When PA-GF is the right choice', whenText: 'PA-GF is stiff, strong and heat-resistant and suits technical parts under load. It is a material for experienced users with a suitable printer.' }),
  'pet-cf': mk(
    { probs: 'Typische Probleme beim Drucken von PET-CF und was hilft', items: [
      ['Verschleiß an der Düse', 'Kohlefasern schleifen Messingdüsen ab. Eine gehärtete Düse verwenden.'],
      ['Feuchtigkeit', 'Das Filament nimmt Feuchtigkeit auf. Vor dem Druck trocknen.'],
      ['Haftung', 'Auf PEI haftet es meist gut. Ein Trennmittel schützt die Platte.'],
      ['Verstopfung', 'Nicht zu schnell drucken und Düsen ab 0,4 mm verwenden.']
    ], when: 'Wann PET-CF die richtige Wahl ist', whenText: 'PET-CF ist steif und maßhaltig und bleibt dabei besser druckbar als Nylon mit Fasern. Es eignet sich für Halterungen und mechanische Teile.' },
    { probs: 'Common problems when printing PET-CF and what helps', items: [
      ['Nozzle wear', 'Carbon fibres wear brass nozzles. Use a hardened nozzle.'],
      ['Moisture', 'The filament absorbs moisture. Dry it before printing.'],
      ['Adhesion', 'It usually sticks well to PEI. A release agent protects the plate.'],
      ['Clogging', 'Do not print too fast and use nozzles of 0.4 mm or larger.']
    ], when: 'When PET-CF is the right choice', whenText: 'PET-CF is stiff and dimensionally stable and stays easier to print than fibre-filled nylon. It suits brackets and mechanical parts.' }),
  'glow': mk(
    { probs: 'Typische Probleme beim Drucken von Glow-Filament und was hilft', items: [
      ['Verschleiß an der Düse', 'Die Leuchtpigmente sind abrasiv. Eine gehärtete Düse verwenden.'],
      ['Verstopfung', 'Düsen ab 0,4 mm verwenden und nicht zu langsam drucken.'],
      ['Schwaches Leuchten', 'Dicke Wände leuchten länger und stärker. Das Teil vorher mit hellem Licht aufladen.'],
      ['Geringere Festigkeit', 'Die Pigmente machen das Material etwas spröder.']
    ], when: 'Wann Glow-Filament die richtige Wahl ist', whenText: 'Glow-Filament eignet sich für Deko, Spielzeug und Markierungen im Dunkeln. Für belastete Teile ist es weniger geeignet.' },
    { probs: 'Common problems when printing glow filament and what helps', items: [
      ['Nozzle wear', 'The glow pigments are abrasive. Use a hardened nozzle.'],
      ['Clogging', 'Use nozzles of 0.4 mm or larger and do not print too slowly.'],
      ['Weak glow', 'Thick walls glow longer and brighter. Charge the part with bright light first.'],
      ['Lower strength', 'The pigments make the material slightly more brittle.']
    ], when: 'When glow filament is the right choice', whenText: 'Glow filament suits decoration, toys and markings in the dark. It is less suited to loaded parts.' }),
  'high': mk(
    { probs: 'Typische Probleme beim Drucken von High-Speed-Filament und was hilft', items: [
      ['Nur schnell mit passendem Drucker', 'High-Speed-Filament fließt bei hoher Temperatur gut. Es braucht einen Drucker mit genügend Heizleistung und einem Hotend mit hohem Durchsatz.'],
      ['Maximalen Durchfluss nicht überschreiten', 'Die Geschwindigkeit ist durch den maximalen volumetrischen Fluss begrenzt. Diesen mit einem Test ermitteln und im Slicer eintragen.'],
      ['Qualität bei hoher Geschwindigkeit', 'Vibrationen können Ringing erzeugen. Beschleunigung anpassen und Kühlung erhöhen.'],
      ['Trocknen', 'Auch dieses Filament sollte trocken sein, sonst gibt es Fäden und Blasen.']
    ], when: 'Wann High-Speed-Filament die richtige Wahl ist', whenText: 'High-Speed-Filament lohnt sich auf schnellen Druckern, wenn du viele Teile oder große Teile in kurzer Zeit drucken willst. Auf langsamen Druckern bringt es kaum Vorteile.' },
    { probs: 'Common problems when printing high-speed filament and what helps', items: [
      ['Only fast with a suitable printer', 'High-speed filament flows well at high temperature. It needs a printer with enough heating power and a high-flow hotend.'],
      ['Do not exceed the maximum flow', 'Speed is limited by the maximum volumetric flow. Determine it with a test and enter it in the slicer.'],
      ['Quality at high speed', 'Vibration can cause ringing. Adjust acceleration and increase cooling.'],
      ['Drying', 'This filament should also be dry, otherwise you get strings and bubbles.']
    ], when: 'When high-speed filament is the right choice', whenText: 'High-speed filament pays off on fast printers when you want to print many or large parts in a short time. On slow printers it brings hardly any benefit.' })
};
