# Dry Ice Fog

**Keywords:** Low, Floor, Spooky, Concert, Mist.

**Description:**
Thick white fog that stays very close to the floor and pours over edges like liquid.

## Usage

### 1. Particles with Floor Collision
Spawn particles that have gravity but bounce/slide when `y >= floor`.
Give them a high horizontal spread but restrict vertical movement.

### 2. Shader Height Fog
Calculate fog density based on pixel height (`worldPos.y`).
`density = exp(-height * factor)`
