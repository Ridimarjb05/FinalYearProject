# Pull Quotes

**Keywords:** Blockquote, Excerpt, Highlight, Break.

**Description:**
A pull quote is a key phrase or quotation "pulled" from the text and used as a graphic element. It breaks up long walls of text and entices the reader to continue.

## Styling

### 1. The "Big & Centered"
Distinctive font, centered, large size.
*   *Font:* Italic Serif or Heavy Sans.
*   *Size:* 1.5x - 2x body text.

### 2. The "Bordered"
Left border or heavy quote marks.
```css
blockquote {
  border-left: 4px solid var(--accent);
  padding-left: 1.5rem;
  font-style: italic;
  font-size: 1.25rem;
}
```

### 3. Hanging Punctuation
For quote marks to look right, they should "hang" outside the alignment of the text.
*   *Technique:* Negative text-indent.

```css
blockquote {
  text-indent: -0.5em; /* pulls the opening quote mark back */
}
```
