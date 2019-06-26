var tape = require("tape"),
    color = require("../");

require("./lrgbEqual");

tape("lrgb(…) returns an instance of lrgb and color", function(test) {
  var c = color.lrgb(70, 130, 180);
  test.ok(c instanceof color.lrgb);
  test.ok(c instanceof color.color);
  test.end();
});

tape("lrgb(…) exposes r, g and b channel values and opacity", function(test) {
  test.lrgbEqual(color.lrgb("#abc"), 0.4019777798321958, 0.4969329950608704, 0.6038273388553378, 1);
  test.lrgbEqual(color.lrgb("rgba(170, 187, 204, 0.4)"), 0.4019777798321958, 0.4969329950608704, 0.6038273388553378, 0.4);
  test.end();
});

tape("lrgb.toString() formats as rgb(…) or rgba(…)", function(test) {
  test.equal(color.lrgb("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(color.lrgb("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(color.lrgb("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  test.equal(color.lrgb("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(color.lrgb(color.lrgb(0.003676507324047436, 0.01599629336550963, 0.03954623527673284)) + "", "rgb(12, 34, 56)");
  test.equal(color.lrgb(color.hsl(60, 1, 0.2)) + "", "rgb(102, 102, 0)");
  test.equal(color.lrgb("rgba(12, 34, 56, 0.4)") + "", "rgba(12, 34, 56, 0.4)");
  test.equal(color.lrgb("rgba(12%, 34%, 56%, 0.4)") + "", "rgba(31, 87, 143, 0.4)");
  test.equal(color.lrgb("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  test.end();
});

tape("lrgb.toString() reflects r, g and b channel values and opacity", function(test) {
  var c = color.lrgb("#abc");
  c.r += 0.1, c.g += 0.1, c.b += 0.1, c.opacity = 0.5;
  test.equal(c + "", "rgba(188, 203, 218, 0.5)");
  test.end();
});

tape("lrgb.toString() treats undefined channel values as 0", function(test) {
  test.equal(color.lrgb("invalid") + "", "rgb(0, 0, 0)");
  test.equal(color.lrgb(NaN, 0.12, 0.34) + "", "rgb(0, 97, 158)");
  test.end();
});

tape("lrgb.toString() treats undefined opacity as 1", function(test) {
  var c = color.lrgb("#abc");
  c.r += 0.1, c.g += 0.1, c.b += 0.1, c.opacity = NaN;
  test.equal(c + "", "rgb(188, 203, 218)");
  test.end();
});

tape("lrgb.toString() clamps r, g, b and opacity channel values", function(test) {
  test.equal(color.lrgb(-0.1,  0.2,  0.3) + "", "rgb(0, 124, 149)");
  test.equal(color.lrgb( 0.2, -0.1,  0.3) + "", "rgb(124, 0, 149)");
  test.equal(color.lrgb( 0.2,  0.3, -0.1) + "", "rgb(124, 149, 0)");
  test.equal(color.lrgb( 0.2,  0.3, -0.1, -0.2) + "", "rgba(124, 149, 0, 0)");
  test.equal(color.lrgb( 0.2,  0.3, -0.1, 1.2) + "", "rgb(124, 149, 0)");
  test.end();
});

tape("lrgb(r, g, b) does not clamp channel values", function(test) {
  test.lrgbEqual(color.lrgb(-10, -20, -30), -10, -20, -30, 1);
  test.lrgbEqual(color.lrgb(300, 400, 500), 300, 400, 500, 1);
  test.end();
});

tape("lrgb(r, g, b, opacity) does not clamp opacity", function(test) {
  test.lrgbEqual(color.lrgb(-10, -20, -30, -0.2), -10, -20, -30, -0.2);
  test.lrgbEqual(color.lrgb(300, 400, 500, 1.2), 300, 400, 500, 1.2);
  test.end();
});

tape("lrgb(r, g, b) coerces channel values to numbers", function(test) {
  test.lrgbEqual(color.lrgb("12", "34", "56"), 12, 34, 56, 1);
  test.lrgbEqual(color.lrgb(null, null, null), 0, 0, 0, 1);
  test.end();
});

tape("lrgb(r, g, b, opacity) coerces opacity to number", function(test) {
  test.lrgbEqual(color.lrgb(-10, -20, -30, "-0.2"), -10, -20, -30, -0.2);
  test.lrgbEqual(color.lrgb(300, 400, 500, "1.2"), 300, 400, 500, 1.2);
  test.end();
});

tape("lrgb(r, g, b) allows undefined channel values", function(test) {
  test.lrgbEqual(color.lrgb(undefined, NaN, "foo"), NaN, NaN, NaN, 1);
  test.lrgbEqual(color.lrgb(undefined, 42, 56), NaN, 42, 56, 1);
  test.lrgbEqual(color.lrgb(42, undefined, 56), 42, NaN, 56, 1);
  test.lrgbEqual(color.lrgb(42, 56, undefined), 42, 56, NaN, 1);
  test.end();
});

tape("lrgb(r, g, b, opacity) converts undefined opacity to 1", function(test) {
  test.lrgbEqual(color.lrgb(10, 20, 30, null), 10, 20, 30, 1);
  test.lrgbEqual(color.lrgb(10, 20, 30, undefined), 10, 20, 30, 1);
  test.end();
});

tape("lrgb(format) parses the specified format and converts to RGB", function(test) {
  test.lrgbEqual(color.lrgb("#abcdef"), 0.4072402119017367, 0.6104955708078648, 0.8631572134541023, 1);
  test.lrgbEqual(color.lrgb("#abc"), 0.4019777798321958, 0.4969329950608704, 0.6038273388553378, 1);
  test.lrgbEqual(color.lrgb("rgb(12, 34, 56)"), 0.003676507324047436, 0.01599629336550963, 0.03954623527673284, 1);
  test.lrgbEqual(color.lrgb("rgb(12%, 34%, 56%)"), 0.013411748897658475, 0.09462962659456918, 0.27383841647314605, 1);
  test.lrgbEqual(color.lrgb("hsl(60,100%,20%)"), 0.13286832155381798, 0.13286832155381798, 0, 1);
  test.lrgbEqual(color.lrgb("aliceblue"),  0.8713671191987972, 0.938685728457888, 1, 1);
  test.lrgbEqual(color.lrgb("hsla(60,100%,20%,0.4)"), 0.13286832155381798, 0.13286832155381798, 0, 0.4);
  test.end();
});

tape("lrgb(format) ignores all channels if the alpha is <= 0", function(test) {
  test.lrgbEqual(color.lrgb("rgba(12,34,45,0)"), NaN, NaN, NaN, 0);
  test.lrgbEqual(color.lrgb("rgba(12,34,45,-0.1)"), NaN, NaN, NaN, -0.1);
  test.end();
});

tape("lrgb(format) returns undefined channel values for unknown formats", function(test) {
  test.lrgbEqual(color.lrgb("invalid"), NaN, NaN, NaN, NaN);
  test.end();
});

tape("lrgb(rgb) copies an RGB color", function(test) {
  var c1 = color.lrgb("rgba(70, 130, 180, 0.4)"),
      c2 = color.lrgb(c1);
  test.lrgbEqual(c1, 0.06124605423161761, 0.2232279573168085, 0.45641102318040466, 0.4);
  c1.r = c1.g = c1.b = c1.opacity = 0;
  test.lrgbEqual(c1, 0, 0, 0, 0);
  test.lrgbEqual(c2, 0.06124605423161761, 0.2232279573168085, 0.45641102318040466, 0.4);
  test.end();
});

tape("lrgb(hsl) converts from HSL", function(test) {
  test.lrgbEqual(color.lrgb(color.hsl(0, 1, 0.5)), 1, 0, 0, 1);
  test.lrgbEqual(color.lrgb(color.hsl(0, 1, 0.5, 0.4)), 1, 0, 0, 0.4);
  test.end();
});

tape("lrgb.displayable() returns true if the color is within the RGB gamut and opacity is in [0,1]", function(test) {
  test.equal(color.lrgb("white").displayable(), true);
  test.equal(color.lrgb("red").displayable(), true);
  test.equal(color.lrgb("black").displayable(), true);
  test.equal(color.lrgb("invalid").displayable(), false);
  test.equal(color.lrgb(-0.1, 0, 0).displayable(), false);
  test.equal(color.lrgb(0, -0.1, 0).displayable(), false);
  test.equal(color.lrgb(0, 0, -0.1).displayable(), false);
  test.equal(color.lrgb(1.1, 0, 0).displayable(), false);
  test.equal(color.lrgb(0, 1.1, 0).displayable(), false);
  test.equal(color.lrgb(0, 0, 1.1).displayable(), false);
  test.equal(color.lrgb(0, 0, 1, 0).displayable(), true);
  test.equal(color.lrgb(0, 0, 1, 1.2).displayable(), false);
  test.equal(color.lrgb(0, 0, 1, -0.2).displayable(), false);
  test.end();
});

tape("lrgb.brighter(k) returns a brighter color if k > 0", function(test) {
  var c = color.lrgb("rgba(165, 42, 42, 0.4)");
  test.lrgbEqual(c.brighter(0.5), 0.4262621229909065, 0.07315336617811041, 0.07315336617811041, 0.4);
  test.lrgbEqual(c.brighter(1), 0.47626212299090653, 0.12315336617811042, 0.12315336617811042, 0.4);
  test.lrgbEqual(c.brighter(2), 0.5762621229909065, 0.22315336617811043, 0.22315336617811043, 0.4);
  test.end();
});

tape("lrgb.brighter(k) returns a copy", function(test) {
  var c1 = color.lrgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1);
  test.lrgbEqual(c1, 0.06124605423161761, 0.2232279573168085, 0.45641102318040466, 0.4);
  test.lrgbEqual(c2, 0.1612460542316176, 0.32322795731680853, 0.5564110231804047, 0.4);
  test.end();
});

tape("lrgb.brighter() is equivalent to lrgb.brighter(1)", function(test) {
  var c1 = color.lrgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(),
      c3 = c1.brighter(1);
  test.lrgbEqual(c2, c3.r, c3.g, c3.b, 0.4);
  test.end();
});

tape("lrgb.brighter(k) is equivalent to lrgb.darker(-k)", function(test) {
  var c1 = color.lrgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.brighter(1.5),
      c3 = c1.darker(-1.5);
  test.lrgbEqual(c2, c3.r, c3.g, c3.b, 0.4);
  test.end();
});

tape("lrgb(\"black\").brighter() does not return black", function(test) {
  var c1 = color.lrgb("black"),
      c2 = c1.brighter(1);
  test.lrgbEqual(c1, 0, 0, 0, 1);
  test.lrgbEqual(c2, 0.1, 0.1, 0.1, 1);
  test.end();
});

tape("lrgb.darker(k) returns a darker color if k > 0", function(test) {
  var c = color.lrgb("rgba(165, 42, 42, 0.4)");
  test.lrgbEqual(c.darker(0.5), 0.3262621229909065, -0.026846633821889593, -0.026846633821889593, 0.4);
  test.lrgbEqual(c.darker(1), 0.27626212299090647, -0.0768466338218896, -0.0768466338218896, 0.4);
  test.lrgbEqual(c.darker(2), 0.1762621229909065, -0.1768466338218896, -0.1768466338218896, 0.4);
  test.end();
});

tape("lrgb.darker(k) returns a copy", function(test) {
  var c1 = color.lrgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1);
  test.lrgbEqual(c1, 0.06124605423161761, 0.2232279573168085, 0.45641102318040466, 0.4);
  test.lrgbEqual(c2, -0.0387539457683824, 0.1232279573168085, 0.35641102318040463, 0.4);
  test.end();
});

tape("lrgb.darker() is equivalent to rgb.darker(1)", function(test) {
  var c1 = color.lrgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(),
      c3 = c1.darker(1);
  test.lrgbEqual(c2, c3.r, c3.g, c3.b, 0.4);
  test.end();
});

tape("lrgb.darker(k) is equivalent to rgb.brighter(-k)", function(test) {
  var c1 = color.lrgb("rgba(70, 130, 180, 0.4)"),
      c2 = c1.darker(1.5),
      c3 = c1.brighter(-1.5);
  test.lrgbEqual(c2, c3.r, c3.g, c3.b, 0.4);
  test.end();
});
