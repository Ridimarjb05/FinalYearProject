# All Caps

**Keywords:** Uppercase, Yelling, Buttons, Labels, Tracking.

**Description:**
All caps text forms a rectangular "brick" shape. It is authoritative and loud, but harder to read in large blocks because we lose the "word shape" provided by ascenders and descenders.

## Golden Rules

### 1. Always Add Tracking
Uppercase letters are designed to sit next to lowercase letters. When next to each other, they crash. **Always** add positive letter-spacing (`0.05em` - `0.1em`).

### 2. Use for Short Strings
*   **Good:** Button Text ("BUY NOW"), Navigation ("HOME"), Section Headers ("LATEST NEWS").
*   **Bad:** Paragraphs, long comments.

### 3. Visual Weight
All caps is significantly heavier than mixed case. You often need to **reduce the weight** or **reduce the font size** to balance it.
*   *Example:* If body is 16px Regular, the All Caps label might work best as 12px Medium or 14px Regular.

## CSS Implementation

```css
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.85em; /* Scale down slightly */
  font-weight: 600;
}
```
