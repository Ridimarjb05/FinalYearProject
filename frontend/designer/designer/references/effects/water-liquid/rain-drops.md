# Rain Drops

**Keywords:** Weather, Storm, Wet, Droplets, Fall.

**Description:**
High-speed vertical or diagonal lines that reset when they hit the bottom, occasionally creating a small splash.

## Usage

### 1. Canvas
High efficiency for thousands of drops.

```javascript
// Drop Logic
y += speed;
if (y > height) {
  y = -10;
  x = random(width);
}
```

### 2. CSS Animation
A scrolling background texture or multiple elements.

```css
.rain-layer {
  background: url('rain.png') repeat;
  animation: rain-fall 1s linear infinite;
}
```
