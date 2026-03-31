# Confetti Pop

**Keywords:** Celebration, Party, Win, Paper, Colorful.

**Description:**
Small rectangles of various colors exploding outwards and fluttering down slowly.

## Usage

### 1. Canvas-Confetti Library
The gold standard.
Uses `requestAnimationFrame`.
Physics: Gravity, drag, wind, and unique rotation axis for each particle to simulate 3D fluttering.

```javascript
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
});
```
