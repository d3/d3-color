var tape = require("tape"),
    color = require("../");

tape('color("#abc ") returns rgb(170, 187, 204)', function(test) {
  var c = color.color("#abc ");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 170);
  test.equal(c.g, 187);
  test.equal(c.b, 204);
  test.end();
});

tape('color(" #abc123") returns rgb(171, 193, 35)', function(test) {
  var c = color.color(" #abc123");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 171);
  test.equal(c.g, 193);
  test.equal(c.b, 35);
  test.end();
});

tape('color("#ab") returns rgb(NaN, NaN, NaN)', function(test) {
  var c = color.color("#ab");
  test.ok(c instanceof color.rgb);
  test.ok(isNaN(c.r) && c.r !== c.r);
  test.ok(isNaN(c.g) && c.g !== c.g);
  test.ok(isNaN(c.b) && c.b !== c.b);
  test.end();
});

tape('color("steelblue") returns rgb(70, 130, 180)', function(test) {
  var c = color.color("steelblue");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('color("rgb(70, 130, 180)") returns rgb(70, 130, 180)', function(test) {
  var c = color.color("rgb(70, 130, 180)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('color("rgb(-70,130,180)") returns rgb(0, 130, 180)', function(test) {
  var c = color.color("rgb(-70,130,180)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 0);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('color(" rgb(70,130,+180) ") returns rgb(70, 130, 180)', function(test) {
  var c = color.color(" rgb(70,130,+180) ");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});

tape('color(" rgb(70.5,130,180) ") returns rgb(NaN, NaN, NaN)', function(test) {
  var c = color.color(" rgb(70.5,130,180) ");
  test.ok(c instanceof color.rgb);
  test.ok(isNaN(c.r) && c.r !== c.r);
  test.ok(isNaN(c.g) && c.g !== c.g);
  test.ok(isNaN(c.b) && c.b !== c.b);
  test.end();
});

tape('color("rgb(30%,40%,50%)") returns rgb(77, 102, 128)', function(test) {
  var c = color.color("rgb(30%,40%,50%)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 77);
  test.equal(c.g, 102);
  test.equal(c.b, 128);
  test.end();
});

tape('color("rgb(30%,-40%,50%)") returns rgb(77, 0, 128)', function(test) {
  var c = color.color("rgb(30%,-40%,50%)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 77);
  test.equal(c.g, 0);
  test.equal(c.b, 128);
  test.end();
});

tape('color("rgb(30.5%,40%,50%)") returns rgb(78, 102, 128)', function(test) {
  var c = color.color("rgb(30.5%,40%,50%)");
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 78);
  test.equal(c.g, 102);
  test.equal(c.b, 128);
  test.end();
});

tape('color("rgb(30.5%,40.%,50%)") returns rgb(NaN, NaN, NaN)', function(test) {
  var c = color.color("rgb(30.5%,40.%,50%)");
  test.ok(c instanceof color.rgb);
  test.ok(isNaN(c.r) && c.r !== c.r);
  test.ok(isNaN(c.g) && c.g !== c.g);
  test.ok(isNaN(c.b) && c.b !== c.b);
  test.end();
});

tape('color("hsl(30,40%,50%)") returns hsl(30, .4, .5)', function(test) {
  var c = color.color("hsl(30,40%,50%)");
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 30);
  test.equal(c.s, .4);
  test.equal(c.l, .5);
  test.end();
});

tape('color("hsl(1030,-40%,50.5%)") returns hsl(310, 0, .505)', function(test) {
  var c = color.color("hsl(1030,-40%,50.5%)");
  test.ok(c instanceof color.hsl);
  test.equal(c.h, 310);
  test.equal(c.s, 0);
  test.equal(c.l, .505);
  test.end();
});
