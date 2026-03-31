# Text Indent

**Keywords:** Paragraphs, Books, Traditional, Spacing.

**Description:**
Text indentation is a way to signal a new paragraph without adding vertical whitespace. It is the hallmark of Typesetting for books (long-form reading), while the web defaults to paragraph spacing.

## Guidelines

### 1. The Rule
**Never use both.**
*   Either add `margin-bottom` between paragraphs.
*   OR indent the first line of subsequent paragraphs.

### 2. First Paragraph Exception
The first paragraph of a section (or after a headline) should **never** be indented. Only subsequent paragraphs are indented.

### 3. Implementation

```css
/* Targets all paragraphs that follow another paragraph */
p + p {
  text-indent: 1.5em;
  margin-top: 0;
}

/* Ensure the first one is not indented */
p {
  margin-bottom: 0;
}
```

### 4. Context
Use indentation for "immersive" reading experiences (e.g., a novel reader app, a very long essay). Use spacing for everything else (UI, marketing, docs).
