# Breadcrumb Hierarchy

**Keywords:** Path navigation, Drill-down, History trail, Geometric delimiters.

**Description:**
A linear visual representation of the user's location within depth-based hierarchy. Modern versions often use slashes, chevrons, or glass pills.

## Usage

### 1. Flex List
Simple text list.

```html
<nav aria-label="Breadcrumb" class="flex text-sm text-slate-400">
    <ol class="flex items-center space-x-2">
        <li>
            <a href="#" class="hover:text-white transition-colors">Projects</a>
        </li>
        <li>
            <svg class="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </li>
        <li>
            <a href="#" class="hover:text-white transition-colors">Q4 Marketing</a>
        </li>
        <li>
             <svg class="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </li>
        <li class="font-medium text-purple-400" aria-current="page">
            Campaign Assets
        </li>
    </ol>
</nav>
```
