# Crater Form

**Keywords:** Ground, Hole, Impact, Mark, Permanent.

**Description:**
A texture decal appearing on the ground, growing from the center, often with a raised rim.

## Usage

### 1. Canvas / CSS Masking
"Burn" a hole in the ground layer.
Alternatively, simply scale up a dark sprite with `mix-blend-mode: multiply` at the impact site.

```css
.crater {
  position: absolute;
  width: 100px; height: 100px;
  background: url('crater.png');
  transform: scale(0);
  animation: grow 0.1s cubic-bezier(0, 1.5, 1, 1) forwards;
}
```
