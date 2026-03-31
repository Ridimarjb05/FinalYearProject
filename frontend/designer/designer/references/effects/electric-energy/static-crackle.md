# Static Crackle

**Keywords:** Noise, TV, Interrupt, Sparks, Tiny.

**Description:**
Tiny, random sparks or white noise dots appearing and vanishing quickly.

## Usage

### 1. CSS Noise Background
A noise image background with `steps()` animation to shift the background position.

```css
.static {
  background: url('noise.png');
  animation: static-shift 0.2s steps(4) infinite;
}
@keyframes static-shift {
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
}
```
