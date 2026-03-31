# Gradient Animation

**Keywords:** Moving Background, Shimmer, Flow.

**Description:**
Animating the background position or size to make the gradient appear to move.

## Usage

### 1. Moving Background
Scaling up the background and moving it.

```css
.animated-bg {
  background: linear-gradient(45deg, #f00, #00f, #f00);
  background-size: 200% 200%;
  animation: move 5s ease infinite;
}

@keyframes move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```
