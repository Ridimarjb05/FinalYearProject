# High Contrast

**Keywords:** Readability, clarity, bold, utilitarian, brutalist.

**Description:**
Maximizing the difference in "value" (lightness) between foreground and background elements. This is the gold standard for legibility and important actionable items.

## Usage

### 1. Black & White
The ultimate high contrast pairing.
*   **Ratio:** 21:1.
*   **Vibe:** Stark, serious, newspaper, luxury (when using serif fonts).

### 2. Complimentary Colors
Using opposites on the color wheel also creates high contrast, but "value contrast" is more important for reading.
*   **Bad:** Pure Red on Pure Blue (High Hue Contrast, Low Value Contrast).
*   **Good:** Dark Blue on Pale Yellow (High Hue Contrast, High Value Contrast).

### 3. Application
*   **Primary Buttons:** Must stand out against their container.
*   **Headlines:** Need to be instantly readable.
*   **Alerts:** Danger warnings need high contrast to grab attention.

```css
.alert-urgent {
  background-color: #000000;
  color: #fbbf24; /* Amber-400 */
  border: 4px solid #ef4444; /* Red-500 */
}
```
