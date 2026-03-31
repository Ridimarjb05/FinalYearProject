# Device Targeting

**Keywords:** Device Type, Mobile, Tablet, Desktop, User Agent.

**Description:**
Designing specifically for the physical characteristics of device categories (interaction mode, screen size, orientation) rather than just pixel widths.

## Usage

### 1. Mobile & Tablet Specifics
Targeting touch devices or specific orientations.

```css
/* Portrait Mobile */
@media (max-width: 480px) and (orientation: portrait) {
  .hero-image { display: none; }
}

/* Landscape Tablet */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .sidebar { width: 25%; }
}
```

### 2. Desktop High-Res
Targeting large retina displays.

```css
@media (min-width: 1920px) {
  .container { max-width: 1600px; }
}

/* High DPI Screens */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .icon { background-image: url('icon@2x.png'); }
}
```
