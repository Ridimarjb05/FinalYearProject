# Viewport Type

**Keywords:** VW, VH, Fullscreen, Responsive, Massive.

**Description:**
Viewport units (`vw`, `vh`) scale text dependent on the viewport's width or height. This is useful for massive headlines or truly fluid layouts, but requires care as it can become illegible on very small or very large screens if not constrained.

## Usage

### 1. Pure VW
Directly setting font size to a percentage of the viewport width.

```css
h1 {
  /* 10% of viewport width */
  font-size: 10vw;
}
```

### 2. Implementation with Constraints
Combine with `min()` and `max()` to prevent accessibility issues.

```css
h1 {
  /* Never smaller than 2rem, never larger than 10rem, otherwise 10vw */
  font-size: clamp(2rem, 10vw, 10rem);
}
```

### 3. Tailwind Arbitrary Values
```html
<h1 class="text-[10vw] md:text-[5vw] lg:text-[4vw]">
   Responsive Hero Text
</h1>
```

### 4. Container Queries
Unlike viewport units, container queries scale based on the parent element.

```css
.card {
  container-type: inline-size;
}

.card-title {
  font-size: 5cqi; /* 5% of container inline size */
}
```
