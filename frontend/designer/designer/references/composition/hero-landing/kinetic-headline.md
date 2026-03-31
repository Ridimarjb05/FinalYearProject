# Kinetic Headline

**Keywords:** Motion type, Swap, Rotate, Ticker, Marquee.

**Description:**
Headlines that move. Words might slide up/down (carousel), rotate in 3D, or marquee horizontally. Adds energy to otherwise static text.

## Usage

### 1. Rotating Word (CSS / JS)
"We Build [Websites / Apps / Brands]"

```html
<h1 class="text-6xl font-bold flex gap-4">
    We Build 
    <span class="relative h-[1.1em] overflow-hidden flex flex-col text-purple-600">
        <span class="animate-slide-up">Websites</span>
        <span class="animate-slide-up">Apps</span>
        <span class="animate-slide-up">Brands</span>
        <!-- Duplicate first for loop -->
        <span class="animate-slide-up">Websites</span>
    </span>
</h1>

<style>
@keyframes slide-up {
    0%, 20% { transform: translateY(0); }
    25%, 45% { transform: translateY(-100%); }
    50%, 70% { transform: translateY(-200%); }
    75%, 95% { transform: translateY(-300%); }
    100% { transform: translateY(-300%); } /* JS reset usually needed for infinite loop without snap */
    /* Ideally used with percentage steps or JS */
}
</style>
```
