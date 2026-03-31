# Step Scale (T-Shirt Sizing)

**Keywords:** XS, SM, Base, LG, XL, 2XL, Discrete.

**Description:**
A step scale assigns named sizes (like T-shirt sizes) to fixed pixel scales. This is the most common approach in design systems (like Material Design, Tailwind, Bootstrap) as it offers predictability and shared vocabulary.

## Usage

### 1. Standard Tailwind Scale
The default scale is a perfect example of a step scale.

*   `xs`: 0.75rem (12px)
*   `sm`: 0.875rem (14px)
*   `base`: 1rem (16px)
*   `lg`: 1.125rem (18px)
*   `xl`: 1.25rem (20px)
*   `2xl`: 1.5rem (24px)
*   `3xl`: 1.875rem (30px)
*   `4xl`: 2.25rem (36px)

### 2. Implementation
Define these steps in your CSS variables or config to ensure consistency. Do not use arbitrary values (e.g., `17px`, `19px`) outside of these steps.

```css
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
```

### 3. Usage Pattern
*   **XS:** Captions, helper text, legal print.
*   **SM:** Secondary body text, UI labels.
*   **Base:** Primary body text.
*   **LG/XL:** Subheadings, modal titles.
*   **2XL+:** Page headings, hero text.
