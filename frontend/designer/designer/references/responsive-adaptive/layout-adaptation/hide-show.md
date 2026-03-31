# Hide & Show

**Keywords:** Visibility, Display, Toggle, Mobile Optimized.

**Description:**
Selectively hiding non-essential elements on smaller screens to reduce clutter, or showing mobile-only elements (like a "Call Now" button).

## Usage

### 1. Display Property
The most common method.

```css
.desktop-only {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-only {
    display: block;
  }
}
```

### 2. Visibility (Layout Preserved)
Hides content but keeps space.

```css
.invisible-mobile {
  visibility: hidden;
}

@media (min-width: 768px) {
  .invisible-mobile {
    visibility: visible;
  }
}
```
