# Type Density

**Keywords:** Information Density, Compact, Relaxed, Whitespace, Dashboard.

**Description:**
Type density refers to the closeness of elements and text. Different interfaces require different densities. A data-heavy dashboard needs high density (compact), while a marketing blog needs low density (relaxed).

## Modes

### 1. Compact (High Density)
*   **Context:** Data tables, financial terminals, IDEs.
*   **Traits:** Small base size (13px-14px), tight line-height (1.2-1.3), minimal padding.
*   **Goal:** Maximum information per pixel.

### 2. Normal (Medium Density)
*   **Context:** Standard SaaS apps, social feeds.
*   **Traits:** Standard base size (16px), normal line-height (1.5).
*   **Goal:** Balance between readability and scanability.

### 3. Relaxed (Low Density)
*   **Context:** Long-form reading, landing pages, storytelling.
*   **Traits:** Large base size (18px-21px), loose line-height (1.6-1.8), generous margins.
*   **Goal:** Immersive reading, reduced eye strain.

## Usage

### 1. Utility Classes (Tailwind)
Create scoped classes or user preferences.

```html
<!-- Compact Mode -->
<div class="text-sm leading-tight space-y-1">
  <p>Data row 1</p>
  <p>Data row 2</p>
</div>

<!-- Relaxed Mode -->
<div class="text-lg leading-loose space-y-6">
  <p>Once upon a time...</p>
  <p>In a galaxy far away...</p>
</div>
```

### 2. Theming via CSS Variables
Switch entire density modes by updating a few variables on the root.

```css
.theme-compact {
  --text-base: 14px;
  --leading-base: 1.3;
  --space-unit: 4px;
}

.theme-relaxed {
  --text-base: 18px;
  --leading-base: 1.7;
  --space-unit: 8px;
}
```
