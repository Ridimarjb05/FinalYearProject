# Asymmetric Grid

**Keywords:** Tension, Broken Grid, Overlap, Editorial, Art Direction.

**Description:**
A grid that intentionally avoids symmetry to create visual interest. Elements might span odd column counts (e.g., 5/12 and 7/12) or be offset vertically to break the horizontal eyeline.

## Usage

### 1. Tailwind Grid Offsets
Using `col-start` and `translate-y` to break the mold.

```html
<div class="grid grid-cols-12 gap-6 items-center">
    
    <!-- Image (7 cols) -->
    <div class="col-span-7 relative">
        <img src="..." class="w-full rounded-lg shadow-xl" />
    </div>

    <!-- Text (4 cols, starting at 8, offset down) -->
    <div class="col-span-4 col-start-9 translate-y-12">
        <h2 class="text-3xl font-bold">Unbalanced Beauty</h2>
        <p class="mt-4 text-slate-400">Perfect symmetry is boring. Offset alignment draws the eye.</p>
    </div>

    <!-- Floating Accent (Overlapping) -->
    <div class="col-span-2 col-start-7 -mt-20 z-10 bg-purple-500 p-4 rounded-lg">
        <span class="text-white font-mono">NOTE</span>
    </div>

</div>
```
