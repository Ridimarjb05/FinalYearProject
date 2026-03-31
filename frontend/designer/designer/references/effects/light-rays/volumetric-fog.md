# Volumetric Fog

**Keywords:** Haze, Atmosphere, Depth, Mist.

**Description:**
Light scattering through particles in the air, creating a sense of depth and atmosphere. Objects further away are more obscured by the fog color.

## Usage

### 1. CSS Overlay
Layer multiple semi-transparent gradient divs that move slowly.

```css
.fog-layer {
  position: absolute;
  width: 200%; height: 100%;
  background: url('fog-texture.png') repeat-x;
  animation: moveFog 60s linear infinite;
  opacity: 0.5;
}
```

### 2. WebGL Raymarching
Advanced technique. Calculating light accumulation along a ray as it passes through a volume.
