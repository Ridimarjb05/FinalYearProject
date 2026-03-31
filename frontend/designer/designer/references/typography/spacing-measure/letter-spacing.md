# Letter Spacing (Tracking)

**Keywords:** Tracking, Density, Caps, Headlines, Legibility.

**Description:**
Letter spacing is the horizontal space between characters. It should be adjusted based on the size and capitalization of the text.

## Rules of Thumb

### 1. Uppercase Needs More
Uppercase letters have straight vertical lines that look tight when next to each other. They almost **always** need extra spacing.
*   **Value:** `0.05em` to `0.2em`.

```css
.kicker {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### 2. Headlines Need Less
Large text appears to have looser spacing. Tightening it creates a cohesive, impactful shape (wordmark).
*   **Value:** `-0.02em` to `-0.05em`.

```css
h1 {
  letter-spacing: -0.025em; /* Tailwind: tracking-tight */
}
```

### 3. Small Text Needs More
Tiny text (footnotes, captions) needs extra breathability to be legible.
*   **Value:** `0.025em` to `0.05em`.

### 4. Body Text
Usually best left at `0` (default) or extremely subtle adjustments based on the font file.
