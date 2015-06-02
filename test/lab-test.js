var tape = require("tape"),
    color = require("../");

tape('lab(l, a, b) returns the expected Lab color', function(test) {
  var c = color.lab(52.46551718768575, -4.0774710123572255, -32.19186122981343);
  test.ok(c instanceof color.lab);
  test.equal(c.l, 52.46551718768575);
  test.equal(c.a, -4.0774710123572255);
  test.equal(c.b, -32.19186122981343);
  test.end();
});

tape('lab(l, a, b) clamps l to the range [0,100]', function(test) {
  var c = color.lab(200, 1, 2);
  test.ok(c instanceof color.lab);
  test.equal(c.l, 100);
  test.equal(c.a, 1);
  test.equal(c.b, 2);
  var c = color.lab(-100, 1, 2);
  test.ok(c instanceof color.lab);
  test.equal(c.l, 0);
  test.equal(c.a, 1);
  test.equal(c.b, 2);
  test.end();
});

tape('lab(l, a, b) allows NaN channel values', function(test) {
  var c = color.lab(undefined, NaN, "foo");
  test.ok(c instanceof color.lab);
  test.ok(isNaN(c.l) && (c.l !== c.l));
  test.ok(isNaN(c.a) && (c.a !== c.a));
  test.ok(isNaN(c.b) && (c.b !== c.b));
  test.end();
});

tape('lab.rgb returns the expected RGB color', function(test) {
  var c = color.lab(52.46551718768575, -4.0774710123572255, -32.19186122981343).rgb();
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});
