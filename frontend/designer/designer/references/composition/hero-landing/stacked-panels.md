# Stacked Panels

**Keywords:** Vertical Scroll, Full Page, Sectional, Slide format.

**Description:**
Sections are exactly the height of the viewport (`100vh`). The user scrolls from one full "idea" to the next, often with scroll-snap active.

## Usage

### 1. Default Stacking
Just using `min-h-screen`.

```html
<!-- Panel 1 -->
<section class="min-h-screen flex items-center justify-center bg-slate-900 sticky top-0">
    <h1 class="text-white text-9xl font-bold">Concept</h1>
</section>

<!-- Panel 2 (Z-Index + Sticky allows overlap effect) -->
<section class="min-h-screen flex items-center justify-center bg-purple-900 sticky top-0 border-t border-white/10">
    <h1 class="text-white text-9xl font-bold">Design</h1>
</section>

<!-- Panel 3 -->
<section class="min-h-screen flex items-center justify-center bg-black sticky top-0 border-t border-white/10">
    <h1 class="text-white text-9xl font-bold">Build</h1>
</section>
```
