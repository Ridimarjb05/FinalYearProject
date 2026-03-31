# Smoke Plume

**Keywords:** Fire, Industrial, Pollution, Rising, Dark.

**Description:**
A thick column of smoke rising and spreading out as it ascends.

## Usage

### 1. Canvas / WebGL
Spawn particles at the bottom center.
Upward velocity `vy`.
Horizontal spread `vx += random`.
Scale increases with age.
Alpha decreases with age.

```js
p.size *= 1.01;
p.alpha *= 0.99;
```
