# Echo Repeat

**Keywords:** Delay, Trail, Clone, Reverb, Visual.

**Description:**
Visual ghosting where an object leaves copies of itself behind as it moves.

## Usage

### 1. DOM Clones
Update positions of clone elements to match "history" positions of the main element.
Opacity decays: 0.8, 0.6, 0.4...

```javascript
// Loop
history.unshift({x, y});
clones.forEach((c, i) => {
  c.style.transform = `translate(${history[i].x}px, ${history[i].y}px)`;
});
```
