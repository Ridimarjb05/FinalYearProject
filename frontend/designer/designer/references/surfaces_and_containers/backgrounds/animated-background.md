# Animated Background

## Motion & Environment
Bringing the page to life.

### Types
- **Slow Drift**: Background elements (blobs, shapes) moving slowly.
- **Scroll-Linked**: Parallax effects where background moves at different speed than content.
- **Interactive**: Particles or lights that follow the cursor.
- **Video**: Looping video backgrounds (mute, autoplay, playsinline).

### Performance Warning
- Heavy animations can cause high CPU/GPU usage.
- Always respect `prefers-reduced-motion`.
- Use CSS transforms (`translate3d`) for hardware acceleration instead of animating `top/left/margin`.
