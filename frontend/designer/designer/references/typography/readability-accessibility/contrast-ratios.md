# Contrast Ratios

**Keywords:** WCAG, Accessibility, Legibility, Color, AA, AAA.

**Description:**
Contrast ratio is the difference in luminance between the text color and background color. Low contrast causes eye strain and makes content invisible to users with vision impairments.

## WCAG 2.1 Guidelines

### 1. Normal Text (Under 18pt / 24px)
*   **AA Standard:** 4.5:1
*   **AAA Standard:** 7:1

### 2. Large Text (Over 18pt / 24px OR Bold 14pt / 18.5px)
*   **AA Standard:** 3:1
*   **AAA Standard:** 4.5:1

### 3. Interface Components (Buttons, Inputs)
*   **AA Standard:** 3:1

## Common Failures
*   Gray text on white backgrounds (e.g., `#999` on `#FFF` fails).
*   Light orange/yellow text on white.
*   Text over complex images without an overlay.

## Tools
*   **Chrome DevTools:** Inspect element > Click color square > see contrast ratio.
*   **WebAIM Contrast Checker:** Online tool.

*Note:* Design for AA as a baseline. AAA is great but severely limits color palette choices.
