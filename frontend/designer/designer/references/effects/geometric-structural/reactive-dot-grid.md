# Reactive Dot Grid (Canvas)

**Keywords:** dot grid, reactive background, canvas interaction, physics grid, distortion effect, particle system, mouse interaction.

## Description
A polished background effect where a grid of dots reacts to mouse movement. Dots are repelled by the cursor, increasing in size and opacity based on proximity, creating a fluid, interactive feel without overwhelming the content.

## Implementation

### 1. HTML
Add the canvas element as a fixed background.
```html
<!-- Reactive Grid Background -->
<canvas id="grid-canvas"></canvas>
```

### 2. CSS
Style the canvas to cover the viewport and sit behind content.
```css
#grid-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    pointer-events: none;
}
```

### 3. JavaScript
Handles the grid rendering and physics interaction.

```javascript
// Reactive Grid Implementation
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let mouseX = -1000, mouseY = -1000;

// Grid Configuration
const gridSize = 40;        // Spacing between dots
const pointSize = 1.5;      // Base radius of dots
const influenceRadius = 200; // Radius of mouse influence

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    
    // Default dot color
    ctx.fillStyle = '#E5E7EB'; 

    for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
            
            // Calculate distance from mouse
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            let drawX = x;
            let drawY = y;
            let size = pointSize;
            let alpha = 1;

            // Interaction Logic
            if (dist < influenceRadius) {
                const force = (influenceRadius - dist) / influenceRadius;
                
                // Move points away from mouse
                const angle = Math.atan2(dy, dx);
                const moveDist = force * 15; // Max displacement pixel amount
                
                drawX += Math.cos(angle) * moveDist;
                drawY += Math.sin(angle) * moveDist;
                
                // Enlarge points near mouse
                size = pointSize + (force * 2);
                
                // Change color/opacity near mouse (Optional)
                // Example: Blue tint
                ctx.fillStyle = `rgba(37, 99, 235, ${0.2 + force * 0.5})`; 
            } else {
                ctx.fillStyle = '#E5E7EB';
            }

            ctx.beginPath();
            ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Init Grid
resize();
draw();
```

## Usage Notes
- Adjust `gridSize` to change density.
- Adjust `influenceRadius` to change the area of effect around the cursor.
- Adjust `ctx.fillStyle` logic for different themes (e.g., dark mode).
