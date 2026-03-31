# Light & Dark Tokens

**Keywords:** Variables, semantics, theming, modes.

**Description:**
The practice of defining colors not by their hex value (`#000`), but by their purpose (`--surface-primary`), allowing the value to swap automatically.

## Usage

### 1. Semantic Naming
*   **Bad:** `--blue-500`
*   **Good:** `--action-primary`

### 2. The Token Layer
```css
:root {
  /* Primitives */
  --blue-500: #3b82f6;
  --white: #ffffff;
  --slate-900: #0f172a;

  /* Semantics (Light) */
  --bg-page: var(--white);
  --text-body: var(--slate-900);
  --btn-bg: var(--blue-500);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Semantics (Dark) */
    --bg-page: var(--slate-900);
    --text-body: var(--white);
    /* Retain Blue or swap to lighter Blue */
  }
}
```

### 3. Inversion Logic
*   Backgrounds flip from Light -> Dark.
*   Text flips from Dark -> Light.
*   **Brand colors often stay the same**, but might need a slight tint adjustment (lighter in dark mode) to maintain contrast.
