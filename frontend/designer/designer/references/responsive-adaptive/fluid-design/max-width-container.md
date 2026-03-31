# Max Width Container

**Keywords:** Wrapper, Centered Layout, Readability.

**Description:**
A fundamental pattern to prevent fluid layouts from stretching indefinitely on ultra-wide screens, which can hurt readability and visual balance.

## Usage

### 1. Centered Wrapper
The classic approach.

```css
.container {
  width: 100%;
  max-width: 1200px; /* Cap width */
  margin-left: auto;
  margin-right: auto; /* Center */
  padding-left: 1rem;
  padding-right: 1rem; /* Safety gutters */
}
```

### 2. Tailwind Container
A utility that includes responsive checks.

```html
<div class="container mx-auto px-4">
  Content limited to breakpoints.
</div>
```
