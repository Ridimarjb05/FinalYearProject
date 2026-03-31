# Inline Icons

> **Icons within text sizing**

Icons placed directly within a text block (like a "info" circle or an external link arrow) must harmonize with the line height and font size.

## Alignment
-   **Vertical Center:** Align the icon vertically with the cap-height of the text, not the baseline, for better visual centering.
-   **Size:** The icon usually needs to be slightly smaller or equal to the font size (em).
    -   Ex: Before 16px text -> use 16px icon.

## Spacing
-   Add distinct spacing (margin) between the text and the icon.
-   Use `white-space: nowrap` on the icon+text unit if possible to prevent the icon from hanging alone on a new line.

## Color
-   Usually inherits the text color (`currentColor`).
