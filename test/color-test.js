var tape = require("tape"),
    color = require("../");

tape('color("#abc ") returns the expected RGB color', function(test) {
  var c = color.color("#abc ");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 0xaa);
  test.equal(c.g, 0xbb);
  test.equal(c.b, 0xcc);
  test.end();
});

tape('color(" #abc123") returns the expected RGB color', function(test) {
  var c = color.color(" #abc123");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 0xab);
  test.equal(c.g, 0xc1);
  test.equal(c.b, 0x23);
  test.end();
});

tape('color("#ab") returns null', function(test) {
  test.equal(color.color("#ab"), null);
  test.end();
});

tape('color("steelblue") returns the expected RGB color', function(test) {
  var c = color.color("steelblue");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('color("rgb(70, 130, 180)") returns the expected RGB color', function(test) {
  var c = color.color("rgb(70, 130, 180)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('color("rgb(-70,130,180)") returns the expected RGB color', function(test) {
  var c = color.color("rgb(-70,130,180)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 0);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('color(" rgb(70,130,+180) ") returns the expected RGB color', function(test) {
  var c = color.color(" rgb(70,130,+180) ");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('color(" rgb(70.5,130,180) ") returns null', function(test) {
  test.equal(color.color(" rgb(70.5,130,180) "), null);
  test.end();
});

tape('color("rgb(30%,40%,50%)") returns the expected RGB color', function(test) {
  var c = color.color("rgb(30%,40%,50%)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 77);
  test.equal(c.g, 102);
  test.equal(c.b, 128);
  test.end();
});

tape('color("rgb(30%,-40%,50%)") returns the expected RGB color', function(test) {
  var c = color.color("rgb(30%,-40%,50%)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 77);
  test.equal(c.g, 0);
  test.equal(c.b, 128);
  test.end();
});

tape('color("rgb(30.5%,40%,50%)") returns the expected RGB color', function(test) {
  var c = color.color("rgb(30.5%,40%,50%)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 78);
  test.equal(c.g, 102);
  test.equal(c.b, 128);
  test.end();
});

tape('color("rgb(30.5%,40.%,50%)") returns null', function(test) {
  test.equal(color.color("rgb(30.5%,40.%,50%)"), null);
  test.end();
});

tape('color("hsl(30,40%,50%)") returns the expected HSL color', function(test) {
  var c = color.color("hsl(30,40%,50%)");
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 30);
  test.equal(c.s, .4);
  test.equal(c.l, .5);
  test.end();
});

tape('color("hsl(1030,-40%,50.5%)") returns the expected HSL color', function(test) {
  var c = color.color("hsl(1030,-40%,50.5%)");
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 310);
  test.equal(c.s, 0);
  test.equal(c.l, .505);
  test.end();
});
