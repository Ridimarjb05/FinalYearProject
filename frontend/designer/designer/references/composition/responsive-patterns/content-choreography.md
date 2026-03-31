# Content Choreography

**Keywords:** Source Ordering, Flex order, Mobile-first, Layout Shift.

**Description:**
Changing the visual order of elements at different breakpoints to suit the device context (e.g., Image tends to be top on mobile, but side on desktop).

## Usage

### 1. Flex Order uses
The most common tool.

```html
<div class="flex flex-col md:flex-row">
    
    <!-- Text: 2nd on mobile, 1st on desktop -->
    <div class="order-2 md:order-1 flex-1 p-6">
        <h1>Headline</h1>
    </div>

    <!-- Image: 1st on mobile, 2nd on desktop -->
    <div class="order-1 md:order-2 flex-1 relative bg-slate-200 h-64 md:h-auto">
        <img src="..." class="absolute inset-0 w-full h-full object-cover" />
    </div>

</div>
```

### 2. Grid Areas (Advanced)
Complete layout re-mapping.

```css
.container {
    display: grid;
    grid-template-areas: "img" "head" "body";
}
@media (min-width: 768px) {
    .container {
        grid-template-areas: 
            "head img"
            "body img";
    }
}
```
