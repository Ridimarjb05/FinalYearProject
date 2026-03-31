# Hanging Punctuation

**Concept:** Optical edge alignment.

Punctuation marks (quotes, bullets, hyphens) have much less visual weight than letters. If you align them strictly mathematically with the text, the text block will look indented.

## The Fix
"Hang" the punctuation outside the alignment edge.

**Example (Not Hung):**
"Quote starts here...

**Example (Hung):**
" Quote starts here...
 ^ (Quote mark is in the margin)

## Web Reality
- Hard to do automatically on the web with standard CSS (though `hanging-punctuation` property exists, support varies).
- **Manual Adjustment:** heavily used in editorial design and "blockquote" components by using negative text-indent.
- **Lists:** List bullets are a common form of hanging punctuation. `list-style-position: outside` (default) hangs the bullet.
