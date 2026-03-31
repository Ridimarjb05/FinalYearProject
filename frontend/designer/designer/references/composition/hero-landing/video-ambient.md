# Video Ambient

**Keywords:** Environmental, Atmospheric, Muted background, Texture.

**Description:**
A video plays in the background to set a mood. It has no audio, minimal motion (often slow motion), and low contrast to ensure content readability.

## Usage

### 1. Video Tag Settings
Key attributes: `autoplay loop muted playsinline`.

```html
<div class="relative h-screen w-full overflow-hidden">
    <video 
        autoplay 
        loop 
        muted 
        playsinline 
        class="absolute inset-0 w-full h-full object-cover opacity-50 contrast-125 brightness-50"
    >
        <source src="clouds.mp4" type="video/mp4" />
    </video>
    
    <!-- Content Overlay -->
    <div class="relative z-10 p-12 text-white">
        <h1>Atmosphere</h1>
    </div>
</div>
```
