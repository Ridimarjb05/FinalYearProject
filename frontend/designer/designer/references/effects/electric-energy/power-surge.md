# Power Surge

**Keywords:** Overload, Boost, Wave, Brightness, Peak.

**Description:**
A sudden increase in brightness and scale of energy elements, often rippling outwards.

## Usage

### 1. CSS Brightness Filter
Animate `filter: brightness()` and `drop-shadow()` simultaneously.

```css
@keyframes surge {
  0% { filter: brightness(1) drop-shadow(0 0 5px blue); }
  50% { filter: brightness(3) drop-shadow(0 0 30px cyan); transform: scale(1.1); }
  100% { filter: brightness(1) drop-shadow(0 0 5px blue); }
}
```
