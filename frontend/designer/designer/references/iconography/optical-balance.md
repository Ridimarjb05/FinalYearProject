# Optical Balance

> **Visual weight distribution**

Mathematically centering an object doesn't always look centered. Optical balance corrects for the visual weight of different shapes.

## Visual Weight
-   **Square:** Heaviest shape. Needs to be smaller than a circle to look the same size.
-   **Circle:** Lightest shape. Needs to be slightly larger than a square to feel equal.
-   **Triangle:** Heavy at the bottom, light at the tip. Center based on "center of mass", not bounding box.

## Corrections
-   **Overshoot:** Curved shapes (circles) should extend slightly beyond the cap-height/baseline of square shapes to appear the same height.
-   **Horizontal Center:** Asymmetrical icons (like a "Play" triangle) need to be nudged visually to the right to look centered in a container.
