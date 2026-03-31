# Fractal Zoom

**Keywords:** Mandelbrot, Julia Set, Infinite, Recursive, Math.

**Description:**
A pattern that reveals more detail as you zoom in, endlessly repeating or evolving.

## Usage

### 1. WebGL Shader
Iterate the Mandelbrot formula `z = z^2 + c` for every pixel.
Zooming requires using `double` precision or specialized techniques for deep zooms.

```glsl
// Single iteration
vec2 z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
if (length(z) > 2.0) break;
```
