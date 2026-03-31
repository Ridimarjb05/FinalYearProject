# Shield Bubble

**Keywords:** Protection, Sphere, Deflect, Blue, Force.

**Description:**
A transparent sphere around a target that ripples when hit.

## Usage

### 1. Shader Fresnel
Render a sphere.
Opacity is controlled by dot product of normal and view vector `(1 - dot(N, V))`.
Add a "ripple" distortion at the point of impact passed via uniform.
