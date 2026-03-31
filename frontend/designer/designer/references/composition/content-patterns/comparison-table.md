# Comparison Table

**Keywords:** Pricing grid, Feature list, Matrix, Sticky header.

**Description:**
A grid comparing attributes of multiple items (e.g., pricing plans). Crucial features often include sticky column headers (so you don't lose context) and sticky first column (labels).

## Usage

### 1. CSS Grid + Sticky
Grid is excellent for alignment.

```html
<div class="grid grid-cols-4 gap-x-4">
    <!-- Header Row -->
    <div class="sticky top-0 bg-slate-950 z-20 py-4 font-bold border-b border-slate-800">Feature</div>
    <div class="sticky top-0 bg-slate-950 z-20 py-4 font-bold text-center border-b border-slate-800">Free</div>
    <div class="sticky top-0 bg-slate-900 z-20 py-4 font-bold text-center border-b border-purple-500 rounded-t-xl text-purple-400">Pro</div>
    <div class="sticky top-0 bg-slate-950 z-20 py-4 font-bold text-center border-b border-slate-800">Enterprise</div>
    
    <!-- Row 1 -->
    <div class="py-4 border-b border-slate-800/50">Users</div>
    <div class="py-4 border-b border-slate-800/50 text-center text-slate-400">1</div>
    <div class="py-4 border-b border-slate-800/50 text-center bg-slate-900/50 font-bold">5</div>
    <div class="py-4 border-b border-slate-800/50 text-center text-slate-400">Unlimited</div>
    
    <!-- Row 2... -->
</div>
```
