# Line Height (Leading)

**Keywords:** Leading, Breathability, Readability, Vertical, Spacing.

**Description:**
Line height is the vertical distance between lines of text. It is the single most important factor for readability after font size. Too tight, and lines blur together. Too loose, and the eye gets lost moving from one line to the next.

## Guidelines

### 1. The Golden Rule
*   **Body Text:** 1.4 to 1.6 (unitless).
*   **Headlines:** 1.1 to 1.3 (tighter).

*Why?* Larger text needs less breathing room proportionally. Smaller text takes up more horizontal space relative to its height, so it needs more vertical separation.

### 2. Unitless Values
Always use unitless values (e.g., `line-height: 1.5`) rather than absolute (e.g., `24px`) or percentage values. This allows the line height to scale automatically if the child element has a different font size.

```css
p {
  line-height: 1.5; /* Good */
  line-height: 24px; /* Bad if font-size changes */
}
```

### 3. Usage in Tailwind
*   `leading-tight` (1.25) - Headlines.
*   `leading-snug` (1.375) - Subheads.
*   `leading-normal` (1.5) - Body default.
*   `leading-relaxed` (1.625) - Long-form reading.
