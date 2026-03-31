# Nebula Clouds

**Keywords:** Gas, Space Cloud, Colorful, Ethereal, Fog.

**Description:**
Soft, colorful, gaseous cloud formations. They often move very slowly and have complex color gradients (purples, pinks, blues).

## Usage

### 1. CSS Filter & Blend Modes
Layer multiple distinct colored blobs using `filter: blur()` and `mix-blend-mode: color-dodge` or `screen`.

```css
.nebula-layer {
  filter: blur(80px);
  mix-blend-mode: screen;
  animation: drift 20s infinite alternate;
}
```

### 2. WebGL Noise
Use Perlin noise or Simplex noise shaders to generate procedural clouds with fractal brownian motion (fBm).
