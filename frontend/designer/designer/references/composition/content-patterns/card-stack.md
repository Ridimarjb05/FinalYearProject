# Card Stack

**Keywords:** Tinder-like, Swipe stack, Deck, Depth Reveal.

**Description:**
Cards stacked directly on top of each other with slight offsets (scale or vertical position) to show depth. often used for onboarding flows or "flashcard" style content.

## Usage

### 1. Absolute Positioning & Scale
Stacking with `top` and `scale`.

```html
<div class="relative w-80 h-96 mx-auto perspective-1000">
    <!-- Back Card -->
    <div class="absolute inset-0 bg-slate-800 rounded-2xl shadow-xl transform scale-90 translate-y-4 opacity-70 z-0"></div>
    
    <!-- Middle Card -->
    <div class="absolute inset-0 bg-slate-700 rounded-2xl shadow-xl transform scale-95 translate-y-2 opacity-85 z-10"></div>
    
    <!-- Front Card -->
    <div class="absolute inset-0 bg-slate-600 rounded-2xl shadow-2xl z-20 p-6 flex flex-col justify-between">
        <h3 class="text-xl font-bold">Top Card</h3>
        <p>This is the active content.</p>
    </div>
</div>
```
