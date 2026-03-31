# System Fonts

**Keywords:** Native, Apple, Segoe, San Francisco, Performance, Zero-Latency.

**Description:**
Using the native system font stack means the website uses whatever font the operating system provides (San Francisco on Mac/iOS, Segoe UI on Windows, Roboto on Android). It is the most performant choice (0ms download) and feels "at home" to the user, though it sacrifices unique branding.

## The Modern Stack

### 1. CSS Implementation
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
```

### 2. Tailwind Implementation
Tailwind uses this stack by default for `font-sans`.

```javascript
// tailwind.config.js default
fontFamily: {
  sans: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    // ... emojis
  ],
}
```

## Benefits vs. Drawbacks
*   **Pros:** Instant loading (no FOUT/FOIT), perfect OS integration, good legibility.
*   **Cons:** Inconsistent look across devices (Mac vs Windows users see different things), generic "default" feel.
