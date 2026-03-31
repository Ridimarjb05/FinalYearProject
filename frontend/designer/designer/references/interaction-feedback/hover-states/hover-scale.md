# Hover Scale

**Description:**
A slight increase in element size on hover. This creates a feeling of responsiveness and tactile feedback, as if the element is expanding to meet the user's cursor.

**Key Principles:**
- **Restraint**: Keep the scale factor small (e.g., 1.02 to 1.05). Large scaling can break layouts or look cartoonish.
- **Anchor Point**: Ensure the scaling happens from the center (default) or an appropriate origin to avoid shifting surrounding content unexpectedly.
- **Easing**: Use smooth easing (e.g., `ease-out`) to make the expansion feel natural.

**Common Patterns:**
- **Image Zoom**: The container stays the same size, but the image inside scales up slightly.
- **Card Pop**: The entire card scales up slightly, often paired with elevation.
- **Icon Pulse**: Action icons growing slightly to invite a click.
