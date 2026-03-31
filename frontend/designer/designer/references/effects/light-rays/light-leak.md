# Light Leak

**Keywords:** Film, Vintage, Burn, Overlay, Warmth.

**Description:**
Light sneaking into the camera body, causing washed-out, warm-colored patches on the film.

## Usage

### 1. CSS Overlay & Blend Modes
Use a large, blurred gradient blob positioned off-screen or at the edges.

```css
.light-leak {
  position: absolute;
  top: -50px; left: -50px;
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(255,200,100,0.4) 0%, transparent 70%);
  mix-blend-mode: screen;
  filter: blur(20px);
  animation: flicker 5s infinite;
}
```
