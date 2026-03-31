# Firefly Swarm

**Keywords:** Bugs, Nature, Night, Blink, Float.

**Description:**
Small, yellow/green lights that float randomly and blink on and off slowly.

## Usage

### 1. CSS & Random positioning
This is hard in pure CSS without a preprocessor loop for random positions.

### 2. Canvas / JS
Each firefly is an object with: `x, y, dx, dy, opacity, blinkSpeed`.

```javascript
// Blink logic
this.opacity += this.blinkSpeed * this.direction;
if (this.opacity > 1 || this.opacity < 0) this.direction *= -1;
```
