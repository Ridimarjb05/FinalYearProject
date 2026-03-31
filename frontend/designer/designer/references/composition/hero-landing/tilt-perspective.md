# Tilt Perspective

**Keywords:** 3D Hover, Device orientation, Gyro element.

**Description:**
A card or element tilts in 3D space towards the mouse cursor, simulating a physical object being pushed.

## Usage

### 1. Vanilla JS (RotateX/Y)
Calculating rotation based on cursor position relative to element center.

```javascript
const card = document.querySelector('.tilt-card');
card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    
    // Rotate 20deg max
    const rotateX = (0.5 - yPct) * 20;
    const rotateY = (xPct - 0.5) * 20; // X moves Y rotation
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
```
