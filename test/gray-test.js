import assert from "assert";
import * as d3 from "../src/index.js";

import _lab from "./labEqual.js";
const {labEqual} = _lab(assert);

it("gray(l[, opacity]) is an alias for lab(l, 0, 0[, opacity])", () => {
  labEqual(d3.gray(120), 120, 0, 0, 1);
  labEqual(d3.gray(120, 0.5), 120, 0, 0, 0.5);
  labEqual(d3.gray(120, null), 120, 0, 0, 1);
  labEqual(d3.gray(120, undefined), 120, 0, 0, 1);
});
