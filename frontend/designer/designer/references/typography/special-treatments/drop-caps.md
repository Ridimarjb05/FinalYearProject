# Drop Caps

**Keywords:** Initial, Decorative, Editorial, Magazine.

**Description:**
A drop cap ("dropped capital") is a large capital letter used as a decorative element at the beginning of a paragraph or section. It signals the start of a narrative.

## Implementation

### 1. CSS `::first-letter`
The standard way. No needs for extra spans.

```css
p.intro::first-letter {
  font-family: 'Playfair Display', serif;
  font-size: 3.5em;
  font-weight: bold;
  float: left;
  line-height: 0.8;
  margin-right: 0.1em;
  color: var(--accent-color);
}
```

### 2. Tailwind Plugin
Tailwind has a `first-letter:` modifier.

```html
<p class="first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3">
  Once upon a time...
</p>
```

### 3. Considerations
*   **Collision:** Make sure the cap doesn't crash into the lines below it.
*   **Mobile:** Sometimes drop caps take up too much space on small screens. Disable them or make them smaller on mobile.
