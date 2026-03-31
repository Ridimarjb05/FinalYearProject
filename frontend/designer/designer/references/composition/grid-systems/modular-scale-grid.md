# Modular Scale Grid

**Keywords:** Phi, Golden Ratio, Typography, Rhythm, Harmony.

**Description:**
A grid system derived from typographic scales (e.g., 1.5 ratio) rather than arbitrary integers. Ensures that spatial rhythm matches the text sizing.

## Usage

### 1. CSS Custom Properties
Define the ratio and base unit.

```css
:root {
    --ratio: 1.5; /* Perfect Fifth */
    --base: 1rem;
    --s-1: calc(var(--base));
    --s-2: calc(var(--base) * var(--ratio));
    --s-3: calc(var(--base) * var(--ratio) * var(--ratio));
    --s-4: calc(var(--base) * var(--ratio) * var(--ratio) * var(--ratio));
}

.modular-layout {
    display: grid;
    /* Columns growing by the scale */
    grid-template-columns: var(--s-3) 1fr var(--s-4);
    gap: var(--s-2);
}
```

### Note
In Tailwind, you can extend the spacing scale in `tailwind.config.js` to match a modular scale instead of the linear `0.25rem` incremental scale for a more "designed" feel.
