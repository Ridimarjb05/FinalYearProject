# Sacred Geometry

**Keywords:** Flower of Life, Mandala, Divine, Symmetry, Ratio.

**Description:**
Overlapping circles, triangles, or polygons forming complex, spiritually resonating patterns.

## Usage

### 1. SVG Stroke Animation
Draw the full pattern in Illustrator, then animate `stroke-dashoffset` to "draw" the lines.

### 2. Canvas Recursion
Recursive function to draw circles at intersection points of previous circles.

```javascript
function drawFlower(x, y, r, depth) {
  if (depth === 0) return;
  drawCircle(x, y, r);
  for (let i = 0; i < 6; i++) {
    // Calculate new centers
    drawFlower(nx, ny, r, depth - 1);
  }
}
```
