# Hypnotic Rings

**Keywords:** Circles, Pulse, Tunnel, Focus, Trance.

**Description:**
Concentric circles that expand or contract rhythmically, or change thickness/color.

## Usage

### 1. CSS Border & Scale
Multiple `div`s with `border-radius: 50%` centered.

```css
.ring:nth-child(n) {
  animation: pulse 2s ease-in-out infinite;
  animation-delay: calc(0.1s * var(--n));
}
```
