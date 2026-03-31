# Glassmorphic Hero

**Keywords:** Frosted glass, IOS, Transparency, Blur overlay.

**Description:**
Hero content stays in "glass" panels floating over a vibrant, moving background. The blur ensures readability without hiding the background context.

## Usage

### 1. Backdrop Filter Utilities
Standard glass card.

```html
<div class="relative h-screen flex items-center justify-center bg-[url('colorful-mesh.jpg')] bg-cover">
    
    <div class="w-full max-w-2xl p-12 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl text-center">
        <h1 class="text-5xl font-bold text-white mb-6">Crystal Clear</h1>
        <p class="text-xl text-white/80">Using blur to create hierarchy.</p>
    </div>

</div>
```
