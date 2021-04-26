import assert from "assert";
import {assertHslEqual, assertRgbApproxEqual, assertRgbEqual} from "./asserts.js";
import * as d3 from "../src/index.js";

it("color(format) parses CSS color names (e.g., \"rebeccapurple\")", () => {
  assertRgbApproxEqual(d3.color("moccasin"), 255, 228, 181, 1);
  assertRgbApproxEqual(d3.color("aliceblue"), 240, 248, 255, 1);
  assertRgbApproxEqual(d3.color("yellow"), 255, 255, 0, 1);
  assertRgbApproxEqual(d3.color("moccasin"), 255, 228, 181, 1);
  assertRgbApproxEqual(d3.color("aliceblue"), 240, 248, 255, 1);
  assertRgbApproxEqual(d3.color("yellow"), 255, 255, 0, 1);
  assertRgbApproxEqual(d3.color("rebeccapurple"), 102, 51, 153, 1);
  assertRgbApproxEqual(d3.color("transparent"), NaN, NaN, NaN, 0);
});

it("color(format) parses 6-digit hexadecimal (e.g., \"#abcdef\")", () => {
  assertRgbApproxEqual(d3.color("#abcdef"), 171, 205, 239, 1);
});

it("color(format) parses 3-digit hexadecimal (e.g., \"#abc\")", () => {
  assertRgbApproxEqual(d3.color("#abc"), 170, 187, 204, 1);
});

it("color(format) does not parse 7-digit hexadecimal (e.g., \"#abcdef3\")", () => {
  assert.strictEqual(d3.color("#abcdef3"), null);
});

it("color(format) parses 8-digit hexadecimal (e.g., \"#abcdef33\")", () => {
  assertRgbApproxEqual(d3.color("#abcdef33"), 171, 205, 239, 0.2);
});

it("color(format) parses 4-digit hexadecimal (e.g., \"#abc3\")", () => {
  assertRgbApproxEqual(d3.color("#abc3"), 170, 187, 204, 0.2);
});

it("color(format) parses RGB integer format (e.g., \"rgb(12,34,56)\")", () => {
  assertRgbApproxEqual(d3.color("rgb(12,34,56)"), 12, 34, 56, 1);
});

it("color(format) parses RGBA integer format (e.g., \"rgba(12,34,56,0.4)\")", () => {
  assertRgbApproxEqual(d3.color("rgba(12,34,56,0.4)"), 12, 34, 56, 0.4);
});

it("color(format) parses RGB percentage format (e.g., \"rgb(12%,34%,56%)\")", () => {
  assertRgbApproxEqual(d3.color("rgb(12%,34%,56%)"), 31, 87, 143, 1);
  assertRgbEqual(d3.color("rgb(100%,100%,100%)"), 255, 255, 255, 1);
});

it("color(format) parses RGBA percentage format (e.g., \"rgba(12%,34%,56%,0.4)\")", () => {
  assertRgbApproxEqual(d3.color("rgba(12%,34%,56%,0.4)"), 31, 87, 143, 0.4);
  assertRgbEqual(d3.color("rgba(100%,100%,100%,0.4)"), 255, 255, 255, 0.4);
});

it("color(format) parses HSL format (e.g., \"hsl(60,100%,20%)\")", () => {
  assertHslEqual(d3.color("hsl(60,100%,20%)"), 60, 1, 0.2, 1);
});

it("color(format) parses HSLA format (e.g., \"hsla(60,100%,20%,0.4)\")", () => {
  assertHslEqual(d3.color("hsla(60,100%,20%,0.4)"), 60, 1, 0.2, 0.4);
});

it("color(format) ignores leading and trailing whitespace", () => {
  assertRgbApproxEqual(d3.color(" aliceblue\t\n"), 240, 248, 255, 1);
  assertRgbApproxEqual(d3.color(" #abc\t\n"), 170, 187, 204, 1);
  assertRgbApproxEqual(d3.color(" #aabbcc\t\n"), 170, 187, 204, 1);
  assertRgbApproxEqual(d3.color(" rgb(120,30,50)\t\n"), 120, 30, 50, 1);
  assertHslEqual(d3.color(" hsl(120,30%,50%)\t\n"), 120, 0.3, 0.5, 1);
});

it("color(format) ignores whitespace between numbers", () => {
  assertRgbApproxEqual(d3.color(" rgb( 120 , 30 , 50 ) "), 120, 30, 50, 1);
  assertHslEqual(d3.color(" hsl( 120 , 30% , 50% ) "), 120, 0.3, 0.5, 1);
  assertRgbApproxEqual(d3.color(" rgba( 12 , 34 , 56 , 0.4 ) "), 12, 34, 56, 0.4);
  assertRgbApproxEqual(d3.color(" rgba( 12% , 34% , 56% , 0.4 ) "), 31, 87, 143, 0.4);
  assertHslEqual(d3.color(" hsla( 60 , 100% , 20% , 0.4 ) "), 60, 1, 0.2, 0.4);
});

it("color(format) allows number signs", () => {
  assertRgbApproxEqual(d3.color("rgb(+120,+30,+50)"), 120, 30, 50, 1);
  assertHslEqual(d3.color("hsl(+120,+30%,+50%)"), 120, 0.3, 0.5, 1);
  assertRgbApproxEqual(d3.color("rgb(-120,-30,-50)"), -120, -30, -50, 1);
  assertHslEqual(d3.color("hsl(-120,-30%,-50%)"), NaN, NaN, -0.5, 1);
  assertRgbApproxEqual(d3.color("rgba(12,34,56,+0.4)"), 12, 34, 56, 0.4);
  assertRgbApproxEqual(d3.color("rgba(12,34,56,-0.4)"), NaN, NaN, NaN, -0.4);
  assertRgbApproxEqual(d3.color("rgba(12%,34%,56%,+0.4)"), 31, 87, 143, 0.4);
  assertRgbApproxEqual(d3.color("rgba(12%,34%,56%,-0.4)"), NaN, NaN, NaN, -0.4);
  assertHslEqual(d3.color("hsla(60,100%,20%,+0.4)"), 60, 1, 0.2, 0.4);
  assertHslEqual(d3.color("hsla(60,100%,20%,-0.4)"), NaN, NaN, NaN, -0.4);
});

it("color(format) allows decimals for non-integer values", () => {
  assertRgbApproxEqual(d3.color("rgb(20.0%,30.4%,51.2%)"), 51, 78, 131, 1);
  assertHslEqual(d3.color("hsl(20.0,30.4%,51.2%)"), 20, 0.304, 0.512, 1);
});

it("color(format) allows leading decimal for hue, opacity and percentages", () => {
  assertHslEqual(d3.color("hsl(.9,.3%,.5%)"), 0.9, 0.003, 0.005, 1);
  assertHslEqual(d3.color("hsla(.9,.3%,.5%,.5)"), 0.9, 0.003, 0.005, 0.5);
  assertRgbApproxEqual(d3.color("rgb(.1%,.2%,.3%)"), 0, 1, 1, 1);
  assertRgbApproxEqual(d3.color("rgba(120,30,50,.5)"), 120, 30, 50, 0.5);
});

it("color(format) allows exponential format for hue, opacity and percentages", () => {
  assertHslEqual(d3.color("hsl(1e1,2e1%,3e1%)"), 10, 0.2, 0.3, 1);
  assertHslEqual(d3.color("hsla(9e-1,3e-1%,5e-1%,5e-1)"), 0.9, 0.003, 0.005, 0.5);
  assertRgbApproxEqual(d3.color("rgb(1e-1%,2e-1%,3e-1%)"), 0, 1, 1, 1);
  assertRgbApproxEqual(d3.color("rgba(120,30,50,1e-1)"), 120, 30, 50, 0.1);
});

it("color(format) does not allow decimals for integer values", () => {
  assert.strictEqual(d3.color("rgb(120.5,30,50)"), null);
});

it("color(format) does not allow empty decimals", () => {
  assert.strictEqual(d3.color("rgb(120.,30,50)"), null);
  assert.strictEqual(d3.color("rgb(120.%,30%,50%)"), null);
  assert.strictEqual(d3.color("rgba(120,30,50,1.)"), null);
  assert.strictEqual(d3.color("rgba(12%,30%,50%,1.)"), null);
  assert.strictEqual(d3.color("hsla(60,100%,20%,1.)"), null);
});

it("color(format) does not allow made-up names", () => {
  assert.strictEqual(d3.color("bostock"), null);
});

it("color(format) allows achromatic colors", () => {
  assertRgbApproxEqual(d3.color("rgba(0,0,0,0)"), NaN, NaN, NaN, 0);
  assertRgbApproxEqual(d3.color("#0000"), NaN, NaN, NaN, 0);
  assertRgbApproxEqual(d3.color("#00000000"), NaN, NaN, NaN, 0);
});

it("color(format) does not allow whitespace before open paren or percent sign", () => {
  assert.strictEqual(d3.color("rgb (120,30,50)"), null);
  assert.strictEqual(d3.color("rgb (12%,30%,50%)"), null);
  assert.strictEqual(d3.color("hsl (120,30%,50%)"), null);
  assert.strictEqual(d3.color("hsl(120,30 %,50%)"), null);
  assert.strictEqual(d3.color("rgba (120,30,50,1)"), null);
  assert.strictEqual(d3.color("rgba (12%,30%,50%,1)"), null);
  assert.strictEqual(d3.color("hsla (120,30%,50%,1)"), null);
});

it("color(format) is case-insensitive", () => {
  assertRgbApproxEqual(d3.color("aLiCeBlUE"), 240, 248, 255, 1);
  assertRgbApproxEqual(d3.color("transPARENT"), NaN, NaN, NaN, 0);
  assertRgbApproxEqual(d3.color(" #aBc\t\n"), 170, 187, 204, 1);
  assertRgbApproxEqual(d3.color(" #aaBBCC\t\n"), 170, 187, 204, 1);
  assertRgbApproxEqual(d3.color(" rGB(120,30,50)\t\n"), 120, 30, 50, 1);
  assertHslEqual(d3.color(" HSl(120,30%,50%)\t\n"), 120, 0.3, 0.5, 1);
});

it("color(format) returns undefined RGB channel values for unknown formats", () => {
  assert.strictEqual(d3.color("invalid"), null);
  assert.strictEqual(d3.color("hasOwnProperty"), null);
  assert.strictEqual(d3.color("__proto__"), null);
  assert.strictEqual(d3.color("#ab"), null);
});

it("color(format).hex() returns a hexadecimal string", () => {
  assert.strictEqual(d3.color("rgba(12%,34%,56%,0.4)").hex(), "#1f578f");
});
