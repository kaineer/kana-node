// lib/index.js

const { createParser } = require("./parser");
const { hiragana: toh, katakana: tok } = require("./utf8");

const romaji = (source) => {
  const parser = createParser(source);
  parser.parse();

  return {
    hiragana() {
      return parser.getResult().map(toh).join("");
    },
    katakana() {
      return parser.getResult().map(tok).join("");
    }
  }
}

module.exports = {
  romaji
}
