# Wireframe Morph

**Keywords:** 3D, Geometry, SVG morph, Shape-shift, Architectural lines.

**Description:**
Wireframe shapes that smoothly transform from one state to another (e.g., Sphere to Cube). This mimics 3D modelling tools and implies adaptation or structural integrity.

## Usage

### 1. Pure CSS (Simple Rotation)
For simple "morphing" feel, rotating nested squares/circles in 3D space is easiest.

```html
<div class="perspective-container">
  <div class="cube animate-spin-3d">
     <div class="face front border border-purple-500/50"></div>
     <div class="face back border border-purple-500/50"></div>
     <!-- etc -->
  </div>
</div>
```

### 2. SVG Path Morphing (Better for Shapes)
Using a library like `anime.js` or `GSAP` to morph SVG paths is the standard for complex shapes.

```html
<svg viewBox="0 0 200 200" class="w-64 h-64 text-purple-500 stroke-current fill-none">
  <path d="M100,50 L150,150 L50,150 Z" id="morph-shape"></path> <!-- Triangle -->
</svg>

<script>
// Pseudo-code for Anime.js
anime({
  targets: '#morph-shape',
  d: [
    { value: 'M100,50 L150,150 L50,150 Z' }, // Triangle
    { value: 'M50,50 L150,50 L150,150 L50,150 Z' } // Square
  ],
  easing: 'easeInOutQuad',
  duration: 2000,
  loop: true
});
</script>
```

### 3. Three.js (True 3D)
For actual wireframes that look immersive.

```javascript
// Setup scene, camera, renderer...
const geometry = new THREE.IcosahedronGeometry(10, 1);
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe);
line.material.depthTest = false;
line.material.opacity = 0.5;
line.material.transparent = true;

scene.add(line);

function animate() {
    line.rotation.x += 0.001;
    line.rotation.y += 0.002;
    // Morph logic: update geometry.vertices slightly
}
```
