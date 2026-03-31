# Magnetic Lines

**Keywords:** Vector field, Flow lines, Compass needles, Interactive Grid, Directional Field.

**Description:**
A grid of line segments or "needles" that rotate to point towards the cursor (or repel from it). Creates a highly satisfying, tactile "field" effect that visualizes invisible forces.

## Usage

### 1. HTML Container
CSS Grid is perfect for creating the cells.

```html
<div id="magnetic-grid" class="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] gap-4 w-full h-screen bg-slate-900 overflow-hidden">
    <!-- Cells injected via JS -->
</div>
```

### 2. JavaScript Implementation
Calculates angle between each line center and the mouse.

```javascript
const grid = document.getElementById('magnetic-grid');
const cellSize = 50; // approximate
const cols = Math.floor(window.innerWidth / cellSize);
const rows = Math.floor(window.innerHeight / cellSize);
const total = cols * rows;

// Create lines
for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.className = 'flex items-center justify-center h-12 w-12';
    
    // The "Needle"
    const line = document.createElement('div');
    line.className = 'w-8 h-0.5 bg-slate-700 rounded-full transition-colors duration-300';
    line.dataset.line = 'true'; // Marker for selection
    
    cell.appendChild(line);
    grid.appendChild(cell);
}

const lines = document.querySelectorAll('[data-line="true"]');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    lines.forEach(line => {
        const rect = line.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        
        // Calculate angle
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        // Distance for color effect
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDist = 300;
        
        // Apply rotation
        line.style.transform = `rotate(${angle}deg)`;
        
        // Optional: Light up near mouse
        if (dist < maxDist) {
            line.style.backgroundColor = '#a855f7'; // Purple
            line.style.boxShadow = `0 0 ${10 - (dist/30)}px #a855f7`;
        } else {
            line.style.backgroundColor = '#334155'; // Slate-700
            line.style.boxShadow = 'none';
        }
    });
});
```

### 3. CSS
Ensure smooth movement is OFF for the rotation itself (instant response feels snappier), or add a slight transition if you want "lag".

```css
/* No transition on transform makes it feel robotic/ instant */
/* Add transition: transform 0.1s ease-out; for a "fluid" feel */
```
