# WebP & AVIF

> **Modern format optimization**

Next-gen formats offer significantly better compression than JPG/PNG.

## AVIF
-   **Best compression:** Can be 50% smaller than JPEG.
-   **Support:** Good modern support.
-   **Cons:** lengthy encoding time (slow to generate).

## WebP
-   **Standard:** Supported everywhere.
-   **Versatile:** Supports transparency (like PNG) and animation (like GIF).

## Fallback Strategy
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```
