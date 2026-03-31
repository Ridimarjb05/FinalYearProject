# Responsive Cards

**Keywords:** Card Grid, Aspect Ratio, Content Density.

**Description:**
Cards that adjust their internal layout (image position, font size) or grid density based on available space.

## Usage

### 1. Grid Density
Changing how many cards fit per row.

```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 col */
}

@media (min-width: 640px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}
```

### 2. Internal Layout (Horizontal vs Vertical Card)
Card image on top (mobile) vs Left (desktop).

```css
.card {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .card { flex-direction: row; }
  .card-image { width: 30%; }
}
```
