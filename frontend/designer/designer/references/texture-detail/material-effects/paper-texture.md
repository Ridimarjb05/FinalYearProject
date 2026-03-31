# Paper Texture

**Keywords:** Parchment, Cardboard, Craft.

**Description:**
Simulating the look and feel of real paper. Often uses noise + subtle yellow/cream tint.

## Usage

### 1. The Craft Look
CSS with blend mode.

```css
.card-paper {
  background-color: #f4ecdf; /* Cream base */
  background-image: url('noise.png');
  background-blend-mode: multiply;
}
```
