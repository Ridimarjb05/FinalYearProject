# Lens Flare

**Keywords:** Cinematic, Anamorphic, Bokeh, Light leak, Optical overlay.

**Description:**
Adding cinematic lighting artifacts to give scenes a sense of realism, camera presence, or "JJ Abrams" style energy.

## Usage

### 1. CSS/HTML Overlay
Creating multiple semi-transparent gradient circles along a line.

```html
<div class="pointer-events-none absolute inset-0 overflow-hidden">
    <!-- Main Flare Source -->
    <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[80px] rounded-full mix-blend-screen animate-pulse"></div>
    
    <!-- Anamorphic Streak -->
    <div class="absolute top-[30%] left-0 w-full h-1 bg-blue-300/30 blur-[2px] mix-blend-overlay"></div>
    
    <!-- Secondary Artifacts (Bokeh) -->
    <div class="absolute top-1/3 left-1/3 w-20 h-20 bg-white/10 blur-xl rounded-full"></div>
    <div class="absolute bottom-1/3 right-1/4 w-32 h-32 bg-purple-300/10 blur-2xl rounded-full"></div>
</div>
```

### 2. Dynamic Moving Flare (JS)
For a flare that tracks the mouse (like looking at a light source).

```javascript
// Similar to parallax, but move artifacts in OPPOSITE direction of mouse to simulate lens depth.
// Mouse moves Right -> Foreground flare components move Left.
```
