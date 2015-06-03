var tape = require("tape"),
    color = require("../");

tape.Test.prototype.hslEqual = function(actual, h, s, l) {
  this._assert(actual instanceof color.hsl
      && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
      && (isNaN(s) ? isNaN(actual.s) && actual.s !== actual.s : s - 1e-6 <= actual.s && actual.s <= s + 1e-6)
      && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l + 1e-6), {
    message: "should be equal",
    operator: "hslEqual",
    actual: [actual.h, actual.s, actual.l],
    expected: [h, s, l]
  });
};
