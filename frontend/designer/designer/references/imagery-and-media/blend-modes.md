# Blend Modes

> **Multiply, screen, overlay effects**

CSS `mix-blend-mode` allows elements to blend with their background, like layers in Photoshop.

## Modes
-   **Multiply:** Darkens. Good for placing dark text/logos on light textured backgrounds.
-   **Screen:** Lightens. Good for placing light text/logos on dark backgrounds.
-   **Overlay:** Contradictory—lights get lighter, darks get darker. Adds contrast and "soaks" the element into the background.
-   **Color:** Adopts the hue/saturation of the blend layer while keeping luminosity of the base.

## Usage
-   Text over images.
-   Colored "tint" divs over photos.
-   **Warning:** Content can become illegible if the background changes significantly. Always have a fallback background color.
