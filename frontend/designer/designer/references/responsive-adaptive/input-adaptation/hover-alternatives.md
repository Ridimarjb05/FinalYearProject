# Hover Alternatives

**Keywords:** Touch Interaction, Active State, Progressive Enhancement.

**Description:**
Touch devices don't have "hover". Designs relying on hover for critical information (tooltips, revealing actions) are inaccessible on mobile.

## Usage

### 1. Click to Reveal
Toggle visibility on click instead of hover for touch devices.

```css
/* Desktop: Hover */
@media (hover: hover) {
  .tooltip-trigger:hover .tooltip { display: block; }
}

/* Touch: Require separate JS toggle or use :focus */
.tooltip-trigger:focus .tooltip {
  display: block;
}
```

### 2. Always Visible on Mobile
Don't hide actions.

```css
.card-actions {
  opacity: 1; /* Always visible on mobile */
}

@media (hover: hover) {
  .card-actions {
    opacity: 0; /* Hidden until hover on desktop */
  }
  .card:hover .card-actions {
    opacity: 1;
  }
}
```
