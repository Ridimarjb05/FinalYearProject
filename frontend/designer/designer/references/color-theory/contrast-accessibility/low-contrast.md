# Low Contrast

**Keywords:** Subtle, elegant, background, ghost, ethereal.

**Description:**
Minimizing the value difference between elements. This creates a soft, blended look. It is beautiful but dangerous for usability.

## Usage

### 1. Where to use it?
*   **Background Visuals:** Patterns or watermarks that shouldn't distract.
*   **Disabled States:** Buttons that aren't clickable *should* be low contrast.
*   **Secondary Metadata:** Timestamps, "read more" tags (but check accessibility!).

### 2. The Trap
Never use low contrast for:
*   Body text (hard to read).
*   Navigation (hard to find).
*   Form labels.

### 3. "Elegant" UI
Premium brands often use Dark Gray on Black or Light Gray on White.
*   **Tip:** Ensure at least 3:1 contrast ratio for large text if you want to stay compliant.

```css
.timestamp {
    color: #9ca3af; /* Gray-400 on White */
    font-size: 0.8rem;
}
```
