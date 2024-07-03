//

const { suite } = require("uvu");
const assert = require("uvu/assert");

const { hiragana, katakana } = require("../lib/utf8");

const utf8 = suite("utf8");

const assertHiragana = (syl, result) => utf8(
  "hiragana(" + syl + ") === '" + result + "'",
  () => assert.is(hiragana(syl), result)
);

const assertKatakana = (syl, result) => utf8(
  "katakana(" + syl + ") === '" + result + "'",
  () => assert.is(katakana(syl), result)
);

assertHiragana('A', 'あ');
assertKatakana('A', 'ア');
assertHiragana('tsu', 'っ');
assertHiragana('FU', 'ふ');
assertHiragana('WO', 'を');
assertHiragana('HE', 'へ');

utf8.run();
