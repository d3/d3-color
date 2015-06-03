var tape = require("tape"),
    color = require("../");

tape.Test.prototype.rgbEqual = function(actual, r, g, b) {
  this._assert(actual instanceof color.rgb
      && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : actual.r === r)
      && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : actual.g === g)
      && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : actual.b === b), {
    message: "should be equal",
    operator: "rgbEqual",
    actual: [actual.r, actual.g, actual.b],
    expected: [r, g, b]
  });
};
