# Meteor Shower

**Keywords:** Meteors, Falling Stars, Rain, Streak, Particle System.

**Description:**
Multiple particles streaking across the screen, usually diagonally, with fading trails. Creates a sense of movement and dynamic energy.

## Usage

### 1. Canvas / Particles.js
Best for performance with many particles.

```javascript
// Pseudo-code implementation
class Meteor {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.length = random(10, 20);
    this.speed = random(5, 10);
    this.angle = PI / 4; // Diagonal
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;
    if (this.y > height) this.reset();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.length, this.y - this.length);
    ctx.strokeStyle = 'rgba(255, 255, 255, ' + fade + ')';
    ctx.stroke();
  }
}
```

### 2. CSS Animation
Good for a simple background effect with fewer meteors.

```css
.meteor {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  animation: meteor 3s linear infinite;
}

@keyframes meteor {
  0% {
    transform: rotate(215deg) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(215deg) translateX(-500px);
    opacity: 0;
  }
}
```
