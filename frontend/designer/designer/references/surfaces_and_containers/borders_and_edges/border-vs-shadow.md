# Border vs. Shadow

## Defining Edges
Deciding whether to use a line (border) or depth (shadow) to define a surface.

### Border
- **Pros**: Sharp, precise, works well on all background colors, high contrast.
- **Cons**: Can look "busy" if overused (grid-like).
- **Best for**: Inputs, tables, internal dividers, low-elevation grouping.

### Shadow
- **Pros**: Soft, adds depth, indicates hierarchy/lift, clean "borderless" look.
- **Cons**: Can get muddy, hard to see on dark backgrounds.
- **Best for**: Cards, floating elements (dropdowns, modals), drag states.

### Combined
- Creating a "crisp" shadow often involves a very subtle border (alpha 5%) PLUS a shadow.
- This helps define the edge clearly on low-quality screens where subtle shadows might band or disappear.
- Tailwind Example: `shadow-sm ring-1 ring-gray-900/5` (Ring utility acts as a border without affecting layout).
