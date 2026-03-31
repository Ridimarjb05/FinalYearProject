# Border Radius Scale

## Systematic Rounding
Defining a set of radii to ensure consistency across the application.

### The Scale
- **None**: `rounded-none` (0px). Square images, ful-width banners.
- **Small (sm)**: `rounded-sm` (2px). Checkboxes, tags, tiny badges.
- **Default**: `rounded` (4px or 6px). Inputs, buttons, cards.
- **Medium (md)**: `rounded-md` (6px or 8px). Larger cards, modals.
- **Large (lg)**: `rounded-lg` (8px or 12px). Featured containers.
- **X-Large (xl)**: `rounded-xl` (12px or 16px).
- **Full**: `rounded-full` (9999px). Buttons (pills), avatars, status indicators.

### Alignment
- **Concentric Corners**: `Outer Radius = Inner Radius + Padding`.
- Failing to follow this math results in "wobbly" looking uneven gaps between nested containers.
