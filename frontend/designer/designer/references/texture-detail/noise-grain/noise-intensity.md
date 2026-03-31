# Noise Intensity

**Keywords:** Opacity, Scale, Aggressiveness.

**Description:**
Controlling the strength of the texture.
*   **Low (1-5%)**: Professional, subtle, paper-like.
*   **Medium (10-20%)**: Retro, filmic, aged.
*   **High (30%+ )**: Industrial, gritty, distorted.

## Usage

### 1. Variable Control
Using CSS variables to tune intensity.

```css
:root {
  --noise-opacity: 0.05;
}

.surface {
  isolation: isolate;
}

.surface::after {
  opacity: var(--noise-opacity);
  /* ... noise setup ... */
}
```
