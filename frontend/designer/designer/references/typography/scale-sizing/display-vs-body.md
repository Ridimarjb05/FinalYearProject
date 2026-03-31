# Display vs. Body

**Keywords:** Legibility, Readability, Copy, Headlines, Contrast.

**Description:**
Distinguishing between "Display" (headlines) and "Body" (reading text) is crucial for both aesthetics and readability. Display type is designed to be used at large sizes, often with tighter spacing and more intricate details. Body type is designed for long-form reading at small sizes, prioritizing open counters, looser spacing, and sturdy serifs/strokes.

## Principles

### 1. Display Type
*   **Usage:** H1, H2, Hero sections.
*   **Characteristics:** High contrast, tight spacing, decorative.
*   **Scale:** Large sizes (e.g., 32px+).
*   **Font Choice:** Can be eccentric (Script, Serif Display, heavy weights).

### 2. Body Type
*   **Usage:** Paragraphs, long content.
*   **Characteristics:** Low/Moderate contrast, open spacing, large x-height.
*   **Scale:** Small/Medium sizes (e.g., 14px - 20px).
*   **Font Choice:** Workhorse faces (Inter, Roboto, Georgia, Merriweather).

## Usage

### 1. CSS Implementation
Separate font families for different roles.

```css
:root {
  --font-display: 'Playfair Display', serif;
  --font-body: 'Lato', sans-serif;
}

h1, h2, h3 {
  font-family: var(--font-display);
}

body {
  font-family: var(--font-body);
}
```

### 2. Tailwind Config
```javascript
theme: {
  fontFamily: {
    'display': ['Oswald', ...],
    'body': ['Open Sans', ...],
  }
}
```

### 3. Optical Sizing
Variable fonts often have an `opzl` axis to automatically adjust for display vs body.
```css
h1 {
  font-variation-settings: 'opsz' 72; /* Display optimization */
}
p {
  font-variation-settings: 'opsz' 14; /* Text optimization */
}
```
