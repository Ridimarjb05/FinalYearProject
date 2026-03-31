# Dark on Light (Light Mode)

**Keywords:** Paper, traditional, clarity, focus, daylight.

**Description:**
Dark text on a light background. Modeled after ink on paper. This is the best mode for long-form reading in bright environments.

## Usage

### 1. Avoid Pure Black
`#000000` on `#FFFFFF` can be harsh.
*   **Text:** Use Dark Gray (`#333333` or `#1F2937`). It looks black but feels softer.

### 2. Warm vs Cool Whites
The background doesn't have to be `#FFFFFF`.
*   **Warm White:** `#F9F7F5` (Paper-like, cozy).
*   **Cool White:** `#F0F9FF` (Tech, crisp).

### 3. Shadows
Shadows in light mode should be subtle and usually cool-toned (bluish-gray) to simulate natural skylight ambient occlusion.
*   **Bad:** `box-shadow: 0 4px 6px black;` (Looks dirty).
*   **Good:** `box-shadow: 0 4px 6px rgba(0,0,0,0.1);`

### 4. Application
Default choice for text-heavy applications, blogs, and documentation.
