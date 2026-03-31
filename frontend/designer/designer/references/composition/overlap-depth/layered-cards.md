# Layered Cards

**Keywords:** Z-index, Shadow depth, Material elevation, Stacking context.

**Description:**
Cards that seemingly sit on top of others, often partially obscuring them to create a sense of strict hierarchy or spatial richness.

## Usage

### 1. Negative Margins + Z-Index
The easiest way to pull elements "on top" of previous sections.

```html
<section class="bg-slate-900 h-96"></section>

<section class="relative container mx-auto px-4 -mt-32 z-10">
    <div class="grid grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-2xl p-8 h-64">Card 1</div>
        <div class="bg-white rounded-xl shadow-2xl p-8 h-64">Card 2</div>
        <div class="bg-white rounded-xl shadow-2xl p-8 h-64">Card 3</div>
    </div>
</section>
```
