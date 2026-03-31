# Scanline Sweep

**Keywords:** CRT, Retro, TV, Monitor, Old School.

**Description:**
Horizontal lines that scroll down the screen to simulate a CRT refresh rate, plus a subtle static grid overlay.

## Usage

### 1. CSS Background
A repeating linear gradient background that moves down.
Optional: `pointer-events: none` overlay.

```css
.scanlines {
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
  background-size: 100% 4px;
}
```
