import {default as color, Color} from "./color";
import {default as rgb, Rgb} from "./rgb";
import {default as hcl, Hcl, deg2rad} from "./hcl";

export var Kn = 18;

var Xn = 0.950470, // D65 standard referent
    Yn = 1,
    Zn = 1.088830,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

export default function lab(l, a, b) {
  if (arguments.length === 1) {
    if (l instanceof Lab) {
      b = l.b;
      a = l.a;
      l = l.l;
    } else if (l instanceof Hcl) {
      var h = l.h * deg2rad;
      b = Math.sin(h) * l.c;
      a = Math.cos(h) * l.c;
      l = l.l;
    } else {
      if (!(l instanceof Rgb)) l = rgb(l);
      var r = rgb2xyz(l.r),
          g = rgb2xyz(l.g),
          b = rgb2xyz(l.b),
          x = xyz2lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / Xn),
          y = xyz2lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / Yn),
          z = xyz2lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / Zn);
      b = 200 * (y - z);
      a = 500 * (x - y);
      l = 116 * y - 16;
    }
  }
  return new Lab(l, a, b);
};

export function Lab(l, a, b) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
};

var prototype = lab.prototype = Lab.prototype = new Color;

prototype.brighter = function(k) {
  return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b);
};

prototype.darker = function(k) {
  return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b);
};

prototype.rgb = function() {
  var y = (this.l + 16) / 116,
      x = isNaN(this.a) ? y : y + this.a / 500,
      z = isNaN(this.b) ? y : y - this.b / 200;
  y = Yn * lab2xyz(y);
  x = Xn * lab2xyz(x);
  z = Zn * lab2xyz(z);
  return new Rgb(
    xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
    xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
    xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
  );
};

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function xyz2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2xyz(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
