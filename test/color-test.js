var tape = require("tape"),
    color = require("../");

require("./rgbEqual");
require("./hslEqual");

tape("color(format) parses CSS color names (e.g., \"rebeccapurple\")", function(test) {
  test.rgbEqual(color.color("moccasin"), 255, 228, 181);
  test.rgbEqual(color.color("aliceblue"), 240, 248, 255);
  test.rgbEqual(color.color("yellow"), 255, 255, 0);
  test.rgbEqual(color.color("moccasin"), 255, 228, 181);
  test.rgbEqual(color.color("aliceblue"), 240, 248, 255);
  test.rgbEqual(color.color("yellow"), 255, 255, 0);
  test.rgbEqual(color.color("rebeccapurple"), 102, 51, 153);
  test.end();
});

tape("color(format) parses 6-digit hexadecimal (e.g., \"#abcdef\")", function(test) {
  test.rgbEqual(color.color("#abcdef"), 171, 205, 239);
  test.end();
});

tape("color(format) parses 3-digit hexadecimal (e.g., \"#abc\")", function(test) {
  test.rgbEqual(color.color("#abc"), 170, 187, 204);
  test.end();
});

tape("color(format) parses RGB integer format (e.g., \"rgb(12,34,56)\")", function(test) {
  test.rgbEqual(color.color("rgb(12,34,56)"), 12, 34, 56);
  test.end();
});

tape("color(format) parses RGB percentage format (e.g., \"rgb(12%,34%,56%)\")", function(test) {
  test.rgbEqual(color.color("rgb(12%,34%,56%)"), 31, 87, 143);
  test.rgbStrictEqual(color.color("rgb(100%,100%,100%)"), 255, 255, 255);
  test.end();
});

tape("color(format) parses HSL format (e.g., \"hsl(60,100%,20%)\")", function(test) {
  test.hslEqual(color.color("hsl(60,100%,20%)"), 60, 1, .2);
  test.end();
});

tape("color(format) ignores leading and trailing whitespace", function(test) {
  test.rgbEqual(color.color(" aliceblue\t\n"), 240, 248, 255);
  test.rgbEqual(color.color(" #abc\t\n"), 170, 187, 204);
  test.rgbEqual(color.color(" #aabbcc\t\n"), 170, 187, 204);
  test.rgbEqual(color.color(" rgb(120,30,50)\t\n"), 120, 30, 50);
  test.hslEqual(color.color(" hsl(120,30%,50%)\t\n"), 120, .3, .5);
  test.end();
});

tape("color(format) ignores whitespace between numbers", function(test) {
  test.rgbEqual(color.color(" rgb( 120 , 30 , 50 ) "), 120, 30, 50);
  test.hslEqual(color.color(" hsl( 120 , 30% , 50% ) "), 120, .3, .5);
  test.end();
});

tape("color(format) allows number signs", function(test) {
  test.rgbEqual(color.color("rgb(+120,+30,+50)"), 120, 30, 50);
  test.hslEqual(color.color("hsl(+120,+30%,+50%)"), 120, .3, .5);
  test.rgbEqual(color.color("rgb(-120,-30,-50)"), -120, -30, -50);
  test.hslEqual(color.color("hsl(-120,-30%,-50%)"), -120, -.3, -.5);
  test.end();
});

tape("color(format) allows decimals for non-integer values", function(test) {
  test.rgbEqual(color.color("rgb(20.0%,30.4%,51.2%)"), 51, 78, 131);
  test.hslEqual(color.color("hsl(20.0,30.4%,51.2%)"), 20, .304, .512);
  test.end();
});

tape("color(format) does not allow decimals for integer values", function(test) {
  test.equal(color.color("rgb(120.5,30,50)"), null);
  test.end();
});

tape("color(format) does not allow empty decimals", function(test) {
  test.equal(color.color("rgb(120.,30,50)"), null);
  test.equal(color.color("rgb(120.%,30%,50%)"), null);
  test.end();
});

tape("color(format) does not allow made-up names", function(test) {
  test.equal(color.color("bostock"), null);
  test.end();
});

tape("color(format) does not allow whitespace before open paren or percent sign", function(test) {
  test.equal(color.color("rgb (120,30,50)"), null);
  test.equal(color.color("hsl (120,30%,50%)"), null);
  test.equal(color.color("hsl(120,30 %,50%)"), null);
  test.end();
});

tape("color(format) is case-insensitive", function(test) {
  test.rgbEqual(color.color("aLiCeBlUE"), 240, 248, 255);
  test.rgbEqual(color.color(" #aBc\t\n"), 170, 187, 204);
  test.rgbEqual(color.color(" #aaBBCC\t\n"), 170, 187, 204);
  test.rgbEqual(color.color(" rGB(120,30,50)\t\n"), 120, 30, 50);
  test.hslEqual(color.color(" HSl(120,30%,50%)\t\n"), 120, .3, .5);
  test.end();
});

tape("color(format) returns undefined RGB channel values for unknown formats", function(test) {
  test.equal(color.color("invalid"), null);
  test.equal(color.color("hasOwnProperty"), null);
  test.equal(color.color("__proto__"), null);
  test.equal(color.color("#ab"), null);
  test.equal(color.color("#abcd"), null);
  test.equal(color.color("rgba(120,30,50,.5)"), null);
  test.end();
});
