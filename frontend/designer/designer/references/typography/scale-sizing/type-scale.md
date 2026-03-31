# Type Scale

**Keywords:** Modular Scale, Ratio, Fibonacci, Golden Ratio, Rhythm.

**Description:**
A type scale is a set of font sizes derived from a mathematical ratio. Using a scale creates harmony and consistency across the typography. Common ratios include Major Third (1.250), Perfect Fourth (1.333), and Golden Ratio (1.618).

## Usage

### 1. Mathematical Derivation
Base size: 16px. Ratio: 1.25 (Major Third).

*   Base: 16px (1rem)
*   Md: 20px (1.25rem)
*   Lg: 25px (1.563rem)
*   Xl: 31.25px (1.953rem)
*   2Xl: 39.06px (2.441rem)

### 2. Implementation in CSS
Using variables to enforce the scale.

```css
:root {
  --type-base: 1rem;
  --type-scale: 1.25;
  --text-sm: calc(var(--type-base) / var(--type-scale));
  --text-base: var(--type-base);
  --text-md: calc(var(--text-base) * var(--type-scale));
  --text-lg: calc(var(--text-md) * var(--type-scale));
  --text-xl: calc(var(--text-lg) * var(--type-scale));
}
```

### 3. Tailwind Config
Generating a scale in Tailwind.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
  }
}
```
