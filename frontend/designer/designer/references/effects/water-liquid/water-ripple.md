# Water Ripple

**Keywords:** Pond, Splash, Concentric, Wave, Disturbance.

**Description:**
Concentric rings expanding outwards from a point of impact, fading as they grow.

## Usage

### 1. Javascript & CSS
On click, create a `div` that expands.

```css
.ripple {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  animation: ripple-effect 1s linear forwards;
}

@keyframes ripple-effect {
  to { transform: scale(4); opacity: 0; }
}
```

### 2. WebGL Displacement Mapping
Distort an underlying image based on a height map that looks like ripples.
