# Container Padding

**Concept:** Edge spacing across viewports.

The spacing that prevents your content from touching the left/right edges of the screen.

## Rules
- **Never Zero:** Content should never touch the edge (except specifically designed full-bleed images).
- **Safe Area:** On modern mobile phones (with notches and rounded corners), ensure your container padding respects the "safe area" insets (`env(safe-area-inset-left)`).
- **Scaling:**
  - Mobile: `px-4` (16px) minimum.
  - Tablet: `px-6` (24px) or `px-8` (32px).
  - Desktop: Often centered with `max-width`, effectively creating massive auto-margins.
