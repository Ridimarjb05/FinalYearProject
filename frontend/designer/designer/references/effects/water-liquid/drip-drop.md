# Drip Drop

**Keywords:** Leak, Faucet, Splat, Wet, Slow.

**Description:**
A single droplet accumulating, stretching, falling, and then splashing.

## Usage

### 1. CSS Keyframes & SVG Morph
Morph a circle into a teardrop shape, move it down, then replace it with a splash animation.

```css
@keyframes drip-fall {
  0% { transform: translateY(0) scaleY(1); }
  80% { transform: translateY(200px) scaleY(1.5); opacity: 1; }
  100% { transform: translateY(210px) scaleY(0.5); opacity: 0; }
}
```
