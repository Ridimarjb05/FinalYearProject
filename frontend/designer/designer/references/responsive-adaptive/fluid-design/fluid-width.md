# Fluid Width

**Keywords:** Percentages, Viewport Units, Flexible Layouts.

**Description:**
Elements sizing based on the available space rather than fixed pixel constraints. This allows content to naturally fill the screen.

## Usage

### 1. Percentages
Width relative to parent.

```css
.container {
  width: 100%;
}

.column-half {
  width: 50%;
}
```

### 2. Viewport Units
Width relative to the viewport.

```css
.hero {
  width: 100vw; /* Full Viewport Width */
  height: 50vh; /* Half Viewport Height */
}
```
