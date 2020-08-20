var tape = require("tape"),
    color = require("../");

tape.Test.prototype.hwbEqual = function(actual, h, w, b, opacity) {
  this._assert(actual instanceof color.hwb
      && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
      && (isNaN(w) ? isNaN(actual.w) && actual.w !== actual.w : w - 1e-6 <= actual.w && actual.w <= w + 1e-6)
      && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : b - 1e-6 <= actual.b && actual.b <= b + 1e-6)
      && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
    message: "should be equal",
    operator: "hwbEqual",
    actual: [actual.h, actual.w, actual.b, actual.opacity],
    expected: [h, w, b, opacity]
  });
};
