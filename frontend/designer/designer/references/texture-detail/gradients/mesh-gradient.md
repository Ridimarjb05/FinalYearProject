# Mesh Gradient

**Keywords:** Aurora, Aurora Borealis, Blurred Blobs.

**Description:**
Multiple radial gradients or blurred shapes layered together to create a complex, fluid, organic color field. Very popular in modern UI.

## Usage

### 1. Blurred Blobs
Stacking absolute positioned elements.

```css
.blob-1 { background: #f0f; filter: blur(80px); }
.blob-2 { background: #0ff; filter: blur(60px); }
```

### 2. CSS-only Background
Multiple radial gradients.

```css
.mesh {
  background-color: #000;
  background-image:
    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%),
    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
}
```
