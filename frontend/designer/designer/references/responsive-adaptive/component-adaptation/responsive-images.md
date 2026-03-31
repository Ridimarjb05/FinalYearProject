# Responsive Images

**Keywords:** Srcset, Picture Element, Art Direction, Fluid Images.

**Description:**
Serving different image sizes or even completely different crops (art direction) depending on the screen size to save bandwidth and improve composition.

## Usage

### 1. Basic Fluidity
Image scales with container.

```css
img {
  max-width: 100%;
  height: auto;
}
```

### 2. Art Direction (`<picture>`)
Switching image files entirely.

```html
<picture>
  <!-- Mobile Portrait Crop -->
  <source media="(max-width: 799px)" srcset="hero-portrait.jpg">
  <!-- Desktop Wide -->
  <source media="(min-width: 800px)" srcset="hero-landscape.jpg">
  <img src="hero-landscape.jpg" alt="Hero">
</picture>
```
