# Horizontal Scroll (Track)

**Keywords:** Carousel, Gallery, Side-scrolling section.

**Description:**
A section where scrolling down translates into horizontal movement for a specific container, or a simple container that overflows horizontally (mobile style).

## Usage

### 1. Scroll-jacking (Transform X)
Translating vertical scroll into horizontal movement. Usually requires a containing element with very large height.

```javascript
const track = document.getElementById('horiz-track');
const container = document.getElementById('horiz-container'); // Tall parent

window.addEventListener('scroll', () => {
    // Calculate how far into the container we are
    const offsetTop = container.offsetTop;
    const scrollY = window.scrollY;
    
    if (scrollY >= offsetTop && scrollY <= (offsetTop + container.offsetHeight - window.innerHeight)) {
        const percentage = (scrollY - offsetTop) / (container.offsetHeight - window.innerHeight);
        const moveAmount = track.scrollWidth - window.innerWidth;
        track.style.transform = `translateX(-${percentage * moveAmount}px)`;
    }
});
```

### 2. Native CSS Overflow (Touch Friendly)
Good for simple carousels.

```html
<div class="flex overflow-x-auto space-x-4 p-4 snap-x hide-scrollbar">
    <div class="flex-shrink-0 w-80 h-96 bg-slate-800 rounded-xl snap-center"></div>
    <div class="flex-shrink-0 w-80 h-96 bg-slate-800 rounded-xl snap-center"></div>
    <!-- ... -->
</div>
```
