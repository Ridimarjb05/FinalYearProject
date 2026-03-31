# Encryption Scramble

**Keywords:** Hack, Code, Reveal, Decrypt, Text.

**Description:**
Text where characters randomly change (a-z, 0-9, special chars) until they "lock in" to the correct letter one by one.

## Usage

### 1. JS Text Animation
On hover, run a loop that replaces the text content with random strings.
Gradually reduce the number of random characters from left to right.

```javascript
// Pseudo
const chars = "!@#$%^&*";
element.innerText = originalText.split('').map((char, index) => {
  if (index < iterations) return char;
  return chars[Math.floor(Math.random() * chars.length)];
}).join('');
```
