# Tabular Numbers

**Keywords:** Data, Tables, Alignment, Monospaced Digits, tnum.

**Description:**
By default, most fonts use "proportional" numbers (the '1' is skinny, the '0' is wide). This looks great in sentences but terrible in tables/financial data because columns don't align. "Tabular numbers" forces all digits to have the same width.

## Implementation

### 1. OpenType Feature
Enable the `tnum` (Tabular Numbers) feature.

```css
.price-table {
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
```

### 2. Tailwind Utility
Tailwind has a built-in utility for this.

```html
<td class="tabular-nums text-right">
  $1,234.00
</td>
```

### 3. When to use
*   **Pricing tables:** Yes.
*   **Timers/Countdowns:** Yes (prevents jitter).
*   **Standard Paragraphs:** No (proportional looks better).
