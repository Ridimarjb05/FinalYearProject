# Foreground Cutout

**Keywords:** Magazine style, Text behind Image, Layering.

**Description:**
A subject (person, product) is placed in the foreground, with the headline text placed *behind* them but *in front* of the background. Creates distinct depth.

## Usage

### 1. Z-Index Stacking
Manual layering.

```html
<div class="relative h-screen flex items-end justify-center overflow-hidden bg-slate-200">
    
    <!-- Text (Behind Subject) -->
    <h1 class="absolute top-1/4 z-0 text-[15vw] font-black text-slate-900 leading-none">
        MODERN
    </h1>

    <!-- Subject (Cutout transparent PNG) -->
    <img src="model-cutout.png" class="relative z-10 h-[90vh] object-contain" />
    
    <!-- Overlay Text (Optional, In front of subject) -->
    <div class="absolute bottom-10 z-20">
        <button>Shop Collection</button>
    </div>

</div>
```
