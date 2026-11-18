// Batch 2: ABS, TPU, PC, PA, HIPS, PVA, PP
module.exports = {
  'abs': {
    de: { probs: 'Typische Probleme beim Drucken von ABS und was hilft', items: [
      ['Warping und Risse zwischen den Schichten', 'ABS schrumpft stark beim Abkühlen. Ein geschlossener Bauraum, keine Zugluft, eine heiße Druckplatte, ein Brim und wenig Bauteilkühlung halten die Teile flach und die Schichten verbunden.'],
      ['Dämpfe und Geruch', 'Beim Drucken von ABS entstehen Dämpfe. Drucke in einem gut belüfteten Raum oder in einem Gehäuse mit Abluft.'],
      ['Teil löst sich vom Bett', 'Platte entfetten, Haftmittel wie Klebestift verwenden und bei großen Flächen Brim einsetzen.'],
      ['Oberfläche glätten', 'ABS lässt sich mit Aceton anglätten. Das geht nur mit Vorsicht: Acetondämpfe sind leicht entzündlich, also gut lüften, keine offene Flamme und nur kleine Mengen verwenden.']
    ], when: 'Wann ABS die richtige Wahl ist', whenText: 'ABS ist zäh, hitzebeständiger als PLA und PETG und lässt sich gut kleben, schleifen und nachbearbeiten. Es eignet sich für Gehäuse, mechanisch belastete Teile und Teile, die wärmer werden. Für den Außeneinsatz ist ASA wegen der besseren UV-Beständigkeit die bessere Wahl. Ohne geschlossenen Drucker ist ABS schwierig zu drucken.' },
    en: { probs: 'Common problems when printing ABS and what helps', items: [
      ['Warping and cracks between layers', 'ABS shrinks a lot as it cools. An enclosed chamber, no draughts, a hot bed, a brim and little part cooling keep parts flat and layers bonded.'],
      ['Fumes and smell', 'Printing ABS produces fumes. Print in a well-ventilated room or in an enclosure with extraction.'],
      ['The part detaches from the bed', 'Degrease the plate, use an adhesion aid such as glue stick and add a brim for large footprints.'],
      ['Smoothing the surface', 'ABS can be smoothed with acetone. Take care: acetone vapour is highly flammable, so ventilate well, keep flames away and use only small amounts.']
    ], when: 'When ABS is the right choice', whenText: 'ABS is tough, more heat-resistant than PLA and PETG, and easy to glue, sand and finish. It suits enclosures, mechanically loaded parts and parts that get warm. For outdoor use ASA is the better choice because of its UV resistance. Without an enclosed printer ABS is difficult to print.' }
  },
  'tpu': {
    de: { probs: 'Typische Probleme beim Drucken von TPU und was hilft', items: [
      ['Filament staut sich im Extruder', 'Weiches Filament knickt aus, wenn es zu schnell geschoben wird. Langsam drucken, den Filamentweg möglichst eng führen und nach Möglichkeit einen Direct-Drive-Extruder verwenden.'],
      ['Fäden und Klümpchen', 'Feuchtes TPU stringt. Vor dem Druck trocknen, die Retraction gering halten oder abschalten und die Geschwindigkeit verringern.'],
      ['Haftung auf der Platte', 'TPU haftet gut auf PEI und ähnlichen Platten, manchmal zu gut. Bei Bedarf ein Trennmittel verwenden.'],
      ['Sehr weiche Teile sind schwer zu drucken', 'Je weicher das Filament (niedrige Shore-Härte), desto langsamer und vorsichtiger muss gedruckt werden. Für den Einstieg eignet sich ein festeres TPU um Shore 95A.']
    ], when: 'Wann TPU die richtige Wahl ist', whenText: 'TPU ist elastisch und abriebfest. Es eignet sich für Dichtungen, Puffer, Griffe, Schutzhüllen und alles, was sich biegen oder Stöße dämpfen soll. Für Teile mit sehr genauen Maßen oder hoher Steifigkeit ist es ungeeignet.' },
    en: { probs: 'Common problems when printing TPU and what helps', items: [
      ['Filament jams in the extruder', 'Soft filament buckles when pushed too fast. Print slowly, keep the filament path as tight as possible and use a direct-drive extruder if you can.'],
      ['Strings and blobs', 'Damp TPU strings. Dry it before printing, keep retraction low or switch it off and reduce speed.'],
      ['Bed adhesion', 'TPU sticks well to PEI and similar plates, sometimes too well. Use a release agent if needed.'],
      ['Very soft parts are hard to print', 'The softer the filament (lower Shore hardness), the slower and more careful you must print. For a start, a firmer TPU around Shore 95A is a good choice.']
    ], when: 'When TPU is the right choice', whenText: 'TPU is elastic and abrasion-resistant. It suits seals, bumpers, grips, protective cases and anything that should flex or absorb impact. It is a poor choice for parts needing very precise dimensions or high stiffness.' }
  },
  'pc': {
    de: { probs: 'Typische Probleme beim Drucken von PC und was hilft', items: [
      ['Starkes Warping', 'Polycarbonat verzieht sich stark. Ein geschlossener, warmer Bauraum, eine sehr heiße Druckplatte, ein Brim und kein Zug sind Pflicht.'],
      ['Hohe Temperaturen nötig', 'PC braucht sehr hohe Düsen- und Betttemperaturen. Dein Hotend und deine Druckplatte müssen das dauerhaft aushalten, ein Hotend aus Metall ohne PTFE-Auskleidung im heißen Bereich ist nötig.'],
      ['Feuchtigkeit', 'PC nimmt Feuchtigkeit auf und druckt dann blasig und matt. Vor dem Druck trocknen und trocken lagern.'],
      ['Schlechte Schichthaftung', 'Heiß drucken, Bauraum geschlossen halten, Lüfter aus oder sehr niedrig.']
    ], when: 'Wann PC die richtige Wahl ist', whenText: 'PC ist sehr fest, schlagzäh und hitzebeständig. Es eignet sich für anspruchsvolle technische Teile und Gehäuse. Es ist aber ein Material für erfahrene Anwender mit geeignetem Drucker, für Einsteiger ist es nicht zu empfehlen.' },
    en: { probs: 'Common problems when printing PC and what helps', items: [
      ['Strong warping', 'Polycarbonate warps heavily. A closed, warm chamber, a very hot bed, a brim and no draughts are a must.'],
      ['High temperatures needed', 'PC needs very high nozzle and bed temperatures. Your hotend and print plate must handle them permanently, and an all-metal hotend without a PTFE liner in the hot zone is required.'],
      ['Moisture', 'PC absorbs moisture and then prints with bubbles and a matt finish. Dry it before printing and store it dry.'],
      ['Poor layer adhesion', 'Print hot, keep the chamber closed and the fan off or very low.']
    ], when: 'When PC is the right choice', whenText: 'PC is very strong, impact-resistant and heat-resistant. It suits demanding technical parts and enclosures. It is a material for experienced users with a suitable printer and not recommended for beginners.' }
  },
  'pa': {
    de: { probs: 'Typische Probleme beim Drucken von PA (Nylon) und was hilft', items: [
      ['Feuchtigkeit', 'Nylon nimmt sehr schnell Feuchtigkeit aus der Luft auf. Vor dem Druck gründlich trocknen und in einer dichten Box mit Trockenmittel lagern, am besten auch während des Drucks.'],
      ['Warping', 'PA schrumpft beim Abkühlen. Geschlossener Bauraum, Brim und eine Druckplatte mit guter Haftung für Nylon helfen.'],
      ['Schlechte Haftung auf der Platte', 'Nylon haftet auf glatten Platten oft schlecht. Klebestift oder eine für Nylon geeignete Platte verwenden.'],
      ['Maße ändern sich mit der Luftfeuchtigkeit', 'Fertige PA-Teile nehmen weiter Wasser auf und werden dadurch etwas größer und weicher. Bei Passungen das einplanen.']
    ], when: 'Wann PA die richtige Wahl ist', whenText: 'PA ist zäh, verschleißfest und hat gute Gleiteigenschaften. Typisch sind Zahnräder, Lager, Scharniere und Teile, die Schlägen oder Reibung standhalten sollen. Wenn es auf stabile Maße bei wechselnder Luftfeuchtigkeit ankommt, ist es weniger geeignet.' },
    en: { probs: 'Common problems when printing PA (nylon) and what helps', items: [
      ['Moisture', 'Nylon absorbs moisture from the air very quickly. Dry it thoroughly before printing and store it in a sealed box with desiccant, ideally during printing too.'],
      ['Warping', 'PA shrinks as it cools. An enclosed chamber, a brim and a plate with good adhesion for nylon help.'],
      ['Poor adhesion to the plate', 'Nylon often sticks poorly to smooth plates. Use glue stick or a plate made for nylon.'],
      ['Dimensions change with humidity', 'Finished PA parts keep absorbing water and become slightly larger and softer. Allow for this with fits.']
    ], when: 'When PA is the right choice', whenText: 'PA is tough, wear-resistant and has good sliding properties. Typical uses are gears, bearings, hinges and parts that must withstand impact or friction. It is less suited where stable dimensions in changing humidity matter.' }
  },
  'hips': {
    de: { probs: 'Typische Probleme beim Drucken von HIPS und was hilft', items: [
      ['Warping', 'HIPS verzieht sich ähnlich wie ABS. Geschlossener Bauraum, heiße Platte und Brim helfen.'],
      ['Support lösen', 'HIPS löst sich in Limonen. Das geht nur in einem gut belüfteten Raum, die Dämpfe sind leicht entzündlich. Das Bad dauert je nach Teil mehrere Stunden.'],
      ['Haftung zwischen Support und ABS', 'Die Düsentemperatur und die Abstände zwischen Support und Teil im Slicer so einstellen, dass sich beide Materialien verbinden, aber trennen lassen.']
    ], when: 'Wann HIPS die richtige Wahl ist', whenText: 'HIPS wird meist als löslicher Support für ABS genutzt, weil es ähnliche Druckeinstellungen hat. Es braucht dafür einen Drucker mit zwei Düsen oder Materialsystem. Für PLA und PETG ist HIPS als Support nicht geeignet, weil die Temperaturen nicht passen.' },
    en: { probs: 'Common problems when printing HIPS and what helps', items: [
      ['Warping', 'HIPS warps similarly to ABS. An enclosed chamber, a hot bed and a brim help.'],
      ['Dissolving the support', 'HIPS dissolves in limonene. Do this only in a well-ventilated room, as the vapour is flammable. The bath takes several hours depending on the part.'],
      ['Adhesion between support and ABS', 'Set the nozzle temperature and the gaps between support and part in the slicer so that both materials bond but can still be separated.']
    ], when: 'When HIPS is the right choice', whenText: 'HIPS is mostly used as soluble support for ABS because it has similar print settings. It needs a printer with two nozzles or a material system. For PLA and PETG HIPS is not suitable as support because the temperatures do not match.' }
  },
  'pva': {
    de: { probs: 'Typische Probleme beim Drucken von PVA und was hilft', items: [
      ['Feuchtigkeit', 'PVA ist extrem hygroskopisch und wird bei feuchter Luft schnell unbrauchbar. In einer dichten Box mit Trockenmittel lagern und vor dem Druck trocknen.'],
      ['Düse verstopft', 'PVA kann bei zu hoher Temperatur oder langem Stillstand in der Düse verkohlen. Nicht lange heiß stehen lassen und beim Wechsel gut spülen.'],
      ['Lösen dauert lange', 'Das Teil in Wasser legen, das Wasser öfter wechseln und gelegentlich bewegen. Große Teile brauchen mehrere Stunden.']
    ], when: 'Wann PVA die richtige Wahl ist', whenText: 'PVA wird als wasserlöslicher Support für Teile mit komplexen Überhängen und Hohlräumen genutzt, vor allem zusammen mit PLA. Es braucht einen Drucker mit mehreren Materialien und ist teuer. Für einfache Teile lohnt es sich nicht.' },
    en: { probs: 'Common problems when printing PVA and what helps', items: [
      ['Moisture', 'PVA is extremely hygroscopic and quickly becomes unusable in damp air. Store it in a sealed box with desiccant and dry it before printing.'],
      ['Nozzle clogs', 'PVA can carbonise in the nozzle if it is too hot or sits idle for long. Do not leave it heated for long and purge well when switching materials.'],
      ['Dissolving takes long', 'Put the part in water, change the water regularly and move the part now and then. Large parts need several hours.']
    ], when: 'When PVA is the right choice', whenText: 'PVA is used as water-soluble support for parts with complex overhangs and cavities, mostly together with PLA. It needs a printer with several materials and is expensive. For simple parts it is not worth it.' }
  },
  'pp': {
    de: { probs: 'Typische Probleme beim Drucken von PP und was hilft', items: [
      ['PP haftet auf fast nichts', 'Polypropylen klebt schlecht auf üblichen Druckplatten. Eine Platte aus PP oder Packband aus PP auf dem Bett verwenden.'],
      ['Warping', 'PP schrumpft stark. Brim, kein Zug und ein geschlossener Bauraum helfen.'],
      ['Schwer zu kleben', 'PP lässt sich mit normalem Kleber kaum verbinden. Teile besser mit Schnapp- oder Schraubverbindungen konstruieren.']
    ], when: 'Wann PP die richtige Wahl ist', whenText: 'PP ist chemikalienbeständig, leicht und sehr gut für flexible Scharniere und Behälter. Es ist ein Material für Fortgeschrittene, weil Haftung und Schrumpf anspruchsvoll sind.' },
    en: { probs: 'Common problems when printing PP and what helps', items: [
      ['PP sticks to almost nothing', 'Polypropylene sticks poorly to common print plates. Use a PP plate or PP packing tape on the bed.'],
      ['Warping', 'PP shrinks a lot. A brim, no draughts and an enclosed chamber help.'],
      ['Hard to glue', 'PP is hard to bond with ordinary glue. Design parts with snap-fit or screw joints instead.']
    ], when: 'When PP is the right choice', whenText: 'PP is chemical-resistant, light and very good for flexible hinges and containers. It is a material for advanced users because adhesion and shrinkage are demanding.' }
  }
};
