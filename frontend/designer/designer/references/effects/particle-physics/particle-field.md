# Particle Field

**Keywords:** Floating Particles, Drift, Ambient background, Constellations, Dust, Pollen.

**Description:**
A subtle background effect where small particles float aimlessly or with a gentle directional drift. Interaction can be added (e.g., mouse repulsion or attraction) to make the field feel alive. Great for adding depth without distraction.

## Usage

### 1. HTML Structure
A canvas element usually provides the best performance for many particles.

```html
<canvas id="particle-field" class="absolute inset-0 w-full h-full pointer-events-none opacity-50"></canvas>
```

### 2. JavaScript Implementation
Features:
- Responsive resizing
- Random movement
- Subtle opacity fluctuation

```javascript
const canvas = document.getElementById('particle-field');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

// Configuration
const config = {
    count: 100,
    size: { min: 1, max: 3 },
    speed: { min: 0.1, max: 0.5 },
    colors: ['rgba(255,255,255,0.2)', 'rgba(168,85,247,0.2)'] // White & Purple
};

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * (config.size.max - config.size.min) + config.size.min;
        this.speedX = (Math.random() - 0.5) * config.speed.max;
        this.speedY = (Math.random() - 0.5) * config.speed.max;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    resize();
    particles = Array.from({ length: config.count }, () => new Particle());
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();
```
