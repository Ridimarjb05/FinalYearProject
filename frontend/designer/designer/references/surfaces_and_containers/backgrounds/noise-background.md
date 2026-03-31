# Noise Background

## Texture & Grit
Adding an analog feel to digital interfaces.

### Effect
- Adds a subtle grain that breaks up flat vector colors.
- Reduces color banding in gradients.

### Implementation
- **SVG Filter**: `<filter id="noise">...</filter>`.
- **Image overlay**: A tiny seamless noise PNG tiled with low opacity (`opacity-50 mix-blend-overlay`).
- **Generative**: Canvas-drawn static noise (heavy on performance, use sparingly).
