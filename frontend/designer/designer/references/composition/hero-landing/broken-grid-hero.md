# Broken Grid Hero

**Keywords:** Chaos, Drift, Overlap, Non-linear.

**Description:**
Elements are intentionally misaligned to a standard 12-column grid. They overlap, sit at odd vertical positions, or have random margins, creating a "controlled chaos" or artistic feel.

## Usage

### 1. Random Offsets
Using arbitrary spacing classes.

```html
<div class="container mx-auto py-20 relative min-h-screen">
    <h1 class="text-8xl font-bold ml-12">Disrupt</h1>
    
    <div class="absolute top-40 right-20 w-64 h-80 bg-red-500 z-10 p-4">
        <img src="..." />
    </div>

    <div class="w-96 text-xl p-8 bg-white shadow-xl mt-32 ml-[40%] relative z-20">
        <p>The grid is a suggestion, not a law.</p>
    </div>

    <div class="absolute bottom-20 left-0 w-[60%] h-2 bg-black"></div>
</div>
```
