# Word Spacing

**Keywords:** Gap, Justification, Rivers, Tuning.

**Description:**
Word spacing controls the gap between words. It is rarely modified for standard left-aligned text, but it is the primary engine behind **justified** text.

## Usage

### 1. Fixing Justification
When using `text-align: justify`, the browser adjusts spacing to flush text to both edges. This can create "rivers" of white space.

```css
p {
  text-align: justify;
  text-justify: inter-word; /* Enhances algorithm */
}
```

### 2. Artistic Effect
Sometimes increased word spacing can be used for a stylistic, "airy" headline.

```css
h1 {
  word-spacing: 0.5em;
}
```

### 3. Caution
Messing with word spacing impacts reading speed significantly. Use with extreme caution for body text.
