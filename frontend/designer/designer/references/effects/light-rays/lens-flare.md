# Lens Flare

**Keywords:** Optical, Cinematic, Glare, Artifacts, Camera.

**Description:**
Bright circles, hexagons, and streaks caused by light scattering in a camera lens system.

## Usage

### 1. Overlay Images
The simplest method is to overlay a PNG sprite of a lens flare and move it relative to the light source.

### 2. Canvas Procedural Generation
Draw a series of circles along a line passing through the light source and the screen center.

```javascript
let dx = centerX - lightX;
let dy = centerY - lightY;
let angle = atan2(dy, dx);
let dist = sqrt(dx*dx + dy*dy);
// Draw flares at various distances along this line
drawFlare(lightX + dx * 0.5, lightY + dy * 0.5, size1, color1);
drawFlare(lightX + dx * 1.2, lightY + dy * 1.2, size2, color2);
```
