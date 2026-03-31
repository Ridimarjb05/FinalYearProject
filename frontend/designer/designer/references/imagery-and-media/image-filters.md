# Image Filters

> **Grayscale, sepia, blur**

CSS filters can transform imagery dynamically.

## Common Filters
-   `grayscale(100%)`: Good for "inactive" states or "logo walls" (hover to color).
-   `blur(px)`: Great for backgrounds behind modals or text to create depth.
-   `brightness(%)`: Use to darken images on hover or for text contrast.
-   `sepia(%)`: Retro feel (use sparingly).

## Performance
-   Can be expensive on the GPU if applied to large images or many elements at once. Use with caution on mobile.
