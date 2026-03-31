# Depth of Field

**Keywords:** Blur, Focus, Bokeh, Lens, Macro.

**Description:**
Blurring objects that are not in the focal plane (too close or too far).

## Usage

### 1. CSS Filter & Scale
For a 2.5D parallax site:
Foreground items: `filter: blur(4px)`.
Background items: `filter: blur(2px)`.
Focus items: `filter: blur(0)`.

### 2. WebGL Post-Processing
Use a depth map.
`blurAmount = abs(depth - focusDistance) * strength`.
