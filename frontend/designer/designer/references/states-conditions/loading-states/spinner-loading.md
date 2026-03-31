# Spinner Loading

**Keywords:** Loader, Throbber, Circular.

**Description:**
The classic rotating circle. Best for small, indeterminate wait times or button states.

## Usage

### 1. CSS Border Spinner
Simple and lightweight.

```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-top-color: #333; /* The active part */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```
