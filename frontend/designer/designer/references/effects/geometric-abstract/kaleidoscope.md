# Kaleidoscope

**Keywords:** Mirror, Symmetry, Rotate, Pattern, Trippy.

**Description:**
An image or pattern reflected multiple times across radial axes to create a symmetrical design.

## Usage

### 1. Canvas Context Transformation
Rotate the context and draw the same slice image multiple times.

```javascript
for (let i = 0; i < segments; i++) {
  ctx.save();
  ctx.rotate((PI * 2 / segments) * i);
  ctx.scale(i % 2 === 0 ? 1 : -1, 1); // Mirror alternating
  drawSlice();
  ctx.restore();
}
```
