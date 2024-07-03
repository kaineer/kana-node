// test/parser/parser.test.js

const { suite } = require("uvu")
const assert = require("uvu/assert")

const { createParser } = require("../../lib/parser");
const cases = require("./cases.fixture.js");

cases.forEach(({ input, expected, comment }) => {
  const ts = suite(input);

  ts.before((ctx) => {
    ctx.parser = createParser(input);
    ctx.parser.parse();
  });

  ts("should return " + JSON.stringify(expected), (ctx) => {
    const { parser } = ctx;
    assert.equal(parser.getResult(), expected);
  });

  ts("should drain off source", (ctx) => {
    const { parser } = ctx;
    assert.is(parser.getTail(), "");
  });

  ts("should have success state", (ctx) => {
    const { parser } = ctx;
    assert.is(parser.getState(), "success");
  });

  ts.run();
});
