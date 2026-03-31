# Partial Error

**Keywords:** Degraded, Warning.

**Description:**
When most of the page works, but one section failed (e.g., "Trending News" failed to load).

## Usage

### 1. Component Feedback
Show error only in the affected card.

```html
<div class="card error">
  <p>Could not load trending news.</p>
  <button>Retry</button>
</div>
```
