# Diagonal Reveal

**Keywords:** Wipe, Scroll trigger, Angled mask.

**Description:**
As the user scrolls, a new section swipes in at a diagonal angle, or an image is revealed through a diagonal mask.

## Usage

### 1. Clip-Path Layout
Fixed background revealed by scrolling content with a clip-path.

```html
<div class="relative bg-fixed bg-cover h-[500px]" style="background-image: url('img.jpg'); clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);">
    <!-- The clip-path cuts the bottom at an angle -->
</div>
```
