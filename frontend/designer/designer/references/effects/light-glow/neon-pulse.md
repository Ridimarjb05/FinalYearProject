# Neon Pulse

**Keywords:** Cyberpunk, Glow, Breathing, Sci-fi, HUD.

**Description:**
Elements with bright outlines that breathe (expand/contract opacity or shadow) to simulate live power. Often combined with "flicker" for realism.

## Usage

### 1. CSS Box Shadow
The classic glowing border.

```css
@keyframes neon-pulse {
  0%, 100% {
    box-shadow: 0 0 5px #fff,
                0 0 10px #fff,
                0 0 20px #0ff,
                0 0 40px #0ff;
    border-color: #0ff;
  }
  50% {
    box-shadow: 0 0 2px #fff,
                0 0 5px #fff,
                0 0 10px #0ff,
                0 0 20px #0ff;
    border-color: rgba(0, 255, 255, 0.7);
  }
}

.neon-button {
    border: 1px solid transparent;
    animation: neon-pulse 1.5s infinite alternate;
}
```

### 2. Text Glow
Using `text-shadow`.

```css
.neon-text {
    color: #fff;
    text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #0fa,
      0 0 82px #0fa,
      0 0 92px #0fa,
      0 0 102px #0fa;
}
```
