//

const { suite } = require("uvu")
const assert = require("uvu/assert")

const { createBuffer } = require("../../lib/parser/buffer");

const initialized = suite("initialized");
const pushed = suite("pushed");
const dropped = suite("dropped");
const sliced = suite("sliced");
const combined = suite("combined");

initialized.before((ctx) => {
  ctx.source = "source string";
  ctx.buffer = createBuffer(ctx.source);
});

initialized("should contain source as source and tail", (ctx) => {
  const { source, buffer } = ctx;

  assert.is(source, buffer.getSource());
  assert.is(source, buffer.getTail());
});

initialized("should contain empty syllables list", (ctx) => {
  const { buffer } = ctx;

  assert.equal([], buffer.getSyllables());
});

pushed.before((ctx) => {
  ctx.source = "";
  ctx.buffer = createBuffer(ctx.source);
  ctx.returnValue = ctx.buffer.push("NA", "ZE");
});

pushed("should contain array with pushed syllables", (ctx) => {
  const { buffer } = ctx;

  assert.equal(["NA", "ZE"], buffer.getSyllables());
});

pushed("should return itself to enable chaining", (ctx) => {
  const { buffer, returnValue } = ctx;

  assert.is(buffer, returnValue);
});

dropped.before((ctx) => {
  ctx.source = "xxxaaa";
  ctx.buffer = createBuffer(ctx.source);
  ctx.returnValue = ctx.buffer.drop(3);
});

dropped("should return tail without x-es", (ctx) => {
  const { buffer } = ctx;

  assert.is("aaa", buffer.getTail());
});

dropped("should enable chaining", (ctx) => {
  const { buffer, returnValue } = ctx;

  assert.is(returnValue, buffer);
});

sliced.before((ctx) => {
  ctx.source = "abcdefghi";
  ctx.buffer = createBuffer(ctx.source);
  ctx.returnValue = ctx.buffer.slice(3, 3);
});

sliced("should return slice of tail", (ctx) => {
  const { returnValue } = ctx;

  assert.is(returnValue, "def");
});

sliced("should not change tail", (ctx) => {
  const { buffer, source } = ctx;

  assert.is(source, buffer.getTail());
});

combined.before((ctx) => {
  ctx.source = "SAKANA";
  const buffer = createBuffer(ctx.source);

  buffer.push(buffer.slice(0, 2)).drop(2);

  ctx.buffer = buffer;
});

combined("should have a syllable pushed", (ctx) => {
  const { buffer } = ctx;

  assert.equal(buffer.getSyllables(), ["SA"]);
});

combined("should have a tail without syllable", (ctx) => {
  const { buffer } = ctx;

  assert.is(buffer.getTail(), "KANA");
});

initialized.run();
pushed.run();
dropped.run();
sliced.run();
combined.run();
