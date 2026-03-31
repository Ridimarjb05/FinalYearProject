# Data Stream

**Keywords:** Matrix, Binary, Code, Flow, Cyberpunk.

**Description:**
Streams of characters (0/1, Katakana, Hex) raining down or flowing horizontally.

## Usage

### 1. Canvas Text
The classic "Matrix Rain" effect.
Columns of text where the head character is bright and changes randomly, trailing characters fade out.

```javascript
// Draw Loop
ctx.fillStyle = '#0f0';
ctx.fillText(char, x, y);
drops[i]++;
if (drops[i] * fontSize > height && Math.random() > 0.95) drops[i] = 0;
```
