# Plasma Ball

**Keywords:** Electricity, Tesla, Touch, Tendrils, Physics.

**Description:**
Electric tendrils arcing from a center point to the edge of a sphere, often concentrating where a user "touches" (mouse position).

## Usage

### 1. Canvas / WebGL
This requires calculating lightning-like paths (random walks or recursive subdivision) from center to edge.

```javascript
function drawBolt(x1, y1, x2, y2) {
  // Recursive mid-point displacement
  if (dist < minDetail) {
    ctx.lineTo(x2, y2);
    return;
  }
  midX = (x1 + x2) / 2 + random(-displace, displace);
  midY = (y1 + y2) / 2 + random(-displace, displace);
  drawBolt(x1, y1, midX, midY);
  drawBolt(midX, midY, x2, y2);
}
```
