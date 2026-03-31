# Scroll Reveal Hero

**Keywords:** Entrance animation, Staggered fade, Scroll trigger.

**Description:**
Elements start invisible or offset. As the user scrolls (or on load), they animate into place. This is the standard "modern website" load sequence.

## Usage

### 1. Intersection Observer (Library or Native)
Checking when element is in view.

```css
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}
.reveal.active {
    opacity: 1;
    transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```
