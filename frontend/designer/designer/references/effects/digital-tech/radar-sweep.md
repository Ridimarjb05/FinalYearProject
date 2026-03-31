# Radar Sweep

**Keywords:** Detection, Map, Rotate, Scan, Green.

**Description:**
A rotating line (radius) that leaves a fading trail behind it, revealing objects.

## Usage

### 1. CSS Conic Gradient
A conic gradient with hard stops for the lead line and a soft fade for the trail.
Rotate the element.

```css
.radar {
  background: conic-gradient(from 0deg, transparent 0deg, rgba(0,255,0,0.5) 300deg, #0f0 360deg);
  border-radius: 50%;
  animation: spin 4s linear infinite;
}
```
