# Srcset & Sizes

> **Resolution switching**

Serving different image files based on the user's screen density (1x, 2x, 3x) and layout width.

## Syntax
```html
<img src="small.jpg"
     srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="...">
```

## Logic
-   **srcset:** Tells the browser *what* images are available and their inherent width.
-   **sizes:** Tells the browser *how wide* the image will be displayed on the screen (before the CSS loads).
-   **Result:** Browser picks the smallest file that still looks sharp.
