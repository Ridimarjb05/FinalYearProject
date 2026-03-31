# Dandelion Seeds

**Keywords:** Wish, Wind, Fluffy, Floating, Summer.

**Description:**
A white seed with a "parachute" structure drifting on the wind.

## Usage

### 1. Canvas / Image Particle
Use a sprite of a dandelion seed.
Physics: High drag (air resistance), affected strongly by wind turbulence.

```javascript
// Wind logic
particle.vx += (windMap(x, y) - particle.vx) * drag;
```
