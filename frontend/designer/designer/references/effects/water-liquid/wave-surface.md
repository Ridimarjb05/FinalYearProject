# Wave Surface

**Keywords:** Sea, Ocean, Undulation, Sine Wave, Motion.

**Description:**
The top surface of a body of water moving up and down.

## Usage

### 1. SVG Path Animation
Animate the points of a path or use a library to generate a sine wave path.

### 2. CSS Clip Path
Animate a polygon clip-path to simulate a low-poly wave.

```css
@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
.wave {
  background: url('wave.svg') repeat-x;
  width: 200%;
  animation: wave 10s linear infinite;
}
```
