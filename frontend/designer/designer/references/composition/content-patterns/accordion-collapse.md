# Accordion Collapse

**Keywords:** FAQ, Expandable, Disclosure, Concertina.

**Description:**
Stacked headers that reveal content when clicked. "Accordion" implies only one open at a time; "Collapse" implies independent toggling.

## Usage

### 1. HTML `details` and `summary` (Native)
The semantic, no-JS way.

```html
<details class="group border-b border-slate-800">
    <summary class="flex items-center justify-between p-4 cursor-pointer list-none">
        <span class="font-medium">What is the refund policy?</span>
        <svg class="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
    </summary>
    <div class="p-4 pt-0 text-slate-400">
        We offer a 30-day money-back guarantee, no questions asked.
    </div>
</details>
```

### 2. Animated (JS + Max-Height)
For smooth slide animation (which `details` doesn't do natively easily).

```css
.collapse-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}
.collapse-content.open {
    max-height: 500px; /* Arbitrary large number, or set via JS scrollHeight */
}
```
