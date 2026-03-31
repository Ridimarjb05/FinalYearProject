# Torch Flame

**Keywords:** Medieval, Dungeon, Held, Flicker, Light Source.

**Description:**
A directional flame, usually angled upwards or slightly to the side if moving.

## Usage

### 1. CSS & Transform
Similar to [Campfire](campfire.md) but attached to an object (the torch handle). Rotate the flame container based on movement to simulate drag.

```css
.torch-container {
  transform-origin: bottom center;
  /* Rotate opposite to movement direction */
}
```
