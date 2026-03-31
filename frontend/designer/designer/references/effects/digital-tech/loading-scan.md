# Loading Scan

**Keywords:** Progress, Analysis, Sweep, Verify, Security.

**Description:**
A line that moves back and forth over an object or bar, highlighting it as it passes, often turning it from red to green or low-res to high-res.

## Usage

### 1. CSS Linear Gradient Animation
Animate the `background-position` of a gradient overlay.

```css
.scanner {
  background: linear-gradient(to bottom, transparent, rgba(50, 255, 50, 0.5), transparent);
  background-size: 100% 20px;
  background-repeat: no-repeat;
  animation: scan 2s linear infinite;
}
```
