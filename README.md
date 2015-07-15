# d3-color

Even though your browser understands a lot about colors, it doesn’t offer much help in manipulating colors through JavaScript. The d3-color module therefore provides representations for various color spaces, allowing specification, interpolation, conversion and manipulation.

For example, take the color named “steelblue”:

```js
color("steelblue"); // {r: 70, g: 130, b: 180}
```

Let’s try converting it to HSL:

```js
hsl("steelblue"); // {h: 207.27272727272728, s: 0.44, l: 0.4901960784313726}
```

Now rotate the hue by 90°, bump up the saturation, and format as hex:

```js
c.h += 90;
c.s += .2;
c + ""; // #c62dcd
```

Or to find the perceptual halfway point between steelblue and brown:

```js
interpolateLab("steelblue", "brown")(.5); // #8e5c6d
```

In addition to the ubiquitous and machine-friendly [RGB](#rgb) and [HSL](#hsl) color space, d3-color supports two color spaces that are designed for humans:

* Dave Green’s [Cubehelix](#cubehelix)
* [Lab (CIELAB)](#lab) and [HCL (CIELCH)](#hcl)

Cubehelix features monotonic lightness, while Lab and HCL are perceptually uniform. Note that HCL is the cylindrical form of Lab, similar to how HSL is the cylindrical form of RGB.

## Installing

If you use NPM, `npm install d3-color`. Otherwise, download the [latest release](https://github.com/d3/d3-color/releases/latest).

## API Reference

<a name="color" href="#color">#</a> <b>color</b>(<i>specifier</i>)

Parses the specified [CSS Color Module Level 3](http://www.w3.org/TR/css3-color/#colorunits) *specifier* string, returning an [RGB](#rgb) or [HSL](#hsl) color. If the specifier was not valid, null is returned. Some examples:

* `"rgb(255,255,255)"`
* `"hsl(120,50%,20%)"`
* `"#ffeeaa"`
* `"#fea"`
* `"steelblue"`

The list of supported [named colors](http://www.w3.org/TR/SVG/types.html#ColorKeywords) is specified by CSS.

Note: this function may also be used with `instanceof` to test if an object is a color instance. The same is true of color subclasses, allowing you to test whether a color is in a particular color space.

<a name="color_rgb" href="#color_rgb">#</a> *color*.<b>rgb</b>()

Returns the [RGB equivalent](#rgb) of this color. For RGB colors, that’s `this`.

<a name="color_brighter" href="#color_brighter">#</a> *color*.<b>brighter</b>([<i>k</i>])

Returns a brighter copy of this color. If *k* is specified, it controls how much brighter the returned color should be. If *k* is not specified, it defaults to 1. The behavior of this method is dependent on the implementing color space.

<a name="color_darker" href="#color_darker">#</a> *color*.<b>darker</b>([<i>k</i>])

Returns a darker copy of this color. If *k* is specified, it controls how much brighter the returned color should be. If *k* is not specified, it defaults to 1. The behavior of this method is dependent on the implementing color space.

<a name="color_displayable" href="#color_displayable">#</a> *color*.<b>displayable</b>()

Returns true if and only if the color is displayable on standard hardware. For example, this returns false for an RGB color if any channel value is less than zero or greater than 255.

<a name="color_toString" href="#color_toString">#</a> *color*.<b>toString</b>()

Returns the RGB hexadecimal string representing this color, such as `"#f7eaba"`. If this color is not displayable, a suitable displayable color is returned instead. For example, RGB channel values greater than 255 are clamped to 255.

<a name="rgb" href="#rgb">#</a> <b>rgb</b>(<i>r</i>, <i>g</i>, <i>b</i>)<br>
<a href="#rgb">#</a> <b>rgb</b>(<i>specifier</i>)<br>
<a href="#rgb">#</a> <b>rgb</b>(<i>color</i>)<br>

Constructs a new [RGB](https://en.wikipedia.org/wiki/RGB_color_model) color. The channel values are exposed as `r`, `g` and `b` properties on the returned instance. Use the [RGB color picker](http://bl.ocks.org/mbostock/78d64ca7ef013b4dcf8f) to explore this color space.

If *r*, *g* and *b* are specified, these represent the channel values of the returned color. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the RGB color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb). Note that unlike [*color*.rgb](#color_rgb) this method *always* returns a new instance, even if *color* is already an RGB color.

<a name="hsl" href="#hsl">#</a> <b>hsl</b>(<i>h</i>, <i>s</i>, <i>l</i>)<br>
<a href="#hsl">#</a> <b>hsl</b>(<i>specifier</i>)<br>
<a href="#hsl">#</a> <b>hsl</b>(<i>color</i>)<br>

Constructs a new [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) color. The channel values are exposed as `h`, `s` and `l` properties on the returned instance. Use the [HSL color picker](http://bl.ocks.org/mbostock/debaad4fcce9bcee14cf) to explore this color space.

If *h*, *s* and *l* are specified, these represent the channel values of the returned color. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the HSL color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to HSL. (Colors already in the HSL color space skip the conversion to RGB.)

<a name="lab" href="#lab">#</a> <b>lab</b>(<i>l</i>, <i>a</i>, <i>b</i>)<br>
<a href="#lab">#</a> <b>lab</b>(<i>specifier</i>)<br>
<a href="#lab">#</a> <b>lab</b>(<i>color</i>)<br>

Constructs a new [Lab](https://en.wikipedia.org/wiki/Lab_color_space#CIELAB) color. The channel values are exposed as `l`, `a` and `b` properties on the returned instance. Use the [Lab color picker](http://bl.ocks.org/mbostock/9f37cc207c0cb166921b) to explore this color space.

If *l*, *a* and *b* are specified, these represent the channel values of the returned color. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the Lab color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to Lab. (Colors already in the Lab color space skip the conversion to RGB, and colors in the HCL color space are converted directly to Lab.)

<a name="hcl" href="#hcl">#</a> <b>hcl</b>(<i>h</i>, <i>c</i>, <i>l</i>)<br>
<a href="#hcl">#</a> <b>hcl</b>(<i>specifier</i>)<br>
<a href="#hcl">#</a> <b>hcl</b>(<i>color</i>)<br>

Constructs a new [HCL](https://en.wikipedia.org/wiki/Lab_color_space#CIELAB) color. The channel values are exposed as `h`, `c` and `l` properties on the returned instance. Use the [HCL color picker](http://bl.ocks.org/mbostock/3e115519a1b495e0bd95) to explore this color space.

If *h*, *c* and *l* are specified, these represent the channel values of the returned color. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the HCL color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to HCL. (Colors already in the HCL color space skip the conversion to RGB, and colors in the Lab color space are converted directly to HCL.)

<a name="cubehelix" href="#cubehelix">#</a> <b>cubehelix</b>(<i>h</i>, <i>s</i>, <i>l</i>)<br>
<a href="#cubehelix">#</a> <b>cubehelix</b>(<i>specifier</i>)<br>
<a href="#cubehelix">#</a> <b>cubehelix</b>(<i>color</i>)<br>

Constructs a new [Cubehelix](https://www.mrao.cam.ac.uk/~dag/CUBEHELIX/) color. The channel values are exposed as `h`, `s` and `l` properties on the returned instance. Use the [Cubehelix color picker](http://bl.ocks.org/mbostock/ba8d75e45794c27168b5) to explore this color space.

If *h*, *s* and *l* are specified, these represent the channel values of the returned color. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the Cubehelix color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to Cubehelix. (Colors already in the Cubehelix color space skip the conversion to RGB.)

<a name="interpolateRgb" href="#interpolateRgb">#</a> <b>interpolateRgb</b>(<i>a</i>, <i>b</i>)

![interpolateRgb](https://cloud.githubusercontent.com/assets/230541/8027976/07e91580-0d58-11e5-8d3f-4c50f152a2e3.png)

Returns an RGB color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in RGB; they will be converted to RGB using [rgb](#rgb). The return value of the interpolator is a hexadecimal RGB string.

<a name="interpolateHsl" href="#interpolateHsl">#</a> <b>interpolateHsl</b>(<i>a</i>, <i>b</i>)

![interpolatehsl](https://cloud.githubusercontent.com/assets/230541/8027979/07fec100-0d58-11e5-90df-dc458ae7af10.png)

Returns an HSL color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in HSL; they will be converted to HSL using [hsl](#hsl). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is a hexadecimal RGB string.

<a name="interpolateHslLong" href="#interpolateHslLong">#</a> <b>interpolateHslLong</b>(<i>a</i>, <i>b</i>)

![interpolatehsllong](https://cloud.githubusercontent.com/assets/230541/8028057/bae888b8-0d59-11e5-983a-a460a59ae4ab.png)

Like [interpolateHsl](#interpolateHsl), but does not use the shortest path between hues.

<a name="interpolateLab" href="#interpolateLab">#</a> <b>interpolateLab</b>(<i>a</i>, <i>b</i>)

![interpolatelab](https://cloud.githubusercontent.com/assets/230541/8027977/07eaea04-0d58-11e5-8f4f-b739eb842549.png)

Returns a Lab color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in Lab; they will be converted to Lab using [lab](#lab). The return value of the interpolator is a hexadecimal RGB string.

<a name="interpolateHcl" href="#interpolateHcl">#</a> <b>interpolateHcl</b>(<i>a</i>, <i>b</i>)

![interpolatehcl](https://cloud.githubusercontent.com/assets/230541/8027978/07f91002-0d58-11e5-92f0-f06899907c6a.png)

Returns an HCL color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in HCL; they will be converted to HCL using [hcl](#hcl). If either color’s hue or chroma is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is a hexadecimal RGB string.

<a name="interpolateHclLong" href="#interpolateHclLong">#</a> <b>interpolateHclLong</b>(<i>a</i>, <i>b</i>)

![interpolatehcllong](https://cloud.githubusercontent.com/assets/230541/8028056/bad85786-0d59-11e5-9c22-6c23215779fa.png)

Like [interpolateHcl](#interpolateHcl), but does not use the shortest path between hues.

<a name="interpolateCubehelix" href="#interpolateCubehelix">#</a> <b>interpolateCubehelix</b>(<i>a</i>, <i>b</i>)

![interpolatecubehelix](https://cloud.githubusercontent.com/assets/230541/8027999/737cde08-0d58-11e5-8130-36e2437996ee.png)

Returns a Cubehelix color space interpolator between the two colors *a* and *b* using the default *gamma* of 1.0. The colors *a* and *b* need not be in Cubehelix; they will be converted to Cubehelix using [cubehelix](#cubehelix). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is a hexadecimal RGB string.

<a name="interpolateCubehelixLong" href="#interpolateCubehelixLong">#</a> <b>interpolateCubehelixLong</b>(<i>a</i>, <i>b</i>)

![interpolatecubehelixlong](https://cloud.githubusercontent.com/assets/230541/8028055/bad68424-0d59-11e5-8f0f-1ecdbd8e46c8.png)

Like [interpolateCubehelix](#interpolateCubehelix), but does not use the shortest path between hues.

<a name="interpolateCubehelixGamma" href="#interpolateCubehelixGamma">#</a> <b>interpolateCubehelixGamma</b>(<i>gamma</i>)

Returns a Cubehelix color space interpolator factory using the specified *gamma*. A gamma value less than one emphasizes low intensity values, while a gamma value greater than one emphasizes high intensity values. For example:

```js
var i = interpolateCubehelixGamma(1.5)("red", "blue");
```

<a name="interpolateCubehelixGammaLong" href="#interpolateCubehelixGammaLong">#</a> <b>interpolateCubehelixGammaLong</b>(<i>gamma</i>)

Like [interpolateCubehelixGamma](#interpolateCubehelixGamma), but does not use the shortest path between hues.

## Changes from D3 3.x:

* A new [cubehelix](#cubehelix) color space!

* New “long” methods for hue interpolation in [HSL](#interpolateHslLong), [HCL](#interpolateHclLong) and [Cubehelix](#interpolateCubehelixLong).

* A new [color](#color) method parses the specified string according to the CSS specification and returns the corresponding color in its color space. For HSL color values, this is the HSL color space; for other values, the RGB color space is used. This method correctly parses RGB colors with percentages (e.g., `rgb(30%,40%,50%)`). Decimal values where integers are required are no longer allowed (e.g., `rgb(100.5,0,0)` is not a valid color).

* The [*color*.brighter](#color_brighter) method no longer special-cases behavior for black and very dark channels in RGB; it is now a simple channel multiplier, consistent with [*color*.darker](#color_darker) and other color spaces.

* The *rgb*.hsl method has been removed; use the [hsl constructor](#hsl) to convert to HSL instead.

* All color spaces, including RGB, now support the [*color*.rgb](#color_rgb) method. This method returns a color instance representing the nearest-equivalent color in the RGB color space. Use the [rgb constructor](#rgb) if you want a copy.

* When converting from Lab to HCL, hue and chroma are no longer undefined if the luminance is zero. Thus, the roundtrip from Lab to HCL and back again no longer loses information.
