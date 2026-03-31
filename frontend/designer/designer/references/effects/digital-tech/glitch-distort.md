# Glitch Distort

**Keywords:** Error, Bug, Cyber, Corruption, Horizontal.

**Description:**
Random horizontal displacement of slices of the image, often accompanied by chromatic aberration (RGB split).

## Usage

### 1. CSS Clip-Path Animation
Create 2 copies of the element (::before, ::after) and animate their `clip-path: inset(...)` and `transform: translate(...)` randomly.

```css
@keyframes glitch-anim {
  0% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 0); }
  20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 0); }
  /* ... */
}
```
