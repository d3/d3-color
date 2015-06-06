import cubehelix from "./cubehelix";

export default function(a, b) {
  a = cubehelix(a); a.h %= 360; if (a.h < 0) a.h += 360;
  b = cubehelix(b); b.h %= 360; if (b.h < 0) b.h += 360;
  var ah = a.h,
      as = a.s,
      al = a.l,
      bh = b.h - ah,
      bs = b.s - as,
      bl = b.l - al;
  if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
  if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
  else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360; // shortest path
  return function(t) {
    a.h = ah + bh * t;
    a.s = as + bs * t;
    a.l = al + bl * t
    return a + "";
  };
};
