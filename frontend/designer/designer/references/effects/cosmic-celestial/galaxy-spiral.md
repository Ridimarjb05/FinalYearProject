# Galaxy Spiral

**Keywords:** Milky Way, Spiral Arms, Rotation, Black Hole.

**Description:**
A structure of stars and dust rotating around a central point, often with distinct arms.

## Usage

### 1. CSS 3D Transforms
Construct spiral arms using rotated containers.

### 2. Canvas / Particles
Generate particles using the logarithmic spiral equation:
`r = a * e^(b * theta)`

```javascript
// For each arm
theta += 0.1;
radius = offset + theta * spread;
x = centerX + cos(theta + rotation) * radius;
y = centerY + sin(theta + rotation) * radius;
```
