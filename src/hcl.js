import {default as color, Color} from "./color";
import {default as lab, Lab, Kn} from "./lab";

export var deg2rad = Math.PI / 180;
export var rad2deg = 180 / Math.PI;

export default function hcl(h, c, l) {
  if (arguments.length === 1) {
    if (h instanceof Hcl) {
      l = h.l;
      c = h.c;
      h = h.h;
    } else {
      if (!(h instanceof Lab)) h = lab(h);
      l = h.l;
      c = Math.sqrt(h.a * h.a + h.b * h.b);
      h = Math.atan2(h.b, h.a) * rad2deg;
      if (h < 0) h += 360;
    }
  }
  return new Hcl(h, c, l);
};

export function Hcl(h, c, l) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
};

var prototype = hcl.prototype = Hcl.prototype = new Color;

prototype.brighter = function(k) {
  return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k));
};

prototype.darker = function(k) {
  return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k));
};

prototype.rgb = function() {
  return lab(this).rgb();
};
