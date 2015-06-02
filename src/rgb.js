export var darker = .7;
export var brighter = 1 / darker;

export function Rgb(r, g, b) {
  this.r = Math.max(0, Math.min(255, Math.round(r)));
  this.g = Math.max(0, Math.min(255, Math.round(g)));
  this.b = Math.max(0, Math.min(255, Math.round(b)));
};

function rgb(r, g, b) {
  return new Rgb(r, g, b); // TODO
}

Rgb.prototype = rgb.prototype = {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k);
  },
  rgb: function() {
    return new Rgb(this.r, this.g, this.b);
  },
  toString: function() {
    return format(this.r, this.g, this.b);
  }
};

export function format(r, g, b) {
  return "#"
      + (r < 16 ? "0" + r.toString(16) : r.toString(16))
      + (g < 16 ? "0" + g.toString(16) : g.toString(16))
      + (b < 16 ? "0" + b.toString(16) : b.toString(16));
};

export default rgb;
