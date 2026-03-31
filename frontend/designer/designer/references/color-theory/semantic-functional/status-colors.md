# Status Colors

**Keywords:** Feedback, system, traffic-lights, convention.

**Description:**
The universal language of UI feedback. These colors have strong pre-existing meanings that you should break only with extreme caution.

## Usage

### 1. The Big Four
*   **Success (Green):** Completion, saved, good, safe.
*   **Warning (Yellow/Orange):** Caution, wait, fix-needed but not critical.
*   **Error (Red):** Danger, failure, delete, stop.
*   **Info (Blue):** Neutral information, help, learn more.

### 2. Tone Mapping
Don't use the standard harsh "coder colors" (e.g., `#FF0000`). Tune them to your brand.
*   *Brand:* Pastel/Soft. *Error:* Soft Salmon Pink.
*   *Brand:* Cyberpunk. *Error:* Neon Red.

### 3. Backgrounds vs Text
*   **Solid:** High impact (Toasts, Badges).
*   **Subtle:** Low impact (Background of a form validation message).
    *   *Recipe:* Take the base status color, reduce opacity to 10% (or tint heavily with white) for the background. Keep the text dark/saturated.

```css
.toast-success {
  background-color: #dcfce7; /* Green-100 */
  color: #14532d; /* Green-900 */
  border: 1px solid #22c55e; /* Green-500 */
}
```
