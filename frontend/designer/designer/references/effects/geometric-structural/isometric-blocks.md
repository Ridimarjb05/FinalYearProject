# Isometric Blocks

**Keywords:** 2.5D, Orthographic, Stacking, Building, Pixel Art style.

**Description:**
Elements rendered in isometric projection (rotated 45°, tilted 35.264°). Great for showing "building blocks," modularity, or infrastructure without full 3D overhead.

## Usage

### 1. Pure CSS Transformation
The classic formula for isometric projection.

```css
.iso-container {
    transform: rotateX(60deg) rotateZ(-45deg);
    /* Note: Values vary based on exact "True Isometric" vs "Web Isometric" preference */
}

.block {
    position: relative;
    width: 50px;
    height: 50px;
    background: #475569;
    transform-style: preserve-3d;
    transition: transform 0.3s;
}

/* Pseudo-elements for sides/depth */
.block::before {
    content: '';
    position: absolute;
    left: -10px; 
    width: 10px; 
    height: 100%;
    background: #334155; /* Darker side */
    transform-origin: right;
    transform: rotateY(-90deg);
}

.block::after {
    content: '';
    position: absolute;
    top: -10px;
    width: 100%;
    height: 10px;
    background: #64748b; /* Lighter top */
    transform-origin: bottom;
    transform: rotateX(90deg);
}

.block:hover {
    transform: translateZ(20px); /* Pops "up" */
}
```

### 2. Canvas Rendering
Drawing simple parallelograms for high-performance grids.

```javascript
function drawIsoCube(ctx, x, y, size, color) {
    // Top Face
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y - size/2);
    ctx.lineTo(x + 2*size, y);
    ctx.lineTo(x + size, y + size/2);
    ctx.fillStyle = lighten(color, 20);
    ctx.fill();
    
    // Right Face
    // ... drawing separate polygons for 3 faces
}
```
