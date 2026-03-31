# Measure (Line Length)

**Keywords:** CPL, Characters Per Line, Width, Max-Width, Eye-Travel.

**Description:**
The "measure" is the length of a line of text. If a line is too long, the reader's eye loses its place when moving to the next line. If it's too short, the rhythm is broken by constant eye movement.

## The Ideal Rule
**45 to 75 characters per line.**
*   66 characters is often cited as the "optimum".
*   Headlines can be shorter.

## Implementation

### 1. `ch` Unit
The `ch` unit represents the width of the "0" (zero) character. It's perfect for setting measures.

```css
article {
  max-width: 65ch; /* ~65 characters wide */
  margin-inline: auto;
}
```

### 2. Tailwind `prose`
The `@tailwindcss/typography` plugin automatically sets the max-width to `65ch` for this exact reason.

```html
<div class="prose max-w-prose mx-auto">
  ...
</div>
```

### 3. Mobile vs Desktop
On mobile, you are naturally constrained by the viewport, which is usually fine (30-40 chars). On desktop, you **must** constrain text width. Do not let text span 1920px.
