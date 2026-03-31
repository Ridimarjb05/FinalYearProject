# Flexible Ratios

> **Content-driven sizing**

Letting the content dictate the size (Masonry layouts).

## Usage
-   **Masonry Grids:** Pinterest-style layouts where items stagger.
-   **Chat Bubbles:** Images sent in chat should usually maintain their original aspect ratio (up to a max width/height).

## Implementation
-   Don't force an aspect ratio.
-   Use `max-width: 100%; height: auto;`.
-   **Trade-off:** Causes Layout Shift (CLS) if dimensions aren't reserved before the image loads.
