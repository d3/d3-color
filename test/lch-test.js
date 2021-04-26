
import {assertHclEqual} from "./asserts.js";
import * as d3 from "../src/index.js";

it("lch(color) is equivalent to hcl(color)", () => {
  assertHclEqual(d3.lch("#abc"), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
  assertHclEqual(d3.lch(d3.rgb("#abc")), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
});

it("lch(l, c, h[, opacity]) is equivalent to hcl(h, c, l[, opacity])", () => {
  assertHclEqual(d3.lch(74, 11, 252), 252, 11, 74, 1);
  assertHclEqual(d3.lch(74, 11, 252), 252, 11, 74, 1);
  assertHclEqual(d3.lch(74, 11, 252, null), 252, 11, 74, 1);
  assertHclEqual(d3.lch(74, 11, 252, undefined), 252, 11, 74, 1);
  assertHclEqual(d3.lch(74, 11, 252, 0.5), 252, 11, 74, 0.5);
});
