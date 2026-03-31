# Sidebar Width

## Fixed vs. Flexible
Sidebars need to balance content visibility with maximizing the main workspace.

### Fixed Width
- **Narrow (Icon-only)**: 64px - 80px.
- **Medium (Navigation)**: 240px - 280px. Standard for most dashboards.
- **Wide (Details/Filters)**: 320px - 400px.

### Flexible (Resizable)
- **Fluid**: Percentage-based width (e.g., `w-1/4`), but often tricky for layout stability.
- **Drag Handle**: Allows user customization. Essential for IDEs or data-heavy apps.
  - **Constraints**: always set `min-width` and `max-width` to prevent breaking layouts.

## Responsive Strategy
- **Desktop**: Fixed or Resizable Sidebar.
- **Tablet**: Collapsed (Icon-only) or Drawer (Overlay).
- **Mobile**: Hidden by default (Hamburger menu -> Drawer).
