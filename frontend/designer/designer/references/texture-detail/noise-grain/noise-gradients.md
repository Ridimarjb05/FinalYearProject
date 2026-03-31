# Noise Gradients

**Keywords:** Dithering, Smooth, Lo-fi.

**Description:**
Apply noise specifically within gradients to prevent "banding" (visible steps between colors) or to create a retro airbrushed look.

## Usage

### 1. Masking
Using a noise mask on a gradient.

### 2. Dither Tool
Pre-processing images/gradients with dithering before using them in CSS.

### 3. CSS Radial Dither
Simulated via repeating radial gradients (complex).

```css
/* Conceptual */
.dither-gradient {
  background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url('noise.png');
  background-blend-mode: overlay;
}
```
