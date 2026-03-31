# Panel Overlay

## Panel vs. Content Relationship
Deciding how a new panel interacts with the existing layout.

### Styles
1.  **Floating (Pop-over)**:
    - Detached from the edges.
    - Has shadows/elevation.
    - Feels lightweight and temporary.
2.  **Docked (Pinned)**:
    - Attached to an edge.
    - Shares a border with the content.
    - Feels structural and permanent.

### Stacking Context
- **Z-Index Management**:
  - Base Content: 0
  - Sticky Headers: 10
  - Sidebars: 20
  - Overlays/Backdrops: 30
  - Modals: 40
  - Tooltips/Toasts: 50
- Ensure panels don't accidentally cover critical navigation unless intended (like a full-screen mobile menu).
