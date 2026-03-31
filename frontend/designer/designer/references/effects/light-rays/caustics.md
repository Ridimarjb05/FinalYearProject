# Caustics

**Keywords:** Water, Glass, Refraction, Light Pattern, Pool.

**Description:**
The complex pattern of light focusing created when light passes through a wavy surface like water or glass.

## Usage

### 1. WebGL Shader
This is complex to calculate physically. Standard approach is to use a specific caustic texture or noise texture and scroll it/warp it.

```glsl
// A simple fake: Voronoi noise or summed sine waves
float c = sin(x + time) + sin(y + time);
color = vec3(c*c); // Sharpens the waves to look like light lines
```
