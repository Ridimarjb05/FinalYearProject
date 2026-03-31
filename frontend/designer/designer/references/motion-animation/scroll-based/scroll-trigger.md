# Scroll Trigger

Animations that fire exactly when an element enters the viewport.

### Mechanics
- **Technique**: Intersection Observer API.
- **Action**: Add a class (e.g., `.is-visible`) when element hits threshold.
- **Example**:
    - Counters spinning up numbers as they appear.
    - Charts drawing their lines when scrolled into view.
- **Pattern**: Run once (don't re-animate when scrolling back up unless necessary).
