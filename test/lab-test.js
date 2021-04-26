import assert from "assert";
import * as d3 from "../src/index.js";

import _rgb from "./rgbEqual.js";
const {rgbEqual} = _rgb(assert);
import _lab from "./labEqual.js";
const {labEqual} = _lab(assert);

it("lab(…) returns an instance of lab and color", () => {
  var c = d3.lab(120, 40, 50);
  assert(c instanceof d3.lab);
  assert(c instanceof d3.color);
});

it("lab(…) exposes l, a and b channel values and opacity", () => {
  labEqual(d3.lab("rgba(170, 187, 204, 0.4)"), 74.96879980931759, -3.398998724348956, -10.696507207853333, 0.4);
});

it("lab.toString() converts to RGB and formats as rgb(…) or rgba(…)", () => {
  assert.equal(d3.lab("#abcdef") + "", "rgb(171, 205, 239)");
  assert.equal(d3.lab("moccasin") + "", "rgb(255, 228, 181)");
  assert.equal(d3.lab("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  assert.equal(d3.lab("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  assert.equal(d3.lab("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  assert.equal(d3.lab(d3.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  assert.equal(d3.lab(d3.hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  assert.equal(d3.lab(d3.hsl(60, 1, 0.2, 0.4)) + "", "rgba(102, 102, 0, 0.4)");
});

it("lab.toString() reflects l, a and b channel values and opacity", () => {
  var c = d3.lab("#abc");
  c.l += 10, c.a -= 10, c.b += 10, c.opacity = 0.4;
  assert.equal(c + "", "rgba(184, 220, 213, 0.4)");
});

it("lab.toString() treats undefined channel values as 0", () => {
  assert.equal(d3.lab("invalid") + "", "rgb(0, 0, 0)");
  assert.equal(d3.lab(NaN, 0, 0) + "", "rgb(0, 0, 0)");
  assert.equal(d3.lab(50, NaN, 0) + "", "rgb(119, 119, 119)");
  assert.equal(d3.lab(50, 0, NaN) + "", "rgb(119, 119, 119)");
  assert.equal(d3.lab(50, NaN, NaN) + "", "rgb(119, 119, 119)");
});

it("lab.toString() treats undefined opacity as 1", () => {
  var c = d3.lab("#abc");
  c.opacity = NaN;
  assert.equal(c + "", "rgb(170, 187, 204)");
});

it("lab(l, a, b) does not clamp l channel value", () => {
  labEqual(d3.lab(-10, 1, 2), -10, 1, 2, 1);
  labEqual(d3.lab(0, 1, 2), 0, 1, 2, 1);
  labEqual(d3.lab(100, 1, 2), 100, 1, 2, 1);
  labEqual(d3.lab(110, 1, 2), 110, 1, 2, 1);
});

it("lab(l, a, b, opacity) does not clamp opacity to [0,1]", () => {
  labEqual(d3.lab(50, 10, 20, -0.2), 50, 10, 20, -0.2);
  labEqual(d3.lab(50, 10, 20, 1.2), 50, 10, 20, 1.2);
});

it("lab(l, a, b) coerces channel values to numbers", () => {
  labEqual(d3.lab("50", "4", "-5"), 50, 4, -5, 1);
});

it("lab(l, a, b, opacity) coerces opacity to number", () => {
  labEqual(d3.lab(50, 4, -5, "0.2"), 50, 4, -5, 0.2);
});

it("lab(l, a, b) allows undefined channel values", () => {
  labEqual(d3.lab(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  labEqual(d3.lab(undefined, 4, -5), NaN, 4, -5, 1);
  labEqual(d3.lab(42, undefined, -5), 42, NaN, -5, 1);
  labEqual(d3.lab(42, 4, undefined), 42, 4, NaN, 1);
});

it("lab(l, a, b, opacity) converts undefined opacity to 1", () => {
  labEqual(d3.lab(10, 20, 30, null), 10, 20, 30, 1);
  labEqual(d3.lab(10, 20, 30, undefined), 10, 20, 30, 1);
});

it("lab(format) parses the specified format and converts to Lab", () => {
  labEqual(d3.lab("#abcdef"), 80.77135418262527, -5.957098328496224, -20.785782794739237, 1);
  labEqual(d3.lab("#abc"), 74.96879980931759, -3.398998724348956, -10.696507207853333, 1);
  labEqual(d3.lab("rgb(12, 34, 56)"), 12.404844123471648, -2.159950219712034, -17.168132391132946, 1);
  labEqual(d3.lab("rgb(12%, 34%, 56%)"), 35.48300043476593, -2.507637675606522, -36.95112983195855, 1);
  labEqual(d3.lab("rgba(12%, 34%, 56%, 0.4)"), 35.48300043476593, -2.507637675606522, -36.95112983195855, 0.4);
  labEqual(d3.lab("hsl(60,100%,20%)"), 41.97125732118659, -8.03835128380484, 47.65411917854332, 1);
  labEqual(d3.lab("hsla(60,100%,20%,0.4)"), 41.97125732118659, -8.03835128380484, 47.65411917854332, 0.4);
  labEqual(d3.lab("aliceblue"), 97.12294991108756, -1.773836604137824, -4.332680308569969, 1);
});

it("lab(format) returns undefined channel values for unknown formats", () => {
  labEqual(d3.lab("invalid"), NaN, NaN, NaN, NaN);
});

it("lab(lab) copies a Lab color", () => {
  var c1 = d3.lab(50, 4, -5, 0.4),
      c2 = d3.lab(c1);
  labEqual(c1, 50, 4, -5, 0.4);
  c1.l = c1.a = c1.b = c1.opacity = 0;
  labEqual(c1, 0, 0, 0, 0);
  labEqual(c2, 50, 4, -5, 0.4);
});

it("lab(hcl(lab)) doesn’t lose a and b channels if luminance is zero", () => {
  labEqual(d3.lab(d3.hcl(d3.lab(0, 10, 0))), 0, 10, 0, 1);
});

it("lab(rgb) converts from RGB", () => {
  labEqual(d3.lab(d3.rgb(255, 0, 0, 0.4)), 54.29173376861782, 80.8124553179771, 69.88504032350531, 0.4);
});

it("lab(color) converts from another colorspace via d3.rgb()", () => {
  function TestColor() {}
  TestColor.prototype = Object.create(d3.color.prototype);
  TestColor.prototype.rgb = function() { return d3.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  labEqual(d3.lab(new TestColor), 12.404844123471648, -2.159950219712034, -17.168132391132946, 0.4);
});

it("lab.brighter(k) returns a brighter color if k > 0", () => {
  var c = d3.lab("rgba(165, 42, 42, 0.4)");
  labEqual(c.brighter(0.5), 47.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
  labEqual(c.brighter(1), 56.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
  labEqual(c.brighter(2), 74.14966734671493, 50.388769337115, 31.834059255569358, 0.4);
});

it("lab.brighter(k) returns a copy", () => {
  var c1 = d3.lab("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1);
  labEqual(c1, 51.98624890550498, -8.362792037014344, -32.832699449697685, 0.4);
  labEqual(c2, 69.98624890550498, -8.362792037014344, -32.832699449697685, 0.4);
});

it("lab.brighter() is equivalent to lab.brighter(1)", () => {
  var c1 = d3.lab("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  labEqual(c2, c3.l, c3.a, c3.b, 0.4);
});

it("lab.brighter(k) is equivalent to lab.darker(-k)", () => {
  var c1 = d3.lab("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  labEqual(c2, c3.l, c3.a, c3.b, 0.4);
});

it("lab.darker(k) returns a darker color if k > 0", () => {
  var c = d3.lab("rgba(165, 42, 42, 0.4)");
  labEqual(c.darker(0.5), 29.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
  labEqual(c.darker(1), 20.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
  labEqual(c.darker(2), 2.149667346714935, 50.388769337115, 31.834059255569358, 0.4);
});

it("lab.darker(k) returns a copy", () => {
  var c1 = d3.lab("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1);
  labEqual(c1, 51.98624890550498, -8.362792037014344, -32.832699449697685, 0.4);
  labEqual(c2, 33.98624890550498, -8.362792037014344, -32.832699449697685, 0.4);
});

it("lab.darker() is equivalent to lab.darker(1)", () => {
  var c1 = d3.lab("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  labEqual(c2, c3.l, c3.a, c3.b, 0.4);
});

it("lab.darker(k) is equivalent to lab.brighter(-k)", () => {
  var c1 = d3.lab("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  labEqual(c2, c3.l, c3.a, c3.b, 0.4);
});

it("lab.rgb() converts to RGB", () => {
  var c = d3.lab(50, 4, -5, 0.4);
  rgbEqual(c.rgb(), 123, 117, 128, 0.4);
});
