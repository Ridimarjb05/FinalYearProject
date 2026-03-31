# Gradient Stops

**Keywords:** Hard Stop, Soft Stop, Color Transition.

**Description:**
Controlling where colors change and how sharply.

## Usage

### 1. Smooth Transition
Default behavior.

```css
background: linear-gradient(red, blue);
```

### 2. Hard Stop
Instant color change (stripes).

```css
background: linear-gradient(to right, red 50%, blue 50%);
```

### 3. Hinting
Controlling the midpoint.

```css
background: linear-gradient(red, 90% /* move midpoint */, blue);
```
