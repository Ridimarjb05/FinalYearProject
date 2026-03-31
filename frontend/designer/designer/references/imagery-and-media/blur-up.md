# Blur-Up

> **Low-quality placeholder technique**

Showing a tiny, blurry version of the image immediately while the full version loads.

## workflow
1.  Generate a tiny (e.g., 20px wide) version of the image.
2.  Display it stretched to fill the container (with `filter: blur(10px)`).
3.  Load the high-res image in the background.
4.  Fade the high-res image smoothly over the blur when ready.

## Benefits
-   **Perceived Performance:** User sees "something" immediately.
-   **Layout Stability:** Prevents white flashes.
