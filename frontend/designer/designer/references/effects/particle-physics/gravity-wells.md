# Gravity Wells

**Keywords:** Attractor, black hole, orbital mechanics, physics engine, pulling force.

**Description:**
Elements are physically pulled towards one or more "attractor" points (usually the cursor or static "star" elements). Unlike simple orbits, this involves velocity, acceleration, and damping, feeling like a true physics simulation.

## Usage

### 1. Simple Implementation (Spring Physics)
Using a simplified spring logic to pull elements toward a target.

```html
<div id="gravity-canvas" class="relative w-full h-[600px] bg-black overflow-hidden">
    <!-- The Attractor (Cursor or defined point) -->
    <div id="attractor" class="absolute w-4 h-4 bg-white rounded-full blur-[10px] pointer-events-none z-10 opacity-0"></div>
    
    <!-- Floating Debris -->
    <div class="debris absolute w-8 h-8 border border-purple-500/50 rounded-full" data-mass="1"></div>
    <div class="debris absolute w-12 h-12 border border-blue-500/50 rounded-full" data-mass="2"></div>
    <div class="debris absolute w-6 h-6 border border-pink-500/50 rounded-full" data-mass="0.8"></div>
</div>
```

### 2. JavaScript (Verlet Integration Lite)
Each frame, calculate vector to target, add force to velocity, update position.

```javascript
const debriElements = document.querySelectorAll('.debris');
const attractor = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

// Physics State
const objects = Array.from(debriElements).map(el => ({
    el,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    mass: parseFloat(el.dataset.mass || 1)
}));

window.addEventListener('mousemove', (e) => {
    attractor.x = e.clientX;
    attractor.y = e.clientY;
    attractor.active = true;
});

function animate() {
    objects.forEach(obj => {
        // 1. Calculate Force
        if (attractor.active) {
            const dx = attractor.x - obj.x;
            const dy = attractor.y - obj.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Gravity formula (simplified): F = G * (m1*m2) / r^2
            // We clamp distance to avoid infinite force at 0
            const force = 500 / (dist * dist + 100); 
            
            const ax = (dx / dist) * force;
            const ay = (dy / dist) * force;
            
            obj.vx += ax / obj.mass;
            obj.vy += ay / obj.mass;
        }

        // 2. Friction/Damping (slows them down in "space")
        obj.vx *= 0.98;
        obj.vy *= 0.98;

        // 3. Update Position
        obj.x += obj.vx;
        obj.y += obj.vy;

        // 4. Render
        obj.el.style.transform = `translate(${obj.x}px, ${obj.y}px)`;
    });

    requestAnimationFrame(animate);
}

animate();
```
