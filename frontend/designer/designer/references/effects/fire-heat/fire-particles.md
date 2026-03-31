# Fire Particles

**Keywords:** Combustion, Flame, Hot, Inferno, Burning.

**Description:**
Core building block for fire. Red, orange, and yellow particles that spawn at the bottom, move upward, shrink, and fade.

## Usage

### 1. Particles.js / Canvas
The standard particle system approach.
- Start color: Yellow/Orange
- End color: Red/Dark Grey
- Movement: Upward with slight wiggle.
- Size: Shrinking over time.

### 2. CSS Filter Hack
Overlap multiple circle divs with `mix-blend-mode: screen` and a large blur filter on the container to merge them into a "gooey" fire effect. (Requires contrast filter on container).

```css
.fire-container {
  filter: blur(10px) contrast(20);
  background: black;
}
.particle {
  background: white; /* Color later using blend modes */
  border-radius: 50%;
}
```
