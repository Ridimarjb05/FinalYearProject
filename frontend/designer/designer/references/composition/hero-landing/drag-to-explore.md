# Drag to Explore

**Keywords:** Canvas, Infinite canvas, Map interface, Grab.

**Description:**
The content is wider/taller than the viewport. The user must click and drag to pan around, exploring the "infinite" canvas. Common in creative portfolios.

## Usage

### 1. JS Mouse Events
Tracking delta movement.

```javascript
let isDown = false;
let startX, scrollLeft;
const slider = document.querySelector('.drag-container');

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active'); // Change cursor to grabbing
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
// ... mouseleave, mouseup, mousemove logic ...
```
