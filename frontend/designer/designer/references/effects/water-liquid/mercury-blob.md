# Mercury Blob

**Keywords:** Metal, Liquid, Shiny, Chrome, Terminator.

**Description:**
A highly reflective, silver liquid that moves sluggishly and merges with other blobs.

## Usage

### 1. SVG Filters (Gooey Effect)
The classic CSS Gooey effect but with a silver gradient/lighting.

```css
.gooey-filter {
  filter: url('#goo');
}
.blob {
  background: linear-gradient(135deg, #e0e0e0, #999);
  box-shadow: inset 2px 2px 5px white, inset -2px -2px 5px black;
}
```

```xml
<filter id="goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
</filter>
```
