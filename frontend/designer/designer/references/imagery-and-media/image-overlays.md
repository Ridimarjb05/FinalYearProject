# Image Overlays

> **Color and gradient overlays**

Placing a colored tint over an image to ensure text legibility or brand alignment.

## Solid Overlay
-   A flat semi-transparent color (e.g., `rgba(0,0,0, 0.5)`).
-   Guarantees contrast for white text.

## Gradient Overlay
-   "Scrim": A gradient that goes from transparent to opaque (usually at the bottom or top). allows the photo to shine while providing a safe area for text.
-   **Brand Gradient:** Using brand colors (e.g., Blue to Purple) with `mix-blend-mode: multiply` or `overlay` for a stylistic effect.

## Accessibility
-   Always check contrast ratios of text on top of the overlay-treated image.
