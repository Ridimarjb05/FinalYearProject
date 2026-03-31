# Vertical Split

**Keywords:** Classic Split, Sidebar layout, Editorial.

**Description:**
Similar to Split Screen, but often refers to a distinct, hard line where one side might be scrollable while the other is fixed, or a layout where the split line itself is a design feature (e.g., a thick border).

## Usage

### 1. Two Scrolling Columns (Independent)
Rare but interesting.

```html
<div class="flex h-screen overflow-hidden">
    
    <div class="w-1/2 overflow-y-auto p-12 bg-white">
        <!-- Text Content -->
    </div>

    <div class="w-1/2 overflow-y-auto p-0 bg-black">
        <!-- Visual Content -->
    </div>

</div>
```
