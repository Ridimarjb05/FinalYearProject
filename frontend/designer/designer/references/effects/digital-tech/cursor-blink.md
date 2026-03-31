# Cursor Blink

**Keywords:** Terminal, Input, Waiting, Prompt, Underscore.

**Description:**
A block or underscore character blinking at the end of a line of text.

## Usage

### 1. CSS Animation
Simple opacity toggle.

```css
.cursor {
  display: inline-block;
  width: 1ch;
  background: currentColor;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
```
