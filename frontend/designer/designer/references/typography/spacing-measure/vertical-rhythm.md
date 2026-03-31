# Vertical Rhythm

**Keywords:** Grid, Baseline, Flow, Consistency.

**Description:**
Vertical rhythm is the practice of keeping vertical spaces between elements consistent, usually based on a "baseline grid". This creates a subconscious sense of order and trust.

## The Baseline Grid

### 1. The 4px / 8px Grid
The most common modern grid. Align all line-heights and margins to multiples of 4.
*   **Base:** 16px font / 24px line-height (1.5).
*   **H1:** 32px font / 40px line-height (1.25).
*   **Margin Bottom:** 16px, 24px, 32px.

### 2. Visualization
Imagine horizontal lines running down the page every 4px (or 8px). Every line of text should "sit" on these lines, or at least the bounding boxes should stack cleanly.

## Usage in CSS
It's hard to force text to sit perfectly on a baseline on the web, but you can enforce the *container* rhythm.

```css
/* Each element occupies vertical space in multiples of the grid unit (0.5rem = 8px) */
p {
  line-height: 1.5rem; /* 24px */
  margin-bottom: 1.5rem; /* 24px */
}

h2 {
  font-size: 2rem;
  line-height: 2.5rem; /* 40px */
  margin-top: 3rem; /* 48px */
  margin-bottom: 1rem; /* 16px */
}
```
