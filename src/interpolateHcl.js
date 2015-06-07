import hcl from "./hcl";

export default function(a, b) {
  a = hcl(a);
  b = hcl(b);
  var ah = a.h,
      ac = a.c,
      al = a.l,
      bh = b.h - ah,
      bc = b.c - ac,
      bl = b.l - al;
  if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
  if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah;
  else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360; // shortest path
  return function(t) {
    a.h = ah + bh * t;
    a.c = ac + bc * t;
    a.l = al + bl * t;
    return a + "";
  };
};
