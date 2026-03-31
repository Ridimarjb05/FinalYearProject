# Motion Blur

**Keywords:** Speed, Fast, Smear, Trail, Smooth.

**Description:**
Streaking of rapidly moving objects.

## Usage

### 1. Canvas / JS "Afterimage"
Do not clear the canvas completely each frame.
`ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; ctx.fillRect(0,0,w,h);`
This leaves faint trails of previous frames.

### 2. SVG Filter (Directional Blur)
Use `<feGaussianBlur>` with `stdDeviation="x y"`.
If moving horizontally, only blur X: `stdDeviation="10 0"`.
