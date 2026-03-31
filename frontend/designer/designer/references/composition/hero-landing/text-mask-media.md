# Text Mask Media

**Keywords:** Knockout text, Video inside text, Clipping.

**Description:**
The text is hollow, revealing an image or video playing "inside" the letterforms.

## Usage

### 1. `background-clip: text`
The easiest modern way.

```css
.text-mask-video {
    /* 1. Make text transparent */
    color: transparent; 
    
    /* 2. Style font to be thick */
    font-size: 12rem;
    font-weight: 900;
    
    /* 3. Set background */
    /* Note: For VIDEO, you technically need mix-blend-mode approach or SVG mask. 
       background-clip works best for static images or gradients. */
}
```

### 2. Mix-Blend-Mode (For Video)
Layering white text over video with `screen` or `multiply`.

```html
<div class="relative bg-white h-screen flex items-center justify-center overflow-hidden">
    <!-- Video Layer -->
    <video autoplay loop muted class="absolute inset-0 w-full h-full object-cover"></video>
    
    <!-- Text Layer (Black text on White bg) -->
    <!-- Use blend mode 'screen' to make Black transparent? No, use 'multiply' to make White transparent? -->
    <!-- Easiest: White Background with Black Text over Video + mix-blend-mode: screen on the TEXT CONTAINER makes the black text punch through? 
         Actually: Video (Bottom) -> White Div with Black Text (Top) -> mix-blend-mode: screen on the top div turns black text transparent.
    -->
    <div class="absolute inset-0 bg-white mix-blend-screen flex items-center justify-center">
        <h1 class="text-9xl font-black text-black uppercase">Reveal</h1>
    </div>
</div>
```
