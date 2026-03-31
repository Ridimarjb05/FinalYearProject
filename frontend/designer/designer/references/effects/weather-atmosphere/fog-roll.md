# Fog Roll

**Keywords:** Mist, Spooky, Low, Ground, Reveal.

**Description:**
Low-lying fog that moves horizontally and seems to curl over terrain.

## Usage

### 1. Canvas Perlin Noise
Generate 3D noise `(x, y, time)` where z represents time/evolution. Threshold the noise to create wispy shapes.

### 2. CSS Blend Mode
[See Volumetric Fog](../light-rays/volumetric-fog.md). Use `mix-blend-mode: screen` with a scrolling texture.
