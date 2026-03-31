# Parallax Layers

**Keywords:** Depth, Multi-plane, Scroll speed, Immersion.

**Description:**
Background elements move slower than foreground elements during scroll, creating a pseudo-3D effect.

## Usage

### 1. Pure CSS (Perspective)
The "CSS Parallax" trick using `transform-style: preserve-3d`.

```html
<div class="h-screen overflow-y-auto overflow-x-hidden perspective-1px">
    <!-- Back Layer (Background) -->
    <div class="absolute inset-0 transform translate-z-[-1px] scale-2 pointer-events-none z-[-1]">
        <img src="bg.jpg" class="w-full h-full object-cover" />
    </div>

    <!-- Content (Standard Plane) -->
    <div class="relative bg-slate-900/80 p-12 mt-[50vh]">
        <h1>Parallax Content</h1>
    </div>
</div>

<style>
.perspective-1px {
    perspective: 1px;
}
.translate-z-\[-1px\] {
    transform: translateZ(-1px);
}
.scale-2 {
    transform: scale(2); /* Compensation scale to fill viewport */
}
</style>
```

### 2. JS (Scroll Listener)
More control, works without modifying container scroll behavior.

```javascript
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.getElementById('bg-layer').style.transform = `translateY(${scrollY * 0.5}px)`;
    document.getElementById('mid-layer').style.transform = `translateY(${scrollY * 0.2}px)`;
});
```
