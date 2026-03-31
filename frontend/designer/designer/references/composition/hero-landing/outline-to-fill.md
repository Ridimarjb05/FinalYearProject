# Outline to Fill

**Keywords:** Interactive typography, Hover states, Scroll fill.

**Description:**
Text starts as an outline (stroke only). On hover or scroll, it fills with a solid color or gradient.

## Usage

### 1. `text-stroke` + Transition
CSS property `-webkit-text-stroke` creates the outline. `color` handles the fill.

```css
.outline-fill-text {
    font-size: 6rem;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 2px white;
    transition: color 0.5s ease-out;
}

.outline-fill-text:hover {
    color: white;
    /* text-stroke remains, but is merged with fill */
}
```
