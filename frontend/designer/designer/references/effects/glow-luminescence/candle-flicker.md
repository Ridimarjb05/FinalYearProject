# Candle Flicker

**Keywords:** Fire, Wiggle, Unstable, Warm, Light.

**Description:**
A light source that randomly changes intensity and position slightly to simulate a flame in a draft.

## Usage

### 1. CSS Keyframes
Combine opacity and scale changes.

```css
@keyframes flicker {
  0% { opacity: 1; transform: scale(1); }
  25% { opacity: 0.8; transform: scale(0.98); }
  50% { opacity: 0.9; transform: scale(1.02); }
  75% { opacity: 0.85; transform: scale(0.99); }
  100% { opacity: 1; transform: scale(1); }
}

.candle-light {
   box-shadow: 0 0 20px 5px orange;
   animation: flicker 0.1s infinite alternate;
}
```
