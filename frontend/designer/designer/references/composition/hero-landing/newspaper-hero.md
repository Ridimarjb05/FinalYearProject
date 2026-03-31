# Newspaper Hero

**Keywords:** Editorial, Multi-column, Serif, Density, Print style.

**Description:**
Mimics a traditional newspaper layout above the fold. Dense text, clearly defined columns, serif headlines, horizontal rules (lines).

## Usage

### 1. CSS Columns & Borders
Using `border-r` to separate columns.

```html
<div class="max-w-6xl mx-auto p-8 font-serif bg-[#fdfbf7] text-slate-900">
    
    <!-- Masthead -->
    <header class="border-b-4 border-black py-8 text-center mb-8">
        <h1 class="text-8xl font-black uppercase tracking-tighter">The Daily One</h1>
        <div class="flex justify-between border-t border-black mt-4 pt-2 text-sm sans-serif uppercase tracking-wide">
            <span>Vol 01.</span>
            <span>Est 2024</span>
            <span>$2.00</span>
        </div>
    </header>

    <!-- Content Grid -->
    <div class="grid grid-cols-12 gap-8">
        <!-- Main LEAD (8 cols) -->
        <article class="col-span-8 border-r border-slate-300 pr-8">
            <h2 class="text-6xl font-bold leading-tight mb-4">Headline Dominates the Fold</h2>
            <img src="news.jpg" class="w-full grayscale mb-4" />
            <div class="columns-2 gap-8 text-justify leading-relaxed text-lg">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            </div>
        </article>

        <!-- Sidebar (4 cols) -->
        <aside class="col-span-4 flex flex-col gap-8">
            <div class="border-b border-black pb-4">
                <h3 class="text-2xl font-bold mb-2">Market Watch</h3>
                <p class="text-sm">Up 40% on news of fresh design patterns.</p>
            </div>
             <div class="border-b border-black pb-4">
                <h3 class="text-2xl font-bold mb-2">Opinion</h3>
                <p class="text-sm">Why whitespace matters.</p>
            </div>
        </aside>
    </div>

</div>
```
