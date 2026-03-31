# Stacked Type

**Keywords:** Vertical alignment, List style, Varied Weights, Poster style.

**Description:**
Headline words are stacked vertically, often with different font weights, styles (italic vs. normal), or indentations to create a poster-like composition.

## Usage

### 1. Flex Column + Utility Classes
Mixing fonts and alignments.

```html
<div class="flex flex-col text-8xl leading-[0.85] font-black uppercase text-slate-900 tracking-tighter">
    <span>We Build</span>
    <span class="text-purple-600 font-serif italic font-normal ml-24">Digital</span>
    <span class="mr-12 text-right text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Brands</span>
    <span class="ml-12 outline-text text-white">Tomorrow</span>
</div>

<style>
.outline-text {
    -webkit-text-stroke: 2px #0f172a;
}
</style>
```
