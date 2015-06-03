var tape = require("tape"),
    color = require("../");

tape.Test.prototype.rgbEqual = function(actual, r, g, b) {
  this._assert(actual instanceof color.rgb
      && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : actual.r === r)
      && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : actual.g === g)
      && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : actual.b === b), {
    message: "should be equal",
    operator: "rgbEqual",
    actual: [actual.r, actual.g, actual.b],
    expected: [r, g, b]
  });
};

tape("rgb(…) returns an instance of rgb and color", function(test) {
  var c = color.rgb(70, 130, 180);
  test.ok(c instanceof color.rgb);
  test.ok(c instanceof color.color);
  test.end();
});

tape("rgb(…) exposes r, g and b channel values", function(test) {
  var c = color.rgb("#abc");
  test.equal(c.r, 170);
  test.equal(c.g, 187);
  test.equal(c.b, 204);
  test.end();
});

tape("rgb.toString() formats as hexadecimal", function(test) {
  test.equal(color.rgb("#abcdef") + "", "#abcdef");
  test.equal(color.rgb("moccasin") + "", "#ffe4b5");
  test.equal(color.rgb("hsl(60, 100%, 20%)") + "", "#666600");
  test.equal(color.rgb("rgb(12, 34, 56)") + "", "#0c2238");
  test.equal(color.rgb(color.rgb(12, 34, 56)) + "", "#0c2238");
  test.equal(color.rgb(color.hsl(60, 1, .2)) + "", "#666600");
  test.end();
});

tape("rgb.toString() reflects r, g and b channel values", function(test) {
  var c = color.rgb("#abc");
  ++c.r, ++c.g, ++c.b; // Note: I don’t modifying channel values directly.
  test.equal(c + "", "#abbccd");
  test.end();
});

tape("rgb.toString() treats undefined channel values as 0", function(test) {
  test.equal(color.rgb("invalid") + "", "#000000");
  test.equal(color.rgb(NaN, 12, 34) + "", "#000c22");
  test.end();
});

tape("rgb(r, g, b) rounds channel values", function(test) {
  test.rgbEqual(color.rgb(1.2, 2.6, 42.9), 1, 3, 43);
  test.end();
});

tape("rgb(r, g, b) clamps channel values to [0,255]", function(test) {
  test.rgbEqual(color.rgb(-10, -20, -30), 0, 0, 0);
  test.rgbEqual(color.rgb(300, 400, 500), 255, 255, 255);
  test.end();
});

tape("rgb(r, g, b) coerces channel values to numbers", function(test) {
  test.rgbEqual(color.rgb("12", "34", "56"), 12, 34, 56);
  test.rgbEqual(color.rgb(null, null, null), 0, 0, 0);
  test.end();
});

tape("rgb(r, g, b) allows undefined channel values", function(test) {
  var c = color.rgb(undefined, NaN, "foo");
  test.ok(isNaN(c.r) && (c.r !== c.r));
  test.ok(isNaN(c.g) && (c.g !== c.g));
  test.ok(isNaN(c.b) && (c.b !== c.b));
  test.end();
});

tape("rgb(r, g, b) allows some channels to be defined, and others not", function(test) {
  var c = color.rgb(undefined, 42, "foo");
  test.ok(isNaN(c.r) && (c.r !== c.r));
  test.equal(c.g, 42);
  test.ok(isNaN(c.b) && (c.b !== c.b));
  test.end();
});

tape("rgb(format) parses hexadecimal (e.g., \"#abcdef\")", function(test) {
  test.rgbEqual(color.rgb("#abcdef"), 171, 205, 239);
  test.end();
});

tape("rgb(format) parses hexadecimal shorthand (e.g., \"#abc\")", function(test) {
  test.rgbEqual(color.rgb("#abc"), 170, 187, 204);
  test.end();
});

tape("rgb(format) parses integer values (e.g., \"rgb(12, 34, 56)\")", function(test) {
  test.rgbEqual(color.rgb("rgb(12, 34, 56)"), 12, 34, 56);
  test.end();
});

tape("rgb(format) parses percentage values (e.g., \"rgb(12%, 34%, 56%)\")", function(test) {
  test.rgbEqual(color.rgb("rgb(12%, 34%, 56%)"), 31, 87, 143);
  test.end();
});

tape("rgb(format) parses and converts HSL format (e.g., \"hsl(60, 100%, 20%)\")", function(test) {
  test.rgbEqual(color.rgb("hsl(60,100%,20%)"), 102, 102, 0);
  test.end();
});

tape("rgb(name) parses CSS color names (e.g., \"Moccasin\")", function(test) {
  test.rgbEqual(color.rgb("moccasin"), 255, 228, 181);
  test.rgbEqual(color.rgb("aliceblue"), 240, 248, 255);
  test.rgbEqual(color.rgb("yellow"), 255, 255, 0);
  test.rgbEqual(color.rgb("moccasin"), 255, 228, 181);
  test.rgbEqual(color.rgb("aliceblue"), 240, 248, 255);
  test.rgbEqual(color.rgb("yellow"), 255, 255, 0);
  test.end();
});

tape("rgb(name) ignores leading and trailing whitespace", function(test) {
  test.rgbEqual(color.rgb(" aliceblue\t\n"), 240, 248, 255);
  test.end();
});

tape("rgb(name) is case-insensitive", function(test) {
  test.rgbEqual(color.rgb("aLiCeBlUE"), 240, 248, 255);
  test.end();
});

tape("rgb(name) parses rebeccapurple", function(test) {
  test.rgbEqual(color.rgb("rebeccapurple"), 102, 51, 153);
  test.end();
});

tape("rgb(name) returns undefined channel values for unknown names", function(test) {
  test.rgbEqual(color.rgb("invalid"), NaN, NaN, NaN);
  test.rgbEqual(color.rgb("hasOwnProperty"), NaN, NaN, NaN);
  test.rgbEqual(color.rgb("__proto__"), NaN, NaN, NaN);
  test.end();
});

tape("rgb(rgb) copies an RGB color", function(test) {
  var c1 = color.rgb("steelblue"),
      c2 = color.rgb(c1);
  test.rgbEqual(c1, 70, 130, 180);
  c1.r = c1.g = c1.b = 0;
  test.rgbEqual(c1, 0, 0, 0);
  test.rgbEqual(c2, 70, 130, 180);
  test.end();
});

tape("rgb(hsl) converts from HSL", function(test) {
  test.rgbEqual(color.rgb(color.hsl(0, 1, .5)), 255, 0, 0);
  test.end();
});

tape("rgb.brighter(k) returns a brighter color if k > 0", function(test) {
  var c = color.rgb("brown");
  test.rgbEqual(c.brighter(.5), 197, 50, 50);
  test.rgbEqual(c.brighter(1), 236, 60, 60);
  test.rgbEqual(c.brighter(2), 255, 86, 86);
  test.end();
});

tape("rgb.brighter(k) returns a copy", function(test) {
  var c1 = color.rgb("steelblue"),
      c2 = c1.brighter(1);
  test.rgbEqual(c1, 70, 130, 180);
  test.rgbEqual(c2, 100, 186, 255);
  test.end();
});

tape("rgb.brighter() is equivalent to rgb.brighter(1)", function(test) {
  var c1 = color.rgb("steelblue"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  test.rgbEqual(c2, c3.r, c3.g, c3.b);
  test.end();
});

tape("rgb.brighter(k) is equivalent to rgb.darker(-k)", function(test) {
  var c1 = color.rgb("steelblue"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  test.rgbEqual(c2, c3.r, c3.g, c3.b);
  test.end();
});

tape("rgb(\"black\").brighter() still returns black", function(test) {
  var c1 = color.rgb("black"),
      c2 = c1.brighter(1);
  test.rgbEqual(c1, 0, 0, 0);
  test.rgbEqual(c2, 0, 0, 0);
  test.end();
});

tape("rgb.darker(k) returns a darker color if k > 0", function(test) {
  var c = color.rgb("brown");
  test.rgbEqual(c.darker(.5), 138, 35, 35);
  test.rgbEqual(c.darker(1), 115, 29, 29);
  test.rgbEqual(c.darker(2), 81, 21, 21);
  test.end();
});

tape("rgb.darker(k) returns a copy", function(test) {
  var c1 = color.rgb("steelblue"),
      c2 = c1.darker(1);
  test.rgbEqual(c1, 70, 130, 180);
  test.rgbEqual(c2, 49, 91, 126);
  test.end();
});

tape("rgb.darker() is equivalent to rgb.darker(1)", function(test) {
  var c1 = color.rgb("steelblue"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  test.rgbEqual(c2, c3.r, c3.g, c3.b);
  test.end();
});

tape("rgb.darker(k) is equivalent to rgb.brighter(-k)", function(test) {
  var c1 = color.rgb("steelblue"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  test.rgbEqual(c2, c3.r, c3.g, c3.b);
  test.end();
});

tape("rgb.rgb() returns this", function(test) {
  var c = color.rgb(70, 130, 180);
  test.equal(c.rgb(), c);
  test.end();
});
