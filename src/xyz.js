import define, {extend} from "./define.js";
import {Color, rgbConvert, Rgb} from "./color.js";

/* CIE XYZ D50 */

const Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    // For converting from lRGB to XYZ.
    ry = 0.2225045,
    gy = 0.7168786,
    by = 0.0606169,
    rx = 0.4360747,
    gx = 0.3850649,
    bx = 0.1430804,
    rz = 0.0139322,
    gz = 0.0971045,
    bz = 0.7141733,
    // For converting from XYZ to lRGB.
    xr = 3.1338561,
    yr = -1.6168667,
    zr = -0.4906146,
    xg = -0.9787684,
    yg = 1.9161415,
    zg = 0.0334540,
    xb = 0.0719453,
    yb = -0.2289914,
    zb = 1.4052427;



function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

export function xyzConvert(o) {
  if (o instanceof Xyz) return new Xyz(o.x, o.y, o.z, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = ((ry * r) + (gy * g) + (by * b)) / Yn, x, z;
  if (r === g && g === b) x = z = y; else {
    x = ((rx * r) + (gx * g) + (bx * b)) / Xn,
    z = ((rz * r) + (gz * g) + (bz * b)) / Zn;
  }
  return new Xyz(x, y, z, o.opacity);
}

export default function xyz(x, y, z, opacity) {
  return arguments.length === 1 ? xyzConvert(x) : new Xyz(x, y, z, opacity == null ? 1 : opacity);
}
  
export function Xyz(x, y, z, opacity) {
  this.x = +x;
  this.y = +y;
  this.z = +z;
  this.opacity = +opacity;
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
  
define(Xyz, xyz, extend(Color, {
  rgb: function() {
    var x = Xn * this.x,
        y = Yn * this.y,
        z = Zn * this.z,
        r = (xr * x) + (yr * y) + (zr * z),
        g = (xg * x) + (yg * y) + (zg * z),
        b = (xb * x) + (yb * y) + (zb * z);
    return new Rgb(lrgb2rgb(r), lrgb2rgb(g), lrgb2rgb(b), this.opacity);
  }
}));
