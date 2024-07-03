// lib/utf8.js

// syllables in utf8 in order
const source = [
  "a",  "A",  "i",  "I",  "u",  "U",  "e",  "E",  "o",  "O",

  "KA", "GA", "KI",  "GI",  "KU", "GU", "KE", "GE", "KO", "GO",
  "SA", "ZA", "SHI", "JI",  "SU", "ZU", "SE", "ZE", "SO", "ZO",

  "TA", "DA", "CHI", "DZI", "tsu", "TSU",
  "DZU", "TE", "DE", "TO", "DO",

  "NA", "NI", "NU",  "NE",  "NO",

  "HA", "BA", "PA",  "HI", "BI", "PI",
  "FU", "BU", "PU",  "HE", "BE", "PE",
  "HO", "BO", "PO",

  "MA", "MI", "MU", "ME", "MO",

  "ya", "YA", "yu", "YU", "yo", "YO",

  "RA", "RI", "RU", "RE", "RO",

  "wa", "WA", "WI", "WE", "WO",
  "N"
];

const index = {};

source.forEach((syl, i) => {
  index[syl] = i;
});

const hiraganaBase = 12353;
const katakanaBase = 12449;

const fromBase = (base) => (syl) => String.fromCharCode(
  base + index[syl]
);

module.exports = {
  hiragana: fromBase(hiraganaBase),
  katakana: fromBase(katakanaBase),
};

