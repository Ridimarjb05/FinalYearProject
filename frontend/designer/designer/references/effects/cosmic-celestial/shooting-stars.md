# Shooting Stars

**Keywords:** Single Streak, Wish, Night Sky, Fleeting.

**Description:**
Similar to meteor shower but isolated, infrequent, and often more detailed. A single bright streak that appears, travels a short distance, and fades out.

## Usage

### 1. Tailwind & CSS
Use simple absolute positioning and keyframes.

```html
<div class="relative overflow-hidden h-64 bg-slate-900">
  <!-- Shooting Star -->
  <div class="absolute top-10 left-1/2 w-24 h-0.5 bg-gradient-to-l from-white to-transparent animate-shoot opacity-0"></div>
</div>

<style>
  @keyframes shoot {
    0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
    100% { transform: translateX(-200px) translateY(200px) rotate(-45deg); opacity: 0; }
  }
  .animate-shoot {
    animation: shoot 2s ease-out infinite;
    animation-delay: 3s;
  }
</style>
```

### 2. Randomized JavaScript
Inject DOM elements with random delays and positions for a more natural feel.
