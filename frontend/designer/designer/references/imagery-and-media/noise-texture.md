# Noise & Texture

> **Adding grain to images**

A subtle grain or noise overlay can prevent color banding (gradients) and add a tactile, "premium" feel.

## Implementation
-   **Overlay:** A transparent PNG with noise pattern, repeated.
-   **SVG Filter:** `<feTurbulence>` to generate noise programmatically (lightweight).
-   **CSS Gradient:** Modern `conic-gradient` hacks can simulate noise, but SVG is cleaner.

## Benefit
-   Reduces the "digital sterility" of flat colors.
-   Helps mask compression artifacts in low-quality JPEGs.
