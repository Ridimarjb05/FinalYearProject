# Explosion Burst

**Keywords:** Boom, Blast, Radial, Fireball, Debris.

**Description:**
A rapid outward expansion of fiery particles and shockwave rings, followed by a slower dissipation.

## Usage

### 1. CSS Scale & Opacity
Multiple overlapping circles that scale up rapidly and fade out.

```css
@keyframes explode {
  0% { transform: scale(0); opacity: 1; }
  50% { opacity: 0.8; }
  100% { transform: scale(3); opacity: 0; }
}
```

### 2. Particles
Emit a burst of particles in all directions `(0 to 360 deg)` simultaneously with high initial velocity that decays (friction).
