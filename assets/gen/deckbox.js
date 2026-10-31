/* Deckbox: Kartenbox mit aufgeschobenem Deckel und Griffmulde. */
GenKit.define({
  id: 'deckbox', file: 'deckbox',
  fname: function (p) { return p.cw + 'x' + p.ch + '_' + p.cards; },
  meta: {
    cat: 'tabletop', slug: { de: 'deckbox-generator', en: 'deck-box-generator' },
    title: { de: 'Deckbox-Generator: Kartenbox nach Maß als STL/3MF (kostenlos)', en: 'Deck Box Generator: custom card box as STL/3MF (free)' },
    h1: { de: 'Deckbox-Generator', en: 'Deck Box Generator' },
    sub: { de: 'Box für Spielkarten, Sammelkarten oder Tarot: Kartenformat und Anzahl eingeben, STL oder 3MF laden.', en: 'A box for playing cards, trading cards or tarot: enter card format and count, download STL or 3MF.' },
    desc: { de: 'Kostenloser Deckbox-Generator: Kartenboxen mit Schiebedeckel für Poker, Magic, Pokémon, Tarot oder eigene Formate. Mit Hüllen, Griffmulde, Export als STL und 3MF.', en: 'Free deck box generator: card boxes with a sliding lid for poker, Magic, Pokémon, tarot or custom sizes. With sleeve option and finger notch. Export as STL and 3MF.' },
    tag: { de: 'Tabletop', en: 'Tabletop' },
    intro: { de: ['Gib das Kartenformat und die Kartenzahl ein. Der Generator berechnet die Höhe des Stapels und baut Box und Deckel dazu, der Deckel wird einfach aufgesteckt.', 'Mit Hüllen (Sleeves) wird das Format automatisch etwas größer. Eine Griffmulde macht das Herausnehmen leicht.'], en: ['Enter the card format and the number of cards. The generator works out the stack height and builds a matching box and lid; the lid just slides on.', 'With sleeves the format grows a little automatically. A finger notch makes taking cards out easy.'] },
    notes: { de: ['Box und Deckel getrennt drucken, beide mit der offenen Seite nach oben.', 'PLA genügt, für festeren Sitz erhöhe das Deckelspiel nur um 0,05 mm Schritte.', 'Wenn der Deckel zu stramm sitzt, erhöhe das Spiel auf 0,3 mm.'], en: ['Print box and lid separately, both with the open side up.', 'PLA is fine; for a firmer fit change the lid clearance only in 0.05 mm steps.', 'If the lid is too tight, raise the clearance to 0.3 mm.'] },
    faq: { de: [['Welche Kartenformate gibt es?', 'Poker 63 × 88 mm, Magic und Pokémon 63 × 88 mm, Tarot 70 × 120 mm, Mini 44 × 68 mm. Die Voreinstellungen enthalten die gängigen Formate.'], ['Wie viele Karten passen?', 'Ohne Hüllen etwa 0,3 mm pro Karte, mit Hüllen etwa 0,45 mm. Die Seite rechnet mit deinen Werten und gibt Luft dazu.']], en: [['Which card formats exist?', 'Poker 63 × 88 mm, Magic and Pokémon 63 × 88 mm, tarot 70 × 120 mm, mini 44 × 68 mm. The presets contain the common formats.'], ['How many cards fit?', 'About 0.3 mm per card without sleeves, about 0.45 mm with sleeves. The page uses your values and adds some room.']] }
  },
  groups: [
    { title: { de: 'Karten', en: 'Cards' }, items: [
      { k: 'cw', t: 'num', min: 30, max: 120, step: 0.5, def: 63, unit: 'mm', label: { de: 'Kartenbreite', en: 'Card width' } },
      { k: 'ch', t: 'num', min: 40, max: 180, step: 0.5, def: 88, unit: 'mm', label: { de: 'Kartenhöhe', en: 'Card height' } },
      { k: 'cards', t: 'int', min: 10, max: 300, step: 1, def: 60, label: { de: 'Anzahl Karten', en: 'Number of cards' } },
      { k: 'sleeve', t: 'bool', def: true, label: { de: 'Mit Hüllen (Sleeves)', en: 'With sleeves' } }
    ] },
    { title: { de: 'Box', en: 'Box' }, items: [
      { k: 'wall', t: 'num', min: 1.2, max: 4, step: 0.2, def: 2, unit: 'mm', label: { de: 'Wandstärke', en: 'Wall thickness' } },
      { k: 'cl', t: 'num', min: 0.1, max: 0.6, step: 0.05, def: 0.2, unit: 'mm', label: { de: 'Spiel beim Deckel', en: 'Lid clearance' } },
      { k: 'ov', t: 'num', min: 6, max: 30, step: 1, def: 14, unit: 'mm', label: { de: 'Überlappung Deckel', en: 'Lid overlap' } },
      { k: 'r', t: 'num', min: 0, max: 12, step: 0.5, def: 3, unit: 'mm', label: { de: 'Eckenradius', en: 'Corner radius' } },
      { k: 'notch', t: 'bool', def: true, label: { de: 'Griffmulde', en: 'Finger notch' } }
    ] }
  ],
  presets: [
    { label: { de: 'Poker / Magic, 60 Karten mit Hüllen', en: 'Poker / Magic, 60 sleeved cards' }, v: { cw: 63, ch: 88, cards: 60, sleeve: true } },
    { label: { de: 'Commander, 100 Karten mit Hüllen', en: 'Commander, 100 sleeved cards' }, v: { cw: 63, ch: 88, cards: 100, sleeve: true } },
    { label: { de: 'Pokémon, 60 Karten ohne Hüllen', en: 'Pokémon, 60 unsleeved cards' }, v: { cw: 63, ch: 88, cards: 60, sleeve: false } },
    { label: { de: 'Tarot (70 × 120), 78 Karten', en: 'Tarot (70 × 120), 78 cards' }, v: { cw: 70, ch: 120, cards: 78, sleeve: false } },
    { label: { de: 'Mini (44 × 68), 60 Karten', en: 'Mini (44 × 68), 60 cards' }, v: { cw: 44, ch: 68, cards: 60, sleeve: false } }
  ],
  build: function (p, H) {
    var m = H.M, Mf = m.Manifold, w = p.wall, cw = p.cw + (p.sleeve ? 4 : 0) + 1.2, chh = p.ch + (p.sleeve ? 4 : 0) + 1.2;
    var stack = p.cards * (p.sleeve ? 0.46 : 0.31) + 2, wi = cw, di = stack + 1.5;
    var wo = wi + 2 * w, dout = di + 2 * w, fl = w, ov = p.ov, lipH = ov, r = Math.min(p.r, Math.min(wo, dout) / 2 - 0.6), hBox = fl + chh;
    var step = w / 2 + 0.01;
    var box = H.ext(H.rrect(wo, dout, r), 0, hBox - lipH).add(H.ext(H.rrect(wo - 2 * step, dout - 2 * step, Math.max(0.3, r - step)), hBox - lipH - 0.01, hBox));
    box = box.subtract(H.ext(H.rrect(wi, di, Math.max(0.3, r - w)), fl, hBox + 1));
    if (p.notch) box = box.subtract(Mf.cylinder(dout + 2, 11, 11, 40, false).rotate([90, 0, 0]).translate([0, dout / 2 + 1, hBox + 3]));
    var lt = w, lh = lipH + lt;
    var lid = H.ext(H.rrect(wo + w, dout + w, r + w / 2), 0, lh).subtract(H.ext(H.rrect(wo - 2 * step + 2 * p.cl, dout - 2 * step + 2 * p.cl, Math.max(0.3, r - step + p.cl)), lt, lh + 1));
    return [{ name: H.lang === 'en' ? 'Box' : 'Box', mesh: H.toMesh(box) }, { name: H.lang === 'en' ? 'Lid' : 'Deckel', mesh: H.toMesh(lid) }];
  }
});
