# Split Screen Hero

**Keywords:** 50/50, Asymmetric Split, Dual focus, Side-by-side.

**Description:**
The viewport is divided horizontally (often 50% left/right). One side typically holds the value proposition/content, and the other holds visuals. Classic, effective.

## Usage

### 1. Flex Row (Desktop) / Col (Mobile)
Standard responsive approach.

```html
<div class="flex flex-col md:flex-row h-screen">
    
    <!-- Left: Content -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-12 bg-white text-slate-900">
        <div class="max-w-lg">
            <h1 class="text-5xl font-bold mb-6">Build Faster.</h1>
            <p class="text-xl text-slate-600 mb-8">Deploy your apps in seconds.</p>
            <button class="bg-black text-white px-8 py-4 rounded-full">Get Started</button>
        </div>
    </div>

    <!-- Right: Visual -->
    <div class="w-full md:w-1/2 bg-slate-100 relative overflow-hidden">
        <img src="dashboard.png" class="absolute inset-0 w-full h-full object-cover" />
    </div>

</div>
```
