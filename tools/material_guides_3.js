// Batch 3: PLA+, SILK, MATTE, PLA-CF, PETG-CF, TPU-SOFT, PA-CF, WOOD
const mk = (de, en) => ({ de, en });
module.exports = {
  'pla-plus': mk(
    { probs: 'Typische Probleme beim Drucken von PLA+ und was hilft', items: [
      ['Fäden und Tropfen', 'PLA+ stringt oft etwas stärker als normales PLA. Filament trocknen, Temperatur leicht senken und die Retraction anpassen.'],
      ['Temperatur je Hersteller', 'Die Mischungen unterscheiden sich je nach Hersteller. Die Angaben auf der Spule sind der beste Startpunkt, danach mit einem Temperaturturm feinjustieren.'],
      ['Teil löst sich vom Bett', 'Platte reinigen und die erste Schicht langsam und mit etwas mehr Abstand-Quetschung drucken.'],
      ['Weichwerden bei Wärme', 'Auch PLA+ bleibt bei etwa 55 bis 60 °C nicht formstabil. Für Teile im Auto oder in der Sonne ist es nicht geeignet.']
    ], when: 'Wann PLA+ die richtige Wahl ist', whenText: 'PLA+ ist meist etwas zäher und weniger spröde als einfaches PLA und druckt sich ähnlich einfach. Es eignet sich für Alltagsteile, Halterungen und Prototypen, die ein wenig mehr aushalten sollen.' },
    { probs: 'Common problems when printing PLA+ and what helps', items: [
      ['Strings and blobs', 'PLA+ often strings a little more than regular PLA. Dry the filament, lower the temperature slightly and adjust retraction.'],
      ['Temperature varies by brand', 'Blends differ between manufacturers. The values on the spool are the best starting point; fine-tune them with a temperature tower.'],
      ['The part detaches from the bed', 'Clean the plate and print the first layer slowly with a bit more squish.'],
      ['Softening in heat', 'PLA+ also loses its shape at around 55 to 60 °C. It is not suitable for parts in a car or in the sun.']
    ], when: 'When PLA+ is the right choice', whenText: 'PLA+ is usually a bit tougher and less brittle than plain PLA and is just as easy to print. It suits everyday parts, brackets and prototypes that need to take a little more.' }),
  'silk': mk(
    { probs: 'Typische Probleme beim Drucken von Silk-PLA und was hilft', items: [
      ['Düsenverstopfung und unregelmäßiger Fluss', 'Silk-Filamente brauchen meist etwas höhere Temperaturen und langsamere Geschwindigkeiten. Zu schnelles Drucken führt zu Unterextrusion.'],
      ['Sichtbare Schichtlinien und Fehler', 'Der Glanz betont jede Unregelmäßigkeit. Feine Schichthöhen, langsame Außenwände und gut trockenes Filament geben das beste Ergebnis.'],
      ['Geringere Festigkeit', 'Silk-PLA ist oft spröder und hat eine schwächere Schichthaftung als normales PLA. Für belastete Teile ist es nicht ideal.'],
      ['Überhänge und Brücken', 'Silk lässt sich oft schlechter überbrücken. Kühlung erhöhen, Geschwindigkeit senken und Supports einplanen.']
    ], when: 'Wann Silk-PLA die richtige Wahl ist', whenText: 'Silk-PLA hat eine glänzende, metallisch wirkende Oberfläche und eignet sich für Deko, Vasen, Figuren und Geschenke. Für mechanisch belastete Teile nimmt man besser normales PLA, PLA+ oder PETG.' },
    { probs: 'Common problems when printing silk PLA and what helps', items: [
      ['Nozzle clogs and uneven flow', 'Silk filaments usually need slightly higher temperatures and slower speeds. Printing too fast leads to under-extrusion.'],
      ['Visible layer lines and flaws', 'The shine highlights every irregularity. Fine layer heights, slow outer walls and well-dried filament give the best result.'],
      ['Lower strength', 'Silk PLA is often more brittle and has weaker layer adhesion than regular PLA. It is not ideal for loaded parts.'],
      ['Overhangs and bridges', 'Silk often bridges worse. Increase cooling, reduce speed and plan supports.']
    ], when: 'When silk PLA is the right choice', whenText: 'Silk PLA has a glossy, metallic-looking surface and suits decoration, vases, figurines and gifts. For mechanically loaded parts use regular PLA, PLA+ or PETG instead.' }),
  'matte': mk(
    { probs: 'Typische Probleme beim Drucken von Matte-PLA und was hilft', items: [
      ['Fehler fallen kaum auf, Maße schon', 'Die matte Oberfläche versteckt Schichtlinien gut. Prüfe Maße und Passungen trotzdem separat.'],
      ['Fäden und Fusseln', 'Bei Bedarf Filament trocknen und die Retraction anpassen.'],
      ['Empfindlich gegen Fingerabdrücke', 'Matte Flächen zeigen Fett und Kratzer schneller. Teile sauber handhaben und nicht mit Lösungsmitteln reinigen.'],
      ['Weichwerden bei Wärme', 'Wie anderes PLA verformt sich Matte-PLA bei etwa 55 bis 60 °C.']
    ], when: 'Wann Matte-PLA die richtige Wahl ist', whenText: 'Matte-PLA liefert eine ruhige, hochwertig wirkende Oberfläche ohne Glanz. Es eignet sich für Gehäuse, Modelle und Sichtteile, bei denen Schichtlinien weniger auffallen sollen.' },
    { probs: 'Common problems when printing matte PLA and what helps', items: [
      ['Flaws are hidden, dimensions are not', 'The matte surface hides layer lines well. Still check dimensions and fits separately.'],
      ['Strings and fuzz', 'Dry the filament if needed and adjust retraction.'],
      ['Sensitive to fingerprints', 'Matte surfaces show grease and scratches more easily. Handle parts cleanly and do not clean them with solvents.'],
      ['Softening in heat', 'Like other PLA, matte PLA deforms at around 55 to 60 °C.']
    ], when: 'When matte PLA is the right choice', whenText: 'Matte PLA gives a calm, high-quality surface without gloss. It suits enclosures, models and visible parts where layer lines should be less noticeable.' }),
  'pla-cf': mk(
    { probs: 'Typische Probleme beim Drucken von PLA-CF und was hilft', items: [
      ['Verschleiß an der Düse', 'Kohlefasern schleifen Messingdüsen schnell ab. Eine gehärtete Düse (Stahl oder Hartmetall) verwenden.'],
      ['Verstopfung', 'Größere Düsendurchmesser ab 0,4 mm, nicht zu schnell drucken und die Temperatur nicht zu niedrig wählen.'],
      ['Spröde Teile', 'Die Fasern machen das Teil steifer, aber nicht zäher. Dünne Teile und Gewinde brechen leichter.'],
      ['Matte, raue Oberfläche', 'Das ist normal. Fasern geben der Oberfläche ein mattes Aussehen.']
    ], when: 'Wann PLA-CF die richtige Wahl ist', whenText: 'PLA-CF ist steifer und verzieht sich weniger als normales PLA und hat ein mattes Finish. Es passt für maßhaltige Teile, Vorrichtungen und Drohnenrahmen. Die Hitzebeständigkeit bleibt wie bei PLA niedrig.' },
    { probs: 'Common problems when printing PLA-CF and what helps', items: [
      ['Nozzle wear', 'Carbon fibres wear brass nozzles quickly. Use a hardened nozzle (steel or tungsten carbide).'],
      ['Clogging', 'Use nozzle diameters of 0.4 mm or larger, do not print too fast and do not set the temperature too low.'],
      ['Brittle parts', 'The fibres make the part stiffer but not tougher. Thin sections and threads break more easily.'],
      ['Matt, rough surface', 'This is normal. The fibres give the surface a matt look.']
    ], when: 'When PLA-CF is the right choice', whenText: 'PLA-CF is stiffer and warps less than regular PLA and has a matt finish. It suits dimensionally accurate parts, fixtures and drone frames. Heat resistance remains low, as with PLA.' }),
  'petg-cf': mk(
    { probs: 'Typische Probleme beim Drucken von PETG-CF und was hilft', items: [
      ['Verschleiß an der Düse', 'Kohlefasern schleifen Messingdüsen schnell ab. Eine gehärtete Düse verwenden.'],
      ['Feuchtigkeit', 'PETG-CF nimmt Feuchtigkeit auf und druckt dann mit Fäden und Blasen. Vor dem Druck trocknen.'],
      ['Haftung auf der Platte', 'Auf PEI-Platten haftet es oft sehr gut. Ein Trennmittel (z. B. Klebestift) schützt die Platte beim Ablösen.'],
      ['Verstopfung', 'Nicht zu schnell drucken und Düsen ab 0,4 mm verwenden.']
    ], when: 'Wann PETG-CF die richtige Wahl ist', whenText: 'PETG-CF ist steifer als PETG und bleibt dabei besser druckbar als viele technische Materialien. Es eignet sich für Halterungen, Gehäuse und mechanische Teile mit etwas höherer Anforderung.' },
    { probs: 'Common problems when printing PETG-CF and what helps', items: [
      ['Nozzle wear', 'Carbon fibres wear brass nozzles quickly. Use a hardened nozzle.'],
      ['Moisture', 'PETG-CF absorbs moisture and then prints with strings and bubbles. Dry it before printing.'],
      ['Bed adhesion', 'It often sticks very well to PEI plates. A release agent (e.g. glue stick) protects the plate when removing the part.'],
      ['Clogging', 'Do not print too fast and use nozzles of 0.4 mm or larger.']
    ], when: 'When PETG-CF is the right choice', whenText: 'PETG-CF is stiffer than PETG and stays easier to print than many engineering materials. It suits brackets, enclosures and mechanical parts with somewhat higher demands.' }),
  'tpu-soft': mk(
    { probs: 'Typische Probleme beim Drucken von weichem TPU und was hilft', items: [
      ['Filament staut sich', 'Sehr weiches TPU knickt leicht. Sehr langsam drucken, einen Direct-Drive-Extruder verwenden und den Filamentweg eng führen.'],
      ['Feuchtigkeit', 'Feuchtes TPU stringt und blubbert. Vor dem Druck trocknen.'],
      ['Retraction', 'Wenig oder keine Retraction verwenden, sonst staut sich das Filament.'],
      ['Schwer zu entfernen', 'Weiche Teile haften auf manchen Platten sehr gut. Ein Trennmittel verwenden.']
    ], when: 'Wann weiches TPU die richtige Wahl ist', whenText: 'Weiches TPU eignet sich für sehr flexible Teile wie Dichtungen, Griffe und Stoßdämpfer. Für Einsteiger ist ein festeres TPU leichter zu drucken.' },
    { probs: 'Common problems when printing soft TPU and what helps', items: [
      ['Filament jams', 'Very soft TPU buckles easily. Print very slowly, use a direct-drive extruder and keep the filament path tight.'],
      ['Moisture', 'Damp TPU strings and bubbles. Dry it before printing.'],
      ['Retraction', 'Use little or no retraction, otherwise the filament jams.'],
      ['Hard to remove', 'Soft parts stick very well to some plates. Use a release agent.']
    ], when: 'When soft TPU is the right choice', whenText: 'Soft TPU suits very flexible parts such as seals, grips and shock absorbers. For beginners a firmer TPU is easier to print.' }),
  'pa-cf': mk(
    { probs: 'Typische Probleme beim Drucken von PA-CF und was hilft', items: [
      ['Feuchtigkeit', 'Nylon nimmt sehr schnell Feuchtigkeit auf. Gründlich trocknen und trocken lagern, am besten auch während des Drucks.'],
      ['Verschleiß an der Düse', 'Kohlefasern schleifen Messingdüsen ab. Eine gehärtete Düse verwenden.'],
      ['Hohe Temperaturen und Warping', 'PA-CF braucht hohe Düsen- und Betttemperaturen. Ein geschlossener Bauraum und ein Brim helfen gegen Verzug.'],
      ['Haftung auf der Platte', 'Eine für Nylon geeignete Platte oder Klebestift verwenden.']
    ], when: 'Wann PA-CF die richtige Wahl ist', whenText: 'PA-CF ist steif, fest und hitzebeständiger als PA ohne Fasern. Es eignet sich für anspruchsvolle technische Teile. Es ist ein Material für erfahrene Anwender mit geeignetem Drucker.' },
    { probs: 'Common problems when printing PA-CF and what helps', items: [
      ['Moisture', 'Nylon absorbs moisture very quickly. Dry it thoroughly and store it dry, ideally during printing too.'],
      ['Nozzle wear', 'Carbon fibres wear brass nozzles. Use a hardened nozzle.'],
      ['High temperatures and warping', 'PA-CF needs high nozzle and bed temperatures. An enclosed chamber and a brim help against warping.'],
      ['Bed adhesion', 'Use a plate suitable for nylon or glue stick.']
    ], when: 'When PA-CF is the right choice', whenText: 'PA-CF is stiff, strong and more heat-resistant than PA without fibres. It suits demanding technical parts. It is a material for experienced users with a suitable printer.' }),
  'wood': mk(
    { probs: 'Typische Probleme beim Drucken von Holz-Filament und was hilft', items: [
      ['Düsenverstopfung', 'Holzpartikel können kleine Düsen verstopfen. Düsen ab 0,4 mm verwenden und nicht zu langsam drucken.'],
      ['Verbrennen in der Düse', 'Bei zu hoher Temperatur oder langem Stillstand verkohlt das Holz. Temperatur nicht zu hoch wählen und die Düse nicht lange heiß stehen lassen.'],
      ['Raue Oberfläche', 'Das ist typisch. Teile lassen sich schleifen und lackieren oder ölen.'],
      ['Fäden', 'Filament trocknen und die Retraction anpassen.']
    ], when: 'Wann Holz-Filament die richtige Wahl ist', whenText: 'Holz-Filament gibt Teilen ein natürliches Aussehen und lässt sich gut nachbearbeiten. Es eignet sich für Deko, Modelle und Gehäuse. Mechanisch ist es meist schwächer und spröder als normales PLA.' },
    { probs: 'Common problems when printing wood filament and what helps', items: [
      ['Nozzle clogs', 'Wood particles can clog small nozzles. Use nozzles of 0.4 mm or larger and do not print too slowly.'],
      ['Burning in the nozzle', 'The wood carbonises if it is too hot or sits idle for long. Do not set the temperature too high and do not leave the nozzle hot for long.'],
      ['Rough surface', 'This is typical. Parts can be sanded and painted or oiled.'],
      ['Strings', 'Dry the filament and adjust retraction.']
    ], when: 'When wood filament is the right choice', whenText: 'Wood filament gives parts a natural look and finishes well. It suits decoration, models and enclosures. Mechanically it is usually weaker and more brittle than regular PLA.' })
};
