# Searchlight Sweep

**Keywords:** Hollywood, Premiere, Prison, Scanner, Security.

**Description:**
A beam of light that rotates back and forth or in a circle, often originating from the ground and pointing up.

## Usage

### 1. CSS Animation
Rotate a `.beam` (trapezoid with gradient) around a bottom pivot point.

```css
.searchlight {
  transform-origin: bottom center;
  animation: sweep 4s ease-in-out infinite alternate;
}

@keyframes sweep {
  from { transform: rotate(-45deg); opacity: 0.5; }
  to { transform: rotate(45deg); opacity: 1; }
}
```
