# Primary, Secondary, Accent

**Keywords:** Hierarchy, core, foundation, structure.

**Description:**
The standard model for defining a brand palette. Most design systems require these three slots to be filled to function correctly.

## Usage

### 1. Primary
The color most associated with your brand.
*   **Usage:** Primary buttons, active links, logos, loader spinners.
*   **Constraint:** Should pass accessibility on white (or your main background).

### 2. Secondary
A supporting color that provides variation but doesn't compete for attention.
*   **Usage:** Backgrounds for "hero" sections, decorative elements, illustrations.
*   **Contrast:** Often a lighter or desaturated version of primary, or an analogous color.

### 3. Accent
A punchy color used for very specific highlights.
*   **Usage:** Notification dots, "New" badges, special toggles, discount bubbles.
*   **Contrast:** Often a complementary color to the Primary to stand out.

```css
:root {
  --color-primary: #ec4899; /* Pink */
  --color-secondary: #fce7f3; /* Light Pink */
  --color-accent: #f59e0b; /* Amber */
}
```
