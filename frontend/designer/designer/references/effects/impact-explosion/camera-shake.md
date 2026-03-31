# Camera Shake

**Keywords:** Earthquake, Rumble, Impact, Vibration, UI.

**Description:**
The entire view or specific UI elements vibrate rapidly to simulate a heavy impact.

## Usage

### 1. CSS Keyframes
Translate `x` and `y` by small random amounts.

```css
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  /* ... */
}
```

### 2. JS Perlin Noise (Simplex)
For smoother, more "cinematic" shake, use noise values for x/y/rotation offsets.
strength = decay(time);
offsetX = noise(time) * strength;
