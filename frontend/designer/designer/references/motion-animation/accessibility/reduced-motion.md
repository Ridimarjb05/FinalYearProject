# Reduced Motion

Respecting user preference to minimize animation.

### Mechanics
- **Media Query**: `@media (prefers-reduced-motion: reduce)`.
- **Strategy**:
    - **Replace**: Switch scaling/sliding with instant opacity changes (fade).
    - **Remove**: Disable parallax, background videos, and autoplaying carousels.
    - **Retain**: Keep essential state changes (like slight color shifts) so the UI doesn't feel broken.
