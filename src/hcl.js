import color from "./color";
import {default as lab, Kn} from "./lab";

export var deg2rad = Math.PI / 180;
export var rad2deg = 180 / Math.PI;

export function Hcl(h, c, l) {
  this.h = (h %= 360) < 0 ? h + 360 : h;
  this.c = +c;
  this.l = Math.max(0, Math.min(100, +l));
};

function hcl(h, c, l) {
  if (arguments.length === 1) {
    if (h instanceof hcl) {
      l = h.l;
      c = h.c;
      h = h.h;
    } else {
      if (!(h instanceof lab)) h = lab(h);
      l = h.l;
      c = Math.sqrt(h.a * h.a + h.b * h.b);
      h = Math.atan2(h.b, h.a) * rad2deg;
    }
  }
  return new Hcl(h, c, l);
}

var prototype = Hcl.prototype = hcl.prototype = Object.create(color.prototype);

prototype.brighter = function(k) {
  return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k));
};

prototype.darker = function(k) {
  return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k));
};

prototype.rgb = function() {
  return lab(this).rgb();
};

export default hcl;
