import {Rgb, brighter, darker} from "./rgb";

export function Hsl(h, s, l) {
  this.h = (h %= 360) < 0 ? h + 360 : h;
  this.s = Math.max(0, Math.min(1, +s));
  this.l = Math.max(0, Math.min(1, +l));
};

function hsl(h, s, l) {
  return new Hsl(h, s, l); // TODO
}

Hsl.prototype = hsl.prototype = {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : this.h,
        s = isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l <= .5 ? l * (1 + s) : l + s - l * s,
        m1 = 2 * l - m2;

    /* From FvD 13.37, CSS Color Module Level 3 */
    function v(h) {
      if (h > 360) h -= 360;
      else if (h < 0) h += 360;
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    return new Rgb(v(h + 120), v(h), v(h - 120));
  },
  toString: function() {
    return this.rgb() + "";
  }
};

export default hsl;
