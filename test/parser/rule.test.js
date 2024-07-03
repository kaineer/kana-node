//
const { suite } = require("uvu")
const assert = require("uvu/assert")

const { createRule } = require("../../lib/parser/rule");
const { createBuffer } = require("../../lib/parser/buffer");

const accepting = suite("accepting");
const accepted = suite("accepted");

const handling = suite("handleSimple");

const tryRule = (rule, source, fn) => {
  const buffer = createBuffer(source);
  const result = rule.accepts(buffer);
  if (result && typeof fn === "function") {
    rule.handle(buffer);
    fn(buffer);
  }
  return result;
}

accepting.before((ctx) => {
  ctx.rule = createRule(/^A$/);
});

accepting("should accept 'A' string", (ctx) => {
  const { rule } = ctx;

  assert.ok(tryRule(rule, "A"));
});

accepting("should not accept 'B' string", (ctx) => {
  const { rule } = ctx;

  assert.not.ok(tryRule(rule, "B"));
});

accepted.before((ctx) => {
  ctx.rule = createRule(/^A$/);
  tryRule(ctx.rule, "A");
});

accepted("should have matches", (ctx) => {
  const { rule } = ctx;

  assert.equal(rule.getMatches(), ["A"]);
});

handling("/^(B)BA/", () => {
  assert.ok(
    tryRule(createRule(/^(B)BA/), "BBAXXX", (buffer) => {
      assert.is(buffer.getTail(), "BAXXX");
      assert.equal(buffer.getSyllables(), ["B"]);
    })
  );
});

handling("/^A/, push: 'CD'", () => {
  assert.ok(
    tryRule(createRule(/^A/, { push: "CD" }), "ABEF", (buffer) => {
      assert.is(buffer.getTail(), "BEF");
      assert.equal(buffer.getSyllables(), ["CD"]);
    })
  );
});

handling("/^([AB])x([CD])/, :push => () => ...", () => {
  assert.ok(
    tryRule(
      createRule(/^([AB])x([CD])/,
        { push: ([_, a, b]) => a + b  }), "AxDFOOBAR", (buffer) => {
      assert.is(buffer.getTail(), "FOOBAR");
      assert.equal(buffer.getSyllables(), ["AD"]);
    })
  );
});

accepting.run();
accepted.run();
handling.run();
