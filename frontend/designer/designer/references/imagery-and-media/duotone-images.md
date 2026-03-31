# Duotone Images

> **Two-color image treatment**

Mapping the shadows to one color and highlights to another.

## Effect
-   Creates a very strong, graphic look.
-   Removes "photo realism" in exchange for "brand alignment".
-   Great for backgrounds where you want texture but not distraction.

## Implementation
-   **CSS:** can be approximated with `filter: grayscale(100%) sepia(100%) hue-rotate(...)` but real duotone requires SVG filters or `<canvas>`.
-   **SVG Filter:** The most robust web method. Map `<feColorMatrix>` to exact brand values.
