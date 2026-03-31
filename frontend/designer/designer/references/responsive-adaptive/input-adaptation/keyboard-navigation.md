# Keyboard Navigation

**Keywords:** Focus Styles, Tab Index, Accessibility, A11y.

**Description:**
Ensuring the site is usable without a mouse. Critical for accessibility and power users.

## Usage

### 1. Visible Focus States
Never remove outline without replacing it.

```css
button:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

### 2. Skip Links
Allow keyboard users to jump past nav.

```css
.skip-link {
  position: absolute;
  top: -40px;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```
