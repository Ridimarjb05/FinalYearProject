# Initial Load

**Keywords:** Boot, Splash Screen, First Paint.

**Description:**
The very first loading state a user sees when opening the app. Crucial for perceived performance.

## Usage

### 1. Splash Screen
Brand logo on solid background.

```css
.splash {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: black;
  z-index: 9999;
}
```
