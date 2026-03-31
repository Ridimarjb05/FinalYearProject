# Fluid Typography

**Keywords:** Clamp, Responsive, Scaling, Viewport, Smooth.

**Description:**
Fluid typography smooths the transition between different screen sizes by scaling text linearly between a minimum and maximum size, rather than jumping between fixed breakpoints. It typically uses the CSS `clamp()` function.

## Usage

### 1. The Clamp Function
`clamp(min, preferred, max)`

*   **Min:** The smallest size (e.g., for mobile).
*   **Preferred:** A dynamic value (usually combining `rem` and `vw`).
*   **Max:** The largest size (e.g., for desktop).

### 2. Implementation
```css
h1 {
  /* Scales from 2rem at 320px width to 4rem at 1200px width */
  font-size: clamp(2rem, 1.27rem + 3.64vw, 4rem);
}
```

### 3. Tailwind Arbitrary Values
```html
<h1 class="text-[clamp(2rem,5vw,4rem)]">
  Fluid Headline
</h1>
```

### 4. Tailwind Plugin (Official or 3rd Party)
Using a plugin like `@tailwindcss/typography` or creating a utility.

```javascript
// tailwind.config.js
theme: {
  extend: {
    fontSize: {
      'fluid-base': 'clamp(1rem, 0.8rem + 1vw, 1.25rem)',
      'fluid-xl': 'clamp(2rem, 1.5rem + 2.5vw, 4rem)',
    }
  }
}
```
