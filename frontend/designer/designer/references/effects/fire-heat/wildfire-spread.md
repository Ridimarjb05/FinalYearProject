# Wildfire Spread

**Keywords:** Burning, Destruction, Map, Edge, Expanding.

**Description:**
A line of fire that expands outwards, consuming texture. Used often in map visualizations or game mechanics.

## Usage

### 1. Canvas Cellular Automata
Grid where a "burning" cell ignites neighbors, then turns to "burnt" (black/ash).

```javascript
if (cell.state === 'burning') {
  neighbors.forEach(n => {
    if (n.state === 'fuel' && Math.random() < probability) {
      n.state = 'burning';
    }
  });
  cell.state = 'burnt';
}
```
