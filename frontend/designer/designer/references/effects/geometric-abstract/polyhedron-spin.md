# Polyhedron Spin

**Keywords:** D20, Platonic Solid, Math, Gaming, Geometry.

**Description:**
Rotating 3D shapes like Icosahedrons (d20) or Dodecahedrons.

## Usage

### 1. CSS 3D
Construct a 3D shape using `transform-style: preserve-3d` and multiple faces rotated and translated into place.

```css
.face:nth-child(1) { transform: rotateY(0deg) translateZ(50px); }
.face:nth-child(2) { transform: rotateY(90deg) translateZ(50px); }
/* etc... */
```
