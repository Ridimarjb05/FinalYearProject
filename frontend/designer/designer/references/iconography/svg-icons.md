# SVG Icons

> **Scalable vector implementation**

SVGs (Scalable Vector Graphics) are the industry standard for web icons.

## Pros
-   **Scalable:** Crisp at any size.
-   **Styleable:** Can control fill, stroke, and color via CSS.
-   **Animatable:** Individual paths can be animated.
-   **Accessibility:** Can contain title and description tags.

## Best Practices
-   **Clean Code:** Optimize SVGs to remove editor metadata (Sketch/Figma comments) before using.
-   **ViewBox:** Ensure the `viewBox` is consistent (e.g., `0 0 24 24`) for all icons to safeguard distinct sizing.
-   **Inline:** Inline SVG allows for CSS interaction (hover, color change).
-   **Img Tag:** `<img src="icon.svg">` is cacheable but harder to style dynamically.
