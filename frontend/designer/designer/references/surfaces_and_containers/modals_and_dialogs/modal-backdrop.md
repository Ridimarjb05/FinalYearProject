# Modal Backdrop

## Overlay Styles
The backdrop (scrim) draws attention to the modal by obscuring the content behind it.

### Opacity
- **Light**: `bg-black/20`. Subtle focus.
- **Standard**: `bg-black/50`. Clear separation. Most common.
- **Heavy**: `bg-black/80`. High contrast, focuses entirely on the modal task.

### Blur (Glassmorphism)
- Adding a blur effect creates a modern, depth-of-field look.
- **Soft Blur**: `backdrop-blur-sm`.
- **Heavy Blur**: `backdrop-blur-md` or `backdrop-blur-lg`. Can sometimes be distracting if too heavy or affect performance on low-end devices.

### Interaction
- **Click to Close**: Clicking the backdrop should typically close the modal (unless it's a persistent dialog requiring specific action).
- **Static**: For critical alerts, the backdrop may be non-interactive to force a choice within the modal.

## Animation
- Backdrop usually fades in (`opacity-0` -> `opacity-100`) slightly faster than the modal content to set the stage.
