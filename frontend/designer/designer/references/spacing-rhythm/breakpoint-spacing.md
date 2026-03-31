# Breakpoint Spacing

**Concept:** Spacing changes at breakpoints.

Manually adjusting spacing tokens at specific media query breakpoints (sm, md, lg, xl).

## Strategy
- **Base (Mobile):** Start tight. Padding 16px. Gap 16px.
- **Tablet (md):** Open up. Padding 32px. Gap 24px.
- **Desktop (xl):** Maximum breathing room. Padding 64px+.

## Tailwind Approach
`<div class="p-4 md:p-8 lg:p-12">`

## Consistency
Try to change spacing globally rather than locally. If the section padding doubles on desktop, it should double for *all* sections.
