import {default as color, Color} from "./src/color";
import {default as rgb, Rgb} from "./src/rgb";
import {default as hsl, Hsl} from "./src/hsl";
import {default as lab, Lab} from "./src/lab";
import {default as hcl, Hcl} from "./src/hcl";
import {default as cubehelix, Cubehelix} from "./src/cubehelix";
import interpolateRgb from "./src/interpolateRgb";
import interpolateHsl from "./src/interpolateHsl";
import interpolateLab from "./src/interpolateLab";
import interpolateHcl from "./src/interpolateHcl";
import interpolateCubehelix from "./src/interpolateCubehelix";

// Done lazily to avoid circular dependency between Color, Rgb and Hsl.
color.prototype = Color.prototype;
rgb.prototype = Rgb.prototype;
hsl.prototype = Hsl.prototype;
lab.prototype = Lab.prototype;
hcl.prototype = Hcl.prototype;
cubehelix.prototype = Cubehelix.prototype;

export {
  color,
  rgb,
  hsl,
  lab,
  hcl,
  cubehelix,
  interpolateRgb,
  interpolateHsl,
  interpolateLab,
  interpolateHcl,
  interpolateCubehelix
};
