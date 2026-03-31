# Moon Phases

**Keywords:** Lunar, Crescent, Waxing, Waning, Shadow.

**Description:**
The cycling illumination of a sphere, transitioning from new moon to full moon.

## Usage

### 1. CSS Border Radius & Box Shadow
A crescent moon can be made with box-shadow acting on a transparent circle.

```css
.crescent-moon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 20px 10px 0 0 #FFFFFF; /* Offsets shadow to create crescent */
}
```

### 2. SVG Masks
Two circles, one masking the other, moving across to simulate phases.
