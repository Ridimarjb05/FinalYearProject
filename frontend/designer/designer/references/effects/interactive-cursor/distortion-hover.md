# Distortion Hover

**Keywords:** Fisheye, Displacement Map, WebGL hover, Magnify.

**Description:**
Local distortion of an image or text when hovered. Commonly seen in "awwwards" style websites using WebGL to warp photos like liquid under the cursor.

## Usage

### 1. CSS Transform (Simple Magnification)
Not true "distortion" but simulates a lens.

```css
.card {
    overflow: hidden;
}
.card img {
    transition: transform 0.5s;
    transform-origin: var(--mouse-x) var(--mouse-y);
}
.card:hover img {
    transform: scale(1.5); /* Zooms in at mouse point */
}
```

### 2. SVG Displacement Filter
Using SVG filters to warp HTML content.

```html
<svg class="hidden">
  <filter id="displacement">
    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="1" result="warp" />
    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
  </filter>
</svg>

<img src="image.jpg" class="hover:filter-[url(#displacement)] transition-all" />
<!-- Note: Animating frequency/scale requires JS -->
```

### 3. WebGL (e.g., Curtains.js / Three.js)
The standard for "liquid" images.
Maps the image to a plane mesh and modifies vertex Z-index based on mouse distance equation.

```javascript
// Pseudo code for shader uniform update
uniforms.uMouse.value = [e.clientX, e.clientY];
uniforms.uHoverStrength.value = lerp(current, 1.0, 0.1);

// Vertex Shader
vec3 position = position;
float dist = distance(uv, uMouse);
position.z += sin(dist * 10.0) * uHoverStrength;
```
