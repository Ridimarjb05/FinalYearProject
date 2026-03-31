# Dot Matrix

**Keywords:** Grid, LED, Retro, Display, Points.

**Description:**
A grid of dots that changes size or color based on an underlying signal or mouse position.

## Usage

### 1. CSS Grid & Custom Properties
A grid of divs. Update `--scale` on hover.

```css
.dot {
  width: 10px; height: 10px;
  background: white;
  border-radius: 50%;
  transform: scale(var(--scale, 1));
  transition: transform 0.2s;
}
.dot:hover { --scale: 1.5; }
```

### 2. Canvas
Loop through `rows` and `cols`. Calculate distance from mouse to set radius.
