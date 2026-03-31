# Giant Headline

**Keywords:** Typography-driven, Display type, Oversized, Bold.

**Description:**
The primary visual element is text itself. Font sizes are massive (10rem+), overlapping other elements or bleeding off screen.

## Usage

### 1. Fluid Typography
Using `vw` (viewport width) so text stays huge on all screens.

```css
.giant-text {
    font-size: 15vw; /* 15% of viewport width */
    line-height: 0.9;
    letter-spacing: -0.04em;
    font-weight: 800;
    text-transform: uppercase;
}
```

```html
<div class="h-screen flex flex-col justify-center overflow-hidden">
    <h1 class="giant-text text-slate-900 whitespace-nowrap ml-[-5vw]">
        Creative
    </h1>
    <h1 class="giant-text text-purple-600 whitespace-nowrap self-end mr-[-5vw]">
        Agency
    </h1>
</div>
```
