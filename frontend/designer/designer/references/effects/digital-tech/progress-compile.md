# Progress Compile

**Keywords:** Loading, Building, Stacking, Bar, Tech.

**Description:**
A loading bar constructed of small blocks or "compiling" segments rather than a smooth fill.

## Usage

### 1. CSS Grid / Flexbox
A row of small divs.
Use `nth-child` with `animation-delay` to light them up one by one.

```css
.block:nth-child(n) {
  animation: light-up 0.1s forwards;
  animation-delay: calc(0.05s * var(--n));
}
```
