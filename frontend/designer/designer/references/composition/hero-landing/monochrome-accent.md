# Monochrome Accent

**Keywords:** Black & White, Pop of color, High contrast, Bold.

**Description:**
The site is entirely grayscale (usually black background, white text) with exactly one vibrant accent color used sparingly for CTAs or key highlights.

## Usage

### 1. Variables
Strict color enforcement.

```css
:root {
    --bg: #000;
    --text: #fff;
    --accent: #FF3300; /* Vibrant Red */
}
```

```html
<div class="bg-black text-white p-12 h-screen">
    <h1 class="text-8xl font-bold">Contrast.</h1>
    <p class="text-slate-400 mt-4 text-xl">Everything keeps it simple.</p>
    <!-- The Pop -->
    <button class="mt-12 text-white border border-white hover:bg-[#FF3300] hover:border-[#FF3300] transition-colors px-6 py-3">
        Action
    </button>
</div>
```
