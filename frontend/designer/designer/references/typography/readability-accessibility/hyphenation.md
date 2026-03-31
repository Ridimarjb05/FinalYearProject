# Hyphenation

**Keywords:** Break, Formatting, Justify, Rags.

**Description:**
Hyphenation allows words to break at syllable points at the end of a line. This is crucial for narrow columns (like mobile) or when using justified text, as it prevents huge gaps between words.

## CSS Support

### 1. `hyphens: auto`
The browser uses a dictionary to determine where to break words.

```css
p {
  hyphens: auto;
  /* Optional control */
  -webkit-hyphenate-limit-before: 3; /* min chars before hyphen */
  -webkit-hyphenate-limit-after: 2; /* min chars after hyphen */
}
```

## When to use

### 1. Mobile
Very useful on small screens to prevent "ragged" edges from looking too extreme or long words causing overflow.

### 2. Justified Text
**Mandatory.** You cannot have decent justified text without hyphenation.

### 3. Language Support
Ensure the HTML `lang` attribute is set correctly (`<html lang="en">`), otherwise the browser won't know which hyphenation dictionary to use.
