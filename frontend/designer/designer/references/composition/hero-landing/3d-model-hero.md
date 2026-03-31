# 3D Model Hero

**Keywords:** WebGL, Three.js, Spline, Interactive Object.

**Description:**
A real-time rendered 3D object that the user can interact with (rotate, zoom) or that responds to mouse movement.

## Usage

### 1. Spline Embed (Easiest)
Spline.design offers copy-paste code.

```html
<script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.434/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/your-scene-url/scene.splinecode"></spline-viewer>

<!-- Place inside a hero container -->
<div class="h-screen w-full relative">
    <spline-viewer ... class="absolute inset-0"></spline-viewer>
    <div class="relative z-10 pointer-events-none p-12">
        <h1>Headline Overlay</h1>
    </div>
</div>
```

### 2. React Three Fiber
For React apps.

```jsx
<Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Suspense fallback={null}>
        <Model url="/scene.gltf" />
    </Suspense>
    <OrbitControls enableZoom={false} />
</Canvas>
```
