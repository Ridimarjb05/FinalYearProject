# Dot Pattern

**Keywords:** Polka Dots, Halftone, Background.

**Description:**
A repeating grid of dots. Simple, effective, and classic.

## Usage

### 1. CSS Radial Gradient
The most efficient way (no images needed).

```css
.dots {
  background-color: #fff;
  background-image: radial-gradient(#000 1px, transparent 1px);
  background-size: 20px 20px; /* Spacing */
}
```

### 2. Offset Dots
Creating a staggered look.

```css
.dots-offset {
  background-image:
    radial-gradient(#000 1px, transparent 1px),
    radial-gradient(#000 1px, transparent 1px);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}
```
