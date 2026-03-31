# Pixel Alignment

> **Crisp rendering on screens**

Ensuring icons align to the pixel grid prevents blurry anti-aliasing edges ("fuzzy" icons).

## Rules
-   **Integers:** Use whole numbers for coordinates whenever possible (X: 12.0, not 12.35).
-   **Stroke Alignment:**
    -   Odd width stroke (1px, 3px): align to the half-pixel (0.5) to render crisply.
    -   Even width stroke (2px, 4px): align to the full pixel integer (1.0).
-   **Diagonals:** Diagonal lines are hardest to align. Use 45-degree angles when possible for the cleanest rendering.

## Testing
-   Always preview icons at 100% scale (1:1) to check for fuzziness.
-   Export as PNG to check the rasterization before finalizing the vector.
