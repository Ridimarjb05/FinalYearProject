# Enchant Glow

**Keywords:** Item, Power, Aura, Loot, Shiny.

**Description:**
A continuous, pulsing colored outline or aura around an object (sword, potion).

## Usage

### 1. CSS Box Shadow / Drop Shadow
`filter: drop-shadow(0 0 10px gold)`.
Animate intensity.

### 2. Shader Rim Light
Fresnel effect in WebGL.
 `glow = pow(1.0 - dot(normal, viewDir), 3.0) * color;`
