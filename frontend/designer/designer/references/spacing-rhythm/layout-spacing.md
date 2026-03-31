# Layout Spacing

**Concept:** Gaps between major sections and grid columns/rows.

Layout spacing defines the macro-structure of the page. It dictates how distinct the major areas of the content are.

## Structural Spacing

### Section Gaps
- **Small Sections:** 48px or 64px
- **Major Sections:** 96px or 128px
- **Full Screen Sections:** `min-h-screen` or `100vh` padding.

### Grid Gaps (Gutters)
- **Mobile:** 16px (keep content max-width readable)
- **Tablet:** 24px
- **Desktop:** 32px or 48px (more breathing room)

### Container Padding
- **Horizontal Padding:** Ensure content doesn't touch the edge of the viewport.
  - Mobile: `px-4`
  - Tablet: `px-6` or `px-8`
  - Desktop: `max-w-screen-xl mx-auto` (centered with auto margins)

## Consistency
- Use a consistent vertical rhythm (e.g., all major sections have `py-24`).
- Ensure the spacing helps the user understand the hierarchy of information.
