var tape = require("tape"),
    color = require("../");

function floatEqual(got, want, epsilon=1e-6) {
  return isNaN(want) ? (isNaN(got) && got !== got) : (Math.abs(want - got) <= epsilon);
}

tape.Test.prototype.xyzEqual = function(actual, x, y, z, opacity) {
  this._assert(actual instanceof color.xyz
      && floatEqual(actual.x, x)
      && floatEqual(actual.y, y)
      && floatEqual(actual.z, z)
      && floatEqual(actual.opacity, opacity), {
    message: "should be equal",
    operator: "xyzEqual",
    actual: [actual.x, actual.y, actual.z, actual.opacity],
    expected: [x, y, z, opacity],
  });
};
