# Min Width Guard

**Keywords:** Overflow Protection, Minimum Sizing.

**Description:**
Preventing elements from becoming too small to be usable or breaking their internal layout on extremely narrow devices (like foldables or watches).

## Usage

### 1. Min-Width
Forcing a horizontal scroll if the screen is too narrow.

```css
.data-table {
  min-width: 600px; /* Ensure table remains readable */
  overflow-x: auto; /* Allow scroll */
}
```

### 2. Flex Item Integrity
 preventing items from shrinking to zero.

```css
.icon {
  flex-shrink: 0; /* Don't squash me */
  width: 40px;
}
```
