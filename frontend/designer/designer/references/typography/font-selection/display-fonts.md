# Display Fonts

**Keywords:** Personality, Decorative, Headlines, Branding, Specialized.

**Description:**
Display fonts are designed to be used at large sizes (usually 24px and up). They prioritize personality and shape over long-form legibility. They should **never** be used for body text.

## Categories

### 1. Script / Handwritten
Personal, creative, informal.
*   *Examples:* Great Vibes, Dancing Script.
*   *Use:* Signatures, creative headings.

### 2. Slab Serif / Heavy
Strong, loud, industrial.
*   *Examples:* Rockwell, Alfa Slab One.
*   *Use:* Impactful heros, posters.

### 3. Experimental / Decorative
Unique, artistic, niche.
*   *Examples:* Bleeding Cowboys (meme), niche retro fonts.
*   *Use:* Specific campaigns, artistic direction.

## Implementation Warning
*   **Performance:** Display fonts can be heavy file sizes. Only load the characters you need if possible.
*   **Legibility:** Test on mobile. Complex scripts can become unreadable when scaled down too much.
*   **Fallback:** Always provide a solid fallback font (serif or sans) in the CSS stack.

```css
h1 {
  font-family: 'My Wild Display', 'Helvetica', sans-serif;
}
```
