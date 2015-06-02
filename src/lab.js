import {Rgb} from "./rgb";

var brighter = 18,
    X = 0.950470, // D65 standard referent
    Y = 1,
    Z = 1.088830;

export function Lab(l, a, b) {
  this.l = Math.max(0, Math.min(100, +l));
  this.a = +a;
  this.b = +b;
};

function lab(l, a, b) {
  return new Lab(l, a, b); // TODO
}

Lab.prototype = lab.prototype = {
  brighter: function(k) {
    return new Lab(this.l + brighter * (k == null ? 1 : k), this.a, this.b);
  },
  darker: function(k) {
    return new Lab(this.l - brighter * (k == null ? 1 : k), this.a, this.b);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = y + this.a / 500,
        z = y - this.b / 200;
    x = lab2xyz(x) * X;
    y = lab2xyz(y) * Y;
    z = lab2xyz(z) * Z;
    return new Rgb(
      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z),
      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
    );
  },
  toString: function() {
    return this.rgb() + "";
  }
};

function lab2xyz(x) {
  return x > 0.206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
}

function xyz2rgb(r) {
  return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055);
}

export default lab;
