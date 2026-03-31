# WCAG Compliant

**Keywords:** Accessibility, standards, law, inclusion, AA, AAA.

**Description:**
Following the Web Content Accessibility Guidelines (WCAG) for color contrast. This ensures your content is readable by people with low vision.

## Usage

### 1. The Magic Numbers
*   **AA (minimum):** 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt bold).
*   **AAA (enhanced):** 7:1 for normal text, 4.5:1 for large text.

### 2. UI Components
*   **Non-text Contrast:** Buttons, inputs, and focus states require a 3:1 contrast ratio against the background to be distinguishable.

### 3. Tools
*   Don't guess. Use a contrast checker plugin in Figma or DevTools.
*   **DevTools:** Inspect element > Click color square > See contrast ratio.

### 4. Common Failures
*   Orange on White (often fails AA).
*   Light Gray text on White (often fails AA).
*   Brand colors that work in print often fail on screens.

**Rule:** Adjust the *lightness* of the color, not the hue, to fix contrast issues.
