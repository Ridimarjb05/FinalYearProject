# Lazy Load

**Keywords:** On Demand, Scroll, Intersection Observer.

**Description:**
Loading content (especially images) only when they scroll into view.

## Usage

### 1. Native Attribute
Supported by most modern browsers.

```html
<img src="large-image.jpg" loading="lazy" alt="..." />
```

### 2. Blur-Up Pattern
Load a tiny blurry version first.

```css
.blur-load {
  background-image: url('tiny-blur.jpg');
  background-size: cover;
}
.blur-load.loaded > img {
  opacity: 1; /* Fade in high-res */
}
```
