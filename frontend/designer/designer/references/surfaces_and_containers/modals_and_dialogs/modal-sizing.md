# Modal Sizing

## Standard Widths
Responsive modal sizing ensures content is readable on all devices.

### Sizes
- **Small (sm)**: `max-w-sm` (approx 384px). Good for alerts, confirmations, and simple forms.
- **Medium (md)**: `max-w-md` (approx 448px) to `max-w-lg` (approx 512px). detailed forms, user profile edits.
- **Large (lg)**: `max-w-xl` (approx 576px) to `max-w-2xl` (approx 672px). complex data, grids, or multi-step wizards.
- **Extra Large (xl)**: `max-w-4xl`+ or `w-11/12`. data tables, media previews.
- **Fullscreen**: `w-screen h-screen`. Immersive tasks, intricate editors, or mobile views for complex modals.

## Responsive Behavior
- **Mobile**: typically full width (`w-full`) with some margin or bottom sheet style (`w-full` fixed to bottom).
- **Tablet/Desktop**: Centered with a `max-width` constraint.

## Height Handling
- **Auto Height**: Grows with content. Best for most simple modals.
- **Fixed Height with Scroll**: `max-h-[80vh]` with `overflow-y-auto` in the body. Prevents the modal from being taller than the viewport.
