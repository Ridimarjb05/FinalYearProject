# Complementary

**Keywords:** Vibrancy, contrast, impact, loud.

**Description:**
Two colors that are directly opposite each other on the color wheel. This scheme creates maximum contrast and maximum stability. It is extremely popular for Call-to-Action (CTA) buttons against a background.

## Usage

### 1. High Contrast UI
Ideal for directing attention.
*   **Dominant Color:** 80-90% of the UI (usually a cool color like Blue).
*   **Complement Color:** 10-20% of the UI (warm color like Orange) reserved strictly for actions.

### 2. Avoiding Vibrating Borders
**Caution:** Placing full saturation complementary colors directly next to each other (e.g., Red text on Green background) causes "vibration" where the edges look blurry or painful to read.
*   **Fix:** Use a neutral border between them (white or black), or desaturate one of the colors.

### 3. Example Pairings
*   **Blue & Orange:** Classic corporate trust vs. energetic action.
*   **Purple & Yellow:** Creative, luxury vs. cheerful highlight.
*   **Red & Green:** (Be careful of Holiday associations) High energy vs. calm.

```css
.cta-button {
  background-color: #fca311; /* Orange CTA */
  color: #14213d; /* On Blue Background */
}
```
