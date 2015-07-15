var tape = require("tape"),
    color = require("../");

require("./labEqual");
require("./rgbEqual");

tape("lab(…) returns an instance of lab and color", function(test) {
  var c = color.lab(120, 40, 50);
  test.ok(c instanceof color.lab);
  test.ok(c instanceof color.color);
  test.end();
});

tape("lab(…) exposes l, a and b channel values", function(test) {
  test.labEqual(color.lab("#abc"), 75.104975, -2.292115, -10.528266);
  test.end();
});

tape("lab.toString() converts to RGB and formats as hexadecimal", function(test) {
  test.equal(color.lab("#abcdef") + "", "#abcdef");
  test.equal(color.lab("moccasin") + "", "#ffe4b5");
  test.equal(color.lab("hsl(60, 100%, 20%)") + "", "#666600");
  test.equal(color.lab("rgb(12, 34, 56)") + "", "#0c2238");
  test.equal(color.lab(color.rgb(12, 34, 56)) + "", "#0c2238");
  test.equal(color.lab(color.hsl(60, 1, .2)) + "", "#666600");
  test.end();
});

tape("lab.toString() reflects l, a and b channel values", function(test) {
  var c = color.lab("#abc");
  c.l += 10, c.a -= 10, c.b += 10;
  test.equal(c + "", "#badcd5");
  test.end();
});

tape("lab.toString() treats undefined channel values as 0", function(test) {
  test.equal(color.lab("invalid") + "", "#000000");
  test.equal(color.lab(NaN, 0, 0) + "", "#000000");
  test.equal(color.lab(50, NaN, 0) + "", "#777777");
  test.equal(color.lab(50, 0, NaN) + "", "#777777");
  test.equal(color.lab(50, NaN, NaN) + "", "#777777");
  test.end();
});

tape("lab(l, a, b) does not clamp l channel value", function(test) {
  test.labEqual(color.lab(-10, 1, 2), -10, 1, 2);
  test.labEqual(color.lab(0, 1, 2), 0, 1, 2);
  test.labEqual(color.lab(100, 1, 2), 100, 1, 2);
  test.labEqual(color.lab(110, 1, 2), 110, 1, 2);
  test.end();
});

tape("lab(l, a, b) coerces channel values to numbers", function(test) {
  test.labEqual(color.lab("50", "4", "-5"), 50, 4, -5);
  test.end();
});

tape("lab(l, a, b) allows undefined channel values", function(test) {
  test.labEqual(color.lab(undefined, NaN, "foo"), NaN, NaN, NaN);
  test.labEqual(color.lab(undefined, 4, -5), NaN, 4, -5);
  test.labEqual(color.lab(42, undefined, -5), 42, NaN, -5);
  test.labEqual(color.lab(42, 4, undefined), 42, 4, NaN);
  test.end();
});

tape("lab(format) parses the specified format and converts to Lab", function(test) {
  test.labEqual(color.lab("#abcdef"), 81.04386565274363, -3.6627002800885267, -20.442705201854984);
  test.labEqual(color.lab("#abc"), 75.10497524893663, -2.292114632248876, -10.528266458853786);
  test.labEqual(color.lab("rgb(12, 34, 56)"), 12.65624852526134, 0.12256520883417721, -16.833209795877284);
  test.labEqual(color.lab("rgb(12%, 34%, 56%)"), 36.040298589825746, 2.5504315155944477, -36.19963333647264);
  test.labEqual(color.lab("hsl(60,100%,20%)"), 41.73251953866431, -10.998411255098816, 48.21006600604577);
  test.labEqual(color.lab("aliceblue"), 97.17864982306108, -1.3486158598345344, -4.262854157273543);
  test.end();
});

tape("lab(format) returns undefined channel values for unknown formats", function(test) {
  test.labEqual(color.lab("invalid"), NaN, NaN, NaN);
  test.end();
});

tape("lab(lab) copies a Lab color", function(test) {
  var c1 = color.lab(50, 4, -5),
      c2 = color.lab(c1);
  test.labEqual(c1, 50, 4, -5);
  c1.l = c1.a = c1.b = 0;
  test.labEqual(c1, 0, 0, 0);
  test.labEqual(c2, 50, 4, -5);
  test.end();
});

tape("lab(hcl(lab)) doesn’t lose a and b channels if luminance is zero", function(test) {
  test.labEqual(color.lab(color.hcl(color.lab(0, 10, 0))), 0, 10, 0);
  test.end();
});

tape("lab(rgb) converts from RGB", function(test) {
  test.labEqual(color.lab(color.rgb(255, 0, 0)), 53.24079414130722, 80.09245959641109, 67.20319651585301);
  test.end();
});

tape("lab(color) converts from another colorspace via color.rgb()", function(test) {
  function TestColor() {}
  TestColor.prototype = Object.create(color.color.prototype);
  TestColor.prototype.rgb = function() { return color.rgb(12, 34, 56); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  test.labEqual(color.lab(new TestColor), 12.65624852526134, 0.12256520883417721, -16.833209795877284);
  test.end();
});

tape("lab.brighter(k) returns a brighter color if k > 0", function(test) {
  var c = color.lab("brown");
  test.labEqual(c.brighter(.5), 46.52650524281069, 49.69034644081097, 30.543166542619616);
  test.labEqual(c.brighter(1), 55.52650524281069, 49.69034644081097, 30.543166542619616);
  test.labEqual(c.brighter(2), 73.52650524281069, 49.69034644081097, 30.543166542619616);
  test.end();
});

tape("lab.brighter(k) returns a copy", function(test) {
  var c1 = color.lab("steelblue"),
      c2 = c1.brighter(1);
  test.labEqual(c1, 52.46551718768575, -4.0774710123572255, -32.19186122981343);
  test.labEqual(c2, 70.46551718768575, -4.0774710123572255, -32.19186122981343);
  test.end();
});

tape("lab.brighter() is equivalent to lab.brighter(1)", function(test) {
  var c1 = color.lab("steelblue"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  test.labEqual(c2, c3.l, c3.a, c3.b);
  test.end();
});

tape("lab.brighter(k) is equivalent to lab.darker(-k)", function(test) {
  var c1 = color.lab("steelblue"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  test.labEqual(c2, c3.l, c3.a, c3.b);
  test.end();
});

tape("lab.darker(k) returns a darker color if k > 0", function(test) {
  var c = color.lab("brown");
  test.labEqual(c.darker(.5), 28.526505242810693, 49.69034644081097, 30.543166542619616);
  test.labEqual(c.darker(1), 19.526505242810693, 49.69034644081097, 30.543166542619616);
  test.labEqual(c.darker(2), 1.5265052428106927, 49.69034644081097, 30.543166542619616);
  test.end();
});

tape("lab.darker(k) returns a copy", function(test) {
  var c1 = color.lab("steelblue"),
      c2 = c1.darker(1);
  test.labEqual(c1, 52.46551718768575, -4.0774710123572255, -32.19186122981343);
  test.labEqual(c2, 34.46551718768575, -4.0774710123572255, -32.19186122981343);
  test.end();
});

tape("lab.darker() is equivalent to lab.darker(1)", function(test) {
  var c1 = color.lab("steelblue"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  test.labEqual(c2, c3.l, c3.a, c3.b);
  test.end();
});

tape("lab.darker(k) is equivalent to lab.brighter(-k)", function(test) {
  var c1 = color.lab("steelblue"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  test.labEqual(c2, c3.l, c3.a, c3.b);
  test.end();
});

tape("lab.rgb() converts to RGB", function(test) {
  var c = color.lab(50, 4, -5);
  test.rgbEqual(c.rgb(), 122, 117, 127);
  test.end();
});
