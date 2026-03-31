# Wireframe Morph

**Keywords:** Mesh, Topology, Scan, Transition, Shape.

**Description:**
A 3D grid or mesh that changes shape (e.g., from a sphere to a cube) while visible as lines.

## Usage

### 1. Three.js / WebGL
Interpolate vertex positions between two geometries.

```javascript
position.x = lerp(spherePos.x, cubePos.x, t);
```
Render with `THREE.WireframeGeometry` or `gl.LINES`.
