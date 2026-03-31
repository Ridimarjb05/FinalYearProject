# Backdrop Blur

**Keywords:** Blur, Filter, Overlay.

**Description:**
Blurring the content BEHIND the element, rather than the element itself.

## Usage

### 1. Focused Overlay
Dimming and blurring the background to focus attention on a modal.

```css
.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* Dim */
  backdrop-filter: blur(4px); /* Blur */
}
```

### 2. Sticky Headers
Frosted header moving over content.

```css
header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}
```
