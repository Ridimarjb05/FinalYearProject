# Icon Fonts

> **Font-based icons (Icon fonts)**

Using a custom font file where glyphs are mapped to unicode characters.

## Pros
-   Easy to size (font-size) and color (color).
-   Cached as a single file.

## Cons
-   **Rendering Issues:** Anti-aliasing can vary wildly between browsers/OS.
-   **Accessibility:** Screen readers might try to read the "character" unless properly hidden.
-   **Fail States:** If the font fails to load, users might see random letters or "tofu" boxes.
-   **Positioning:** Harder to align perfectly to the pixel grid than SVGs.

## Verdict
-   Largely replaced by SVG for modern web development, but still used in some legacy systems or specialized CMS setups.
