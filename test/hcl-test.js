import assert from "assert";
import * as d3 from "../src/index.js";

import _rgb from "./rgbEqual.js";
const {rgbEqual} = _rgb(assert);
import _hcl from "./hclEqual.js";
const {hclEqual} = _hcl(assert);

it("hcl(…) returns an instance of hcl and color", () => {
  var c = d3.hcl(120, 40, 50);
  assert(c instanceof d3.hcl);
  assert(c instanceof d3.color);
});

it("hcl(…) exposes h, c, and l channel values", () => {
  hclEqual(d3.hcl("#abc"), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
});

it("hcl(…) returns defined hue and undefined chroma for black and white", () => {
  hclEqual(d3.hcl("black"), NaN, NaN, 0, 1);
  hclEqual(d3.hcl("#000"), NaN, NaN, 0, 1);
  hclEqual(d3.hcl(d3.lab("#000")), NaN, NaN, 0, 1);
  hclEqual(d3.hcl("white"), NaN, NaN, 100, 1);
  hclEqual(d3.hcl("#fff"), NaN, NaN, 100, 1);
  hclEqual(d3.hcl(d3.lab("#fff")), NaN, NaN, 100, 1);
});

it("hcl(…) returns undefined hue and zero chroma for gray", () => {
  hclEqual(d3.hcl("gray"), NaN, 0, 53.585013, 1);
  hclEqual(d3.hcl(d3.lab("gray")), NaN, 0, 53.585013, 1);
});

it("hcl.toString() converts to RGB and formats as hexadecimal", () => {
  assert.equal(d3.hcl("#abcdef") + "", "rgb(171, 205, 239)");
  assert.equal(d3.hcl("moccasin") + "", "rgb(255, 228, 181)");
  assert.equal(d3.hcl("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  assert.equal(d3.hcl("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  assert.equal(d3.hcl(d3.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  assert.equal(d3.hcl(d3.hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
});

it("hcl.toString() reflects h, c and l channel values", () => {
  var c = d3.hcl("#abc");
  c.h += 10, c.c += 1, c.l -= 1;
  assert.equal(c + "", "rgb(170, 183, 204)");
});

it("hcl.toString() treats undefined opacity as 1", () => {
  var c = d3.hcl("#abc");
  c.opacity = NaN;
  assert.equal(c + "", "rgb(170, 187, 204)");
});

it("hcl.toString() treats undefined channel values as 0", () => {
  assert.equal(d3.hcl("invalid") + "", "rgb(0, 0, 0)");
  assert.equal(d3.hcl("#000") + "", "rgb(0, 0, 0)");
  assert.equal(d3.hcl("#ccc") + "", "rgb(204, 204, 204)");
  assert.equal(d3.hcl("#fff") + "", "rgb(255, 255, 255)");
  assert.equal(d3.hcl(NaN, 20, 40) + "", "rgb(94, 94, 94)"); // equivalent to hcl(*, *, 40)
  assert.equal(d3.hcl(120, NaN, 40) + "", "rgb(94, 94, 94)");
  assert.equal(d3.hcl(0, NaN, 40) + "", "rgb(94, 94, 94)");
  assert.equal(d3.hcl(120, 50, NaN) + "", "rgb(0, 0, 0)"); // equivalent to hcl(*, *, 0)
  assert.equal(d3.hcl(0, 50, NaN) + "", "rgb(0, 0, 0)");
  assert.equal(d3.hcl(120, 0, NaN) + "", "rgb(0, 0, 0)");
});

it("hcl(yellow) is displayable", () => {
  assert.equal(d3.hcl("yellow").displayable(), true);
  assert.equal(d3.hcl("yellow") + "", "rgb(255, 255, 0)");
});

it("hcl(h, c, l) does not wrap hue to [0,360)", () => {
  hclEqual(d3.hcl(-10, 40, 50), -10, 40, 50, 1);
  hclEqual(d3.hcl(0, 40, 50), 0, 40, 50, 1);
  hclEqual(d3.hcl(360, 40, 50), 360, 40, 50, 1);
  hclEqual(d3.hcl(370, 40, 50), 370, 40, 50, 1);
});

it("hcl(h, c, l) does not clamp l channel value", () => {
  hclEqual(d3.hcl(120, 20, -10), 120, 20, -10, 1);
  hclEqual(d3.hcl(120, 20, 0), 120, 20, 0, 1);
  hclEqual(d3.hcl(120, 20, 100), 120, 20, 100, 1);
  hclEqual(d3.hcl(120, 20, 110), 120, 20, 110, 1);
});

it("hcl(h, c, l, opacity) does not clamp opacity to [0,1]", () => {
  hclEqual(d3.hcl(120, 20, 100, -0.2), 120, 20, 100, -0.2);
  hclEqual(d3.hcl(120, 20, 110, 1.2), 120, 20, 110, 1.2);
});

it("hcl(h, c, l) coerces channel values to numbers", () => {
  hclEqual(d3.hcl("120", "40", "50"), 120, 40, 50, 1);
});

it("hcl(h, c, l, opacity) coerces opacity to number", () => {
  hclEqual(d3.hcl(120, 40, 50, "0.2"), 120, 40, 50, 0.2);
});

it("hcl(h, c, l) allows undefined channel values", () => {
  hclEqual(d3.hcl(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  hclEqual(d3.hcl(undefined, 40, 50), NaN, 40, 50, 1);
  hclEqual(d3.hcl(42, undefined, 50), 42, NaN, 50, 1);
  hclEqual(d3.hcl(42, 40, undefined), 42, 40, NaN, 1);
});

it("hcl(h, c, l, opacity) converts undefined opacity to 1", () => {
  hclEqual(d3.hcl(10, 20, 30, null), 10, 20, 30, 1);
  hclEqual(d3.hcl(10, 20, 30, undefined), 10, 20, 30, 1);
});

it("hcl(format) parses the specified format and converts to HCL", () => {
  hclEqual(d3.hcl("#abcdef"), 254.0079700170605, 21.62257586147983, 80.77135418262527, 1);
  hclEqual(d3.hcl("#abc"), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
  hclEqual(d3.hcl("rgb(12, 34, 56)"), 262.8292023352897, 17.30347233219686, 12.404844123471648, 1);
  hclEqual(d3.hcl("rgb(12%, 34%, 56%)"), 266.117653326772, 37.03612078188506, 35.48300043476593, 1);
  hclEqual(d3.hcl("rgba(12%, 34%, 56%, 0.4)"), 266.117653326772, 37.03612078188506, 35.48300043476593, 0.4);
  hclEqual(d3.hcl("hsl(60,100%,20%)"), 99.57458688693686, 48.327323183108916, 41.97125732118659, 1);
  hclEqual(d3.hcl("hsla(60,100%,20%,0.4)"), 99.57458688693686, 48.327323183108916, 41.97125732118659, 0.4);
  hclEqual(d3.hcl("aliceblue"), 247.7353849904697, 4.681732046417135, 97.12294991108756, 1);
});

it("hcl(format) returns undefined channel values for unknown formats", () => {
  hclEqual(d3.hcl("invalid"), NaN, NaN, NaN, NaN);
});

it("hcl(hcl) copies an HCL color", () => {
  var c1 = d3.hcl(120, 30, 50, 0.4),
      c2 = d3.hcl(c1);
  hclEqual(c1, 120, 30, 50, 0.4);
  c1.h = c1.c = c1.l = c1.opacity = 0;
  hclEqual(c1, 0, 0, 0, 0);
  hclEqual(c2, 120, 30, 50, 0.4);
});

it("hcl(lab) returns h = NaN if a and b are zero", () => {
  hclEqual(d3.hcl(d3.lab(0, 0, 0)), NaN, NaN, 0, 1);
  hclEqual(d3.hcl(d3.lab(50, 0, 0)), NaN, 0, 50, 1);
  hclEqual(d3.hcl(d3.lab(100, 0, 0)), NaN, NaN, 100, 1);
  hclEqual(d3.hcl(d3.lab(0, 10, 0)), 0, 10, 0, 1);
  hclEqual(d3.hcl(d3.lab(50, 10, 0)), 0, 10, 50, 1);
  hclEqual(d3.hcl(d3.lab(100, 10, 0)), 0, 10, 100, 1);
  hclEqual(d3.hcl(d3.lab(0, 0, 10)), 90, 10, 0, 1);
  hclEqual(d3.hcl(d3.lab(50, 0, 10)), 90, 10, 50, 1);
  hclEqual(d3.hcl(d3.lab(100, 0, 10)), 90, 10, 100, 1);
});

it("hcl(rgb) converts from RGB", () => {
  hclEqual(d3.hcl(d3.rgb(255, 0, 0, 0.4)), 40.85261277607024, 106.83899941284552, 54.29173376861782, 0.4);
});

it("hcl(color) converts from another colorspace via d3.rgb()", () => {
  function TestColor() {}
  TestColor.prototype = Object.create(d3.color.prototype);
  TestColor.prototype.rgb = function() { return d3.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  hclEqual(d3.hcl(new TestColor), 262.8292023352897, 17.30347233219686, 12.404844123471648, 0.4);
});

it("hcl.brighter(k) returns a brighter color if k > 0", () => {
  var c = d3.hcl("rgba(165, 42, 42, 0.4)");
  hclEqual(c.brighter(0.5), 32.28342524928155, 59.60231039142763, 47.149667346714935, 0.4);
  hclEqual(c.brighter(1), 32.28342524928155, 59.60231039142763, 56.149667346714935, 0.4);
  hclEqual(c.brighter(2), 32.28342524928155, 59.60231039142763, 74.14966734671493, 0.4);
});

it("hcl.brighter(k) returns a copy", () => {
  var c1 = d3.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1);
  hclEqual(c1, 255.71009124439382, 33.88100417355615, 51.98624890550498, 0.4);
  hclEqual(c2, 255.71009124439382, 33.88100417355615, 69.98624890550498, 0.4);
});

it("hcl.brighter() is equivalent to hcl.brighter(1)", () => {
  var c1 = d3.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  hclEqual(c2, c3.h, c3.c, c3.l, 0.4);
});

it("hcl.brighter(k) is equivalent to hcl.darker(-k)", () => {
  var c1 = d3.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  hclEqual(c2, c3.h, c3.c, c3.l, 0.4);
});

it("hcl.darker(k) returns a darker color if k > 0", () => {
  var c = d3.hcl("rgba(165, 42, 42, 0.4)");
  hclEqual(c.darker(0.5), 32.28342524928155, 59.60231039142763, 29.149667346714935, 0.4);
  hclEqual(c.darker(1), 32.28342524928155, 59.60231039142763, 20.149667346714935, 0.4);
  hclEqual(c.darker(2), 32.28342524928155, 59.60231039142763, 2.149667346714935, 0.4);
});

it("hcl.darker(k) returns a copy", () => {
  var c1 = d3.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1);
  hclEqual(c1, 255.71009124439382, 33.88100417355615, 51.98624890550498, 0.4);
  hclEqual(c2, 255.71009124439382, 33.88100417355615, 33.98624890550498, 0.4);
});

it("hcl.darker() is equivalent to hcl.darker(1)", () => {
  var c1 = d3.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  hclEqual(c2, c3.h, c3.c, c3.l, 0.4);
});

it("hcl.darker(k) is equivalent to hcl.brighter(-k)", () => {
  var c1 = d3.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  hclEqual(c2, c3.h, c3.c, c3.l, 0.4);
});

it("hcl.rgb() converts to RGB", () => {
  var c = d3.hcl(120, 30, 50, 0.4);
  rgbEqual(c.rgb(), 105, 126, 73, 0.4);
});
