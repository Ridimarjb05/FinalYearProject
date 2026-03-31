# Text Scaling (User Preferences)

**Keywords:** Zoom, Font Size Preference, Relative Units, Rem, Em.

**Description:**
Users can change their default font size in the browser or OS settings (e.g., from 16px to 24px because of vision issues). Development must support this by avoiding fixed units.

## The Rule of REM

### 1. Use `rem` for Fonts
`rem` is relative to the root html font-size. If the user sets their browser to 24px, `1rem` becomes 24px.
*   **Bad:** `font-size: 16px` (Overrides user preference).
*   **Good:** `font-size: 1rem` (Respects user preference).

### 2. Use `rem` for Layout (Usually)
Using `rem` for padding/margin ensures the layout breathes as the text gets bigger.
*   If text doubles in size, the surrounding padding should also double to prevent crowding.

### 3. Scaling vs Zooming
*   **Browser Zoom (Cmd +/-):** Scales everything (pixels included). Modern browsers handle this well.
*   **Text-Only Zoom:** Only scales text. This breaks layouts that use fixed heights (e.g., `height: 50px` button with huge text will overflow). **Avoid fixed heights on text containers.**
