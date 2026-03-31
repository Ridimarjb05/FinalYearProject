# Component Spacing

**Concept:** Internal padding and gap standards for components.

Defining strict rules for how components are spaced internally ensures they feel solid and well-constructed.

## Common Patterns

### Buttons
- **Horizontal Padding:** Often larger than vertical (e.g., px-4 py-2).
- **Icon Gap:** Standard gap between text and icon (e.g., 8px).

### Cards
- **Padding:** Usually consistently `p-4` (16px) or `p-6` (24px).
- **Content Gap:** Space between title, body, and footer (often `gap-4`).

### Inputs
- **Padding:** Needs to match buttons for alignment.
- **Internal Gap:** Space between input text and left/right icons.

## Rules of Thumb
- **Compact vs Comfortable:** Define different sets of internal spacing for different densities.
- **The Box Model:** Remember that border and padding add to the size. Use `box-sizing: border-box`.
- **Rhythm:** Internal spacing should usually be equal to or smaller than the external margin spacing to keep the component feeling cohesive.
