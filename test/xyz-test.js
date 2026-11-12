var tape = require("tape"),
    color = require("../");

require("./xyzEqual");

tape("xyz(…) returns an instance of xyz and color", function(test) {
  var c = color.xyz(0.45226, 0.222505, 0.0168832);
  test.ok(c instanceof color.xyz);
  test.ok(c instanceof color.color);
  test.end();
});

tape("xyz(…) exposes x, y and z channel values and opacity", function(test) {
  test.xyzEqual(color.xyz('rgba(170, 187, 204, 0.4)'), 0.4698509167733117, 0.48228463612237665, 0.5878409472299186, 0.4);
  test.end();
});

tape("xyz.toString() converts to RGB formats as rgb(…) and rgba(…)", function(test) {
  test.equal(color.xyz("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(color.xyz("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(color.xyz("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  test.equal(color.xyz("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  test.equal(color.xyz("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(color.xyz(color.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  test.equal(color.xyz(color.hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  test.equal(color.xyz(color.hsl(60, 1, 0.2, 0.4)) + "", "rgba(102, 102, 0, 0.4)");
  test.end();
});

tape("xyz.toString() reflects x, y and z channel values and opacity", function(test) {
  var c = color.xyz("#abc");
  c.x += 0.1, c.y += 0.2, c.z -= 0.3, c.opacity = 0.4;
  test.equal(c + "", "rgba(188, 228, 128, 0.4)");
  test.end();
});

tape("xyz.toString() treats undefined channel values as 0", function(test) {
  test.equal(color.xyz("invalid") + "", "rgb(0, 0, 0)");
  test.equal(color.xyz(NaN, 0, 0) + "", "rgb(0, 0, 0)");
  test.equal(color.xyz(0, NaN, 0) + "", "rgb(0, 0, 0)");
  test.equal(color.xyz(50, 0, NaN) + "", "rgb(0, 0, 0)");
  test.equal(color.xyz(0, NaN, NaN) + "", "rgb(0, 0, 0)");
  test.end();
});

tape("xyz.toString() treats undefined opacity as 1", function(test) {
  var c = color.xyz("#abc");
  c.opacity = NaN;
  test.equal(c + "", "rgb(170, 187, 204)");
  test.end();
});

tape("xyz(x, y, z) coerces channel values and opacity to numbers", function(test) {
  test.xyzEqual(color.xyz("50", "4", "-5", "0.4"), 50, 4, -5, 0.4);
  test.end();
});

tape("xyz(x, y, z) allows undefined channel values", function(test) {
  test.xyzEqual(color.xyz(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  test.xyzEqual(color.xyz(undefined, 4, -5), NaN, 4, -5, 1);
  test.xyzEqual(color.xyz(42, undefined, -5), 42, NaN, -5, 1);
  test.xyzEqual(color.xyz(42, 4, undefined), 42, 4, NaN, 1);
  test.end();
});

tape("xyz(x, y, z, opacity) converts undefined opacity to 1", function(test) {
  test.xyzEqual(color.xyz(10, 20, 30, null), 10, 20, 30, 1);
  test.xyzEqual(color.xyz(10, 20, 30, undefined), 10, 20, 30, 1);
  test.end();
});

tape("xyz(format) parses the specified format and converts to Lab", function(test) {
  test.xyzEqual(color.xyz("#abcdef"), 0.5560644339678268, 0.580585904328259, 0.8257285476267742, 1);
  test.xyzEqual(color.xyz("#abc"), 0.4698509167733117, 0.48228463612237665, 0.5878409472299186, 1);
  test.xyzEqual(color.xyz("rgb(12, 34, 56)"), 0.013919161701096703, 0.014682610006085534, 0.03616945899178624, 1);
  test.xyzEqual(color.xyz("rgb(12%, 34%, 56%)"), 0.08449107282885772, 0.08742136462174761, 0.24835363519957995, 1);
  test.xyzEqual(color.xyz("rgba(12%, 34%, 56%, 0.4)"), 0.08449107282885772, 0.08742136462174761, 0.24835363519957995, 0.4);
  test.xyzEqual(color.xyz("hsl(60,100%,20%)"), 0.11315201967743199, 0.12481425579302234, 0.017878188533676058, 1);
  test.xyzEqual(color.xyz("hsla(60,100%,20%,0.4)"), 0.11315201967743199, 0.12481425579302234, 0.017878188533676058, 0.4);
  test.xyzEqual(color.xyz("aliceblue"), 0.9173388658755715, 0.9274237160306397, 0.9906132612270094, 1);
  test.end();
});

tape("xyz(format) returns undefined channel values for unknown formats", function(test) {
  test.xyzEqual(color.xyz("invalid"), NaN, NaN, NaN, NaN);
  test.end();
});

tape("xyz(xyz) copies a Xyz color", function(test) {
  var c1 = color.xyz(0.5, 1.2, -0.25, 0.4),
      c2 = color.xyz(c1);
  test.xyzEqual(c1, 0.5, 1.2, -0.25, 0.4);
  c1.x = c1.y = c1.z = c1.opacity = 0;
  test.xyzEqual(c1, 0, 0, 0, 0);
  test.xyzEqual(c2, 0.5, 1.2, -0.25, 0.4);
  test.end();
});

tape("xyz(rgb) converts from RGB", function(test) {
  test.xyzEqual(color.xyz(color.rgb(255, 0, 0, 0.4)), 0.4522564352533654, 0.2225045, 0.016883217605215644, 0.4);
  test.end();
});

tape("xyz(color) converts from another colorspace via color.rgb()", function(test) {
  function TestColor() {}
  TestColor.prototype = Object.create(color.color.prototype);
  TestColor.prototype.rgb = function() { return color.rgb(12, 34, 56, 0.4); };
  TestColor.prototype.toString = function() { throw new Error("should use rgb, not toString"); };
  test.xyzEqual(color.xyz(new TestColor), 0.013919161701096703, 0.014682610006085534, 0.03616945899178624, 0.4);
  test.end();
});
