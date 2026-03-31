# Spark Shower

**Keywords:** Welding, Grinding, Metal, Bounce, Arc.

**Description:**
Bright yellow/white sparks that fly out, obey gravity, and often bounce off the "floor".

## Usage

### 1. Canvas Physics
Particles with gravity and bounce logic.

```javascript
particle.y += particle.vy;
particle.vy += gravity;
if (particle.y > floor) {
  particle.y = floor;
  particle.vy *= -bounceFactor;
}
```
