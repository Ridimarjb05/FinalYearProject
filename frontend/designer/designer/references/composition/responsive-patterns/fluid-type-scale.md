# Fluid Type Scale

**Keywords:** Clamp, Viewport Units, Responsive Typography.

**Description:**
Typography that scales smoothly between a minimum and maximum size based on viewport width, rather than jumping at specific breakpoints.

## Usage

### 1. CSS Clamp()
The modern standard. `clamp(min, preferred(vw), max)`.

```css
:root {
  --fs-sm: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
  --fs-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
  --fs-md: clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
  --fs-lg: clamp(1.56rem, 1vw + 1.31rem, 2.11rem);
  --fs-xl: clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);
  --fs-xxl: clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);
  --fs-3xl: clamp(3.05rem, 3.54vw + 2.17rem, 5rem);
}

h1 {
    font-size: var(--fs-3xl); /* Scales automatically from 3rem to 5rem */
}
```

### Note
In Tailwind, you can add these entries to `theme.fontSize` to use classes like `text-3xl` that automatically clamp.
