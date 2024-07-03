//

const { test } = require("uvu");
const assert = require("uvu/assert");

const { romaji } = require("..");

test("romaji to hiragana", () => {
  assert.is(romaji("sakana").hiragana(), "さかな");
});

test("romaji to katakana", () => {
  assert.is(romaji("toire").katakana(), "トイレ");
});

test.run();
