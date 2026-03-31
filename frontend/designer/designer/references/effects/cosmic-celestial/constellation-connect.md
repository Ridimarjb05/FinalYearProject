# Constellation Connect

**Keywords:** Nodes, Network, Graph, Stars, Lines.

**Description:**
Stars (dots) drift slowly. When they get close enough to each other, a thin line is drawn between them.

## Usage

### 1. Canvas (Standard Implementation)
This is a O(N^2) operation in its naive form.

```javascript
for (let i = 0; i < particles.length; i++) {
  for (let j = i + 1; j < particles.length; j++) {
    let d = dist(p[i], p[j]);
    if (d < threshold) {
      let opacity = 1 - (d / threshold);
      drawLine(p[i], p[j], opacity);
    }
  }
}
```

### 2. Libraries
- `particles.js` has this feature built-in.
- `react-particles`
