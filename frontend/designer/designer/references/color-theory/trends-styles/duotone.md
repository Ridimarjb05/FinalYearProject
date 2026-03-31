# Duotone

**Keywords:** Spotify, print-effect, bold, graphic.

**Description:**
An image or graphic composed of only two contrasting colors. This unifies disparate photography under a single brand identity.

## Usage

### 1. Technique
Map the black (shadows) of an image to Color A, and the white (highlights) to Color B.

### 2. High Contrast is Critical
*   **Shadow Color:** Must be dark (e.g., Deep Purple).
*   **Highlight Color:** Must be light/bright (e.g., Neon Green).
*   *If colors are too similar in value, the image becomes unreadable.*

### 3. CSS Filter
```css
.duotone-img {
  filter: url('#duotone-filter'); /* SVG filter needed for true duotone */
  /* Or pseudo-duotone via overlay */
  position: relative;
}
.duotone-img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #4a00e0, #8e2de2);
  mix-blend-mode: color; /* or multiply/screen */
}
```
