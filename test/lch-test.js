import assert from "assert";
import * as d3 from "../src/index.js";

import _hcl from "./hclEqual.js";
const {hclEqual} = _hcl(assert);

it("lch(color) is equivalent to hcl(color)", () => {
  hclEqual(d3.lch("#abc"), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
  hclEqual(d3.lch(d3.rgb("#abc")), 252.37145234745182, 11.223567114593477, 74.96879980931759, 1);
});

it("lch(l, c, h[, opacity]) is equivalent to hcl(h, c, l[, opacity])", () => {
  hclEqual(d3.lch(74, 11, 252), 252, 11, 74, 1);
  hclEqual(d3.lch(74, 11, 252), 252, 11, 74, 1);
  hclEqual(d3.lch(74, 11, 252, null), 252, 11, 74, 1);
  hclEqual(d3.lch(74, 11, 252, undefined), 252, 11, 74, 1);
  hclEqual(d3.lch(74, 11, 252, 0.5), 252, 11, 74, 0.5);
});
