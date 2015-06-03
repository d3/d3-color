var tape = require("tape"),
    color = require("../");

tape("interpolateLab(a, b) converts a and b to Lab colors", function(test) {
  test.equal(color.interpolateLab("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(color.interpolateLab("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  test.equal(color.interpolateLab("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("interpolateLab(a, b) interpolates in Lab and returns a hexadecimal string", function(test) {
  test.equal(color.interpolateLab("steelblue", "#f00")(.2), "#8a7793");
  test.end();
});
