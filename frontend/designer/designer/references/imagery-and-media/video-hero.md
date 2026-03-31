# Video Hero

> **Background video patterns**

A muted, looping video playing behind text in a hero section.

## Guidelines
-   **No Sound:** It must be muted by default.
-   **Loop:** Seamless loop is essential.
-   **Sizing:** Use `object-fit: cover` to fill the container.
-   **Overlay:** Essential to put a dark/light overlay on top so text remains readable regardless of video frame content.

## Performance
-   Use highly compressed video (WebM/MP4).
-   Provide a static fallback image for mobile (where auto-playing video might be blocked or dat-intensive).
