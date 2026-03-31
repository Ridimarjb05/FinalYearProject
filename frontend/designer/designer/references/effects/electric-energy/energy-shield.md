# Energy Shield

**Keywords:** Forcefield, Hexagon, Barrier, Sci-Fi, Protection.

**Description:**
A semi-transparent barrier (often hexagonal grid) that glows brighter at the point of impact.

## Usage

### 1. CSS & SVG Pattern
Use a hexagonal SVG pattern background. On "impact" (click/hover), add a radial gradient highlight at that position using JS to update CSS variables `--x`, `--y`.

```css
.shield {
  background: url('hex.svg');
  mask-image: radial-gradient(circle at var(--x) var(--y), black 20%, transparent 60%);
}
```
