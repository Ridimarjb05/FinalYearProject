# Orbital Visualization

**Keywords:** Orbital System, Planetary System, Solar Model, Radar View, Ecosystem Visualization, Gravity Well, Concentric Rings.

**Description:**
A layout pattern featuring a central core element with multiple concentric rings rotating at different speeds and directions. "Satellite" elements (like user avatars, logos, or icons) attach to these rings and orbit the center. This is highly effective for "Deep Space" or "Tech" aesthetics to imply a central platform, ecosystem connectivity, or monitoring capabilities.

## Usage

### 1. Tailwind Configuration
Add these animations and keyframes to your `tailwind.config.js`.

```javascript
module.exports = {
  theme: {
    extend: {
      animation: {
        "orbit-slow": "spin 60s linear infinite",
        "orbit-medium": "spin 40s linear infinite",
        "orbit-fast": "spin 25s linear infinite",
        "orbit-reverse-slow": "spin-reverse 60s linear infinite",
        "orbit-reverse-medium": "spin-reverse 40s linear infinite",
        "orbit-reverse-fast": "spin-reverse 25s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
    },
  },
};
```

### 2. HTML Structure
The structure relies on nested absolute positioning. The rings rotate (`spin`), and the satellites inside them must rotate in reverse (`spin-reverse`) at the same speed to keep the image/icon upright while orbiting involved.

```html
<!-- Container: Needs relative positioning and defined dimensions -->
<div class="relative w-[600px] h-[600px] flex items-center justify-center">
    
    <!-- 1. Central Core -->
    <div class="absolute z-20 flex flex-col items-center justify-center w-40 h-40 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
        <span class="text-4xl font-bold text-white">Core</span>
        <span class="text-xs text-slate-400 mt-1 uppercase tracking-widest">System</span>
    </div>

    <!-- 2. Ring 1 (Slow) -->
    <div class="absolute w-[300px] h-[300px] rounded-full border border-white/10 animate-orbit-slow" style="animation-duration: 30s">
        <!-- Satellite Item: Counter-rotates to stay upright -->
        <div class="absolute top-0 left-1/2 -ml-5 -mt-5 animate-orbit-reverse-slow" style="animation-duration: 30s">
            <div class="w-10 h-10 rounded-full bg-blue-500 shadow-lg flex items-center justify-center">
                <!-- Icon/Img here -->
            </div>
        </div>
    </div>

    <!-- 3. Ring 2 (Medium, Reverse Direction) -->
    <div class="absolute w-[450px] h-[450px] rounded-full border border-white/5 animate-orbit-medium" 
         style="animation-duration: 45s; animation-direction: reverse;">
        
        <!-- Satellite 1 -->
        <div class="absolute top-1/2 left-0 -ml-6 -mt-6 animate-orbit-reverse-medium" 
             style="animation-duration: 45s; animation-direction: normal;">
             <div class="w-12 h-12 rounded-full bg-purple-500 shadow-lg"></div>
        </div>
        
        <!-- Satellite 2 (Opposite side) -->
        <div class="absolute bottom-[10%] right-[15%] w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center animate-orbit-reverse-medium"
             style="animation-duration: 45s; animation-direction: normal;">
             <!-- Icon -->
        </div>
    </div>

    <!-- 4. Ring 3 (Fast) -->
    <div class="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-orbit-fast" style="animation-duration: 60s">
        <div class="absolute top-[20%] right-[10%] -ml-7 -mt-7 animate-orbit-reverse-fast" style="animation-duration: 60s">
             <div class="w-14 h-14 rounded-full bg-pink-500 shadow-lg"></div>
        </div>
    </div>
</div>
```

## Styling Tips
- **Borders**: Use very subtle borders (`border-white/5` or `border-white/10`) for the rings to mimic laser paths or orbits.
- **Glassmorphism**: Apply `backdrop-blur` and `bg-white/5` to satellites or the core for a premium feel.
- **Glows**: Add `box-shadow` or background blurs behind the core to create a sense of depth or energy source.
- **Counter-Rotation**: This is critical. If the ring rotates clockwise (`spin`), the satellite MUST rotate counter-clockwise (`spin-reverse`) at the exact same duration to ensure the content (like text or faces) doesn't spin around.
