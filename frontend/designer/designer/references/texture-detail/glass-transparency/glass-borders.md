# Glass Borders

**Keywords:** Highlights, Edges, Refraction.

**Description:**
Subtle borders that simulate light hitting the edge of a glass pane.

## Usage

### 1. Linear Gradient Border
Simulating light direction.

```css
.glass-border {
  border: 1px solid transparent;
  background:
    linear-gradient(#000, #000) padding-box, /* Content bg */
    linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1)) border-box; /* Border gradient */
}
```
