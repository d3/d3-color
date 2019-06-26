import define, {extend} from "./define";
import {Color, rgbConvert, Rgb} from "./color";

var brighter = 1 / 0.7; // TODO

export function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

export function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function lrgbConvert(o) {
  if (o instanceof Lrgb) return new Lrgb(o.r, o.g, o.b, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  return new Lrgb(rgb2lrgb(o.r), rgb2lrgb(o.g), rgb2lrgb(o.b), o.opacity);
}

export default function lrgb(r, g, b, opacity) {
  return arguments.length === 1 ? lrgbConvert(r) : new Lrgb(r, g, b, opacity == null ? 1 : opacity);
}

export function Lrgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lrgb, lrgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : brighter * k;
    return new Lrgb(this.r + k, this.g + k, this.b + k, this.opacity);
  },
  darker: function(k) {
    return this.brighter(-k);
  },
  rgb: function() {
    return new Rgb(lrgb2rgb(this.r), lrgb2rgb(this.g), lrgb2rgb(this.b), this.opacity);
  }
}));
