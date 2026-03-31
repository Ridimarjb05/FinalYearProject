# Overlapping Split

**Keywords:** Broken grid, Layered center, Shared zone.

**Description:**
Two columns, but content from one overlaps into the other's space. For example, an image in the right column crosses over the center line into the left text column.

## Usage

### 1. Negative Margins
Pulling an element across.

```html
<div class="grid grid-cols-2 container mx-auto items-center py-20">
    <!-- Left: Text -->
    <div class="z-10 bg-white p-12 shadow-xl rounded-xl mr-[-4rem]">
        <h1>Headline</h1>
        <p>Overlapping content creates depth.</p>
    </div>

    <!-- Right: Image -->
    <div class="h-96 w-full">
         <img src="..." class="w-full h-full object-cover rounded-xl" />
    </div>
</div>
```
