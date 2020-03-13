var tape = require("tape"),
    color = require("../");

require("./hwbEqual");
require("./rgbEqual");

tape("hwb(…) returns an instance of hwb and color", function(test) {
  var c = color.hwb(120, 0.4, 0.5);
  test.ok(c instanceof color.hwb);
  test.ok(c instanceof color.color);
  test.end();
});

tape("hwb(…) exposes h, w and b channel values and opacity", function(test) {
  test.hwbEqual(color.hwb("#abc"), 210, 0.666666, 0.2, 1);
  test.hwbEqual(color.hwb("hwb(209 15% 37%)"), 209, 0.15, 0.37, 1);
  test.hwbEqual(color.hwb("hwb(60 70% 20%/0.4)"), 60, 0.7, 0.2, 0.4);
  test.end();
});

tape("hwb.toString() converts to RGB and formats as rgb(…) or rgba(…)", function(test) {
  test.equal(color.hwb("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(color.hwb("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(color.hwb("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  test.equal(color.hwb("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  test.equal(color.hwb("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(color.hwb(color.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  test.equal(color.hwb(color.hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  test.equal(color.hwb(color.hsl(60, 1, 0.2, 0.4)) + "", "rgba(102, 102, 0, 0.4)");
  test.end();
});

tape("hwb.formatRgb() formats as rgb(…) or rgba(…)", function(test) {
  test.equal(color.hwb("#abcdef").formatRgb(), "rgb(171, 205, 239)");
  test.equal(color.hwb("hsl(60, 100%, 20%)").formatRgb(), "rgb(102, 102, 0)");
  test.equal(color.hwb("rgba(12%, 34%, 56%, 0.4)").formatRgb(), "rgba(31, 87, 143, 0.4)");
  test.equal(color.hwb("hsla(60, 100%, 20%, 0.4)").formatRgb(), "rgba(102, 102, 0, 0.4)");
  test.equal(color.hwb("hwb(60 100% 20%/0.4)").formatRgb(), "rgba(213, 213, 213, 0.4)");
  test.end();
});

tape("hwb.formatHsl() formats as hsl(…) or hsla(…)", function(test) {
  test.equal(color.hwb("#abcdef").formatHsl(), "hsl(210, 68%, 80.3921568627451%)");
  test.equal(color.hwb("hsl(60, 100%, 20%)").formatHsl(), "hsl(60, 100%, 20%)");
  test.equal(color.hwb("rgba(12%, 34%, 56%, 0.4)").formatHsl(), "hsla(210, 64.70588235294117%, 34%, 0.4)");
  test.equal(color.hwb("hsla(60, 100%, 20%, 0.4)").formatHsl(), "hsla(60, 100%, 20%, 0.4)");
  test.equal(color.hwb("hwb(120 50% 0%)").formatHsl(), "hsl(120, 100%, 75%)");
  test.equal(color.hwb("hwb(120 50% 50%/0.2)").formatHsl(), "hsla(0, 0%, 50%, 0.2)");
  test.end();
});

tape("hwb.formatHwb() formats as hwb(…)", function(test) {
  test.equal(color.hwb("#abcdef").formatHwb(), "hwb(210 67.05882352941175% 6.2745098039215685%)");
  test.equal(color.hwb("hsl(60, 100%, 20%)").formatHwb(), "hwb(60 0% 60%)");
  test.equal(color.hwb("rgba(12%, 34%, 56%, 0.4)").formatHwb(), "hwb(210 12.000000000000002% 43.99999999999999%/0.4)");
  test.equal(color.hwb("hsla(60, 100%, 20%, 0.4)").formatHwb(), "hwb(60 0% 60%/0.4)");
  test.equal(color.hwb("hwb(120 50% 0%)").formatHwb(), "hwb(120 50% 0%)");
  test.equal(color.hwb("hwb(120 50% 50%/0.2)").formatHwb(), "hwb(0 50% 50%/0.2)");
  test.end();
});

tape("hwb.formatHex() formats as #rrggbb", function(test) {
  test.equal(color.hwb("#abcdef").formatHex(), "#abcdef");
  test.equal(color.hwb("hsl(60, 100%, 20%)").formatHex(), "#666600");
  test.equal(color.hwb("rgba(12%, 34%, 56%, 0.4)").formatHex(), "#1f578f");
  test.equal(color.hwb("hwb(60 100% 20%/0.4)").formatHex(), "#d5d5d5");
  test.end();
});

tape("hwb.toString() reflects h, w and b channel values and opacity", function(test) {
  var c = color.hwb("#abc");
  c.h += 10, c.w += 0.05, c.b -= 0.05, c.opacity = 0.4;
  test.equal(c + "", "rgba(183, 194, 217, 0.4)");
  test.end();
});

tape("hwb.toString() treats undefined hue as gray, undefined whiteness/blackness as 0", function(test) {
  test.equal(color.hwb("invalid") + "", "rgb(0, 0, 0)");
  test.equal(color.hwb("#000") + "", "rgb(0, 0, 0)");
  test.equal(color.hwb("#ccc") + "", "rgb(204, 204, 204)");
  test.equal(color.hwb("#fff") + "", "rgb(255, 255, 255)");
  test.equal(color.hwb(NaN, 0.4, 0.1) + "", "rgb(102, 102, 102)");
  test.equal(color.hwb(120, NaN, 0.4) + "", "rgb(0, 153, 0)");
  test.equal(color.hwb(120, 0.5, NaN) + "", "rgb(128, 255, 128)");
  test.end();
});

tape("hwb.toString() treats undefined opacity as 1", function(test) {
  var c = color.hwb("#abc");
  c.opacity = NaN;
  test.equal(c + "", "rgb(170, 187, 204)");
  test.end();
});

tape("hwb(h, w, b) does not wrap hue to [0,360)", function(test) {
  test.hwbEqual(color.hwb(-10, 0.4, 0.5), -10, 0.4, 0.5, 1);
  test.hwbEqual(color.hwb(0, 0.4, 0.5), 0, 0.4, 0.5, 1);
  test.hwbEqual(color.hwb(360, 0.4, 0.5), 360, 0.4, 0.5, 1);
  test.hwbEqual(color.hwb(370, 0.4, 0.5), 370, 0.4, 0.5, 1);
  test.end();
})

tape("hwb(h, w, b) does not clamp w and b channel values to [0,1]", function(test) {
  test.hwbEqual(color.hwb(120, -0.1, 0.5), 120, -0.1, 0.5, 1);
  test.hwbEqual(color.hwb(120, 1.1, 0.5), 120, 1.1, 0.5, 1);
  test.hwbEqual(color.hwb(120, 0.2, -0.1), 120, 0.2, -0.1, 1);
  test.hwbEqual(color.hwb(120, 0.2, 1.1), 120, 0.2, 1.1, 1);
  test.end();
});

tape("hwb(h, w, b, opacity) does not clamp opacity to [0,1]", function(test) {
  test.hwbEqual(color.hwb(120, 0.1, 0.5, -0.2), 120, 0.1, 0.5, -0.2);
  test.hwbEqual(color.hwb(120, 0.3, 0.5, 1.2), 120, 0.3, 0.5, 1.2);
  test.end();
});

tape("hwb(h, w, b) coerces channel values to numbers", function(test) {
  test.hwbEqual(color.hwb("120", ".4", ".5"), 120, 0.4, 0.5, 1);
  test.end();
});

tape("hwb(h, w, b, opacity) coerces opacity to number", function(test) {
  test.hwbEqual(color.hwb(120, 0.1, 0.5, "0.2"), 120, 0.1, 0.5, 0.2);
  test.hwbEqual(color.hwb(120, 0.3, 0.5, "0.9"), 120, 0.3, 0.5, 0.9);
  test.end();
});

tape("hwb(h, w, b) allows undefined channel values", function(test) {
  test.hwbEqual(color.hwb(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  test.hwbEqual(color.hwb(undefined, 0.4, 0.5), NaN, 0.4, 0.5, 1);
  test.hwbEqual(color.hwb(42, undefined, 0.5), 42, NaN, 0.5, 1);
  test.hwbEqual(color.hwb(42, 0.4, undefined), 42, 0.4, NaN, 1);
  test.end();
});

tape("hwb(h, w, b, opacity) converts undefined opacity to 1", function(test) {
  test.hwbEqual(color.hwb(10, 0.2, 0.3, null), 10, 0.2, 0.3, 1);
  test.hwbEqual(color.hwb(10, 0.2, 0.3, undefined), 10, 0.2, 0.3, 1);
  test.end();
});

tape("hwb(h, w, b) preserves explicit hue, even for grays", function(test) {
  test.hwbEqual(color.hwb(0, 0.7, 0.4), 0, 0.7, 0.4, 1);
  test.hwbEqual(color.hwb(42, 0.5, 0.5), 42, 0.5, 0.5, 1);
  test.hwbEqual(color.hwb(118, 0.3, 0.9), 118, 0.3, 0.9, 1);
  test.end();
});

tape("hwb(format) parses the specified format and converts to HWB", function(test) {
  test.hwbEqual(color.hwb("#abcdef"), 210, 0.670588, 0.062745, 1);
  test.hwbEqual(color.hwb("#abc"), 210, 0.666666, 0.2, 1);
  test.hwbEqual(color.hwb("#6dc6fb80"), 202.394366, 0.427451, 0.015686, 128 / 255);
  test.hwbEqual(color.hwb("#abc3"), 210, 0.666666, 0.2, 0.2);
  test.hwbEqual(color.hwb("rgb(12, 34, 56)"), 210, 0.047059, 0.780392, 1);
  test.hwbEqual(color.hwb("rgba(164,107,189,0.66)"), 281.707317, 0.419608, 0.258824, 0.66);
  test.hwbEqual(color.hwb("rgb(12%,34%,56%)"), 210, 0.12, 0.44, 1);
  test.hwbEqual(color.hwb("rgba(12%, 34%, 56%, .78)"), 210, 0.12, 0.44, 0.78);
  test.hwbEqual(color.hwb("hsl(60,100%,20%)"), 60, 0, 0.6, 1);
  test.hwbEqual(color.hwb("hsla(60,100%,20%,0.4)"), 60, 0, 0.6, 0.4);
  test.hwbEqual(color.hwb("hwb(48  12% 24% )"), 48, 0.12, 0.24, 1);
  test.hwbEqual(color.hwb("hwb(48 12% 24%/0.77)"), 48, 0.12, 0.24, 0.77);
  test.hwbEqual(color.hwb("rebeccapurple"), 270, 0.2, 0.4, 1);
  test.hwbEqual(color.hwb("transparent"), NaN, NaN, NaN, 0);
  test.end();
});

tape("hwb(format) returns undefined channel values if whiteness or blackness fall outside [0,1]", function(test) {
  test.hwbEqual(color.hwb("hwb(120 110% 20%)"), NaN, NaN, NaN, NaN);
  test.hwbEqual(color.hwb("hwb(120 -10% 20%)"), NaN, NaN, NaN, NaN);
  test.hwbEqual(color.hwb("hwb(120 20% 120%)"), NaN, NaN, NaN, NaN);
  test.hwbEqual(color.hwb("hwb(120 20% -20%)"), NaN, NaN, NaN, NaN);
  test.end();
});

tape("hwb(format) ignores the hue if the sum of whiteness and blackness is >= 1", function(test) {
  test.hwbEqual(color.hwb("hwb(120 50% 50%)"), NaN, 0.5, 0.5, 1);
  test.hwbEqual(color.hwb("hwb(120 90% 30%)"), NaN, 0.9, 0.3, 1);
  test.hwbEqual(color.hwb("hwb(120 100% 0%/0.7)"), NaN, 1, 0, 0.7);
  test.hwbEqual(color.hwb("hwb(120 0% 100%/0.3)"), NaN, 0, 1, 0.3);
  test.end();
});

tape("hwb(format) ignores all channels if the alpha is <= 0", function(test) {
  test.hwbEqual(color.hwb("hwb(120 20% 10%/0)"), NaN, NaN, NaN, 0);
  test.hwbEqual(color.hwb("hwb(120 20% 10%/-0.1)"), NaN, NaN, NaN, -0.1);
  test.end();
});

tape("hwb(format) does not lose precision when parsing HWB formats", function(test) {
  test.hwbEqual(color.hwb("hwb(325 50% 40%)"), 325, 0.5, 0.4, 1);
  test.end();
});

tape("hwb(format) returns undefined channel values for unknown formats", function(test) {
  test.hwbEqual(color.hwb("invalid"), NaN, NaN, NaN, NaN);
  test.end();
});

tape("hwb(hwb) copies a HWB color", function(test) {
  var c1 = color.hwb("hwb(120 30% 50%/0.4)"),
      c2 = color.hwb(c1);
  test.hwbEqual(c1, 120, 0.3, 0.5, 0.4);
  c1.h = c1.w = c1.b = c1.opacity = 0;
  test.hwbEqual(c1, 0, 0, 0, 0);
  test.hwbEqual(c2, 120, 0.3, 0.5, 0.4);
  test.end();
});

tape("hwb(rgb) converts from RGB", function(test) {
  test.hwbEqual(color.hwb(color.rgb(123, 45, 67, 0.89)), 343.076923, 0.176470, 0.517647, 0.89);
  test.end();
});

tape("hwb(color) returns undefined hue for grays, including black and white", function(test) {
  test.hwbEqual(color.hwb("gray"), NaN, 0.501961, 0.498039, 1);
  test.hwbEqual(color.hwb("#ccc"), NaN, 0.8, 0.2, 1);
  test.hwbEqual(color.hwb(color.rgb("gray")), NaN, 0.501961, 0.498039, 1);
  test.hwbEqual(color.hwb("black"), NaN, 0, 1, 1);
  test.hwbEqual(color.hwb("#000"), NaN, 0, 1, 1);
  test.hwbEqual(color.hwb("white"), NaN, 1, 0, 1);
  test.hwbEqual(color.hwb("#fff"), NaN, 1, 0, 1);
  test.hwbEqual(color.hwb(color.rgb("#fff")), NaN, 1, 0, 1);
  test.end();
});

tape("hwb(color) converts from another colorspace via color.rgb()", function(test) {
  function TestColor() {}
  TestColor.prototype = Object.create(color.color.prototype);
  TestColor.prototype.rgb = function() { return color.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  test.hwbEqual(color.hwb(new TestColor), 210, 0.047058, 0.780392, 0.4);
  test.end();
});

tape("hwb.displayable() returns true if whiteness, blackness and opacity are in [0,1]", function(test) {
  test.equal(color.hwb("white").displayable(), true);
  test.equal(color.hwb("red").displayable(), true);
  test.equal(color.hwb("black").displayable(), true);
  test.equal(color.hwb("invalid").displayable(), false);
  test.equal(color.hwb(NaN, 1, 1).displayable(), true);
  test.equal(color.hwb(NaN, 0.8, 0.4).displayable(), true);
  test.equal(color.hwb(77, NaN, NaN).displayable(), true);
  test.equal(color.hwb(120, -0.5, 0).displayable(), false);
  test.equal(color.hwb(120, 1.5, 0).displayable(), false);
  test.equal(color.hwb(120, 0, -0.5).displayable(), false);
  test.equal(color.hwb(120, 0, 1.5).displayable(), false);
  test.equal(color.hwb(0, 1, 1, 0).displayable(), true);
  test.equal(color.hwb(0, 1, 1, 1).displayable(), true);
  test.equal(color.hwb(0, 1, 1, -0.2).displayable(), false);
  test.equal(color.hwb(0, 1, 1, 1.2).displayable(), false);
  test.end();
});

tape("hwb.brighter(k) returns a brighter color if k > 0", function(test) {
  var c = color.hwb("rgba(165, 42, 42, 0.4)");
  test.hwbEqual(c.brighter(0.5), 0, 0.195141, 0.233376, 0.4);
  test.hwbEqual(c.brighter(1), 0, 0.291986, 0.180222, 0.4);
  test.hwbEqual(c.brighter(2), 0, 0.531117, 0.119352, 0.4);
  test.end();
});

tape("hwb.brighter(k) returns a copy", function(test) {
  var c1 = color.hwb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1);
  test.hwbEqual(c1, 207.272727, 0.274510, 0.294118, 0.4);
  test.hwbEqual(c2, 207.272727, 0.481882, 0.201490, 0.4);
  test.end();
});

tape("hwb.brighter() is equivalent to hwb.brighter(1)", function(test) {
  var c1 = color.hwb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  test.hwbEqual(c2, c3.h, c3.w, c3.b, 0.4);
  test.end();
});

tape("hwb.brighter(k) is equivalent to hwb.darker(-k)", function(test) {
  var c1 = color.hwb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  test.hwbEqual(c2, c3.h, c3.w, c3.b, 0.4);
  test.end();
});

tape("hwb.darker(k) returns a darker color if k > 0", function(test) {
  var c = color.hwb("rgba(165, 42, 42, 0.4)");
  test.hwbEqual(c.darker(0.5), 0, 0.134271, 0.472506, 0.4);
  test.hwbEqual(c.darker(1), 0, 0.103836, 0.592072, 0.4);
  test.hwbEqual(c.darker(2), 0, 0.042967, 0.831202, 0.4);
  test.end();
});

tape("hwb.darker(k) returns a copy", function(test) {
  var c1 = color.hwb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1);
  test.hwbEqual(c1, 207.272727, 0.274510, 0.294118, 0.4);
  test.hwbEqual(c2, 207.272727, 0.190510, 0.510118, 0.4);
  test.end();
});

tape("hwb.darker() is equivalent to hwb.darker(1)", function(test) {
  var c1 = color.hwb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  test.hwbEqual(c2, c3.h, c3.w, c3.b, 0.4);
  test.end();
});

tape("hwb.darker(k) is equivalent to hwb.brighter(-k)", function(test) {
  var c1 = color.hwb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  test.hwbEqual(c2, c3.h, c3.w, c3.b, 0.4);
  test.end();
});

tape("hwb.rgb() converts to RGB", function(test) {
  var c = color.hwb(269, 0.06, 0.78, 0.8);
  test.rgbEqual(c.rgb(), 35, 15, 56, 0.8);
  test.end();
});

tape("hwb.copy(…) returns a new hwb with the specified channel values", function(test) {
  var c = color.hwb(120, 0.3, 0.5, 0.4);
  test.equal(c.copy() instanceof color.hwb, true);
  test.equal(c.copy().formatHwb(), "hwb(120 30% 50%/0.4)");
  test.equal(c.copy({opacity: 1}).formatHwb(), "hwb(120 30% 50%)");
  test.equal(c.copy({h: 20}).formatHwb(), "hwb(20 30% 50%/0.4)");
  test.equal(c.copy({h: 20, w: 0.1}).formatHwb(), "hwb(20 10% 50%/0.4)");
  test.end();
});
