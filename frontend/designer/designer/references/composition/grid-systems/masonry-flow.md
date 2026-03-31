# Masonry Flow

**Keywords:** Pinterest, Waterfall, Variable Height, Staggered Grid.

**Description:**
A layout where items are placed in columns, but unlike strict grids, they don't align in rows. Instead, they pack vertically based on their height. Best for mixed aspect ratio media.

## Usage

### 1. CSS Columns (Simplest)
Native CSS columns handle this well, but ordering is Top-to-Bottom per column (not left-to-right).

```css
.masonry-container {
    column-count: 3;
    column-gap: 20px;
}
.masonry-item {
    break-inside: avoid;
    margin-bottom: 20px;
}
```

### 2. JS / Flex Column (Left-to-Right Illusion)
To maintain rough time-ordering across columns, use JS to calculate shortest column and append there.

```html
<div class="flex gap-4">
    <div class="flex flex-col gap-4 w-1/3" id="col-1"></div>
    <div class="flex flex-col gap-4 w-1/3" id="col-2"></div>
    <div class="flex flex-col gap-4 w-1/3" id="col-3"></div>
</div>
```

```javascript
// Pseudo:
items.forEach(item => {
    // Find column with lowest height
    const shortestCol = getShortest([col1, col2, col3]);
    shortestCol.appendChild(item);
});
```
