# Card Hover

## Interactive States
Cards that act as links or triggers need clear interactive feedback.

### Visual Cues
- **Lift**: Increase shadow/elevation (e.g., `shadow-md` -> `shadow-lg`) and slightly translate up (`-translate-y-1`).
- **Border**: Darken or colorize the border.
- **Background**: subtle shift in background color (e.g., white -> very light gray).
- **Scale**: Very subtle scale up (`scale-[1.02]`). Use with caution to avoid blurry text or layout shifting.

### Implementation Details
- **Transition**: Always smooth changes with a transition (e.g., `transition-all duration-200 ease-in-out`).
- **Cursor**: Change cursor to `pointer`.
- **Focus**: Ensure distinct `:focus-visible` styles for keyboard users (e.g., a focus ring).

### Whole Card Clickable
- To make the entire card clickable while keeping semantic HTML, you can use a pseudo-element on the main link to cover the card using `::before` or `::after` with absolute positioning `inset-0`.
- ensure nested interactive elements (like 'Like' buttons) appear above the card link z-index.
