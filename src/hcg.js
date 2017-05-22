import {color, rgb} from "d3-color";

function hcgConvert(o) {
  if (o instanceof Hcg) return new Hcg(o.h, o.c, o.g, o.opacity);
  if (!(o instanceof rgb)) o = rgb(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      d = max - min,
      h = NaN,
      gr = min / (1 - d);
  if (d) {
    if (r === max) h = (g - b) / d + (g < b) * 6;
    else if (g === max) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return new Hcg(h, d, gr, o.opacity);
}

export default function hcg(h, c, g, opacity) {
  return arguments.length === 1 ? hcgConvert(h) : new Hcg(h, c, g, opacity == null ? 1 : opacity);
}

export function Hcg(h, c, g, opacity) {
  this.h = +h;
  this.c = +c;
  this.g = +g;
  this.opacity = +opacity;
}

var hcgPrototype = Hcg.prototype = hcg.prototype = Object.create(color.prototype);

hcgPrototype.constructor = Hcg;

hcgPrototype.rgb = function() {
  var h = isNaN(this.h) ? 0 : this.h % 360 + (this.h < 0) * 360,
      c = this.c,
      g = isNaN(this.g) ? 0 : this.g,
      a = this.opacity,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = g * (1.0 - c);
  return h < 60 ? hcg2rgb(c, x, 0, m, a)
      : h < 120 ? hcg2rgb(x, c, 0, m, a)
      : h < 180 ? hcg2rgb(0, c, x, m, a)
      : h < 240 ? hcg2rgb(0, x, c, m, a)
      : h < 300 ? hcg2rgb(x, 0, c, m, a)
      : hcg2rgb(c, 0, x, m, a);
};

hcgPrototype.displayable = function() {
  return (0 <= this.g && this.g <= 1 || isNaN(this.g))
      && (0 <= this.c && this.c <= 1)
      && (0 <= this.opacity && this.opacity <= 1);
};

function hcg2rgb(r1, g1, b1, m, a) {
  return rgb((r1 + m) * 255, (g1 + m) * 255, (b1 + m) * 255, a);
}
