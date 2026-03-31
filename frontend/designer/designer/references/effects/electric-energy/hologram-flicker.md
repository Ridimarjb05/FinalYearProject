# Hologram Flicker

**Keywords:** Star Wars, Transmission, Glitch, Blue, Opacity.

**Description:**
A projected image that is blue/tinted and occasionally flickers opacity, distorts horizontally, or has scanlines.

## Usage

### 1. CSS & SVG Filter
Apply horizontal displacement map and animate opacity.

```css
.hologram {
  color: #00e5ff;
  opacity: 0.8;
  background-image: linear-gradient(transparent 50%, rgba(0, 229, 255, 0.2) 50%);
  background-size: 4px 4px; /* Scanlines */
  animation: flicker 0.1s infinite;
}
```
