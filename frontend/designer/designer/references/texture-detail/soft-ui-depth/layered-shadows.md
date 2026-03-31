# Layered Shadows

**Keywords:** Diffusion, Elevation, Realistic Depth.

**Description:**
Using multiple drop shadows on a single element to create a smoother, more realistic "ambient occlusion" type shadow.

## Usage

### 1. Smooth Elevation
Stacking shadows with increasing blur and decreasing opacity.

```css
.smooth-shadow {
  box-shadow:
    0 1px 2px rgba(0,0,0,0.1),
    0 2px 4px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.1),
    0 8px 16px rgba(0,0,0,0.1);
}
```
