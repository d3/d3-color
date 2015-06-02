import {Lab, Kn} from "./lab";

var deg2rad = Math.PI / 180;

export function Hcl(h, c, l) {
  this.h = (h %= 360) < 0 ? h + 360 : h;
  this.c = +c;
  this.l = Math.max(0, Math.min(100, +l));
};

function hcl(h, c, l) {
  return new Hcl(h, c, l); // TODO
}

Hcl.prototype = hcl.prototype = {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k));
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k));
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : this.h * deg2rad,
        c = isNaN(this.c) ? 0 : this.c;
    return new Lab(this.l, Math.cos(h) * c, Math.sin(h) * c).rgb();
  },
  toString: function() {
    return this.rgb() + "";
  }
};

export default hcl;
