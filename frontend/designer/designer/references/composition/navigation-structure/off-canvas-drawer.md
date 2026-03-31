# Off-Canvas Drawer

**Keywords:** Mobile Menu, Slide-out, Sheet, Overlay panel.

**Description:**
A panel that slides in from the edge of the viewport, usually covering content with a backdrop. Used for mobile navigation or complex details views (e.g., editing a row in a table).

## Usage

### 1. Fixed Overlay + Transform
Animate `translate` to slide in.

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity opacity-0 pointer-events-none" id="drawer-backdrop"></div>

<!-- Drawer -->
<div class="fixed top-0 right-0 h-full w-80 bg-slate-900 border-l border-slate-800 z-50 transform translate-x-full transition-transform duration-300 shadow-2xl" id="drawer">
    <div class="p-6">
        <h2 class="text-xl font-bold mb-4">Settings</h2>
        <!-- Content -->
    </div>
</div>

<script>
    // Toggle: 
    // canvas.classList.remove('translate-x-full'); 
    // backdrop.classList.remove('opacity-0', 'pointer-events-none');
</script>
```
