# Warp Tunnel

**Keywords:** Speed, Hyperspace, Cylindrical, Perspective.

**Description:**
Lines or stars streaming past the camera in a tunnel shape, indicating high forward velocity.

## Usage

### 1. Canvas 3D Projection
Spawn particles at `z = far`. Move them to `z = near`.
Project `(x, y, z)` to `(screenX, screenY)`:
`sx = x / z * fov;`
`sy = y / z * fov;`
Recycle particles when `z <= 0`.
