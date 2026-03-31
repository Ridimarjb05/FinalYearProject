# Sticky Sections

**Keywords:** Pinned header, Scrolling overlap, Stacking cards.

**Description:**
Elements that scroll normally until they hit a threshold (usually top of viewport), then stick there while content scrolls past, unsticking when their container ends.

## Usage

### 1. CSS `position: sticky`
Simple and performant.

```html
<div class="relative">
    <!-- Section 1 -->
    <div class="min-h-screen bg-slate-900 flex sticky top-0 border-b border-slate-700">
        <div class="p-12">
            <h2 class="text-4xl text-purple-400">01. Strategy</h2>
        </div>
    </div>

    <!-- Section 2 (Stacks on top of 1) -->
    <div class="min-h-screen bg-slate-800 flex sticky top-0 border-b border-slate-700">
        <div class="p-12">
            <h2 class="text-4xl text-blue-400">02. Design</h2>
        </div>
    </div>

    <!-- Section 3 -->
    <div class="min-h-screen bg-slate-700 flex sticky top-0 border-b border-slate-700">
        <div class="p-12">
             <h2 class="text-4xl text-green-400">03. Build</h2>
        </div>
    </div>
</div>
```
