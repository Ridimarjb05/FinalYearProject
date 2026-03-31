# Superfamily

**Keywords:** Consistency, Flexibility, Weights, Widths, Cohesion.

**Description:**
A superfamily is a single typeface family that contains many variations, such as Serif, Sans, Mono, Condensed, Display, and Text versions, often with extensive weight ranges. Using a superfamily guarantees harmony because all variants share the same skeleton and DNA.

## Examples
*   **Roboto:** Roboto, Roboto Slab, Roboto Mono, Roboto Condensed.
*   **Source:** Source Sans, Source Serif, Source Code.
*   **IBM Plex:** Plex Sans, Plex Serif, Plex Mono.
*   **Merriweather:** Merriweather, Merriweather Sans.

## Usage

### 1. CSS Implementation
Simply load the different families.

```css
:root {
  --font-base: 'Roboto', sans-serif;
  --font-accent: 'Roboto Slab', serif;
  --font-code: 'Roboto Mono', monospace;
}
```

### 2. Benefits
*   **Perfect Matching:** x-heights and stroke widths are already calibrated.
*   **Simplicity:** No need to hunt for a matching font.
*   **Visual Cohesion:** The brand feels unified across all touchpoints (app, blog, code snippets).
