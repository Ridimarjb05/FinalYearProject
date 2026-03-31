# Fluid Spacing

**Keywords:** Responsive Margins, Padding, Gaps.

**Description:**
Adjusting whitespace based on screen size. Small screens need compact spacing, while large screens can afford (and benefit from) airy layouts.

## Usage

### 1. Clamp for Spacing
Scaling padding smoothly.

```css
.section {
  padding: clamp(2rem, 5vw, 6rem);
}
```

### 2. Tailwind Approach
Using responsive prefixes for utility classes.

```html
<div class="p-4 md:p-8 lg:p-12">
  Content
</div>
```
