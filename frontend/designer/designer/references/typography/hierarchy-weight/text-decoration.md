# Text Decoration

**Keywords:** Underline, Strikethrough, Links, Emphasis.

**Description:**
Text decoration adds lines to text. The most common is the underline (for links) and the line-through (for deleted items).

## Modern Styling

### 1. Skipping Ink
Modern browsers strictly implement `text-decoration-skip-ink: auto` by default. This clears the underline around descenders (like g, y, p) for better legibility.

### 2. Custom Underlines
You can control the color, style, and thickness independently of the text.

```css
a {
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.3); /* Subtle */
  text-decoration-thickness: 2px;
  text-underline-offset: 4px; /* Breathing room */
}

a:hover {
  text-decoration-color: black;
}
```

### 3. Tailwind Utilities
*   `underline`
*   `decoration-blue-500`
*   `decoration-2`
*   `underline-offset-4`

### 4. Strikethrough
Used for completed tasks or discounted prices.
*   `line-through`
*   *Tip:* Reduce opacity of struck-through text to de-emphasize it visually.
