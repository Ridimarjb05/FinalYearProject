# Asymmetric Thirds

**Keywords:** 1/3 - 2/3, Golden Ratio, Sidebar hero.

**Description:**
A split layout that uses a 33% / 66% ratio instead of 50/50. Often, the smaller side holds the headline for high impact, or the navigation/context.

## Usage

### 1. Grid Cols
```html
<div class="grid grid-cols-1 md:grid-cols-3 h-screen">
    <!-- 1/3 Side (Dark) -->
    <div class="bg-slate-900 text-white p-12 flex flex-col justify-between">
        <div class="font-bold">Brand</div>
        <h1>We Design Future Interfaces.</h1>
        <button>Contact</button>
    </div>
    
    <!-- 2/3 Side (Image) -->
    <div class="md:col-span-2 bg-slate-200 relative">
        <img src="..." class="absolute inset-0 w-full h-full object-cover" />
    </div>
</div>
```
