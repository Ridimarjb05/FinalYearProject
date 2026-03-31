# Skeleton Loading

**Keywords:** Placeholders, Shimmer, Bones.

**Description:**
Gray shapes that mimic the structure of the content about to load. Reduces cognitive load compared to spinners.

## Usage

### 1. CSS Animation
A shimmering gradient.

```css
.skeleton {
  background: #eee;
  background-image: linear-gradient(to right, #eee 0%, #ddd 50%, #eee 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
}
```
