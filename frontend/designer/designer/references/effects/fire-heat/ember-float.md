# Ember Float

**Keywords:** Ash, Sparks, Rising, Heat, Aftermath.

**Description:**
Tiny, glowing particles rising gently. The movement is usually slower and more "drifting" than violent fire particles.

## Usage

### 1. CSS & Keyframes
Ideal for adding atmosphere to dark sections.

```css
.ember {
  width: 2px; height: 2px;
  background: #ffaa00;
  position: absolute;
  bottom: 0;
  animation: floatUp 5s linear infinite;
  opacity: 0;
}

@keyframes floatUp {
  0% { transform: translateY(0) translateX(0); opacity: 1; }
  100% { transform: translateY(-500px) translateX(50px); opacity: 0; }
}
```
