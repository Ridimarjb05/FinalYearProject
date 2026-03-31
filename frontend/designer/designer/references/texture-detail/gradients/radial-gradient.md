# Radial Gradient

**Keywords:** Circular, Spotlight, Vignette.

**Description:**
Colors radiating from a central point (or custom point) outwards. Excellent for creating focal points or mimicking lighting.

## Usage

### 1. Simple Vignette
Darkening edges.

```css
.vignette {
  background: radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 100%);
}
```

### 2. Off-Center Light
Simulating a light source.

```css
.spotlight {
  background: radial-gradient(circle at 20% 30%, #fff, #000);
}
```
