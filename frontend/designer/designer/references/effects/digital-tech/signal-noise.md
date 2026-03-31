# Signal Noise

**Keywords:** Static, Radio, Snow, Interference, Bad Reception.

**Description:**
Random black/white pixel noise, often used as an overlay or fill for empty areas.

## Usage

### 1. SVG Filter (Turbulence)
Use `<feTurbulence>` to generate noise natively in the browser.

```xml
<filter id="noise">
  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
</filter>
```
Most efficient way to generate noise without large image files.
