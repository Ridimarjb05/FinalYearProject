# Mono Accent

**Keywords:** Technical, Data, Code, Brutalism, Utilitarian.

**Description:**
Using a monospaced font for small accents (labels, tags, metadata, numbers) adds a layer of technical sophistication and structure to a design. It creates a distinct visual hierarchy that separates "data" from "narrative".

## Usage

### 1. Contexts
*   **Metadata:** Dates, authors, categories.
*   **UI Components:** Badges, pills, tooltips.
*   **Numbers:** Tabular data, prices (naturally aligns).
*   **Code:** Obviously (snippets, terminal outputs).

### 2. CSS Implementation
```css
.meta-tag {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### 3. Tailwind Example
```html
<div class="flex items-center gap-2">
  <img src="user.jpg" class="w-8 h-8 rounded-full">
  <div class="flex flex-col">
    <span class="font-sans font-bold">John Doe</span>
    <!-- Mono Accent for timestamp -->
    <span class="font-mono text-xs text-slate-500">2023-10-27 14:30</span>
  </div>
</div>
```
