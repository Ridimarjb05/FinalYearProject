# Spotlight Cone

**Keywords:** Stage, Focus, Theater, Beam.

**Description:**
A cone of light that illuminates a circular area on the floor/object.

## Usage

### 1. CSS Radial Gradient
A `radial-gradient` acting as a mask or overlay.

```css
.spotlight-overlay {
  background: radial-gradient(circle at var(--x) var(--y), transparent 100px, rgba(0,0,0,0.8) 150px);
}
```

### 2. Three.js
`SpotLight` object.
