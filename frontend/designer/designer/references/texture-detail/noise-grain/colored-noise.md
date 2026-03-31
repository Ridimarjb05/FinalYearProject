# Colored Noise

**Keywords:** RGB Noise, Rainbow Grain, Glitch.

**Description:**
Noise that contains color variance (RGB) rather than just monochrome (grayscale). Creates a more chaotic, high-energy, or holographic feel.

## Usage

### 1. Canvas Generation
Often generated via JS to get random RGB pixels.

### 2. Image Overlay
Using a colorful noise texture with specific blend modes.

```css
.holo-effect {
  background: linear-gradient(to right, #f0f, #0ff);
}

.holo-effect::after {
  content: "";
  background-image: url('rgb-noise.png');
  mix-blend-mode: overlay;
  opacity: 0.2;
}
```
