# Icon Color

> **currentColor and theming**

Managing icon color programmatically.

## currentColor
-   CSS keyword: `fill: currentColor;` or `stroke: currentColor;`.
-   Inherits the color value of the parent element's `color` property.
-   **Advantage:** Changing the text color on hover automatically changes the icon color.

## Theming
-   **Tokens:** Use design tokens (`text-primary`, `icon-muted`) to ensure icons adapt to Dark/Light mode automatically.
-   **States:** define specific color tokens for states (Success/Green, Error/Red, Warning/Yellow).

## Multi-color
-   For duotone icons, you might need two classes or props: one for the primary stroke (currentColor) and one for the secondary fill (often a shade with opacity).
