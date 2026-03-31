# Bleeding Containers

**Keywords:** Full-width breakout, Edge-to-edge, Layout break.

**Description:**
Elements inside a centered container that intentionally break out of the container bounds to touch the screen edges (or extend further than the text).

## Usage

### 1. Calc Utility (CSS)
Breaking out of a centered container.

```css
.full-bleed {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
}
```

### 2. Grid Approach
Defining a grid where specific columns are 'full' and others are 'content'.

```css
.grid-layout {
    display: grid;
    grid-template-columns: 
        [full-start] minmax(1rem, 1fr) 
        [content-start] minmax(0, 1200px) [content-end] 
        minmax(1rem, 1fr) [full-end];
}

.content { grid-column: content; }
.bleed { grid-column: full; }
```
