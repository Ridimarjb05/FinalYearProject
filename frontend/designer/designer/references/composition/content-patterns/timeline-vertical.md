# Timeline Vertical

**Keywords:** History, Roadmap, Process flow, Connected nodes.

**Description:**
A vertical line connecting sequential events. Often features alternating left/right content (on desktop) and single-side content (on mobile).

## Usage

### 1. Absolute Line + Relative Items
The classic implementation.

```html
<div class="relative max-w-2xl mx-auto py-12">
    <!-- The Line -->
    <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"></div>
    
    <!-- Item 1 (Left on desktop) -->
    <div class="relative flex md:justify-end mb-12">
        <!-- Dot -->
        <div class="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-950 z-10"></div>
        
        <!-- Content -->
        <div class="ml-20 md:ml-0 md:mr-12 w-full md:w-5/12 bg-slate-900 p-6 rounded-xl border border-slate-800">
            <span class="text-xs text-purple-400 font-mono">2024 Q1</span>
            <h3 class="text-lg font-bold mt-1">Project Kickoff</h3>
        </div>
    </div>
    
    <!-- Item 2 (Right on desktop) -->
    <div class="relative flex md:justify-start mb-12">
        <div class="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-950 z-10"></div>
        <div class="ml-20 md:ml-12 w-full md:w-5/12 bg-slate-900 p-6 rounded-xl border border-slate-800">
           <span class="text-xs text-blue-400 font-mono">2024 Q2</span>
           <h3 class="text-lg font-bold mt-1">Beta Launch</h3>
        </div>
    </div>
</div>
```
