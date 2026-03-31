# Icon Sprites

> **Combined icon sheets**

A method of combining multiple icons into a single file to reduce HTTP requests.

## Traditional Sprites (Image)
-   One large PNG/JPG. Background-position changes to show the icon.
-   *Deprecated* for most modern icon use due to lack of scaling/styling.

## SVG Sprites (Symbols)
-   A single SVG file containing multiple `<symbol>` elements.
-   Used via `<svg><use href="#icon-name"></svg>`.
-   **Pros:** Efficient, cacheable.
-   **Cons:** Shadow DOM limitations—styling internal paths based on parent state can be tricky compared to inline SVG.
