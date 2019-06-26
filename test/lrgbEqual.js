var tape = require("tape"),
    color = require("../");

tape.Test.prototype.lrgbEqual = function(actual, r, g, b, opacity) {
  this._assert(actual instanceof color.lrgb
      && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : r - 1e-6 <= actual.r && actual.r <= r + 1e-6)
      && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : g - 1e-6 <= actual.g && actual.g <= g + 1e-6)
      && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : b - 1e-6 <= actual.b && actual.b <= b + 1e-6)
      && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
    message: "should be equal",
    operator: "lrgbEqual",
    actual: [actual.r, actual.g, actual.b, actual.opacity],
    expected: [r, g, b, opacity]
  });
};
