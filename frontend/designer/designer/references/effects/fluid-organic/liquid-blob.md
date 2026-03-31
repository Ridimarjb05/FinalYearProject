# Liquid Blob (Metaballs)

**Keywords:** Gooey effect, Metaballs, SVG Filter, Organic morphogenesis.

**Description:**
Shapes that merge smoothly when they get close to each other, like mercury or lava lamps. Achieved by blurring elements significantly and then using a high-contrast brightness/alpha threshold filter.

## Usage

### 1. SVG Filter Technique
This is the standard way to do it in CSS.

```html
<!-- 1. Define Filter -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="hidden">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
  </defs>
</svg>

<!-- 2. Apply to Container -->
<div class="gooey-container relative">
   <div class="circle animate-blob-1"></div>
   <div class="circle animate-blob-2"></div>
</div>

<style>
.gooey-container {
   filter: url('#goo');
   /* Needs background contrast sometimes */
}
.circle {
   width: 80px;
   height: 80px;
   border-radius: 50%;
   background: #ec4899; /* Pink */
   position: absolute;
}
/* Animate them crossing paths */
</style>
```

### Note
- `stdDeviation`: Controls the blur amount (reach of the stickiness).
- `values` in ColorMatrix: The `18 -7` works by boosting alpha (transparency) way up (x18) then subtracting a threshold (-7), making the blurry edges crisp again.
