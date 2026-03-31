# Trail Follow

**Keywords:** Cursor trail, Snake game, Drawing path, Ghosting.

**Description:**
Elements that follow the cursor path. Can be a simple single follower with ease, or a "snake" of multiple elements with staggered delays.

## Usage

### 1. Staggered Divs (The "Snake")
Using CSS variables or JS loop to delay the position updates.

```html
<!-- Multiple followers -->
<div class="cursor-trail delay-0"></div>
<div class="cursor-trail delay-1"></div>
<div class="cursor-trail delay-2"></div>

<style>
.cursor-trail {
    position: fixed;
    top: 0; left: 0;
    width: 20px; height: 20px;
    background: #a855f7;
    border-radius: 50%;
    pointer-events: none;
    transition: transform 0.1s linear; /* Base speed */
}
/* No CSS delay property for transform like this, usually handled in JS frame loop */
</style>
```

```javascript
const trails = document.querySelectorAll('.cursor-trail');
const mouse = { x: 0, y: 0 };
const positions = []; // Array of {x, y} history

// Init positions
trails.forEach(() => positions.push({ x: 0, y: 0 }));

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    // Lead Dot
    let tx = mouse.x;
    let ty = mouse.y;
    
    trails.forEach((trail, index) => {
        // Linear interpolation (Lerp) for smoothness
        // Each dot follows the PREVIOUS dot's position (or mouse for first one)
        // Actually simplest is: they all follow mouse but with different Lerp factors
        
        const targetX = index === 0 ? mouse.x : positions[index-1].x;
        const targetY = index === 0 ? mouse.y : positions[index-1].y;
        
        const ease = 0.2 + (index * 0.05); // Or constant ease
        
        positions[index].x += (targetX - positions[index].x) * 0.3; // Speed
        positions[index].y += (targetY - positions[index].y) * 0.3;
        
        trail.style.transform = `translate(${positions[index].x}px, ${positions[index].y}px)`;
    });
    
    requestAnimationFrame(animate);
}
animate();
```
