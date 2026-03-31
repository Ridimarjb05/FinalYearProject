# Fluid Spacing

**Concept:** Viewport-relative gaps.

Instead of fixed pixel values that jump at breakpoints, fluid spacing uses math (often `clamp()`) to smoothly scale values between a minimum and maximum viewport size.

## CSS Clamp
`font-size: clamp(1rem, 2.5vw, 2rem);`

## Benefits
- **Smoothness:** No jarring layout shifts when resizing windows.
- **Maintenance:** You write the logic once, rather than defining behavior for 5 breakpoints.
- **Context:** Perfect for headers and major section padding that needs to feel proportional to the screen size.

## Drawbacks
- Can result in non-integer pixel values (sub-pixel rendering), which might blur sharp edges on low-res screens (less of an issue on modern displays).
