# Grid Alignment

**Concept:** Snapping to layout grid.

The grid is the invisible skeleton of your design. Elements should snap to the columns of the specific grid system you are using (e.g., 12-column grid).

## Principles
- **Span:** Elements should span a specific number of columns (e.g., "span-4" means taking up 4 columns).
- **Gutters:** Elements should never end *inside* a gutter. They end at the edge of a column.
- **Off-Grid:** You can break the grid for effect (see "Asymmetric Space"), but you must know the grid first to break it effectively.

## Implementation
- **CSS Grid:** The most robust tool for 2D layouts.
- **Flexbox:** Great for 1D layouts (rows or columns), but less strict about the overall page grid.
- **Consistency:** If your primary content container is 1200px wide, don't randomly make one section 1150px wide.
