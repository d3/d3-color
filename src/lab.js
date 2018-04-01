import define, {extend} from "./define";
import {Color, rgbConvert, Rgb} from "./color";
import {deg2rad, rad2deg} from "./math";

var Kn = 18,
    Xn = 0.9642, // D50 standard referent
    Yn = 1.0000,
    Zn = 0.8249,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var xyz = rgb2xyz(o.r, o.g, o.b),
      x = xyz2lab(xyz.x / Xn),
      y = xyz2lab(xyz.y / Yn),
      z = xyz2lab(xyz.z / Zn);
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

export default function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

export function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend(Color, {
  brighter: function(k) {
    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200,
        rgb = xyz2rgb(
          Xn * lab2xyz(x),
          Yn * lab2xyz(y),
          Zn * lab2xyz(z)
        );
    return new Rgb(rgb.r, rgb.g, rgb.b, this.opacity);
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? Math.pow(t, 3) : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function xyz2rgb(x, y, z) {
  // D50 -> D65
  var x1 = x * 0.9555766 - y * 0.0230393 + z * 0.0631636;
  var y1 = x * -0.0282895 + y * 1.0099416 + z * 0.0210077;
  var z1 = x * 0.0122982 - y * 0.0204830 + z * 1.3299098;
  return {
    r: lrgb2rgb(3.2404542 * x1 - 1.5371385 * y1 - 0.4985314 * z1),
    g: lrgb2rgb(-0.9692660 * x1 + 1.8760108 * y1 + 0.0415560 * z1),
    b: lrgb2rgb(0.0556434 * x1 - 0.2040259 * y1 + 1.0572252 * z1)
  };
}

function rgb2xyz(r, g, b) {
  r = rgb2lrgb(r), g = rgb2lrgb(g), b = rgb2lrgb(b);
  var x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
      y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
      z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;
  // D65 -> D50
  return {
    x: x * 1.0478112 + y * 0.0228866 - z * 0.0501270,
    y: x * 0.0295424 + y * 0.9904844 - z * 0.0170491,
    z: x * -0.0092345 + y * 0.0150436 + z * 0.7521316
  };
}



function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

export function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

export function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hcl, hcl, extend(Color, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));
