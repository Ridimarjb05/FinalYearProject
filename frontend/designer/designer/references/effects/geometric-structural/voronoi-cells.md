# Voronoi Cells

**Keywords:** Cellular, Organic grid, Mathematical beauty, Dynamic boundaries.

**Description:**
A partition of a plane into regions close to a given set of "seeds". As seeds (or the cursor) move, the cell boundaries shift dynamically. It looks like biological cells or cracking ice.

## Usage

### 1. D3.js (Standard Approach)
D3 has a built-in Voronoi generator (`d3-delaunay` or `d3-voronoi`).

```html
<svg id="voronoi-svg" width="100%" height="100%"></svg>
<!-- Include D3.js -->
```

```javascript
const width = window.innerWidth;
const height = window.innerHeight;
const particles = Array.from({length: 50}, () => [Math.random() * width, Math.random() * height]);

const delaunay = d3.Delaunay.from(particles);
const voronoi = delaunay.voronoi([0, 0, width, height]);

const path = voronoi.render(); // Returns SVG path string for all cells
document.querySelector('#voronoi-svg').innerHTML = `<path d="${path}" stroke="white" stroke-opacity="0.2" fill="none"/>`;

// To animate: Update particles array positions, re-compute Voronoi, update Path 'd' attribute.
```

### 2. WebGL / Shader (High Performance)
For smooth, liquid-like Voronoi at 60fps, use a Fragment Shader.
Formula: For each pixel, calculate distance to nearest seed point.

```glsl
// GLSL Snippet
float min_dist = 1.0;
for(int i=0; i<10; i++) {
    float d = distance(st, points[i]); // st is pixel coord
    min_dist = min(min_dist, d);
}
color += min_dist; // Draws the "height map" of Voronoi
```
