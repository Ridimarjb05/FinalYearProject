# Tesseract Rotate

**Keywords:** 4D, Hypercube, Math, Dimensional, Complex.

**Description:**
A 4-dimensional hypercube (tesseract) projected into 3D space, rotating. It looks like a cube inside a cube, turning inside-out.

## Usage

### 1. Canvas / WebGL 4D Projection
Store 4D coordinates `(x, y, z, w)` and project them down to 3D, then 2D.
Rotation involves 6 possible planes in 4D (XY, XZ, XW, YZ, YW, ZW).

```javascript
// Rotate in XW plane
x = x * cos(t) - w * sin(t);
w = x * sin(t) + w * cos(t);
```
