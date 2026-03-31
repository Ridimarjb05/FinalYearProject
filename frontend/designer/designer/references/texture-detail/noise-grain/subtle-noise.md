# Subtle Noise

**Keywords:** Matte, Paper-like, Soft Texture.

**Description:**
Very low opacity noise used to break up flat digital colors and give surfaces a more tactile, paper-like quality without being overtly "gritty".

## Usage

### 1. The 3% Rule
Keep opacity extremely low.

```css
.paper-card {
  background: white;
  position: relative;
}

.paper-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('noise.png');
  opacity: 0.03; /* Barely visible */
  pointer-events: none;
}
```
