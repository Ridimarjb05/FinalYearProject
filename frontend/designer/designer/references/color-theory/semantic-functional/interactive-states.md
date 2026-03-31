# Interactive States

**Keywords:** Feedback, hover, active, focus, disabled, UX.

**Description:**
Colors change to indicate that an element is interactive and to reflect its current state. This provides crucial feedback to the user's input.

## Usage

### 1. The State Cycle
*   **Default:** The resting state.
*   **Hover:** Cursor is over the element. Usually 10% darker (or lighter in dark mode).
*   **Active (Pressed):** User is clicking down. Usually 20% darker.
*   **Focus:** Navigated via keyboard. Needs a strong outline (often Blue bubbles).
*   **Disabled:** Inactive. Usually Gray with reduced opacity (Opacity 0.5).

### 2. Pattern: Lighten/Darken
*   **Light Mode:** Darken the color on Hover.
*   **Dark Mode:** Lighten the color on Hover.

### 3. Ghost Buttons
For secondary actions (transparent background, colored border), the hover state often fills the background with a 10% opacity version of the color.

```css
.btn-primary:hover {
  background-color: var(--primary-dark-10); /* darken(primary, 10%) */
}

.btn-primary:active {
  background-color: var(--primary-dark-20); /* darken(primary, 20%) */
  transform: translateY(1px);
}
```
