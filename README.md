# d3-color

Colorspaces! This code is currently EXPERIMENTAL and represents the in-development D3 4.0 API. The 4.0 API is largely backwards-compatible, but differs from 3.x in several ways:

* A new color method parses the specified string according to [CSS Color Module Level 3](http://www.w3.org/TR/css3-color/#colorunits) and returns the corresponding color in its colorspace. For HSL color values, this is the HSL colorspace; for other values, the RGB colorspace is used.

* In addition, the color method now correctly parses RGB colors with percentages (e.g., `rgb(30%,40%,50%)`). Decimal values where integers are required are no longer allowed (e.g., `rgb(100.5,0,0)` is not a valid color).

* The rgb.brighter method no longer special-cases behavior for black and very dark channels; it is now a simple channel multiplier, consistent with rgb.darker and implementations in the other colorspaces.

* The rgb.hsl method has been removed; use the appropriate constructor to convert any desired colorspace (e.g., `hsl(foo)`).

* All colorspaces, including RGB, now support the color.rgb method. This method returns a color instance representing the nearest-equivalent color in the RGB colorspace. For RGB colors, it returns `this`. Use the rgb constructor if you want a copy.

* When converting to HCL, hue and chroma are no longer undefined if the luminance is zero. Thus, the roundtrip from Lab to HCL and back again no longer loses information.

* Colors are now validated upon construction. For example, an RGB color’s `r`, `g` and `b` values are integers in the range [0,100]; an HSL color’s `h` is a number in the range [0,360), while `s` and `l` are numbers in the range [0,1].
