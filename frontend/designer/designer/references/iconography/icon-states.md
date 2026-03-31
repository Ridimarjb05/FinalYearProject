# Icon States

> **Hover, active, disabled variants**

Icons must communicate interaction status clearly.

## Common States
-   **Default:** The resting state. Standard contrast.
-   **Hover:** Increased contrast, color shift, or subtle lift/scale. Indicates interactability.
-   **Active (Pressed):** often a "down" state (darker, or slightly smaller).
-   **Selected (Active Tab):** distinct style change (e.g., Outline -> Filled) to indicate "You are here".
-   **Disabled:** Reduced opacity (typically 30-50%) or greyscale. Must indicate non-interactivity.

## Implementation tips
-   Use CSS pseudo-classes (`:hover`, `:active`, `:disabled`) on the parent button to trigger styles on the child icon is the most robust method.
