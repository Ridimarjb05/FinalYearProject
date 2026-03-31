# Type Only

**Keywords:** No Images, Typography, Editorial, Swiss Style.

**Description:**
A design that relies 100% on typography for visual interest. No photos, no illustrations. Scale, weight, and layout are the only tools.

## Usage

### 1. Hierarchy Mix
Mixing huge display fonts with tiny mono fonts.

```html
<div class="h-screen bg-[#f0f0f0] p-4 flex flex-col justify-between">
    <!-- Top -->
    <div class="flex justify-between border-b border-black pb-4">
        <span class="font-mono text-sm">(001)</span>
        <span class="font-mono text-sm">manifesto.pdf</span>
    </div>

    <!-- Center -->
    <div>
        <h1 class="text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase text-black">
            Pure<br>Form
        </h1>
    </div>

    <!-- Bottom -->
    <div class="max-w-md ml-auto">
        <p class="text-lg font-serif">When you remove the decoration, only the message remains.</p>
    </div>
</div>
```
