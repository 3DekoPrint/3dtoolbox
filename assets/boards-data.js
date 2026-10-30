/* 3DToolBox — Platinen-Datenbank für den Gehäuse-Generator.
   Koordinaten in mm, Ursprung = untere linke Ecke der Platine in der Draufsicht, X nach rechts, Y nach oben.
   Kanten: W = links (x=0), E = rechts (x=L), S = unten (y=0), N = oben (y=W).
   Felder:
     id, g (Gruppe), n (Name), L × W (Platinenmaß), t (Platinendicke),
     holes: [[x,y],...] Montagelöcher, hd = Lochdurchmesser,
     under = Standard-Halterhöhe unter der Platine (Platz für Bauteile/Pins auf der Unterseite),
     hr = Standard-Bauhöhe über der Platine (höchstes Bauteil),
     pad = zusätzlicher Platz je Kante (überstehende Buchsen: {W:mm,E:mm,S:mm,N:mm}),
     ports: [[Kante, Mitte entlang der Kante, Breite, Höhe, Mitte der Höhe über Platinenoberseite, Name], ...]
       (Öffnung = Buchse plus Platz für den Stecker; negative Höhenmitte = unter der Platine)
     lid: [[x,y,Breite,Höhe,Name], ...] Öffnungen im Deckel (z. B. GPIO-Leiste)
     chips: [[x,y,Breite,Tiefe,Höhe],...] Hauptchips für die schematische Vorschau; col = Platinenfarbe [r,g,b] (sonst nach Gruppe)
     ok: 1 = Platinen- und Lochmaße nach Herstellerzeichnung, 0 = Näherungswert (bitte nachmessen)
     pok: 1 = Anschlusspositionen geprüft, 0 = Näherung (bitte mit der Draufsicht vergleichen)
   Hinweis: Seriennummern/Revisionen derselben Platine können um Zehntelmillimeter abweichen – immer eine Passprobe drucken. */
(function () {
  'use strict';
  var PI_HOLES = [[3.5, 3.5], [61.5, 3.5], [3.5, 52.5], [61.5, 52.5]];
  var PI_GPIO = [[6.6, 49.4, 51.8, 6.2, 'GPIO']];
  var B = [
    // ---- Raspberry Pi ----
    { id: 'rpi5', chips: [[26,21,14,14,2.4],[47,14,10,10,1.5]], g: 'Raspberry Pi', n: 'Raspberry Pi 5', L: 85, W: 56, t: 1.6, holes: PI_HOLES, hd: 2.75, under: 5, hr: 17, pad: { E: 2.5 }, ok: 1, pok: 0,
      ports: [['S', 11.2, 11, 7, 1.6, 'USB-C Strom'], ['S', 25.8, 10, 6.5, 1.6, 'micro-HDMI 0'], ['S', 39.2, 10, 6.5, 1.6, 'micro-HDMI 1'],
        ['E', 10.25, 16.5, 14, 6.5, 'Ethernet'], ['E', 29, 15.5, 16.5, 8, 'USB 3.0'], ['E', 47, 15.5, 16.5, 8, 'USB 2.0'], ['W', 28, 13, 3.2, -3.3, 'microSD']], lid: PI_GPIO },
    { id: 'rpi4', chips: [[26,21,15,15,2.4],[47,20,9,12,1.2]], g: 'Raspberry Pi', n: 'Raspberry Pi 4 Modell B', L: 85, W: 56, t: 1.6, holes: PI_HOLES, hd: 2.75, under: 5, hr: 17, pad: { E: 2.5 }, ok: 1, pok: 0,
      ports: [['S', 11.2, 11, 7, 1.6, 'USB-C Strom'], ['S', 26, 10, 6.5, 1.6, 'micro-HDMI 0'], ['S', 39.5, 10, 6.5, 1.6, 'micro-HDMI 1'], ['S', 53.5, 8, 8, 3.2, 'Audio'],
        ['E', 10.25, 16.5, 14, 6.5, 'Ethernet'], ['E', 29, 15.5, 16.5, 8, 'USB 3.0'], ['E', 47, 15.5, 16.5, 8, 'USB 2.0'], ['W', 28, 13, 3.2, -3.3, 'microSD']], lid: PI_GPIO },
    { id: 'rpi3', chips: [[26,20,14,14,2.4]], g: 'Raspberry Pi', n: 'Raspberry Pi 3 B / 3 B+ / 2 B', L: 85, W: 56, t: 1.6, holes: PI_HOLES, hd: 2.75, under: 5, hr: 17, pad: { E: 2.5 }, ok: 1, pok: 0,
      ports: [['S', 10.6, 11, 7, 1.4, 'micro-USB Strom'], ['S', 32, 17, 9, 3.2, 'HDMI'], ['S', 53.5, 8, 8, 3.2, 'Audio'],
        ['E', 10.25, 16.5, 14, 6.5, 'Ethernet'], ['E', 29, 15.5, 16.5, 8, 'USB'], ['E', 47, 15.5, 16.5, 8, 'USB'], ['W', 28, 13, 3.2, -3.3, 'microSD']], lid: PI_GPIO },
    { id: 'rpizero', chips: [[20,9,12,12,1.6]], g: 'Raspberry Pi', n: 'Raspberry Pi Zero / Zero W / Zero 2 W', L: 65, W: 30, t: 1.4, holes: [[3.5, 3.5], [61.5, 3.5], [3.5, 26.5], [61.5, 26.5]], hd: 2.75, under: 3, hr: 6, ok: 1, pok: 0,
      ports: [['S', 12.4, 12, 7, 1.6, 'mini-HDMI'], ['S', 41.4, 11, 7, 1.4, 'micro-USB Daten'], ['S', 54, 11, 7, 1.4, 'micro-USB Strom'], ['W', 15, 13, 3.8, 1.5, 'microSD']],
      lid: [[6.6, 23.4, 51.8, 6.2, 'GPIO']] },
    { id: 'pico', chips: [[22,5,7,7,1.0]], col: [0.12,0.55,0.26], g: 'Raspberry Pi', n: 'Raspberry Pi Pico / Pico W / Pico 2', L: 51, W: 21, t: 1, holes: [[2, 4.8], [2, 16.2], [49, 4.8], [49, 16.2]], hd: 2.1, under: 3, hr: 6, pad: { W: 1.5 }, ok: 1, pok: 0,
      ports: [['W', 10.5, 11, 7, 1.4, 'micro-USB']] },
    // ---- Arduino ----
    { id: 'uno', chips: [[24,22,36,7.5,4]], g: 'Arduino', n: 'Arduino Uno R3 / Uno R4', L: 68.58, W: 53.34, t: 1.6, holes: [[13.97, 2.54], [15.24, 50.8], [66.04, 7.62], [66.04, 35.56]], hd: 3.2, under: 4, hr: 14, pad: { W: 6.5 }, ok: 1, pok: 0,
      ports: [['W', 38.1, 14, 12.5, 5.5, 'USB-B / USB-C'], ['W', 7.6, 10.5, 11.5, 5.5, 'DC-Buchse']] },
    { id: 'mega', chips: [[44,22,16,16,2],[20,10,36,7.5,4]], g: 'Arduino', n: 'Arduino Mega 2560', L: 101.6, W: 53.34, t: 1.6, holes: [[13.97, 2.54], [15.24, 50.8], [66.04, 7.62], [66.04, 35.56], [90.17, 50.8], [96.52, 2.54]], hd: 3.2, under: 4, hr: 14, pad: { W: 6.5 }, ok: 1, pok: 0,
      ports: [['W', 38.1, 14, 12.5, 5.5, 'USB-B'], ['W', 7.6, 10.5, 11.5, 5.5, 'DC-Buchse']] },
    { id: 'nano', chips: [[14,6,9,9,1.5]], col: [0.1,0.25,0.6], g: 'Arduino', n: 'Arduino Nano (V3) / Nano Every', L: 45, W: 18, t: 1.6, holes: [], hd: 0, under: 9, hr: 8, pad: { W: 1.5 }, ok: 0, pok: 0,
      ports: [['W', 9, 10, 7, 2, 'USB']] },
    { id: 'promicro', chips: [[10,5,9,9,1.5]], col: [0.7,0.1,0.1], g: 'Arduino', n: 'Pro Micro (ATmega32U4)', L: 33, W: 18, t: 1.6, holes: [], hd: 0, under: 9, hr: 6, pad: { W: 1.5 }, ok: 0, pok: 0,
      ports: [['W', 9, 10, 7, 1.4, 'micro-USB']] },
    // ---- ESP32 / ESP8266 ----
    { id: 'esp32devkitc', chips: [[28,5,25,18,3.2]], g: 'ESP32 / ESP8266', n: 'ESP32-DevKitC V4', L: 54.4, W: 27.9, t: 1.6, holes: [], hd: 0, under: 9, hr: 8, pad: { W: 1.5 }, ok: 0, pok: 0,
      ports: [['W', 14, 11, 7, 1.4, 'micro-USB']] },
    { id: 'esp32v1', chips: [[26,5,25,18,3.2]], g: 'ESP32 / ESP8266', n: 'ESP32 DevKit V1 (30 Pin)', L: 51.5, W: 28, t: 1.6, holes: [], hd: 0, under: 9, hr: 8, pad: { W: 1.5 }, ok: 0, pok: 0,
      ports: [['W', 14, 11, 7, 1.4, 'micro-USB']] },
    { id: 'esp32s3', chips: [[44,4,25,18,3.2]], g: 'ESP32 / ESP8266', n: 'ESP32-S3-DevKitC-1', L: 70, W: 25.4, t: 1.6, holes: [], hd: 0, under: 9, hr: 8, ok: 0, pok: 0, ports: [] },
    { id: 'esp32c3sm', chips: [[8,3,12,12,2]], col: [0.1,0.1,0.12], g: 'ESP32 / ESP8266', n: 'ESP32-C3 SuperMini', L: 22.5, W: 18, t: 1.2, holes: [], hd: 0, under: 4, hr: 5, pad: { W: 1 }, ok: 0, pok: 0,
      ports: [['W', 9, 10, 5, 1.4, 'USB-C']] },
    { id: 'nodemcu', chips: [[30,6,24,18,3]], g: 'ESP32 / ESP8266', n: 'NodeMCU V3 (ESP8266, 58 × 31)', L: 58, W: 31, t: 1.6, holes: [], hd: 0, under: 9, hr: 8, pad: { W: 1.5 }, ok: 0, pok: 0,
      ports: [['W', 15.5, 11, 7, 1.4, 'micro-USB']] },
    { id: 'd1mini', chips: [[10,4,16,16,3.2]], col: [0.1,0.1,0.12], g: 'ESP32 / ESP8266', n: 'Wemos / LOLIN D1 mini', L: 34.2, W: 25.6, t: 1.6, holes: [], hd: 0, under: 9, hr: 6, pad: { W: 1 }, ok: 1, pok: 0,
      ports: [['W', 12.8, 11, 7, 1.4, 'micro-USB']] },
    { id: 'xiao', chips: [[8,3,9,9,1.5]], col: [0.1,0.1,0.12], g: 'ESP32 / ESP8266', n: 'Seeed XIAO (ESP32 / RP2040 / SAMD21)', L: 21, W: 17.8, t: 1.2, holes: [], hd: 0, under: 3, hr: 5, pad: { W: 1 }, ok: 0, pok: 0,
      ports: [['W', 8.9, 10, 5, 1.4, 'USB-C']] },
    // ---- weitere ----
    { id: 'teensy40', chips: [[12,4,10,10,1.5]], col: [0.1,0.35,0.2], g: 'Weitere Boards', n: 'Teensy 4.0 / 3.2 / LC', L: 35.56, W: 17.78, t: 1.6, holes: [], hd: 0, under: 9, hr: 5, pad: { W: 1 }, ok: 0, pok: 0,
      ports: [['W', 8.9, 10, 6, 1.4, 'micro-USB']] },
    { id: 'teensy41', chips: [[20,4,10,10,1.5]], col: [0.1,0.35,0.2], g: 'Weitere Boards', n: 'Teensy 4.1', L: 60.96, W: 17.78, t: 1.6, holes: [], hd: 0, under: 9, hr: 6, pad: { W: 1 }, ok: 0, pok: 0,
      ports: [['W', 8.9, 10, 6, 1.4, 'micro-USB']] },
    { id: 'bluepill', chips: [[18,6,12,12,1.5]], col: [0.05,0.2,0.7], g: 'Weitere Boards', n: 'STM32 Blue Pill', L: 53, W: 22.5, t: 1.6, holes: [], hd: 0, under: 9, hr: 8, pad: { W: 1 }, ok: 0, pok: 0,
      ports: [['W', 11.25, 11, 7, 1.4, 'micro-USB']] },
    { id: 'rp2040zero', chips: [[8,5,7,7,1]], col: [0.1,0.1,0.12], g: 'Weitere Boards', n: 'Waveshare RP2040-Zero', L: 23.5, W: 18, t: 1, holes: [], hd: 0, under: 3, hr: 5, pad: { W: 1 }, ok: 0, pok: 0,
      ports: [['W', 9, 10, 5, 1.4, 'USB-C']] },
    { id: 'feather', chips: [[20,5,15,15,2]], col: [0.1,0.3,0.15], g: 'Weitere Boards', n: 'Adafruit Feather (Standard)', L: 50.8, W: 22.86, t: 1.6, holes: [], hd: 0, under: 4, hr: 8, pad: { W: 1 }, ok: 0, pok: 0,
      ports: [['W', 11.4, 11, 7, 1.4, 'micro-USB / USB-C']] }
  ];
  window.BoardDB = { boards: B, byId: function (id) { for (var i = 0; i < B.length; i++) if (B[i].id === id) return B[i]; return null; } };
})();
