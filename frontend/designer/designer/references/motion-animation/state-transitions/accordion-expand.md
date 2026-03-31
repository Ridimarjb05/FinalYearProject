# Accordion Expand

Smoothly revealing hidden content sections.

### Mechanics
- **Property**: `height` or `max-height`.
- **Caution**: Animating `height: auto` is tricky in pure CSS; prefer JS-calculated height or `grid-template-rows` trick.
- **Icon**: Chevron rotates 180deg.
- **Goal**: Progressive disclosure without jarring layout shifts.
