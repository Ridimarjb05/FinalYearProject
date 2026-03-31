# Grass Sway

**Keywords:** Wind, Vegetation, Field, Green, Nature.

**Description:**
Blades of grass bending in waves as wind passes over them.

## Usage

### 1. SVG & CSS skew
Animate the `skewX` of grass blade elements.

### 2. Vertex Shader (WebGL)
The standard game dev approach. Displace the top vertices of grass geometry based on a scrolling noise map (wind) while keeping bottom vertices fixed.

```glsl
vec3 pos = position;
float noise = texture(windMap, uv + time).r;
pos.x += noise * strength * uv.y; // uv.y is 0 at bottom, 1 at top
```
