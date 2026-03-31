# Aurora Gradient

**Keywords:** Northern Lights, Borealis, Mesh Gradient, Smooth Flow, Ethereal.

**Description:**
Soft, flowing bands of color that mimic the northern lights. Usually achieved with large, blurred, moving shapes (gradients) layered on top of each other.

## Usage

### 1. Tailwind & CSS Filters
The easiest modern way. Use `blur-3xl` or `blur-[100px]` on moving blobs.

```html
<div class="relative w-full h-80 bg-slate-900 overflow-hidden isolate">
    <!-- Blob 1 -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
    <!-- Blob 2 -->
    <div class="absolute top-0 right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
    <!-- Blob 3 -->
    <div class="absolute -bottom-40 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
</div>
```

### 2. Tailwind Animation Config
```javascript
// tailwind.config.js
theme: {
  extend: {
    animation: {
      blob: "blob 10s infinite",
    },
    keyframes: {
      blob: {
        "0%": { transform: "translate(0px, 0px) scale(1)" },
        "33%": { transform: "translate(30px, -50px) scale(1.1)" },
        "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        "100%": { transform: "translate(0px, 0px) scale(1)" },
      },
    },
  },
}
/* Utility for delay */
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
```
