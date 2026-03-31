# Progressive Disclosure

**Keywords:** Show/Hide, Read More, Drill-down, Mobile optimization.

**Description:**
Hiding complex or secondary information by default and revealing it only when the user requests it (or when screen space permits). Crucial for mobile UX.

## Usage

### 1. CSS Line Clamp + Expansion
Truncating text.

```html
<div class="relative">
    <p class="line-clamp-3 text-slate-400" id="desc">
       Long description text here...
    </p>
    <button class="text-blue-500 text-sm mt-2" onclick="document.getElementById('desc').classList.remove('line-clamp-3')">
        Read more
    </button>
</div>
```

### 2. Responsive Visibility
Showing full details on desktop, hidden behind click on mobile.

```html
<div class="md:block hidden">
    <!-- Full sidebar visible always -->
</div>
<div class="md:hidden">
    <!-- Menu button to show sidebar -->
</div>
```
