import assert from "assert";
import * as d3 from "../src/index.js";

export function assertRgbEqual(actual, r, g, b, opacity) {
  assert(actual instanceof d3.rgb
    && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : actual.r === r)
    && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : actual.g === g)
    && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : actual.b === b)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity),
    {
      message: "should be equal",
      operator: "rgbStrictEqual",
      actual: [actual.r, actual.g, actual.b, actual.opacity],
      expected: [r, g, b, opacity]
    }
  );
}

export function assertRgbApproxEqual(actual, r, g, b, opacity) {
  assert(actual instanceof d3.rgb
    && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : Math.round(actual.r) === Math.round(r))
    && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : Math.round(actual.g) === Math.round(g))
    && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : Math.round(actual.b) === Math.round(b))
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
      message: "should be equal",
      operator: "rgbEqual",
      actual: [Math.round(actual.r), Math.round(actual.g), Math.round(actual.b), actual.opacity],
      expected: [Math.round(r), Math.round(g), Math.round(b), opacity]
    }
  );
}
export function assertHclEqual(actual, h, c, l, opacity) {
  assert(actual instanceof d3.hcl
    && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
    && (isNaN(c) ? isNaN(actual.c) && actual.c !== actual.c : c - 1e-6 <= actual.c && actual.c <= c + 1e-6)
    && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l + 1e-6)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
      message: "should be equal",
      operator: "hclEqual",
      actual: [actual.h, actual.c, actual.l, actual.opacity],
      expected: [h, c, l, opacity]
    }
  );
}

export function assertHslEqual(actual, h, s, l, opacity) {
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

export function assertLabEqual(actual, l, a, b, opacity) {
  assert(actual instanceof d3.lab
    && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l + 1e-6)
    && (isNaN(a) ? isNaN(actual.a) && actual.a !== actual.a : a - 1e-6 <= actual.a && actual.a <= a + 1e-6)
    && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : b - 1e-6 <= actual.b && actual.b <= b + 1e-6)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
      message: "should be equal",
      operator: "labEqual",
      actual: [actual.l, actual.a, actual.b, actual.opacity],
      expected: [l, a, b, opacity]
    }
  );
}
