# Wind Streak

**Keywords:** Air, Speed, Motion, Anime, Whoosh.

**Description:**
White, semi-transparent curved lines that appear and disappear rapidly to visualize invisible air movement.

## Usage

### 1. CSS Animation
Elongated divs with `border-radius: 50%` that fly across the screen.

```css
.wind-line {
  width: 200px; height: 2px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent);
  animation: flyBy 0.5s linear infinite;
}
```
