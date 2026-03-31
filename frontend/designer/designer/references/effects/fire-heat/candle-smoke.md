# Candle Smoke

**Keywords:** Extinguish, Thin, Wisp, Grey, Subtle.

**Description:**
A very thin, delicate grey line of smoke left after blowing out a candle.

## Usage

### 1. SVG Stroke Dashoffset + Blur
Animate a path stroke.

```css
.smoke-path {
  stroke: rgba(200,200,200,0.5);
  stroke-width: 2;
  filter: blur(2px);
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: rise 2s linear forwards;
}
```
