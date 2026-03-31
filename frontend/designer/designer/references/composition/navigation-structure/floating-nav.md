# Floating Nav

**Keywords:** Island UI, Detached Navbar, Sticky capsule, iOS style.

**Description:**
A navigation bar that doesn't touch the screen edges, appearing like a floating "capsule" or island. Often placed at the bottom (mobile) or top-center (desktop) with heavy blur styling.

## Usage

### 1. Fixed Position + Margin
Centering a fixed element.

```html
<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50">
    <div class="flex items-center gap-1 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl ring-1 ring-black/5">
        
        <a href="#" class="px-4 py-2 rounded-full text-sm font-medium text-white bg-white/10">Home</a>
        <a href="#" class="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Features</a>
        <a href="#" class="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Pricing</a>
        
        <div class="w-px h-4 bg-white/20 mx-2"></div>
        
        <button class="px-4 py-2 rounded-full text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 transition-colors">Login</button>
    </div>
</nav>
```
