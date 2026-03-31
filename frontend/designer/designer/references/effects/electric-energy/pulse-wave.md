# Pulse Wave

**Keywords:** Radar, Sonar, Scan, Ring, Expand.

**Description:**
A thin ring that expands from a center point and fades out.

## Usage

### 1. CSS Scale & Opacity
Multiple divs with `border-radius: 50%` and `border`.

```css
@keyframes pulse-ring {
  0% { transform: scale(0.5); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}
```
