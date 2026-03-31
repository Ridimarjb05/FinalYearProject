# Reflow Order

**Keywords:** Visual Order, DOM Order, Reordering, Mobile Layout.

**Description:**
Changing the visual order of elements to suit the context. For example, moving a sidebar that is visually on the left (desktop) to the bottom of the content (mobile) so primary content is seen first.

## Usage

### 1. Flexbox Order
Changing visual order independent of source order.

```css
.container {
  display: flex;
  flex-direction: column;
}

.main-content {
  order: 1; /* Show first on mobile */
}

.sidebar {
  order: 2; /* Show second on mobile */
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
  .sidebar {
    order: 0; /* Return to natural order (left) */
  }
}
```

### 2. Grid Order
Using specific grid lines or named areas.

```css
.grid {
  grid-template-areas: "content" "sidebar";
}

@media (min-width: 768px) {
  .grid {
    grid-template-areas: "sidebar content";
  }
}
```
