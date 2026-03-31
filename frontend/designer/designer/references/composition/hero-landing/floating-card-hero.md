# Floating Card Hero

**Keywords:** Elevated UI, Card on Background, Login style.

**Description:**
A rich, full-screen background (video, image, or 3D) with a centered "card" containing the primary content (headline, form, etc.). This focuses attention sharply.

## Usage

### 1. Flex Center + Backdrop Filter
The modern glass card look.

```html
<div class="relative h-screen flex items-center justify-center">
    <!-- Background -->
    <img src="city.jpg" class="absolute inset-0 w-full h-full object-cover" />

    <!-- Card -->
    <div class="relative z-10 bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl max-w-lg w-full transform hover:-translate-y-2 transition-transform duration-500">
        <h1 class="text-3xl font-bold mb-4">Welcome Back</h1>
        <p class="text-slate-600 mb-8">Access your dashboard below.</p>
        <input type="text" placeholder="Email" class="w-full bg-slate-100 p-4 rounded-xl mb-4" />
        <button class="w-full bg-black text-white p-4 rounded-xl font-bold">Login</button>
    </div>
</div>
```
