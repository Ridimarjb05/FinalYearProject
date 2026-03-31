# Hexagon Tessellation (Ripple)

**Keywords:** Hive mind, Grid system, Organic technology, Pulsing mesh.

**Description:**
A grid of interlocking hexagons. When hovered or clicked, a ripple effect propagates outward through the neighbors, creating a satisfying "living grid" feel.

## Usage

### 1. CSS Grid Layout (Honeycomb)
Offset every other row.

```html
<div class="hex-grid">
   <div class="hex"></div>
   <div class="hex"></div>
   <!-- ... -->
</div>

<style>
.hex-grid {
   display: flex;
   flex-wrap: wrap;
   width: 900px;
}
.hex {
   width: 50px;
   height: 57px; /* sqrt(3) relationship */
   clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
   background: #1e293b;
   margin-bottom: -15px; /* Overlap for nesting */
   margin-right: 2px;
   transition: background 0.3s;
}
.hex:hover {
   background: #a855f7;
}
/* Alternate rows need to be pushed: usually handled via nth-child margins or JS positioning */
</style>
```

### 2. JS Ripple Logic
Find neighbors by distance and trigger class changes with delay.

```javascript
const hexes = document.querySelectorAll('.hex');

hexes.forEach(hex => {
    hex.addEventListener('click', (e) => {
        const originRect = hex.getBoundingClientRect();
        const originX = originRect.left + originRect.width/2;
        const originY = originRect.top + originRect.height/2;

        hexes.forEach(h => {
            const rect = h.getBoundingClientRect();
            const x = rect.left + rect.width/2;
            const y = rect.top + rect.height/2;
            
            const dist = Math.sqrt(Math.pow(x - originX, 2) + Math.pow(y - originY, 2));
            
            // Ripple delay based on distance
            setTimeout(() => {
                h.classList.add('pulse');
                setTimeout(() => h.classList.remove('pulse'), 500);
            }, dist * 2); // 2ms per pixel speed
        });
    });
});
```

### 3. Tailwind Animation
```css
@keyframes pulse-hex {
    0% { background: #334155; transform: scale(1); }
    50% { background: #a855f7; transform: scale(0.95); }
    100% { background: #334155; transform: scale(1); }
}
.pulse {
    animation: pulse-hex 0.5s ease-out;
}
```
