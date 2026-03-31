# Line Weave

**Keywords:** Net, Grid, Intersect, Connection, Web.

**Description:**
Lines moving across the screen, intersecting and fading. Sometimes they react to the mouse.

## Usage

### 1. Canvas
Store a list of lines `(x, y, dx, dy)`.
Draw each line.
Optional: Draw a circle at intersection points if `intersect(line1, line2)`.

```javascript
// Intersection Check
let ua = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
// ... standard line intersection formula
```
