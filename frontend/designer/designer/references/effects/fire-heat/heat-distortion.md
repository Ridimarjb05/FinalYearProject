# Heat Distortion

**Keywords:** Shimmer, Mirage, Haze, Hot Air, Displacement.

**Description:**
A visual distortion of the background behind a hot object, making it look wavy or liquid.

## Usage

### 1. SVG Turbulence Filter
A `feTurbulence` and `feDisplacementMap` filter applied to an element.

```html
<filter id="heat">
  <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence"/>
  <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="10" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```

### 2. WebGL Shader
Sample the background texture with an offset based on a noise map that scrolls upwards.
