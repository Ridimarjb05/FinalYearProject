# Chromatic Aberration

**Keywords:** RGB Split, Glitch, Lens, Distortion, Fringe.

**Description:**
A failure of a lens to focus all colors to the same point, resulting in red/cyan or blue/yellow fringes on high-contrast edges.

## Usage

### 1. CSS Text Shadow
`text-shadow: -2px 0 red, 2px 0 cyan;`

### 2. Canvas / WebGL Channel Split
Draw the Red channel at `(x-offset, y)`.
Draw the Blue channel at `(x+offset, y)`.
Draw Green at `(x, y)`.
Compose with `screen` or `additive` blending.
