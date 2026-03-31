# Ripple Touch

**Keywords:** Click effect, Tap feedback, Water drop, Material Design, Interactive surface.

**Description:**
A ripple expands from the exact point of interaction (click or tap) and fades out. It provides immediate, organic confirmation of user intent.

## Usage

### 1. Pure CSS (Pseudo-element + JS Trigger)
The standard button ripple.

```css
/* Container must be relative and overflow hidden */
.ripple-btn {
    position: relative;
    overflow: hidden;
}

.ripple-circle {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    background-color: rgba(255, 255, 255, 0.4);
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
```

```javascript
// JS to spawn the ripple at cursor coordinate
document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        circle.classList.add('ripple-circle');
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${e.clientX - rect.left - size/2}px`;
        circle.style.top = `${e.clientY - rect.top - size/2}px`;
        
        this.appendChild(circle);
        
        // Cleanup
        setTimeout(() => circle.remove(), 600);
    });
});
```
