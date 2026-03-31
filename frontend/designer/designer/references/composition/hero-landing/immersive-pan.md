# Immersive Pan (Ken Burns)

**Keywords:** Slow zoom, Pan, Cinematic, scale animation.

**Description:**
A static image that slowly scales up and pans slightly, giving life to a still photo. The "Ken Burns" effect.

## Usage

### 1. CSS Animation
Scale from 1.0 to 1.1 over 20s.

```css
@keyframes ken-burns {
    0% { transform: scale(1) translate(0,0); }
    100% { transform: scale(1.1) translate(-2%, -1%); }
}

.hero-bg {
    animation: ken-burns 20s ease-out infinite alternate;
}
```
