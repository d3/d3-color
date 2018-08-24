var tape = require("tape"),
    color = require("../");

require("./hclEqual");
require("./rgbEqual");

tape("hcl(…) returns an instance of hcl and color", function(test) {
  var c = color.hcl(120, 40, 50);
  test.ok(c instanceof color.hcl);
  test.ok(c instanceof color.color);
  test.end();
});

tape("hcl(…) exposes h, c, and l channel values", function(test) {
  test.hclEqual(color.hcl("#abc"), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
  test.end();
});

tape("hcl(…) returns defined hue and chroma, even for black and white", function(test) {
  test.hclEqual(color.hcl("black"), NaN, 0, 0, 1);
  test.hclEqual(color.hcl("#000"), NaN, 0, 0, 1);
  test.hclEqual(color.hcl(color.lab("#000")), NaN, 0, 0, 1);
  test.hclEqual(color.hcl("white"), NaN, 0, 100, 1);
  test.hclEqual(color.hcl("#fff"), NaN, 0, 100, 1);
  test.hclEqual(color.hcl(color.lab("#fff")), NaN, 0, 100, 1);
  test.end();
});

tape("hcl.toString() converts to RGB and formats as hexadecimal", function(test) {
  test.equal(color.hcl("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(color.hcl("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(color.hcl("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  test.equal(color.hcl("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(color.hcl(color.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  test.equal(color.hcl(color.hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  test.end();
});

tape("hcl.toString() reflects h, c and l channel values", function(test) {
  var c = color.hcl("#abc");
  c.h += 10, c.c += 1, c.l -= 1;
  test.equal(c + "", "rgb(170, 183, 204)");
  test.end();
});

tape("hcl.toString() treats undefined opacity as 1", function(test) {
  var c = color.hcl("#abc");
  c.opacity = NaN;
  test.equal(c + "", "rgb(170, 187, 204)");
  test.end();
});

tape("hcl.toString() treats undefined channel values as 0", function(test) {
  test.equal(color.hcl("invalid") + "", "rgb(0, 0, 0)");
  test.equal(color.hcl("#000") + "", "rgb(0, 0, 0)");
  test.equal(color.hcl("#ccc") + "", "rgb(204, 204, 204)");
  test.equal(color.hcl("#fff") + "", "rgb(255, 255, 255)");
  test.equal(color.hcl(NaN, 20, 40) + "", "rgb(94, 94, 94)"); // equivalent to hcl(*, *, 40)
  test.equal(color.hcl(120, NaN, 40) + "", "rgb(94, 94, 94)");
  test.equal(color.hcl(0, NaN, 40) + "", "rgb(94, 94, 94)");
  test.equal(color.hcl(120, 50, NaN) + "", "rgb(0, 0, 0)"); // equivalent to hcl(*, *, 0)
  test.equal(color.hcl(0, 50, NaN) + "", "rgb(0, 0, 0)");
  test.equal(color.hcl(120, 0, NaN) + "", "rgb(0, 0, 0)");
  test.end();
});

tape("hcl(h, c, l) does not wrap hue to [0,360)", function(test) {
  test.hclEqual(color.hcl(-10, 40, 50), -10, 40, 50, 1);
  test.hclEqual(color.hcl(0, 40, 50), 0, 40, 50, 1);
  test.hclEqual(color.hcl(360, 40, 50), 360, 40, 50, 1);
  test.hclEqual(color.hcl(370, 40, 50), 370, 40, 50, 1);
  test.end();
});

tape("hcl(h, c, l) does not clamp l channel value", function(test) {
  test.hclEqual(color.hcl(120, 20, -10), 120, 20, -10, 1);
  test.hclEqual(color.hcl(120, 20, 0), 120, 20, 0, 1);
  test.hclEqual(color.hcl(120, 20, 100), 120, 20, 100, 1);
  test.hclEqual(color.hcl(120, 20, 110), 120, 20, 110, 1);
  test.end();
});

tape("hcl(h, c, l, opacity) does not clamp opacity to [0,1]", function(test) {
  test.hclEqual(color.hcl(120, 20, 100, -0.2), 120, 20, 100, -0.2);
  test.hclEqual(color.hcl(120, 20, 110, 1.2), 120, 20, 110, 1.2);
  test.end();
});

tape("hcl(h, c, l) coerces channel values to numbers", function(test) {
  test.hclEqual(color.hcl("120", "40", "50"), 120, 40, 50, 1);
  test.end();
});

tape("hcl(h, c, l, opacity) coerces opacity to number", function(test) {
  test.hclEqual(color.hcl(120, 40, 50, "0.2"), 120, 40, 50, 0.2);
  test.end();
});

tape("hcl(h, c, l) allows undefined channel values", function(test) {
  test.hclEqual(color.hcl(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  test.hclEqual(color.hcl(undefined, 40, 50), NaN, 40, 50, 1);
  test.hclEqual(color.hcl(42, undefined, 50), 42, NaN, 50, 1);
  test.hclEqual(color.hcl(42, 40, undefined), 42, 40, NaN, 1);
  test.end();
});

tape("hcl(h, c, l, opacity) converts undefined opacity to 1", function(test) {
  test.hclEqual(color.hcl(10, 20, 30, null), 10, 20, 30, 1);
  test.hclEqual(color.hcl(10, 20, 30, undefined), 10, 20, 30, 1);
  test.end();
});

tape("hcl(format) parses the specified format and converts to HCL", function(test) {
  test.hclEqual(color.hcl("#abcdef"), 254.0079700170605, 21.62257586147983, 80.77135418262527, 1);
  test.hclEqual(color.hcl("#abc"), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
  test.hclEqual(color.hcl("rgb(12, 34, 56)"), 262.8292023352897, 17.30347233219686, 12.404844123471648, 1);
  test.hclEqual(color.hcl("rgb(12%, 34%, 56%)"), 266.117653326772, 37.03612078188506, 35.48300043476593, 1);
  test.hclEqual(color.hcl("rgba(12%, 34%, 56%, 0.4)"), 266.117653326772, 37.03612078188506, 35.48300043476593, 0.4);
  test.hclEqual(color.hcl("hsl(60,100%,20%)"), 99.57458688693686, 48.327323183108916, 41.97125732118659, 1);
  test.hclEqual(color.hcl("hsla(60,100%,20%,0.4)"), 99.57458688693686, 48.327323183108916, 41.97125732118659, 0.4);
  test.hclEqual(color.hcl("aliceblue"), 247.7353849904697, 4.681732046417135, 97.12294991108756, 1);
  test.end();
});

tape("hcl(format) returns undefined channel values for unknown formats", function(test) {
  test.hclEqual(color.hcl("invalid"), NaN, NaN, NaN, NaN);
  test.end();
});

tape("hcl(hcl) copies an HCL color", function(test) {
  var c1 = color.hcl(120, 30, 50, 0.4),
      c2 = color.hcl(c1);
  test.hclEqual(c1, 120, 30, 50, 0.4);
  c1.h = c1.c = c1.l = c1.opacity = 0;
  test.hclEqual(c1, 0, 0, 0, 0);
  test.hclEqual(c2, 120, 30, 50, 0.4);
  test.end();
});

tape("hcl(lab) returns h = NaN if a and b are zero", function(test) {
  test.hclEqual(color.hcl(color.lab(0, 0, 0)), NaN, 0, 0, 1);
  test.hclEqual(color.hcl(color.lab(50, 0, 0)), NaN, 0, 50, 1);
  test.hclEqual(color.hcl(color.lab(100, 0, 0)), NaN, 0, 100, 1);
  test.hclEqual(color.hcl(color.lab(0, 10, 0)), 0, 10, 0, 1);
  test.hclEqual(color.hcl(color.lab(50, 10, 0)), 0, 10, 50, 1);
  test.hclEqual(color.hcl(color.lab(100, 10, 0)), 0, 10, 100, 1);
  test.hclEqual(color.hcl(color.lab(0, 0, 10)), 90, 10, 0, 1);
  test.hclEqual(color.hcl(color.lab(50, 0, 10)), 90, 10, 50, 1);
  test.hclEqual(color.hcl(color.lab(100, 0, 10)), 90, 10, 100, 1);
  test.end();
});

tape("hcl(rgb) converts from RGB", function(test) {
  test.hclEqual(color.hcl(color.rgb(255, 0, 0, 0.4)), 40.85261277607024, 106.83899941284552, 54.29173376861782, 0.4);
  test.end();
});

tape("hcl(color) converts from another colorspace via color.rgb()", function(test) {
  function TestColor() {}
  TestColor.prototype = Object.create(color.color.prototype);
  TestColor.prototype.rgb = function() { return color.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  test.hclEqual(color.hcl(new TestColor), 262.8292023352897, 17.30347233219686, 12.404844123471648, 0.4);
  test.end();
});

tape("hcl.brighter(k) returns a brighter color if k > 0", function(test) {
  var c = color.hcl("rgba(165, 42, 42, 0.4)");
  test.hclEqual(c.brighter(0.5), 32.28342524928155, 59.60231039142763, 47.149667346714935, 0.4);
  test.hclEqual(c.brighter(1), 32.28342524928155, 59.60231039142763, 56.149667346714935, 0.4);
  test.hclEqual(c.brighter(2), 32.28342524928155, 59.60231039142763, 74.14966734671493, 0.4);
  test.end();
});

tape("hcl.brighter(k) returns a copy", function(test) {
  var c1 = color.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1);
  test.hclEqual(c1, 255.71009124439382, 33.88100417355615, 51.98624890550498, 0.4);
  test.hclEqual(c2, 255.71009124439382, 33.88100417355615, 69.98624890550498, 0.4);
  test.end();
});

tape("hcl.brighter() is equivalent to hcl.brighter(1)", function(test) {
  var c1 = color.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  test.hclEqual(c2, c3.h, c3.c, c3.l, 0.4);
  test.end();
});

tape("hcl.brighter(k) is equivalent to hcl.darker(-k)", function(test) {
  var c1 = color.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  test.hclEqual(c2, c3.h, c3.c, c3.l, 0.4);
  test.end();
});

tape("hcl.darker(k) returns a darker color if k > 0", function(test) {
  var c = color.hcl("rgba(165, 42, 42, 0.4)");
  test.hclEqual(c.darker(0.5), 32.28342524928155, 59.60231039142763, 29.149667346714935, 0.4);
  test.hclEqual(c.darker(1), 32.28342524928155, 59.60231039142763, 20.149667346714935, 0.4);
  test.hclEqual(c.darker(2), 32.28342524928155, 59.60231039142763, 2.149667346714935, 0.4);
  test.end();
});

tape("hcl.darker(k) returns a copy", function(test) {
  var c1 = color.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1);
  test.hclEqual(c1, 255.71009124439382, 33.88100417355615, 51.98624890550498, 0.4);
  test.hclEqual(c2, 255.71009124439382, 33.88100417355615, 33.98624890550498, 0.4);
  test.end();
});

tape("hcl.darker() is equivalent to hcl.darker(1)", function(test) {
  var c1 = color.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  test.hclEqual(c2, c3.h, c3.c, c3.l, 0.4);
  test.end();
});

tape("hcl.darker(k) is equivalent to hcl.brighter(-k)", function(test) {
  var c1 = color.hcl("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  test.hclEqual(c2, c3.h, c3.c, c3.l, 0.4);
  test.end();
});

tape("hcl.rgb() converts to RGB", function(test) {
  var c = color.hcl(120, 30, 50, 0.4);
  test.rgbEqual(c.rgb(), 105, 126, 73, 0.4);
  test.end();
});
