# Responsive Tables

**Keywords:** Data Tables, Card View, Scrollable, Stacked.

**Description:**
Tables are notoriously hard on mobile. Common solutions include horizontal scrolling, transforming rows into cards, or hiding less important columns.

## Usage

### 1. Horizontal Scroll (Easiest)
Preserves table structure.

```css
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

### 2. Stacked (Card View)
Transforms each row into a block of key-value pairs.

```css
@media (max-width: 600px) {
  thead { display: none; }
  tr { display: block; margin-bottom: 1rem; border: 1px solid #ccc; }
  td {
    display: flex;
    justify-content: space-between;
  }
  td::before {
    content: attr(data-label); /* Show header from attribute */
    font-weight: bold;
  }
}
```
