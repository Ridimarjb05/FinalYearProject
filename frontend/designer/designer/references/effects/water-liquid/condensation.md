# Condensation

**Keywords:** Cold, Glass, Mist, Foggy, Droplets.

**Description:**
Tiny water droplets forming on a surface (like a cold drink or window), blurring the background.

## Usage

### 1. CSS Backdrop Filter & Mask
Use a noise texture as a mask for `backdrop-filter: blur(5px)`.

### 2. Canvas
Draw thousands of tiny semi-transparent circles. Occasionally merge neighbors into larger drops.
