# Card Elevation

## Depth & Hierarchy
Elevation uses shadows or z-index to communicate hierarchy and interactivity.

### Levels
1.  **Flat (Level 0)**: No shadow. Blends with the background. Used for grouped content on a distinct surface.
2.  **Raised (Level 1)**: Subtle shadow. Indicates a distinct interactive element or content block. Standard state for most cards.
3.  **Floating (Level 2)**: distinct shadow. Used for hover states or dragged items.
4.  **Overlay (Level 3)**: Deep shadow. Used for modals or high-priority floating elements.

## Shadow Recommendations
- **Subtle**: `box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);` (Tailwind `shadow-sm`)
- **Default**: `box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);` (Tailwind `shadow`)
- **Medium**: `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);` (Tailwind `shadow-md`)
- **Large**: `box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);` (Tailwind `shadow-lg`)

## Dark Mode Considerations
- Shadows are less visible on dark backgrounds.
- Use lighter surface overlays (white with low opacity) to indicate elevation instead of or in addition to shadows.
- Ensure borders or distinct background shades define edges clearly.
