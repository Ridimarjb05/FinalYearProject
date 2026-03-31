# Art Direction

> **Different crops per breakpoint**

Serving a completely *different* image (different crop or aspect ratio) for different screen sizes.

## Use Case
-   **Desktop:** Wide panoramic hero image.
-   **Mobile:** Square crop of the *center* subject (so they aren't tiny).

## Syntax
```html
<picture>
  <source media="(max-width: 799px)" srcset="square-crop.jpg">
  <source media="(min-width: 800px)" srcset="wide-hero.jpg">
  <img src="wide-hero.jpg" alt="...">
</picture>
```

## Distinction
-   Use `<picture>` for changing the *content/crop* (Art Direction).
-   Use `<img srcset>` for just changing the *resolution* (Size).
