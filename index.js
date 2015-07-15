import {default as color, Color} from "./src/color";
import {default as rgb, Rgb} from "./src/rgb";
import {default as hsl, Hsl} from "./src/hsl";
import {default as lab, Lab} from "./src/lab";
import {default as hcl, Hcl} from "./src/hcl";
import {default as cubehelix, Cubehelix} from "./src/cubehelix";
import interpolateRgb from "./src/interpolateRgb";
import interpolateHsl from "./src/interpolateHsl";
import interpolateHslLong from "./src/interpolateHslLong";
import interpolateLab from "./src/interpolateLab";
import interpolateHcl from "./src/interpolateHcl";
import interpolateHclLong from "./src/interpolateHclLong";
import interpolateCubehelixGamma from "./src/interpolateCubehelixGamma";
import interpolateCubehelixGammaLong from "./src/interpolateCubehelixGammaLong";

export var interpolateCubehelix = interpolateCubehelixGamma(1);
export var interpolateCubehelixLong = interpolateCubehelixGammaLong(1);

export {
  color,
  rgb,
  hsl,
  lab,
  hcl,
  cubehelix,
  interpolateRgb,
  interpolateHsl,
  interpolateHslLong,
  interpolateLab,
  interpolateHcl,
  interpolateHclLong,
  interpolateCubehelixGamma,
  interpolateCubehelixGammaLong
};
