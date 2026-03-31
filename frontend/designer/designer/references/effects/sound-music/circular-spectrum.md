# Circular Spectrum

**Keywords:** Radial, Visualizer, Monstercat, Beat, Circle.

**Description:**
Frequency bars arranged in a circle around a central logo or image, pointing outwards.

## Usage

### 1. Canvas Transformation
Translate to center `(cx, cy)`.
Loop through frequency data.
Rotate context by `angle = i * (2PI / count)`.
Draw rectangle at radius distance.
Mirror the data for symmetry (left/right channels).
