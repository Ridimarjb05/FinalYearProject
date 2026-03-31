# Card Radius

## Corner Rounding
Border radius affects the "friendliness" and modernity of the UI.

### Levels
- **Sharp (0px)**: Brutalist, technical, or very serious aesthetics.
- **Slight (2px-4px)**: Professional, crisp, standard for complex dashboards.
- **Moderate (6px-8px)**: Modern, friendly, very common in SaaS applications.
- **Rounded (12px-16px)**: Playful, mobile-friendly, "bubble" aesthetic.
- **Full**: Generally reserved for buttons or pills, not full cards.

## Consistency
- Maintain a consistent radius across similar components.
- **Nested Radius**: If a card contains an element with a background (like an image or inner container), its radius should be slightly smaller than the card's radius if they are concentric.
  - Formula: `Inner Radius = Outer Radius - Padding` (approximately, to look visually parallel).

## Responsive Radius
- Consider reducing max radii on smaller screens to maximize content area, although 8px-12px usually works well across devices.
