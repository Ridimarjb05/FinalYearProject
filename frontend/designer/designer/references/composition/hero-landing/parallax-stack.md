# Parallax Stack

**Keywords:** Multi-plane depth, Scroll speed, Z-Axis.

**Description:**
Multiple image or text layers that move at different speeds on scroll. Often used to deconstruct a product (e.g., showing the layers of a shoe or phone) or create a deep landscape.

## Usage

### 1. Pure CSS Perspective
The `perspective: 1px` and `translateZ` trick.

```html
<div class="h-screen overflow-y-auto overflow-x-hidden perspective-1px">
    
    <!-- Deep Layer (Background) - Moves Slow -->
    <div class="absolute inset-0 transform translate-z-[-2px] scale-3 pointer-events-none z-0">
        <img src="mountain-bg.png" class="w-full h-full object-cover" />
    </div>

    <!-- Mid Layer - Moves Medium -->
    <div class="absolute inset-0 transform translate-z-[-1px] scale-2 pointer-events-none z-10 flex items-center justify-center">
        <h1 class="text-9xl text-white font-bold">DEPTH</h1>
    </div>

    <!-- Front Layer (Foreground) - Moves Normal -->
    <div class="absolute inset-0 transform translate-z-[0px] pointer-events-none z-20 mt-[80vh]">
        <img src="foreground-rocks.png" class="w-full" />
    </div>

</div>
```
