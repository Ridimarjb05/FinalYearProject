# Variable Fonts

**Keywords:** Axes, Performance, Animation, Interpolation, Modern.

**Description:**
Variable fonts are a single font file that behaves like multiple fonts. Instead of having separate files for "Regular", "Bold", and "Italic", a single variable font file contains all valid weights and widths. This offers huge performance benefits and granular control (e.g., specific weights like 450).

## Usage

### 1. CSS Syntax
Use `font-variation-settings` or modern `font-*` properties.

```css
@font-face {
  font-family: 'Inter Variable';
  src: url('Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900; /* Range of available weights */
}

.element {
  /* Standard property */
  font-weight: 550;

  /* Low-level control */
  font-variation-settings: 'wght' 550, 'wdth' 75;
}
```

### 2. Common Axes
*   `wght` (Weight): 100 to 900.
*   `wdth` (Width): 50% to 200%.
*   `slnt` (Slant): -10deg to 0deg.
*   `opsz` (Optical Size): Adjusts thickness for size.

### 3. Animation
Variable fonts are **animatable**. You can smoothly transition the weight or width on hover.

```css
.button {
  transition: font-weight 0.3s;
  font-weight: 400;
}
.button:hover {
  font-weight: 700; /* Smooth interpolation */
}
```
