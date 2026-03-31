# Breakpoint Tokens

**Keywords:** Design Tokens, Variables, CSS Custom Properties, SCSS Variables.

**Description:**
Abstracting raw pixel values into named tokens to ensure consistency and maintainability across a codebase.

## Usage

### 1. CSS Variables (Custom Media)
*Note: Native CSS Custom Media is not fully supported yet, often requires valid PostCSS.*

```css
@custom-media --sm (min-width: 640px);
@custom-media --md (min-width: 768px);

@media (--md) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
```

### 2. SCSS/Sass Map
Common pattern in preprocessors.

```scss
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px
);

@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

.element {
  @include respond-to('md') {
    width: 50%;
  }
}
```
