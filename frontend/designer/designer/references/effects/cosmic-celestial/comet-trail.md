# Comet Trail

**Keywords:** Comet, Tail, Dust, Glowing Head.

**Description:**
A bright glowing head with a long, possibly curved or dissipating tail. The tail should look like dust or gas being left behind.

## Usage

### 1. Canvas / SVG Filters
Use a motion blur or trail effect. In Canvas, do not clear the rect completely each frame; instead, fill with a low-opacity background color to create a trail `ctx.fillStyle = 'rgba(0,0,0,0.1)'; ctx.fillRect(...)`.

### 2. CSS particles
Multiple particles following a lead element.

```html
<div class="comet-head"></div>
<!-- Trail particles trailing behind -->
<div class="trail-part" style="--delay: 0.1s"></div>
<div class="trail-part" style="--delay: 0.2s"></div>
```
