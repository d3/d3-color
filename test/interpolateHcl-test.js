var tape = require("tape"),
    color = require("../");

tape("interpolateHcl(a, b) converts a and b to HCL colors", function(test) {
  test.equal(color.interpolateHcl("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(color.interpolateHcl("steelblue", color.hcl("brown"))(1), color.rgb("brown") + "");
  test.equal(color.interpolateHcl("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("interpolateHcl(a, b) interpolates in HCL and returns an RGB hexadecimal string", function(test) {
  test.equal(color.interpolateHcl("steelblue", "#f00")(.2), "#6978c9");
  test.end();
});

tape("interpolateHcl(a, b) uses the shortest path when interpolating hue", function(test) {
  var i = color.interpolateHcl("hsl(10,50%,50%)", "hsl(350,50%,50%)");
  test.equal(i(0), "#bf5540");
  test.equal(i(.2), "#c05144");
  test.equal(i(.4), "#c04c48");
  test.equal(i(.6), "#c0484c");
  test.equal(i(.8), "#c04450");
  test.equal(i(1), "#bf4055");
  test.end();
});

tape("interpolateHcl(a, b) uses a’s hue when b’s hue is undefined", function(test) {
  test.equal(color.interpolateHcl("#f60", color.hcl(NaN, NaN, 0))(.5), "#9b0000");
  test.equal(color.interpolateHcl("#6f0", color.hcl(NaN, NaN, 0))(.5), "#008100");
  test.end();
});

tape("interpolateHcl(a, b) uses b’s hue when a’s hue is undefined", function(test) {
  test.equal(color.interpolateHcl(color.hcl(NaN, NaN, 0), "#f60")(.5), "#9b0000");
  test.equal(color.interpolateHcl(color.hcl(NaN, NaN, 0), "#6f0")(.5), "#008100");
  test.end();
});

tape("interpolateHcl(a, b) uses a’s chroma when b’s chroma is undefined", function(test) {
  test.equal(color.interpolateHcl("#ccc", color.hcl(NaN, NaN, 0))(.5), "#616161");
  test.equal(color.interpolateHcl("#f00", color.hcl(NaN, NaN, 0))(.5), "#a60000");
  test.end();
});

tape("interpolateHcl(a, b) uses b’s chroma when a’s chroma is undefined", function(test) {
  test.equal(color.interpolateHcl(color.hcl(NaN, NaN, 0), "#ccc")(.5), "#616161");
  test.equal(color.interpolateHcl(color.hcl(NaN, NaN, 0), "#f00")(.5), "#a60000");
  test.end();
});
