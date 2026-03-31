# Captions

**Keywords:** Figcaption, Figures, Images, Annotations, Tiny.

**Description:**
Captions explain non-text content (images, charts, videos). They must be distinct from the body text so the reader doesn't accidentally read them as part of the narrative.

## Guidelines

### 1. Visual Distinction
*   **Size:** Smaller than body (e.g., 0.875rem or 0.8rem).
*   **Color:** Lighter (Gray/Slate).
*   **Style:** Often Italic or Sans-serif (in a Serif document).

### 2. Spacing
Closer to the image than the surrounding text. The caption belongs to the image.

```html
<figure>
  <img src="..." class="mb-2">
  <figcaption class="text-sm text-gray-500 text-center italic">
    Figure 1: Distribution of fonts (2023)
  </figcaption>
</figure>
```

### 3. Alignment
*   **Centered:** For centered images.
*   **Left:** For full-width or left-aligned images.
