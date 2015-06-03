var tape = require("tape"),
    color = require("../");

require("./hslEqual");
require("./rgbEqual");

tape("hsl(…) returns an instance of hsl and color", function(test) {
  var c = color.hsl(120, .4, .5);
  test.ok(c instanceof color.hsl);
  test.ok(c instanceof color.color);
  test.end();
});

tape("hsl(…) exposes h, s, and l channel values", function(test) {
  test.hslEqual(color.hsl("#abc"), 210, .25, .7333333);
  test.end();
});

tape("hsl.toString() converts to RGB and formats as hexadecimal", function(test) {
  test.equal(color.hsl("#abcdef") + "", "#abcdef");
  test.equal(color.hsl("moccasin") + "", "#ffe4b5");
  test.equal(color.hsl("hsl(60, 100%, 20%)") + "", "#666600");
  test.equal(color.hsl("rgb(12, 34, 56)") + "", "#0c2238");
  test.equal(color.hsl(color.rgb(12, 34, 56)) + "", "#0c2238");
  test.equal(color.hsl(color.hsl(60, 1, .2)) + "", "#666600");
  test.end();
});

tape("hsl.toString() reflects h, s and l channel values", function(test) {
  var c = color.hsl("#abc");
  c.h += 10, c.s += .01, c.l -= .01; // Note: I don’t modifying channel values directly.
  test.equal(c + "", "#a6b2cb");
  test.end();
});

tape("hsl.toString() treats undefined channel values as 0", function(test) {
  test.equal(color.hsl("invalid") + "", "#000000");
  test.equal(color.hsl("#000") + "", "#000000");
  test.equal(color.hsl("#ccc") + "", "#cccccc");
  test.equal(color.hsl("#fff") + "", "#ffffff");
  test.equal(color.hsl(NaN, .5, .4) + "", "#666666"); // equivalent to hsl(*, 0, .4)
  test.equal(color.hsl(120, NaN, .4) + "", "#666666");
  test.equal(color.hsl(NaN, NaN, .4) + "", "#666666");
  test.equal(color.hsl(120, .5, NaN) + "", "#000000"); // equivalent to hsl(120, .5, 0)
  test.end();
});

tape("hsl(h, s, l) wraps hue to [0,360)", function(test) {
  test.hslEqual(color.hsl(-10, .4, .5), 350, .4, .5);
  test.hslEqual(color.hsl(0, .4, .5), 0, .4, .5);
  test.hslEqual(color.hsl(360, .4, .5), 0, .4, .5);
  test.hslEqual(color.hsl(370, .4, .5), 10, .4, .5);
  test.end();
});

tape("hsl(h, s, l) clamps s and l channel values to [0,1]", function(test) {
  test.hslEqual(color.hsl(120, -.1, .5), 120, 0, .5);
  test.hslEqual(color.hsl(120, 1.1, .5), 120, 1, .5);
  test.hslEqual(color.hsl(120, .2, -.1), 120, .2, 0);
  test.hslEqual(color.hsl(120, .2, 1.1), 120, .2, 1);
  test.end();
});

tape("hsl(h, s, l) coerces channel values to numbers", function(test) {
  test.hslEqual(color.hsl("120", ".4", ".5"), 120, .4, .5);
  test.end();
});

tape("hsl(h, s, l) allows undefined channel values", function(test) {
  test.hslEqual(color.hsl(undefined, NaN, "foo"), NaN, NaN, NaN);
  test.hslEqual(color.hsl(undefined, .4, .5), NaN, .4, .5);
  test.hslEqual(color.hsl(42, undefined, .5), 42, NaN, .5);
  test.hslEqual(color.hsl(42, .4, undefined), 42, .4, NaN);
  test.end();
});

tape("hsl(h, s, l) preserves explicit hue, even for grays", function(test) {
  test.hslEqual(color.hsl(0, 0, 0), 0, 0, 0);
  test.hslEqual(color.hsl(42, 0, .5), 42, 0, .5);
  test.hslEqual(color.hsl(118, 0, 1), 118, 0, 1);
  test.end();
});

tape("hsl(h, s, l) preserves explicit saturation, even for white or black", function(test) {
  test.hslEqual(color.hsl(0, 0, 0), 0, 0, 0);
  test.hslEqual(color.hsl(0, .18, 0), 0, .18, 0);
  test.hslEqual(color.hsl(0, .42, 1), 0, .42, 1);
  test.hslEqual(color.hsl(0, 1, 1), 0, 1, 1);
  test.end();
});

tape("hsl(format) parses the specified format and converts to HSL", function(test) {
  test.hslEqual(color.hsl("#abcdef"), 210, 0.68, 0.8039215);
  test.hslEqual(color.hsl("#abc"), 210, 0.25, 0.733333333);
  test.hslEqual(color.hsl("rgb(12, 34, 56)"), 210, 0.647058, 0.1333333);
  test.hslEqual(color.hsl("rgb(12%, 34%, 56%)"), 210, 0.643678, 0.3411765);
  test.hslEqual(color.hsl("hsl(60,100%,20%)"), 60, 1, 0.2);
  test.hslEqual(color.hsl("aliceblue"), 208, 1, 0.9705882);
  test.end();
});

tape("hsl(format) does not lose precision when parsing HSL formats", function(test) {
  test.hslEqual(color.hsl("hsl(325,50%,40%)"), 325, .5, .4);
  test.end();
});

tape("hsl(format) returns undefined channel values for unknown formats", function(test) {
  test.hslEqual(color.hsl("invalid"), NaN, NaN, NaN);
  test.end();
});

tape("hsl(hsl) copies an HSL color", function(test) {
  var c1 = color.hsl("hsl(120,30%,50%)"),
      c2 = color.hsl(c1);
  test.hslEqual(c1, 120, .3, .5);
  c1.h = c1.s = c1.l = 0;
  test.hslEqual(c1, 0, 0, 0);
  test.hslEqual(c2, 120, .3, .5);
  test.end();
});

tape("hsl(rgb) converts from RGB", function(test) {
  test.hslEqual(color.hsl(color.rgb(255, 0, 0)), 0, 1, .5);
  test.end();
});

tape("hsl(color) returns undefined hue and zero saturation for grays (but not white and black)", function(test) {
  test.hslEqual(color.hsl("gray"), NaN, 0, 0.5019608);
  test.hslEqual(color.hsl("#ccc"), NaN, 0, 0.8);
  test.hslEqual(color.hsl(color.rgb("gray")), NaN, 0, 0.5019608);
  test.end();
});

tape("hsl(color) returns undefined hue and saturation for black and white", function(test) {
  test.hslEqual(color.hsl("black"), NaN, NaN, 0);
  test.hslEqual(color.hsl("#000"), NaN, NaN, 0);
  test.hslEqual(color.hsl("white"), NaN, NaN, 1);
  test.hslEqual(color.hsl("#fff"), NaN, NaN, 1);
  test.hslEqual(color.hsl(color.rgb("#fff")), NaN, NaN, 1);
  test.end();
});

tape("hsl(color) converts from another colorspace via color.rgb()", function(test) {
  function TestColor() {}
  TestColor.prototype = Object.create(color.color.prototype);
  TestColor.prototype.rgb = function() { return color.rgb(12, 34, 56); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  test.hslEqual(color.hsl(new TestColor), 210, 0.6470588, 0.1333334);
  test.end();
});

tape("hsl.brighter(k) returns a brighter color if k > 0", function(test) {
  var c = color.hsl("brown");
  test.hslEqual(c.brighter(.5), 0, 0.5942028, 0.4851222);
  test.hslEqual(c.brighter(1), 0, 0.5942028, 0.5798319);
  test.hslEqual(c.brighter(2), 0, 0.5942028, 0.8283313);
  test.end();
});

tape("hsl.brighter(k) returns a copy", function(test) {
  var c1 = color.hsl("steelblue"),
      c2 = c1.brighter(1);
  test.hslEqual(c1, 207.272727, 0.44, 0.4901961);
  test.hslEqual(c2, 207.272727, 0.44, 0.7002801);
  test.end();
});

tape("hsl.brighter() is equivalent to hsl.brighter(1)", function(test) {
  var c1 = color.hsl("steelblue"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  test.hslEqual(c2, c3.h, c3.s, c3.l);
  test.end();
});

tape("hsl.brighter(k) is equivalent to hsl.darker(-k)", function(test) {
  var c1 = color.hsl("steelblue"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  test.hslEqual(c2, c3.h, c3.s, c3.l);
  test.end();
});

tape("hsl(\"black\").brighter() still returns black", function(test) {
  var c1 = color.hsl("black"),
      c2 = c1.brighter(1);
  test.hslEqual(c1, NaN, NaN, 0);
  test.hslEqual(c2, NaN, NaN, 0);
  test.end();
});

tape("hsl.darker(k) returns a darker color if k > 0", function(test) {
  var c = color.hsl("brown");
  test.hslEqual(c.darker(.5), 0, 0.5942029, 0.3395855);
  test.hslEqual(c.darker(1), 0, 0.5942029, 0.2841176);
  test.hslEqual(c.darker(2), 0, 0.5942029, 0.1988823);
  test.end();
});

tape("hsl.darker(k) returns a copy", function(test) {
  var c1 = color.hsl("steelblue"),
      c2 = c1.darker(1);
  test.hslEqual(c1, 207.272727, 0.44, 0.4901961);
  test.hslEqual(c2, 207.272727, 0.44, 0.3431373);
  test.end();
});

tape("hsl.darker() is equivalent to hsl.darker(1)", function(test) {
  var c1 = color.hsl("steelblue"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  test.hslEqual(c2, c3.h, c3.s, c3.l);
  test.end();
});

tape("hsl.darker(k) is equivalent to hsl.brighter(-k)", function(test) {
  var c1 = color.hsl("steelblue"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  test.hslEqual(c2, c3.h, c3.s, c3.l);
  test.end();
});

tape("hsl.rgb() converts to RGB", function(test) {
  var c = color.hsl(120, .3, .5);
  test.rgbEqual(c.rgb(), 89, 166, 89);
  test.end();
});
