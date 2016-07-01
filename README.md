# d3-hcg

This module implements the HCG (Hue, Chroma, Grayness) color space.

## Installing

If you use NPM, `npm install d3-hcg`. Otherwise, download the [latest release](https://github.com/d3/d3-hcg/releases/latest). You can also load directly from [d3js.org](https://d3js.org) as a [standalone library](https://d3js.org/d3-hcg.v0.0.min.js). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-color.v0.5.min.js"></script>
<script src="https://d3js.org/d3-hcg.v0.0.min.js"></script>
<script>

var yellow = d3.hcg("yellow"); // {h: 60, s: 1, v: 1, opacity: 1}

</script>
```

[Try d3-hcg in your browser.](https://tonicdev.com/npm/d3-hcg)

## API Reference

<a name="hcg" href="#hcg">#</a> d3.<b>hcg</b>(<i>h</i>, <i>c</i>, <i>g</i>[, <i>opacity</i>])<br>
<a href="#hcg">#</a> d3.<b>hcg</b>(<i>specifier</i>)<br>
<a href="#hcg">#</a> d3.<b>hcg</b>(<i>color</i>)<br>

Constructs a new hcg color. The channel values are exposed as `h`, `c` and `g` properties on the returned instance.

If *h*, *c* and *g* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the HCG color space. See [d3.color](https://github.com/d3/d3-color#color) for examples. If a [*color*](https://github.com/d3/d3-color#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](https://github.com/d3/d3-color#color_rgb) and then converted to HGC.
