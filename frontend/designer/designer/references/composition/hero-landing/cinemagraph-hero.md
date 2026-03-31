# Cinemagraph Hero

**Keywords:** Subtle motion, Frozen moment, Loop, Atmospheric.

**Description:**
A predominantly still image where only one small element moves (e.g., steam from coffee, a blinking light, wind in trees). Creates a mesmerizing, high-quality feel without the load of full video.

## Usage

### 1. Video Masking (The "Real" Way)
A still JPG background with a small, seamlessly looped video positioned on top of the area that moves.

```html
<div class="relative w-full h-[600px] bg-[url('coffee-shop-still.jpg')] bg-cover bg-center">
    <!-- The moving element (Steam) -->
    <div class="absolute top-[200px] left-[400px] w-[100px] h-[150px] overflow-hidden mix-blend-screen">
        <video src="steam-loop.mp4" autoplay loop muted class="w-full h-full object-cover opacity-80"></video>
    </div>
</div>
```

### 2. High-Res GIF / WebP
Modern `.webp` supports high-quality animated loops much better than old GIFs.
