# Depth Blur Layers

**Keywords:** Focus, DOF (Depth of Field), Camera lens effect.

**Description:**
Foreground elements are crisp, while background elements are blurred (or vice versa), simulating a camera's depth of field. Often changes on scroll (rack focus).

## Usage

### 1. Backdrop Filter (or Filter Blur)
Applying blur to specific planes.

```html
<div class="relative h-screen overflow-hidden">
    <!-- Background (Blurred) -->
    <img src="busy-street.jpg" class="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110" />

    <!-- Foreground (Sharp) -->
    <div class="relative z-10 flex items-center justify-center h-full">
        <div class="bg-white p-12 shadow-2xl rounded-xl">
            <h1>Focus Here</h1>
        </div>
    </div>
</div>
```
