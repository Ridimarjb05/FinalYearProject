# Monochromatic

**Keywords:** Unity, cohesive, organized, subtle.

**Description:**
A color scheme derived from a single base hue and extended using its shades, tones, and tints. This creates a deeply cohesive and soothing look that is guaranteed to be harmonious. It shines in minimalist interfaces where structure is powered by lightness rather than hue changes.

## Usage

### 1. Palette Generation
Select a base color (e.g., Brand Blue #0066CC).
*   **Tint:** Add white (increase lightness). Usage: Backgrounds, subtle borders.
*   **Tone:** Add gray (decrease saturation). Usage: Disabled states, secondary text.
*   **Shade:** Add black (decrease lightness). Usage: Text, active states, strong borders.

```css
:root {
  /* Base */
  --primary-500: #3b82f6;

  /* Tints */
  --primary-100: #dbeafe; /* Backgrounds */
  --primary-200: #bfdbfe;

  /* Shades */
  --primary-700: #1d4ed8; /* Hover states */
  --primary-900: #1e3a8a; /* Text */
}
```

### 2. Application
*   Use light tints for **surface backgrounds**.
*   Use the base hue for **primary actions**.
*   Use deep shades for **typography** to ensure contrast without introducing black.
