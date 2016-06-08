var tape = require("tape"),
    color = require("../");

tape.Test.prototype.hsvEqual = function(actual, h, s, v, opacity) {
  this._assert(actual instanceof color.hsv
      && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
      && (isNaN(s) ? isNaN(actual.s) && actual.s !== actual.s : s - 1e-6 <= actual.s && actual.s <= s + 1e-6)
      && (isNaN(v) ? isNaN(actual.v) && actual.v !== actual.v : v - 1e-6 <= actual.v && actual.v <= v + 1e-6)
      && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
    message: "should be equal",
    operator: "hsvEqual",
    actual: [actual.h, actual.s, actual.v, actual.opacity],
    expected: [h, s, v, opacity]
  });
};
