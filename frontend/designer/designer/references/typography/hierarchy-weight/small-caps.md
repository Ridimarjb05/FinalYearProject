# Small Caps

**Keywords:** OpenType, Elegance, Abbreviations, Formal.

**Description:**
Small caps are uppercase letters that are the same x-height as lowercase letters. `Real` small caps are designed by the type designer with proper proportions/weight. `Faux` small caps are just computer-scaled capital letters (and look thin/ugly).

## Usage

### 1. Acronyms & Abbreviations
In a block of text, "NASA" or "FBI" can scream at the reader. Small caps blends them into the text texture effectively.

### 2. Formal Headers
Gives a "legal" or "literary" feel.

## Implementation

### 1. The Right Way (OpenType)
This uses the font's actual small caps glyphs. If the font doesn't have them, it might fallback to nothing or synthesis.

```css
.small-caps {
  font-variant-caps: small-caps;
  /* OR */
  font-feature-settings: 'smcp';
}
```

### 2. The Hacky Way (Scale)
Only do this if you absolutely must and have no proper font support.

```css
.fake-small-caps {
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 0.05em;
  font-weight: 700; /* Bump weight to compensate for scaling down */
}
```
