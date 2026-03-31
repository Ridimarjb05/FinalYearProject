# Stack to Row

**Keywords:** Flexbox, Direction, Mobile Layout, Vertical to Horizontal.

**Description:**
The most fundamental responsive pattern. Elements stack vertically on mobile screens for easy scrolling and sit horizontally in a row on larger screens to utilize width.

## Usage

### 1. Flexbox Direction
Switching `flex-direction` from `column` to `row`.

```css
.container {
  display: flex;
  flex-direction: column; /* Mobile first: Vertical stack */
  gap: 1rem;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row; /* Tablet+: Horizontal row */
    justify-content: space-between;
  }
}
```

### 2. Tailwind Approach

```html
<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-1/2">Left Content</div>
  <div class="w-full md:w-1/2">Right Content</div>
</div>
```
