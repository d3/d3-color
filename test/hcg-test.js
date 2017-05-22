var tape = require("tape"),
    color = require("../");

require("./hcgEqual");
require("./rgbEqual");

tape("hcg(…) returns an instance of hcg and color", function(test) {
  var c = color.hcg(120, 0.4, 0.5);
  test.ok(c instanceof color.hcg);
  test.ok(c instanceof color.color);
  test.equal(c.constructor.name, "hcg");
  test.end();
});

tape("hcg(…) exposes h, s, and l channel values and opacity", function(test) {
  test.hcgEqual(color.hcg("#abc"), 210, 0.25, 0.7333333, 1);
  test.hcgEqual(color.hcg("hcga(60, 40%, 0%, 0.4)"), 60, 0.4, 0.0, 0.4);
  test.end();
});

tape("hcg.toString() converts to RGB and formats as rgb(…) or rgba(…)", function(test) {
  test.equal(color.hcg("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(color.hcg("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(color.hcg("hcg(60, 40%, 0%)") + "", "rgb(102, 102, 0)");
  test.equal(color.hcg("hcga(60, 40%, 0%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  test.equal(color.hcg("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(color.hcg(color.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  test.equal(color.hcg(color.hcg(60, 0.4, 0.0)) + "", "rgb(102, 102, 0)");
  test.equal(color.hcg(color.hcg(60, 0.4, 0.0, 0.4)) + "", "rgba(102, 102, 0, 0.4)");
  test.end();
});

tape("hcg.toString() reflects h, s and l channel values and opacity", function(test) {
  var c = color.hcg("#abc");
  c.h += 10, c.c += 0.01, c.g -= 0.01, c.opacity = 0.4;
  test.equal(c + "", "rgba(166, 178, 203, 0.4)");
  test.end();
});

tape("hcg.toString() treats undefined channel values as 0", function(test) {
  test.equal(color.hcg("invalid") + "", "rgb(0, 0, 0)");
  test.equal(color.hcg("#000") + "", "rgb(0, 0, 0)");
  test.equal(color.hcg("#ccc") + "", "rgb(204, 204, 204)");
  test.equal(color.hcg("#fff") + "", "rgb(255, 255, 255)");
  test.equal(color.hcg(NaN, 0.0, 0.4) + "", "rgb(102, 102, 102)"); // equivalent to hcg(*, 0, 0.4)
  test.equal(color.hcg(120, NaN, 0.4) + "", "rgb(102, 102, 102)");
  test.equal(color.hcg(NaN, NaN, 0.4) + "", "rgb(102, 102, 102)");
  test.equal(color.hcg(120, 0.0, NaN) + "", "rgb(0, 0, 0)"); // equivalent to hcg(120, 0.5, 0)
  test.end();
});

tape("hcg.toString() treats undefined opacity as 1", function(test) {
  var c = color.hcg("#abc");
  c.opacity = NaN;
  test.equal(c + "", "rgb(170, 187, 204)");
  test.end();
});

tape("hcg(h, c, g) does not wrap hue to [0,360)", function(test) {
  test.hcgEqual(color.hcg(-10, 0.4, 0.5), -10, 0.4, 0.5, 1);
  test.hcgEqual(color.hcg(0, 0.4, 0.5), 0, 0.4, 0.5, 1);
  test.hcgEqual(color.hcg(360, 0.4, 0.5), 360, 0.4, 0.5, 1);
  test.hcgEqual(color.hcg(370, 0.4, 0.5), 370, 0.4, 0.5, 1);
  test.end();
});

tape("hcg(h, c, g) does not clamp s and l channel values to [0,1]", function(test) {
  test.hcgEqual(color.hcg(120, -0.1, 0.5), 120, -0.1, 0.5, 1);
  test.hcgEqual(color.hcg(120, 1.1, 0.5), 120, 1.1, 0.5, 1);
  test.hcgEqual(color.hcg(120, 0.2, -0.1), 120, 0.2, -0.1, 1);
  test.hcgEqual(color.hcg(120, 0.2, 1.1), 120, 0.2, 1.1, 1);
  test.end();
});

tape("hcg(h, c, g, opacity) does not clamp opacity to [0,1]", function(test) {
  test.hcgEqual(color.hcg(120, 0.1, 0.5, -0.2), 120, 0.1, 0.5, -0.2);
  test.hcgEqual(color.hcg(120, 0.9, 0.5, 1.2), 120, 0.9, 0.5, 1.2);
  test.end();
});

tape("hcg(h, c, g) coerces channel values to numbers", function(test) {
  test.hcgEqual(color.hcg("120", ".4", ".5"), 120, 0.4, 0.5, 1);
  test.end();
});

tape("hcg(h, c, g, opacity) coerces opacity to number", function(test) {
  test.hcgEqual(color.hcg(120, 0.1, 0.5, "0.2"), 120, 0.1, 0.5, 0.2);
  test.hcgEqual(color.hcg(120, 0.9, 0.5, "0.9"), 120, 0.9, 0.5, 0.9);
  test.end();
});

tape("hcg(h, c, g) allows undefined channel values", function(test) {
  test.hcgEqual(color.hcg(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  test.hcgEqual(color.hcg(undefined, 0.4, 0.5), NaN, 0.4, 0.5, 1);
  test.hcgEqual(color.hcg(42, undefined, 0.5), 42, NaN, 0.5, 1);
  test.hcgEqual(color.hcg(42, 0.4, undefined), 42, 0.4, NaN, 1);
  test.end();
});

tape("hcg(h, c, g, opacity) converts undefined opacity to 1", function(test) {
  test.hcgEqual(color.hcg(10, 0.2, 0.3, null), 10, 0.2, 0.3, 1);
  test.hcgEqual(color.hcg(10, 0.2, 0.3, undefined), 10, 0.2, 0.3, 1);
  test.end();
});

tape("hcg(h, c, g) preserves explicit hue, even for grays", function(test) {
  test.hcgEqual(color.hcg(0, 0, 0), 0, 0, 0, 1);
  test.hcgEqual(color.hcg(42, 0, 0.5), 42, 0, 0.5, 1);
  test.hcgEqual(color.hcg(118, 0, 1), 118, 0, 1, 1);
  test.end();
});

tape("hcg(h, c, g) preserves explicit saturation, even for white or black", function(test) {
  test.hcgEqual(color.hcg(0, 0, 0), 0, 0, 0, 1);
  test.hcgEqual(color.hcg(0, 0.18, 0), 0, 0.18, 0, 1);
  test.hcgEqual(color.hcg(0, 0.42, 1), 0, 0.42, 1, 1);
  test.hcgEqual(color.hcg(0, 1, 1), 0, 1, 1, 1);
  test.end();
});

tape("hcg(format) parses the specified format and converts to hcg", function(test) {
  test.hcgEqual(color.hcg("#abcdef"), 210, 0.68, 0.8039215, 1);
  test.hcgEqual(color.hcg("#abc"), 210, 0.25, 0.733333333, 1);
  test.hcgEqual(color.hcg("rgb(12, 34, 56)"), 210, 0.172549, 0.056872, 1);
  test.hcgEqual(color.hcg("rgb(12%, 34%, 56%)"), 210, 0.44, 0.2142857, 1);
  test.hcgEqual(color.hcg("hcg(60,100%,20%)"), 60, 1, 0.2, 1);
  test.hcgEqual(color.hcg("hcga(60,100%,20%,0.4)"), 60, 1, 0.2, 0.4);
  test.hcgEqual(color.hcg("aliceblue"), 208, 0.0588235, 1, 1);
  test.hcgEqual(color.hcg("transparent"), NaN, NaN, NaN, 0);
  test.end();
});

tape("hcg(format) ignores the hue if the saturation is <= 0", function(test) {
  test.hcgEqual(color.hcg("hcg(120,0%,20%)"), NaN, 0, 0.2, 1);
  test.hcgEqual(color.hcg("hcg(120,-10%,20%)"), NaN, -0.1, 0.2, 1);
  test.end();
});

tape("hcg(format) ignores the hue and saturation if the lightness is <= 0 or >= 1", function(test) {
  test.hcgEqual(color.hcg("hcg(120,20%,-10%)"), NaN, NaN, -0.1, 1);
  test.hcgEqual(color.hcg("hcg(120,20%,0%)"), NaN, NaN, 0.0, 1);
  test.hcgEqual(color.hcg("hcg(120,20%,100%)"), NaN, NaN, 1.0, 1);
  test.hcgEqual(color.hcg("hcg(120,20%,120%)"), NaN, NaN, 1.2, 1);
  test.end();
});

tape("hcg(format) ignores all channels if the alpha is <= 0", function(test) {
  test.hcgEqual(color.hcg("hcga(120,20%,10%,0)"), NaN, NaN, NaN, 0);
  test.hcgEqual(color.hcg("hcga(120,20%,10%,-0.1)"), NaN, NaN, NaN, -0.1);
  test.end();
});

tape("hcg(format) does not lose precision when parsing hcg formats", function(test) {
  test.hcgEqual(color.hcg("hcg(325,50%,40%)"), 325, 0.5, 0.4, 1);
  test.end();
});

tape("hcg(format) returns undefined channel values for unknown formats", function(test) {
  test.hcgEqual(color.hcg("invalid"), NaN, NaN, NaN, NaN);
  test.end();
});

tape("hcg(hcg) copies an hcg color", function(test) {
  var c1 = color.hcg("hcga(120,30%,50%,0.4)"),
      c2 = color.hcg(c1);
  test.hcgEqual(c1, 120, 0.3, 0.5, 0.4);
  c1.h = c1.c = c1.g = c1.opacity = 0;
  test.hcgEqual(c1, 0, 0, 0, 0);
  test.hcgEqual(c2, 120, 0.3, 0.5, 0.4);
  test.end();
});

tape("hcg(rgb) converts from RGB", function(test) {
  test.hcgEqual(color.hcg(color.rgb(255, 0, 0, 0.4)), 0, 1, 0, 0.4);
  test.end();
});

tape("hcg(color) returns undefined hue and zero saturation for grays (but not white and black)", function(test) {
  test.hcgEqual(color.hcg("gray"), NaN, 0, 0.5019608, 1);
  test.hcgEqual(color.hcg("#ccc"), NaN, 0, 0.8, 1);
  test.hcgEqual(color.hcg(color.rgb("gray")), NaN, 0, 0.5019608, 1);
  test.end();
});

tape("hcg(color) returns undefined hue and saturation for black and white", function(test) {
  test.hcgEqual(color.hcg("black"), NaN, 0, 0, 1);
  test.hcgEqual(color.hcg("#000"), NaN, 0, 0, 1);
  test.hcgEqual(color.hcg("white"), NaN, 0, 1, 1);
  test.hcgEqual(color.hcg("#fff"), NaN, 0, 1, 1);
  test.hcgEqual(color.hcg(color.rgb("#fff")), NaN, 0, 1, 1);
  test.end();
});

tape("hcg(color) converts from another colorspace via color.rgb()", function(test) {
  function TestColor() {}
  TestColor.prototype = Object.create(color.color.prototype);
  TestColor.prototype.rgb = function() { return color.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  test.hcgEqual(color.hcg(new TestColor), 210, 0.1725490, 0.056872, 0.4);
  test.end();
});

tape("hcg.displayable() returns true if the color is within the RGB gamut and the opacity is in [0,1]", function(test) {
  test.equal(color.hcg("white").displayable(), true);
  test.equal(color.hcg("red").displayable(), true);
  test.equal(color.hcg("black").displayable(), true);
  test.equal(color.hcg("invalid").displayable(), false);
  test.equal(color.hcg(NaN, NaN, 1).displayable(), true);
  test.equal(color.hcg(NaN, NaN, 1.5).displayable(), false);
  test.equal(color.hcg(120, -0.5, 0).displayable(), false);
  test.equal(color.hcg(120, 1.5, 0).displayable(), false);
  test.equal(color.hcg(0, 1, 1, 0).displayable(), true);
  test.equal(color.hcg(0, 1, 1, 1).displayable(), true);
  test.equal(color.hcg(0, 1, 1, -0.2).displayable(), false);
  test.equal(color.hcg(0, 1, 1, 1.2).displayable(), false);
  test.end();
});

tape("hcg.rgb() converts to RGB", function(test) {
  var c = color.hcg(120, 0.3, 0.5, 0.4);
  test.rgbEqual(c.rgb(), 89, 166, 89, 0.4);
  test.end();
});
