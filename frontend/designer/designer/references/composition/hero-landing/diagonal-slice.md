# Diagonal Slice

**Keywords:** Angled, Skewed divider, Dynamic split, Non-rectangular.

**Description:**
Dividing lines between sections are angled, creating dynamism and leading the eye downward.

## Usage

### 1. CSS Skew Transform
Skewing the container, then un-skewing content.

```html
<div class="relative overflow-hidden">
    <!-- Skewed Background -->
    <div class="absolute inset-0 bg-purple-900 transform -skew-y-6 origin-top-left scale-110"></div>
    
    <!-- Content (Standard orientation) -->
    <div class="relative container mx-auto py-24 z-10">
        <h1>Angled Horizon</h1>
    </div>
</div>
```

### 2. SVG Divider ("Shape Divider")
Using an SVG path at the bottom of a section.

```html
<section class="bg-purple-900 relative pt-20 pb-32">
    <h1>Content</h1>
    
    <!-- Divider at bottom -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg class="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="fill-white"></path>
        </svg>
    </div>
</section>
```
