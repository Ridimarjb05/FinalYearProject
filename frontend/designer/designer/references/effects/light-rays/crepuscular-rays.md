# Crepuscular Rays

**Keywords:** Cloud Rays, God Rays, Atmospheric, Sunset.

**Description:**
Rays that stream through gaps in clouds or other obstacles. They diverge from the light source.

## Usage

### 1. Canvas / WebGL (Post-Processing)
Render the scene where occluding objects are black and the light source is white/colored. Then apply a radial blur centered on the light source. This is a classic "God Ray" shader technique.

### 2. CSS Hacks
Multiple rotated `.beam` divs behind a "cloud" element.
