# Chimney Smoke

**Keywords:** House, Winter, Comfort, Home, Continuous.

**Description:**
A steady, possibly wind-blown stream of white or grey particulate leaving a small opening.

## Usage

### 1. Canvas / CSS
Similar to [Steam Vent](steam-vent.md) but much slower velocity and longer lifespan.
Add `wind` force to push particles sideways as they rise.

```css
.p {
  animation: rise-drift 5s linear infinite;
}
@keyframes rise-drift {
  100% { transform: translate(50px, -200px); opacity: 0; }
}
```
