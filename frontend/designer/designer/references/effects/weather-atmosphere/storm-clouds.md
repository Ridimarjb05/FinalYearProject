# Storm Clouds

**Keywords:** Thunder, Dark, Grey, Threatening, Rain.

**Description:**
Dark, dense cloud formations that change shape (churn) internally rather than just drifting.

## Usage

### 1. WebGL Shader
Fractal Brownian Motion (fBm) with dark colors (grey/purple). Animate the domain warping to simulate turbulence.

```glsl
fbm(p + fbm(p + time));
```
