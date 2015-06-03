var tape = require("tape"),
    color = require("../");

tape('an instance of rgb is an instance of color', function(test) {
  var c = color.rgb(70, 130, 180);
  test.ok(c instanceof color.rgb);
  test.ok(c instanceof color.color);
  test.end();
});

tape('rgb(r, g, b) sets the r, g, and b channels', function(test) {
  var c = color.rgb(70, 130, 180);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('rgb(r, g, b) rounds channels to the nearest integer', function(test) {
  var c = color.rgb(69.5, 130.1, 179.9);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('rgb(r, g, b) clamps channels to the range [0,255]', function(test) {
  var c = color.rgb(-10, 256, 255);
  test.equal(c.r, 0);
  test.equal(c.g, 255);
  test.equal(c.b, 255);
  test.end();
});

tape('rgb(r, g, b) allows NaN channel values', function(test) {
  var c = color.rgb(undefined, NaN, "foo");
  test.ok(isNaN(c.r) && (c.r !== c.r));
  test.ok(isNaN(c.g) && (c.g !== c.g));
  test.ok(isNaN(c.b) && (c.b !== c.b));
  test.end();
});

tape('rgb(r, g, b) allows some channels to be defined, and others not', function(test) {
  var c = color.rgb(undefined, 42, "foo");
  test.ok(isNaN(c.r) && (c.r !== c.r));
  test.equal(c.g, 42);
  test.ok(isNaN(c.b) && (c.b !== c.b));
  test.end();
});

tape('rgb.rgb returns this', function(test) {
  var c = color.rgb(70, 130, 180);
  test.equal(c.rgb(), c);
  test.end();
});
