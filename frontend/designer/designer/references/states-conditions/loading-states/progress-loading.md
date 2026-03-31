# Progress Loading

**Keywords:** Progress Bar, Determinate, Percentage.

**Description:**
Used when the wait time is known or calculable (e.g., file upload).

## Usage

### 1. HTML5 Progress
Native element.

```html
<progress value="70" max="100"></progress>
```

### 2. Custom Bar
Div width transition.

```css
.progress-bar {
  width: 100%;
  background: #eee;
}
.progress-fill {
  height: 4px;
  background: blue;
  width: 0%; /* Animate this */
  transition: width 0.3s;
}
```
