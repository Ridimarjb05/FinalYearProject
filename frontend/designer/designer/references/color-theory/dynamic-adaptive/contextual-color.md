# Contextual Color

**Keywords:** Adaptive, album-art, immersive, material-you.

**Description:**
Extracting dominant colors from an image or content and applying them to the UI chrome (backgrounds, buttons) to create a deeply immersive experience.

## Usage

### 1. The Algorithm
*   **Step 1:** Analyze image (e.g., Album Cover).
*   **Step 2:** Find dominant hue.
*   **Step 3:** Use dominant hue as the background (often darkened) and a vibrant accent.

### 2. Readability Risk
Since the background changes dynamically, you can't hardcode text color.
*   **Fix:** Calculate the luminance of the extracted color. If it's dark, set text to White. If light, set text to Black.

### 3. Application
*   **Music Players:** Spotify/Apple Music backgrounds.
*   **Android (Material You):** System UI matches user wallpaper.
