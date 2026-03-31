# Film Grain

**Keywords:** Analog, Texture, Cinematic, noisy.

**Description:**
Simulating the random optical texture of photographic film. Adds grit, realism, and can reduce color banding in gradients.

## Usage

### 1. SVG Filter (Best Quality)
Using an SVG noise filter overlay.

```css
.grain-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,..."); /* SVG noise pattern */
}
```

### 2. CSS Noise Image
Using a noise image tile.

```css
.grain-bg {
  background-color: #111;
  background-image: url('/textures/noise.png');
  background-repeat: repeat;
}
```
