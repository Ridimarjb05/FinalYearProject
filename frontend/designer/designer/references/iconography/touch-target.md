# Touch Target

> **Minimum 44x44px tap area**

While the *visible* icon might be small (e.g., 24px), the *interactive* area must be large enough for a finger.

## Guidelines
-   **Apple Human Interface Guidelines:** Minimum 44x44pt.
-   **Material Design:** Minimum 48x48dp.
-   **WCAG:** Minimum 24x24 px (AAA standard calls for 44px).

## Implementation
-   **Padding:** Add padding around the icon component to achieve the target size.
-   Ex: A 24px icon should have at least 10px-12px of padding on all sides to create a readable and tappable button.
-   **Visualize:** Use a transparent background on the button container to visualize the hit area during development.
