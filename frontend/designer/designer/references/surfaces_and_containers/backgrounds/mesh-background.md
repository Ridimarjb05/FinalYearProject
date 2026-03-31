# Mesh Background

## Complex Gradient Meshes
Fluid, organic, and multi-color blends.

### Characteristics
- Multiple color points blended together in non-linear ways.
- Looks like an aura or liquid.

### Tools & CSS
- **CSS Radial Gradients**: Stacking multiple large radial gradients with different colors and positions.
  ```css
  background-image:
    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%),
    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
  ```
- **Canvas/WebGL**: For interactive meshes that move with the mouse.
