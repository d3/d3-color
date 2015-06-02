var tape = require("tape"),
    color = require("../");

tape('rgb(70, 130, 180) returns the expected RGB color', function(test) {
  var c = color.rgb(70, 130, 180);
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('rgb(r, g, b) rounds channels to the nearest integer', function(test) {
  var c = color.rgb(69.5, 130.1, 179.9);
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('rgb(r, g, b) clamps channels to the range [0,255]', function(test) {
  var c = color.rgb(-10, 256, 255);
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 0);
  test.equal(c.g, 255);
  test.equal(c.b, 255);
  test.end();
});

tape('rgb(r, g, b) allows NaN channel values', function(test) {
  var c = color.rgb(undefined, NaN, "foo");
  test.ok(c instanceof color.rgb);
  test.ok(isNaN(c.r) && (c.r !== c.r));
  test.ok(isNaN(c.g) && (c.g !== c.g));
  test.ok(isNaN(c.b) && (c.b !== c.b));
  test.end();
});

tape('rgb(r, g, b) allows some channels to be defined, and others not', function(test) {
  var c = color.rgb(undefined, 42, "foo");
  test.ok(c instanceof color.rgb);
  test.ok(isNaN(c.r) && (c.r !== c.r));
  test.equal(c.g, 42);
  test.ok(isNaN(c.b) && (c.b !== c.b));
  test.end();
});

tape('rgb.rgb returns a copy', function(test) {
  var c1 = color.rgb(70, 130, 180),
      c2 = c1.rgb();
  c1.r = c1.g = c1.b = NaN;
  test.equal(c2.r, 70);
  test.equal(c2.g, 130);
  test.equal(c2.b, 180);
  test.end();
});
