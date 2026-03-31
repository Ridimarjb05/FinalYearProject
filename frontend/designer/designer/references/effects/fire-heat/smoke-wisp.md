# Smoke Wisp

**Keywords:** Cigarette, Incense, Curl, Fluid, Soft.

**Description:**
A thin, curling line of smoke that moves with fluid dynamics (Navier-Stokes) or Perlin noise.

## Usage

### 1. WebGL Fluid Simulation
The most realistic method, solving fluid equations in real-time.

### 2. Canvas Line Trails
Draw a line where each segment follows the previous one with some noise added.

```javascript
// A simple wisp
x += noise(y * scale, time);
y -= speed;
radius *= damping;
```
