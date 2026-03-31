# Wormhole Bend

**Keywords:** Interstellar, Fold, Physics, Reflection, Sphere.

**Description:**
A spherical distortion that shows a reflection of a completely different environment, bending around the edges.

## Usage

### 1. WebGL Cube Map
In a pixel shader for a sphere geometry, reflect the view ray based on surface normal but sample a *different* CubeMap texture than the environment.
Limit reflection Fresnel to center only.
