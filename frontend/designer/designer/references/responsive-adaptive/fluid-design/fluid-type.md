# Fluid Type

**Keywords:** Responsive Typography, Clamp, Viewport Units.

**Description:**
Text that scales smoothly between a minimum and maximum size depending on the viewport width, eliminating the need for many breakpoints.

## Usage

### 1. Clamp()
The modern standard.

```css
h1 {
  /* Min: 2rem, Preferred: 5vw + 1rem, Max: 5rem */
  font-size: clamp(2rem, 5vw + 1rem, 5rem);
}
```

### 2. Calc()
Older method, less control over min/max caps.

```css
h1 {
  font-size: calc(16px + 2vw);
}
```
