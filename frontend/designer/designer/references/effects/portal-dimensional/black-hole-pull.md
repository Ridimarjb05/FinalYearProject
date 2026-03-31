# Black Hole Pull

**Keywords:** Gravity, Accretion Disk, Suck, Lens, Space.

**Description:**
Extreme distortion around a black circle, bending the background image into a ring (Einstein Ring).

## Usage

### 1. WebGL Post-Processing
Distort UVs based on inverse distance from screen center.

```glsl
vec2 dir = uv - center;
float dist = length(dir);
vec2 offset = normalize(dir) * (strength / dist);
color = texture(bg, uv + offset);
```
