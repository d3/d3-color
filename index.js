export {default as color} from "./src/color";
export {default as rgb} from "./src/rgb";
export {default as hsl} from "./src/hsl";
export {default as lab} from "./src/lab";
export {default as hcl} from "./src/hcl";
export {default as cubehelix} from "./src/cubehelix";
export {default as interpolateRgb} from "./src/interpolateRgb";
export {default as interpolateHsl} from "./src/interpolateHsl";
export {default as interpolateHslLong} from "./src/interpolateHslLong";
export {default as interpolateLab} from "./src/interpolateLab";
export {default as interpolateHcl} from "./src/interpolateHcl";
export {default as interpolateHclLong} from "./src/interpolateHclLong";

import interpolateCubehelixGamma from "./src/interpolateCubehelixGamma";
import interpolateCubehelixGammaLong from "./src/interpolateCubehelixGammaLong";
export var interpolateCubehelix = interpolateCubehelixGamma(1);
export var interpolateCubehelixLong = interpolateCubehelixGammaLong(1);
export {interpolateCubehelixGamma, interpolateCubehelixGammaLong};
