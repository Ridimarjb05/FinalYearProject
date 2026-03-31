# Letterbox

**Keywords:** Cinematic, Widescreen, 16:9, 2.35:1, Bars.

**Description:**
Black bars at the top and bottom of the screen to change the aspect ratio.

## Usage

### 1. CSS Borders
`border-top` and `border-bottom` with specific height.

### 2. CSS Clip Path
`clip-path: inset(10% 0 10% 0)`.
This is better for transitions (animate the inset from 0% to 10%).
