# Layout Shift

**Keywords:** Grid Areas, Radical Change, Redesign.

**Description:**
Completely restructuring the layout grid for different breakpoints. A complex grid on desktop might become a simplified list on mobile.

## Usage

### 1. Grid Template Areas
Redefining the entire grid structure.

```css
.page {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "hero"
    "content"
    "footer";
}

@media (min-width: 1024px) {
  .page {
    grid-template-columns: 200px 1fr 200px;
    grid-template-areas:
      "header header header"
      "hero hero hero"
      "sidebar-left content sidebar-right"
      "footer footer footer";
  }
}
```
