# Fractions & Ordinals

**Keywords:** Math, Recipes, st, nd, rd, th, frac, ordn.

**Description:**
Standard typing ("1/2" or "1st") looks "computery". Professional typography uses proper formatting for fractions and ordinal indicators.

## Fractions
Instead of `1/2`, use a true diagonal fraction.

### 1. OpenType `frac`
```css
.recipe {
  font-feature-settings: "frac";
  font-variant-numeric: diagonal-fractions;
}
```
*   Result: 1/2 becomes ½ (but using the font's matching glyphs).

## Ordinals
The "st", "nd", "rd", "th" in 1st, 2nd, 3rd.

### 1. OpenType `ordn`
Raises the suffix.

```css
.date {
  font-feature-settings: "ordn";
  font-variant-numeric: ordinal;
}
```
*   Result: 1st becomes 1ˢᵗ.

## Tailwind Support
Tailwind requires usage of `font-variant-numeric` utilities.
*   `ordinal`
*   `diagonal-fractions`
*   `slashed-zero`
