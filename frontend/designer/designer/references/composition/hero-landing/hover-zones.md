# Hover Zones

**Keywords:** Interactive Grid, Changing Background, Navigation.

**Description:**
The hero is split into zones (e.g., vertical columns). Hovering over one expands it or changes the global background image, essentially treating the hero as a navigation menu.

## Usage

### 1. Flex Grow Transition
Expand on hover.

```html
<div class="flex h-screen w-full">
    <!-- Zone 1 -->
    <div class="group relative flex-1 hover:flex-[2] transition-all duration-500 bg-red-500 flex items-center justify-center overflow-hidden">
        <h1 class="text-white text-4xl group-hover:scale-110 transition-transform">Fashion</h1>
        <!-- Background Image with Opacity -->
    </div>
    
    <!-- Zone 2 -->
    <div class="group relative flex-1 hover:flex-[2] transition-all duration-500 bg-blue-500 flex items-center justify-center overflow-hidden">
        <h1 class="text-white text-4xl group-hover:scale-110 transition-transform">Tech</h1>
    </div>
    
    <!-- Zone 3 -->
    <div class="group relative flex-1 hover:flex-[2] transition-all duration-500 bg-green-500 flex items-center justify-center overflow-hidden">
         <h1 class="text-white text-4xl group-hover:scale-110 transition-transform">Design</h1>
    </div>
</div>
```
