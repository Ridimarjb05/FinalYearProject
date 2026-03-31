# Spark Fly

**Keywords:** Metal, Hit, Bullet, Hot, Bounce.

**Description:**
Tiny yellow/orange lines that fly out from a point, bounce off the floor, and cool down (turn red/dark) quickly.

## Usage

### 1. Canvas Particles
High initial velocity.
Gravity `vy += 0.5`.
On bounce: `vy *= -0.6`.
Color interpolation from White -> Yellow -> Red -> Grey.
