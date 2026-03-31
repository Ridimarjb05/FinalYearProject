# Planet Orbit

**Keywords:** Solar System, Rotation, Spheres, Gravity, Circles.

**Description:**
Objects moving in circular or elliptical paths around a central object.

## Usage

### 1. CSS & Transform Origin
The trick is to rotate a container that is centered, but the child object is offset.

```css
.orbit-path {
  position: absolute;
  top: 50%; left: 50%;
  width: 300px; height: 300px;
  transform: translate(-50%, -50%);
  border: 1px dashed rgba(255,255,255,0.2);
  border-radius: 50%;
}

.planet-container {
  position: absolute;
  top: 50%; left: 50%;
  width: 100%; height: 100%;
  transform: translate(-50%, -50%);
  animation: rotate 10s linear infinite;
}

.planet {
  position: absolute;
  top: 0; left: 50%; /* Position at top of circle */
  transform: translate(-50%, -50%);
}

@keyframes rotate {
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
```
