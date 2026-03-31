# Heat Lightning

**Keywords:** Flash, Silent, Horizon, Summer, Night.

**Description:**
Flashes of light deep within clouds or on the horizon without visible bolts or thunder sound.

## Usage

### 1. CSS Opacity animation
Randomly target cloud divs and spike their brightness/opacity.

```javascript
// JS Trigger
if (random() > 0.99) {
  element.classList.add('flash');
  setTimeout(() => element.classList.remove('flash'), 200);
}
```
