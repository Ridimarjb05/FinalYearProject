# User Preference Color

**Keywords:** Customization, skinning, themes, accessibility.

**Description:**
Allowing the user to explicitly choose their own primary brand color or theme.

## Usage

### 1. Pre-defined Themes
Offer 5-6 carefully curated options.
*   "Ocean" (Blue), "Forest" (Green), "Berry" (Pink/Purple).
*   *Pros:* Guaranteed contrast and harmony.

### 2. Free Picker (Dangerous)
Allowing a full hex-picker.
*   *Risk:* User picks Neon Yellow on White background -> Unreadable.
*   *Fix:* Force-adjust the lightness/contrast of the user's pick in your code before applying it to text.

### 3. Implementation
Use CSS Variables.
```css
:root {
  --primary: #xxxxxx; /* Set via Javascript */
}
```
