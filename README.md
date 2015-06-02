# d3-color

Colorspaces! This code is currently EXPERIMENTAL and represents the in-development D3 4.0 API. The 4.0 API is largely backwards-compatible, but differs from 3.x in several ways:

* Parsing RGB colors with percentages is now supported (e.g., `rgb(30%,40%,50%)`). Decimal values where integers are required are no longer allowed (e.g., `rgb(100.5,0,0)` is not a valid color).

* The rgb.brighter method no longer special-cases behavior for black and very dark channels; it is now a simple channel multiplier, consistent with rgb.darker and implementations in the other colorspaces.

* The rgb.hsl method has been removed; use the hsl constructor to convert any color to the HSL colorspace (e.g., `hsl(rgb)`).

* All colorspaces, including RGB, now support the color.rgb method. This method returns a new color instance representing the nearest-equivalent color in the RGB colorspace.

* Colors are now validated upon construction. For example, an RGB color’s `r`, `g` and `b` values are integers in the range [0,100]. An HSL color’s `h` is a number in the range [0,360), while `s` and `l` are numbers in the range [0,1].
