# Bento Grid

**Keywords:** Mosaic, Dashboard, Cards, Grid Area, Apple-style.

**Description:**
A grid of mixed-sized rectangular cards that fit together like a bento box. Great for showing diverse content types (stats, maps, images, text) in a unified view.

## Usage

### 1. CSS Grid Template Areas
Defining specific slots for optimal control.

```css
.bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 200px);
    gap: 24px;
    /* Define areas if you want named slots */
    grid-template-areas: 
        "hero hero stats profile"
        "hero hero map list"
        "graph graph map list";
}

.item-hero { grid-area: hero; }
.item-stats { grid-area: stats; }
/* ... */
```

### 2. Tailwind Spans
Easier for rapid prototyping.

```html
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
    <!-- Large Card -->
    <div class="md:col-span-2 md:row-span-2 bg-slate-800 rounded-3xl p-6">Hero Stats</div>
    
    <!-- Tall Card -->
    <div class="md:row-span-2 bg-slate-800 rounded-3xl p-6">Recent Activity</div>
    
    <!-- Standard Cards -->
    <div class="bg-slate-800 rounded-3xl p-6">Quick Action</div>
    <div class="bg-slate-800 rounded-3xl p-6 md:col-span-2">Wide Info</div>
</div>
```
