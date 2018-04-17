var tape = require("tape"),
    color = require("../");

require("./hclEqual");

tape("lch(color) is equivalent to hcl(color)", function(test) {
  test.hclEqual(color.lch("#abc"), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
  test.hclEqual(color.lch(color.rgb("#abc")), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
  test.end();
});

tape("lch(l, c, h[, opacity]) is equivalent to hcl(h, c, l[, opacity])", function(test) {
  test.hclEqual(color.lch(74, 11, 252), 252, 11, 74, 1);
  test.hclEqual(color.lch(74, 11, 252), 252, 11, 74, 1);
  test.hclEqual(color.lch(74, 11, 252, null), 252, 11, 74, 1);
  test.hclEqual(color.lch(74, 11, 252, undefined), 252, 11, 74, 1);
  test.hclEqual(color.lch(74, 11, 252, 0.5), 252, 11, 74, 0.5);
  test.end();
});
