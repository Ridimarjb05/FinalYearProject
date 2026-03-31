# EMP Wave

**Keywords:** Distortion, Glitch, Ripple, Electronic, Shutdown.

**Description:**
A visible wave that causes electronic elements to glitch or distort as it passes over them.

## Usage

### 1. Canvas / WebGL Post-Processing
Apply a chromatic aberration and displacement shader to the screen buffer. The intensity is determined by the distance from the EMP wave ring.

```glsl
float dist = distance(uv, center);
if (dist > time && dist < time + width) {
  uv.x += sin(uv.y * 50.0) * strength;
  color.rb = texture(uv + offset).rb; // Chromatic split
}
```
