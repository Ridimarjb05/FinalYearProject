# Touch Targets

**Keywords:** Hit Area, Finger Size, Mobile UX.

**Description:**
Ensuring interactive elements are large enough to be accurately tapped by a finger (typically 44px-48px minimum).

## Usage

### 1. Extends Hit Area
Visual size vs clickable size.

```css
.button-icon {
  width: 24px;
  height: 24px;
  position: relative;
}

/* Pseudo-element increases hit area to 44px */
.button-icon::after {
  content: '';
  position: absolute;
  top: -10px; right: -10px;
  bottom: -10px; left: -10px;
}
```

### 2. Min-Dimensions
Directly sizing the element.

```css
button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}
```
