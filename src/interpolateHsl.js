import hsl from "./hsl";

export default function(a, b) {
  a = hsl(a);
  b = hsl(b);
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
    a.l = al + bl * t;
    return a + "";
  };
};
