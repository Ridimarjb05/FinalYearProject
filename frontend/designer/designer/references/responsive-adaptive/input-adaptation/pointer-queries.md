# Pointer Queries

**Keywords:** Interaction Media Features, Fine Pointer, Coarse Pointer.

**Description:**
Detecting the primary input mechanism's accuracy to adapt the UI (e.g., making controls larger for touch vs mouse).

## Usage

### 1. Fine vs Coarse
Adapting UI density.

```css
/* Mouse or Stylus (Precise) */
@media (pointer: fine) {
  .checkbox { transform: scale(1); }
}

/* Finger (Imprecise) */
@media (pointer: coarse) {
  .checkbox { transform: scale(1.5); }
}
```
