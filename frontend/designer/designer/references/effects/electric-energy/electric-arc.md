# Electric Arc

**Keywords:** Spark, Jump, ZAP, Tesla, Connection.

**Description:**
A curved or jagged line of energy connecting two points, often shifting or "dancing".

## Usage

### 1. SVG & JS
Animate the `d` attribute of an SVG path to constantly change the jitter on the line.

```javascript
// Update every frame
path.setAttribute('d', `M ${x1},${y1} Q ${cx+jitter},${cy+jitter} ${x2},${y2}`);
```
