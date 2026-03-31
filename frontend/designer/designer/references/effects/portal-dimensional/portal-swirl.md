# Portal Swirl

**Keywords:** Gateway, Spiral, Magic, Teleport, Entry.

**Description:**
A whirlpool of energy that spirals inward, serving as a door to another place.

## Usage

### 1. WebGL/GLSL Shader
Distorted UV coordinates rotated by time and distance from center.

```glsl
float angle = atan(uv.y, uv.x);
float dist = length(uv);
angle += dist * 10.0 - time * 5.0; // Twist
```
