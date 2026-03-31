# Holographic Sheen

**Keywords:** Iridescent, Rainbow, Foil, Card, Rare.

**Description:**
A shifting rainbow spectrum that moves across a surface as the viewing angle changes, often simulating a holographic trading card.

## Usage

### 1. CSS Background & Blend
Use a linear gradient with multiple colors and move the background on hover.

```css
.holograhic-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.holograhic-card::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 200%; height: 100%;
  background: linear-gradient(115deg, transparent, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.4), transparent);
  transition: 0.5s;
}

.holograhic-card:hover::before {
  left: 100%;
}
```
