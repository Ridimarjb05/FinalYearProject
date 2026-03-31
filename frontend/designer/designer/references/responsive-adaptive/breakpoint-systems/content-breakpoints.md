# Content Breakpoints

**Keywords:** Intrinsic Sizing, Content-Driven, Custom Breakpoints.

**Description:**
Creating breakpoints based on when the content itself "breaks" or looks bad, rather than sticking strictly to device widths. This ensures the design always looks good.

## Usage

### 1. The "Awkward Phase" Fix
Adding a custom media query when a layout breaks between standard sizes.

```css
/* Standard is 768px, but nav breaks at 850px */
@media (max-width: 850px) {
  .nav-links { display: none; }
  .hamburger { display: block; }
}
```

### 2. Typography Adaptation
Adjusting font size when line length becomes too long or header wraps awkwardly.

```css
h1 { font-size: 3rem; }

/* Header wraps poorly here */
@media (max-width: 520px) {
  h1 { font-size: 2.2rem; }
}
```
