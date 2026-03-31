# Glitch Text

**Keywords:** Cyberpunk, Data corruption, RGB Split, Scanlines, Jitter.

**Description:**
Text that appears to malfunction momentarily, splitting into Red/Green/Blue channels and shifting position randomly.

## Usage

### 1. CSS Shapes + Keyframes
Using `::before` and `::after` pseudo-elements to create duplicates of the text that are clipped and shifted.

```css
.glitch {
  position: relative;
  font-size: 4rem;
  font-weight: bold;
  color: white;
}

.glitch::before,
.glitch::after {
  content: attr(data-text); /* Matches content */
  position: absolute;
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background: #050511; /* Match bg color to "hide" parts */
}

/* Red layer */
.glitch::before {
  left: 2px;
  text-shadow: -1px 0 red;
  clip-path: inset(20% 0 10% 0); /* Random slice */
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}

/* Blue layer */
.glitch::after {
  left: -2px;
  text-shadow: -1px 0 blue;
  clip-path: inset(50% 0 30% 0);
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0% { clip-path: inset(20% 0 80% 0); }
  20% { clip-path: inset(60% 0 10% 0); }
  /* ... random slices ... */
  100% { clip-path: inset(10% 0 50% 0); }
}
```

```html
<h1 class="glitch" data-text="CYBERPUNK">CYBERPUNK</h1>
```
