# Floating Elements

**Keywords:** Spatial, Levitate, Shadow play, Disconnected.

**Description:**
Elements that appear to hover well above the canvas, often with distinct drop shadows and sometimes subtle "float" animation.

## Usage

### 1. Transform + Shadow
Using `translateY` for position and a large `box-shadow` for depth.

```css
.floating {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                0 10px 10px -5px rgba(0, 0, 0, 0.04); /* Tailwind shadow-xl / 2xl */
}
```

### 2. Animation
Adding life with keyframes.

```css
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}
```
