import color from "./src/color";
import rgb from "./src/rgb";
import hsl from "./src/hsl";
import lab from "./src/lab";
import hcl from "./src/hcl";
import cubehelix from "./src/cubehelix";
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
