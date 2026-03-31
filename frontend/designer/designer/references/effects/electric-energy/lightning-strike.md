# Lightning Strike

**Keywords:** Thunder, Bolt, Flash, Storm, Discharge.

**Description:**
A jagged, branching white line that appears violently and fades out quickly.

## Usage

### 1. Canvas / SVG
Generate a path using recursive midpoint displacement (1D fractal noise).

```javascript
// Midpoint displacement
function createBolt(p1, p2, displace) {
  if (displace < min) { return [p1, p2]; }
  mid = (p1+p2)/2 + random(-displace, displace);
  return [...createBolt(p1, mid, displace/2), ...createBolt(mid, p2, displace/2)];
}
```

### 2. CSS Clip Path
Harder to make realistic without JS, but simple jagged borders can work for a stylized look.
