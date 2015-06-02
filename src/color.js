import rgb from "./rgb";
import hsl from "./hsl";

export default function(format) {
  var m;
  format = (format + "").toLowerCase();
  return (m = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(format)) ? rgb(parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)) // #f00
      : (m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/.exec(format)) ? rgb(parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)) // #ff0000
      : (m = /^\s*rgb\s*\(\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*\)\s*$/.exec(format)) ? rgb(m[1], m[2], m[3]) // rgb(255,0,0)
      : (m = /^\s*rgb\s*\(\s*(-?\d+)%\s*,\s*(-?\d+(?:\.\d+))%\s*,\s*(-?\d+(?:\.\d+))%\s*\)\s*$/.exec(format)) ? rgb(m[1] * 255, m[2] * 255, m[3] * 255) // rgb(100%,0%,0%)
      : (m = /^\s*hsl\s*\(\s*(-?\d+(?:\.\d+))\s*,\s*(-?\d+(?:\.\d+))%\s*,\s*(-?\d+(?:\.\d+))%\s*\)\s*$/.exec(format)) ? hsl(m[1], m[2] / 100, m[3] / 100) // hsl(120,50%,50%)
      : named.has(format) ? named.get(format).rgb()
      : null;
}
