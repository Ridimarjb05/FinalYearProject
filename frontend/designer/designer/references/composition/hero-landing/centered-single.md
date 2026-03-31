# Centered Single

**Keywords:** Minimalist, One thing, Focus, Search bar.

**Description:**
Absolute minimalism. One headline, one input (or CTA) dead center in the screen. Nothing else. "Google" style.

## Usage

### 1. Flex/Grid Centering
The "Holy Grail" layout.

```html
<div class="h-screen w-full flex flex-col items-center justify-center text-center px-4 bg-white">
    <h1 class="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Focus.</h1>
    <div class="w-full max-w-md">
        <input type="text" placeholder="Search..." class="w-full border-b-2 border-slate-200 py-4 text-xl focus:outline-none focus:border-black transition-colors" />
    </div>
</div>
```
