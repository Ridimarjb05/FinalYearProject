# Vignette

**Keywords:** Focus, Dark Edges, Camera, Lens, Mood.

**Description:**
Darkening of the image corners to draw focus to the center.

## Usage

### 1. CSS Radial Gradient
Overlay a `div` with `pointer-events: none`.

```css
.vignette {
  background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%);
}
```
