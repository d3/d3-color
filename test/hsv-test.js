var tape = require("tape"),
    color = require("../");

require("./hsvEqual");
require("./rgbEqual");

tape("hsv(…) returns an instance of hsv and color", function(test) {
  var c = color.hsv(120, 0.4, 0.5);
  test.ok(c instanceof color.hsv);
  test.ok(c instanceof color.color);
  test.equal(c.constructor.name, "Hsv");
  test.end();
});

tape("hsv(…) exposes h, s, and v channel values and opacity", function(test) {
  test.hsvEqual(color.hsv("#abc"), 210, 0.16666666, 0.8, 1);
  test.hsvEqual(color.hsv(60, 1, 0.2, 0.4), 60, 1, 0.2, 0.4);
  test.end();
});

tape("hsv.toString() converts to RGB and formats as rgb(…) or rgba(…)", function(test) {
  test.equal(color.hsv("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(color.hsv("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(color.hsv("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(color.hsv(60, 1, 0.2) + "", "rgb(51, 51, 0)");
  test.equal(color.hsv(60, 1, 0.2, 0.4) + "", "rgba(51, 51, 0, 0.4)");
  test.equal(color.hsv(color.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  test.equal(color.hsv(color.hsv(60, 1, 0.2)) + "", "rgb(51, 51, 0)");
  test.equal(color.hsv(color.hsv(60, 1, 0.2, 0.4)) + "", "rgba(51, 51, 0, 0.4)");
  test.end();
});

tape("hsv.toString() reflects h, s and v channel values and opacity", function(test) {
  var c = color.hsv("#abc");
  c.h += 10, c.s += 0.01, c.v -= 0.01, c.opacity = 0.4;
  test.equal(c + "", "rgba(166, 178, 201, 0.4)");
  test.end();
});

tape("hsv.toString() treats undefined channel values as 0", function(test) {
  test.equal(color.hsv("invalid") + "", "rgb(0, 0, 0)");
  test.equal(color.hsv("#000") + "", "rgb(0, 0, 0)");
  test.equal(color.hsv("#ccc") + "", "rgb(204, 204, 204)");
  test.equal(color.hsv("#fff") + "", "rgb(255, 255, 255)");
  test.equal(color.hsv(NaN, 0.5, 0.4) + "", "rgb(102, 102, 102)"); // equivalent to hsv(*, 0, 0.4)
  test.equal(color.hsv(120, NaN, 0.4) + "", "rgb(102, 102, 102)");
  test.equal(color.hsv(NaN, NaN, 0.4) + "", "rgb(102, 102, 102)");
  test.equal(color.hsv(120, 0.5, NaN) + "", "rgb(0, 0, 0)"); // equivalent to hsv(120, 0.5, 0)
  test.end();
});

tape("hsv.toString() treats undefined opacity as 1", function(test) {
  var c = color.hsv("#abc");
  c.opacity = NaN;
  test.equal(c + "", "rgb(170, 187, 204)");
  test.end();
});

tape("hsv(h, s, v) does not wrap hue to [0,360)", function(test) {
  test.hsvEqual(color.hsv(-10, 0.4, 0.5), -10, 0.4, 0.5, 1);
  test.hsvEqual(color.hsv(0, 0.4, 0.5), 0, 0.4, 0.5, 1);
  test.hsvEqual(color.hsv(360, 0.4, 0.5), 360, 0.4, 0.5, 1);
  test.hsvEqual(color.hsv(370, 0.4, 0.5), 370, 0.4, 0.5, 1);
  test.end();
});

tape("hsv(h, s, v) does not clamp s and v channel values to [0,1]", function(test) {
  test.hsvEqual(color.hsv(120, -0.1, 0.5), 120, -0.1, 0.5, 1);
  test.hsvEqual(color.hsv(120, 1.1, 0.5), 120, 1.1, 0.5, 1);
  test.hsvEqual(color.hsv(120, 0.2, -0.1), 120, 0.2, -0.1, 1);
  test.hsvEqual(color.hsv(120, 0.2, 1.1), 120, 0.2, 1.1, 1);
  test.end();
});

tape("hsv(h, s, v, opacity) does not clamp opacity to [0,1]", function(test) {
  test.hsvEqual(color.hsv(120, 0.1, 0.5, -0.2), 120, 0.1, 0.5, -0.2);
  test.hsvEqual(color.hsv(120, 0.9, 0.5, 1.2), 120, 0.9, 0.5, 1.2);
  test.end();
});

tape("hsv(h, s, v) coerces channel values to numbers", function(test) {
  test.hsvEqual(color.hsv("120", ".4", ".5"), 120, 0.4, 0.5, 1);
  test.end();
});

tape("hsv(h, s, v, opacity) coerces opacity to number", function(test) {
  test.hsvEqual(color.hsv(120, 0.1, 0.5, "0.2"), 120, 0.1, 0.5, 0.2);
  test.hsvEqual(color.hsv(120, 0.9, 0.5, "0.9"), 120, 0.9, 0.5, 0.9);
  test.end();
});

tape("hsv(h, s, v) allows undefined channel values", function(test) {
  test.hsvEqual(color.hsv(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  test.hsvEqual(color.hsv(undefined, 0.4, 0.5), NaN, 0.4, 0.5, 1);
  test.hsvEqual(color.hsv(42, undefined, 0.5), 42, NaN, 0.5, 1);
  test.hsvEqual(color.hsv(42, 0.4, undefined), 42, 0.4, NaN, 1);
  test.end();
});

tape("hsv(h, s, v, opacity) converts undefined opacity to 1", function(test) {
  test.hsvEqual(color.hsv(10, 0.2, 0.3, null), 10, 0.2, 0.3, 1);
  test.hsvEqual(color.hsv(10, 0.2, 0.3, undefined), 10, 0.2, 0.3, 1);
  test.end();
});

tape("hsv(h, s, v) preserves explicit hue, even for grays", function(test) {
  test.hsvEqual(color.hsv(0, 0, 0), 0, 0, 0, 1);
  test.hsvEqual(color.hsv(42, 0, 0.5), 42, 0, 0.5, 1);
  test.hsvEqual(color.hsv(118, 0, 1), 118, 0, 1, 1);
  test.end();
});

tape("hsv(h, s, v) preserves explicit saturation, even for white or black", function(test) {
  test.hsvEqual(color.hsv(0, 0, 0), 0, 0, 0, 1);
  test.hsvEqual(color.hsv(0, 0.18, 0), 0, 0.18, 0, 1);
  test.hsvEqual(color.hsv(0, 0.42, 1), 0, 0.42, 1, 1);
  test.hsvEqual(color.hsv(0, 1, 1), 0, 1, 1, 1);
  test.end();
});

tape("hsv(format) parses the specified format and converts to HSV", function(test) {
  test.hsvEqual(color.hsv("#abcdef"), 210, 0.284519, 0.937255, 1);
  test.hsvEqual(color.hsv("#abc"), 210, 0.16666666, 0.8, 1);
  test.hsvEqual(color.hsv("rgb(12, 34, 56)"), 210, 0.785714, 0.219608, 1);
  test.hsvEqual(color.hsv("rgb(12%, 34%, 56%)"), 210, 0.785714, 0.56, 1);
  test.hsvEqual(color.hsv("aliceblue"), 208, 0.058824, 1, 1);
  test.hsvEqual(color.hsv("transparent"), NaN, NaN, NaN, 0);
  test.end();
});

tape("hsv(format) returns undefined channel values for unknown formats", function(test) {
  test.hsvEqual(color.hsv("invalid"), NaN, NaN, NaN, NaN);
  test.end();
});

tape("hsv(hsv) copies an HSV color", function(test) {
  var c1 = color.hsv(120,0.3,0.5,0.4),
      c2 = color.hsv(c1);
  test.hsvEqual(c1, 120, 0.3, 0.5, 0.4);
  c1.h = c1.s = c1.v = c1.opacity = 0;
  test.hsvEqual(c1, 0, 0, 0, 0);
  test.hsvEqual(c2, 120, 0.3, 0.5, 0.4);
  test.end();
});

tape("hsv(rgb) converts from RGB", function(test) {
  test.hsvEqual(color.hsv(color.rgb(255, 0, 0, 0.4)), 0, 1, 1, 0.4);
  test.end();
});

tape("hsv(color) returns undefined hue and zero saturation for grays (but not white and black)", function(test) {
  test.hsvEqual(color.hsv("gray"), NaN, 0, 0.5019608, 1);
  test.hsvEqual(color.hsv("#ccc"), NaN, 0, 0.8, 1);
  test.hsvEqual(color.hsv(color.rgb("gray")), NaN, 0, 0.5019608, 1);
  test.end();
});

tape("hsv(color) returns undefined hue and saturation for black and white", function(test) {
  test.hsvEqual(color.hsv("black"), NaN, NaN, 0, 1);
  test.hsvEqual(color.hsv("#000"), NaN, NaN, 0, 1);
  test.hsvEqual(color.hsv("white"), NaN, NaN, 1, 1);
  test.hsvEqual(color.hsv("#fff"), NaN, NaN, 1, 1);
  test.hsvEqual(color.hsv(color.rgb("#fff")), NaN, NaN, 1, 1);
  test.end();
});

tape("hsv(color) converts from another colorspace via color.rgb()", function(test) {
  function TestColor() {}
  TestColor.prototype = Object.create(color.color.prototype);
  TestColor.prototype.rgb = function() { return color.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  test.hsvEqual(color.hsv(new TestColor), 210, 0.785714, 0.219608, 0.4);
  test.end();
});

tape("hsv.displayable() returns true if the color is within the RGB gamut and the opacity is in [0,1]", function(test) {
  test.equal(color.hsv("white").displayable(), true);
  test.equal(color.hsv("red").displayable(), true);
  test.equal(color.hsv("black").displayable(), true);
  test.equal(color.hsv("invalid").displayable(), false);
  test.equal(color.hsv(NaN, NaN, 1).displayable(), true);
  test.equal(color.hsv(NaN, NaN, 1.5).displayable(), false);
  test.equal(color.hsv(120, -0.5, 0).displayable(), false);
  test.equal(color.hsv(120, 1.5, 0).displayable(), false);
  test.equal(color.hsv(0, 1, 1, 0).displayable(), true);
  test.equal(color.hsv(0, 1, 1, 1).displayable(), true);
  test.equal(color.hsv(0, 1, 1, -0.2).displayable(), false);
  test.equal(color.hsv(0, 1, 1, 1.2).displayable(), false);
  test.end();
});

tape("hsv.brighter(k) returns a brighter color if k > 0", function(test) {
  var c = color.hsv("rgba(120, 90, 90, 0.4)"); // hsv(0, ~25%, ~47%)
  test.hsvEqual(c.brighter(0.5), 0, 0.25, 0.562461, 0.4);
  test.hsvEqual(c.brighter(1), 0, 0.25, 0.672269, 0.4);
  test.hsvEqual(c.brighter(2), 0, 0.25, 0.960384, 0.4);
  test.end();
});

tape("hsv.brighter(k) returns a copy", function(test) {
  var c1 = color.hsv("rgba(90, 130, 120, 0.4)"),
      c2 = c1.brighter(1);
  test.hsvEqual(c1, 165, 0.307692, 0.509804, 0.4);
  test.hsvEqual(c2, 165, 0.307692, 0.728291, 0.4);
  test.end();
});

tape("hsv.brighter() is equivalent to hsv.brighter(1)", function(test) {
  var c1 = color.hsv("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  test.hsvEqual(c2, c3.h, c3.s, c3.v, 0.4);
  test.end();
});

tape("hsv.brighter(k) is equivalent to hsv.darker(-k)", function(test) {
  var c1 = color.hsv("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  test.hsvEqual(c2, c3.h, c3.s, c3.v, 0.4);
  test.end();
});

tape("hsv(\"black\").brighter() still returns black", function(test) {
  var c1 = color.hsv("black"),
      c2 = c1.brighter(1);
  test.hsvEqual(c1, NaN, NaN, 0, 1);
  test.hsvEqual(c2, NaN, NaN, 0, 1);
  test.end();
});

tape("hsv.darker(k) returns a darker color if k > 0", function(test) {
  var c = color.hsv("rgba(120, 90, 90, 0.4)"); // hsv(0, ~25%, ~47%)
  test.hsvEqual(c.darker(0.5), 0, 0.25, 0.393722, 0.4);
  test.hsvEqual(c.darker(1), 0, 0.25, 0.329412, 0.4);
  test.hsvEqual(c.darker(2), 0, 0.25, 0.230588, 0.4);
  test.end();
});

tape("hsv.darker(k) returns a copy", function(test) {
  var c1 = color.hsv("rgba(90, 130, 120, 0.4)"),
      c2 = c1.darker(1);
  test.hsvEqual(c1, 165, 0.307692, 0.509804, 0.4);
  test.hsvEqual(c2, 165, 0.307692, 0.356863, 0.4);
  test.end();
});

tape("hsv.darker() is equivalent to hsv.darker(1)", function(test) {
  var c1 = color.hsv("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  test.hsvEqual(c2, c3.h, c3.s, c3.v, 0.4);
  test.end();
});

tape("hsv.darker(k) is equivalent to hsv.brighter(-k)", function(test) {
  var c1 = color.hsv("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  test.hsvEqual(c2, c3.h, c3.s, c3.v, 0.4);
  test.end();
});

tape("hsv.rgb() converts to RGB", function(test) {
  var c = color.hsv(120, 0.3, 0.5, 0.4);
  test.rgbEqual(c.rgb(), 89, 128, 89, 0.4);
  test.end();
});
