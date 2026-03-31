# Shockwave Ring

**Keywords:** Impact, Blast, Distortion, Circle, Force.

**Description:**
A fast-expanding ring that distorts the background visible through it, pushing pixels outwards.

## Usage

### 1. WebGL Post-Processing
Distort UV coordinates based on distance from ring center.

```glsl
float dist = distance(uv, center);
float mask = smoothstep(radius, radius - thickness, dist) * smoothstep(radius - thickness - feather, radius - thickness, dist);
uv += dir * mask * strength;
```

### 2. CSS Scale & Border
A simple div with `border: 2px solid white` that scales up and fades out.
