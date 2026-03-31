# Progressive JPEG

> **Incremental image loading**

Encoding JPEGs so they load in "scans" of increasing quality, rather than top-to-bottom.

## Behavior
-   User sees a full-size but blocky version almost immediately.
-   The image sharpens as more data arrives.

## Advantage
-   Better user experience on slow connections compared to "Baseline" JPEG (which loads empty space until the data arrives).
-   Create these settings in your image export tool (Photoshop, ImageMagick).
