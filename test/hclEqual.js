var tape = require("tape"),
    color = require("../");

tape.Test.prototype.hclEqual = function(actual, h, c, l) {
  this._assert(actual instanceof color.hcl
      && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
      && (isNaN(c) ? isNaN(actual.c) && actual.c !== actual.c : c - 1e-6 <= actual.c && actual.c <= c + 1e-6)
      && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l + 1e-6), {
    message: "should be equal",
    operator: "hclEqual",
    actual: [actual.h, actual.c, actual.l],
    expected: [h, c, l]
  });
};
