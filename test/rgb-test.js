import assert from "assert";
import {assertRgbApproxEqual, assertRgbEqual} from "./asserts.js";
import * as d3 from "../src/index.js";

it("rgb(…) returns an instance of rgb and color", () => {
  const c = d3.rgb(70, 130, 180);
  assert(c instanceof d3.rgb);
  assert(c instanceof d3.color);
});

it("rgb(…) exposes r, g and b channel values and opacity", () => {
  assertRgbApproxEqual(d3.rgb("#abc"), 170, 187, 204, 1);
  assertRgbApproxEqual(d3.rgb("rgba(170, 187, 204, 0.4)"), 170, 187, 204, 0.4);
});

it("rgb.toString() formats as rgb(…) or rgba(…)", () => {
  assert.strictEqual(d3.rgb("#abcdef") + "", "rgb(171, 205, 239)");
  assert.strictEqual(d3.rgb("moccasin") + "", "rgb(255, 228, 181)");
  assert.strictEqual(d3.rgb("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  assert.strictEqual(d3.rgb("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  assert.strictEqual(d3.rgb(d3.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  assert.strictEqual(d3.rgb(d3.hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  assert.strictEqual(d3.rgb("rgba(12, 34, 56, 0.4)") + "", "rgba(12, 34, 56, 0.4)");
  assert.strictEqual(d3.rgb("rgba(12%, 34%, 56%, 0.4)") + "", "rgba(31, 87, 143, 0.4)");
  assert.strictEqual(d3.rgb("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
});

it("rgb.formatRgb() formats as rgb(…) or rgba(…)", () => {
  assert.strictEqual(d3.rgb("#abcdef").formatRgb(), "rgb(171, 205, 239)");
  assert.strictEqual(d3.rgb("hsl(60, 100%, 20%)").formatRgb(), "rgb(102, 102, 0)");
  assert.strictEqual(d3.rgb("rgba(12%, 34%, 56%, 0.4)").formatRgb(), "rgba(31, 87, 143, 0.4)");
  assert.strictEqual(d3.rgb("hsla(60, 100%, 20%, 0.4)").formatRgb(), "rgba(102, 102, 0, 0.4)");
});

it("rgb.formatHsl() formats as hsl(…) or hsla(…)", () => {
  assert.strictEqual(d3.rgb("#abcdef").formatHsl(), "hsl(210, 68%, 80.3921568627451%)");
  assert.strictEqual(d3.rgb("hsl(60, 100%, 20%)").formatHsl(), "hsl(60, 100%, 20%)");
  assert.strictEqual(d3.rgb("rgba(12%, 34%, 56%, 0.4)").formatHsl(), "hsla(210, 64.70588235294117%, 34%, 0.4)");
  assert.strictEqual(d3.rgb("hsla(60, 100%, 20%, 0.4)").formatHsl(), "hsla(60, 100%, 20%, 0.4)");
});

it("rgb.formatHex() formats as #rrggbb", () => {
  assert.strictEqual(d3.rgb("#abcdef").formatHex(), "#abcdef");
  assert.strictEqual(d3.rgb("hsl(60, 100%, 20%)").formatHex(), "#666600");
  assert.strictEqual(d3.rgb("rgba(12%, 34%, 56%, 0.4)").formatHex(), "#1f578f");
  assert.strictEqual(d3.rgb("hsla(60, 100%, 20%, 0.4)").formatHex(), "#666600");
});

it("rgb.hex() is an alias for rgb.formatHex()", () => {
  assert.strictEqual(d3.color.prototype.hex, d3.color.prototype.formatHex);
  assert.strictEqual(d3.rgb.prototype.hex, d3.rgb.prototype.formatHex);
});

it("rgb.toString() reflects r, g and b channel values and opacity", () => {
  const c = d3.rgb("#abc");
  ++c.r, ++c.g, ++c.b, c.opacity = 0.5;
  assert.strictEqual(c + "", "rgba(171, 188, 205, 0.5)");
});

it("rgb.toString() treats undefined channel values as 0", () => {
  assert.strictEqual(d3.rgb("invalid") + "", "rgb(0, 0, 0)");
  assert.strictEqual(d3.rgb(NaN, 12, 34) + "", "rgb(0, 12, 34)");
});

it("rgb.toString() treats undefined opacity as 1", () => {
  const c = d3.rgb("#abc");
  ++c.r, ++c.g, ++c.b, c.opacity = NaN;
  assert.strictEqual(c + "", "rgb(171, 188, 205)");
});

it("rgb.toString() clamps r, g, b and opacity channel values", () => {
  assert.strictEqual(d3.rgb(-1,  2,  3) + "", "rgb(0, 2, 3)");
  assert.strictEqual(d3.rgb( 2, -1,  3) + "", "rgb(2, 0, 3)");
  assert.strictEqual(d3.rgb( 2,  3, -1) + "", "rgb(2, 3, 0)");
  assert.strictEqual(d3.rgb( 2,  3, -1, -0.2) + "", "rgba(2, 3, 0, 0)");
  assert.strictEqual(d3.rgb( 2,  3, -1, 1.2) + "", "rgb(2, 3, 0)");
});

it("rgb.toString() rounds r, g and b channel values", () => {
  assert.strictEqual(d3.rgb(0.5, 2.0, 3.0) + "", "rgb(1, 2, 3)");
  assert.strictEqual(d3.rgb(2.0, 0.5, 3.0) + "", "rgb(2, 1, 3)");
  assert.strictEqual(d3.rgb(2.0, 3.0, 0.5) + "", "rgb(2, 3, 1)");
});

it("rgb(r, g, b) does not round channel values", () => {
  assertRgbEqual(d3.rgb(1.2, 2.6, 42.9), 1.2, 2.6, 42.9, 1);
});

it("rgb(r, g, b) does not clamp channel values", () => {
  assertRgbApproxEqual(d3.rgb(-10, -20, -30), -10, -20, -30, 1);
  assertRgbApproxEqual(d3.rgb(300, 400, 500), 300, 400, 500, 1);
});

it("rgb(r, g, b, opacity) does not clamp opacity", () => {
  assertRgbApproxEqual(d3.rgb(-10, -20, -30, -0.2), -10, -20, -30, -0.2);
  assertRgbApproxEqual(d3.rgb(300, 400, 500, 1.2), 300, 400, 500, 1.2);
});

it("rgb(r, g, b) coerces channel values to numbers", () => {
  assertRgbApproxEqual(d3.rgb("12", "34", "56"), 12, 34, 56, 1);
  assertRgbApproxEqual(d3.rgb(null, null, null), 0, 0, 0, 1);
});

it("rgb(r, g, b, opacity) coerces opacity to number", () => {
  assertRgbEqual(d3.rgb(-10, -20, -30, "-0.2"), -10, -20, -30, -0.2);
  assertRgbEqual(d3.rgb(300, 400, 500, "1.2"), 300, 400, 500, 1.2);
});

it("rgb(r, g, b) allows undefined channel values", () => {
  assertRgbApproxEqual(d3.rgb(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  assertRgbApproxEqual(d3.rgb(undefined, 42, 56), NaN, 42, 56, 1);
  assertRgbApproxEqual(d3.rgb(42, undefined, 56), 42, NaN, 56, 1);
  assertRgbApproxEqual(d3.rgb(42, 56, undefined), 42, 56, NaN, 1);
});

it("rgb(r, g, b, opacity) converts undefined opacity to 1", () => {
  assertRgbApproxEqual(d3.rgb(10, 20, 30, null), 10, 20, 30, 1);
  assertRgbApproxEqual(d3.rgb(10, 20, 30, undefined), 10, 20, 30, 1);
});

it("rgb(format) parses the specified format and converts to RGB", () => {
  assertRgbApproxEqual(d3.rgb("#abcdef"), 171, 205, 239, 1);
  assertRgbApproxEqual(d3.rgb("#abc"), 170, 187, 204, 1);
  assertRgbApproxEqual(d3.rgb("rgb(12, 34, 56)"), 12, 34, 56, 1);
  assertRgbApproxEqual(d3.rgb("rgb(12%, 34%, 56%)"), 31, 87, 143, 1);
  assertRgbApproxEqual(d3.rgb("hsl(60,100%,20%)"), 102, 102, 0, 1);
  assertRgbApproxEqual(d3.rgb("aliceblue"), 240, 248, 255, 1);
  assertRgbApproxEqual(d3.rgb("hsla(60,100%,20%,0.4)"), 102, 102, 0, 0.4);
});

it("rgb(format) ignores all channels if the alpha is <= 0", () => {
  assertRgbApproxEqual(d3.rgb("rgba(12,34,45,0)"), NaN, NaN, NaN, 0);
  assertRgbApproxEqual(d3.rgb("rgba(12,34,45,-0.1)"), NaN, NaN, NaN, -0.1);
});

it("rgb(format) returns undefined channel values for unknown formats", () => {
  assertRgbApproxEqual(d3.rgb("invalid"), NaN, NaN, NaN, NaN);
});

it("rgb(rgb) copies an RGB color", () => {
  const c1 = d3.rgb("rgba(70, 130, 180, 0.4)"),
      c2 = d3.rgb(c1);
  assertRgbApproxEqual(c1, 70, 130, 180, 0.4);
  c1.r = c1.g = c1.b = c1.opacity = 0;
  assertRgbApproxEqual(c1, 0, 0, 0, 0);
  assertRgbApproxEqual(c2, 70, 130, 180, 0.4);
});

it("rgb(hsl) converts from HSL", () => {
  assertRgbApproxEqual(d3.rgb(d3.hsl(0, 1, 0.5)), 255, 0, 0, 1);
  assertRgbApproxEqual(d3.rgb(d3.hsl(0, 1, 0.5, 0.4)), 255, 0, 0, 0.4);
});

it("rgb(color) converts from another colorspace via d3.rgb()", () => {
  function TestColor() {}
  TestColor.prototype = Object.create(d3.color.prototype);
  TestColor.prototype.rgb = function() { return d3.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  assertRgbApproxEqual(d3.rgb(new TestColor), 12, 34, 56, 0.4);
});

it("rgb.displayable() returns true if the color is within the RGB gamut and opacity is in [0,1]", () => {
  assert.strictEqual(d3.rgb("white").displayable(), true);
  assert.strictEqual(d3.rgb("red").displayable(), true);
  assert.strictEqual(d3.rgb("black").displayable(), true);
  assert.strictEqual(d3.rgb("invalid").displayable(), false);
  assert.strictEqual(d3.rgb(-1, 0, 0).displayable(), false);
  assert.strictEqual(d3.rgb(0, -1, 0).displayable(), false);
  assert.strictEqual(d3.rgb(0, 0, -1).displayable(), false);
  assert.strictEqual(d3.rgb(256, 0, 0).displayable(), false);
  assert.strictEqual(d3.rgb(0, 256, 0).displayable(), false);
  assert.strictEqual(d3.rgb(0, 0, 256).displayable(), false);
  assert.strictEqual(d3.rgb(0, 0, 255, 0).displayable(), true);
  assert.strictEqual(d3.rgb(0, 0, 255, 1.2).displayable(), false);
  assert.strictEqual(d3.rgb(0, 0, 255, -0.2).displayable(), false);
});

it("rgb.brighter(k) returns a brighter color if k > 0", () => {
  const c = d3.rgb("rgba(165, 42, 42, 0.4)");
  assertRgbApproxEqual(c.brighter(0.5), 197, 50, 50, 0.4);
  assertRgbApproxEqual(c.brighter(1), 236, 60, 60, 0.4);
  assertRgbApproxEqual(c.brighter(2), 337, 86, 86, 0.4);
});

it("rgb.brighter(k) returns a copy", () => {
  const c1 = d3.rgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1);
  assertRgbApproxEqual(c1, 70, 130, 180, 0.4);
  assertRgbApproxEqual(c2, 100, 186, 257, 0.4);
});

it("rgb.brighter() is equivalent to rgb.brighter(1)", () => {
  const c1 = d3.rgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  assertRgbApproxEqual(c2, c3.r, c3.g, c3.b, 0.4);
});

it("rgb.brighter(k) is equivalent to rgb.darker(-k)", () => {
  const c1 = d3.rgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  assertRgbApproxEqual(c2, c3.r, c3.g, c3.b, 0.4);
});

it("rgb(\"black\").brighter() still returns black", () => {
  const c1 = d3.rgb("black"),
      c2 = c1.brighter(1);
  assertRgbApproxEqual(c1, 0, 0, 0, 1);
  assertRgbApproxEqual(c2, 0, 0, 0, 1);
});

it("rgb.darker(k) returns a darker color if k > 0", () => {
  const c = d3.rgb("rgba(165, 42, 42, 0.4)");
  assertRgbApproxEqual(c.darker(0.5), 138, 35, 35, 0.4);
  assertRgbApproxEqual(c.darker(1), 115, 29, 29, 0.4);
  assertRgbApproxEqual(c.darker(2), 81, 21, 21, 0.4);
});

it("rgb.darker(k) returns a copy", () => {
  const c1 = d3.rgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1);
  assertRgbApproxEqual(c1, 70, 130, 180, 0.4);
  assertRgbApproxEqual(c2, 49, 91, 126, 0.4);
});

it("rgb.darker() is equivalent to rgb.darker(1)", () => {
  const c1 = d3.rgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  assertRgbApproxEqual(c2, c3.r, c3.g, c3.b, 0.4);
});

it("rgb.darker(k) is equivalent to rgb.brighter(-k)", () => {
  const c1 = d3.rgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  assertRgbApproxEqual(c2, c3.r, c3.g, c3.b, 0.4);
});

it("rgb.rgb() returns this", () => {
  const c = d3.rgb(70, 130, 180);
  assert.strictEqual(c.rgb(), c);
});

it("rgb.copy(…) returns a new rgb with the specified channel values", () => {
  const c = d3.rgb(70, 130, 180);
  assert.strictEqual(c.copy() instanceof d3.rgb, true);
  assert.strictEqual(c.copy() + "", "rgb(70, 130, 180)");
  assert.strictEqual(c.copy({opacity: 0.2}) + "", "rgba(70, 130, 180, 0.2)");
  assert.strictEqual(c.copy({r: 20}) + "", "rgb(20, 130, 180)");
  assert.strictEqual(c.copy({r: 20, g: 40}) + "", "rgb(20, 40, 180)");
});
