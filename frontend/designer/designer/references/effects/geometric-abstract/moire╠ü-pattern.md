# Moiré Pattern

**Keywords:** Interference, Optical Illusion, Grid, Screen, Vibrating.

**Description:**
A visual interference pattern created when two grids are overlaid at an angle or slightly different sizes.

## Usage

### 1. CSS Overlays
Two identical striped `background-image` divs.
Rotate one slightly `transform: rotate(2deg)`.
The interference pattern emerges naturally.

```css
.layer-1, .layer-2 {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(black, black 2px, transparent 2px, transparent 4px);
}
.layer-2 { transform: rotate(5deg); }
```
