# Lazy Loading

> **Defer offscreen images**

Loading images only when they are about to scroll into view.

## Native
-   `<img loading="lazy" ...>`
-   Supported in all modern browsers.
-   **Rule:** Always verify "above the fold" images (LCP candidates) are NOT lazy loaded, or they will delay rendering.

## JavaScript
-   IntersectionObserver API.
-   Used for more complex scenarios (background images, fading in content).
