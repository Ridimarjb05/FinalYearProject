# Touch vs Click

**Keywords:** Event Handling, 300ms Delay, Fast Click.

**Description:**
Understanding the difference between `click`, `touchstart`, and `pointerdown` events to ensure snappy interactions.

## Usage

### 1. Touch Action
Removing the delay and default gestures to improve responsiveness.

```css
button {
  touch-action: manipulation; /* Disables double-tap zoom to speed up click */
}
```

### 2. Pointer Events
Unified handling.

```javascript
/* Use pointerdown instead of mousedown/touchstart */
element.addEventListener('pointerdown', handleStart);
```
