# Rainbow Arc

**Keywords:** Spectrum, Sky, Luck, Color, Curve.

**Description:**
A semi-circle of colors in the sky, usually faint and requiring specific blend modes.

## Usage

### 1. CSS Radial Gradient
Restricted to a half-circle using `border-radius` and masking.

```css
.rainbow {
  width: 500px; height: 250px;
  border-radius: 250px 250px 0 0;
  background: conic-gradient(from 180deg at 50% 100%, 
    red, orange, yellow, green, blue, indigo, violet
  );
  filter: blur(20px);
  opacity: 0.5;
}
```
