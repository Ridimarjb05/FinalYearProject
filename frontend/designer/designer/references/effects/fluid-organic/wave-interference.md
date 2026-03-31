# Wave Interference (Moiré)

**Keywords:** Moiré pattern, Sine waves, Op art, Phase shift.

**Description:**
Overlapping varying transparency or fine line patterns (usually sine waves) that move slightly differently, creating complex visual interference patterns that look like rippling silk or water.

## Usage

### 1. Canvas Sine Waves
Draw multiple sine waves with slight offsets in frequency and phase.

```javascript
function animate(t) {
    ctx.clearRect(0,0,width,height);
    
    // Config
    const waves = [
        { y: height/2, amplitude: 50, length: 0.01, speed: 0.02, color: 'rgba(168,85,247,0.5)' },
        { y: height/2, amplitude: 60, length: 0.012, speed: 0.03, color: 'rgba(236,72,153,0.5)' },
        { y: height/2, amplitude: 40, length: 0.008, speed: 0.01, color: 'rgba(59,130,246,0.5)' }
    ];

    waves.forEach(w => {
        ctx.beginPath();
        ctx.moveTo(0, height/2);
        ctx.strokeStyle = w.color;
        
        for (let x = 0; x < width; x++) {
            // y = sin(x * length + time * speed) * amplitude
            const y = w.y + Math.sin(x * w.length + t * w.speed) * w.amplitude;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    });
    
    requestAnimationFrame((time) => animate(time * 0.002));
}
```

### 2. CSS Repeating Gradients
Creating Moiré with gradients.

```css
.moire-container {
    background: 
        repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 10px, rgba(0,0,0,0.1) 11px),
        repeating-radial-gradient(circle at 60% 40%, transparent 0, transparent 9px, rgba(0,0,0,0.1) 10px);
    /* Animate background-position or size */
}
```
