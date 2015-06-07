export default function(h, h0) {
  var delta = (h - h0) % 360;
  return delta + (delta > 180 ? -360 : delta < -180 ? 360 : 0);
};
