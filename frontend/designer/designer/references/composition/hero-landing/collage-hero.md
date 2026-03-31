# Collage Hero

**Keywords:** Scrapbook, Mixed Media, Layered, Chaotic.

**Description:**
Multiple images, textures, tapes, and cutout elements layered on top of each other like a physical collage.

## Usage

### 1. Absolute Stacking + Rotation
The key is random rotation.

```html
<div class="relative h-screen flex items-center justify-center bg-[#f8f5f2] overflow-hidden">
    
    <!-- Photo 1 -->
    <div class="absolute top-1/4 left-1/4 transform -rotate-6 p-2 bg-white shadow-xl">
        <img src="photo1.jpg" class="w-64" />
    </div>

    <!-- Photo 2 -->
    <div class="absolute bottom-1/4 right-1/4 transform rotate-12 p-2 bg-white shadow-xl z-10">
        <img src="photo2.jpg" class="w-72" />
    </div>

    <!-- Tape/Sticker -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 bg-yellow-300 opacity-80 transform -rotate-45 mix-blend-multiply z-20"></div>

    <h1 class="relative z-30 text-6xl font-black uppercase mix-blend-difference text-white">
        Memory
    </h1>

</div>
```
