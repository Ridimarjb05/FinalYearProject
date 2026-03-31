# Column Drop

**Keywords:** Wrapping, Grid Auto-Flow, Multi-column.

**Description:**
A pattern where columns in a multi-column layout "drop" to the next line as the screen width decreases. Useful for 3-column layouts (Main, Sidebar, Ads) converting to single column.

## Usage

### 1. Flex Wrap
Allowing flex items to wrap when there isn't enough space.

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 300px; /* Grow, Shrink, Basis */
}
```

### 2. CSS Grid Auto-Fit
Automatically dropping columns without media queries.

```css
.grid-container {
  display: grid;
  /* Creates as many columns as fit, min 250px wide */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```
