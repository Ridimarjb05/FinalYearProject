# Speaker Vibrate

**Keywords:** Subwoofer, Bass, Shake, Loud, Physics.

**Description:**
Rapid, small-scale displacement of a speaker cone or UI element, blurring slightly at peak intensity.

## Usage

### 1. Canvas / CSS Transform
On low-frequency peak: `scale = 1.05 + random(0.02)`.
Return to 1.0 rapidly (elastic).
Blur: `filter: blur(1px)` during expansion can sell the speed.
