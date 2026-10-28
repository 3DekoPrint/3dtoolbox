/* ==========================================================================
   3DToolBox — zentraler Filament-Katalog (Filament-Finder + Filament-Datenbank, DE + EN)

   Hier legst du fest, WELCHE Anbieter angezeigt werden und WIE ihre Kauflinks
   (mit deinen Affiliate-IDs) aufgebaut sind. Finder und Datenbank lesen nur noch
   diese Datei.

   AKTIV (zugelassen):  Sunlu (UpPromote) · Elegoo (Impact) · Recreus (Awin) · Redline Filament (Awin)

   ANBIETER AKTIVIEREN:  Den passenden Block unter "PROVIDERS" bzw. "ROWS" weiter
   unten suchen und die Kommentarzeichen "//" am Zeilenanfang entfernen.
   ANBIETER DEAKTIVIEREN: Zeilen wieder mit "//" auskommentieren.
   Zeilenformat der Daten: [Material, Name, Hex, Produkt-Handle, Varianten-ID, deutscher Name, Farbname, deutscher Farbname]
   ========================================================================== */
(function () {
  'use strict';

  // ---- Deine Partner-IDs --------------------------------------------------
  var AWIN_ID   = '3021867';
  var CLICKREF  = '3dtoolbox';
  var enc = encodeURIComponent;

  function awin(mid, url) {
    return 'https://www.awin1.com/cread.php?awinmid=' + mid + '&awinaffid=' + AWIN_ID +
           '&clickref=' + CLICKREF + '&ued=' + enc(url);
  }
  function q(vid) { return vid ? '?variant=' + vid : ''; }

  // ---- Anbieter -----------------------------------------------------------
  var PROVIDERS = {
    sunlu: {       // UpPromote-Programm (Sunlu), Referral-Code im Link
      brand: 'Sunlu', shop: 'Sunlu Store',
      link: function (h, v) {
        return 'https://store.sunlu.com/products/' + h + (v ? '?variant=' + v + '&' : '?') + 'sca_ref=12035451.b0drKv4XdP';
      }
    },
    elegoo: {      // Impact-Programm (Elegoo), Deeplink
      brand: 'Elegoo', shop: 'Elegoo Store',
      link: function (h, v) {
        return 'https://elegoo.sjv.io/vDmNyO?u=' + enc('https://eu.elegoo.com/products/' + h + q(v));
      }
    },
    recreus: {     // Awin Merchant 128357
      brand: 'Recreus', shop: 'Recreus',
      link: function (h) { return awin(128357, 'https://recreus.com/en/products/' + h); }  // ?variant= wird vom Shop ignoriert (öffnet immer Schwarz) -> Farbe wählt der Nutzer im Shop
    },
    redline: {     // Awin Merchant 22266
      brand: 'Redline Filament', shop: 'Redline Filament',
      link: function (h) { return awin(22266, 'https://redline-filament.com/products/' + h); }
    }
    // ------------------------------------------------------------------------
    // NOCH NICHT AKTIV — zum Aktivieren die "//" entfernen (und das Komma vor dem Block beachten):
    // ,
    // bambu: {   // 3DJake (Bewerbung läuft, noch kein Affiliate-Link!) — Daten siehe ROWS unten
    //   brand: 'Bambu Lab', shop: '3DJake',
    //   link: function (h) { return 'https://www.3djake.de/' + h; }   // später durch Affiliate-Deeplink ersetzen
    // },
    // anycubic: {   // Awin Merchant 69360 (zugelassen, aber EU-Filament derzeit ausverkauft / keine Daten)
    //   brand: 'Anycubic', shop: 'Anycubic Store',
    //   link: function (h, v) { return awin(69360, 'https://store.anycubic.com/products/' + h + q(v)); }
    // },
    // esun: {       // Awin Merchant 99267 (zugelassen, Daten fehlen noch)
    //   brand: 'eSUN', shop: 'eSUN Store',
    //   link: function (h, v) { return awin(99267, 'https://esun3dstore.com/products/' + h + q(v)); }
    // },
    // sovol: {      // Awin Merchant 124706 (zugelassen, kein Filament-Sortiment erfasst)
    //   brand: 'Sovol', shop: 'Sovol EU',
    //   link: function (h, v) { return awin(124706, 'https://www.sovol.eu/products/' + h + q(v)); }
    // },
    // azurefilm: {  // Awin Merchant 106471 (zugelassen, Daten fehlen noch)
    //   brand: 'Azurefilm', shop: 'Azurefilm',
    //   link: function (h) { return awin(106471, 'https://www.azurefilm.de/' + h); }
    // },
    // do3d: {       // Awin Merchant 127865 (zugelassen, Daten fehlen noch)
    //   brand: 'Do3D', shop: 'Do3D',
    //   link: function (h) { return awin(127865, 'https://do3d.com/' + h); }
    // }
  };

  // ---- Daten --------------------------------------------------------------
  var ROWS = {
    sunlu: [
    ["PLA", "PLA Lightweight White", "#dfdfdd", "sunlu-pla-lightweight-lwpla-3d-printer-filament-0-8kg", 52721972642074, "", "White", ""],
    ["PLA", "PLA Metallic Azurite", "#2d5597", "sunlu-pla-metallic-3d-filament-1kg", 52721962975514, "", "Azurite", ""],
    ["PLA", "PLA Metallic Brass Gold", "#917049", "sunlu-pla-metallic-3d-filament-1kg", 52721962942746, "", "Brass Gold", ""],
    ["PETG", "PETG 2.0 Lavender Purple", "#8470c9", "petg-v2-3d-printer-filament-1kg", 52687843819802, "", "Lavender Purple", ""],
    ["PETG", "PETG 2.0 Beige", "#f2d9ca", "petg-v2-3d-printer-filament-1kg", 52687843885338, "", "Beige", ""],
    ["PETG", "PETG 2.0 Aqua Blue", "#02b9b9", "petg-v2-3d-printer-filament-1kg", 52687864037658, "", "Aqua Blue", ""],
    ["PETG", "PETG 2.0 Blush Pink", "#fbceca", "petg-v2-3d-printer-filament-1kg", 52687864070426, "", "Blush Pink", ""],
    ["PETG", "PETG 2.0 Peach Pink", "#f89984", "petg-v2-3d-printer-filament-1kg", 52687864103194, "", "Peach Pink", ""],
    ["PLA", "SILK PLA+ 2.0 Vivid Rose", "#e94b95", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52687944778010, "", "Vivid Rose", ""],
    ["PLA", "SILK PLA+ 2.0 Violet", "#8c60d7", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457531674, "", "Violet", ""],
    ["PLA", "SILK PLA+ 2.0 Shiny Blue", "#3a98e5", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457564442, "", "Shiny Blue", ""],
    ["PLA", "SILK PLA+ 2.0 Glossy Lake Cyan", "#1fa6af", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457597210, "", "Glossy Lake Cyan", ""],
    ["PLA", "SILK PLA+ 2.0 Streamer Blue", "#a0beea", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457629978, "", "Streamer Blue", ""],
    ["PLA", "SILK PLA+ 2.0 Metallic Green", "#5f9067", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457695514, "", "Metallic Green", ""],
    ["PLA", "SILK PLA+ 2.0 Satin Glow Orange", "#f16a38", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457728282, "", "Satin Glow Orange", ""],
    ["PLA", "SILK PLA+ 2.0 Luxury Bright Red", "#f53a45", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457793818, "", "Luxury Bright Red", ""],
    ["PLA", "SILK PLA+ 2.0 Copper Red", "#c46b4e", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457826586, "", "Copper Red", ""],
    ["PLA", "SILK PLA+ 2.0 Silver", "#a1afbe", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457859354, "", "Silver", ""],
    ["PLA", "SILK PLA+ 2.0 Soft Satin Pink", "#efacbd", "silk-pla-plus-v2-3d-printer-filament-1kg-enhanced-silk-shine", 52688457892122, "", "Soft Satin Pink", ""],
    ["TPU", "TPU-SILK Black", "#393939", "1-75mm-sunlu-tpu-silk-3d-printer-filament-1kg-roll", 47027831308570, "", "Black", ""],
    ["TPU", "TPU-SILK Cream White", "#efe8cb", "1-75mm-sunlu-tpu-silk-3d-printer-filament-1kg-roll", 47027831341338, "", "Cream White", ""],
    ["TPU", "TPU-SILK Burgundy", "#57363f", "1-75mm-sunlu-tpu-silk-3d-printer-filament-1kg-roll", 47027831439642, "", "Burgundy", ""],
    ["TPU", "TPU-SILK Dark Blue", "#363964", "1-75mm-sunlu-tpu-silk-3d-printer-filament-1kg-roll", 47027831406874, "", "Dark Blue", ""],
    ["PLA", "PLA Black", "#292929", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079868944666, "", "Black", ""],
    ["PLA", "PLA White", "#f0efed", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079868977434, "", "White", ""],
    ["PLA", "PLA Midnight", "#212237", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50751425413402, "", "Midnight", ""],
    ["PLA", "PLA Ceramic White", "#e0e1e6", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50751425544474, "", "Ceramic White", ""],
    ["PLA", "PLA Roasted Chestnut Black", "#2c1815", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50751425478938, "", "Roasted Chestnut Black", ""],
    ["PLA", "PLA Blue", "#141fa7", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869534490, "", "Blue", ""],
    ["PLA", "PLA Green", "#329e28", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869468954, "", "Green", ""],
    ["PLA", "PLA Grass Green", "#357c63", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869436186, "", "Grass Green", ""],
    ["PLA", "PLA Silver", "#becad9", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869075738, "", "Silver", ""],
    ["PLA", "PLA Sunny Orange", "#fb7d29", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869108506, "", "Sunny Orange", ""],
    ["PLA", "PLA Lemon Yellow", "#eced70", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869174042, "", "Lemon Yellow", ""],
    ["PLA", "PLA Sky Blue", "#31ccfa", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869206810, "", "Sky Blue", ""],
    ["PLA", "PLA Mint Green", "#04b09c", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869305114, "", "Mint Green", ""],
    ["PLA", "PLA Red", "#bb282a", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869370650, "", "Red", ""],
    ["PLA", "PLA Cyan", "#0297d1", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50403691331866, "", "Cyan", ""],
    ["PLA", "PLA Transparent", "#dfdfdd", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50403692577050, "", "Transparent", ""],
    ["PLA", "PLA Transparent Red", "#d02a36", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50403701850394, "", "Transparent Red", ""],
    ["PLA", "PLA Transparent Blue", "#3f69fc", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50403702145306, "", "Transparent Blue", ""],
    ["PLA", "PLA Transparent Green", "#03a91f", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50403702079770, "", "Transparent Green", ""],
    ["PLA", "PLA Transparent Purple", "#8831ba", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50751425773850, "", "Transparent Purple", ""],
    ["PLA", "PLA Magenta", "#c1206b", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 50079869272346, "", "Magenta", ""],
    ["PLA", "PLA Blue Grey", "#3573cd", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 40115907264598, "", "Blue Grey", ""],
    ["PLA", "PLA Fluorescent Blue", "#363bf0", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51666469814554, "", "Fluorescent Blue", ""],
    ["PLA", "PLA Fluorescent Purple", "#8447fc", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51666481840410, "", "Fluorescent Purple", ""],
    ["PLA", "PLA Fluorescent Red", "#fd4c1b", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51666473320730, "", "Fluorescent Red", ""],
    ["PLA", "PLA Fluorescent Orange", "#fd7828", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51666477449498, "", "Fluorescent Orange", ""],
    ["PLA", "PLA Fluorescent Yellow", "#e7e903", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51664757227802, "", "Fluorescent Yellow", ""],
    ["PLA", "PLA Strawberry Jam", "#fc5956", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51664739959066, "", "Strawberry Jam", ""],
    ["PLA", "PLA Orange Juice", "#fd960e", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51664739926298, "", "Orange Juice", ""],
    ["PLA", "PLA Grape Jelly", "#b081ed", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51664739991834, "", "Grape Jelly", ""],
    ["PLA", "PLA Mint Ice", "#1bd6a7", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51664740024602, "", "Mint Ice", ""],
    ["PLA", "PLA Ocean Haze", "#4a87b4", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51664740057370, "", "Ocean Haze", ""],
    ["PLA", "PLA Mist Black", "#2d3340", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 51664740090138, "", "Mist Black", ""],
    ["PLA", "PLA Pistachio Green", "#b8d791", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 52884622672154, "", "Pistachio Green", ""],
    ["PLA", "PLA Sage Green", "#a2bdab", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 52884627357978, "", "Sage Green", ""],
    ["PLA", "PLA Pastel Blue", "#8dc1d9", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 52884631027994, "", "Pastel Blue", ""],
    ["PLA", "PLA Peach Pink", "#ef9b8a", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 52884635353370, "", "Peach Pink", ""],
    ["PLA", "PLA Earth Green", "#34421e", "over-6kg-of-pla-pla-meta-3d-filaments-1kg-2-2lbs-fit-most-of-fdm-printer", 52884616937754, "", "Earth Green", ""],
    ],
    elegoo: [
    ["PLA", "PLA Translucent Red", "#ea140e", "pla-translucent", 53395021824276, "", "Red", ""],
    ["PLA", "PLA Translucent Yellow", "#fbec07", "pla-translucent", 53395021857044, "", "Yellow", ""],
    ["PLA", "PLA Translucent Light Blue", "#339bf7", "pla-translucent", 53395021889812, "", "Light Blue", ""],
    ["PLA", "PLA Translucent Green", "#08e327", "pla-translucent", 53395021922580, "", "Green", ""],
    ["PLA", "PLA Translucent Pink", "#f9b0bd", "pla-translucent", 53395021955348, "", "Pink", ""],
    ["PETG", "PETG Glitter Black", "#707372", "petg-glitter", 53687628726548, "", "Glitter Black", ""],
    ["PETG", "PETG Glitter Blue", "#006298", "petg-glitter", 53687628792084, "", "Glitter Blue", ""],
    ["PETG", "PETG Glitter Orange", "#ff7f41", "petg-glitter", 53687628824852, "", "Glitter Orange", ""],
    ["PETG", "PETG Glitter Light Grey", "#b2b4b2", "petg-glitter", 53687628857620, "", "Glitter Light Grey", ""],
    ["PETG", "PETG Glitter Light Pink", "#cca1a6", "petg-glitter", 53687628890388, "", "Glitter Light Pink", ""],
    ["PETG", "PETG Glitter Light Purple", "#c6a1cf", "petg-glitter", 53687628923156, "", "Glitter Light Purple", ""],
    ["PETG", "PETG Glitter Light Brown", "#dda46f", "petg-glitter", 53687628955924, "", "Glitter Light Brown", ""],
    ["PETG", "PETG Glitter Teal Green", "#00685e", "petg-glitter", 53687628988692, "", "Glitter Teal Green", ""],
    ["PETG", "PETG Glitter Purple Pink", "#b580d1", "petg-glitter", 53687629021460, "", "Glitter Purple Pink", ""],
    ["PETG", "PETG Glitter Olive Green", "#708573", "petg-glitter", 53687629054228, "", "Glitter Olive Green", ""],
    ["PETG", "PETG Glitter Olive Yellow", "#bbb323", "petg-glitter", 53687629086996, "", "Glitter Olive Yellow", ""],
    ["TPU", "TPU 72D Black", "#000000", "tpu-72d", 53633302069524, "", "Black", ""],
    ["TPU", "TPU 72D Grey", "#8f949b", "tpu-72d", 53633302167828, "", "Grey", ""],
    ["TPU", "TPU 72D Red", "#ea140e", "tpu-72d", 53633302200596, "", "Red", ""],
    ["TPU", "TPU 72D Yellow", "#fbec07", "tpu-72d", 53633302233364, "", "Yellow", ""],
    ["TPU", "TPU 72D Blue", "#2240af", "tpu-72d", 53633302266132, "", "Blue", ""],
    ["TPU", "TPU 72D Green", "#08e327", "tpu-72d", 53633302298900, "", "Green", ""],
    ["PETG", "PETG HF Black", "#000000", "petg-hf", 53388428083476, "", "Black", ""],
    ["PETG", "PETG HF Space Grey", "#7e7e7e", "petg-hf", 53390223868180, "", "Space Grey", ""],
    ["PLA", "PLA CMYK Rilievo Yellow", "#f4ee2a", "pla-cmyk", 53633327399188, "", "Rilievo Yellow", ""],
    ["PLA", "PLA CMYK Rilievo White", "#ffffff", "pla-cmyk", 53633327431956, "", "Rilievo White", ""],
    ["PLA", "PLA CMYK Rilievo Cyan", "#0086d6", "pla-cmyk", 53633327464724, "", "Rilievo Cyan", ""],
    ["PLA", "PLA CMYK Rilievo Magenta", "#ec008c", "pla-cmyk", 53633327497492, "", "Rilievo Magenta", ""],
    ["ASA", "ASA Blue", "#2240af", "asa-filament-1-75mm-colored-10kg", 51188487454996, "", "Blue", ""],
    ["ASA", "ASA Grey", "#8f949b", "asa-filament-1-75mm-colored-10kg", 51188487520532, "", "Grey", ""],
    ["ASA", "ASA Red", "#ea140e", "asa-filament-1-75mm-colored-10kg", 51188487553300, "", "Red", ""],
    ["ASA", "ASA Deep Black", "#000000", "asa-filament-1-75mm-colored-10kg", 51638714040596, "", "Deep Black", ""],
    ["ASA", "ASA Green", "#08b690", "asa-filament-1-75mm-colored-10kg", 52576861716756, "", "Green", ""],
    ["PLA", "PLA emoji Black", "#000000", "pla-rfid-emoji-edition", 52547169222932, "", "Black", ""],
    ["PLA", "PLA emoji Grey", "#8f949b", "pla-rfid-emoji-edition", 52547169288468, "", "Grey", ""],
    ["PLA", "PLA emoji Red", "#ea140e", "pla-rfid-emoji-edition", 52547169321236, "", "Red", ""],
    ["PLA", "PLA emoji Yellow", "#fbec07", "pla-rfid-emoji-edition", 52547169354004, "", "Yellow", ""],
    ["PLA", "PLA emoji Orange", "#fd7c18", "pla-rfid-emoji-edition", 52547169386772, "", "Orange", ""],
    ["PLA", "PLA emoji Dark Blue", "#2240af", "pla-rfid-emoji-edition", 52547169419540, "", "Dark Blue", ""],
    ["PLA", "PLA emoji Neon Green", "#08e327", "pla-rfid-emoji-edition", 52547169452308, "", "Neon Green", ""],
    ["PLA", "PLA emoji Pink", "#f9b0bd", "pla-rfid-emoji-edition", 52547169485076, "", "Pink", ""],
    ["PLA", "PLA emoji Purple", "#603ba0", "pla-rfid-emoji-edition", 52547169517844, "", "Purple", ""],
    ["PLA", "PLA emoji Sky Blue", "#32d0ec", "pla-rfid-emoji-edition", 52547169550612, "", "Sky Blue", ""],
    ["PLA", "PLA emoji Sea Green", "#08b690", "pla-rfid-emoji-edition", 52547169583380, "", "Sea Green", ""],
    ["PLA", "PLA emoji Space Grey", "#7e7e7e", "pla-rfid-emoji-edition", 52547169616148, "", "Space Grey", ""],
    ["PLA", "PLA emoji Wood Color", "#b19870", "pla-rfid-emoji-edition", 52547169648916, "", "Wood Color", ""],
    ["PLA", "PLA emoji Brown", "#9e6a4b", "pla-rfid-emoji-edition", 52547169681684, "", "Brown", ""],
    ["PLA", "PLA emoji Beige", "#f4e0b8", "pla-rfid-emoji-edition", 52547169714452, "", "Beige", ""],
    ["PLA", "PLA Black", "#000000", "pla-filament-1-75mm-colored-5kg", 52267249467668, "", "Black", ""],
    ["PLA", "PLA Grey", "#8f949b", "pla-filament-1-75mm-colored-5kg", 52267249533204, "", "Grey", ""],
    ["PLA", "PLA Neon Green", "#08e327", "pla-filament-1-75mm-colored-5kg", 52267249565972, "", "Neon Green", ""],
    ["PLA", "PLA Dark Blue", "#2240af", "pla-filament-1-75mm-colored-5kg", 52267249598740, "", "Dark Blue", ""],
    ["PLA", "PLA Red", "#ea140e", "pla-filament-1-75mm-colored-5kg", 52267249631508, "", "Red", ""],
    ["PLA", "PLA Yellow", "#fbec07", "pla-filament-1-75mm-colored-5kg", 52267249664276, "", "Yellow", ""],
    ["PLA", "PLA Orange", "#fd7c18", "pla-filament-1-75mm-colored-5kg", 52267249697044, "", "Orange", ""],
    ["PLA", "PLA Pink", "#f9b0bd", "pla-filament-1-75mm-colored-5kg", 52267249729812, "", "Pink", ""],
    ["PLA", "PLA Purple", "#603ba0", "pla-filament-1-75mm-colored-5kg", 52267249762580, "", "Purple", ""],
    ["PLA", "PLA Sky Blue", "#32d0ec", "pla-filament-1-75mm-colored-5kg", 52267249828116, "", "Sky Blue", ""],
    ["PLA", "PLA Sea Green", "#08b690", "pla-filament-1-75mm-colored-5kg", 52267249860884, "", "Sea Green", ""],
    ["PLA", "PLA Space Grey", "#7e7e7e", "pla-filament-1-75mm-colored-5kg", 52267249893652, "", "Space Grey", ""],
    ["PLA", "PLA Wood Color", "#b19870", "pla-filament-1-75mm-colored-5kg", 52267249926420, "", "Wood Color", ""],
    ["PLA", "PLA Brown", "#9e6a4b", "pla-filament-1-75mm-colored-5kg", 52267249959188, "", "Brown", ""],
    ["PLA", "PLA Beige", "#f4e0b8", "pla-filament-1-75mm-colored-5kg", 52267249991956, "", "Beige", ""],
    ["PLA", "PLA Copper Filled", "#895837", "pla-filament-1-75mm-colored-5kg", 52267250024724, "", "Copper Filled", ""],
    ["PLA", "PLA Glow Blue", "#80cbf7", "pla-glow", 51894621339924, "", "Glow Blue", ""],
    ["PLA", "PLA Glow Green", "#ade589", "pla-glow", 51894621372692, "", "Glow Green", ""],
    ["PLA", "PLA Glow Orange", "#ffa067", "pla-glow", 51894621438228, "", "Glow Orange", ""],
    ["PLA", "PLA Silk Gold", "#ffd10e", "silk-pla-filament-1-75mm-colored-10kg", 50527488147732, "", "Silk Gold", ""],
    ["PLA", "PLA Silk Coral Pink", "#f4717d", "silk-pla-filament-1-75mm-colored-10kg", 50527488278804, "", "Silk Coral Pink", ""],
    ["PLA", "PLA Silk Mint Green", "#53d8d4", "silk-pla-filament-1-75mm-colored-10kg", 50527488311572, "", "Silk Mint Green", ""],
    ["PLA", "PLA Silk Silver Grey", "#dbdde2", "silk-pla-filament-1-75mm-colored-10kg", 51797806088468, "", "Silk Silver Grey", ""],
    ["PLA", "Rapid PLA Plus Black", "#000000", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315391252, "", "Black", ""],
    ["PLA", "Rapid PLA Plus Grey", "#8f949b", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315456788, "", "Grey", ""],
    ["PLA", "Rapid PLA Plus Blue", "#2240af", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315489556, "", "Blue", ""],
    ["PLA", "Rapid PLA Plus Green", "#08e327", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315522324, "", "Green", ""],
    ["PLA", "Rapid PLA Plus Red", "#ea140e", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315555092, "", "Red", ""],
    ["PLA", "Rapid PLA Plus Orange", "#fd7c18", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315587860, "", "Orange", ""],
    ["PLA", "Rapid PLA Plus Yellow", "#fbec07", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315620628, "", "Yellow", ""],
    ["PLA", "Rapid PLA Plus Silver", "#9f9f9f", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315653396, "", "Silver", ""],
    ["PLA", "Rapid PLA Plus Beige", "#f4e0b8", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315686164, "", "Beige", ""],
    ["PLA", "Rapid PLA Plus Brown", "#9e6a4b", "rapid-pla-plus-filament-1-75mm-colored-5kg", 51482315718932, "", "Brown", ""],
    ["PLA", "PLA Plus Black", "#000000", "pla-plus-filament-1-75mm-colored-5kg", 51482016514324, "", "Black", ""],
    ["PLA", "PLA Plus Grey", "#8f949b", "pla-plus-filament-1-75mm-colored-5kg", 51482016579860, "", "Grey", ""],
    ["PLA", "PLA Plus Neon Green", "#08e327", "pla-plus-filament-1-75mm-colored-5kg", 51482016612628, "", "Neon Green", ""],
    ["PLA", "PLA Plus Dark Blue", "#2240af", "pla-plus-filament-1-75mm-colored-5kg", 51482016645396, "", "Dark Blue", ""],
    ["PLA", "PLA Plus Red", "#ea140e", "pla-plus-filament-1-75mm-colored-5kg", 51482016678164, "", "Red", ""],
    ["PLA", "PLA Plus Yellow", "#fbec07", "pla-plus-filament-1-75mm-colored-5kg", 51482016710932, "", "Yellow", ""],
    ["PLA", "PLA Plus Orange", "#fd7c18", "pla-plus-filament-1-75mm-colored-5kg", 51482016743700, "", "Orange", ""],
    ["PLA", "PLA Plus Pink", "#f9b0bd", "pla-plus-filament-1-75mm-colored-5kg", 51482016776468, "", "Pink", ""],
    ["PLA", "PLA Plus Purple", "#603ba0", "pla-plus-filament-1-75mm-colored-5kg", 51482016809236, "", "Purple", ""],
    ["PLA", "PLA Plus Sky Blue", "#32d0ec", "pla-plus-filament-1-75mm-colored-5kg", 51482016874772, "", "Sky Blue", ""],
    ["PLA", "PLA Plus Sea Green", "#08b690", "pla-plus-filament-1-75mm-colored-5kg", 51482016907540, "", "Sea Green", ""],
    ["PLA", "PLA Plus Space Grey", "#7e7e7e", "pla-plus-filament-1-75mm-colored-5kg", 51482016940308, "", "Space Grey", ""],
    ["PLA", "PLA Plus Wood Color", "#b19870", "pla-plus-filament-1-75mm-colored-5kg", 51482016973076, "", "Wood Color", ""],
    ["PLA", "PLA Plus Beige", "#f4e0b8", "pla-plus-filament-1-75mm-colored-5kg", 51482017005844, "", "Beige", ""],
    ["PLA", "PLA Plus Brown", "#9e6a4b", "pla-plus-filament-1-75mm-colored-5kg", 51482017038612, "", "Brown", ""],
    ["PLA", "PLA Wood filled", "#9d8058", "pla-wood", 51422752538900, "", "Wood filled", ""],
    ["PLA", "PLA Wood Oak Wood/Light Brown", "#d7c4b4", "pla-wood", 51422752604436, "", "Oak Wood/Light Brown", ""],
    ["PLA", "PLA Wood Walnut Wood", "#77504a", "pla-wood", 51422752637204, "", "Walnut Wood", ""],
    ["PLA", "PLA Wood Rosewood", "#523530", "pla-wood", 51422752669972, "", "Rosewood", ""],
    ["PLA", "PLA Wood Tan Birch", "#f2e9dd", "pla-wood", 51422752702740, "", "Tan Birch", ""],
    ["PLA", "PLA Wood Medium Brown", "#885a40", "pla-wood", 51422752735508, "", "Medium Brown", ""],
    ["PLA", "PLA Metallic Metal Gold", "#706457", "pla-metal-filament-1-75-mm-colored-1-kg", 51170282012948, "", "Metal Gold", ""],
    ["PLA", "PLA Metallic Metal Bronze", "#614638", "pla-metal-filament-1-75-mm-colored-1-kg", 51170282045716, "", "Metal Bronze", ""],
    ["PLA", "PLA Metallic Metal Blue", "#3a4e6a", "pla-metal-filament-1-75-mm-colored-1-kg", 51170282078484, "", "Metal Blue", ""],
    ["PLA", "PLA Matte Black", "#090909", "pla-matte-filament-1-75mm-colored-10kg", 50528033341716, "", "Matte Black", ""],
    ["PLA", "PLA Matte White", "#f6f6f6", "pla-matte-filament-1-75mm-colored-10kg", 50528033374484, "", "Matte White", ""],
    ["PLA", "PLA Matte Slate Grey", "#969799", "pla-matte-filament-1-75mm-colored-10kg", 50528033407252, "", "Slate Grey", ""],
    ["PLA", "PLA Matte Ruby Red", "#bb2c2e", "pla-matte-filament-1-75mm-colored-10kg", 50528033440020, "", "Ruby Red", ""],
    ["PLA", "PLA Matte Navy Blue", "#2d3f6f", "pla-matte-filament-1-75mm-colored-10kg", 50528033472788, "", "Navy Blue", ""],
    ["PLA", "PLA Matte Ice Blue", "#b3f3fd", "pla-matte-filament-1-75mm-colored-10kg", 50528033505556, "", "Ice Blue", ""],
    ["PLA", "PLA Matte Teal Green", "#74cdc7", "pla-matte-filament-1-75mm-colored-10kg", 50528033538324, "", "Teal Green", ""],
    ["PLA", "PLA Matte Mint Green", "#dbebba", "pla-matte-filament-1-75mm-colored-10kg", 50528033571092, "", "Mint Green", ""],
    ["PLA", "PLA Matte Sunshine Yellow", "#f7d863", "pla-matte-filament-1-75mm-colored-10kg", 50528033603860, "", "Sunshine Yellow", ""],
    ["PLA", "PLA Matte Lavender Purple", "#9d85d1", "pla-matte-filament-1-75mm-colored-10kg", 50528033636628, "", "Lavender Purple", ""],
    ["PLA", "PLA Matte Sakura Pink", "#f9c2d5", "pla-matte-filament-1-75mm-colored-10kg", 50528033669396, "", "Sakura Pink", ""],
    ["PLA", "PLA Matte Beige", "#f4e0b8", "pla-matte-filament-1-75mm-colored-10kg", 50528033702164, "", "Beige", ""],
    ["PLA", "PLA Matte Earth Brown", "#805947", "pla-matte-filament-1-75mm-colored-10kg", 51247916450068, "", "Earth Brown", ""],
    ["TPU", "Rapid TPU 95A Black", "#000000", "rapid-tpu-filament-1-75mm-colored-1kg", 50832286581012, "", "Black", ""],
    ["TPU", "Rapid TPU 95A Red", "#ea140e", "rapid-tpu-filament-1-75mm-colored-1kg", 50832286646548, "", "Red", ""],
    ["PLA", "PLA Basic Refill Black", "#000000", "pla-basic-filament-1-75mm-colored-1kg", 51589494604052, "", "Black", ""],
    ["PLA", "PLA Basic Refill Red", "#ea140e", "pla-basic-filament-1-75mm-colored-1kg", 51589494636820, "", "Red", ""],
    ["PLA", "PLA Basic Refill Yellow", "#fbec07", "pla-basic-filament-1-75mm-colored-1kg", 51589494669588, "", "Yellow", ""],
    ["PLA", "PLA Basic Refill Cyan", "#3aa2ff", "pla-basic-filament-1-75mm-colored-1kg", 51589494702356, "", "Cyan", ""],
    ["PLA", "PLA Basic Refill Purple", "#603ba0", "pla-basic-filament-1-75mm-colored-1kg", 51589494735124, "", "Purple", ""],
    ["PLA", "PLA Basic Refill Cocoa Brown", "#665345", "pla-basic-filament-1-75mm-colored-1kg", 51589494767892, "", "Cocoa Brown", ""],
    ["PLA", "PLA Basic Refill Hot Pink", "#ff5d8e", "pla-basic-filament-1-75mm-colored-1kg", 51589494800660, "", "Hot Pink", ""],
    ["PLA", "PLA Basic Refill Sunflower Yellow", "#fbb404", "pla-basic-filament-1-75mm-colored-1kg", 51589494833428, "", "Sunflower Yellow", ""],
    ["PLA", "PLA Basic Refill Cobalt Blue", "#1341d2", "pla-basic-filament-1-75mm-colored-1kg", 51589494866196, "", "Cobalt Blue", ""],
    ["PLA", "PLA Basic Refill Apple Green", "#c2de31", "pla-basic-filament-1-75mm-colored-1kg", 51589494898964, "", "Apple Green", ""],
    ["PLA", "PLA Basic Refill Turquoise Green", "#23c5c5", "pla-basic-filament-1-75mm-colored-1kg", 51589494931732, "", "Turquoise Green", ""],
    ["PLA", "PLA Basic Refill Grey", "#8f949b", "pla-basic-filament-1-75mm-colored-1kg", 51589494997268, "", "Grey", ""],
    ["PLA", "PLA Basic Refill Beige", "#f4e0b8", "pla-basic-filament-1-75mm-colored-1kg", 51589495030036, "", "Beige", ""],
    ["PLA", "PLA Basic Refill Pink", "#f9b0bd", "pla-basic-filament-1-75mm-colored-1kg", 51589495062804, "", "Pink", ""],
    ["PLA", "PLA Basic Refill Green", "#08e327", "pla-basic-filament-1-75mm-colored-1kg", 51589495128340, "", "Green", ""],
    ["PLA", "PLA Basic Refill Misty Blue", "#586d83", "pla-basic-filament-1-75mm-colored-1kg", 51597358039316, "", "Misty Blue", ""],
    ["PLA", "PLA Basic Refill Orange", "#fd7c18", "pla-basic-filament-1-75mm-colored-1kg", 51797966061844, "", "Orange", ""],
    ["ABS", "ABS Red", "#ea140e", "abs-filament-1-75mm-colored-1kg", 50502335070484, "", "Red", ""],
    ["ABS", "ABS Grey", "#8f949b", "abs-filament-1-75mm-colored-1kg", 50502335103252, "", "Grey", ""],
    ["ABS", "ABS Blue", "#2240af", "abs-filament-1-75mm-colored-1kg", 50502335136020, "", "Blue", ""],
    ["ABS", "ABS Orange", "#fd7c18", "abs-filament-1-75mm-colored-1kg", 50502335168788, "", "Orange", ""],
    ["ABS", "ABS Yellow", "#fbec07", "abs-filament-1-75mm-colored-1kg", 51988540522772, "", "Yellow", ""],
    ["ABS", "ABS Green", "#08e327", "abs-filament-1-75mm-colored-1kg", 51988540555540, "", "Green", ""],
    ["ABS", "ABS Purple", "#a506b4", "abs-filament-1-75mm-colored-1kg", 51988540588308, "", "Purple", ""],
    ["ABS", "ABS Pink", "#f77d7f", "abs-filament-1-75mm-colored-1kg", 51988540621076, "", "Pink", ""],
    ["ABS", "ABS Cyan", "#8de2b8", "abs-filament-1-75mm-colored-1kg", 51988540653844, "", "Cyan", ""],
    ["ABS", "ABS Olive Green", "#589c00", "abs-filament-1-75mm-colored-1kg", 51988540686612, "", "Olive Green", ""],
    ["ABS", "ABS Sky Blue", "#36a7f7", "abs-filament-1-75mm-colored-1kg", 51988540719380, "", "Sky Blue", ""],
    ["ABS", "ABS Orange Yellow", "#e3bf1f", "abs-filament-1-75mm-colored-1kg", 51988540752148, "", "Orange Yellow", ""],
    ["ABS", "ABS Navy Blue", "#2d3f6f", "abs-filament-1-75mm-colored-1kg", 51988540784916, "", "Navy Blue", ""],
    ["PETG", "PETG-GF Glass Fiber Black", "#0c0908", "petg-gf-filament-1-75mm-colored-1kg", 50497382940948, "", "Glass Fiber Black", ""],
    ["PETG", "PETG-GF Glass Fiber Grey", "#858590", "petg-gf-filament-1-75mm-colored-1kg", 50497382973716, "", "Glass Fiber Grey", ""],
    ["PETG", "PETG-GF Glass Fiber White", "#ffffff", "petg-gf-filament-1-75mm-colored-1kg", 50497383006484, "", "Glass Fiber White", ""],
    ["PETG", "PETG Pro Black", "#000000", "petg-pro-filament-1-75mm-colored-10kg", 50524052848916, "", "Black", ""],
    ["PETG", "PETG Pro Grey", "#8f949b", "petg-pro-filament-1-75mm-colored-10kg", 50524052914452, "", "Grey", ""],
    ["PETG", "PETG Pro Silver", "#9f9f9f", "petg-pro-filament-1-75mm-colored-10kg", 50524052947220, "", "Silver", ""],
    ["PETG", "PETG Pro Pink", "#f9b0bd", "petg-pro-filament-1-75mm-colored-10kg", 50524052979988, "", "Pink", ""],
    ["PETG", "PETG Pro Red", "#ea140e", "petg-pro-filament-1-75mm-colored-10kg", 50524053012756, "", "Red", ""],
    ["PETG", "PETG Pro Olive Green", "#25460f", "petg-pro-filament-1-75mm-colored-10kg", 50524053045524, "", "Olive Green", ""],
    ["PETG", "PETG Pro Blue", "#2240af", "petg-pro-filament-1-75mm-colored-10kg", 50524053078292, "", "Blue", ""],
    ["PETG", "PETG Pro Burgundy Red", "#9c2129", "petg-pro-filament-1-75mm-colored-10kg", 51904009273620, "", "Burgundy Red", ""],
    ["PETG", "PETG Pro Green", "#08e327", "petg-pro-filament-1-75mm-colored-10kg", 51904009339156, "", "Green", ""],
    ["PETG", "PETG Pro Purple", "#603ba0", "petg-pro-filament-1-75mm-colored-10kg", 51904009404692, "", "Purple", ""],
    ["PLA", "PLA Pro Black", "#000000", "pla-pro-filament-1-75mm-colored-10kg", 50523964080404, "", "Black", ""],
    ["PLA", "PLA Pro Grey", "#8f949b", "pla-pro-filament-1-75mm-colored-10kg", 50523964145940, "", "Grey", ""],
    ["PLA", "PLA Pro Blue", "#2240af", "pla-pro-filament-1-75mm-colored-10kg", 50523964211476, "", "Blue", ""],
    ["PLA", "PLA Pro Light Blue", "#339bf7", "pla-pro-filament-1-75mm-colored-10kg", 50523964244244, "", "Light Blue", ""],
    ["PLA", "PLA Pro Yellow", "#fbec07", "pla-pro-filament-1-75mm-colored-10kg", 50523964309780, "", "Yellow", ""],
    ["PETG", "Rapid PETG Black", "#000000", "rapid-petg-filament-1-75mm-colored-10kg", 50524029223188, "", "Black", ""],
    ["PETG", "Rapid PETG Grey", "#8f949b", "rapid-petg-filament-1-75mm-colored-10kg", 50524029288724, "", "Grey", ""],
    ["PETG", "Rapid PETG Blue", "#2240af", "rapid-petg-filament-1-75mm-colored-10kg", 50524029321492, "", "Blue", ""],
    ["PETG", "Rapid PETG Green", "#08e327", "rapid-petg-filament-1-75mm-colored-10kg", 50524029354260, "", "Green", ""],
    ["PETG", "Rapid PETG Red", "#ea140e", "rapid-petg-filament-1-75mm-colored-10kg", 50524029387028, "", "Red", ""],
    ["PETG", "Rapid PETG Orange", "#fd7c18", "rapid-petg-filament-1-75mm-colored-10kg", 50524029419796, "", "Orange", ""],
    ["PETG", "Rapid PETG Yellow", "#fbec07", "rapid-petg-filament-1-75mm-colored-10kg", 50524029452564, "", "Yellow", ""],
    ["PETG", "Rapid PETG Space Grey", "#7e7e7e", "rapid-petg-filament-1-75mm-colored-10kg", 50524029485332, "", "Space Grey", ""],
    ["PETG", "Rapid PETG Beige", "#f4e0b8", "rapid-petg-filament-1-75mm-colored-10kg", 50524029518100, "", "Beige", ""],
    ["PETG", "Rapid PETG Brown", "#9e6a4b", "rapid-petg-filament-1-75mm-colored-10kg", 50524029550868, "", "Brown", ""],
    ["PETG", "Rapid PETG Transparent", "#ebebef", "rapid-petg-filament-1-75mm-colored-10kg", 50524029583636, "", "Transparent", ""],
    ["TPU", "TPU 95A Black", "#000000", "tpu-filament-1-75mm-colored-1kg", 47962766180628, "", "Black", ""],
    ["TPU", "TPU 95A Grey", "#8f949b", "tpu-filament-1-75mm-colored-1kg", 51176089518356, "", "Grey", ""],
    ["PLA", "PLA Pro Purple", "#603ba0", "pla-pro-filament-1-75mm-colored-1kg", 47556168876308, "", "Purple", ""],
    ["PLA", "PLA Pro Hot Pink", "#ff5d8e", "pla-pro-filament-1-75mm-colored-1kg", 51892025360660, "", "Hot Pink", ""],
    ],
    recreus: [
    ["TPU", "Filaflex 82A Black", "#373938", "filaflex-82a", 45921644577027, "Filaflex 82A Schwarz", "Black", "Schwarz"],
    ["TPU", "Filaflex 82A White", "#d7d4d1", "filaflex-82a", 45921644642563, "Filaflex 82A Weiß", "White", "Weiß"],
    ["TPU", "Filaflex 82A Transparent", "#c9c9c6", "filaflex-82a", 45921644708099, "Filaflex 82A Transparent", "Transparent", "Transparent"],
    ["TPU", "Filaflex 82A Nude", "#e9b7a6", "filaflex-82a", 45921644773635, "Filaflex 82A Hautfarben", "Nude", "Hautfarben"],
    ["TPU", "Filaflex 82A Red", "#ef504f", "filaflex-82a", 45921644839171, "Filaflex 82A Rot", "Red", "Rot"],
    ["TPU", "Filaflex 82A Blue", "#338fb4", "filaflex-82a", 45921644904707, "Filaflex 82A Blau", "Blue", "Blau"],
    ["TPU", "Filaflex 82A Blue Food Grade", "#337abf", "filaflex-82a", 47308902760707, "Filaflex 82A Blau (lebensmittelecht)", "Blue Food Grade", "Blau (lebensmittelecht)"],
    ["TPU", "Filaflex 82A Green", "#82c84b", "filaflex-82a", 45921644970243, "Filaflex 82A Grün", "Green", "Grün"],
    ["TPU", "Filaflex 82A Yellow", "#e5cd4d", "filaflex-82a", 45921645035779, "Filaflex 82A Gelb", "Yellow", "Gelb"],
    ["TPU", "Filaflex 82A Magenta", "#df579a", "filaflex-82a", 45921645166851, "Filaflex 82A Magenta", "Magenta", "Magenta"],
    ["TPU", "Filaflex 82A Aqua", "#76dcbc", "filaflex-82a", 45921645232387, "Filaflex 82A Aqua", "Aqua", "Aqua"],
    ["TPU", "Filaflex 82A Fluor", "#d8e945", "filaflex-82a", 45921645297923, "Filaflex 82A Fluor", "Fluor", "Fluor"],
    ["TPU", "Filaflex 82A Brown", "#916557", "filaflex-82a", 45921645363459, "Filaflex 82A Braun", "Brown", "Braun"],
    ["TPU", "Filaflex 82A Grey", "#979ca3", "filaflex-82a", 45921645396227, "Filaflex 82A Grau", "Grey", "Grau"],
    ["TPU", "Filaflex 82A Gold", "#dba073", "filaflex-82a", 45921645461763, "Filaflex 82A Gold", "Gold", "Gold"],
    ["TPU", "Filaflex 95A Black", "#797879", "filaflex-95a", 45921633566979, "Filaflex 95A Schwarz", "Black", "Schwarz"],
    ["TPU", "Filaflex 95A White", "#d9d5d2", "filaflex-95a", 45921633632515, "Filaflex 95A Weiß", "White", "Weiß"],
    ["TPU", "Filaflex 95A Transparent", "#c8c8c5", "filaflex-95a", 45921633698051, "Filaflex 95A Transparent", "Transparent", "Transparent"],
    ["TPU", "Filaflex 95A Nude", "#e9b9a9", "filaflex-95a", 45921633763587, "Filaflex 95A Hautfarben", "Nude", "Hautfarben"],
    ["TPU", "Filaflex 95A Red", "#f14d56", "filaflex-95a", 45921633829123, "Filaflex 95A Rot", "Red", "Rot"],
    ["TPU", "Filaflex 95A Blue", "#4693b6", "filaflex-95a", 45921633894659, "Filaflex 95A Blau", "Blue", "Blau"],
    ["TPU", "Filaflex 95A Blue Food Grade", "#5683ab", "filaflex-95a", 47308898992387, "Filaflex 95A Blau (lebensmittelecht)", "Blue Food Grade", "Blau (lebensmittelecht)"],
    ["TPU", "Filaflex 95A Green", "#94cb7c", "filaflex-95a", 45921633960195, "Filaflex 95A Grün", "Green", "Grün"],
    ["TPU", "Filaflex 95A Fluor", "#dbe975", "filaflex-95a", 45921634025731, "Filaflex 95A Fluor", "Fluor", "Fluor"],
    ["TPU", "Filaflex 70A Black", "#706e6f", "filaflex-70a", 45921628979459, "Filaflex 70A Schwarz", "Black", "Schwarz"],
    ["TPU", "Filaflex 70A White", "#d3d2d2", "filaflex-70a", 45921629110531, "Filaflex 70A Weiß", "White", "Weiß"],
    ["TPU", "Filaflex 70A Transparent", "#c8c8c5", "filaflex-70a", 45921629241603, "Filaflex 70A Transparent", "Transparent", "Transparent"],
    ["TPU", "Filaflex 70A Red", "#eb797b", "filaflex-70a", 45921629372675, "Filaflex 70A Rot", "Red", "Rot"],
    ["TPU", "Filaflex 70A Navy Blue", "#9491c6", "filaflex-70a", 45921629503747, "Filaflex 70A Marineblau", "Navy Blue", "Marineblau"],
    ["TPU", "Filaflex 70A Nude", "#e9b9a8", "filaflex-70a", 45921629634819, "Filaflex 70A Hautfarben", "Nude", "Hautfarben"],
    ["TPU", "Filaflex 60A Black", "#646263", "filaflex-60a", 45921624424707, "Filaflex 60A Schwarz", "Black", "Schwarz"],
    ["TPU", "Filaflex 60A White", "#d0cfd0", "filaflex-60a", 45921624555779, "Filaflex 60A Weiß", "White", "Weiß"],
    ["TPU", "Filaflex 60A Nude", "#e7b5a4", "filaflex-60a", 45921624686851, "Filaflex 60A Hautfarben", "Nude", "Hautfarben"],
    ["TPU", "Filaflex 60A Red", "#d97c7b", "filaflex-60a", 48165750014211, "Filaflex 60A Rot", "Red", "Rot"],
    ["TPU", "Filaflex 60A Blue Food Grade", "#507caa", "filaflex-60a", 48425477406979, "Filaflex 60A Blau (lebensmittelecht)", "Blue Food Grade", "Blau (lebensmittelecht)"],
    ],
    redline: [
    ["PLA", "PLA Black (RAL 9017)", "#1c1c1c", "pla-black", 0, "PLA Schwarz (RAL 9017)", "Black (RAL 9017)", "Schwarz (RAL 9017)"],
    ["PLA", "PLA White (RAL 9003)", "#f4f4f4", "premium-pla-weiss", 0, "PLA Weiß (RAL 9003)", "White (RAL 9003)", "Weiß (RAL 9003)"],
    ["PLA", "PLA Red (RAL 3020)", "#c1121c", "premium-pla-rot", 0, "PLA Rot (RAL 3020)", "Red (RAL 3020)", "Rot (RAL 3020)"],
    ["PLA", "PLA Silver (RAL 9006)", "#a5a5a5", "premium-pla-silver", 0, "PLA Silber (RAL 9006)", "Silver (RAL 9006)", "Silber (RAL 9006)"],
    ["PLA", "PLA Iron Grey (RAL 7011)", "#434b4d", "premium-pla-eisengrau", 0, "PLA Eisengrau (RAL 7011)", "Iron Grey (RAL 7011)", "Eisengrau (RAL 7011)"],
    ["PLA", "PLA Yellow", "#ffc201", "premium-pla-gelb", 0, "PLA Gelb", "Yellow", "Gelb"],
    ["PLA", "PLA Light Green", "#71bcb5", "pla-leichtes-grun", 0, "PLA Leichtes Grün", "Light Green", "Leichtes Grün"],
    ["PLA", "PLA Light Blue", "#acd5e7", "pla-leichtes-blau", 0, "PLA Leichtes Blau", "Light Blue", "Leichtes Blau"],
    ]
    // NOCH NICHT AKTIV — Bambu Lab bei 3DJake (92 Farben, Handle = Pfad nach www.3djake.de/):
    // ,
    // bambu: [

    // ]
  };

  // ---- Ausgabe ------------------------------------------------------------
  function items(lang) {
    var de = (lang || document.documentElement.lang || 'de').slice(0, 2) === 'de';
    var out = [];
    Object.keys(PROVIDERS).forEach(function (k) {
      var p = PROVIDERS[k];
      (ROWS[k] || []).forEach(function (r) {
        out.push({
          name: (de && r[5]) ? r[5] : r[1],
          color: (de && r[7]) ? r[7] : (r[6] || ''),
          brand: p.brand,
          material: r[0],
          hex: r[2],
          shop: p.shop,
          url: p.link(r[3], r[4]),
          sponsored: true
        });
      });
    });
    return out;
  }

  window.FilamentCatalog = { items: items, providers: PROVIDERS };
})();
