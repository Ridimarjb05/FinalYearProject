# Cross Dissolve

**Keywords:** Fade, Smooth, Transition, Blend, Ghost.

**Description:**
The most common video transition. One scene fades out while the next fades in simultaneously.

## Usage

### 1. CSS Opacity
Element A: `opacity: 1 -> 0`.
Element B: `opacity: 0 -> 1`.
Must happen at the same time and occupy the same space.
Note: If background is not solid, this can result in a momentary dip in total opacity/brightness (gamma error). Correct by keeping bottom layer at 100% and just fading top layer 0->1.
