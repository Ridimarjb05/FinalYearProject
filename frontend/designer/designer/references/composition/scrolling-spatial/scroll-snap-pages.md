# Scroll Snap Pages

**Keywords:** Fullpage.js, Presentation, Slides, Sections.

**Description:**
Scrolling behaves like a carousel, snapping directly to full-screen sections.

## Usage

### 1. CSS Scroll Snap
Native support is excellent now.

```html
<div class="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
    
    <!-- Section 1 -->
    <section class="h-screen w-full flex items-center justify-center bg-slate-900 snap-start">
        <h1>Page One</h1>
    </section>

    <!-- Section 2 -->
    <section class="h-screen w-full flex items-center justify-center bg-slate-800 snap-start">
         <h1>Page Two</h1>
    </section>

</div>
```
