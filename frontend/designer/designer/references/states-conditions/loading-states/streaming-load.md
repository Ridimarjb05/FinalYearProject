# Streaming Load

**Keywords:** Real-time, Incremental, Token by Token.

**Description:**
Content arriving piece by piece (common in AI interfaces).

## Usage

### 1. Cursor Animation
Showing an active cursor at the end of the text stream.

```css
.streaming-text::after {
  content: '▋';
  animation: blink 1s step-start infinite;
}
```
