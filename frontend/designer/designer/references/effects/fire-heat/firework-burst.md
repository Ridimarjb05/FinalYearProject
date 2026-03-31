# Firework Burst

**Keywords:** Celebrate, Colors, Sky, New Year, Expansion.

**Description:**
A rocket trail going up, followed by a radial burst of colored particles that succumb to gravity and fade.

## Usage

### 1. Canvas / Particles
Two phases:
1. **Launch**: Single particle moving up with a trail.
2. **Explosion**: On death of launch particle, spawn N particles with random angle and velocity.

```javascript
// Explosion logic
for (let i=0; i<100; i++) {
  particles.push(new Particle(x, y, randomColor()));
}
```
