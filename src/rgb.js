import {default as color, Color} from "./color";

export var darker = .7;
export var brighter = 1 / darker;

export default function rgb(r, g, b) {
  if (arguments.length === 1) {
    if (!(r instanceof Color)) r = color(r);
    if (r) {
      r = r.rgb();
      b = r.b;
      g = r.g;
      r = r.r;
    } else {
      r = g = b = NaN;
    }
  }
  return new Rgb(r, g, b);
};

export function Rgb(r, g, b) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
};

var prototype = rgb.prototype = Rgb.prototype = new Color;

prototype.brighter = function(k) {
  k = k == null ? brighter : Math.pow(brighter, k);
  return new Rgb(this.r * k, this.g * k, this.b * k);
};

prototype.darker = function(k) {
  k = k == null ? darker : Math.pow(darker, k);
  return new Rgb(this.r * k, this.g * k, this.b * k);
};

prototype.rgb = function() {
  return this;
};

prototype.displayable = function() {
  return (0 <= this.r && this.r <= 255)
      && (0 <= this.g && this.g <= 255)
      && (0 <= this.b && this.b <= 255);
};

prototype.toString = function() {
  var r = Math.round(this.r),
      g = Math.round(this.g),
      b = Math.round(this.b);
  return "#"
      + (isNaN(r) || r <= 0 ? "00" : r < 16 ? "0" + r.toString(16) : r >= 255 ? "ff" : r.toString(16))
      + (isNaN(g) || g <= 0 ? "00" : g < 16 ? "0" + g.toString(16) : g >= 255 ? "ff" : g.toString(16))
      + (isNaN(b) || b <= 0 ? "00" : b < 16 ? "0" + b.toString(16) : b >= 255 ? "ff" : b.toString(16));
};
