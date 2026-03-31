# Cloud Drift

**Keywords:** Sky, Cumulus, Fluffy, Chill, Background.

**Description:**
Layers of clouds moving slowly across the sky, often at different speeds (parallax) to create depth.

## Usage

### 1. CSS Background Position
Multiple background images of clouds that scroll horizontally.

```css
.sky {
  background-image: url('clouds-back.png'), url('clouds-front.png');
  animation: scrollSky 60s linear infinite;
}
@keyframes scrollSky {
  to { background-position: 1000px 0, 2000px 0; }
}
```
