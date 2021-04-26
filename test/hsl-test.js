import assert from "assert";
import * as d3 from "../src/index.js";

import _rgb from "./rgbEqual.js";
const {rgbEqual} = _rgb(assert);
import _hsl from "./hslEqual.js";
const {hslEqual} = _hsl(assert);

it("hsl(…) returns an instance of hsl and color", () => {
  var c = d3.hsl(120, 0.4, 0.5);
  assert(c instanceof d3.hsl);
  assert(c instanceof d3.color);
});

it("hsl(…) exposes h, s, and l channel values and opacity", () => {
  hslEqual(d3.hsl("#abc"), 210, 0.25, 0.7333333, 1);
  hslEqual(d3.hsl("hsla(60, 100%, 20%, 0.4)"), 60, 1, 0.2, 0.4);
});

it("hsl.toString() converts to RGB and formats as rgb(…) or rgba(…)", () => {
  assert.equal(d3.hsl("#abcdef") + "", "rgb(171, 205, 239)");
  assert.equal(d3.hsl("moccasin") + "", "rgb(255, 228, 181)");
  assert.equal(d3.hsl("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  assert.equal(d3.hsl("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  assert.equal(d3.hsl("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  assert.equal(d3.hsl(d3.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  assert.equal(d3.hsl(d3.hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  assert.equal(d3.hsl(d3.hsl(60, 1, 0.2, 0.4)) + "", "rgba(102, 102, 0, 0.4)");
});

it("hsl.formatRgb() formats as rgb(…) or rgba(…)", () => {
  assert.equal(d3.hsl("#abcdef").formatRgb(), "rgb(171, 205, 239)");
  assert.equal(d3.hsl("hsl(60, 100%, 20%)").formatRgb(), "rgb(102, 102, 0)");
  assert.equal(d3.hsl("rgba(12%, 34%, 56%, 0.4)").formatRgb(), "rgba(31, 87, 143, 0.4)");
  assert.equal(d3.hsl("hsla(60, 100%, 20%, 0.4)").formatRgb(), "rgba(102, 102, 0, 0.4)");
});

it("hsl.formatHsl() formats as hsl(…) or hsla(…)", () => {
  assert.equal(d3.hsl("#abcdef").formatHsl(), "hsl(210, 68%, 80.3921568627451%)");
  assert.equal(d3.hsl("hsl(60, 100%, 20%)").formatHsl(), "hsl(60, 100%, 20%)");
  assert.equal(d3.hsl("rgba(12%, 34%, 56%, 0.4)").formatHsl(), "hsla(210, 64.70588235294117%, 34%, 0.4)");
  assert.equal(d3.hsl("hsla(60, 100%, 20%, 0.4)").formatHsl(), "hsla(60, 100%, 20%, 0.4)");
});

it("hsl.formatHex() formats as #rrggbb", () => {
  assert.equal(d3.hsl("#abcdef").formatHex(), "#abcdef");
  assert.equal(d3.hsl("hsl(60, 100%, 20%)").formatHex(), "#666600");
  assert.equal(d3.hsl("rgba(12%, 34%, 56%, 0.4)").formatHex(), "#1f578f");
  assert.equal(d3.hsl("hsla(60, 100%, 20%, 0.4)").formatHex(), "#666600");
});

it("hsl.toString() reflects h, s and l channel values and opacity", () => {
  var c = d3.hsl("#abc");
  c.h += 10, c.s += 0.01, c.l -= 0.01, c.opacity = 0.4;
  assert.equal(c + "", "rgba(166, 178, 203, 0.4)");
});

it("hsl.toString() treats undefined channel values as 0", () => {
  assert.equal(d3.hsl("invalid") + "", "rgb(0, 0, 0)");
  assert.equal(d3.hsl("#000") + "", "rgb(0, 0, 0)");
  assert.equal(d3.hsl("#ccc") + "", "rgb(204, 204, 204)");
  assert.equal(d3.hsl("#fff") + "", "rgb(255, 255, 255)");
  assert.equal(d3.hsl(NaN, 0.5, 0.4) + "", "rgb(102, 102, 102)"); // equivalent to hsl(*, 0, 0.4)
  assert.equal(d3.hsl(120, NaN, 0.4) + "", "rgb(102, 102, 102)");
  assert.equal(d3.hsl(NaN, NaN, 0.4) + "", "rgb(102, 102, 102)");
  assert.equal(d3.hsl(120, 0.5, NaN) + "", "rgb(0, 0, 0)"); // equivalent to hsl(120, 0.5, 0)
});

it("hsl.toString() treats undefined opacity as 1", () => {
  var c = d3.hsl("#abc");
  c.opacity = NaN;
  assert.equal(c + "", "rgb(170, 187, 204)");
});

it("hsl(h, s, l) does not wrap hue to [0,360)", () => {
  hslEqual(d3.hsl(-10, 0.4, 0.5), -10, 0.4, 0.5, 1);
  hslEqual(d3.hsl(0, 0.4, 0.5), 0, 0.4, 0.5, 1);
  hslEqual(d3.hsl(360, 0.4, 0.5), 360, 0.4, 0.5, 1);
  hslEqual(d3.hsl(370, 0.4, 0.5), 370, 0.4, 0.5, 1);
});

it("hsl(h, s, l) does not clamp s and l channel values to [0,1]", () => {
  hslEqual(d3.hsl(120, -0.1, 0.5), 120, -0.1, 0.5, 1);
  hslEqual(d3.hsl(120, 1.1, 0.5), 120, 1.1, 0.5, 1);
  hslEqual(d3.hsl(120, 0.2, -0.1), 120, 0.2, -0.1, 1);
  hslEqual(d3.hsl(120, 0.2, 1.1), 120, 0.2, 1.1, 1);
});

it("hsl(h, s, l, opacity) does not clamp opacity to [0,1]", () => {
  hslEqual(d3.hsl(120, 0.1, 0.5, -0.2), 120, 0.1, 0.5, -0.2);
  hslEqual(d3.hsl(120, 0.9, 0.5, 1.2), 120, 0.9, 0.5, 1.2);
});

it("hsl(h, s, l) coerces channel values to numbers", () => {
  hslEqual(d3.hsl("120", ".4", ".5"), 120, 0.4, 0.5, 1);
});

it("hsl(h, s, l, opacity) coerces opacity to number", () => {
  hslEqual(d3.hsl(120, 0.1, 0.5, "0.2"), 120, 0.1, 0.5, 0.2);
  hslEqual(d3.hsl(120, 0.9, 0.5, "0.9"), 120, 0.9, 0.5, 0.9);
});

it("hsl(h, s, l) allows undefined channel values", () => {
  hslEqual(d3.hsl(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  hslEqual(d3.hsl(undefined, 0.4, 0.5), NaN, 0.4, 0.5, 1);
  hslEqual(d3.hsl(42, undefined, 0.5), 42, NaN, 0.5, 1);
  hslEqual(d3.hsl(42, 0.4, undefined), 42, 0.4, NaN, 1);
});

it("hsl(h, s, l, opacity) converts undefined opacity to 1", () => {
  hslEqual(d3.hsl(10, 0.2, 0.3, null), 10, 0.2, 0.3, 1);
  hslEqual(d3.hsl(10, 0.2, 0.3, undefined), 10, 0.2, 0.3, 1);
});

it("hsl(h, s, l) preserves explicit hue, even for grays", () => {
  hslEqual(d3.hsl(0, 0, 0), 0, 0, 0, 1);
  hslEqual(d3.hsl(42, 0, 0.5), 42, 0, 0.5, 1);
  hslEqual(d3.hsl(118, 0, 1), 118, 0, 1, 1);
});

it("hsl(h, s, l) preserves explicit saturation, even for white or black", () => {
  hslEqual(d3.hsl(0, 0, 0), 0, 0, 0, 1);
  hslEqual(d3.hsl(0, 0.18, 0), 0, 0.18, 0, 1);
  hslEqual(d3.hsl(0, 0.42, 1), 0, 0.42, 1, 1);
  hslEqual(d3.hsl(0, 1, 1), 0, 1, 1, 1);
});

it("hsl(format) parses the specified format and converts to HSL", () => {
  hslEqual(d3.hsl("#abcdef"), 210, 0.68, 0.8039215, 1);
  hslEqual(d3.hsl("#abc"), 210, 0.25, 0.733333333, 1);
  hslEqual(d3.hsl("rgb(12, 34, 56)"), 210, 0.647058, 0.1333333, 1);
  hslEqual(d3.hsl("rgb(12%, 34%, 56%)"), 210, 0.647058, 0.34, 1);
  hslEqual(d3.hsl("hsl(60,100%,20%)"), 60, 1, 0.2, 1);
  hslEqual(d3.hsl("hsla(60,100%,20%,0.4)"), 60, 1, 0.2, 0.4);
  hslEqual(d3.hsl("aliceblue"), 208, 1, 0.9705882, 1);
  hslEqual(d3.hsl("transparent"), NaN, NaN, NaN, 0);
});

it("hsl(format) ignores the hue if the saturation is <= 0", () => {
  hslEqual(d3.hsl("hsl(120,0%,20%)"), NaN, 0, 0.2, 1);
  hslEqual(d3.hsl("hsl(120,-10%,20%)"), NaN, -0.1, 0.2, 1);
});

it("hsl(format) ignores the hue and saturation if the lightness is <= 0 or >= 1", () => {
  hslEqual(d3.hsl("hsl(120,20%,-10%)"), NaN, NaN, -0.1, 1);
  hslEqual(d3.hsl("hsl(120,20%,0%)"), NaN, NaN, 0.0, 1);
  hslEqual(d3.hsl("hsl(120,20%,100%)"), NaN, NaN, 1.0, 1);
  hslEqual(d3.hsl("hsl(120,20%,120%)"), NaN, NaN, 1.2, 1);
});

it("hsl(format) ignores all channels if the alpha is <= 0", () => {
  hslEqual(d3.hsl("hsla(120,20%,10%,0)"), NaN, NaN, NaN, 0);
  hslEqual(d3.hsl("hsla(120,20%,10%,-0.1)"), NaN, NaN, NaN, -0.1);
});

it("hsl(format) does not lose precision when parsing HSL formats", () => {
  hslEqual(d3.hsl("hsl(325,50%,40%)"), 325, 0.5, 0.4, 1);
});

it("hsl(format) returns undefined channel values for unknown formats", () => {
  hslEqual(d3.hsl("invalid"), NaN, NaN, NaN, NaN);
});

it("hsl(hsl) copies an HSL color", () => {
  var c1 = d3.hsl("hsla(120,30%,50%,0.4)"),
      c2 = d3.hsl(c1);
  hslEqual(c1, 120, 0.3, 0.5, 0.4);
  c1.h = c1.s = c1.l = c1.opacity = 0;
  hslEqual(c1, 0, 0, 0, 0);
  hslEqual(c2, 120, 0.3, 0.5, 0.4);
});

it("hsl(rgb) converts from RGB", () => {
  hslEqual(d3.hsl(d3.rgb(255, 0, 0, 0.4)), 0, 1, 0.5, 0.4);
});

it("hsl(color) returns undefined hue and zero saturation for grays (but not white and black)", () => {
  hslEqual(d3.hsl("gray"), NaN, 0, 0.5019608, 1);
  hslEqual(d3.hsl("#ccc"), NaN, 0, 0.8, 1);
  hslEqual(d3.hsl(d3.rgb("gray")), NaN, 0, 0.5019608, 1);
});

it("hsl(color) returns undefined hue and saturation for black and white", () => {
  hslEqual(d3.hsl("black"), NaN, NaN, 0, 1);
  hslEqual(d3.hsl("#000"), NaN, NaN, 0, 1);
  hslEqual(d3.hsl("white"), NaN, NaN, 1, 1);
  hslEqual(d3.hsl("#fff"), NaN, NaN, 1, 1);
  hslEqual(d3.hsl(d3.rgb("#fff")), NaN, NaN, 1, 1);
});

it("hsl(color) converts from another colorspace via d3.rgb()", () => {
  function TestColor() {}
  TestColor.prototype = Object.create(d3.color.prototype);
  TestColor.prototype.rgb = function() { return d3.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  hslEqual(d3.hsl(new TestColor), 210, 0.6470588, 0.1333334, 0.4);
});

it("hsl.displayable() returns true if the color is within the RGB gamut and the opacity is in [0,1]", () => {
  assert.equal(d3.hsl("white").displayable(), true);
  assert.equal(d3.hsl("red").displayable(), true);
  assert.equal(d3.hsl("black").displayable(), true);
  assert.equal(d3.hsl("invalid").displayable(), false);
  assert.equal(d3.hsl(NaN, NaN, 1).displayable(), true);
  assert.equal(d3.hsl(NaN, NaN, 1.5).displayable(), false);
  assert.equal(d3.hsl(120, -0.5, 0).displayable(), false);
  assert.equal(d3.hsl(120, 1.5, 0).displayable(), false);
  assert.equal(d3.hsl(0, 1, 1, 0).displayable(), true);
  assert.equal(d3.hsl(0, 1, 1, 1).displayable(), true);
  assert.equal(d3.hsl(0, 1, 1, -0.2).displayable(), false);
  assert.equal(d3.hsl(0, 1, 1, 1.2).displayable(), false);
});

it("hsl.brighter(k) returns a brighter color if k > 0", () => {
  var c = d3.hsl("rgba(165, 42, 42, 0.4)");
  hslEqual(c.brighter(0.5), 0, 0.5942028, 0.4851222, 0.4);
  hslEqual(c.brighter(1), 0, 0.5942028, 0.5798319, 0.4);
  hslEqual(c.brighter(2), 0, 0.5942028, 0.8283313, 0.4);
});

it("hsl.brighter(k) returns a copy", () => {
  var c1 = d3.hsl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1);
  hslEqual(c1, 207.272727, 0.44, 0.4901961, 0.4);
  hslEqual(c2, 207.272727, 0.44, 0.7002801, 0.4);
});

it("hsl.brighter() is equivalent to hsl.brighter(1)", () => {
  var c1 = d3.hsl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  hslEqual(c2, c3.h, c3.s, c3.l, 0.4);
});

it("hsl.brighter(k) is equivalent to hsl.darker(-k)", () => {
  var c1 = d3.hsl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  hslEqual(c2, c3.h, c3.s, c3.l, 0.4);
});

it("hsl(\"black\").brighter() still returns black", () => {
  var c1 = d3.hsl("black"),
      c2 = c1.brighter(1);
  hslEqual(c1, NaN, NaN, 0, 1);
  hslEqual(c2, NaN, NaN, 0, 1);
});

it("hsl.darker(k) returns a darker color if k > 0", () => {
  var c = d3.hsl("rgba(165, 42, 42, 0.4)");
  hslEqual(c.darker(0.5), 0, 0.5942029, 0.3395855, 0.4);
  hslEqual(c.darker(1), 0, 0.5942029, 0.2841176, 0.4);
  hslEqual(c.darker(2), 0, 0.5942029, 0.1988823, 0.4);
});

it("hsl.darker(k) returns a copy", () => {
  var c1 = d3.hsl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1);
  hslEqual(c1, 207.272727, 0.44, 0.4901961, 0.4);
  hslEqual(c2, 207.272727, 0.44, 0.3431373, 0.4);
});

it("hsl.darker() is equivalent to hsl.darker(1)", () => {
  var c1 = d3.hsl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  hslEqual(c2, c3.h, c3.s, c3.l, 0.4);
});

it("hsl.darker(k) is equivalent to hsl.brighter(-k)", () => {
  var c1 = d3.hsl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  hslEqual(c2, c3.h, c3.s, c3.l, 0.4);
});

it("hsl.rgb() converts to RGB", () => {
  var c = d3.hsl(120, 0.3, 0.5, 0.4);
  rgbEqual(c.rgb(), 89, 166, 89, 0.4);
});

it("hsl.copy(…) returns a new hsl with the specified channel values", () => {
  var c = d3.hsl(120, 0.3, 0.5, 0.4);
  assert.equal(c.copy() instanceof d3.hsl, true);
  assert.equal(c.copy().formatHsl(), "hsla(120, 30%, 50%, 0.4)");
  assert.equal(c.copy({opacity: 1}).formatHsl(), "hsl(120, 30%, 50%)");
  assert.equal(c.copy({h: 20}).formatHsl(), "hsla(20, 30%, 50%, 0.4)");
  assert.equal(c.copy({h: 20, s: 0.4}).formatHsl(), "hsla(20, 40%, 50%, 0.4)");
});
