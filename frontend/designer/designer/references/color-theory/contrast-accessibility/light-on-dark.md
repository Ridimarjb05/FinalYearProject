# Light on Dark (Dark Mode)

**Keywords:** Dark mode, night, cinema, reducing strain.

**Description:**
Light text on a dark background. This reduces eye strain in low-light environments and saves battery on OLED screens.

## Usage

### 1. Avoid Pure White
Don't use `#FFFFFF` text on `#000000` background. The contrast is too high and causes "halation" (fuzzy text).
*   **Text:** Use Light Gray (`#E5E5E5` or 90% opacity white).
*   **Background:** Use Dark Gray (`#121212`) instead of black.

### 2. Desaturate Colors
Bright colors vibrate more on dark backgrounds.
*   **Rule:** Reduce saturation by 10-20% and increase lightness (add white) for accent colors in dark mode.
*   *Example:* A deep blue primary button should become a lighter, pastel blue in dark mode.

### 3. Elevation
In dark mode, "higher" (closer) surfaces should be *lighter*, not darker.
*   **Base:** Level 0 (#121212)
*   **Card:** Level 1 (#1E1E1E)
*   **Dropdown:** Level 2 (#2C2C2C)
