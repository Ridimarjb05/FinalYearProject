# Intrinsic Sizing

**Keywords:** min-content, max-content, fit-content.

**Description:**
Sizing elements based on the content they contain rather than arbitrary lengths.

## Usage

### 1. fit-content
Shrink wrap content up to a max limit.

```css
.dialog {
  width: fit-content;
  max-width: 600px; /* Won't grow wider than 600px, but shrinks to content if smaller */
}
```

### 2. min-content
Shrink to the smallest possible size (longest word).

```css
.narrow-column {
  width: min-content;
}
```

### 3. max-content
Expand to full width of content (no wrapping).

```css
.no-wrap-label {
  width: max-content;
}
```
