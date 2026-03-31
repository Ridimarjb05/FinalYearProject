# Split Panel

## Resizable Dividers
Allows users to adjust the ratio between two adjacent panels.

### Interaction
- **Cursor**: `col-resize` (vertical split) or `row-resize` (horizontal split).
- **Visuals**:
  - Thin line (1px) normally.
  - Thicker line (4px) or distinct color on hover/drag to indicate interactivity.
- **Feedback**: Immediate resizing without lag (use `requestAnimationFrame` if calculating complex layouts).

### Constraints
- **Min/Max Size**: Prevent panels from becoming unusable (e.g., min 100px).
- **Snap Points**: Optional snapping to specific sizes (e.g., snap to closed, snap to 50%).

### Common Patterns
- **Code Editors**: File tree | Code editor | Terminal.
- **Email Clients**: Folder List | Message List | Message View.
