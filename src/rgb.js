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
    var v;
    return "#"
        + (v = this.r, v < 16 ? "0" + v.toString(16) : v.toString(16))
        + (v = this.g, v < 16 ? "0" + v.toString(16) : v.toString(16))
        + (v = this.b, v < 16 ? "0" + v.toString(16) : v.toString(16));
  }
};

export default rgb;
