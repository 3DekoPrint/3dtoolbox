// Eigene Praxis-Abschnitte für Materialseiten (DE+EN). Wird von tools/add_material_guides.js eingefügt.
// Aussagen bewusst konservativ und allgemein anerkannt; konkrete Zahlen stehen in der Materialdatenbank.
module.exports = {
  'pla': {
    de: { probs: 'Typische Probleme beim Drucken von PLA und was hilft', items: [
      ['Teile verformen sich in der Wärme', 'PLA wird schon ab etwa 55–60 °C weich. Ein Teil im Auto hinter der Scheibe, auf der Heizung oder in der Sonne kann sich verziehen. Für Wärme eignen sich PETG, ASA oder temperaturfestere PLA-Sorten wie HT-PLA.'],
      ['Fäden zwischen den Teilen (Stringing)', 'Die Düsentemperatur um 5–10 °C senken, den Retraction-Weg prüfen und feuchtes Filament trocknen. Ein Temperaturturm zeigt dir, wo dein Filament am saubersten druckt.'],
      ['Überhänge und Kanten sehen wellig aus', 'PLA liebt Kühlung. Den Bauteillüfter ab der zweiten Schicht hoch einstellen und die Geschwindigkeit der Außenwände und Überhänge verringern.'],
      ['Die erste Schicht haftet schlecht', 'Die Platte mit Spülmittel oder Isopropanol entfetten, den Abstand der ersten Schicht (Z-Offset) kalibrieren und die Betttemperatur im empfohlenen Bereich halten. Fingerabdrücke auf der Platte sind eine häufige Ursache.']
    ], when: 'Wann PLA die richtige Wahl ist', whenText: 'PLA ist ideal für Prototypen, Modelle, Dekoration und alles, was nicht warm oder dauerhaft im Freien liegt. Es ist einfach zu drucken und sehr maßhaltig. Ungeeignet ist es für Teile, die dauerhaft über etwa 55 °C kommen, für den dauerhaften Außeneinsatz mit Sonne und für stark stoßbelastete Teile. Ein Druck aus PLA ist nicht automatisch lebensmittelecht, auch wenn das Rohmaterial es ist: Spalten zwischen den Schichten sind schwer zu reinigen.' },
    en: { probs: 'Common problems when printing PLA and what helps', items: [
      ['Parts deform in heat', 'PLA starts to soften at around 55–60 °C. A part in a car behind the windscreen, on a radiator or in direct sun can warp. For heat, use PETG, ASA or more heat-resistant PLA types such as HT-PLA.'],
      ['Strings between parts (stringing)', 'Lower the nozzle temperature by 5–10 °C, check the retraction distance and dry damp filament. A temperature tower shows where your filament prints cleanest.'],
      ['Overhangs and edges look wavy', 'PLA likes cooling. Set the part cooling fan high from the second layer on and reduce the speed of outer walls and overhangs.'],
      ['The first layer does not stick', 'Degrease the plate with dish soap or isopropanol, calibrate the first-layer height (Z offset) and keep the bed temperature in the recommended range. Fingerprints on the plate are a common cause.']
    ], when: 'When PLA is the right choice', whenText: 'PLA is ideal for prototypes, models, decoration and anything that will not get hot or sit outdoors permanently. It is easy to print and very dimensionally accurate. It is a poor choice for parts that regularly exceed about 55 °C, for permanent outdoor use in the sun and for parts under heavy impact. A PLA print is not automatically food safe even though the raw material may be: gaps between layers are hard to clean.' }
  },
  'petg': {
    de: { probs: 'Typische Probleme beim Drucken von PETG und was hilft', items: [
      ['Fäden und kleine Klümpchen', 'PETG neigt zu Stringing. Filament vor dem Druck trocknen, die Düse 5–10 °C kühler einstellen und Retraction sowie Fahrgeschwindigkeit anpassen.'],
      ['Haftet zu stark auf glattem PEI', 'PETG kann sich so fest mit glattem PEI verbinden, dass beim Ablösen Material von der Platte reißt. Ein Trennmittel wie Klebestift zwischen Teil und Platte oder eine texturierte Platte schützen sie.'],
      ['Überhänge und Brücken wirken schlechter als bei PLA', 'Zu viel Kühlung schwächt die Schichthaftung, zu wenig verschmiert Überhänge. Mäßige Kühlung und langsamere Überhänge sind meist der beste Kompromiss.'],
      ['Support lässt sich schwer entfernen', 'Der Support verbindet sich fest mit dem Teil. Den Abstand zwischen Support und Teil (Z-Distanz) etwas größer wählen.']
    ], when: 'Wann PETG die richtige Wahl ist', whenText: 'PETG ist ein guter Allrounder für Funktionsteile, Behälter, Halterungen und Teile, die Feuchtigkeit oder leichte Chemikalien aushalten sollen. Es ist zäher als PLA und leichter zu drucken als ABS oder ASA. Weniger geeignet ist es für sehr feine, kratzfeste Oberflächen und für Teile, die dauerhaft über etwa 70 °C warm werden.' },
    en: { probs: 'Common problems when printing PETG and what helps', items: [
      ['Strings and small blobs', 'PETG tends to string. Dry the filament before printing, lower the nozzle by 5–10 °C and adjust retraction and travel speed.'],
      ['Sticks too strongly to smooth PEI', 'PETG can bond to smooth PEI so firmly that material tears from the plate when you remove the part. A release agent such as glue stick between part and plate, or a textured plate, protects it.'],
      ['Overhangs and bridges look worse than with PLA', 'Too much cooling weakens layer adhesion, too little smears overhangs. Moderate cooling and slower overhangs are usually the best compromise.'],
      ['Supports are hard to remove', 'Supports bond firmly to the part. Choose a slightly larger gap between support and part (Z distance).']
    ], when: 'When PETG is the right choice', whenText: 'PETG is a good all-rounder for functional parts, containers, brackets and parts that need to resist moisture or mild chemicals. It is tougher than PLA and easier to print than ABS or ASA. It is less suited to very fine, scratch-resistant surfaces and to parts that regularly exceed about 70 °C.' }
  },
  'asa': {
    de: { probs: 'Typische Probleme beim Drucken von ASA und was hilft', items: [
      ['Teile verziehen sich oder reißen zwischen den Schichten', 'ASA schrumpft beim Abkühlen. Ein geschlossener Bauraum, kein Luftzug, eine heiße Druckplatte, ein Brim und wenig bis keine Bauteilkühlung verringern Warping und Schichtrisse.'],
      ['Geruch und Dämpfe', 'Beim Drucken von ASA entstehen Dämpfe. Drucke in einem gut belüfteten Raum oder in einem Gehäuse mit Abluft und halte dich nicht dauerhaft neben dem laufenden Drucker auf.'],
      ['Schlechte Schichthaftung', 'Etwas heißer drucken, den Bauraum geschlossen halten und den Lüfter niedrig lassen. Zugluft beim Druck vermeiden.'],
      ['Teil löst sich vom Bett', 'Die Platte entfetten, ein Trennmittel oder Haftmittel wie Klebestift verwenden und große Teile mit Brim drucken.']
    ], when: 'Wann ASA die richtige Wahl ist', whenText: 'ASA ist die erste Wahl für Teile im Freien: Es ist UV-stabil und wetterfest und vergilbt weniger als ABS. Typisch sind Gartenzubehör, Halterungen am Fahrzeug und Gehäuse im Außenbereich. Für Einsteiger ohne geschlossenen Drucker ist ASA eher schwierig, hier ist PETG die einfachere Wahl.' },
    en: { probs: 'Common problems when printing ASA and what helps', items: [
      ['Parts warp or crack between layers', 'ASA shrinks as it cools. An enclosed build chamber, no draughts, a hot bed, a brim and little or no part cooling reduce warping and layer cracks.'],
      ['Smell and fumes', 'Printing ASA produces fumes. Print in a well-ventilated room or in an enclosure with extraction, and do not sit next to a running printer for long periods.'],
      ['Poor layer adhesion', 'Print a little hotter, keep the chamber closed and keep the fan low. Avoid draughts during printing.'],
      ['The part detaches from the bed', 'Degrease the plate, use a release or adhesion aid such as glue stick, and print large parts with a brim.']
    ], when: 'When ASA is the right choice', whenText: 'ASA is the first choice for outdoor parts: it is UV-stable and weather-resistant and yellows less than ABS. Typical uses are garden accessories, vehicle mounts and outdoor enclosures. For beginners without an enclosed printer ASA is rather difficult, and PETG is the easier choice.' }
  }
};
