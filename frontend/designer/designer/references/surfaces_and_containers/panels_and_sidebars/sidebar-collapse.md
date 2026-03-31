# Sidebar Collapse

## Expanded vs. Collapsed
Allows users to reclaim screen space when navigation isn't the primary focus.

### States
1.  **Fully Expanded**:
    - Full width (e.g., 256px).
    - Visible text labels + Icons.
    - Sub-menus expanded or expandable (accordion).

2.  **Collapsed (Rail/Mini)**:
    - Narrow width (e.g., 64px).
    - Icons only.
    - Text labels appear in tooltips on hover.
    - Sub-menus appear as popovers/flyouts.

3.  **Hidden (Off-canvas)**:
    - Completely removed from the flow.
    - Triggered by a toggle button.

## Transition
- Animate `width` and `opacity` of text labels.
- **Performance**: Animating `width` can be jerky (reflow). Prefer transform (scale/translate) or fast snaps if layout thrashing is an issue, though `width` transition is common for sidebars.
