# Ember Glow

**Keywords:** Fire, Heat, Ash, Dying Light, Warm.

**Description:**
Small, orange/red particles that float upward and fade out, representing dying fire embers.

## Usage

### 1. Particles.js
emit particles from the bottom with `move.direction: "top"` and `opacity.anim`.

```json
"color": {"value": ["#ff4500", "#ff8c00"]},
"opacity": {"anim": {"enable": true, "speed": 1, "opacity_min": 0}}
```
