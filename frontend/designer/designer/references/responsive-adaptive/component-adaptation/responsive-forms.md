# Responsive Forms

**Keywords:** Input Sizing, Label Placement, Vertical Stacking.

**Description:**
Adapting form layouts. Desktop forms often use multi-column rows (First Name | Last Name). Mobile forms usually stack everything vertically for easier touch interaction.

## Usage

### 1. Label Alignment
Side-by-side labels on desktop, top labels on mobile.

```css
.form-group {
  display: flex;
  flex-direction: column; /* Mobile: Top labels */
}

@media (min-width: 768px) {
  .form-group {
    flex-direction: row; /* Desktop: Side labels */
    align-items: center;
  }
  label { width: 30%; }
}
```

### 2. Multi-Column Inputs to Stack
Two inputs on one line -> Two lines.

```css
.name-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.input-wrapper {
  flex: 1 1 100%; /* Mobile: Full width */
}

@media (min-width: 600px) {
  .input-wrapper { flex: 1; } /* Desktop: Share space */
}
```
