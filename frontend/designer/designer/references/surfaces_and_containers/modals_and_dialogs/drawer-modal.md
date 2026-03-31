# Drawer Modal (Slide-over)

## Usage
A variation of the modal that slides in from the edge of the screen.

### Use Cases
- Details panel (e.g., clicking items in a list).
- Complex forms that need vertical space.
- Configuration settings.
- Mobile navigation menus.

### Positioning
- **Right Side**: Most common for desktop apps (contextual details).
- **Left Side**: Navigation menus.
- **Bottom**: "Bottom sheets" on mobile devices.

### Characteristics
- **Height**: Typically full viewport height (`h-screen`).
- **Dismissal**:
  - Close button.
  - Clicking outside.
  - Swipe gestures (essential for mobile bottom sheets).

### Transition
- Slide in/out transition matching the direction of entry.
- Usually paired with a backdrop, but can also push content (see "Panels & Sidebars").
