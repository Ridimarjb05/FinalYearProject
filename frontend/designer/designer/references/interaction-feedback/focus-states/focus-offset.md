# Focus Offset

**Description:**
Adding space between an element and its focus indicator. This is particularly useful for elements that have same-color borders or backgrounds, ensuring the focus ring stands out.

**Key Principles:**
- **Separation**: Creates a clear visual separation between the component and the focus selection.
- **Contrast**: Helps the focus ring pop against complex backgrounds.

**Common Patterns:**
- **CSS `outline-offset`**: The standard property to achieve this. Positive values push the ring out, negative values pull it in.
- **Double Border**: Using a white shadow + a colored shadow to create an offset look on standard borders.
