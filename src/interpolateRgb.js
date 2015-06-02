import {default as rgb, format} from "./rgb";

export default function(a, b) {
  a = rgb(a);
  b = rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    return format(Math.round(ar + br * t), Math.round(ag + bg * t), Math.round(ab + bb * t));
  };
};
