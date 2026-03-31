# Code Typography

**Keywords:** Monospace, Syntax Highlighting, Inline code, Blocks.

**Description:**
Displaying code requires monospaced fonts (fixed width) to preserve indentation and structure.

## Guidelines

### 1. Font Stack
Use a modern coding font stack (ligatures optional but nice).
*   `font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;`

### 2. Inline Code
Small snippets within body text.
*   **Bg:** Light gray background.
*   **Padding:** Slight side padding.
*   **Color:** Often pink or red (distinct from black text).
*   **Size:** Often needs to be scaled down (0.9em) because mono fonts look huge.

```css
code {
  background: #f1f5f9;
  padding: 0.1em 0.3em;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: monospace;
}
```

### 3. Code Blocks
Large blocks.
*   **Theme:** Syntax highlighting (Prism, Shiki) is essential.
*   **Scroll:** Horizontal overflow scroll is mandatory. Never wrap code lines unless explicitly requested.
