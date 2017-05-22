var tape = require("tape"),
    color = require("../");

tape.Test.prototype.hcgEqual = function(actual, h, c, g, opacity) {
  this._assert(actual instanceof color.hcg
      && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
      && (isNaN(c) ? isNaN(actual.c) && actual.c !== actual.c : c - 1e-6 <= actual.c && actual.c <= c + 1e-6)
      && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : g - 1e-6 <= actual.g && actual.g <= g + 1e-6)
      && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
    message: "should be equal",
    operator: "hcgEqual",
    actual: [actual.h, actual.c, actual.g, actual.opacity],
    expected: [h, c, g, opacity]
  });
};
