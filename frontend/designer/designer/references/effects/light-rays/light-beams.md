# Light Beams

**Keywords:** Shafts, Volumetric, Stage Light, Spotlight.

**Description:**
Distinct shafts of light that appear to have volume (illuminating dust in the air).

## Usage

### 1. CSS Gradient & Transform
A trapezoid shape with a gradient fade.

```css
.beam {
  width: 100px;
  height: 400px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.8), transparent);
  transform-origin: top center;
  transform: perspective(500px) rotateX(20deg);
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
}
```
