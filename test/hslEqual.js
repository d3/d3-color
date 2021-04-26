import * as d3 from "../src/index.js";

export default function(assert) {
  return {
    hslEqual: function(actual, h, s, l, opacity) {
      assert(actual instanceof d3.hsl
        && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h +   1e-6)
        && (isNaN(s) ? isNaN(actual.s) && actual.s !== actual.s : s - 1e-6 <= actual.s && actual.s <= s +   1e-6)
        && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l +   1e-6)
        && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
          message: "should be equal",
          operator: "hslEqual",
          actual: [actual.h, actual.s, actual.l, actual.opacity],
          expected: [h, s, l, opacity]
        }
      );
    }
  };
}
