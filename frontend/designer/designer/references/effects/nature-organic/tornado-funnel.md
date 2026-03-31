# Tornado Funnel

**Keywords:** Vortex, Storm, Spin, Danger, Wind.

**Description:**
A rotating cone of debris and clouds touching the ground.

## Usage

### 1. Canvas / WebGL Particles
Particles orbit a central vertical axis.
The radius of orbit increases with height `(r = y * spread)`.
Particles move faster near the center.

```javascript
angle += speed;
radius = y * 0.2 + noise(y, time);
x = centerX + cos(angle) * radius;
z = centerZ + sin(angle) * radius;
```
