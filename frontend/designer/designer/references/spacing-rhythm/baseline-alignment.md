# Baseline Alignment

**Concept:** Text and icon alignment.

Aligning elements by their baselines (the line the text sits on) creates a much more harmonious reading flow than aligning by center or top.

## text-to-text
- Differently sized text side-by-side should share a baseline.
- **CSS:** `align-items: baseline` is your friend in flexbox.

## Icon-to-text
- Icons should generally align with the cap height (top of capital letters) and baseline of the text they accompany.
- **Issue:** Icons are often square images.
- **Fix:** You might need to nudge icons down slightly or use flex alignment to ensure they feel centered relative to the *lowercase* x-height or the cap-height, depending on the icon style.

## The Grid
- Advanced rhythm involves ensuring every line of text sits on a 4px (or 8px) baseline grid across the entire page. This is hard to maintain on the web but looks incredible when done right.
