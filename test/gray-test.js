import {assertLabEqual} from "./asserts.js";
import * as d3 from "../src/index.js";

it("gray(l[, opacity]) is an alias for lab(l, 0, 0[, opacity])", () => {
  assertLabEqual(d3.gray(120), 120, 0, 0, 1);
  assertLabEqual(d3.gray(120, 0.5), 120, 0, 0, 0.5);
  assertLabEqual(d3.gray(120, null), 120, 0, 0, 1);
  assertLabEqual(d3.gray(120, undefined), 120, 0, 0, 1);
});
