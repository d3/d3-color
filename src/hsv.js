import define, {extend} from "./define";
import {Color, rgbConvert, Rgb, darker, brighter} from "./color";

function hsvConvert(o) {
  if (o instanceof Hsv) return new Hsv(o.h, o.s, o.v, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      d = max - min,
      h = NaN,
      s = max ? d/max : 0,
      v = max;
  if (d) {
    if (r === max) h = (g - b) / d + (g < b) * 6;
    else if (g === max) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  } else {
    s = v > 0 && v < 1 ? 0 : h;
  }
  return new Hsv(h, s, v, o.opacity);
}

export default function hsv(h, s, v, opacity) {
  return arguments.length === 1 ? hsvConvert(h) : new Hsv(h, s, v, opacity == null ? 1 : opacity);
}

export function Hsv(h, s, v, opacity) {
  this.h = +h;
  this.s = +s;
  this.v = +v;
  this.opacity = +opacity;
}

define(Hsv, hsv, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsv(this.h, this.s, this.v * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsv(this.h, this.s, this.v * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : this.h % 360 + (this.h < 0) * 360,
        s = isNaN(this.h) || isNaN(this.s) ? 0 : this.s,
        v = this.v,
        c = v * s,
        x = c * (1 - Math.abs((h/60)%2 - 1)),
        m = v - c;
    if (h < 60) return hsv2rgb(c, x, 0, m, this.opacity);
    else if (h < 120) return hsv2rgb(x, c, 0, m, this.opacity);
    else if (h < 180) return hsv2rgb(0, c, x, m, this.opacity);
    else if (h < 240) return hsv2rgb(0, x, c, m, this.opacity);
    else if (h < 300) return hsv2rgb(x, 0, c, m, this.opacity);
    return new hsv2rgb(c, 0, x, m, this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.v && this.v <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

function hsv2rgb(r1, g1, b1, m, a) {
  return new Rgb((r1+m) * 255, (g1+m)*255, (b1+m)*255, a);
}
