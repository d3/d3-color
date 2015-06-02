var tape = require("tape"),
    color = require("../");

tape('hcl(h, c, l) returns the expected Lch color', function(test) {
  var c = color.hcl(-97.21873224090723, 32.44906314974561, 52.46551718768575);
  test.ok(c instanceof color.hcl);
  test.equal(c.h, 262.78126775909277);
  test.equal(c.c, 32.44906314974561);
  test.equal(c.l, 52.46551718768575);
  test.end();
});

tape('hcl(h, c, l) clamps l to the range [0,100]', function(test) {
  var c = color.hcl(1, 2, 200);
  test.ok(c instanceof color.hcl);
  test.equal(c.h, 1);
  test.equal(c.c, 2);
  test.equal(c.l, 100);
  var c = color.hcl(1, 2, -100);
  test.ok(c instanceof color.hcl);
  test.equal(c.h, 1);
  test.equal(c.c, 2);
  test.equal(c.l, 0);
  test.end();
});

tape('hcl(h, c, l) allows NaN channel values', function(test) {
  var c = color.hcl(undefined, NaN, "foo");
  test.ok(c instanceof color.hcl);
  test.ok(isNaN(c.h) && (c.h !== c.h));
  test.ok(isNaN(c.c) && (c.c !== c.c));
  test.ok(isNaN(c.l) && (c.l !== c.l));
  test.end();
});

tape('hcl.rgb returns the expected RGB color', function(test) {
  var c = color.hcl(262.78126775909277, 32.44906314974561, 52.46551718768575).rgb();
  test.ok(c instanceof color.rgb);
  test.equal(c.r, 70);
  test.equal(c.g, 130);
  test.equal(c.b, 180);
  test.end();
});
