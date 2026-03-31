# Typewriter Cascade

**Keywords:** Terminal, Coding, Sequential Reveal, Staggered Text.

**Description:**
Text that reveals character-by-character or word-by-word, often with a blinking cursor. "Cascade" implies multiple lines triggering one after another.

## Usage

### 1. CSS Steps
Great for monospace "terminal" feel.

```css
.typewriter {
  overflow: hidden; /* Ensures content is not revealed until animation */
  border-right: .15em solid orange; /* The cursor */
  white-space: nowrap; /* Keeps content on a single line */
  margin: 0 auto; 
  letter-spacing: .15em; 
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}
```

### 2. JS Recursive Timeout (Better for variable speed)
More human-like typing.

```javascript
const text = "Transmission Incoming...";
const el = document.getElementById('typing-text');
let i = 0;

function type() {
  if (i < text.length) {
    el.innerHTML += text.charAt(i);
    i++;
    // Randomize delay slightly for realism
    setTimeout(type, Math.random() * 100 + 50); 
  }
}
type();
```

### 3. Staggered Lines (Cascade)
Using a delay based on index for multiple lines.

```html
<div class="line" style="animation-delay: 0s">Line 1...</div>
<div class="line" style="animation-delay: 2s">Line 2...</div>
```
