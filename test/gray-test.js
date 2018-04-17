var tape = require("tape"),
    color = require("../");

require("./labEqual");

tape("gray(l[, opacity]) is an alias for lab(l, 0, 0[, opacity])", function(test) {
  test.labEqual(color.gray(120), 120, 0, 0, 1);
  test.labEqual(color.gray(120, 0.5), 120, 0, 0, 0.5);
  test.labEqual(color.gray(120, null), 120, 0, 0, 1);
  test.labEqual(color.gray(120, undefined), 120, 0, 0, 1);
  test.end();
});
