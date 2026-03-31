# Charge Buildup

**Keywords:** Gathering, Inward, Power Up, Particles.

**Description:**
Particles suctioning INWARDS to a central point, speeding up and getting brighter.

## Usage

### 1. Particles (Reverse Gravity)
Spawn particles in a circle around the center and move them towards `(cx, cy)` with increasing velocity.

```javascript
// Particle Logic
dx = cx - x;
dy = cy - y;
x += dx * speed;
y += dy * speed;
```
