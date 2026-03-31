# Clamp Values

**Keywords:** Math Functions, Min Preferred Max.

**Description:**
Using the `clamp()` function for any CSS property that accepts a length, allowing for dynamic adaptation within safe boundaries.

## Usage

### 1. The Syntax
`clamp(MIN, PREFERRED, MAX)`

*   **MIN**: The value will never go below this.
*   **PREFERRED**: The dynamic value (usually viewport based) used when between min/max.
*   **MAX**: The value will never exceed this.

### 2. Practical Examples

```css
/* Responsive Width: 50% but not smaller than 300px or larger than 800px */
.card {
  width: clamp(300px, 50%, 800px);
}

/* Responsive Border Radius: radius grows with screen */
.box {
  border-radius: clamp(10px, 2vw, 40px);
}
```
