# Debris Scatter

**Keywords:** Rocks, Dirt, Fragments, Explosion, Physics.

**Description:**
Solid chunks flying outward from a central point, influenced by gravity and rotation.

## Usage

### 1. Canvas Physics
Spawn particles with random `vx` (outward) and `vy` (upward).
Apply gravity `vy += g`.
Apply rotation `angle += vAngle`.
Draw image sprites (rock1, rock2) at position.
