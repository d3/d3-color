import assert from "assert";
import * as d3 from "../src/index.js";

it("cubehelix(…) returns an instance of cubehelix and color", () => {
  const c = d3.cubehelix("steelblue");
  assert(c instanceof d3.cubehelix);
  assert(c instanceof d3.color);
});
