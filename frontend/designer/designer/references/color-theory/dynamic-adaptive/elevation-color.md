# Elevation Color

**Keywords:** Depth, layers, shadows, lightness.

**Description:**
Using color lightness to simulate how close an object is to the user/light source. In the physical world, things closer to the light (Top) are lighter.

## Usage

### 1. Material Design Standard (Dark Mode)
In dark mode, you don't use shadows (black on black is invisible). You use lightness.
*   **Background:** `#121212` (0% Opacity White overlay).
*   **Card (Layer 1):** `#1E1E1E` (5% Opacity White overlay).
*   **Modal (Layer 2):** `#2C2C2C` (10% Opacity White overlay).

### 2. Light Mode
Objects closer to the camera can be slightly lighter or warmer, while recessed areas are darker/cooler.

### 3. Application
Essential for "Flat" design where you don't want to rely heavily on drop shadows but still need hierarchy.
