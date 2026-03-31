# Paragraph Spacing

**Keywords:** Margin, Vertical Rhythm, separation, Blocks.

**Description:**
Paragraph spacing defines the vertical distance between distinct blocks of text. It signals to the reader that a new thought is beginning.

## Approaches

### 1. Margin Bottom
The standard web approach. Add space *after* each paragraph.
*   **Size:** Usually equal to or slightly larger than the line-height (e.g., `1em` or `1.5em`).

```css
p {
  margin-bottom: 1.5em;
}
```

### 2. Spacing Utilities (Tailwind)
Using the "Space Between" utilities on a parent container is essentially spacing.

```html
<article class="space-y-6">
  <p>Paragraph 1...</p>
  <p>Paragraph 2...</p>
</article>
```

### 3. Text Indent vs Spacing
Don't use both.
*   **Fiction/Books:** Indent first line, no margin bottom.
*   **Web/UI:** No indent, margin bottom.
