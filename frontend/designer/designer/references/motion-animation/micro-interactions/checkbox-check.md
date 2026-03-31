# Checkbox Check

Drawing the success state.

### Mechanics
- **Unchecked**: Empty box border.
- **Checking**:
    1. Box fills with color (scale-in or fade-in).
    2. Checkmark draws stroke (using SVG `stroke-dashoffset`).
- **Timing**: Very fast (~150ms).
