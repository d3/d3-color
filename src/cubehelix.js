import {default as color, Color} from "./color";
import {default as rgb, Rgb, darker, brighter} from "./rgb";
import {deg2rad, rad2deg} from "./hcl";

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

export default function cubehelix(h, s, l) {
  if (arguments.length === 1) {
    if (h instanceof Cubehelix) {
      l = h.l;
      s = h.s;
      h = h.h;
    } else {
      if (!(h instanceof Rgb)) h = rgb(h);
      var r = h.r / 255, g = h.g / 255, b = h.b / 255;
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB);
      var bl = b - l, k = (E * (g - l) - C * bl) / D;
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)); // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
      if (h < 0) h += 360;
    }
  }
  return new Cubehelix(h, s, l);
};

export function Cubehelix(h, s, l) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
};

var prototype = cubehelix.prototype = Cubehelix.prototype = new Color;

prototype.brighter = function(k) {
  k = k == null ? brighter : Math.pow(brighter, k);
  return new Cubehelix(this.h, this.s, this.l * k);
};

prototype.darker = function(k) {
  k = k == null ? darker : Math.pow(darker, k);
  return new Cubehelix(this.h, this.s, this.l * k);
};

prototype.rgb = function() {
  var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
      l = +this.l,
      a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
      cosh = Math.cos(h),
      sinh = Math.sin(h);
  return new Rgb(
    255 * (l + a * (A * cosh + B * sinh)),
    255 * (l + a * (C * cosh + D * sinh)),
    255 * (l + a * (E * cosh))
  );
};
