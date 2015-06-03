var tape = require("tape"),
    color = require("../");

tape('hsl(70, .5, .4) returns the expected HSL color', function(test) {
  var c = color.hsl(70, .5, .4);
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 70);
  test.equal(c.s, .5);
  test.equal(c.l, .4);
  test.end();
});

tape('hsl("hsl(325,50%,50%)") does not lose precision', function(test) {
  var c = color.hsl("hsl(325,50%,40%)");
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 325);
  test.equal(c.s, .5);
  test.equal(c.l, .4);
  test.end();
});

tape('hsl(h, s, l) converts hue to the range [0,360)', function(test) {
  var c = color.hsl(360, .5, .4);
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 0);
  test.equal(c.s, .5);
  test.equal(c.l, .4);
  var c = color.hsl(361, .5, .4);
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 1);
  test.equal(c.s, .5);
  test.equal(c.l, .4);
  var c = color.hsl(-1, .5, .4);
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 359);
  test.equal(c.s, .5);
  test.equal(c.l, .4);
  test.end();
});

tape('hsl(h, s, l) clamps saturation and lightness to the range [0,1]', function(test) {
  var c = color.hsl(-10, -1, 2);
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 350);
  test.equal(c.s, 0);
  test.equal(c.l, 1);
  test.end();
});

tape('hsl(h, s, l) allows NaN channel values', function(test) {
  var c = color.hsl(undefined, NaN, "foo");
  test.ok(c instanceof color.hsl);
  test.ok(isNaN(c.h) && (c.h !== c.h));
  test.ok(isNaN(c.s) && (c.s !== c.s));
  test.ok(isNaN(c.l) && (c.l !== c.l));
  test.end();
});

tape('hsl(h, s, l) allows some channels to be defined, and others not', function(test) {
  var c = color.hsl(undefined, .4, "foo");
  test.ok(c instanceof color.hsl);
  test.ok(isNaN(c.h) && (c.h !== c.h));
  test.equal(c.s, .4);
  test.ok(isNaN(c.l) && (c.l !== c.l));
  test.end();
});

tape('hsl.rgb returns the expected RGB color', function(test) {
  var c = color.hsl(70, .5, .4).rgb();
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 136);
  test.equal(c.g, 153);
  test.equal(c.b, 51);
  test.end();
});
