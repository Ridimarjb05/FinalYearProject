# Reel Flicker

**Keywords:** Old Movie, Projector, Strobe, Brightness, 24fps.

**Description:**
Subtle or rapid changes in global brightness to simulate an old film projector bulb or shutter.

## Usage

### 1. CSS Opacity Animation
Overlay a black or white div with low opacity (e.g., 0.05 to 0.1).
Animate opacity randomly or with a high-speed loop.

```css
@keyframes flicker {
  0% { opacity: 0.1; }
  10% { opacity: 0.05; }
  20% { opacity: 0.15; }
  /* ... */
}
```
