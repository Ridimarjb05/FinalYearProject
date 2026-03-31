# Warp Speed

**Keywords:** Hyperdrive, Hyperspace, Star Wars, Lightspeed, Streaks.

**Description:**
Stars stretching into lines radiating from the center of the screen, simulating high-speed travel through space.

## Usage

### 1. Canvas / WebGL
The most performant way. Calculate the angle from the center to each star and stretch the star's length based on its speed and distance from center.

```javascript
// Pseudo Logic
x += (x - centerX) * speed;
y += (y - centerY) * speed;
length = dist(x, y, prevX, prevY);
drawLine(x, y, x - length * cos(angle), y - length * sin(angle));
```

### 2. Three.js
Move camera through a particle field at high speed. The motion blur can be simulated or geometry can be stretched.
