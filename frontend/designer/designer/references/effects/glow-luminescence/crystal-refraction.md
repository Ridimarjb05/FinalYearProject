# Crystal Refraction

**Keywords:** Gem, Diamond, Facet, Prism, Sharp.

**Description:**
Sharp lines of light and color splitting simulating light passing through a cut gem.

## Usage

### 1. CSS Conic Gradient & Overlay
Sharp angular gradients overlaid with `mix-blend-mode: overlay`.

```css
.crystal-surface {
  background: conic-gradient(
    from 45deg,
    rgba(255,255,255,0.1) 0deg,
    rgba(255,255,255,0.8) 10deg,
    rgba(255,255,255,0.1) 20deg
  );
  filter: contrast(150%);
}
```
