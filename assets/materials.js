/* 3DToolBox — Materialdatenbank (Richtwerte aus Herstellerdatenblättern und Material-Guides).
   Quellen: P = Polymaker (TDS/Technical Data at a Glance), B = Bambu Lab (Filament Guide/TDS), R = Prusa Knowledge Base.
   Werte sind Beispiele konkreter Produkte, keine Garantie – je nach Hersteller, Farbe und Druckparametern verschieden. Leere Felder = keine belegte Angabe. */
window.MaterialDB = {
  groups: {
 "basic": {
  "de": "Standard & PLA-Varianten",
  "en": "Standard & PLA variants"
 },
 "tech": {
  "de": "Technisch",
  "en": "Engineering"
 },
 "flex": {
  "de": "Flexibel",
  "en": "Flexible"
 },
 "composite": {
  "de": "Faser-Verbund (Carbon/Glas)",
  "en": "Fibre composites (carbon/glass)"
 },
 "effect": {
  "de": "Effekt (Holz, Metall, Glow)",
  "en": "Effect (wood, metal, glow)"
 },
 "support": {
  "de": "Support (löslich)",
  "en": "Support (soluble)"
 },
 "high": {
  "de": "Hochleistung",
  "en": "High-performance"
 }
},
  items: [
 {
  "id": "PLA",
  "grp": "basic",
  "diff": 1,
  "encl": 0,
  "hard": 0,
  "src": "P,B,R",
  "nozzle": {
   "de": "190–230",
   "en": "190–230"
  },
  "bed": {
   "de": "25–65",
   "en": "25–65"
  },
  "hdt": {
   "de": "55–60",
   "en": "55–60"
  },
  "tensile": {
   "de": "40–52",
   "en": "40–52"
  },
  "elong": {
   "de": "ca. 6 %",
   "en": "approx. 6%"
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "1,17–1,24",
   "en": "1.17–1.24"
  },
  "dry": {
   "de": "55 °C, 6–8 h",
   "en": "55 °C, 6–8 h"
  },
  "name": {
   "de": "PLA",
   "en": "PLA"
  },
  "uses": {
   "de": "Modelle, Figuren, Prototypen, Deko, Alltagsgegenstände ohne Hitze",
   "en": "Models, figures, prototypes, decor, everyday objects not exposed to heat"
  },
  "pro": {
   "de": "Einfachster Druck, kaum Warping, günstig, riesige Farbauswahl, steif",
   "en": "Easiest to print, little warping, cheap, huge colour range, stiff"
  },
  "con": {
   "de": "Verformt sich ab ca. 55–60 °C (Auto im Sommer!), eher spröde, nicht UV-/wasserfest auf Dauer",
   "en": "Softens from ca. 55–60 °C (car in summer!), rather brittle, not durable outdoors"
  }
 },
 {
  "id": "PLA+",
  "grp": "basic",
  "diff": 1,
  "encl": 0,
  "hard": 0,
  "src": "P",
  "nozzle": {
   "de": "190–230",
   "en": "190–230"
  },
  "bed": {
   "de": "25–65",
   "en": "25–65"
  },
  "hdt": {
   "de": "55–59",
   "en": "55–59"
  },
  "tensile": {
   "de": "40–50",
   "en": "40–50"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "1,2–1,24",
   "en": "1.2–1.24"
  },
  "dry": {
   "de": "55 °C, 6–8 h",
   "en": "55 °C, 6–8 h"
  },
  "name": {
   "de": "PLA+ / PLA Pro / Tough PLA",
   "en": "PLA+ / PLA Pro / Tough PLA"
  },
  "uses": {
   "de": "Funktionsteile mit etwas mehr Schlagzähigkeit, Halter, Gehäuse",
   "en": "Functional parts needing more impact toughness, holders, housings"
  },
  "pro": {
   "de": "Deutlich höhere Schlagzähigkeit als Standard-PLA (Charpy ca. 17–39 statt 3 kJ/m² bei Polymaker)",
   "en": "Much higher impact strength than standard PLA (Charpy ca. 17–39 vs 3 kJ/m² at Polymaker)"
  },
  "con": {
   "de": "Hitzebeständigkeit wie PLA; Eigenschaften je nach Hersteller sehr verschieden",
   "en": "Heat resistance same as PLA; properties vary a lot between brands"
  }
 },
 {
  "id": "SILK",
  "grp": "basic",
  "diff": 1,
  "encl": 0,
  "hard": 0,
  "src": "P (Panchroma Silk)",
  "nozzle": {
   "de": "190–230",
   "en": "190–230"
  },
  "bed": {
   "de": "25–65",
   "en": "25–65"
  },
  "hdt": {
   "de": "ca. 65 (Vicat)",
   "en": "approx. 65 (Vicat)"
  },
  "tensile": {
   "de": "ca. 41",
   "en": "approx. 41"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,24",
   "en": "approx. 1.24"
  },
  "dry": {
   "de": "55 °C, 6–8 h",
   "en": "55 °C, 6–8 h"
  },
  "name": {
   "de": "Silk-PLA (Seidenglanz)",
   "en": "Silk PLA"
  },
  "uses": {
   "de": "Vasen, Deko, Figuren, Geschenke – alles, was glänzen soll",
   "en": "Vases, decor, figures, gifts – anything that should shine"
  },
  "pro": {
   "de": "Metallisch-seidiger Glanz, überdeckt Layerlinien gut",
   "en": "Metallic silky shine, hides layer lines well"
  },
  "con": {
   "de": "Oft etwas weniger fest zwischen den Schichten, Überhänge schwieriger; Temperatur laut Hersteller beachten",
   "en": "Often weaker layer bonding, overhangs harder; follow manufacturer temperature"
  }
 },
 {
  "id": "MATTE",
  "grp": "basic",
  "diff": 1,
  "encl": 0,
  "hard": 0,
  "src": "P (Panchroma Matte)",
  "nozzle": {
   "de": "190–230",
   "en": "190–230"
  },
  "bed": {
   "de": "25–65",
   "en": "25–65"
  },
  "hdt": {
   "de": "ca. 62 (Vicat)",
   "en": "approx. 62 (Vicat)"
  },
  "tensile": {
   "de": "ca. 23",
   "en": "approx. 23"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,37",
   "en": "approx. 1.37"
  },
  "dry": {
   "de": "55 °C, 6–8 h",
   "en": "55 °C, 6–8 h"
  },
  "name": {
   "de": "Matt-PLA",
   "en": "Matte PLA"
  },
  "uses": {
   "de": "Optik-Teile, Gehäuse, Cosplay, Fotoobjekte",
   "en": "Display parts, housings, cosplay, photo props"
  },
  "pro": {
   "de": "Matte Oberfläche, Fingerabdrücke und Layerlinien fallen kaum auf",
   "en": "Matte finish, fingerprints and layer lines hardly show"
  },
  "con": {
   "de": "Messbar weniger zugfest als Standard-PLA (Polymaker Panchroma Matte: ca. 23 MPa)",
   "en": "Measurably lower tensile strength than standard PLA (Polymaker Panchroma Matte: ca. 23 MPa)"
  }
 },
 {
  "id": "PLA-CF",
  "grp": "composite",
  "diff": 2,
  "encl": 0,
  "hard": 1,
  "src": "P,B,R",
  "nozzle": {
   "de": "210–240",
   "en": "210–240"
  },
  "bed": {
   "de": "45–65",
   "en": "45–65"
  },
  "hdt": {
   "de": "54–55",
   "en": "54–55"
  },
  "tensile": {
   "de": "ca. 31 (Polymaker); Biegefestigkeit 89 (Bambu)",
   "en": "approx. 31 (Polymaker); flexural strength 89 (Bambu)"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,29",
   "en": "approx. 1.29"
  },
  "dry": {
   "de": "55 °C, 8 h",
   "en": "55 °C, 8 h"
  },
  "name": {
   "de": "PLA-CF (Carbonfaser-PLA)",
   "en": "PLA-CF (carbon fibre PLA)"
  },
  "uses": {
   "de": "Steife, leichte Teile, Drohnen-/RC-Teile, matte Technik-Optik",
   "en": "Stiff light parts, drone/RC parts, matte technical look"
  },
  "pro": {
   "de": "Sehr steif, matte Oberfläche, wenig Warping, maßhaltig",
   "en": "Very stiff, matte surface, little warping, dimensionally accurate"
  },
  "con": {
   "de": "Hartmetall-/gehärtete Düse nötig (abrasiv), spröde, Schichthaftung schwächer, Hitzebeständigkeit nur wie PLA",
   "en": "Hardened nozzle required (abrasive), brittle, weaker layer adhesion, heat resistance only like PLA"
  }
 },
 {
  "id": "HT-PLA",
  "grp": "basic",
  "diff": 2,
  "encl": 0,
  "hard": 0,
  "src": "P",
  "nozzle": {
   "de": "190–230 (laut Hersteller)",
   "en": "190–230 (per manufacturer)"
  },
  "bed": {
   "de": "55–65",
   "en": "55–65"
  },
  "hdt": {
   "de": "61 (roh) / ca. 107 (getempert)",
   "en": "61 (raw) / approx. 107 (annealed)"
  },
  "tensile": {
   "de": "ca. 43",
   "en": "approx. 43"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,29",
   "en": "approx. 1.29"
  },
  "dry": {
   "de": "55 °C, 6–8 h",
   "en": "55 °C, 6–8 h"
  },
  "name": {
   "de": "HT-PLA (hitzefestes PLA)",
   "en": "HT-PLA (heat-resistant PLA)"
  },
  "uses": {
   "de": "Teile, die nach dem Tempern bis ca. 100 °C aushalten sollen",
   "en": "Parts that should withstand ca. 100 °C after annealing"
  },
  "pro": {
   "de": "Nach dem Tempern deutlich hitzebeständiger als PLA (Polymaker: HDT ca. 107 °C)",
   "en": "Much more heat-resistant than PLA after annealing (Polymaker: HDT ca. 107 °C)"
  },
  "con": {
   "de": "Tempern nötig (Teil schrumpft/verzieht leicht), Aufwand",
   "en": "Annealing needed (part may shrink/warp slightly), extra effort"
  }
 },
 {
  "id": "LW-PLA",
  "grp": "basic",
  "diff": 3,
  "encl": 0,
  "hard": 0,
  "src": "P,R",
  "nozzle": {
   "de": "210–250",
   "en": "210–250"
  },
  "bed": {
   "de": "25–60",
   "en": "25–60"
  },
  "hdt": {
   "de": "ca. 54",
   "en": "approx. 54"
  },
  "tensile": {
   "de": "ca. 24",
   "en": "approx. 24"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 0,9 (aufgeschäumt)",
   "en": "approx. 0.9 (foamed)"
  },
  "dry": {
   "de": "55 °C, 6–8 h",
   "en": "55 °C, 6–8 h"
  },
  "name": {
   "de": "LW-PLA (Leicht-/Schaum-PLA)",
   "en": "LW-PLA (lightweight / foaming PLA)"
  },
  "uses": {
   "de": "Flugzeug-/Segler-Modelle, leichte Gehäuse und Dekoration",
   "en": "Model aircraft, light housings and decor"
  },
  "pro": {
   "de": "Schäumt beim Druck auf – Teile deutlich leichter",
   "en": "Foams during printing – much lighter parts"
  },
  "con": {
   "de": "Temperatur und Flussrate müssen für Zielgewicht kalibriert werden, rauere Oberfläche",
   "en": "Temperature and flow need calibration for target weight, rougher surface"
  }
 },
 {
  "id": "WOOD",
  "grp": "effect",
  "diff": 2,
  "encl": 0,
  "hard": 0,
  "src": "P (PolyWood TDS),R",
  "nozzle": {
   "de": "190–210 (PolyWood); bei Holzpulver-Filamenten oft bis 220",
   "en": "190–210 (PolyWood); wood-powder filaments often up to 220"
  },
  "bed": {
   "de": "25–60",
   "en": "25–60"
  },
  "hdt": {
   "de": "ca. 54–56",
   "en": "approx. 54–56"
  },
  "tensile": {
   "de": "ca. 23 (PolyWood)",
   "en": "approx. 23 (PolyWood)"
  },
  "elong": {
   "de": "ca. 8 %",
   "en": "approx. 8%"
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 0,8 (PolyWood)",
   "en": "approx. 0.8 (PolyWood)"
  },
  "dry": {
   "de": "55 °C, 6 h",
   "en": "55 °C, 6 h"
  },
  "name": {
   "de": "Holz-Filament (Holz-PLA)",
   "en": "Wood filament (wood PLA)"
  },
  "uses": {
   "de": "Deko, Schilder, Schmuck, Gehäuse mit Holzoptik; lässt sich schleifen und beizen",
   "en": "Decor, signs, jewellery, housings with a wood look; can be sanded and stained"
  },
  "pro": {
   "de": "Holzähnliche Optik und Haptik, schleif- und beizbar, leicht",
   "en": "Wood-like look and feel, sandable and stainable, light"
  },
  "con": {
   "de": "Echte Holzpartikel verstopfen Düsen leichter – ab 0,6 mm Düse und 0,2 mm Schichthöhe sicherer (Prusa); spröde; PolyWood enthält laut Datenblatt kein Holzpulver",
   "en": "Real wood particles clog nozzles more easily – 0.6 mm nozzle and 0.2 mm layers are safer (Prusa); brittle; PolyWood contains no wood powder per its datasheet"
  }
 },
 {
  "id": "METAL",
  "grp": "effect",
  "diff": 3,
  "encl": 0,
  "hard": 1,
  "src": "R",
  "nozzle": {
   "de": "190–270 (je nach Basis)",
   "en": "190–270 (depending on base)"
  },
  "bed": {
   "de": "60–100",
   "en": "60–100"
  },
  "hdt": {
   "de": "",
   "en": ""
  },
  "tensile": {
   "de": "niedriger als Basismaterial",
   "en": "lower than base material"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "deutlich schwerer",
   "en": "much heavier"
  },
  "dry": {
   "de": "",
   "en": ""
  },
  "name": {
   "de": "Metall-Filament (metallgefüllt)",
   "en": "Metal-filled filament"
  },
  "uses": {
   "de": "Optik-/Deko-Teile mit Metall-Look, polierbar",
   "en": "Display/decor parts with a metal look, polishable"
  },
  "pro": {
   "de": "Schwer, kühl im Griff, nach Nassschliff (600–1500) und Politur wie Metall",
   "en": "Heavy, cool to the touch, metal-like after wet sanding (600–1500) and polishing"
  },
  "con": {
   "de": "Sehr abrasiv → gehärtete Düse, spröde, geringere Festigkeit und Schichthaftung als Basis (Prusa)",
   "en": "Very abrasive → hardened nozzle, brittle, lower strength and layer adhesion than base (Prusa)"
  }
 },
 {
  "id": "PETG",
  "grp": "tech",
  "diff": 2,
  "encl": 0,
  "hard": 0,
  "src": "P,B,R",
  "nozzle": {
   "de": "230–270",
   "en": "230–270"
  },
  "bed": {
   "de": "60–80",
   "en": "60–80"
  },
  "hdt": {
   "de": "69–78",
   "en": "69–78"
  },
  "tensile": {
   "de": "38–51",
   "en": "38–51"
  },
  "elong": {
   "de": "ca. 8 % (XY)",
   "en": "approx. 8% (XY)"
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "1,24–1,30",
   "en": "1.24–1.30"
  },
  "dry": {
   "de": "65 °C, 6–8 h",
   "en": "65 °C, 6–8 h"
  },
  "name": {
   "de": "PETG",
   "en": "PETG"
  },
  "uses": {
   "de": "Funktionsteile, Halterungen, Behälter, Außenbereich (begrenzt), wasserdichte Teile",
   "en": "Functional parts, brackets, containers, limited outdoor use, watertight parts"
  },
  "pro": {
   "de": "Zäh, chemikalien- und feuchtigkeitsbeständig, einfacher zu drucken als ABS/ASA, wenig Warping",
   "en": "Tough, chemical and moisture resistant, easier than ABS/ASA, little warping"
  },
  "con": {
   "de": "Neigt zu Fäden (Stringing), klebt stark auf PEI (Trennmittel nutzen), kratzempfindlicher",
   "en": "Prone to stringing, sticks strongly to PEI (use release agent), scratches more easily"
  }
 },
 {
  "id": "PETG-CF",
  "grp": "composite",
  "diff": 2,
  "encl": 0,
  "hard": 1,
  "src": "P,B",
  "nozzle": {
   "de": "240–270",
   "en": "240–270"
  },
  "bed": {
   "de": "60–80",
   "en": "60–80"
  },
  "hdt": {
   "de": "69–74",
   "en": "69–74"
  },
  "tensile": {
   "de": "ca. 60 (Polymaker); Biegefestigkeit 70 (Bambu)",
   "en": "approx. 60 (Polymaker); flexural strength 70 (Bambu)"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,3",
   "en": "approx. 1.3"
  },
  "dry": {
   "de": "65 °C, 8 h",
   "en": "65 °C, 8 h"
  },
  "name": {
   "de": "PETG-CF (Carbonfaser-PETG)",
   "en": "PETG-CF (carbon fibre PETG)"
  },
  "uses": {
   "de": "Steife technische Teile, Halterungen, Vorrichtungen",
   "en": "Stiff technical parts, brackets, jigs"
  },
  "pro": {
   "de": "Steifer und formstabiler als PETG, matte Oberfläche",
   "en": "Stiffer and more dimensionally stable than PETG, matte surface"
  },
  "con": {
   "de": "Gehärtete Düse nötig, spröder als PETG",
   "en": "Hardened nozzle required, more brittle than PETG"
  }
 },
 {
  "id": "ABS",
  "grp": "tech",
  "diff": 3,
  "encl": 2,
  "hard": 0,
  "src": "P,B,R",
  "nozzle": {
   "de": "240–280",
   "en": "240–280"
  },
  "bed": {
   "de": "90–100",
   "en": "90–100"
  },
  "hdt": {
   "de": "87–106",
   "en": "87–106"
  },
  "tensile": {
   "de": "33–35",
   "en": "33–35"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,04",
   "en": "approx. 1.04"
  },
  "dry": {
   "de": "80 °C, 8 h",
   "en": "80 °C, 8 h"
  },
  "name": {
   "de": "ABS",
   "en": "ABS"
  },
  "uses": {
   "de": "Mechanisch beanspruchte Teile, Gehäuse, Teile mit Hitzeeinwirkung; mit Aceton glättbar",
   "en": "Mechanically stressed parts, housings, heat-exposed parts; smoothable with acetone"
  },
  "pro": {
   "de": "Zäh (Charpy ca. 18 kJ/m²), hitzebeständiger als PLA/PETG, schleif- und glättbar",
   "en": "Tough (Charpy ca. 18 kJ/m²), more heat-resistant than PLA/PETG, sandable and smoothable"
  },
  "con": {
   "de": "Warping und Schrumpf → geschlossener Bauraum empfohlen, Geruch/Dämpfe (gute Belüftung), nicht UV-stabil",
   "en": "Warping and shrinkage → enclosure recommended, fumes (ventilate well), not UV-stable"
  }
 },
 {
  "id": "ASA",
  "grp": "tech",
  "diff": 3,
  "encl": 2,
  "hard": 0,
  "src": "P,B,R",
  "nozzle": {
   "de": "240–280",
   "en": "240–280"
  },
  "bed": {
   "de": "75–100",
   "en": "75–100"
  },
  "hdt": {
   "de": "100–103",
   "en": "100–103"
  },
  "tensile": {
   "de": "ca. 44",
   "en": "approx. 44"
  },
  "elong": {
   "de": "ca. 6,7 % (XY)",
   "en": "approx. 6.7% (XY)"
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,13",
   "en": "approx. 1.13"
  },
  "dry": {
   "de": "80 °C, 8 h",
   "en": "80 °C, 8 h"
  },
  "name": {
   "de": "ASA",
   "en": "ASA"
  },
  "uses": {
   "de": "Außenbereich: Gartenteile, Halter, Auto-Zubehör, Gehäuse in der Sonne",
   "en": "Outdoor: garden parts, brackets, car accessories, housings in sunlight"
  },
  "pro": {
   "de": "Wie ABS, aber UV- und witterungsbeständig, hitzebeständig (HDT ca. 100 °C), glättbar mit Aceton",
   "en": "Like ABS but UV and weather resistant, heat resistant (HDT ca. 100 °C), smoothable with acetone"
  },
  "con": {
   "de": "Warping → Bauraum empfohlen, Dämpfe, höhere Temperaturen nötig",
   "en": "Warping → enclosure recommended, fumes, higher temperatures needed"
  }
 },
 {
  "id": "TPU",
  "grp": "flex",
  "diff": 3,
  "encl": 1,
  "hard": 0,
  "src": "P,B,R",
  "nozzle": {
   "de": "210–240",
   "en": "210–240"
  },
  "bed": {
   "de": "25–60",
   "en": "25–60"
  },
  "hdt": {
   "de": "",
   "en": ""
  },
  "tensile": {
   "de": "ca. 30 (Bambu TPU 95A)",
   "en": "approx. 30 (Bambu TPU 95A)"
  },
  "elong": {
   "de": "ca. 550 % bis > 700 %",
   "en": "approx. 550% up to > 700%"
  },
  "shore": {
   "de": "95A",
   "en": "95A"
  },
  "dens": {
   "de": "ca. 1,2",
   "en": "approx. 1.2"
  },
  "dry": {
   "de": "70 °C, 8 h",
   "en": "70 °C, 8 h"
  },
  "name": {
   "de": "TPU 95A (flexibel)",
   "en": "TPU 95A (flexible)"
  },
  "uses": {
   "de": "Dichtungen, Puffer, Hüllen, Schläuche, Radreifen, Dämpfer",
   "en": "Seals, bumpers, cases, hoses, wheel tyres, dampers"
  },
  "pro": {
   "de": "Gummiartig, sehr hohe Dehnung, abriebfest, chemikalienbeständig, schlagzäh",
   "en": "Rubber-like, very high elongation, abrasion and chemical resistant, impact tough"
  },
  "con": {
   "de": "Langsam drucken (ca. 30–50 mm/s), Direktantrieb empfohlen, Stringing, feuchtigkeitsempfindlich",
   "en": "Print slowly (ca. 30–50 mm/s), direct drive recommended, stringing, moisture sensitive"
  }
 },
 {
  "id": "TPU-SOFT",
  "grp": "flex",
  "diff": 4,
  "encl": 1,
  "hard": 0,
  "src": "P,R",
  "nozzle": {
   "de": "230–245",
   "en": "230–245"
  },
  "bed": {
   "de": "60–75",
   "en": "60–75"
  },
  "hdt": {
   "de": "",
   "en": ""
  },
  "tensile": {
   "de": "",
   "en": ""
  },
  "elong": {
   "de": "Polymaker TPU90: ca. 590 %",
   "en": "Polymaker TPU90: approx. 590%"
  },
  "shore": {
   "de": "60A–90A",
   "en": "60A–90A"
  },
  "dens": {
   "de": "ca. 1,2",
   "en": "approx. 1.2"
  },
  "dry": {
   "de": "70 °C, 8 h",
   "en": "70 °C, 8 h"
  },
  "name": {
   "de": "TPU weich (60A–90A)",
   "en": "Soft TPU (60A–90A)"
  },
  "uses": {
   "de": "Sehr weiche Dichtungen, Griffe, Schuhsohlen, Stempel",
   "en": "Very soft seals, grips, shoe soles, stamps"
  },
  "pro": {
   "de": "Noch elastischer und gummiartiger als 95A",
   "en": "Even more elastic and rubbery than 95A"
  },
  "con": {
   "de": "„Je weicher, desto schwerer zu drucken“ (Prusa): typisch ca. 20 mm/s, wenig/kein Retract",
   "en": "\"The softer, the harder to print\" (Prusa): typically ca. 20 mm/s, little/no retraction"
  }
 },
 {
  "id": "PC",
  "grp": "tech",
  "diff": 4,
  "encl": 2,
  "hard": 0,
  "src": "P,B,R",
  "nozzle": {
   "de": "260–290",
   "en": "260–290"
  },
  "bed": {
   "de": "100–120",
   "en": "100–120"
  },
  "hdt": {
   "de": "111–117",
   "en": "111–117"
  },
  "tensile": {
   "de": "53–69",
   "en": "53–69"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,19",
   "en": "approx. 1.19"
  },
  "dry": {
   "de": "80 °C, 8 h",
   "en": "80 °C, 8 h"
  },
  "name": {
   "de": "PC (Polycarbonat)",
   "en": "PC (polycarbonate)"
  },
  "uses": {
   "de": "Hitze- und stoßbelastete Teile: Lüfterhauben, Hebel, Gehäuse, Scharniere",
   "en": "Heat and impact loaded parts: fan shrouds, levers, housings, hinges"
  },
  "pro": {
   "de": "Sehr zäh, hohe Festigkeit, HDT ca. 111–117 °C, gute elektrische Isolation",
   "en": "Very tough, high strength, HDT ca. 111–117 °C, good electrical insulation"
  },
  "con": {
   "de": "Starkes Warping → geschlossener Bauraum nötig, sehr hygroskopisch, hohe Temperaturen, teuer",
   "en": "Strong warping → enclosure required, very hygroscopic, high temperatures, expensive"
  }
 },
 {
  "id": "PA",
  "grp": "tech",
  "diff": 4,
  "encl": 2,
  "hard": 0,
  "src": "P,R",
  "nozzle": {
   "de": "ca. 260–285",
   "en": "approx. 260–285"
  },
  "bed": {
   "de": "ca. 100–110",
   "en": "approx. 100–110"
  },
  "hdt": {
   "de": "ca. 111 (CoPA, getempert)",
   "en": "approx. 111 (CoPA, annealed)"
  },
  "tensile": {
   "de": "ca. 78 (Polymaker CoPA, getempert)",
   "en": "approx. 78 (Polymaker CoPA, annealed)"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,12",
   "en": "approx. 1.12"
  },
  "dry": {
   "de": "≥ 4 h unter 90 °C; luftdicht lagern",
   "en": "≥ 4 h below 90 °C; store airtight"
  },
  "name": {
   "de": "PA / Nylon (unverstärkt)",
   "en": "PA / Nylon (unfilled)"
  },
  "uses": {
   "de": "Zahnräder, Lager, Scharniere, Werkzeug- und Maschinenteile",
   "en": "Gears, bearings, hinges, tool and machine parts"
  },
  "pro": {
   "de": "Sehr zäh, abriebfest, geringe Reibung, hohe Hitze- und Chemikalienbeständigkeit, hervorragende Schichthaftung",
   "en": "Very tough, abrasion resistant, low friction, high heat and chemical resistance, excellent layer adhesion"
  },
  "con": {
   "de": "Nimmt bis ca. 10 % Wasser auf (Blasen!), starkes Warping, Dämpfe → Belüftung, für Erfahrene",
   "en": "Absorbs up to ca. 10 % water (bubbles!), strong warping, fumes → ventilate, for experienced users"
  }
 },
 {
  "id": "PA-CF",
  "grp": "composite",
  "diff": 4,
  "encl": 2,
  "hard": 1,
  "src": "P,B,R",
  "nozzle": {
   "de": "260–300",
   "en": "260–300"
  },
  "bed": {
   "de": "100–120",
   "en": "100–120"
  },
  "hdt": {
   "de": "ca. 175–215 (Polymaker, getempert); 184–194 (Bambu)",
   "en": "approx. 175–215 (Polymaker, annealed); 184–194 (Bambu)"
  },
  "tensile": {
   "de": "ca. 92–109 (Polymaker); Biegefestigkeit 125–151 (Bambu)",
   "en": "approx. 92–109 (Polymaker); flexural strength 125–151 (Bambu)"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,03–1,17",
   "en": "approx. 1.03–1.17"
  },
  "dry": {
   "de": "80 °C, 8–12 h",
   "en": "80 °C, 8–12 h"
  },
  "name": {
   "de": "PA-CF (Nylon mit Carbonfaser: PA6-CF, PAHT-CF, PA11-CF)",
   "en": "PA-CF (carbon fibre nylon: PA6-CF, PAHT-CF, PA11-CF)"
  },
  "uses": {
   "de": "Tragende Technik-Teile: Halterungen, Vorrichtungen, Motor-/Maschinenteile, Drohnen",
   "en": "Load-bearing technical parts: brackets, jigs, engine/machine parts, drones"
  },
  "pro": {
   "de": "Sehr hohe Festigkeit und Steifigkeit, HDT bis über 200 °C, weniger Warping als reines Nylon",
   "en": "Very high strength and stiffness, HDT above 200 °C, less warping than pure nylon"
  },
  "con": {
   "de": "Gehärtete Düse (0,6 mm empfohlen), geschlossener Bauraum (außer z. B. PA11-CF laut Prusa), trocknen vor jedem Druck, teuer, spröder",
   "en": "Hardened nozzle (0.6 mm recommended), enclosure (except e.g. PA11-CF per Prusa), dry before every print, expensive, more brittle"
  }
 },
 {
  "id": "PA-GF",
  "grp": "composite",
  "diff": 4,
  "encl": 2,
  "hard": 1,
  "src": "P,R",
  "nozzle": {
   "de": "260–300 (laut Hersteller)",
   "en": "260–300 (per manufacturer)"
  },
  "bed": {
   "de": "80–120",
   "en": "80–120"
  },
  "hdt": {
   "de": "ca. 191 (PA6-GF25, getempert)",
   "en": "approx. 191 (PA6-GF25, annealed)"
  },
  "tensile": {
   "de": "ca. 80 (PA6-GF25)",
   "en": "approx. 80 (PA6-GF25)"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,2",
   "en": "approx. 1.2"
  },
  "dry": {
   "de": "80 °C, 8–12 h",
   "en": "80 °C, 8–12 h"
  },
  "name": {
   "de": "PA-GF (Nylon mit Glasfaser)",
   "en": "PA-GF (glass fibre nylon)"
  },
  "uses": {
   "de": "Steife, hitzebeständige Teile; Glasfaser ist weniger leitfähig als Carbon",
   "en": "Stiff heat-resistant parts; glass fibre is less conductive than carbon"
  },
  "pro": {
   "de": "Hohe Steifigkeit und Hitzebeständigkeit, oft zäher als Carbon-Varianten",
   "en": "High stiffness and heat resistance, often tougher than carbon variants"
  },
  "con": {
   "de": "Abrasiv (gehärtete Düse), hygroskopisch, Bauraum nötig",
   "en": "Abrasive (hardened nozzle), hygroscopic, enclosure needed"
  }
 },
 {
  "id": "PET-CF",
  "grp": "composite",
  "diff": 4,
  "encl": 2,
  "hard": 1,
  "src": "P,B",
  "nozzle": {
   "de": "260–300",
   "en": "260–300"
  },
  "bed": {
   "de": "70–100",
   "en": "70–100"
  },
  "hdt": {
   "de": "ca. 148–205 (CF); bis ca. 238 getempert (Polymaker)",
   "en": "approx. 148–205 (CF); up to approx. 238 annealed (Polymaker)"
  },
  "tensile": {
   "de": "ca. 60–66; Biegefestigkeit 131 (Bambu PET-CF)",
   "en": "approx. 60–66; flexural strength 131 (Bambu PET-CF)"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,34–1,43",
   "en": "approx. 1.34–1.43"
  },
  "dry": {
   "de": "80 °C, 8–12 h",
   "en": "80 °C, 8–12 h"
  },
  "name": {
   "de": "PET-CF / PET-GF",
   "en": "PET-CF / PET-GF"
  },
  "uses": {
   "de": "Hitze- und formstabile Technikteile, weniger feuchtigkeitsempfindlich als Nylon",
   "en": "Heat and dimensionally stable technical parts, less moisture-sensitive than nylon"
  },
  "pro": {
   "de": "Sehr steif und hitzebeständig, formstabil",
   "en": "Very stiff and heat resistant, dimensionally stable"
  },
  "con": {
   "de": "Gehärtete Düse, hohe Temperaturen, Bauraum, Trocknung",
   "en": "Hardened nozzle, high temperatures, enclosure, drying"
  }
 },
 {
  "id": "PVA",
  "grp": "support",
  "diff": 4,
  "encl": 0,
  "hard": 0,
  "src": "R",
  "nozzle": {
   "de": "195 (PVA+) / 215 (BVOH)",
   "en": "195 (PVA+) / 215 (BVOH)"
  },
  "bed": {
   "de": "60",
   "en": "60"
  },
  "hdt": {
   "de": "",
   "en": ""
  },
  "tensile": {
   "de": "",
   "en": ""
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "",
   "en": ""
  },
  "dry": {
   "de": "trocken lagern (Dry-Box)",
   "en": "store dry (dry box)"
  },
  "name": {
   "de": "PVA / BVOH (wasserlöslich)",
   "en": "PVA / BVOH (water-soluble)"
  },
  "uses": {
   "de": "Stützmaterial für komplexe Überhänge (Multimaterial/Dual-Düse)",
   "en": "Support material for complex overhangs (multi-material / dual nozzle)"
  },
  "pro": {
   "de": "Löst sich in Wasser (ca. 1 g BVOH in 20 ml), ungiftig, geruchlos",
   "en": "Dissolves in water (ca. 1 g BVOH in 20 ml), non-toxic, odourless"
  },
  "con": {
   "de": "Sehr feuchtigkeitsempfindlich, teuer, braucht Multimaterial-Drucker und Spülen",
   "en": "Very moisture sensitive, expensive, needs a multi-material printer and purging"
  }
 },
 {
  "id": "HIPS",
  "grp": "support",
  "diff": 3,
  "encl": 1,
  "hard": 0,
  "src": "R",
  "nozzle": {
   "de": "225–255",
   "en": "225–255"
  },
  "bed": {
   "de": "100–110",
   "en": "100–110"
  },
  "hdt": {
   "de": "",
   "en": ""
  },
  "tensile": {
   "de": "",
   "en": ""
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "",
   "en": ""
  },
  "dry": {
   "de": "",
   "en": ""
  },
  "name": {
   "de": "HIPS (limonenlöslich)",
   "en": "HIPS (limonene-soluble)"
  },
  "uses": {
   "de": "Lösliches Stützmaterial für PETG; leicht, schleifbar",
   "en": "Soluble support for PETG; light, sandable"
  },
  "pro": {
   "de": "Löst sich in d-Limonen, haftet gut, mit Aceton glättbar",
   "en": "Dissolves in d-limonene, sticks well, smoothable with acetone"
  },
  "con": {
   "de": "Nicht als Support für ABS/ASA (lösen sich teils mit auf), Dämpfe, Warping",
   "en": "Not suitable as support for ABS/ASA (they partly dissolve too), fumes, warping"
  }
 },
 {
  "id": "PP",
  "grp": "tech",
  "diff": 5,
  "encl": 1,
  "hard": 0,
  "src": "R",
  "nozzle": {
   "de": "220–270",
   "en": "220–270"
  },
  "bed": {
   "de": "80–105",
   "en": "80–105"
  },
  "hdt": {
   "de": "",
   "en": ""
  },
  "tensile": {
   "de": "",
   "en": ""
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 0,9",
   "en": "approx. 0.9"
  },
  "dry": {
   "de": "",
   "en": ""
  },
  "name": {
   "de": "PP (Polypropylen)",
   "en": "PP (polypropylene)"
  },
  "uses": {
   "de": "Behälter, Laborteile, chemikalienbeständige und lebensmittelnahe Teile, Scharniere",
   "en": "Containers, lab parts, chemical-resistant and food-adjacent parts, living hinges"
  },
  "pro": {
   "de": "Sehr chemikalienbeständig, leicht, zäh und biegsam",
   "en": "Very chemical resistant, light, tough and bendable"
  },
  "con": {
   "de": "Haftet schlecht (PP-Platte/-Tape nötig), starkes Warping – Brim 5–10 mm",
   "en": "Poor bed adhesion (PP sheet/tape needed), strong warping – 5–10 mm brim"
  }
 },
 {
  "id": "GLOW",
  "grp": "effect",
  "diff": 2,
  "encl": 0,
  "hard": 1,
  "src": "R",
  "nozzle": {
   "de": "wie Basismaterial (PLA/PETG)",
   "en": "as base material (PLA/PETG)"
  },
  "bed": {
   "de": "wie Basismaterial",
   "en": "as base material"
  },
  "hdt": {
   "de": "",
   "en": ""
  },
  "tensile": {
   "de": "",
   "en": ""
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "",
   "en": ""
  },
  "dry": {
   "de": "",
   "en": ""
  },
  "name": {
   "de": "Glow-in-the-Dark",
   "en": "Glow-in-the-dark"
  },
  "uses": {
   "de": "Dekoration, Spielzeug, Notfall-/Orientierungsmarken",
   "en": "Decor, toys, emergency/orientation markers"
  },
  "pro": {
   "de": "Leuchtet nach Aufladen im Dunkeln nach",
   "en": "Glows in the dark after charging"
  },
  "con": {
   "de": "Leuchtpigmente (Strontiumaluminat) sind abrasiv → gehärtete Düse empfohlen (Prusa: hoher Pigmentanteil)",
   "en": "Glow pigments (strontium aluminate) are abrasive → hardened nozzle recommended (Prusa: high pigment content)"
  }
 },
 {
  "id": "HIGH",
  "grp": "high",
  "diff": 5,
  "encl": 2,
  "hard": 1,
  "src": "P,R",
  "nozzle": {
   "de": "deutlich über 300 (laut Hersteller)",
   "en": "well above 300 (per manufacturer)"
  },
  "bed": {
   "de": "laut Hersteller (beheizte Kammer)",
   "en": "per manufacturer (heated chamber)"
  },
  "hdt": {
   "de": "z. B. PPS-CF10: ca. 252 (getempert)",
   "en": "e.g. PPS-CF10: approx. 252 (annealed)"
  },
  "tensile": {
   "de": "z. B. PPS-CF10: ca. 59",
   "en": "e.g. PPS-CF10: approx. 59"
  },
  "elong": {
   "de": "",
   "en": ""
  },
  "shore": {
   "de": "",
   "en": ""
  },
  "dens": {
   "de": "ca. 1,3",
   "en": "approx. 1.3"
  },
  "dry": {
   "de": "laut Hersteller",
   "en": "per manufacturer"
  },
  "name": {
   "de": "Hochleistung: PEI (Ultem), PPS, PEEK, PEKK, PSU",
   "en": "High-performance: PEI (Ultem), PPS, PEEK, PEKK, PSU"
  },
  "uses": {
   "de": "Luft-/Raumfahrt, Industrie, extreme Hitze und Chemikalien",
   "en": "Aerospace, industry, extreme heat and chemicals"
  },
  "pro": {
   "de": "Extreme Hitze- und Chemikalienbeständigkeit",
   "en": "Extreme heat and chemical resistance"
  },
  "con": {
   "de": "Nur mit Spezialdruckern (Kammer > 100 °C, Hochtemperatur-Hotend), sehr teuer",
   "en": "Only with special printers (chamber > 100 °C, high-temp hotend), very expensive"
  }
 }
]
};
