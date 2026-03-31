# Full Bleed Media

**Keywords:** Immersive, Background Image, Cinematic, Overlay text.

**Description:**
Media (image or video) covers the entire viewport (edge-to-edge). Content sits on top, usually with an overlay (gradient or blur) to ensure readability.

## Usage

### 1. Absolute Background + Overlay
Ensuring text contrast is key.

```html
<section class="relative h-screen flex items-center justify-center text-center px-4">
    
    <!-- Background -->
    <div class="absolute inset-0 z-0">
        <img src="mountains.jpg" class="w-full h-full object-cover" />
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-4xl mx-auto">
        <h1 class="text-6xl md:text-8xl font-bold text-white tracking-tight">Explore the Wild</h1>
        <p class="text-2xl text-white/80 mt-6">Discover the unseen corners of the earth.</p>
    </div>

</section>
```
