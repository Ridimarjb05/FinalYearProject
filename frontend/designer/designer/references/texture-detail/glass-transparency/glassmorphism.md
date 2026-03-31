# Glassmorphism

**Keywords:** Frosted Glass, Blur, Translucency.

**Description:**
A style emphasizing light or dark objects on top of colorful backgrounds, visible through frosted glass effects.

## Usage

### 1. The Standard Setup
The "holy trinity" of glass properties:
1.  Translucent background
2.  Backdrop filter blur
3.  Subtle border

```css
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
```
